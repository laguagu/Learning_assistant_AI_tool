import { API_URL } from "@/lib/api/config";
import { NextRequest } from "next/server";

// Tätä funktiota käytetään iteraattorin muuttamiseen streamiksi
function iteratorToStream(iterator: AsyncIterator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

// Tämä meidän striimausfunktio, joka hakee backendin striimaamaa tietoa
async function* fetchBackendStream(userId: string, message: string) {
  const textEncoder = new TextEncoder();
  const url = `${API_URL}/api/chat/stream?user_id=${encodeURIComponent(
    userId
  )}&message=${encodeURIComponent(message)}`;

  console.log(`[ROUTE] Fetching from backend: ${url}`);

  try {
    // Pyyntö backendille
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[ROUTE] Backend request failed: ${response.status}`);

      // Käsittele virhe ja palauta virheviesti SSE-muodossa
      yield textEncoder.encode(
        `data: {"error": "Backend request failed with status ${response.status}"}\n\n`
      );
      yield textEncoder.encode("data: [DONE]\n\n");
      return;
    }

    if (!response.body) {
      console.error("[ROUTE] No response body from backend");
      yield textEncoder.encode(
        'data: {"error": "No response body from backend"}\n\n'
      );
      yield textEncoder.encode("data: [DONE]\n\n");
      return;
    }

    // Lue backendin striimia ja välitä se eteenpäin
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log("[ROUTE] Done reading from backend");
        break;
      }

      // Dekoodaa teksti ja lisää puskuriin
      const text = decoder.decode(value, { stream: true });
      console.log(`[ROUTE] Received from backend: ${text.slice(0, 50)}...`);
      buffer += text;

      // Jaa puskuri SSE-tapahtumiin
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || ""; // Jätä viimeinen keskeneräinen tapahtuma puskuriin

      // Käsittele kaikki kokonaiset tapahtumat
      for (const event of events) {
        if (event.startsWith("data: ")) {
          // Välitä SSE-tapahtuma sellaisenaan asiakkaalle
          yield textEncoder.encode(`${event}\n\n`);
        }
      }
    }

    // Varmista, että stream päättyy [DONE]-viestillä
    yield textEncoder.encode("data: [DONE]\n\n");
  } catch (error) {
    console.error("[ROUTE] Error in streaming:", error);
    yield textEncoder.encode(`data: {"error": "Streaming failed:"}\n\n`);
    yield textEncoder.encode("data: [DONE]\n\n");
  }
}

// FALLBACK ratkaisu, jos striimaus epäonnistuu - käytä normaalia POST-kutsua
async function* fallbackPostRequest(userId: string, message: string) {
  const textEncoder = new TextEncoder();
  try {
    console.log("[ROUTE] Using fallback POST request");

    // Käytä POST-endpointia suoraan backendin puolella
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        message: message,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Invalid response format from POST endpoint");
    }

    // Simuloi striimausta palauttamalla koko vastaus kerralla SSE-muodossa
    yield textEncoder.encode(`data: ${JSON.stringify(data.response)}\n\n`);
    yield textEncoder.encode("data: [DONE]\n\n");
  } catch (error) {
    console.error("[ROUTE] Fallback POST request failed:", error);
    yield textEncoder.encode(`data: {"error": "Fallback request failed:"}\n\n`);
    yield textEncoder.encode("data: [DONE]\n\n");
  }
}

export async function GET(request: NextRequest) {
  console.log("[ROUTE] Stream handler called");

  // Hae query-parametrit
  const userId = request.nextUrl.searchParams.get("user_id");
  const message = request.nextUrl.searchParams.get("message");

  if (!userId || !message) {
    return new Response("Missing user_id or message parameters", {
      status: 400,
    });
  }

  // Määritä SSE-otsaketiedot
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };

  try {
    // Ensin yritetään striimausta
    const iterator = fetchBackendStream(userId, message);
    const stream = iteratorToStream(iterator);

    return new Response(stream, { headers });
  } catch (streamError) {
    console.error(
      "[ROUTE] Streaming approach failed, using fallback:",
      streamError
    );

    // Striimaus epäonnistui, käytä fallbackia
    try {
      const fallbackIterator = fallbackPostRequest(userId, message);
      const fallbackStream = iteratorToStream(fallbackIterator);

      return new Response(fallbackStream, { headers });
    } catch (fallbackError) {
      console.error("[ROUTE] Fallback approach also failed:", fallbackError);

      // Kaikki epäonnistui, palauta virheviesti
      return new Response(
        JSON.stringify({
          error: "Both streaming and fallback approaches failed",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}

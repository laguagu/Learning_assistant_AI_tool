/**
 * Streams chat messages with improved Rahti compatibility
 *
 * This implementation always uses server actions in Rahti environment,
 * and direct browser streaming in local development.
 */
export type StreamChunkCallback = (chunk: string) => void;
export async function streamChatMessage(
  userId: string,
  message: string,
  onChunk: StreamChunkCallback,
): Promise<void> {
  try {
    // Käytä paikallista Next.js Route Handleria proxyn sijaan
    // Tämä kiertää OpenShift/Rahti proxyn aiheuttamat ongelmat
    const url = `/api/chat/stream?user_id=${encodeURIComponent(
      userId,
    )}&message=${encodeURIComponent(message)}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      console.error(`[STREAM] Request failed: ${response.status}`);
      throw new Error(`Stream request failed: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode chunk and add to buffer
      const text = decoder.decode(value, { stream: true });
      buffer += text;

      // Process events in buffer
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || ""; // Keep the last incomplete event in buffer

      for (const event of events) {
        if (event.startsWith("data: ")) {
          const data = event.slice(6); // Remove "data: " prefix

          if (data === "[DONE]") {
            return;
          }

          try {
            // Try to parse JSON data
            const parsedData = JSON.parse(data);

            // Check if we received an error
            if (parsedData.error) {
              console.error(`[STREAM] Error from server: ${parsedData.error}`);
              throw new Error(parsedData.error);
            }

            // Otherwise process normal response
            onChunk(parsedData);
          } catch {
            // If it's not valid JSON but not empty, use as is
            if (data.trim() && !data.includes("[DONE]")) {
              onChunk(data);
            }
          }
        }
      }
    }

    // Process any remaining data in buffer
    if (buffer && buffer.startsWith("data: ")) {
      const data = buffer.slice(6);
      if (data && data !== "[DONE]") {
        try {
          const parsedData = JSON.parse(data);
          if (!parsedData.error) {
            onChunk(parsedData);
          }
        } catch {
          if (data.trim() && !data.includes("[DONE]")) {
            onChunk(data);
          }
        }
      }
    }
  } catch (error) {
    console.error("[STREAM] Stream error:", error);
    throw error;
  }
}

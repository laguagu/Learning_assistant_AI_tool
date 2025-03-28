import { API_URL } from "./config";

/**
 * Streams chat messages from the API with proper markdown rendering support.
 *
 * KEY INSIGHTS FOR STREAMING MARKDOWN CONTENT:
 * 1. Backend sends the FULL response each time, not just incremental chunks
 * 2. We parse the SSE stream format carefully to handle newlines properly
 * 3. We handle JSON parsing to safely decode content with markdown elements
 * 4. The regex pattern for splitting events handles both Windows & Unix line endings
 *
 * The main challenge with streaming markdown (especially lists) is that
 * SSE protocol uses double newlines as event separators, which can conflict
 * with markdown formatting that also uses multiple newlines. By JSON-encoding
 * on the backend and carefully parsing here, we resolve this conflict.
 */
export type StreamChunkCallback = (chunk: string) => void;
export async function streamChatMessage(
  userId: string,
  message: string,
  onChunk: StreamChunkCallback
): Promise<void> {
  try {
    // Create a URL with proper encoding
    const url = new URL(`${API_URL}/api/chat/stream`);
    url.searchParams.append("user_id", userId);
    url.searchParams.append("message", message);

    console.log(`[BROWSER] Requesting from: ${url.toString()}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Stream request failed: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    console.log("[BROWSER] Starting stream processing");

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log("[BROWSER] Stream reading complete");
        break;
      }

      // Decode the chunk and add to buffer
      const text = decoder.decode(value, { stream: true });
      buffer += text;

      // IMPORTANT: Use regex to handle all types of newlines in SSE
      // This is critical for markdown content with lists that contain newlines
      // The pattern matches both \r\n (Windows) and \n (Unix) style line endings
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || ""; // Keep the last incomplete event in buffer

      for (const event of events) {
        if (event.startsWith("data: ")) {
          const data = event.slice(6); // Remove "data: " prefix

          if (data === "[DONE]") {
            console.log("[BROWSER] Stream complete signal received");
            return;
          }

          try {
            // CRITICAL: Handle JSON-encoded data from the backend
            // The backend encodes the response as JSON to prevent SSE protocol
            // conflicts with markdown content (especially lists and headings)
            const parsedData = JSON.parse(data);
            console.log(
              `[BROWSER] Received chunk with length: ${parsedData.length}`
            );
            onChunk(parsedData);
          } catch {
            // Fallback for non-JSON data (like the initial empty event)
            console.log(`[BROWSER] Received non-JSON data: ${data}`);
            if (data.trim()) {
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
          console.log(`[BROWSER] Final chunk: ${parsedData.length}`);
          onChunk(parsedData);
        } catch {
          if (data.trim()) {
            onChunk(data);
          }
        }
      }
    }
  } catch (error) {
    console.error("[BROWSER] Stream error:", error);
    throw error;
  }
}

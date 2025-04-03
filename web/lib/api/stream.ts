import { streamChatAction } from "@/app/actions";
import { API_URL } from "./config";

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
  onChunk: StreamChunkCallback
): Promise<void> {
  // Always detect Rahti environment on both client and server sides
  const isRahti =
    typeof window !== "undefined" &&
    (window.location.hostname.includes("rahtiapp.fi") ||
      window.location.hostname.includes("rahti"));

  console.log(`[STREAM] Environment detection: isRahti=${isRahti}`);

  try {
    // Always use server action in Rahti environment to avoid URL construction issues
    if (isRahti) {
      console.log("[STREAM] Using server action for streaming in Rahti");

      // Call the server action (this handles all the complexity on server side)
      const result = await streamChatAction(userId, message);

      if (!result.success) {
        console.error(`[STREAM] Server action failed: ${result.error}`);
        throw new Error(`Server action failed: ${result.error}`);
      }

      // Process each returned chunk
      if (!result.chunks) {
        console.error("[STREAM] No chunks returned from server action");
        throw new Error("No chunks returned from server action");
      }

      console.log(
        `[STREAM] Server action returned ${result.chunks.length} chunks`
      );

      for (const chunk of result.chunks) {
        console.log(
          `[STREAM] Processing chunk from server: ${
            typeof chunk === "string"
              ? chunk.substring(0, 20) + "..."
              : "non-string"
          }`
        );
        onChunk(chunk);
      }

      return;
    }

    // For non-Rahti environments, use direct browser streaming approach
    console.log(
      "[STREAM] Using direct browser streaming in dev/local environment"
    );

    try {
      // Create a URL with proper encoding
      const url = new URL(`${API_URL}/api/chat/stream`);
      url.searchParams.append("user_id", userId);
      url.searchParams.append("message", message);

      console.log(`[STREAM] Requesting from: ${url.toString()}`);

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

      console.log("[STREAM] Starting stream processing");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("[STREAM] Stream reading complete");
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
              console.log("[STREAM] Stream complete signal received");
              return;
            }

            try {
              // CRITICAL: Handle JSON-encoded data from the backend
              // The backend encodes the response as JSON to prevent SSE protocol
              // conflicts with markdown content (especially lists and headings)
              const parsedData = JSON.parse(data);
              console.log(
                `[STREAM] Received chunk with length: ${parsedData.length}`
              );
              onChunk(parsedData);
            } catch {
              // Fallback for non-JSON data (like the initial empty event)
              console.log(
                `[STREAM] Received non-JSON data (parsing error): ${data}`
              );
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
            console.log(`[STREAM] Final chunk: ${parsedData.length}`);
            onChunk(parsedData);
          } catch {
            if (data.trim()) {
              onChunk(data);
            }
          }
        }
      }
    } catch (error) {
      console.error(
        "[STREAM] Error in direct streaming, falling back to server action:",
        error
      );

      // If direct streaming fails, fall back to server action as a backup
      const result = await streamChatAction(userId, message);

      if (!result.success) {
        throw new Error(`Fallback server action failed: ${result.error}`);
      }

      if (result.chunks) {
        for (const chunk of result.chunks) {
          onChunk(chunk);
        }
      }
    }
  } catch (error) {
    console.error("[STREAM] Stream error:", error);
    throw error;
  }
}

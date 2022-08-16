import { Handlers } from "$fresh/server.ts";
import { isWord } from "../../../words/validate.utils.ts";
import type { SessionState } from "../../_middleware.ts";

export const handler: Handlers<Record<string, unknown>, SessionState> = {
  GET: async (req, _ctx) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const word = params.get("word");
    if (word !== null) {
      const result = await isWord(word);
      return new Response(JSON.stringify({
        success: true,
        result,
      }));
    }
    return new Response(JSON.stringify({
      success: false,
      error: "No word supplied",
    }));
  },
};

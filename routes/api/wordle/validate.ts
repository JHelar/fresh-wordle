import { Handlers } from "$fresh/server.ts";
import { getWordOfTheDay } from "../../../words/getWordOfTheDay.utils.ts";
import { validateWord } from "../../../words/validate.utils.ts";
import type { SessionState } from "../../_middleware.ts";

type WordSession = {
  targetWord: string;
  tries: number;
};
const sessionsMap = new Map<string, WordSession>();

export const handler: Handlers<Record<string, unknown>, SessionState> = {
  GET: async (req, ctx) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const word = params.get("word");
    if (word !== null) {
      let wordSession = sessionsMap.get(ctx.state.sessionId);
      if (!wordSession) {
        const targetWord = await getWordOfTheDay();
        wordSession = {
          targetWord,
          tries: 0,
        };
      }

      wordSession.tries++;
      const result = validateWord(word, wordSession.targetWord);

      sessionsMap.set(ctx.state.sessionId, wordSession);
      if (result.completed || wordSession.tries === 5) {
        sessionsMap.delete(ctx.state.sessionId);

        return new Response(JSON.stringify({
          success: true,
          result: { ...result, targetWord: wordSession.targetWord },
        }));
      }

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

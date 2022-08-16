import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getRandomRange } from "../utils/getRandomRange.utils.ts";

export type SessionState = {
  sessionId: string;
};

const createSessionId = () =>
  `${getRandomRange(1000, 9999)}-${getRandomRange(1000, 9999)}-${
    getRandomRange(1000, 9999)
  }-${getRandomRange(1000, 9999)}`;

const SESSION_ID_KEY = "x-sid";

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<SessionState>,
) => {
  const sessionId = req.headers.get(SESSION_ID_KEY) ?? createSessionId();
  ctx.state.sessionId = sessionId;
  const response = await ctx.next();

  response.headers.set(SESSION_ID_KEY, sessionId);
  return response;
};

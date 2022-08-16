const SESSION_ID_KEY = "x-sid";

const getSessionIdFromStorage = () => sessionStorage.getItem(SESSION_ID_KEY);
const saveSessionIdToStorage = (value: string) =>
  sessionStorage.setItem(SESSION_ID_KEY, value);

export const fetchWithSessionId = async (
  ...fetchArgs: Parameters<typeof fetch>
): ReturnType<typeof fetch> => {
  let sessionId = getSessionIdFromStorage();

  const headers = sessionId
    ? {
      ...fetchArgs[1]?.headers,
      [SESSION_ID_KEY]: sessionId,
    }
    : fetchArgs[1]?.headers;

  const response = await fetch(fetchArgs[0], {
    ...fetchArgs[1],
    headers,
  });

  sessionId = response.headers.get(SESSION_ID_KEY);
  if (sessionId) saveSessionIdToStorage(sessionId);

  return response;
};

import type { ValidationResult } from "../../../words/validate.utils.ts";
import { fetchWithSessionId } from "./fetchWithSessionId.utils.ts";

export const validateWord = async (
  word: string,
): Promise<ValidationResult | null> => {
  const isWord = await fetchWithSessionId(`/api/wordle/isWord?word=${word}`)
    .then((res) => res.json()).then(
      (data) => data.result === true,
    );

  if (!isWord) return null;

  return fetchWithSessionId(`/api/wordle/validate?word=${word}`).then((res) =>
    res.json()
  )
    .then(
      (data) => data.result as ValidationResult,
    );
};

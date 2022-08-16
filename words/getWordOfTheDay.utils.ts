import { getRandomRange } from "../utils/getRandomRange.utils.ts";
import { getWordFilePath } from "./getWordFilePath.utils.ts";

export const getWordOfTheDay = async () => {
  const firstLetter = String.fromCharCode(getRandomRange(65, 90));
  const filePath = getWordFilePath(firstLetter);
  const wordsString = await Deno.readTextFile(filePath);
  const words = wordsString.split("\n");

  return words[getRandomRange(0, words.length - 1)];
};

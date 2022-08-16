import { getWordFilePath } from "./getWordFilePath.utils.ts";

export type CharacterState = "correct" | "exist" | "invalid";

type CharacterValidation = {
  char: string;
  state: CharacterState;
};

export type ValidationResult = {
  completed: boolean;
  validation: CharacterValidation[];
  targetWord?: string;
};

export const isWord = async (word: string): Promise<boolean> => {
  word = word.toUpperCase();
  const filePath = getWordFilePath(word[0]);
  const wordsString = await Deno.readTextFile(filePath);
  const words = wordsString.split("\n");

  return words.some((w) => w === word);
};

const charCount = (word: string) =>
  word.split("").reduce((lex, character) => ({
    ...lex,
    [character]: ++lex[character] || 1,
  }), {} as Record<string, number>);

export const validateWord = (
  word: string,
  targetWord: string,
): ValidationResult => {
  const normalizedWord = word.toUpperCase();
  const validation: CharacterValidation[] = Array(word.length).fill(0);
  const targetCount = charCount(targetWord);
  const completed = normalizedWord === targetWord;

  for (let i = 0; i < targetWord.length; i++) {
    const targetCharacter = targetWord[i];
    const wordCharacter = normalizedWord[i];

    if (targetCharacter === wordCharacter) {
      targetCount[wordCharacter]--;
      validation[i] = {
        char: wordCharacter,
        state: "correct",
      };
      continue;
    }

    if (
      !(wordCharacter in targetCount) || targetCount[wordCharacter] === 0
    ) {
      validation[i] = {
        char: wordCharacter,
        state: "invalid",
      };
      continue;
    }

    targetCount[wordCharacter]--;
    validation[i] = {
      char: wordCharacter,
      state: "exist",
    };
  }

  return {
    completed,
    validation,
  };
};

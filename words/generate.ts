import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@0.147.0/testing/asserts.ts";
import { getWordFilePath } from "./getWordFilePath.utils.ts";

const fetchWords = async (page: number) => {
  const pageString = page === 1 ? "" : `page${page}`;

  const url = `https://www.bestwordlist.com/5letterwords${pageString}.htm`;
  const DOMString = await fetch(url).then((res) => res.text());

  const document = new DOMParser().parseFromString(DOMString, "text/html");
  assert(document);

  const elements = document.querySelectorAll(
    'span[class^="mot"]',
  );
  assert(elements);

  const words = Array.from(elements).flatMap((e) => e.textContent.split(" "))
    .filter(Boolean);

  return words;
};

const saveWords = async (words: string[]) => {
  const lexicon = words.reduce((lex, word) => {
    const [firstLetter] = word;

    lex[firstLetter] = [...(lex[firstLetter] || []), word];

    return lex;
  }, {} as Record<string, string[]>);

  for (let [letter, words] of Object.entries(lexicon)) {
    const filePath = getWordFilePath(letter);
    try {
      const stat = await Deno.stat(filePath);
      if (stat.isFile) {
        const existing = await Deno.readTextFile(filePath);
        words = [...words, ...existing.split("\n")];
      }
    } catch (e) {
    }
    await Deno.writeTextFile(filePath, words.join("\n"));
  }
};

const PAGE_COUNT = 15;
for (let page = 1; page <= PAGE_COUNT; page++) {
  const words = await fetchWords(page);
  await saveWords(words);
}

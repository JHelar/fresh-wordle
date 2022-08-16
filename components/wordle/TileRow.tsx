/** @jsx h */
import { createRef, h } from "preact";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { tw } from "@twind";
import { isValidTileValue, validateWord } from "./utils/index.ts";
import { Tile } from "./Tile.tsx";
import type { ValidationResult } from "../../words/validate.utils.ts";

const TILE_COUNT = 5;

type TileRowProps = {
  active: boolean;
  onSubmitWord: (result: ValidationResult) => void;
};

export const TileRow = ({ active, onSubmitWord }: TileRowProps) => {
  const [activeTile, setActiveTile] = useState(0);
  const inputRefs = useRef(
    Array(TILE_COUNT).fill(0).map(() => createRef<HTMLInputElement>()),
  );
  const word = useRef(Array(TILE_COUNT).fill(""));
  const [validation, setValidation] = useState<
    ValidationResult | null | undefined
  >(undefined);

  const activateTile = useCallback((tileIndex: number) => {
    let newActiveTile = tileIndex;
    if (newActiveTile >= TILE_COUNT) newActiveTile = TILE_COUNT - 1;
    else if (newActiveTile < 0) newActiveTile = 0;

    setActiveTile(newActiveTile);
    inputRefs.current[newActiveTile].current?.focus();
  }, [setActiveTile]);

  const tiles = useMemo(
    () =>
      Array(TILE_COUNT).fill(0).map((_, i) => (
        <Tile
          inputRef={inputRefs.current[i]}
          disabled={!active}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (isValidTileValue(value)) {
              word.current[i] = value;
              activateTile(i + 1);
            } else {
              word.current[i] = "";
              e.currentTarget.value = "";
            }
          }}
          onKeyDown={(e) => {
            const key = e.key;
            const hasValue = Boolean(e.currentTarget.value);

            if (key === "Backspace" && !hasValue) {
              activateTile(i - 1);
            }
          }}
          state={validation === undefined
            ? undefined
            : validation?.validation[i].state}
          key={i}
        />
      )),
    [validation, active],
  );

  useEffect(() => {
    if (!active) return;
    activateTile(activeTile);

    const enterHandler = async (e: KeyboardEvent) => {
      const key = e.key;

      switch (key) {
        case "Enter":
          {
            if (word.current.filter(Boolean).length === TILE_COUNT) {
              setValidation(undefined);
              const wordString = word.current.join("");
              const result = await validateWord(wordString);
              setValidation(result);

              if (result !== null) {
                onSubmitWord(result);
              }
            }
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", enterHandler);

    return () => {
      document.removeEventListener("keydown", enterHandler);
    };
  }, [active]);

  return (
    <div
      class={tw`${
        validation === null ? "animate-shake" : ""
      } grid grid-cols-5 grid-rows-1 gap-x-2`}
    >
      {tiles}
    </div>
  );
};

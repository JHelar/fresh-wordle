/** @jsx h */
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { tw } from "@twind";
import { TileRow } from "@components";
import { ValidationResult } from "../words/validate.utils.ts";

const ROW_COUNT = 5;

const enum GAME_STATE {
  RUNNING = "RUNNING",
  FINISHED = "FINISHED",
  FAILED = "FAILED",
}

type GameState =
  | {
    type: GAME_STATE.RUNNING;
  }
  | { type: GAME_STATE.FINISHED }
  | { type: GAME_STATE.FAILED; targetWord: string };

const Game = () => {
  const [activeRow, setActiveRow] = useState(0);
  const [state, setState] = useState<GameState>({ type: GAME_STATE.RUNNING });

  const onSubmitWord = (result: ValidationResult) => {
    const nextRow = activeRow + 1;
    setActiveRow(nextRow);

    if (result.targetWord !== undefined) {
      if (result.completed) {
        return setState({
          type: GAME_STATE.FINISHED,
        });
      }

      return setState({
        type: GAME_STATE.FAILED,
        targetWord: result.targetWord,
      });
    }
  };

  const tileRows = useMemo(
    () =>
      Array(ROW_COUNT).fill(0).map((_, i) => (
        <TileRow key={i} active={i === activeRow} onSubmitWord={onSubmitWord} />
      )),
    [activeRow],
  );
  return (
    <div class={tw`w-96 h-96`}>
      <div class={tw`grid grid-rows-${ROW_COUNT} grid-cols-1 h-full gap-y-2`}>
        {tileRows}
      </div>
      {state.type === GAME_STATE.FAILED && (
        <span>
          Aaaw you failed, the word was: <strong>{state.targetWord}</strong>
        </span>
      )}
      {state.type === GAME_STATE.FINISHED && <span>Hurray! You did it!</span>}
    </div>
  );
};

export default Game;

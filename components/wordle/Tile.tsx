/** @jsx h */
import { h, Ref } from "preact";
import { tw } from "@twind";
import type { CharacterState } from "../../words/validate.utils.ts";

type TileState = "unknown" | CharacterState;

type TileProps = {
  inputRef: Ref<HTMLInputElement>;
  state?: TileState;
} & Partial<h.JSX.HTMLAttributes<HTMLInputElement>>;

export const Tile = (
  { inputRef, state = "unknown", ...inputProps }: TileProps,
) => {
  const stateColor = state === "unknown" || state === "invalid"
    ? "bg-gray-900"
    : state === "exist"
    ? "bg-yellow-600"
    : "bg-green-600";

  return (
    <input
      ref={inputRef}
      autoComplete="off"
      autoCorrect="off"
      maxLength={1}
      type="text"
      class={tw
        `${stateColor} border-gray-600 focus:border-gray-300 border-solid border-2 rounded m-0 p-0 text-center uppercase text-4xl font-bold focus:outline-none`}
      {...inputProps}
    />
  );
};

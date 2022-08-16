import { Reducer, useReducer } from "preact/hooks";
import { ValidationResult } from "../words/validate.utils.ts";
import { validateWord } from "./utils/index.ts";

export const enum GAME_STATE {
  RUNNING,
  WIN,
  LOSS,
}

const enum GAME_ACTION_TYPE {
  NEW_GAME = "NEW_GAME",
  SET_TARGET_WORD = "SET_TARGET_WORD",
  UPDATE_STATE = "UPDATE_SATATE",
  START_VALIDATION = "START_VALIDATION",
  VALIDATION_SUCCESS = "VALIDATION_SUCCESS",
  NEXT_WORD = "NEXT_WORD",
}

type GameState = {
  state: GAME_STATE;
  validating: boolean;
  validation?: ValidationResult | null;
  tagetWord?: string;
};

type GameActions = {
  type: GAME_ACTION_TYPE.NEW_GAME;
} | {
  type: GAME_ACTION_TYPE.SET_TARGET_WORD;
  targetWord: string;
} | {
  type: GAME_ACTION_TYPE.UPDATE_STATE;
  state: GAME_STATE;
} | {
  type: GAME_ACTION_TYPE.START_VALIDATION;
} | {
  type: GAME_ACTION_TYPE.VALIDATION_SUCCESS;
  result: ValidationResult | null;
} | {
  type: GAME_ACTION_TYPE.NEXT_WORD;
};

const reducer: Reducer<GameState, GameActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case GAME_ACTION_TYPE.NEW_GAME:
      return {
        state: GAME_STATE.RUNNING,
        tagetWord: undefined,
        validating: false,
        validation: undefined,
      };
    case GAME_ACTION_TYPE.SET_TARGET_WORD:
      return {
        ...state,
        tagetWord: action.targetWord,
      };
    case GAME_ACTION_TYPE.UPDATE_STATE:
      return {
        ...state,
        state: action.state,
      };
    case GAME_ACTION_TYPE.START_VALIDATION:
      return {
        ...state,
        validating: true,
        validation: undefined,
      };
    case GAME_ACTION_TYPE.VALIDATION_SUCCESS:
      return {
        ...state,
        validating: false,
        validation: action.result,
      };
    case GAME_ACTION_TYPE.NEXT_WORD:
      return {
        ...state,
        validating: false,
        validation: undefined,
      };
    default:
      return state;
  }
};

export const useWordleGameState = () => {
  const [state, dispatch] = useReducer(reducer, {
    state: GAME_STATE.RUNNING,
    validating: false,
  });

  const validate = async (word: string) => {
    dispatch({
      type: GAME_ACTION_TYPE.START_VALIDATION,
    });

    const result = await validateWord(word);

    dispatch({
      type: GAME_ACTION_TYPE.VALIDATION_SUCCESS,
      result,
    });
  };
};

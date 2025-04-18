/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectStatesReducer = (state: RootState) => state.states;

export const selectStateIDFromStateName = createSelector(
  [selectStatesReducer, (_: any, stateName: string | null) => stateName],
  (states, stateName) => {
    const foundState = states.states.find((state) => state.name === stateName);
    return foundState?.id || null;
  }
);

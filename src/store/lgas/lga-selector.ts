/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectLGAReducer = (state: RootState) => state.lga;

/**
 * Get LGA ID from LGA NAme
 */
export const selectLGAFromName = createSelector(
  [selectLGAReducer, (_: any, LGAName: string | null) => LGAName],
  (lga, LGAName) => {
    const foundLGA = lga.lgas.find((state) => state.name === LGAName);
    return foundLGA;
  }
);

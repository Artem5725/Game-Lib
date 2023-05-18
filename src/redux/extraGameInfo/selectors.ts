import { StoreState } from "../store/store";

export const selectScreenshots = (state:StoreState)=> state.extraGameInfo?.screenshots;
export const selectAchievements = (state:StoreState)=> state.extraGameInfo?.achievements;
export const selectDlcs = (state:StoreState)=> state.extraGameInfo?.dlc;
export const selectSeries = (state:StoreState)=> state.extraGameInfo?.serieGames;
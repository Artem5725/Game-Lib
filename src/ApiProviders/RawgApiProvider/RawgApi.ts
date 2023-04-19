import {
  RawgScreenshotInfo,
  RawgGameInfo,
  RawgAchievementsInfo,
  RawgGameInfoResponse,
  CardInfo,
  GameExtraInfo,
  AchievementsInfo
} from './RawgTypes.mjs';

export class RawgApiProvider {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }

  public loadCardsOnRequest(
    searchRequest: string,
    parentPlatformId: number,
    pageNumber: number
  ) {
    return this.searchGames(searchRequest, parentPlatformId, pageNumber)
      .then(({ results }) => {
        return this.mapCardInfo(results);
      })
      .catch((error) => console.log(error)); // TODO check error
  }

  public loadGameInfo(game_id: number): Promise<GameExtraInfo> {
    const gameInfo: GameExtraInfo = {
      screenshots: [],
      achievements: [],
      dlc: [],
      serieGames: []
    };

    const cardInfoPromises: Promise<void>[] = [];

    cardInfoPromises.push(
      this.getGameExtraInfo<RawgScreenshotInfo>(game_id, 'screenshots')
        .then(({ results }) => {
          gameInfo.screenshots = this.mapScreenshotInfo(results);
        })
        .catch((err) => {
          console.log(err);
        })
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgAchievementsInfo>(game_id, 'achievements')
        .then(({ results }) => {
          gameInfo.achievements = this.mapAchievementsInfo(results);
        })
        .catch((err) => {
          console.log(err);
        })
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgGameInfo>(game_id, 'additions')
        .then(({ results }) => {
          gameInfo.dlc = this.mapCardInfo(results);
        })
        .catch((err) => {
          console.log(err);
        })
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgGameInfo>(game_id, 'game-series')
        .then(({ results }) => {
          gameInfo.serieGames = this.mapCardInfo(results);
        })
        .catch((err) => {
          console.log(err);
        })
    );
    return Promise.allSettled(cardInfoPromises).then((_res) => gameInfo);
  }

  private getGameExtraInfo<T>(
    gameId: number,
    infoType: string
  ): Promise<RawgGameInfoResponse<T>> {
    return fetch(
      encodeURI(
        `https://api.rawg.io/api/games/${gameId}/${infoType}?key=${this.key}`
      )
    ).then((result) => {
      if (result.ok) {
        return result.json();
      }
    });
  }

  private searchGames(
    request: string,
    parentPlatformId: number,
    pageNumber: number
  ): Promise<RawgGameInfoResponse<RawgGameInfo>> {
    const pageSize = 20;
    const searchPrecisly = true;
    const searchExact = true;
    const str = encodeURI(
      `https://api.rawg.io/api/games?key=${this.key}` +
        `&search=${request}` +
        `&search_precise=${searchPrecisly}` +
        //`&search_exact=${searchExact}` + // TODO для точности проверить
        `&parent_platforms=${parentPlatformId}` +
        `&page_size=${pageSize}` +
        `&page=${pageNumber}`
    );
    return fetch(str).then((result) => {
      if (result.ok) {
        return result.json();
      }
    });
  }

  private mapScreenshotInfo(results: RawgScreenshotInfo[]): string[] {
    return results.map(({ image }) => image);
  }

  private mapCardInfo(results: RawgGameInfo[]): CardInfo[] {
    return results.map(
      ({ id, background_image, name, released, platforms, rating }) => {
        return {
          id,
          background_image,
          name,
          released: new Date(released).getFullYear(),
          platforms: platforms.map((elem) => elem.platform.name),
          rating
        };
      }
    );
  }

  private mapAchievementsInfo(
    results: RawgAchievementsInfo[]
  ): AchievementsInfo[] {
    return results.map(({ description, image, name }) => {
      return { description, image, name };
    });
  }
}

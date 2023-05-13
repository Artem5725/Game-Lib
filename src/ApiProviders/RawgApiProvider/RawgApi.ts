import { customErrorsMap } from '../../helpers/Errors.js';
import {
  RawgScreenshotInfo,
  RawgGameInfo,
  RawgAchievementsInfo,
  RawgGameInfoResponse,
  CardInfo,
  GameExtraInfo,
  AchievementsInfo
} from './RawgTypes';

/**
 * Реализует функционал получения данных об играх через api Rawg
 */
export class RawgApiProvider {
  private key: string;
  constructor() {
    this.key = process.env.REACT_APP_RAWG_API_KEY ?? '';
  }

  /**
   * Метод получает информацию об играх по поисковому запросу и форматирует его.
   * Обертка над searchGames
   * @param {string} searchRequest поисковой запрос
   * @param {number} parentPlatformId идентификатор платформы, игры которой будут искаться
   * @param {number} pageNumber номер страницы результата
   * @returns промис, результатом которого будет отформатированный список записей о найденных играх.
   * В случае ошибки загрузки или, если по запросу не будут найдены игры, будет выброшена ошибка
   */
  public loadCardsOnRequest(
    searchRequest: string,
    parentPlatformId: number,
    pageNumber: number
  ): Promise<CardInfo[] | void> {
    return this.searchGames(searchRequest, parentPlatformId, pageNumber)
      .then(({ results }) => {
        const resultGames = this.mapCardInfo(results);
        if (resultGames.length === 0) {
          throw new Error(customErrorsMap.rawgNoGamesOnRequestFound);
        }
        return resultGames;
      })
      .catch((_e) => {
        throw new Error(customErrorsMap.rawgLoadGamesOnRequestFail);
      });
  }

  /**
   * Метод получает весь необходимый набор дополнительной информации для игры.
   * Обертка над getGameExtraInfo
   * @param {number} gameId идентификатор игры, для которой нужно получить дополнительную информацию
   * @returns промис, результатом которого будет информация, собранная об игре.
   * Если ни один из запросов на получение дополнительной информации об игре не завершится успехом,
   * то будет выброшена ошибка
   */
  public loadGameInfo(gameId: number): Promise<GameExtraInfo | void> {
    const gameInfo: GameExtraInfo = {
      screenshots: [],
      achievements: [],
      dlc: [],
      serieGames: []
    };

    const cardInfoPromises: Promise<void>[] = [];

    cardInfoPromises.push(
      this.getGameExtraInfo<RawgScreenshotInfo>(gameId, 'screenshots').then(
        ({ results }) => {
          gameInfo.screenshots = this.mapScreenshotInfo(results);
        }
      )
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgAchievementsInfo>(gameId, 'achievements').then(
        ({ results }) => {
          gameInfo.achievements = this.mapAchievementsInfo(results);
        }
      )
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgGameInfo>(gameId, 'additions').then(
        ({ results }) => {
          gameInfo.dlc = this.mapCardInfo(results);
        }
      )
    );
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgGameInfo>(gameId, 'game-series').then(
        ({ results }) => {
          gameInfo.serieGames = this.mapCardInfo(results);
        }
      )
    );
    return Promise.allSettled(cardInfoPromises).then((requestsResults) => {
      if (
        requestsResults.findIndex((elem) => {
          return elem.status === 'fulfilled';
        }) === -1
      ) {
        throw new Error(customErrorsMap.rawgLoadGameExtraInfoFail);
      }
      return gameInfo;
    });
  }

  /**
   * Метод для получения конкретного типа дополнительной информации об игре
   * @param {number} gameId идентификатор игры, о котором запрашивается дополнительная информация
   * @param {string} infoType тип дополнительной информации
   * @returns промис, который вернет структуру, содержащую запрошенную информацию
   */
  private getGameExtraInfo<T>(
    gameId: number,
    infoType: string
  ): Promise<RawgGameInfoResponse<T>> {
    return fetch(
      encodeURI(
        `https://api.rawg.io/api/games/${gameId}/${infoType}?key=${this.key}`
      )
    ).then(result => {
      if (result.ok) {
        return result.json();
      }
    });
  }

  /**
   * Фунция получает информацию об играх по поисковому запросу
   * @param {string} request поисковой запрос
   * @param {number} parentPlatformId идентификатор платформы, игры которой будут искаться
   * @param {number} pageNumber номер страницы результата
   * @returns промис, результатом которого будет список записей, представленных объектами Rawg
   */
  private searchGames(
    request: string,
    parentPlatformId: number,
    pageNumber: number
  ): Promise<RawgGameInfoResponse<RawgGameInfo>> {
    const pageSize = 20;
    const searchPrecisly = true;
    const searchExact = true;
    const str = encodeURI(
      `https://api.rawg.io/api/games?key=${this.key}`
        + `&search=${request}`
        + `&search_precise=${searchPrecisly}`
        //`&search_exact=${searchExact}` + // TODO для точности проверить
        + `&parent_platforms=${parentPlatformId}`
        + `&page_size=${pageSize}`
        + `&page=${pageNumber}`
    );

    return fetch(str).then(result => {
      if (result.ok) {
        return result.json();
      }
    });
  }

  /**
   * Метод извлекает uri для скриншотов из объектов Rawg
   * @param {RawgScreenshotInfo[]} results массив записей о скриншотов, представленных объектами Rawg
   * @returns массив uri скриншотов
   */
  private mapScreenshotInfo(results: RawgScreenshotInfo[]): string[] {
    return results.map(({ image }) => image);
  }

  /**
   * Метод извлекает необходимую информацию об играх из объектов Rawg
   * @param {RawgGameInfo[]} results массив записей об играх, представленных объектами Rawg
   * @returns массив с набором информации об играх, необходимой для приложения
   */
  private mapCardInfo(results: RawgGameInfo[]): CardInfo[] {
    return results.map(
      ({ id, background_image, name, released, platforms, rating }) => ({
        id,
        background_image,
        name,
        released: new Date(released).getFullYear(),
        platforms: platforms.map(elem => elem.platform.name),
        rating
      })
    );
  }

  /**
   * Метод извлекает необходимую информацию о достижениях для игр из объектов Rawg
   * @param {RawgAchievementsInfo[]} results массив записей об достижениях, представленных объектами Rawg
   * @returns массив с набором информации о достижениях, необходимой для приложения
   */
  private mapAchievementsInfo(
    results: RawgAchievementsInfo[]
  ): AchievementsInfo[] {
    return results.map(({ description, image, name }) => ({
      description,
      image,
      name
    }));
  }
}

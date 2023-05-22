import { customErrorsMap } from '../../helpers/Errors';
import {
  RawgScreenshotInfo,
  RawgGameInfo,
  RawgAchievementsInfo,
  RawgGameInfoResponse,
  CardInfo,
  GameExtraInfo,
  AchievementsInfo,
  RawgLinksInfo
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
      .catch(_e => {
        throw new Error(customErrorsMap.rawgLoadGamesOnRequestFail);
      });
  }

  /**
   * Метод получает информацию об игре по ее идентификатору Rawg
   * @param {number} gameId идентификатор игры, для которой нужно получить информацию 
   * @returns промис, результатом которого будет информация о запрошенной игре
   * В случае ошибки загрузки будет выброшена ошибка
   */
  public loadCardInfoById(gameId: number): Promise<CardInfo | void> {
    return this.getGameInfoByid(gameId)
      .then(result => {
        const resultGames: CardInfo = {
          id: result.id,
          name: result.name,
          released: new Date(result.released).getFullYear(),
          background_image: result.background_image,
          rating: result.rating,
          platforms: result.platforms.map(elem => elem.platform.name)
        };

        return resultGames;
      })
      .catch(_e => {
        throw new Error(customErrorsMap.rawgLoadGameInfoByIdFail);
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
      serieGames: [],
      link: ''
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
    cardInfoPromises.push(
      this.getGameExtraInfo<RawgLinksInfo>(gameId, 'stores').then(
        ({ results }) => {
          gameInfo.link = this.mapLinksInfo(results);
        }
      )
    );
    return Promise.allSettled(cardInfoPromises).then(requestsResults => {
      if (
        requestsResults.findIndex(elem => elem.status === 'fulfilled') === -1
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
   * Метод получает информацию об играх по поисковому запросу
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
    const str = encodeURI(
      `https://api.rawg.io/api/games?key=${this.key}`
        + `&search=${request}`
        + `&search_precise=${searchPrecisly}`
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
   * Метод получает информацию об игре по ее идентификатору
   * @param {number} gameId идентификатор игры, для которой нужно получить информацию
   * @returns промис, результатом которого будет информация об игре, представленная объектом Rawg
   */
  private getGameInfoByid(gameId: number): Promise<RawgGameInfo> {
    return fetch(
      encodeURI(`https://api.rawg.io/api/games/${gameId}?key=${this.key}`)
    ).then(result => {
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

  /**
   * Метод забирает ссылку на игру в магазине стим, а если его нет, то первую из полученных ссылок
   * @param {RawgLinksInfo[]} results массив записей о ссылках на ресурсы, где можно приобрести игру
   * @returns ссылка на ресурс, где можно приобрести игру
   */
  private mapLinksInfo(results: RawgLinksInfo[]): string {
    if (results.length === 0) {
      return '';
    }
    const link = results.find(linkInfo => linkInfo.store_id === 1);

    return link ? link.url : results[0].url;
  }
}

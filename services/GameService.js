
class GameService extends EventTarget {
  constructor() {
    super();
    this._games = [];
  }

  setGames(games) {
    games.map((game) => {
      game.rating = parseInt(game.rating * 1015 );
    });
    this._games = games;
    this.dispatchEvent(new Event("change"));
  }

  getGames() {
    return this._games;
  }

  getTrending() {
    let sorted = this._games.sort((a, b) => {
      return b.rating - a.rating
    });
    return sorted.slice(0, 15);
  }

  getNewest() {
    let sorted = this._games.sort((a, b) => {
      return new Date(b.released) - new Date(a.released);
    });
    return sorted.slice(0, 15);
  }
}

export const gameService = new GameService();
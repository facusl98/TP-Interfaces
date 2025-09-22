
class GameService extends EventTarget {
  constructor() {
    super();
    this._games = [];
  }

  getGames() {
    return this._games;
  }

  getTrending() {
    let sorted = this._games.sort((a, b) => {
      return b.rating - a.rating
    });
    console.log(sorted);
    return sorted.slice(0, 10);
  }

  getNewest() {
    let sorted = this._games.sort((a, b) => {
      return new Date(b.released) - new Date(a.released);
    });
    console.log(sorted);
    return sorted.slice(0, 10);
  }

  setGames(games) {
    games.map((game) => {
      game.rating = parseInt(game.rating * 1015 );
    });
    this._games = games;
    this.dispatchEvent(new Event("change"));
  }
}

export const gameService = new GameService();
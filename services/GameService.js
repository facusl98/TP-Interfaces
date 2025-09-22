
class GameService extends EventTarget {
  constructor() {
    super();
    this._games = [];
  }

<<<<<<< HEAD
  setGames(games) {
    games.map((game) => {
      game.rating = parseInt(game.rating * 1015 );
    });
    this._games = games;
    this.dispatchEvent(new Event("change"));
  }

=======
>>>>>>> 95674d9f441885fc473115c2d1a32ba7926f268a
  getGames() {
    return this._games;
  }

  getTrending() {
    let sorted = this._games.sort((a, b) => {
      return b.rating - a.rating
    });
<<<<<<< HEAD
    return sorted.slice(0, 15);
=======
    console.log(sorted);
    return sorted.slice(0, 10);
>>>>>>> 95674d9f441885fc473115c2d1a32ba7926f268a
  }

  getNewest() {
    let sorted = this._games.sort((a, b) => {
      return new Date(b.released) - new Date(a.released);
    });
<<<<<<< HEAD
    return sorted.slice(0, 15);
=======
    console.log(sorted);
    return sorted.slice(0, 10);
  }

  setGames(games) {
    games.map((game) => {
      game.rating = parseInt(game.rating * 1015 );
    });
    this._games = games;
    this.dispatchEvent(new Event("change"));
>>>>>>> 95674d9f441885fc473115c2d1a32ba7926f268a
  }
}

export const gameService = new GameService();
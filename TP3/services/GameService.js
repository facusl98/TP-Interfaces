class GameService extends EventTarget {
  constructor() {
    super();

    this.fetchGames();
  
    this.ready = false;

    let iconsRoute = "/TP-Interfaces/TP3/assets/icons/genres/"
    this._genres = {
      Action: iconsRoute + "Action.svg",
      RPG: iconsRoute + "RPG.svg",
      Shooter: iconsRoute + "Shooter.svg",
      Puzzle: iconsRoute + "Puzzle.svg",
      Adventure: iconsRoute + "Adventure.svg",
      Indie: iconsRoute + "Indie.svg",
      Platformer: iconsRoute + "Platformer.svg",
      MMO: iconsRoute + "MMO.svg",
      Sports: iconsRoute + "Sports.svg",
      Racing: iconsRoute + "Racing.svg",
      Simulation: iconsRoute + "Simulation.svg",
      Arcade: iconsRoute + "Arcade.svg",
      Casual: iconsRoute + "Casual.svg",
      Strategy: iconsRoute + "Strategy.svg",
      Fighting: iconsRoute + "Fighting.svg",
    }

    this._games = [];
  }

  async fetchGames() {
    let games = await fetch('https://vj.interfaces.jima.com.ar/api/v2')
      .then(res => res.json());

    games.map((game) => {
      game.rating = parseInt(game.rating * 1015);
    });

    this._games = games;
    this.ready = true;
    this.dispatchEvent(new Event("change"));
  }

  getGames() {
    return this._games;
  }

  getRandom(count) {
    let games = [];
    while(games.length < count) {
      let game = this._games[Math.floor(Math.random() * this._games.length)];
      if (!games.includes(game))
        games.push(game);
    }
    return games;
  }

  getTrending() {
    let sorted = this._games.sort((a, b) => {
      return b.rating - a.rating
    });
    return sorted.slice(0, 10);
  }

  getNewest() {
    let sorted = this._games.sort((a, b) => {
      return new Date(b.released) - new Date(a.released);
    });
    return sorted.slice(0, 10);
  }

  getGenres() {
    return this._genres;
  }

  getBy(searchName, searchGenre, all = false) {
    searchName = searchName.toLowerCase();
    searchGenre = searchGenre?.toLowerCase();
    let result = [];
    this._games.forEach((game) => {
      if (game.name.toLowerCase().includes(searchName)) {
        if (!searchGenre) { 
          result.push(game);
        } else {
          let genres = game.genres;
          genres.forEach((g) => {
            if (g.name.toLowerCase().includes(searchGenre))
              result.push(game);
          })
        }
      }
    });
    if (!all)
      return result.slice(0, 10);
    else
      return result;
  }
}

export const gameService = new GameService();

class GameService extends EventTarget {
  constructor() {
    super();
    let iconsRoute = "/assets/icons/genres/"
    this._genres = {
      action: iconsRoute + "Action.svg",
      rpg: iconsRoute + "Rpg.svg",
      shooter: iconsRoute + "Shooter.svg",
      puzzle: iconsRoute + "Puzzle.svg",
      adventure: iconsRoute + "Adventure.svg",
      indie: iconsRoute + "Indie.svg",
      platformer: iconsRoute + "Platformer.svg",
      mmo: iconsRoute + "Mmo.svg",
      sports: iconsRoute + "Sports.svg",
      racing: iconsRoute + "Racing.svg",
      simulation: iconsRoute + "Simulation.svg",
      arcade: iconsRoute + "Arcade.svg",
      casual: iconsRoute + "Casual.svg",
      strategy: iconsRoute + "Strategy.svg",
      fighting: iconsRoute + "Fighting.svg",
    }

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

  getGenres() {
    return this._genres;
  }
}

export const gameService = new GameService();
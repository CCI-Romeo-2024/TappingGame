import {debug} from "../lib/main.js";

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.winner = null;
        this.startTime = 0;
        this.endTime = 0;
    }

    finishTheGame(player) {
        const winner = player === 1 ? 2 : 1
        debug(winner, ' Win !')

        this.winner = winner
    }

    get canPlay() {
        return this.winner === null;
    }
}

export default Game;
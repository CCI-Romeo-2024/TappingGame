import { debug } from '../lib/main.js';
import { EScreen } from '../controllers/screen_controller.js';

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.winner = null;
        this.startTime = 0;
        this.endTime = 0;
        this.currentScreen = EScreen.start
    }

    finishTheGame(player) {
        this.winner = this.getOtherPlayer(player);

        debug(this.winner.name, 'Win !')

        this.endTime = Date.now();
    }

    startGame() {
        let i = 3
        const timerElement = document.querySelector('.start-timer > .timer-container')
        const iID = setInterval(() => {
            i--

            if (i <= 0) {
                clearInterval(iID)
                timerElement.innerText = ''
                this.startTime = Date.now()
                debug('Gooooo !')
            } else
                timerElement.innerText = i



        }, 1000)
    }

    /**
     * @return {[Player]}
     * */
    get getPlayers() {
        return [this.player1, this.player2];
    }

    /**
     * @param {String} key
     * @return {Player}
     * */
    getPlayer(key) {
        return this.getPlayers.find(player => player.key === key)
    }

    /**
     * @param {Player} player
     * @return {Player}
     * */
    getOtherPlayer(player) {
        return this.getPlayers[this.getPlayers.findIndex(p => p.position === player.position) === 1 ? 0 : 1]
    }

    get canPlay() {
        return this.winner === null && this.startTime !== 0;
    }
}

export default Game;
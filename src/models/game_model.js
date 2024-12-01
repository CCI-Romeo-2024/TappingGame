import { EScreen, screenManager } from '../controllers/screen_controller.js';
import { debug } from '../lib/index.js';
import {EAudio, playSound} from '../controllers/sound_controller.js';

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

        console.log(player.getPlayerID);

        const playerElement = document.getElementById(player.getPlayerID)

        playerElement.querySelector('.ship').innerHTML += `<video autoplay muted><source src="assets/explosion/explosion2.webm" type="video/webm" /></video>`
        playerElement.querySelector('.ship > img').style.display = 'none'

        document.querySelector('#winner-name').innerText = this.winner.name;
        document.querySelector('#winner-ship-img').src = `assets/ships/ship_${this.winner.position}_top.svg`

        setTimeout(() => {
            playerElement.querySelector('.ship > video').remove()
            playerElement.querySelector('.ship > img').style.display = ''

            screenManager('end', this)
        }, 1300)

        debug(this.winner.name, 'Win !')

        playSound(EAudio.explosion)
        playSound(EAudio.win)

        this.endTime = Date.now();
    }

    startGame() {
        let i = 3
        const timerElement = document.querySelector('.start-timer > .timer-container')
        timerElement.innerText = i
        playSound(EAudio.start)
        const iID = setInterval(() => {
            i--

            if (i <= 0) {
                clearInterval(iID)
                timerElement.innerText = ''
                this.startTime = Date.now()
                debug('Gooooo !')
                playSound(EAudio.start2)
            } else {
                timerElement.innerText = i
                playSound(EAudio.start)
            }
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
    getPlayerByKey(key) {
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

    newGame(p1, p2) {
        this.getPlayers.forEach((player) => {
            if (player) player.clearDamageTimeout()
        })

        this.player1 = p1;
        this.player2 = p2;

        this.getPlayers.forEach((player) => {
            player.updateHUD()
        })

        this.winner = null;
        this.startTime = 0;
        this.endTime = 0;
        this.currentScreen = EScreen.start
    }
}

export default Game;
import {game} from '../game.js';
import { EScreen, screenManager } from './screen_controller.js';
import { Player } from "../models/index.js";
import {debug} from '../lib/main.js';



const keySwitch = {
    's': document.getElementById('key-s-switch'),
    'l': document.getElementById('key-l-switch'),
}

document.addEventListener('keyup', (e) => {
    switch (game.currentScreen) {
        case EScreen.start:
            if(keySwitch[e.key])
                keySwitch[e.key].classList.remove('active');

            break;
        case EScreen.game:
            const player = game.getPlayer(e.key);
            if (!player || !game.canPlay) return
            player.fire()
            game.getOtherPlayer(player).newDamage()

            break;
    }
})

const startGame = () => {
    if (game.currentScreen !== EScreen.start) return

    const player1Name = document.getElementById('pseudo-player-1').value
    const player2Name = document.getElementById('pseudo-player-2').value

    if (!player1Name || !player2Name) return

    game.player1 = new Player(player1Name, 1, 's')
    game.player2 = new Player(player2Name, 2, 'l')

    game.startGame()

    screenManager('game', game)
}


document.addEventListener('keypress', (e) => {
    if (game.currentScreen !== EScreen.start) return
    if(keySwitch[e.key])
        keySwitch[e.key].classList.add('active');
    else if(e.key === ' ')
        startGame()
})

document.getElementById('start-btn').addEventListener('click', startGame)



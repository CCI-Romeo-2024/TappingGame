import { EScreen, screenManager } from './screen_controller.js';
import { Player } from '../models/index.js';
import { debug } from '../lib/index.js';
import { game } from '../game.js';
import {EAudio, playSound} from './sound_controller.js';



const keySwitch = {
    's': document.getElementById('key-s-switch'),
    'l': document.getElementById('key-l-switch'),
    'r': document.getElementById('key-r-switch'),
    'c': document.getElementById('key-c-switch'),
}

document.addEventListener('keyup', (e) => {
    if(keySwitch[e.key]) keySwitch[e.key].classList.remove('active');


    switch (game.currentScreen) {
        case EScreen.end:
        case EScreen.start:
            if('r' === e.key && !e.ctrlKey && e.target.type !== 'text')
                startGame()

            if(EScreen.end === game.currentScreen && e.key === 'c') {
                screenManager('start', game)
                playSound(EAudio.ui)
            }

            break;
        case EScreen.game:
            const player = game.getPlayerByKey(e.key);
            if (!player || !game.canPlay) return
            player.fire()
            game.getOtherPlayer(player).newDamage()

            break;
    }
})

const player1Name = document.getElementById('pseudo-player-1')
const player2Name = document.getElementById('pseudo-player-2')

const startGame = () => {
    if (![EScreen.start, EScreen.end].includes(game.currentScreen)) return

    if (!player1Name.value || !player2Name.value) return

    game.newGame(
        new Player(player1Name.value, 1, 's'),
        new Player(player2Name.value, 2, 'l')
    )

    game.startGame()

    screenManager('game', game)

    playSound(EAudio.ui)
}


document.addEventListener('keypress', (e) => {
    if (![EScreen.start, EScreen.end].includes(game.currentScreen)) return
    if(keySwitch[e.key])
        keySwitch[e.key].classList.add('active');

    if(' ' === e.key && !e.ctrlKey && e.target.type !== 'text')
        startGame()

});

document.getElementById('start-btn').addEventListener('click', startGame)



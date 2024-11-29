// import { debug } from '../lib/main.js';
import { game } from '../game.js'


const playersKey = {
    's': game.player1,
    'l': game.player2,
}


document.addEventListener('keyup', (e) => {
    if (playersKey[e.key]) {
        if (!game.canPlay) return
        playersKey[e.key].fire()

        playersKey[e.key === 's' ? 'l' : 's'].newDamage()


    }
})
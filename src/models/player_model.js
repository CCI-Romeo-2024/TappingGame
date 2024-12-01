import { randInt } from '../lib/index.js'
import { Hud } from './index.js';
import { game } from '../game.js';
import env from '../env.js'
import {EAudio, playSound} from '../controllers/sound_controller.js';

class Player {
    constructor(name, position, key) {
        this.position = position;
        this.name = name;
        this.health = 100;
        this.lastDamageTimeout = null;
        this.hud = new Hud(document.getElementById(`${this.getPlayerID}-health-bar`));
        this.key = key
    }

    fire() {
        const munitionsElement = document.querySelector(`#${this.getPlayerID} > .munitions`)
        const id= `bullet-${this.position}-${randInt(0, 1000)}`

        const bulletElement = document.createElement('div');
        bulletElement.className = `bullet bullet-${this.position}`;
        bulletElement.id = id;

        munitionsElement.appendChild(bulletElement);

        bulletElement.addEventListener('transitionend', () => {
            bulletElement.remove();
        });

        const otherPlayer = document.getElementById(`player-${this.position === 2 ? 1 : 2}`);


        const distance = otherPlayer.offsetLeft - bulletElement.offsetLeft + (this.position === 1 ? bulletElement.offsetWidth/2 * -1 : otherPlayer.offsetWidth/2)



        requestAnimationFrame(() => {
            bulletElement.style.transform = `translateX(calc(${distance}px))`;

        });

        playSound(EAudio.fire)

    }

    newDamageTimeout() {
        this.clearDamageTimeout()

        this.lastDamageTimeout = setTimeout(() => {
            this.addHealth(1)

            if (this.health < 100) this.newDamageTimeout()
        }, 200);
    }

    clearDamageTimeout() {
        if (!this.lastDamageTimeout) return

        clearTimeout(this.lastDamageTimeout)
        this.lastDamageTimeout = null;
    }

    addHealth(value) {
        if (!game.canPlay) return

        const previewNewHealth = this.health + value;

        if (previewNewHealth > 100)
            this.health = 100;
        else {
            this.health += value;
        }

        //debug(this.getPlayerID, this.health)

        this.updateHUD()
    }

    removeHealth(value) {
        if (!game.canPlay) return

        const previewNewHealth = this.health - value;

        if (previewNewHealth <= 0) {
            this.health = 0;

            game.finishTheGame(this);

        } else {
            this.health -= value;
        }

        // debug(this.getPlayerID, this.health)

        this.updateHUD()
    }

    updateHUD() {
        this.hud.changeScore(this.health);
    }

    newDamage() {
        this.clearDamageTimeout()
        this.newDamageTimeout()

        this.removeHealth(env.DEBUG ? 5 : 1)
    }

    get getPlayerID() {
        return `player-${this.position}`;
    }

}




export default Player
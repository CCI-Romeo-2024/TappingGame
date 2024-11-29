class Hud {
    constructor(hudElement) {
        this.hudElement = hudElement;
    }

    changeScore(value) {
        this.hudElement.querySelector('.bar-parent > .progress-bar').style.width = `${value}%`
    }
}

export default Hud
const EAudio = {
    explosion: 'explosion',
    ui: 'ui',
    start: 'start',
    start2: 'start2',
    fire: 'fire',
    win: 'win'
}

let LAudio = {
    explosion: {
        url: '../../assets/sounds/explosion.wav',
        volume: 0.8,
        loop: false
    },
    ui: {
        url: '../../assets/sounds/ui2.wav',
        volume: 1,
        loop: false
    },
    start: {
        url: '../../assets/sounds/start.wav',
        volume: 1,
        loop: false
    },
    start2: {
        url: '../../assets/sounds/ui.wav',
        volume: 1,
        loop: false
    },
    fire: {
        url: '../../assets/sounds/fire.wav',
        volume: 0.3,
        loop: false
    },
    win: {
        url: '../../assets/sounds/win.wav',
        volume: 0.5,
        loop: false
    }
};


/**
 * Play audio from list
 * @param {EAudio} soundName
 * @return HTMLAudioElement
 */
const playSound = (soundName) => {
    if (!EAudio[soundName]) return null;

    const currentAudioSettings = LAudio[soundName]

    const audio = new Audio(currentAudioSettings.url);
    audio.play().then(() => {
        audio.volume = currentAudioSettings.volume
        audio.loop = currentAudioSettings.loop
    })

    return audio
}

export { playSound, EAudio, LAudio }
const EScreen = {
    start: 0,
    game: 1
}

const EScreenID = {
    start: 'start-screen',
    game: 'game-screen'
}



/**
 * Function to change current screen
 * @param {string} screenKey
 * @param {Object} game
 * @param {number} game.currentScreen
 * @return void
 * */
const screenManager = (screenKey, game) => {
    if (!EScreen.hasOwnProperty(screenKey)) return;


    game.currentScreen = EScreen[screenKey];


    document.getElementById(EScreenID[screenKey]).style.display = 'flex'

    Object.values(EScreenID).forEach((id) => {
        if (id === EScreenID[screenKey]) return
        document.getElementById(id).style.display = 'none';
    })
}

export { EScreen, screenManager };
import env from '../env.js';

const DEBUG = (...args) => {
    if (env.DEBUG) {
        console.log(...args);
    }
}

export default DEBUG
import createGame from './game.js';
import createQuestionsNavigator from './questionsNavigator.js';

function buildGame() {
    return createGame(createQuestionsNavigator);
}

window.onload = function () {
    buildGame().start();
}
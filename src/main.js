import createGame from './game.js';
import createQuestionsNavigator from './questionsNavigator.js';
import createClient from './client.js';


function buildGame() {
    return createGame(createQuestionsNavigator, createClient());
}

window.onload = function () {
    buildGame().start();
}
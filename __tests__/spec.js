const fs = require('fs');
const path = require('path');
const chai = require('chai');
const application = require('../src/main');


function loadTemplate(filepath, onLoad) {
    const filePath = path.join(__dirname, filepath);
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            onLoad(data);
        } else {
            console.log(err);
        }
    });
}

describe("the game", function () {
    var app;
    beforeEach(function (done) {
        loadTemplate('../views/body.html', function (text) {
            document.body.innerHTML = text;
            app = application();
            app.start();
            done();
        });
    });

    /* 
    It checks that when the app starts it loads elements of the page
    in order to do so, we check if the selected elements are not null
    */
    it('loads the page elements', function () {
        expect(document.querySelector('.page--title')).not.toBeNull();
        expect(document.querySelector('.start--button')).not.toBeNull();
        expect(document.querySelector('#next--question--button')).not.toBeNull();
    });

    /* 
    It checks that when we click on start button loads the first question and the answer options
    */
    it('starts the game', function () {
        startGame();
        expect(document.querySelector('.question--title').id).toEqual("2");
    });

    it('loads the answer options', function () {
        startGame();
        expect(document.querySelectorAll('input')).not.toBeNull();
    });

    /* 
    It checks that when we click on start button loads the first question and the answer options
    */
    it('does not repeat the question', function () {
        startGame();
        let firtQuestion = document.querySelector('.question--title').id;
        displayNextQuestion();
        let nextQuestion = document.querySelector('.question--title').id
        expect(firtQuestion).not.toBe(nextQuestion);
    });

    it('knows that all the questions have been displayed', function () {
        startGame();
        displayNextQuestion();
        displayNextQuestion();
        displayNextQuestion();
        displayNextQuestion();
        expect(document.querySelector('.question--title').id).toBe("2");
    });

    /* 
    It checks that when we click on start button loads the first question and the answer options
    */
    it('checks if the counter starts', function (done) {
        let countDown = document.querySelector('.clock');
        function getCountDown() {
            expect(countDown.innerHTML).toBe("9");
            //esperará a que se ejecute done para salir del it, sino haría el setTimeout y saldría, sin realizar getCountDown
            done();
        }
        setTimeout(getCountDown, 1000);
    });

    function startGame() {
        let startGameButton = document.querySelector('.start--button');
        startGameButton.click();
    }

    function displayNextQuestion() {
        let nextQuestionButton = document.querySelector('#next--question--button');
        nextQuestionButton.click();
    }
});
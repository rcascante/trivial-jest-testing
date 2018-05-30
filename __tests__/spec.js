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
    We check that when the app starts it loads elements of the page
    in order to do so, we check if the selected elements are not null
    */
    it('loads the page elements', function () {
        expect(document.querySelector('.page--title')).not.toBeNull();
        expect(document.querySelector('.start--button')).not.toBeNull();
        expect(document.querySelector('#next--question--button')).not.toBeNull();
    });

    /* 
    We check that when we click on start button loads the first question and the answer options
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
    We check that when we click on start button loads the first question and the answer options
    */

    it('does not repeat the question', function () {
        startGame();
        let questionTitle = document.querySelector('.question--title').id;
        displayNextQuestion();
        let nextQuestion = document.querySelector('.question--title').id
        expect(firtQuestion).not.toBe(nextQuestion);
    });

    it('know that all the questions have been displayed', function () {
        startGame();
        displayNextQuestion();
        displayNextQuestion();
        displayNextQuestion();
        displayNextQuestion();
        expect(document.querySelector('.question--title').id).toBe("2");
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
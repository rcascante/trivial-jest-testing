const fs = require('fs');
const path = require('path');
const chai = require('chai');
const application = require('../src/main')


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
    let questions = [
        {
            id: 1,
            title: '¿Cuántos años tiene María?',
            answers: [
                { id: 0, answer: '25' },
                { id: 1, answer: '33' },
                { id: 2, answer: '37' }
            ],
            correctAnswer: { id: 1 }
        },
        {
            id: 2,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Madrid' }
            ],
            correctAnswer: { id: 0 }
        }
    ]
    let app;
    beforeEach(function (done) {
        loadTemplate('../views/body.html', function (text) {
            document.body.innerHTML = text;
            app = application();
            app.setServerData(questions);
            app.start();
            done();
        });
    });

    function getQuestionTitle() {
        let questionTitle = document.querySelector('.question--title');
        return questionTitle;
    }

    function expectFirstQuestionRender() {
        let questionTitle = getQuestionTitle();
        expect(Number(questionTitle.id)).toEqual(Number(questions[0].id));
        expect(questionTitle.innerHTML).toEqual(questions[0].title);
    }

    function startGame() {
        const startButton = document.querySelector('.start--button');
        startButton.click();
        expectFirstQuestionRender();
    }

    function selectFirstAnswer() {
        let answer = document.querySelector('input');
        answer.click();
    }

    function goToNextQuestion() {
        let nextQuestionButton = document.querySelector('#next--question--button');
        nextQuestionButton.click();
    }

    function expectSecondQuestionRender() {
        let questionTitle = getQuestionTitle();
        expect(Number(questionTitle.id)).toEqual(Number(questions[1].id));
        expect(questionTitle.innerHTML).toEqual(questions[1].title);
    }

    it('answers the question', function () {
        startGame();
        selectFirstAnswer();
        goToNextQuestion();
        expectSecondQuestionRender();
    });
});
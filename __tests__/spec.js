const pug = require('pug');
const path = require('path');
const chai = require('chai');
const application = require('../src/main')


describe("questions navigator", function () {
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
    let questionsNavigator;
    beforeEach(function () {
        questionsNavigator = application().questionsNavigator(questions);
    });

    it("gets a question", function () {
        let getQuestionn = questionsNavigator.getQuestion();
        expect(questions).toContain(getQuestionn);
    });
    it("always points to a question", function () {
        let getQuestionn = questionsNavigator.getQuestion();
        expect(questions).toContain(getQuestionn);
    });

    it("does not repeat questions", function () {
        let question1 = questionsNavigator.getQuestion();
        let question2 = questionsNavigator.getQuestion();
        let question3 = questionsNavigator.getQuestion();
        expect(question1).not.toEqual(question2);
        expect(question2).not.toEqual(question3);

    });



});

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
    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/index.pug', null)();
        app = application();
        app.setServerData(questions);
        app.start();
    });

    it('answers the question', function () {
        startGame();
        selectFirstAnswer();
        goToNextQuestion();
        expectSecondQuestionRender();
    });

    it('restarts de countdown time', function (done) {
        startGame();
        setTimeout(function () {
            expectCounDownTimeToRestart
            done();
        }, 1000);
    });

    function selectCoundownTime() {
        let countdownTime = document.querySelector('.clock');
        return countdownTime;
    }

    function expectCounDownTimeToRestart() {
        let countdownTime = selectCoundownTime();
        expect(countdownTime.innerHTML).toEqual('9');
    }

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
});
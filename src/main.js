function application() {

    var questions = [];
    var serverData;
    var startButton;
    var questionsContainer;
    var nextQuestionButton;
    var questionTitle;
    var questionAnswers;
    var radioAnswersList;
    var questionsIndex = -1;
    var timerId;
    var countdown;
    var questionsNavigator;


    function start() {
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStartGame);
        questionsContainer = document.querySelector('.questions__container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);
        getQuestions(function (data) {
            questions = data;
            questionsNavigator = questionsNavigator(questions)
        });
    }

    function getQuestions(callback) {

        var serverData = serverData || [
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
            },
            {
                id: 3,
                title: '¿Cuál es el nombre completo de Freud?',
                answers: [
                    { id: 0, answer: 'Adolf' },
                    { id: 1, answer: 'Sefarad' },
                    { id: 2, answer: 'Sigmund' }
                ],
                correctAnswer: { id: 2 }
            },
            {
                id: 4,
                title: '¿Cuál es el animal más rápido del mundo?',
                answers: [
                    { id: 0, answer: 'Guepardo' },
                    { id: 1, answer: 'León' },
                    { id: 2, answer: 'Tortuga' }
                ],
                correctAnswer: { id: 0 }
            }
        ];
        callback(serverData);
    }

    function onStartGame() {
        resetCountdown();
        startTimer();
        loadNextQuestion();
    }

    function onNextQuestion() {
        loadNextQuestion();
    }

    function loadNextQuestion() {
        questionsNavigator.goToNextQuestion();
        resetCountdown();
        if (questionsNavigator.isNotTheLastQuestion()) {
            renderQuestion(questionsNavigator.getQuestion());
        }
        else {
            gameOver();
        }
    }
    function gameOver() {
        hideContainerPanel();
        stopTimer();
        questionsNavigator.resetQuestions();
    }

    function questionsNavigator(questions) {
        let questionsIndex = -1;

        function isNotTheLastQuestion() {
            return questionsIndex < questions.length;
        }
        function resetQuestions() {
            questionsIndex = 0;
        }
        function goToNextQuestion() {
            questionsIndex++;
        }
        function getQuestion() {
            if (questionsIndex < 0) {
                return questions[0];
            } else if (questionsIndex >= questions.length) {
                return questions[questions.length - 1];
            }
            return questions[questionsIndex];
        }

        return {
            isNotTheLastQuestion,
            resetQuestions,
            goToNextQuestion,
            getQuestion
        }
    }

    function startTimer() {
        timerId = setInterval(function () {
            updateCountdown(onNextQuestion, timeChanged);
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerId);
    }
    function resetCountdown() {
        countdown = 10;
    }
    function timeChanged() {
        var clock = document.querySelector('.clock');
        clock.innerHTML = countdown;
    }
    function updateCountdown(onTimeout, onTimeChanged) {
        countdown--;
        if (countdown > 0) {
            onTimeChanged();
        }
        else if (countdown === 0) {
            onTimeout();
        }
    }



    function renderQuestion(question) {
        showContainerPanel();
        questionTitle.innerHTML = (question.title);
        questionTitle.setAttribute('id', question.id);
        for (var x = 0; x < question.answers.length; x++) {
            questionAnswers[x].innerHTML = (question.answers[x].answer);
            radioAnswersList[x].setAttribute('id', question.answers[x].id);
        }
    }
    function showContainerPanel() {
        questionsContainer.classList.remove('hidden');
    }
    function hideContainerPanel() {
        questionsContainer.classList.toggle('hidden');
    }

    return {
        start,
        setServerData: function (data) {
            serverData = data;
        },
        questionsNavigator
    }
}

if (typeof (module) != 'undefined') {
    module.exports = application;
}
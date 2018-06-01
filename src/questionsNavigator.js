var saberGanar = saberGanar || {};

saberGanar.questionsNavigator = function (questions) {
    let questionsIndex = 0;
    let nonVisitedQuestion = true;

    function isNotTheLastQuestion() {
        return nonVisitedQuestion;
    }
    function resetQuestions() {
        questionsIndex = 0;
    }
    function goToNextQuestion() {
        questionsIndex++;
    }
    function getNextQuestion() {
        let question = questions[questionsIndex];
        goToNextQuestion();
        if (questionsIndex == questions.length) {
            nonVisitedQuestion = false;
            resetQuestions();
        }
        return question;
    }

    return {
        isNotTheLastQuestion,
        getNextQuestion
    }
};

//be able to import file in node
if (typeof (module) != 'undefined') {
    module.exports = saberGanar;
}

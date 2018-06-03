export default function createClient() {
    function getQuestions(callback) {
        let request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            let questions = JSON.parse(request.responseText);
            callback(questions);
        });
        request.open('GET', '/api/questions');
        request.onerror = function () {
            console.log("** An error occurred during the transaction");
        };
        request.send();
    }
    return {
        getQuestions
    }
}
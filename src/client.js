export default function createClient() {
    function getQuestions(successCallback, errorCallback) {
        let request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            let questions = JSON.parse(request.responseText);
            successCallback(questions);
        });
        request.open('GET', '/api/questions');
        request.addEventListener('error', (error) => {
            console.log(error.target.status);
            errorCallback(error.target.status);
        });
        request.send();
    }
    return {
        getQuestions
    }
}
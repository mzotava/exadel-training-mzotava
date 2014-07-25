(function(win){

    var testMod = function(wrapper, data) {
        this.qList = wrapper.getElementById("qList");
        this.questionsName = wrapper.getElementById("questionName");
        this.questionsTheme = wrapper.getElementById("questionsTheme");
        this.num = wrapper.getElementById("questionNumber");
        this.answerList = wrapper.getElementById("answerList");

        this.data = data || null;
    };

    testMod.prototype.setQuestionsTheme = function (testNum) {
        var number = testNum; number++;
        this.questionsTheme.innerHTML = "";
        this.questionsTheme.appendChild(wrapper.createTextNode(number+ ". " + dataMod.quizData[testNum].description));
    };

    testMod.prototype.setQuestionName = function (testNum, questionNum) {
        this.questionsName.innerHTML = "";
        this.questionsName.appendChild(wrapper.createTextNode(dataMod.quizData[testNum].questions[questionNum].question));
    };

    testMod.prototype.setStatistic = function (testNum, questionNum) {
        var number = questionNum; number++;
        this.stat.innerHTML = "";
        this.stat.appendChild(wrapper.createTextNode(number + "/" + dataMod.quizData[testNum].questions.length));
    };

    testMod.prototype.setQuestionNum = function (questionNum) {
        var number = questionNum; number++;
        this.num.innerHTML = "";
        this.num.appendChild(wrapper.createTextNode(number + "#"));
    };

    testMod.prototype.setAnswerList = function (testNum, questionNum) {
        var answerLength = dataMod.quizData[testNum].questions[questionNum].answers.length;
        this.answerList.innerHTML = "";

        for (var answerNum = 0; answerNum < answerLength; answerNum++) {
            var variant = wrapper.createElement("li");
            variant.setAttribute("data-q-index", answerNum + 1);
            variant.appendChild(wrapper.createTextNode(answerNum + 1 + ". " + dataMod.quizData[testNum].questions[questionNum].answers[answerNum]));
            this.answerList.appendChild(variant);
        }
        persistsnseMod.currentRightAnswer = dataMod.quizData[testNum].questions[questionNum].right;
    };

    testMod.prototype.loadTest = function () {
        var testNum = localStorage.getItem("test") || 0;
        var qNum = localStorage.getItem("answ") || 0;
        var qLength = dataMod.quizDataLength;
        dataMod.countAnswered(testNum, qLength);

        if (persistsnseMod.AnsweredNum == qLength) {
            dataMod.deleteAttrAnswered(testNum, qLength);
            eventMod.toggleStatistic();
            return;
        }

        this.data.checkingOnEnd(testNum, qLength);
        this.setQuestionsTheme(testNum);
        this.setStatistic(testNum, qNum);
        this.setQuestionName(testNum, qNum);
        this.setQuestionNum(qNum);
        this.setAnswerList(testNum, qNum);

    };

    win.TestMod = testMod;

})(window);

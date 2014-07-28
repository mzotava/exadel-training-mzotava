(function(win){

    var testMod = function(wrapper, persist, data) {
        this.qList = wrapper.getElementById("qList");
        this.questionsName = wrapper.getElementById("questionName");
        this.questionsTheme = wrapper.getElementById("questionsTheme");
        this.num = wrapper.getElementById("questionNumber");
        this.answerList = wrapper.getElementById("answerList");
        this.goBack = wrapper.getElementById("goBack");
        this.setAnswer = wrapper.getElementById("setAnswer");
        this.skipQuestion = wrapper.getElementById("skipQuestion")

        this.persist = persist || null;
        this.data = data || null;
    };

    testMod.prototype.loadTest = function () {
        var testNum = this.persist.getFromStorage("test") || 0;
        var qNum = this.persist.getFromStorage("answ") || 0;
        var qLength = this.data.quizDataLength;
        this.data.countAnswered(testNum, qLength);

        if (this.persist.AnsweredNum == qLength) {
            this.data.deleteAttrAnswered(testNum, qLength);
            this.toggleStatistic();
            return;
        }

        this.data.checkingOnEnd(testNum, qLength);
        this.setQuestionsTheme(testNum);
        this.setStatistic(testNum, qNum);
        this.setQuestionName(testNum, qNum);
        this.setQuestionNum(qNum);
        this.setAnswerList(testNum, qNum);

    };

    testMod.answerList.addEventListener("click", function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        var boldBlue = this.wrapper.getElementsByClassName("boldBlue");
        if (boldBlue.length)
            boldBlue[0].classList.remove("boldBlue");
        if (target.tagName.toLocaleLowerCase() === 'li')
            target.classList.add("boldBlue");
    });

    testMod.goBack.addEventListener("click", function () {
        this.toggleMenu();
        this.persist.setNullToStorage();
    });

    testMod.setAnswer.addEventListener("click", function (e) {
        var self = this;
        var userAnswer = this.wrapper.getElementsByClassName("boldBlue");
        if(userAnswer.length != 0) {
            if (userAnswer[0].getAttribute("data-q-index") == this.persist.currentRightAnswer) {
                this.persist.rightAnswers.push(this.persist.currentQuestionNum);
                this.persist.setToStorage("right", this.persist.rightAnswers);
            }
            this.data.quizData[this.persist.currentTestNum].questions[this.persist.currentQuestionNum].answered = true;
            this.persist.currentQuestionNum++;
            this.persist.setToStorage("answ", this.persist.currentQuestionNum);
            self.loadTest();
            e.stopImmediatePropagation();
        }

    });

    testMod.skipQuestion.addEventListener("click", function (e) {
        var self = this;
        this.persist.currentQuestionNum++;
        this.persist.setToStorage("answ", this.persist.currentQuestionNum);
        self.loadTest();
        e.stopImmediatePropagation();
    });

    testMod.prototype.setQuestionsTheme = function (testNum) {
        var number = testNum; number++;
        this.questionsTheme.innerHTML = "";
        this.questionsTheme.appendChild(this.wrapper.createTextNode(number+ ". " + this.data.quizData[testNum].description));
    };

    testMod.prototype.setQuestionName = function (testNum, questionNum) {
        this.questionsName.innerHTML = "";
        this.questionsName.appendChild(this.wrapper.createTextNode(this.data.quizData[testNum].questions[questionNum].question));
    };

    testMod.prototype.setStatistic = function (testNum, questionNum) {
        var number = questionNum; number++;
        this.stat.innerHTML = "";
        this.stat.appendChild(this.wrapper.createTextNode(number + "/" + this.data.quizData[testNum].questions.length));
    };

    testMod.prototype.setQuestionNum = function (questionNum) {
        var number = questionNum; number++;
        this.num.innerHTML = "";
        this.num.appendChild(this.wrapper.createTextNode(number + "#"));
    };

    testMod.prototype.setAnswerList = function (testNum, questionNum) {
        var answerLength = this.data.quizData[testNum].questions[questionNum].answers.length;
        this.answerList.innerHTML = "";

        for (var answerNum = 0; answerNum < answerLength; answerNum++) {
            var variant = this.wrapper.createElement("li");
            variant.setAttribute("data-q-index", answerNum + 1);
            variant.appendChild(this.wrapper.createTextNode(answerNum + 1 + ". " + this.data.quizData[testNum].questions[questionNum].answers[answerNum]));
            this.answerList.appendChild(variant);
        }
        this.persist.currentRightAnswer = this.data.quizData[testNum].questions[questionNum].right;
    };



    testMod.prototype.toggleStatistic = function () {

        this.stat.classList.add("hidden");
        this.question.classList.add("hidden");
        this.skipQuestion.classList.add("hidden");
        this.setAnswer.classList.add("hidden");
        this.results.classList.remove("hidden");
        this.resultsList.innerHTML = "";

        for (var rightQuestion = 0; rightQuestion < this.persist.rightAnswers.length; rightQuestion++) {
            var resultsItem = document.createElement("li");
            var number = this.persist.rightAnswers[rightQuestion]; number++;
            resultsItem.appendChild(document.createTextNode(number + ". "));
            this.resultsList.appendChild(resultsItem);
        }
    };

    testMod.prototype.toggleMenu = function () {
        this.menu.classList.remove("hidden");
        this.tests.classList.add("hidden");
    };

    win.TestMod = testMod;
})(window);

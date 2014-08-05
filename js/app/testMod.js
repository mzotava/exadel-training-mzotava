(function(win){

    var testMod = function(wrapper, persist, data, router) {
        this.menu = document.getElementById("menu");
        this.tests = document.getElementById("tests");
        this.qList = document.getElementById("qList");
        this.questionsName = document.getElementById("questionName");
        this.questionsTheme = document.getElementById("questionsTheme");
        this.num = document.getElementById("questionNumber");
        this.answerList = document.getElementById("answerList");
        this.goBack = document.getElementById("goBack");
        this.setAnswer = document.getElementById("setAnswer");
        this.skipQuestion = document.getElementById("skipQuestion");
        this.stat = document.getElementById("statistic");

        this.persist = persist || null;
        this.data = data || null;
        this. router = router || null;
    };

    testMod.prototype.loadTest = function () {
        var testNum = this.persist.getFromStorage("test") || 0;
        var qNum = this.persist.getFromStorage("answ") || 0;
        var qLength = this.data.quizData[this.persist.currentTestNum].questions.length;
        this.data.countAnswered(testNum, qLength);

        if (this.persist.AnsweredNum == qLength) {
            this.data.deleteAttrAnswered(testNum, qLength);
            this.toggleStatistic();
            return;
        }

        this.data.checkingOnEnd(testNum, qLength);
        qNum = this.persist.getFromStorage("answ") || 0;
        this.setQuestionsTheme(testNum);
        this.setStatistic(testNum, qNum);
        this.setQuestionName(testNum, qNum);
        this.setQuestionNum(qNum);
        this.setAnswerList(testNum, qNum);
        this.router.setUrl(testNum, qNum);

    };

    testMod.prototype.addEventAnsw = function() {
        var self = this;
        this.answerList.addEventListener("click", function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;

            var boldBlue = document.getElementsByClassName("boldBlue");
            if (boldBlue.length === 1)
                boldBlue[0].classList.remove("boldBlue");
            if (target.tagName.toLocaleLowerCase() === 'li')
                target.classList.add("boldBlue");

        });
    };

    testMod.prototype.addEventGoBack = function() {
        var self = this;
        this.goBack.addEventListener("click", function () {
            self.toggleMenu();
            self.data.deleteAttrAnswered(self.persist.currentTestNum, self.data.quizDataLength);
            self.persist.setNullToStorage();
            self.router.clearUrl();
        });
    };

    testMod.prototype.addEventSetAnsw = function() {
        var self = this;
        this.setAnswer.addEventListener("click", function (e) {
            var userAnswer = document.getElementsByClassName("boldBlue");
            if (userAnswer.length != 0) {
                if (userAnswer[0].getAttribute("data-q-index") == self.persist.currentRightAnswer) {
                    self.persist.rightAnswers.push(self.persist.currentQuestionNum);
                    self.persist.setToStorage("right", self.persist.rightAnswers);
                }
                self.data.quizData[self.persist.currentTestNum].questions[self.persist.currentQuestionNum].answered = true;
                self.persist.currentQuestionNum++;
                self.persist.setToStorage("answ", self.persist.currentQuestionNum);
                self.loadTest();
                e.stopImmediatePropagation();
            }

        });
    };

    testMod.prototype.addEventSkip = function() {
        var self = this;
        this.skipQuestion.addEventListener("click", function (e) {
            self.persist.currentQuestionNum++;
            self.persist.setToStorage("answ", self.persist.currentQuestionNum);
            self.loadTest();
            e.stopImmediatePropagation();
        });
    };


    testMod.prototype.setQuestionsTheme = function (testNum) {
        var number = testNum; number++;
        this.questionsTheme.innerHTML = "";
        this.questionsTheme.appendChild(document.createTextNode(number+ ". " + this.data.quizData[testNum].description));
    };

    testMod.prototype.setQuestionName = function (testNum, questionNum) {
        this.questionsName.innerHTML = "";
        this.questionsName.appendChild(document.createTextNode(this.data.quizData[testNum].questions[questionNum].question));
    };

    testMod.prototype.setStatistic = function (testNum, questionNum) {
        var number = questionNum; number++;
        this.stat.innerHTML = "";
        this.stat.appendChild(document.createTextNode(number + "/" + this.data.quizData[testNum].questions.length));
    };

    testMod.prototype.setQuestionNum = function (questionNum) {
        var number = questionNum; number++;
        this.num.innerHTML = "";
        this.num.appendChild(document.createTextNode(number + "#"));
    };

    testMod.prototype.setAnswerList = function (testNum, questionNum) {
        var answerLength = this.data.quizData[testNum].questions[questionNum].answers.length;
        this.answerList.innerHTML = "";

        for (var answerNum = 0; answerNum < answerLength; answerNum++) {
            var variant = document.createElement("li");
            variant.setAttribute("data-q-index", answerNum + 1);
            variant.appendChild(document.createTextNode(answerNum + 1 + ". " + this.data.quizData[testNum].questions[questionNum].answers[answerNum]));
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

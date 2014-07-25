(function(wrapper){

    var eventMod = function(){


        this.tests = wrapper.getElementById("tests");

        this.results = wrapper.getElementById("results");
        this.stat = wrapper.getElementById("statistic");
        this.resultsList = wrapper.getElementById("resultsList");
        this.answerList = wrapper.getElementById("answerList");
        this.question = wrapper.getElementById("question");
        this.skipQuestion = wrapper.getElementById("skipQuestion");
        this.setAnswer = wrapper.getElementById("setAnswer");
        this.goBack = wrapper.getElementById("goBack");



    };

    eventMod.prototype.menu.addEventListener("click", function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target.tagName.toLocaleLowerCase() === 'li') {
            persistsnseMod.currentTestNum = target.getAttribute("data-q-index") - 1;

            if(persistsnseMod.getFromStorage("test"))
                if (persistsnseMod.currentTestNum != persistsnseMod.getFromStorage("test")) {
                    persistsnseMod.currentQuestionNum = 0;
                    persistsnseMod.rightAnswers.length =0;
                    persistsnseMod.setToStorage("answ", persistsnseMod.currentQuestionNum);
                    persistsnseMod.setToStorage("right", persistsnseMod.rightAnswers);
                }
            persistsnseMod.setToStorage("test", persistsnseMod.currentTestNum);
            this.toggleTest();
        }
    });

    eventMod.prototype.answerList.addEventListener("click", function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        var boldBlue = wrapper.getElementsByClassName("boldBlue");
        if (boldBlue.length)
            boldBlue[0].classList.remove("boldBlue");
        if (target.tagName.toLocaleLowerCase() === 'li')
            target.classList.add("boldBlue");
    });

    eventMod.prototype.goBack.addEventListener("click", function () {
        this.toggleMenu();
        persistsnseMod.setNullToStorage();
    });


    eventMod.prototype.setAnswer.addEventListener("click", function (e) {
        var userAnswer = wrapper.getElementsByClassName("boldBlue");
        if(userAnswer.length != 0) {
            if (userAnswer[0].getAttribute("data-q-index") == persistsnseMod.currentRightAnswer) {
                persistsnseMod.rightAnswers.push(persistsnseMod.currentQuestionNum);
                persistsnseMod.setToStorage("right", persistsnseMod.rightAnswers);
            }
            dataMod.quizData[persistsnseMod.currentTestNum].questions[persistsnseMod.currentQuestionNum].answered = true;
            persistsnseMod.currentQuestionNum++;
            persistsnseMod.setToStorage("answ", persistsnseMod.currentQuestionNum);
            testMod.loadTest();
            e.stopImmediatePropagation();
        }

    });

    eventMod.prototype.getElementById("skipQuestion").addEventListener("click", function (e) {
        persistsnseMod.currentQuestionNum++;
        persistsnseMod.setToStorage("answ", persistsnseMod.currentQuestionNum)
        testMod.loadTest();
        e.stopImmediatePropagation();
    });

    eventMod.prototype.toggleTest = function () {

        this.menu.classList.add("hidden");
        this.results.classList.add("hidden");
        this.tests.classList.remove("hidden");
        this.stat.classList.remove("hidden");
        this.question.classList.remove("hidden");
        this.skipQuestion.classList.remove("hidden");
        this.setAnswer.classList.remove("hidden");
        testMod.loadTest();

    };

    eventMod.prototype.toggleStatistic = function () {

        this.stat.classList.add("hidden");
        this.question.classList.add("hidden");
        this.skipQuestion.classList.add("hidden");
        this.setAnswer.classList.add("hidden");
        this.results.classList.remove("hidden");
        this.resultsList.innerHTML = "";

        for (var rightQuestion = 0; rightQuestion < persistsnseMod.rightAnswers.length; rightQuestion++) {
            var resultsItem = document.createElement("li");
            var number = persistsnseMod.rightAnswers[rightQuestion]; number++;
            resultsItem.appendChild(document.createTextNode(number + ". "));
            this.resultsList.appendChild(resultsItem);
        }
    };

    eventMod.prototype.toggleMenu = function () {

        this.menu.classList.remove("hidden");
        this.tests.classList.add("hidden");
    };









    window.eventMod = eventMod;
});
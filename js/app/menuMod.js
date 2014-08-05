(function(win){

    var menuMod = function(wrapp, persist, data , test) {
        this.wrapper = wrapp;
        this.qList = document.getElementById("qList");
        this.menu = document.getElementById("menu");
        this.tests = document.getElementById("tests");
        this.results = document.getElementById("results");
        this.stat = document.getElementById("statistic");
        this.resultsList = document.getElementById("resultsList");
        this.answerList = document.getElementById("answerList");
        this.question = document.getElementById("question");
        this.skipQuestion = document.getElementById("skipQuestion");
        this.setAnswer = document.getElementById("setAnswer");


        this.persist = persist || null;
        this.data = data || null;
        this.test = test || null;
//        var menuThis = this;

    };



    menuMod.prototype.setQuestionList = function(){
        for (var itemNum = 0; itemNum < this.data.quizDataLength; itemNum++) {
            var listItem = document.createElement("li");
            listItem.setAttribute("data-q-index", itemNum + 1);
            listItem.appendChild(document.createTextNode(itemNum + 1 + ". " + this.data.quizData[itemNum].title));
            this.qList.appendChild(listItem);
        }
    };
    menuMod.prototype.toggleTest = function () {

        this.menu.classList.add("hidden");
        this.results.classList.add("hidden");
        this.tests.classList.remove("hidden");
        this.stat.classList.remove("hidden");
        this.question.classList.remove("hidden");
        this.skipQuestion.classList.remove("hidden");
        this.setAnswer.classList.remove("hidden");
    };

    menuMod.prototype.addEventMenu = function(){
        var self = this;
        self.menu.addEventListener("click", function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target.tagName.toLocaleLowerCase() === 'li') {
                self.persist.currentTestNum = target.getAttribute("data-q-index") - 1 || self.persist.getFromStorage("test")
                self.persist.checking();
                self.toggleTest();
                self.persist.getJSON("qData");
                self.test.loadTest();


            }
        });
    };



    win.MenuMod = menuMod;

})(window);
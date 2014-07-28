(function(win){

    var menuMod = function(wrapper, persist, data) {
        this.qList = wrapper.getElementById("qList");
        this.menu = wrapper.getElementById("menu");
        this.tests = wrapper.getElementById("tests");
        this.results = wrapper.getElementById("results");
        this.stat = wrapper.getElementById("statistic");
        this.resultsList = wrapper.getElementById("resultsList");
        this.answerList = wrapper.getElementById("answerList");
        this.question = wrapper.getElementById("question");

        this.persist = persist || null;
        this.data = data || null;
        var menuThis = this;
        this.menu.addEventListener("click", function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target.tagName.toLocaleLowerCase() === 'li') {
                menuThis.persist.currentTestNum = target.getAttribute("data-q-index") - 1;
                menuThis.persist.checking();
                menuThis.toggleTest();
            }
        });
    };



    menuMod.prototype.setQuestionList = function(){
        for (var itemNum = 0; itemNum < this.data.quizDataLength; itemNum++) {
            var listItem = this.wrapper.createElement("li");
            listItem.setAttribute("data-q-index", itemNum + 1);
            listItem.appendChild(this.wrapper.createTextNode(itemNum + 1 + ". " + this.data.quizData[itemNum].title));
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


    win.MenuMod = menuMod;

})(window);
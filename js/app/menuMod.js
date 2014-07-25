(function(win){

    var menuMod = function(wrapper) {
        this.qList = wrapper.getElementById("qList");
        this.menu = wrapper.getElementById("menu");
    };

    menuMod.prototype.setQuestionList = function(){
        for (var itemNum = 0; itemNum < dataMod.quizDataLength; itemNum++) {
            var listItem = wrapper.createElement("li");
            listItem.setAttribute("data-q-index", itemNum + 1);
            listItem.appendChild(this.wrapper.createTextNode(itemNum + 1 + ". " + dataMod.quizData[itemNum].title));
            this.qList.appendChild(listItem);
        }
    };

    win.MenuMod = menuMod;

})(window);
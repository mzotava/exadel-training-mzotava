(function(wrapper){

    var menuMod = function() {
        this.qList = wrapper.getElementById("qList");
    };

    menuMod.prototype.setQuestionList = function(){
        for (var itemNum = 0; itemNum < dataMod.quizDataLength; itemNum++) {
            var listItem = wrapper.createElement("li");
            listItem.setAttribute("data-q-index", itemNum + 1);
            listItem.appendChild(wrapper.createTextNode(itemNum + 1 + ". " + dataMod.quizData[itemNum].title));
            this.qList.appendChild(listItem);
        }
    };

    window.menuMod = menuMod;

});
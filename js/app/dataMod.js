(function(win){

    var dataMod = function(persist) {
        this.quizData = [];
        this.quizDataLength = 0;
        this.persist = persist || null;
    };

    dataMod.prototype.getDataFromServer = function(){
        var req = new XMLHttpRequest();
        req.open('GET', 'templates/quizz-data.json', false);
        req.send(null);
        if (req.status == 200)
            this.quizData = JSON.parse(req.responseText);

        this.persist.setJSON("qData", this.quizData)
        this.quizDataLength = this.quizData.length;
    };

    dataMod.prototype.checkingOnEnd = function (testNum, qLength) {
        if (this.persist.currentQuestionNum >= qLength)
            this.persist.currentQuestionNum = 0;
        while (this.persist.currentQuestionNum < qLength && this.quizData[testNum].questions[this.persist.currentQuestionNum].hasOwnProperty("answered"))
            this.persist.currentQuestionNum++;
        if (this.persist.currentQuestionNum >= qLength)
            this.persist.currentQuestionNum = 0;
        this.persist.setToStorage("answ", this.persist.currentQuestionNum);
    };

    dataMod.prototype.deleteAttrAnswered = function (testNum, qLength) {
        for (var variantNumForDel = 0; variantNumForDel < qLength; variantNumForDel++)
            delete this.quizData[testNum].questions[variantNumForDel].answered;
        this.persist.setJSON("qData", this.quizData);
    };

    dataMod.prototype.countAnswered = function (testNum, qLength) {
        this.persist.AnsweredNum = 0;
        for (var variantNum = 0; variantNum < qLength; variantNum++)
            if (this.quizData[testNum].questions[variantNum].hasOwnProperty("answered"))
                this.persist.AnsweredNum++;
    };


    win.DataMod = dataMod;

})(window);
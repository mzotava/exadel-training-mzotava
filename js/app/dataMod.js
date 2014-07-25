(function(){

    var dataMod = function() {
        this.quizData = [];
        this.quizDataLength = 0;
    };

    dataMod.prototype.getDataFromServer = function(){
        var req = new XMLHttpRequest();
        req.open('GET', 'templates/quizz-data.json', false);
        req.send(null);
        if (req.status == 200)
            this.quizData = JSON.parse(req.responseText);

        persistsnseMod.setJSON("qData", this.quizData)
        this.quizDataLength = this.quizData.length;
    };

    dataMod.prototype.checkingOnEnd = function (testNum, qLength) {
        if (persistsnseMod.currentQuestionNum >= qLength)
            persistsnseMod.currentQuestionNum = 0;
        while (persistsnseMod.currentQuestionNum < qLength && this.quizData[testNum].questions[persistsnseMod.currentQuestionNum].hasOwnProperty("answered"))
            persistsnseMod.currentQuestionNum++;
        if (persistsnseMod.currentQuestionNum >= qLength)
            persistsnseMod.currentQuestionNum = 0;
    };

    dataMod.prototype.deleteAttrAnswered = function (testNum, qLength) {
        for (var variantNumForDel = 0; variantNumForDel < qLength; variantNumForDel++)
            delete this.quizData[testNum].questions[variantNumForDel].answered;
    };

    dataMod.prototype.countAnswered = function (testNum, qLength) {
        persistsnseMod.AnsweredNum = 0;
        for (var variantNum = 0; variantNum < qLength; variantNum++)
            if (this.quizData[testNum].questions[variantNum].hasOwnProperty("answered"))
                persistsnseMod.AnsweredNum++;
    };

    window.dataMod = dataMod;
});
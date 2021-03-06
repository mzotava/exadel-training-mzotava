(function(win){

    var persistenceMod = function() {
        this.currentTestNum = 0;
        this.currentQuestionNum = 0;
        this.rightAnswers = [];
        this.AnsweredNum = 0;
        this.currentRightAnswer = -1;
    }

    persistenceMod.prototype.setToStorage = function(key, value){
        localStorage.setItem(key, value);
    };

    persistenceMod.prototype.getFromStorage = function(key){
        return localStorage.getItem(key);
    };

    persistenceMod.prototype.setJSON = function(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    };

    persistenceMod.prototype.getJSON = function(key){
        return JSON.parse(localStorage.getItem(key));
    };

    persistenceMod.prototype.setNullToStorage = function(){
        this.currentTestNum = 0;
        this.setToStorage("test", this.currentTestNum);

        this.currentQuestionNum = 0;
        this.setToStorage("answ", this.currentQuestionNum);

        this.AnsweredNum = 0;
        this.setToStorage("rightNum", this.AnsweredNum);

        this.rightAnswers.length = 0;
        this.setToStorage("right", this.rightAnswers);
    };

    persistenceMod.prototype.checking = function(){
        if(this.getFromStorage("test"))
            if (this.currentTestNum != this.getFromStorage("test")) {
                this.currentQuestionNum = 0;
                this.rightAnswers.length =0;
                this.setToStorage("answ", this.currentQuestionNum);
                this.setToStorage("right", this.rightAnswers);
            }
        this.setToStorage("test", this.currentTestNum);
    };

    win.PersistenceMod = persistenceMod;

})(window);
(function(){

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
        localStorage.getItem(key);
    };

    persistenceMod.prototype.setJSON = function(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    };

    persistenceMod.prototype.getJSON = function(key){
        JSON.parse(localStorage.getItem(key));
    };

    persistenceMod.prototype.setNullToStorage = function(){
        persistenceMod.currentTestNum = 0;
        this.setToStorage("test", persistenceMod.currentTestNum);

        persistenceMod.currentQuestionNum = 0;
        this.setToStorage("answ", persistsnseMod.currentQuestionNum);

        persistenceMod.AnsweredNum = 0;
        this.setToStorage("rightNum", persistsnseMod.AnsweredNum);

        persistenceMod.rightAnswers.length = 0;
        this.setToStorage("right", persistsnseMod.rightAnswers);
    };

    window.persistsnseMod = persistsnseMod;
});
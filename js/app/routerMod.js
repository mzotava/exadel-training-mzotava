(function(win){

    var router=function(persist){
        this.persist = persist;
    };


    router.prototype.setUrl = function(testNum, questionNum){
        var test = testNum; test++;
        var question = questionNum; question++;
        window.location.hash = '#test' + test + '/question' + question ;
    };

    router.prototype.clearUrl = function(){
        window.location.hash = '';
    };

    router.prototype.getUrl = function(){
        var regExTest = /#test([0-9]{1})/;
        var regExQuestion = /\/question([0-9]{1,2})/;
        if(window.location.hash != "") {
            var testNum = window.location.hash.match(regExTest)[1]-1;
            var qNum = window.location.hash.match(regExQuestion)[1]-1;
            this.persist.currentTestNum = testNum;
            this.persist.currentQuestionNum = qNum;
            this.persist.setToStorage("test", testNum);
            this.persist.setToStorage("answ", qNum);
            return 1;
        }
        return -1;
    };

    window.Router = router;

}(window));
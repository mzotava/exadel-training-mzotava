
var mainMod = function() {

    this.wrapper = document.getElementById("wrapper");

};

mainMod.prototype.init = function(){

    this.persistenceMod = new PersistenceMod();

    this.dataMod = new DataMod(this.persistenceMod);
    this.dataMod.getDataFromServer();
    this.menuMod = new MenuMod(this.wrapper, this.persistenceMod, this.dataMod);
    this.menuMod.setQuestionList();
    this.testMod = new TestMod(this.wrapper, this.persistenceMod, this.dataMod);
    this.testMod.loadTest();
};

var main = new mainMod();
main.init();






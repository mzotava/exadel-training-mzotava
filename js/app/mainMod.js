
var mainMod = function() {

    this.wrapper = document.getElementById("wrapper");

};

mainMod.prototype.init = function(){

    this.persistenceMod = new PersistenceMod();

    this.dataMod = new DataMod(this.persistenceMod);
    this.routerMod = new Router(this.persistenceMod);
    this.testMod = new TestMod(this.wrapper, this.persistenceMod, this.dataMod, this.routerMod);
    this.menuMod = new MenuMod(this.wrapper, this.persistenceMod, this.dataMod, this.testMod);

    this.dataMod.getDataFromServer();
    if(this.routerMod.getUrl() == 1){
        this.menuMod.toggleTest();
        this.testMod.loadTest();
    }
    else this.routerMod.clearUrl();

    this.testMod.addEventAnsw();
    this.testMod.addEventGoBack();
    this.testMod.addEventSetAnsw();
    this.testMod.addEventSkip();


    this.menuMod.setQuestionList();
    this.menuMod.addEventMenu();





};

var main = new mainMod();
main.init();






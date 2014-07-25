
var mainMod = function() {

    this.wrapper = document.getElementById("wrapper");

};

mainMod.prototype.init = function(){

    this.testMod = testMod(this.wrapper);
    this.menuMod = menuMod(this.wrapper);
    this.dataMod = dataMod();
    this.persistenceMod = persistenceMod();
    this.eventMod = eventMod(this.wrapper);
}

window.onload = function(){
    var main = mainMod();
    main.init();

}






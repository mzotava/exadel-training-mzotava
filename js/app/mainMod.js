
var mainMod = function() {

    this.wrapper = document.getElementById("wrapper");

};

mainMod.prototype.init = function(){

    this.persistenceMod = new PersistenceMod();

    this.dataMod = new DataMod(this.persistenceMod);

    this.testMod = new TestMod(this.wrapper, this.dataMod);
    this.menuMod = menuMod(this.wrapper);


    this.eventMod = eventMod(this.wrapper);
}

var main = new mainMod();
main.init();






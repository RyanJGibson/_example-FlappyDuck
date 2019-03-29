require.config({

  paths: {
    "PIXI": "../../../framework/pixi_v_4_3_2",
    "jQuery": "../../../framework/jquery",
	"Tween":"../../../framework/TweenMax",
	"Howler":"../../../framework/howler",
	"HandleCookie":"../../../framework/handlecookie",
	
	"Stage": "../../../framework/stage",
	"FluidElement": "../../../framework/fluidElement",
	"LoadBar":"../../../framework/loadbar",
	"Trig":"../../../framework/trig",
	"HandleXML":"../../../framework/handlexml",
	"AssetHandler":"../../../framework/assethandler",
	"ButtonHelper":"../../../framework/buttonHelper",
	"KeyboardHelper":"../../../framework/keyboardHelper",
	"BisonLogo":"../../../framework/bisonlogo",
	
	
	"TitleScreen":"titlescreen",
	"FlapDuck":"flapduck",
	"Clouds":"clouds",
	"Race":"race",
	"Pipe":"pipe",
	"Star":"star"
  },
	shim: {
    "Tween": {
      exports: "TweenMax"
    }
  },
  
  
  waitSeconds:0
});



define(["main","jQuery"],
  function (Game,jQuery){
  window.game = new Game();
});



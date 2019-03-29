define(function(require) {

    var PIXI = require('PIXI');
	var Tween = require('Tween');
	var AssetHandler = require('AssetHandler');

	
    var FlapDuck = function (oParent, oParentDispObjContainer, nID, nX, nY) {
		console.log("Creating New FlapDuck");
		this.oParent = oParent;
		this.oParentDispObjContainer = oParentDispObjContainer;
		this.nID = nID;
		
		this.nVY = 0;
		this.nGrav = 0.3;
		this.nX =  nX;
		this.nY =  nY;
		
		this.InitGraphics(nX, nY);
    };
	
	FlapDuck.prototype.InitGraphics = function(nX, nY){
		this.cDuckContainer = new PIXI.Container();
		
		this.graLoadBack = new PIXI.Graphics();
		this.graLoadBack.beginFill('0xff0000');
		this.graLoadBack.drawCircle(0,0,100);
	//	this.cDuckContainer.addChild(this.graLoadBack);	
		this.graLoadBack.alpha=0.2;
		
		this.sprDuckBody = AssetHandler.GetSprite("duck_face");
		this.cDuckContainer.addChild(this.sprDuckBody);
		
		this.sprDuckBody.x=-92;
		this.sprDuckBody.y=-90;

		//this.oDispObjContainer.pivot.x = 35;
		//this.oDispObjContainer.pivot.y = 35;
		
		this.mcHair = AssetHandler.GetMovieClip(["duck_hair0001","duck_hair0002","duck_hair0003","duck_hair0002"]);
		this.mcHair.animationSpeed = 0.2;
		this.cDuckContainer.addChild(this.mcHair);
		this.mcHair.play();
		this.mcHair.x = -33;
		this.mcHair.y=-115;
		
		this.mcEye = AssetHandler.GetMovieClip(["duck_eye0001","duck_eye0002","duck_eye0003","duck_eye0001"]);
		this.mcEye.animationSpeed = 0.5;
		this.cDuckContainer.addChild(this.mcEye);
		this.mcEye.stop();
		this.mcEye.x = 28;
		this.mcEye.y=-45;
		
		
		this.mcWing = AssetHandler.GetMovieClip(["duck_wing0001","duck_wing0002","duck_wing0003","duck_wing0004","duck_wing0005","duck_wing0006","duck_wing0007","duck_wing0008","duck_wing0004"]);
		this.mcWing.animationSpeed = 0.5;
		this.cDuckContainer.addChild(this.mcWing);
		this.mcWing.play();
		this.mcWing.x = -80;
		this.mcWing.y=-10;
		
		
		this.oParentDispObjContainer.addChild(this.cDuckContainer);
		this.nX =  nX;
		this.nY =  nY;
		this.cDuckContainer.x =  nX;
		this.cDuckContainer.y =  nY;
		this.Blink();
	};
	
	FlapDuck.prototype.Blink = function(){
		this.mcEye.gotoAndPlay(1);
		this.mcEye.loop=false;
	};
	
	FlapDuck.prototype.UpdatePosition = function(nX,nY){
		this.nX =  nX;
		this.nY =  nY;
		this.cDuckContainer.x =  nX;
		this.cDuckContainer.y =  nY;
	};



    return FlapDuck;
});
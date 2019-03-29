define(function (require) {
    
	
	var Stage = require('Stage');
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');
	var Tween = require('Tween');
	var FluidElement = require('FluidElement');
	var ButtonHelper = require('ButtonHelper');
	
	
	var Star = function(oParent, oParentDispObjContainer, nID, nX, nY){
		//console.log("Creating New Star");
		this.oParent = oParent;
		this.oParentDispObjContainer = oParentDispObjContainer;
		
		this.nID = nID;
		
		this.bValid = true;

		this.oDispObjContainer = new PIXI.Container();
		this.oParentDispObjContainer.addChild(this.oDispObjContainer);

		this.oDispObjContainer.pivot.x = 39;
		this.oDispObjContainer.pivot.y = 37.5;
		
		this.Init(nX,nY);
		
		this.nYCount = 0;
		
	};
	
	
	
	Star.prototype.Init = function(nX, nY){
	//	console.log("Star Init");
		
		this.sprStar = AssetHandler.GetSprite("star");
		this.oDispObjContainer.addChild(this.sprStar);
		this.nX = nX;
		this.nY = nY;
		this.nVX = -2.5;
		this.nVY = 0;
		
		this.UpdateXY();
	};
	
	Star.prototype.Expand = function(){
		//this.oDispObjContainer.scale.x = 2;
		//this.oDispObjContainer.alpha = 0.8;
		
		var oTweenAlpha = Tween.to(this.oDispObjContainer,0.2, 
			{alpha:0,delay:0.4
		});
		var oTweenAlpha = Tween.to(this.oDispObjContainer.scale,0.2, 
			{x:2.2,y:2.2,delay:0.4
		});
		var oTweenScale = Tween.to(this.oDispObjContainer.scale,0.3, 
			{x:1.6,y:1.6,ease:Back.easeOut
		});
		
		
	} 

	Star.prototype.UpdateXY = function(){
		this.nX += this.nVX;
		this.nY += this.nVY;
		this.oDispObjContainer.position.x = this.nX;
		this.oDispObjContainer.position.y = this.nY;
	};
	
	Star.prototype.Destroy = function(){
		this.oParentDispObjContainer.removeChild(this.oDispObjContainer);
	};
	
    return Star;
});
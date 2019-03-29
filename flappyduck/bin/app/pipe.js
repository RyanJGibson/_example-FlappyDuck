define(function(require) {

    var PIXI = require('PIXI');
	var Tween = require('Tween');
	var AssetHandler = require('AssetHandler');

	
    var Pipe = function (oParent, oParentDispObjContainer, nID, nX, nY, nWidth, nHeight, bTop) {
		console.log("Creating New Pipe");
		this.oParent = oParent;
		this.oParentDispObjContainer = oParentDispObjContainer;
		this.nID = nID;
		
		this.nX = nX;
		this.nY = nY;
		this.nWidth = nWidth;
		this.nHeight = nHeight;
		
		this.bTop = bTop;
		
		this.InitGraphics(nX, nY, nWidth, nHeight);
    };
	
	
	Pipe.prototype.InitGraphics = function(nX, nY, nWidth, nHeight){
		this.cPipeContainer = new PIXI.Container();
		this.oParentDispObjContainer.addChild(this.cPipeContainer);
		
		this.cPipeContainer.x = nX;
		this.cPipeContainer.y = nY;
		
		this.sprPipeMiddle = AssetHandler.GetSprite("pipe_middle");
		this.cPipeContainer.addChild(this.sprPipeMiddle);
		
		this.sprPipeMiddle.x = 5;
		this.sprPipeMiddle.height = nHeight;
		
		
		if(this.bTop){
			this.sprPipeTop = AssetHandler.GetSprite("pipe_end_down");
			this.cPipeContainer.addChild(this.sprPipeTop);
			this.sprPipeTop.y = nHeight - 106 ;
		}else{
			this.sprPipeBottom = AssetHandler.GetSprite("pipe_end_up");
			this.cPipeContainer.addChild(this.sprPipeBottom);
		}
		
	};
	
	
	Pipe.prototype.UpdateX = function(){
		this.cPipeContainer.x = this.nX;
	};
	
	Pipe.prototype.Destroy = function(){
		this.oParentDispObjContainer.removeChild(this.cPipeContainer);
	};
	




    return Pipe;
});
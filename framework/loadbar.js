define(function (require) {
	//Creates a basic graphical loadbar

    var LoadBar = {};
	var PIXI = require('PIXI');
	var Tween = require('Tween');
	var FluidElement = require('FluidElement');
	var Stage = require('Stage');

    LoadBar.Init = function (oParentContainer, fLoadBarAnimFinished, nWidth, nHeight, nPosX, nPosY, nColorFore, nColorBack, nColorFont, bText) {
    	console.log("LoadBar.Init");
		
		this.oParentContainer = oParentContainer;
		this.oContainer = new PIXI.Container();
		
		
		this.oParentContainer.addChild(this.oContainer);
		this.oContainer.position.x = nPosX;
		this.oContainer.position.y = nPosY;
		
    	this.fLoadBarAnimFinished = fLoadBarAnimFinished;
    	
    	this.nWidth = nWidth;
    	this.nHeight = nHeight;
    	this.nColorFore = nColorFore;
    	this.nColorBack = nColorBack;
		this.nColorFont = nColorFont;
    	this.bText = bText;

		this.graLoadBack = new PIXI.Graphics();
		this.graLoadBack.beginFill(this.nColorBack);
		this.graLoadBack.drawRect(0,0,this.nWidth,this.nHeight);
		this.oContainer.addChild(this.graLoadBack);
		
		this.graLoadFore = new PIXI.Graphics();
		this.graLoadFore.beginFill(this.nColorFore);
		this.graLoadFore.drawRect(0,0,this.nWidth,this.nHeight);
		this.oContainer.addChild(this.graLoadFore);

		this.graLoadFore.scale.x = 0.001;

		
		if(this.bText){
			this.tLoadingText = new PIXI.Text("Loading: 0.00%", {font:"15px Verdana, Geneva, sans-serif", fill:this.nColorFont});
			this.oContainer.addChild(this.tLoadingText);
			this.tLoadingText.position.y = this.nHeight;
		}
		
		var oLoadBarFE = new FluidElement(this.oContainer, nPosY, nPosY+76);
		Stage.AddFluidElement(oLoadBarFE);
		Stage.Resize();
    };


    LoadBar.Update = function (nPerc, nTotalLoaded, nTotal, sFile) {
    	var oTweenScale = Tween.to(this.graLoadFore.scale, 0.2, 
			{x:nPerc,
				onComplete:function(){
					if(nPerc == 1){
						console.log("loading complete");
						this.Hide();

					}
				}.bind(this)
		});
		if(this.bText){
    		this.tLoadingText.text = "Loading:" + (nPerc*100).toFixed(2) + "%";
    		if (!sFile){
    			sFile = "";
    		}
    		if(nTotalLoaded){
    			this.tLoadingText.text = "Loading: " + nTotalLoaded + " / " + nTotal + "  (" + (nPerc*100).toFixed(2) + "%)\n" + sFile;
    		}
    	}

    };
	
	LoadBar.Hide = function(){
		var oTweenAlpha = Tween.to(this.oContainer, 0.5, 
			{alpha:0,
			onComplete:function(){
				this.fLoadBarAnimFinished();
			}.bind(this)
		});
	};

    return LoadBar;
});
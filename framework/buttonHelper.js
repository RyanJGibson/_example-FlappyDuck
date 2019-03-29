define(function (require) {
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');

	//creates a new display object with up, over, down and disabled states

	//parent refers to module, parent disp obj container is the container the button will be created within
	var ButtonHelper = function(oParent, oParentDispObjContainer){
		console.log("Creating New Button");
		this.nID = Math.random();
		this.nCurrnetButton = 0;
		this.bIsEnabled = true;
		this.bRenderAsEnabled = true;
	
		this.bIsDown = false;
		this.bIsOver = false;

		this.oParent = oParent;
		this.oParentDispObjContainer = oParentDispObjContainer;
		this.oDispObjContainer = new PIXI.Container();
	};

	ButtonHelper.prototype.InitGraphics = function(sprUpRef, sprOverRef, sprDownRef, sprDisabledRef){
		console.log("ButtonHelper InitGraphics");

		this.sprUpRef = sprUpRef;
		this.sprOverRef = sprOverRef;
		this.sprDownRef = sprDownRef;
		this.sprDisabledRef = sprDisabledRef;
		
		this.sprButton = AssetHandler.GetSprite(sprUpRef);
		this.oDispObjContainer.addChild(this.sprButton);

		this.oParentDispObjContainer.addChild(this.oDispObjContainer);
	};




	ButtonHelper.prototype.Init = function(fOnPress, fOnRelease, fOnOver){

		

		this.fOnPress = fOnPress;
		
		if(fOnRelease){
			this.fOnRelease = fOnRelease;
		}
		if(fOnOver){
			this.fOnOver = fOnOver;
		}

		this.oDispObjContainer.interactive =true;
		this.oDispObjContainer.buttonMode=true;


		this.oDispObjContainer.mousedown = this.oDispObjContainer.touchstart = function(md){
			//console.log("down " + this.nID);
			this.nCurrnetButton =  this.nID;
			this.bIsDown = true;
			if(this.bRenderAsEnabled){
				this.sprButton.texture = AssetHandler.GetTexture(this.sprDownRef);
			}
			
			if(this.bIsEnabled){
				this.fOnPress(md);
			}
			
			this.data = md;
			// event.data.identifier
		}.bind(this);

		
		this.oDispObjContainer.mouseover = function(md) {
			//console.log("mouseover: " + this.bIsDown);
			this.bIsOver = true;
			if(this.bIsDown){
				return
			}
			if(this.bRenderAsEnabled){
				this.sprButton.texture = AssetHandler.GetTexture(this.sprOverRef);
			}
			if(this.bIsEnabled && this.fOnOver){
				this.fOnOver(md);
			}
			//console.log();
		}.bind(this);

		this.oDispObjContainer.mouseout = this.oDispObjContainer.mouseleave = function(md){
			//console.log("mouseout");
			this.bIsOver = false;
			this.bIsDown = false;
			if(this.bRenderAsEnabled){
				this.sprButton.texture = AssetHandler.GetTexture(this.sprUpRef);
			}
		}.bind(this);

		
		//this.oDispObjContainer.touchendoutside  // causes problems when two buttons used siultaneously
		
		this.oDispObjContainer.mouseup = this.oDispObjContainer.mouseupoutside = this.oDispObjContainer.touchend = function(md){
			//console.log(this.data);
			//console.log("mouseup");
			//console.log("up " + this.nID + " / " + this.nCurrnetButton);
			
			if(this.nID == this.nCurrnetButton){
				this.bIsDown = false;
				if(this.bRenderAsEnabled){
					
					if(this.bIsOver){
						this.sprButton.texture = AssetHandler.GetTexture(this.sprOverRef);
					}else{
						this.sprButton.texture = AssetHandler.GetTexture(this.sprUpRef);
					}
				}
				
				if(this.bIsEnabled && this.fOnRelease){
					this.fOnRelease(md);
				}
			}

		}.bind(this);
		
		this.oDispObjContainer.touchendoutside = function(td){
			//console.log(this.nID);
			//console.log(td.data.originalEvent);
		}.bind(this);
		
		
		
		
		//this.oDispObjContainer.on('mousemove', function(){console.log("ok")})
		
		
		//this.oDispObjContainer.touchendoutside
		
		//this.oDispObjContainer.touchmove = function(touchData){
		   //console.log("TOUCH MOVE: ");
		  // console.log(touchData);
		   //var localCoordsPosition = touchData.getLocalPosition(this.oDispObjContainer);
		   //console.log(localCoordsPosition);
		   
		   //console.log(this.nID);
		  // console.log(touchData.data.getLocalPosition(this.oDispObjContainer));
		   
		//}.bind(this);
 


	};



	ButtonHelper.prototype.RenderAsEnabled = function(){
	//	console.log("RenderAsEnabled");
		this.bRenderAsEnabled = true;
		this.sprButton.texture = AssetHandler.GetTexture(this.sprUpRef);
	};

	ButtonHelper.prototype.RenderAsDisabled = function(){
	//	console.log("RenderAsDisabled");
		this.bRenderAsEnabled = false;
		this.sprButton.texture = AssetHandler.GetTexture(this.sprDisabledRef);
	};

	ButtonHelper.prototype.Enable = function(){
		this.bIsEnabled = true;
	};

	ButtonHelper.prototype.Disable = function(){
		this.bIsEnabled = false;
	};

	


	return ButtonHelper;
});
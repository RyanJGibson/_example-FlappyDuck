define(function (require) {
    var BisonLogo = {};
	var Stage = require('Stage');
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');
	var Tween = require('Tween');
	var FluidElement = require('FluidElement');

	
	
	//	BisonLogo - just a handy helper dump the logo on stage and fire an event when it's finished

	BisonLogo.Init = function(oContainer, nX, nY, fOnComplete){
		console.log("BisonLogo.Init");
		
		this.fOnComplete = fOnComplete;
		
		var aBisonGraphics =[
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0002",
				"bison_logo_anim0002",
				"bison_logo_anim0003",
				"bison_logo_anim0003",
				"bison_logo_anim0004",
				"bison_logo_anim0004",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				"bison_logo_anim0005",
				"bison_logo_anim0005",
				"bison_logo_anim0006",
				"bison_logo_anim0006",
				"bison_logo_anim0007",
				"bison_logo_anim0007",
				
				"bison_logo_anim0004",
				"bison_logo_anim0004",
				"bison_logo_anim0003",
				"bison_logo_anim0003",
				"bison_logo_anim0002",
				"bison_logo_anim0002",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001",
				"bison_logo_anim0001"
		];

		
		

		this.conBisonContainer = new PIXI.Container();
		
		
		
			
		
		
		
		this.graBack = new PIXI.Graphics();
		this.graBack.beginFill(0xFFFFFF);
		this.graBack.drawRect(-1000,-1000,2000,2000);
		this.conBisonContainer.addChild(this.graBack);
		this.conBisonContainer.scale.x=1.2;
		this.conBisonContainer.scale.y=1.2;
		
		
		var sprText = AssetHandler.GetSprite("bison_logo_text");
		this.conBisonContainer.addChild(sprText);
		sprText.position.y = 215;
		
		var aBisonTextuers = [];
		for(var i=0;i<aBisonGraphics.length;i++){
			//console.log(aBisonGraphics[i]);
			var texture =  AssetHandler.GetTexture(aBisonGraphics[i]);
			aBisonTextuers.push(texture);
		}

		this.mcBison = new PIXI.extras.AnimatedSprite(aBisonTextuers);
		this.mcBison.animationSpeed = 0.7;

		oContainer.addChild(this.conBisonContainer);
		this.conBisonContainer.addChild(this.mcBison);
		
		this.mcBison.position.x = 48;
		
		this.conBisonContainer.position.x = nX;
		this.conBisonContainer.position.y = nY;
		
		
		var oBisonLogoFE = new FluidElement(this.conBisonContainer, nY, nY+76);
		Stage.AddFluidElement(oBisonLogoFE);
		Stage.Resize();
		
		//
		

		//this.tPlay = new PIXI.Text("( TAP BISON TO START )", {font:"15px Verdana, Geneva, sans-serif", fill:"#000000"});
		//
		this.tPlay = new PIXI.Text("( TAP BISON TO START )", {fontFamily:"Verdana, Geneva, sans-serif", fontSize:"60px", fill:"#000000"});
		this.tPlay.scale.x = this.tPlay.scale.y = .25;

		this.conBisonContainer.addChild(this.tPlay);
		this.tPlay.position.x = 87;
		this.tPlay.position.y = 290;
		
		
		this.oTweenStartAlpha = Tween.to(this.tPlay,1.1, 
			{alpha:0.1,yoyo:true,repeat:-1,delay:0.5,ease:Power2.easeIn
		});
		this.conBisonContainer.alpha=0;
		var oTweenAlpha = Tween.to(this.conBisonContainer,0.3, 
			{alpha:1,delay:0
		});
		
		
		this.graBack.interactive = true;
		this.graBack.buttonMode = true;
		this.graBack.mousedown = this.graBack.touchstart = function(md){
			console.log("ok");
			this.Play();
		}.bind(this);
	
	};
	
	BisonLogo.Play = function(){
		this.oTweenStartAlpha.kill();
		
		setTimeout(function(){ AssetHandler.PlaySound("angrybisonaudio"); }.bind(this),400);
		this.mcBison.play();
		this.oTweenStartAlpha = Tween.to(this.tPlay,2, 
			{alpha:0
		});
		
		
		var oTweenAlpha = Tween.to(this.conBisonContainer,0.5, 
			{alpha:0,delay:3,
			onComplete:function(){
				this.fOnComplete();
			}.bind(this)
		});
		
		this.graBack.mousedown = this.graBack.touchstart = null;
	};
	

	
	
    return BisonLogo;
});
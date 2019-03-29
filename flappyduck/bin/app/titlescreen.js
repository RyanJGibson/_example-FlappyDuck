define(function (require) {
    var TitleScreen = {};
	var Stage = require('Stage');
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');
	var Tween = require('Tween');
	var FluidElement = require('FluidElement');
	var ButtonHelper = require('ButtonHelper');
	
	var FlapDuck = require('FlapDuck');
	var Clouds = require('Clouds');
	

	TitleScreen.Init = function(oParent, oParentContainer){
		console.log("TitleScreen.Init");
		
		$("#myBod").css("background-color", "#FFDD00");
		
		this.oParent = oParent;
		
		this.oParentContainer = oParentContainer;
		
		this.cTitleContainer = new PIXI.Container();
		this.oParentContainer.addChild(this.cTitleContainer);
		
		var sprBck = AssetHandler.GetSprite("backg");
		this.cTitleContainer.addChild(sprBck);
		
		this.cCloudContainer = new PIXI.Container();
		this.cTitleContainer.addChild(this.cCloudContainer);
		
		//bison button
		this.btnBisonLink = new ButtonHelper(this, this.cTitleContainer);
		this.btnBisonLink.oDispObjContainer.visible=false;
		//his.btnBisonLink.oDispObjContainer.alpha=0;
		this.btnBisonLink.InitGraphics("bison_button","bison_button","bison_button","bison_button");
		this.btnBisonLink.Init(function(){ this.OnBtnBisonLink(); }.bind(this));
		this.btnBisonLink.oDispObjContainer.x = 110;
		var obtnBisonLinkFE = new FluidElement(this.btnBisonLink.oDispObjContainer, 10, 10);
		Stage.AddFluidElement(obtnBisonLinkFE);
		
		//txt presents
		this.sprPresents = AssetHandler.GetSprite("txt_presents");
		this.sprPresents.visible=false;
		this.cTitleContainer.addChild(this.sprPresents);
		this.sprPresents.x=330;
		var oPresentsFE = new FluidElement(this.sprPresents, 10, 10);
		Stage.AddFluidElement(oPresentsFE);
		
		
		this.sprTitle = AssetHandler.GetSprite("title_txt");
		this.sprTitle.alpha=0;
		this.sprTitle.y=-500;
		this.cTitleContainer.addChild(this.sprTitle);
		
		this.sprTitle.x=50;
		//var oTitleFE = new FluidElement(this.sprTitle, 65, 65);
		//Stage.AddFluidElement(oTitleFE);
		
		this.btnPlay = new ButtonHelper(this, this.cTitleContainer);
		this.btnPlay.oDispObjContainer.alpha=0;
		this.btnPlay.InitGraphics("btn_play_up","btn_play_over","btn_play_down","btn_play_down");
		this.btnPlay.Init(function(){ this.OnBtnPlay(); }.bind(this));
		this.btnPlay.oDispObjContainer.x = 170;
		var oBtnPlayFE = new FluidElement(this.btnPlay.oDispObjContainer, 590, 680);
		Stage.AddFluidElement(oBtnPlayFE);
		

		
		this.btnBisonLink.oDispObjContainer.alpha=0;
		this.sprPresents.alpha=0;

		
		this.btnSkip = new ButtonHelper(this, this.cTitleContainer);
		//this.btnSkip.oDispObjContainer.alpha=0;
		this.btnSkip.InitGraphics("btn_play_up","btn_play_over","btn_play_down","btn_play_down");
		this.btnSkip.Init(function(){ this.OnBtnSkip(); }.bind(this));
		this.btnSkip.oDispObjContainer.width=640;
		this.btnSkip.oDispObjContainer.height=920;
		this.btnSkip.oDispObjContainer.alpha=0;
		
		
		this.cFlapDuckContainer = new PIXI.Container();
		this.cTitleContainer.addChild(this.cFlapDuckContainer);
		this.FlapDuck = new FlapDuck(this, this.cFlapDuckContainer, 1, 0,0);
		
		this.cFlapDuckContainer.position.x = -200;
		
		var oFlapDuckContainerFE = new FluidElement(this.cFlapDuckContainer, 470, 530);
		Stage.AddFluidElement(oFlapDuckContainerFE);
	};
	
	
	
	TitleScreen.OnBtnSkip = function(){
		if(this.oTweenAlpha0){
			this.oTweenAlpha.kill();
			this.oTweenAlpha0.kill();
			this.oTweenAlpha1.kill();
			this.oTweenAlpha2.kill();
			this.oTweenAlpha4.kill();
		}
		this.btnBisonLink.oDispObjContainer.alpha=1;
		this.sprPresents.alpha=1;
		this.btnPlay.oDispObjContainer.alpha = 1;
		this.btnPlay.oDispObjContainer.visible = true;
		
		this.sprTitle.y = 65;
		this.sprTitle.alpha = 1;
		this.sprTitle.visible = true;
		
		this.cFlapDuckContainer.x = 320;
		
		this.btnSkip.oDispObjContainer.visible = false;
		this.btnPlay.Enable();
	};
	
	
	TitleScreen.Show = function(){
		console.log("Show");
		
		this.cTitleContainer.alpha=1;
		Clouds.Init(this.oParent,this.cCloudContainer );
		
		this.btnBisonLink.oDispObjContainer.alpha=0;
		this.btnBisonLink.oDispObjContainer.visible=true;
		this.oTweenAlpha0 = Tween.to(this.btnBisonLink.oDispObjContainer,0.5, 
			{alpha:1,delay:1,onStart:function(){/*AssetHandler.PlaySound("ding");*/}.bind(this)
		});
		this.sprPresents.alpha=0;
		this.sprPresents.visible=true;
		this.oTweenAlpha1 = Tween.to(this.sprPresents,0.5, 
			{alpha:1,delay:2,onStart:function(){/*AssetHandler.PlaySound("ding");*/}.bind(this)
		});
		
		
		this.btnSkip.oDispObjContainer.visible = true;
		this.cTitleContainer.visible = true;
	
		console.log("this.nSprTitleCorrect: " + this.nSprTitleCorrect);
		console.log("this.nSprTitleStarty: " + this.nSprTitleStarty);
		this.sprTitle.y = -500;
		console.log("this.sprTitle.y " + this.sprTitle.y);
		this.oTweenAlpha = Tween.to(this.sprTitle,1.5, 
			{alpha:1,y:65,delay:3,ease:Bounce.easeOut,
			onStart:function(){
				AssetHandler.PlaySound("tada");
				//this.fOnComplete();
			}
		});
		
		/*AssetHandler.PlaySound("ding");*/
		
		this.cFlapDuckContainer.x = -200;
		this.oTweenAlpha2 = Tween.to(this.cFlapDuckContainer,2, 
			{x:320,delay:4,ease:Back.easeOut,
			onComplete:function(){
				AssetHandler.PlaySound('quack');
			}
		});

		this.btnPlay.Disable();
		this.btnPlay.oDispObjContainer.visible = true;
		this.btnPlay.oDispObjContainer.alpha=0;
		this.oTweenAlpha4 = Tween.to(this.btnPlay.oDispObjContainer,0.5, 
			{alpha:1,delay:5,onStart:function(){/*AssetHandler.PlaySound("ding")*/}.bind(this),
			onComplete:function(){
				this.btnPlay.Enable();
				this.btnSkip.oDispObjContainer.visible = false;
			}.bind(this)
		});
		
		this.bPlayPressed = false;
		
	};
	
	
	TitleScreen.OnBtnPlay = function(oParent, oParentContainer){
		console.log("OnBtnPlay");
		if(!this.bPlayPressed){
			this.Hide();
			
			AssetHandler.PlaySound("click");
			this.bPlayPressed = true;
		}
	};
	
	
	TitleScreen.OnBtnBisonLink = function(){
		AssetHandler.PlaySound("click");
		window.location.href = 'http://www.angrybison.com';
	};

	
	TitleScreen.Hide = function(){
		console.log("Hide");
		
		this.oTweenAlpha2 = Tween.to(this.cFlapDuckContainer,2, 
			{x:950,ease:Back.easeIn
		});

		/*
		var oTweenAlpha = Tween.to(this.cTitleContainer,1, 
			{alpha:0,delay:1.5,
			onComplete:function(){
				this.cTitleContainer.visible = false;
				this.oParent.StartGame();
				Clouds.Destroy();
			}.bind(this)
		});
		*/
		
		var oTweenAlpha = Tween.to(this.cTitleContainer,1, 
			{alpha:0,delay:1.8,
			onComplete:function(){
				Clouds.Destroy();
				this.cTitleContainer.visible = false;
				this.oParent.StartGame();
				
			}.bind(this)
		});

		
		
	};

	
	TitleScreen.Loop = function(){
		//console.log("Loop");
		var nRan = Math.random()*100;
		if(nRan < 2){
			this.FlapDuck.Blink();
		}
		Clouds.Loop();
		
	};

	
	
    return TitleScreen;
});
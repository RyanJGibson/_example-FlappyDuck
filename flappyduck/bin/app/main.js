define(function(require) {
  'use strict';
	var Stage = require('Stage');
	var LoadBar = require('LoadBar');
    var PIXI = require('PIXI');
	var Tween = require('Tween');
	var Trig = require('Trig');
	var HandleXML = require('HandleXML');
	var AssetHandler = require('AssetHandler');
	var ButtonHelper = require('ButtonHelper');
	var HandleCookie = require('HandleCookie');
	var KeyboardHelper = require('KeyboardHelper');
	var BisonLogo = require('BisonLogo');
	var FluidElement = require('FluidElement');
	
	var TitleScreen = require('TitleScreen');
	var Race = require('Race');
	
    var Main = function () {
		console.log("main init");
		
		//HandleCookie.CreateCookie("test","ok");
		var result =  HandleCookie.ReadCookie("test");
		console.log(result);
		
		
		Stage.Init(this,640,920);// 640/768-920
		this.arText.visible=false;
		this.devText.visible=false;
		
		
		KeyboardHelper.Init();
		this.n = 0;
		Stage.StartTick(function(){this.Tick();}.bind(this));
		this.sMode="LoadXML";
    };
	
	Main.prototype.LoadXML = function(oJSON){
		HandleXML.LoadXMLDoc("bin/assets/xml/config.xml",this.XMLLoaded.bind(this));
		this.sMode="LoadingXML";
	};
	
	Main.prototype.XMLLoaded = function(oJSON){
		this.sMode="LoadingAssets";
		console.log(oJSON);
		AssetHandler.Init(oJSON, this.OnLoadProgress.bind(this), this.OnLoadComplete.bind(this));
	
		LoadBar.Init(this.oStage, function(){this.LoadBarAnimFinished();  /*this.Init();*/}.bind(this), 400, 20, 120,380, 0xFF0000, 0x000000, 0x000000, false);
	};
	
	Main.prototype.OnLoadProgress = function(nPerc){
		console.log("nPerc: " + nPerc);
		LoadBar.Update(nPerc);
	};
	
	Main.prototype.OnLoadComplete = function(){
		console.log("OnLoadComplete");
		
	};
	
	Main.prototype.LoadBarAnimFinished = function(){
		
		BisonLogo.Init(this.oStage, 115,170, function(){this.Init();}.bind(this));
		this.sMode="ShowBison";
		this.oStage.removeChild(this.devText);
		this.oStage.addChild(this.devText);
		this.oStage.removeChild(this.arText);
		this.oStage.addChild(this.arText);
		Stage.Resize();
		//ffcc00
	};
	
	Main.prototype.Init = function(){
		console.log('Init');
		
		
		//AssetHandler.LoopSound('valkyries');
		
		var sprAR = AssetHandler.GetSprite("ar");
		//this.oStage.addChild(sprAR);
		
		
		//AssetHandler.PlaySound("test2");
		
		
		
		TitleScreen.Init(this, this.oStage);
		
	//	Race.Init(this, this.oStage);
		TitleScreen.Show();
		this.sMode="LoopTitle";
		
		Race.Init(this, this.oStage);
		
		/*
		//this.btnTest.oDispObjContainer.position.y = 700;
		this.btnTest.oDispObjContainer.position.x = 35;
		this.btnTest.oDispObjContainer.scale.x = 2;
		this.btnTest.oDispObjContainer.scale.y = 2;
		var oBtnTestFE = new FluidElement(this.btnTest.oDispObjContainer, 600, 750);
		Stage.AddFluidElement(oBtnTestFE);
		
		
		KeyboardHelper.AssignFunctionToFireOnKeyDown(32, function(){this.TestSound();}.bind(this));
		//KeyboardHelper.AssignFunctionToFireOnKeyUp(32, function(){this.TestSound();}.bind(this));
		

		*/
		
		this.oStage.removeChild(this.devText);
		this.oStage.addChild(this.devText);
		this.oStage.removeChild(this.arText);
		this.oStage.addChild(this.arText);
		
	};
	
	
	Main.prototype.StartGame = function(){
		console.log("StartGame");
		Race.Show();
		this.sMode = "LoopGame";
	};
	
	Main.prototype.EndGame = function(){
		console.log("EndGame");
		TitleScreen.Show();
		Race.Hide();
		this.sMode = "LoopTitle";
	};


	
	
	
	
	Main.prototype.Tick = function(){
	
		this.devText.text = this.sMode;
		switch(this.sMode){
			case "Wait":
				//console.log(Math.random());
			break;
			case "LoadXML":
				this.LoadXML();
			break;
			case "LoopTitle":
				TitleScreen.Loop();
			break;
			case "LoopGame":
				Race.Loop();
			break;
			case "HitPipe":
				
			break;
			
		}
		


	};
	
	
    
    Main.getInstance = function () {
        return this;
    };

    return Main;
});
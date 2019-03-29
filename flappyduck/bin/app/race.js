define(function (require) {
    var Race = {};
	
	var Stage = require('Stage');
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');
	var Tween = require('Tween');
	var FluidElement = require('FluidElement');
	var ButtonHelper = require('ButtonHelper');
	
	var FlapDuck = require('FlapDuck');
	var Clouds = require('Clouds');
	var Pipe = require('Pipe');
	var Star = require('Star');
	var Trig = require('Trig');
	var HandleCookie = require('HandleCookie');
	

	Race.Init = function(oParent, oParentContainer){
		console.log("Race.Init");
		
		this.oParent = oParent;
		
		this.oParentContainer = oParentContainer;
		
		this.cRaceContainer = new PIXI.Container();
		this.oParentContainer.addChild(this.cRaceContainer);
		
		this.cRaceContainer.visible = false;
		
		var sprBck = AssetHandler.GetSprite("backg");
		this.cRaceContainer.addChild(sprBck);
		sprBck.y = -96;
		
		var oRaceContainerFE = new FluidElement(this.cRaceContainer, 0, 95);
		Stage.AddFluidElement(oRaceContainerFE);
	
		this.InitUI();
	};
	
	
	Race.InitUI = function(){
		console.log("Race.InitUI");
		
		this.cUIContainer = new PIXI.Container();
		
		this.cGameAssetContainer = new PIXI.Container();
		
		
		this.cRaceContainer.addChild(this.cGameAssetContainer);
		
		this.cCloudContainer = new PIXI.Container();
		this.cGameAssetContainer.addChild(this.cCloudContainer);
		
		this.cStarContainer = new PIXI.Container();
		this.cRaceContainer.addChild(this.cStarContainer);
		
		this.cRaceContainer.addChild(this.cUIContainer);
		
		this.graTest = new PIXI.Graphics();
		this.graTest.beginFill('0x0000FF');
		this.graTest.drawRect(0,0,640,750);
		this.cUIContainer.addChild(this.graTest);
		this.graTest.alpha=0;
		
		
		this.graFade = new PIXI.Graphics();
		this.graFade.beginFill(0x000000);
		this.graFade.alpha=0.5;
		this.graFade.drawRect(0,0,640,920);
		this.cUIContainer.addChild(this.graFade);
		this.graFade.visible=false;
		
		
		this.btnFlap = new ButtonHelper(this, this.cUIContainer);
		//this.btnFlap.oDispObjContainer.alpha=0;
		this.btnFlap.InitGraphics("btn_play_up","btn_play_over","btn_play_down","btn_play_down");
		this.btnFlap.Init(function(){ this.OnbtnFlap(); }.bind(this));
		this.btnFlap.oDispObjContainer.width=640;
		this.btnFlap.oDispObjContainer.height=920;
		this.btnFlap.oDispObjContainer.alpha=0;
		this.btnFlap.oDispObjContainer.y=-95;
		
		//this.cFlapDuckContainer = new PIXI.Container();
		//this.cGameAssetContainer.addChild(this.cFlapDuckContainer);
		
		this.nStartFlapX = 160;
		this.nStartFlapY = 210;
		
		this.FlapDuck = new FlapDuck(this, this.cGameAssetContainer, 2, this.nStartFlapX,this.nStartFlapY);
		
		this.tScore = AssetHandler.GetBitmapFont("Hat_white",72,"left");
		this.cUIContainer.addChild(this.tScore);
		this.tScore.x=30;
		//this.tInstruct.y=50;
		
		this.tScore.text = "STARS: 0";
		var oScoreFE = new FluidElement(this.tScore, 680, 750);
		Stage.AddFluidElement(oScoreFE);
		
		
		
		this.tMaxScore = AssetHandler.GetBitmapFont("Hat_white",72,"left");
		this.cUIContainer.addChild(this.tMaxScore);		
		this.tMaxScore.x=350;
		
		this.tMaxScore.text = "BEST: 0";
		var oMaxScoreFE = new FluidElement(this.tMaxScore, 680, 750);
		Stage.AddFluidElement(oMaxScoreFE);

		
		/*
		
		this.btnLeft = new ButtonHelper(this, this.cUIContainer);
		this.btnLeft.InitGraphics("btn_dir_up","btn_dir_over","btn_dir_down","btn_dir_down");
		this.btnLeft.Init(function(){ this.OnLeftDown(); }.bind(this), function(){ this.OnLeftUp(); }.bind(this));
		this.btnLeft.oDispObjContainer.x = 0;
		var obtnLeftFE = new FluidElement(this.btnLeft.oDispObjContainer, 440, 600);
		Stage.AddFluidElement(obtnLeftFE);
		

		
		this.tDistanceTravelled = AssetHandler.GetBitmapFont("Hat_white",72,"center");
		this.cUIContainer.addChild(this.tDistanceTravelled);
		this.tDistanceTravelled.text = "Dist:0%\n                                           ";
		this.tDistanceTravelled.x=5;
		var oDistanceTravelledFE = new FluidElement(this.tDistanceTravelled, 670, 835);
		Stage.AddFluidElement(oDistanceTravelledFE);
		
		
		this.tInstruct = AssetHandler.GetBitmapFont("Hat_white",72,"center");
		this.cRaceContainer.addChild(this.tInstruct);
		this.tInstruct.x=-80;
		this.tInstruct.y=50;
		
		
		this.btnAgain = new ButtonHelper(this, this.cUIContainer);
		this.btnAgain.InitGraphics("btn_again_up","btn_again_over","btn_again_down","btn_again_down");
		this.btnAgain.Init(function(){ this.OnBtnAgain(); }.bind(this));
		this.btnAgain.oDispObjContainer.x = 175;
		var obtnAgainFE = new FluidElement(this.btnAgain.oDispObjContainer, 440, 600);
		Stage.AddFluidElement(obtnAgainFE);*/

		this.btnPlayAgain = new ButtonHelper(this, this.cUIContainer);
		//this.btnPlayAgain.oDispObjContainer.alpha=0;
		this.btnPlayAgain.InitGraphics("btn_again_up","btn_again_over","btn_again_down","btn_again_down");
		this.btnPlayAgain.Init(function(){ this.OnBtnPlayAgain(); }.bind(this));
	
		this.btnPlayAgain.oDispObjContainer.x=170;
		this.btnPlayAgain.oDispObjContainer.y=300;
		this.btnPlayAgain.oDispObjContainer.visible = false;
		
	};

	
	
	
	Race.Show = function(){
		console.log("Race Show");
		AssetHandler.LoopSound('flappy_music');
		
		this.cRaceContainer.alpha=1;
		this.btnPlayAgain.oDispObjContainer.visible = false;
		this.FlapDuck.sprDuckBody.texture = AssetHandler.GetTexture("duck_face");
		
		//this.FlapDuck.cDuckContainer.position.x = 100;
		//this.FlapDuck.cDuckContainer.position.y = 100;
		
		this.nStarsCollected = 0;
		this.tScore.text = "STARS: " + this.nStarsCollected;
		
		this.nBest = 0;
		
		var nRecordedBest = HandleCookie.ReadCookie("FlapDuckMaxScore");
		console.log("nRecordedBest:");
		console.log(nRecordedBest);
		if(nRecordedBest > this.nBest){
			this.nBest = nRecordedBest;
		}
		
		this.tMaxScore.text = "BEST: " + this.nBest;
		
		
		this.nStartFlapX = 160;
		this.nStartFlapY = 210;
		this.FlapDuck.nY = 210;
		this.FlapDuck.nVY=0;
		
		
	
		this.bHitPipe = false;
		this.nReleaseCount = 0;
		
		this.nStarReleaseCount = 0;
		
		this.aPipes = [];
		this.nCurrentPipe = 0;
		
		this.nTotalStars = 0;
		this.aStars = [];
		
		
		//AssetHandler.LoopSound('valkyries');
		this.cRaceContainer.visible = true;
		Clouds.Init(this.oParent,this.cCloudContainer);
		
		/*
		//check hit testing
		var oPipe = new Pipe(this, this.cGameAssetContainer,1,130,300,150,300,true);	
		//var bDuckHitRect = Trig.HitTestRectangle(oPipe.nX, oPipe.nY, oPipe.nWidth, oPipe.nHeight, this.FlapDuck.nX, this.FlapDuck.nY);
		var bDuckHitRect = Trig.HitTestBallOnRectangle(oPipe.nX, oPipe.nY, oPipe.nWidth, oPipe.nHeight, this.FlapDuck.nX, this.FlapDuck.nY,100)
		console.log("bDuckHitRect: " + bDuckHitRect);
		*/
		
		
		
	};
	
	Race.CreateNewPipe = function(){
		//either a top pipe or a bottom pipe
		//or both?
		/*
		-95
		____
		
		750 / 2 = 375
		____
		
		95 + 750 = 845
		*/
		
		//console.log("CreateNewPipe");
		
		//var oTopPipe = new Pipe(this, this.cGameAssetContainer,this.nCurrentPipe,0,0,100,100);
		
		var nRan = parseInt(Math.random() * 4); 
		var nSize =(Math.random()*300) + 220;
		var width = 256;
		var nPipeStartX = 640;

		switch(nRan){
			case 0:
				//top
				this.nCurrentPipe++;
				var oTopPipe = new Pipe(this, this.cGameAssetContainer,this.nCurrentPipe,nPipeStartX,-110,width,nSize,true);
				this.aPipes.push(oTopPipe);
			break;
			case 1:
				//bottom
				this.nCurrentPipe++;
				var oBottomPipe = new Pipe(this, this.cGameAssetContainer,this.nCurrentPipe,nPipeStartX,845 - nSize,width,nSize,false);
				this.aPipes.push(oBottomPipe);
			break;
			case 2:
			case 3:
				//top and bottom
				this.nCurrentPipe++;
				var oTopPipe = new Pipe(this, this.cGameAssetContainer,this.nCurrentPipe,nPipeStartX,-110,width,nSize/1.8,true);
				this.aPipes.push(oTopPipe);
				this.nCurrentPipe++;
				var oBottomPipe = new Pipe(this, this.cGameAssetContainer,this.nCurrentPipe,nPipeStartX,845 - (nSize/1.8),width,nSize/1.6,false);
				this.aPipes.push(oBottomPipe);
			break;
		}
		
	};
	
	Race.UpdateDuckY = function(){
		this.FlapDuck.nVY+=this.FlapDuck.nGrav;
		var nX  = this.FlapDuck.nX;
		var nY  = this.FlapDuck.nY;
		
		nY+=this.FlapDuck.nVY;
		this.FlapDuck.UpdatePosition(nX,nY);
		//this.FlapDuck.cDuckContainer.position.y += this.FlapDuck.nVY;
	};
	
	
	Race.CreateNewStar = function(nX,nY){
		//console.log("CreateNewStar: " + nX + " / " + nY);
		this.nTotalStars++;
		var oStar = new Star(this,this.cStarContainer,this.nTotalStars, nX, nY);
		this.aStars.push(oStar);
	};
	Race.MoveStars = function(){
		for(var i=0;i<this.aStars.length;i++){
			var oStar = this.aStars[i];
			oStar.nYCount +=0.03;
			oStar.nVY = Math.sin(oStar.nYCount)*3;
			oStar.UpdateXY();
		} 
	};
	Race.HitTestStars = function(){
		
		
			for(var j=0;j<this.aStars.length;j++){
				var oStar = this.aStars[j];
				var nDist = Trig.FindDistanceBetweenTwoPoints(this.FlapDuck.nX,this.FlapDuck.nY,oStar.nX,oStar.nY);
				if(nDist < 90 && oStar.bValid){
					console.log( " hits star" + oStar.nID);
					this.nStarsCollected ++;
					this.tScore.text = "STARS: " + this.nStarsCollected;
					
					if(this.nStarsCollected > this.nBest){
						this.nBest = this.nStarsCollected;
					}
					
					this.tMaxScore.text = "BEST: " + this.nBest;
					
					//this.RemoveStar(oStar.nID);
					oStar.bValid = false;
					oStar.Expand();
					AssetHandler.PlaySound("star");
					
					//setTimeout(function(){ AssetHandler.PlaySound("quack"); }.bind(this),200);
				}
			}
		
	};
	
	
	
	Race.RemoveOldStars = function(){
		for(var j=0;j<this.aStars.length;j++){
			var oStar = this.aStars[j];
			if(oStar.nX < -50){
				console.log("Remove star " + oStar.nID);
				this.RemoveStar(oStar.nID);
			}
		}
		//console.log("total logs: " + this.aLogs.length);
	};
	
	
	Race.RemoveStar = function(nID){
		for(var i=0;i<this.aStars.length;i++){
			var oStar = this.aStars[i];
			if(oStar.nID == nID){
				this.aStars.splice(i,1);
				oStar.Destroy();
			}
		}
	};
	
	
	
	
	Race.Loop = function(){
		if(!this.bHitPipe){
			Clouds.Loop();
			this.UpdateDuckY();
			//this.FlapDuck.nVY =  0;
			this.nReleaseCount++;
			this.nStarReleaseCount++;

			if(this.nReleaseCount > 120){
				this.nReleaseCount =0;
				this.CreateNewPipe();
			}
			
			if(this.nStarReleaseCount > 100){
				this.nStarReleaseCount =0;
				var nStarY = (Math.random()*400)+50;
				this.CreateNewStar(760,nStarY);
			}
			

			this.UpdatePipeX2();
			this.HitTestPipes();
			this.RemoveOldPipes();
			
			this.MoveStars();
			this.HitTestStars();
			this.RemoveOldStars();
			
			var nRan = Math.random()*100;
			if(nRan < 2){
				this.FlapDuck.Blink();
			}
			
			if(this.FlapDuck.nVY < 0){
				this.FlapDuck.mcWing.animationSpeed = 0.8;
			}else{
				this.FlapDuck.mcWing.animationSpeed = 0.3;
			}
		}
		
	};
	

	
	
	
	Race.UpdatePipeX2 = function(){
		for(var j=0;j<this.aPipes.length;j++){
			var oPipe = this.aPipes[j];
			oPipe.nX-=6;
			oPipe.UpdateX();
			
			//oPipe.cPipeContainer.x = oPipe.nX;
			//console.log(oPipe.nX + "  " + oPipe.cPipeContainer.x);
		}
	};
	
	Race.RemoveOldPipes = function(){
		for(var j=0;j<this.aPipes.length;j++){
			var oPipe = this.aPipes[j];
			if(oPipe.nX < -256){
				console.log("Remove oPipe " + oPipe.nID);
				this.RemovePipe(oPipe.nID);
			}
		}
	};
	
	Race.RemovePipe = function(nID){
		for(var i=0;i<this.aPipes.length;i++){
			var oPipe = this.aPipes[i];
			if(oPipe.nID == nID){
				oPipe.Destroy();
				this.aPipes.splice(i,1);
			}
		}
	};
	
	/*
		Race.RemoveOldStars = function(){
		for(var j=0;j<this.aStars.length;j++){
			var oStar = this.aStars[j];
			if(oStar.nY < -50){
				console.log("Remove star " + oStar.nID);
				this.RemoveStar(oStar.nID);
			}
		}
		//console.log("total logs: " + this.aLogs.length);
	};
	*/
	
	Race.HitTestPipes = function(){
		
		var bDuckInBounds = true;
		if(this.FlapDuck.nY < -150 || this.FlapDuck.nY > 900){
			this.bHitPipe = true;
				this.ShowGameOver();
		}
			
		for(var i=0;i<this.aPipes.length;i++){
			var oPipe = this.aPipes[i];
			//console.log()
			var bDuckHitRect = Trig.HitTestBallOnRectangle(oPipe.nX, oPipe.nY, oPipe.nWidth, oPipe.nHeight, this.FlapDuck.nX, this.FlapDuck.nY,90);
			
			
			
			if(bDuckHitRect){
				//oPipe.cPipeContainer.alpha = Math.random();
				//console.log("hit: " + i);
				//this.oParent.
				
				this.bHitPipe = true;
				this.ShowGameOver();
			
				
				//this.DestroyAll();
				//this.oParent.EndGame();
			}
		}
	};
	
	
	Race.ShowGameOver = function(){
		
		
		var nRecordedBest = HandleCookie.ReadCookie("FlapDuckMaxScore");
		if(nRecordedBest < this.nBest){
			console.log("new best score: " + this.nBest + " .. was .. " + nRecordedBest);
			HandleCookie.CreateCookie("FlapDuckMaxScore", this.nBest);
		}
		
		AssetHandler.PlaySound('quack-quack-oops');
		AssetHandler.StopSound('flappy_music');
		
		
		this.FlapDuck.nVY=1;
		this.FlapDuck.mcWing.animationSpeed = 0.3;
		this.FlapDuck.sprDuckBody.texture = AssetHandler.GetTexture("duck_face2");
		this.btnPlayAgain.oDispObjContainer.visible = true;
		this.btnPlayAgain.oDispObjContainer.alpha=0;
		var oTweenAlpha = Tween.to(this.btnPlayAgain.oDispObjContainer,0.5, 
			{alpha:1,delay:0.2
		});
	};
	
	
	Race.OnBtnPlayAgain = function(){
		AssetHandler.PlaySound("click");
		var oTweenAlpha = Tween.to(this.cRaceContainer,1, 
			{alpha:0,delay:0,
			onComplete:function(){
				this.DestroyAll();
				this.oParent.EndGame();
				
			}.bind(this)
		});
	};
	
	
	Race.OnbtnFlap = function(){
		//console.log("flap...");
		this.FlapDuck.nVY = -10;
		if(!this.bHitPipe){
			AssetHandler.PlaySound("jump");
		}
	};
	
	Race.Hide= function(){
		this.cRaceContainer.visible = false;
	};
	
	
	Race.DestroyAll=function(){
		Clouds.Destroy();
		console.log(this.aPipes);
		for(var j=0;j<this.aPipes.length;j++){
			var oPipe = this.aPipes[j];
			oPipe.Destroy();
		}
		this.aPipes = [];
		for(var k=0;k<this.aStars.length;k++){
			var oStar = this.aStars[k];
			oStar.Destroy();
		}
		this.aStars=[];
	};
		
	
	
    return Race;
});
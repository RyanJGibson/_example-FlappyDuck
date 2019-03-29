define(function(require) {
	var PIXI = require('PIXI');
	var FluidElement = require('FluidElement');
	var Stage = {};

	//simple stage always retains X Y ratio of Canvas
	//provide 100% canvas width and height

	
	//so - we're looking mainly at portrait games.
	//provide a canvas that will fit on tall screens (like iphone 5)
	//have the canvas oversplill (larger than the window - then shrink as required)
	
	//650,820,900
	
	Stage.Init = function(oParent, nCanvasWidth, nCanvasHeight){
		console.log("Stage.Init");
		this.oParent = oParent;
	
		this.nCanvasWidth = nCanvasWidth;
		this.nCanvasHeight = nCanvasHeight;
	
		console.log("this.nCanvasWidth: " + this.nCanvasWidth);
		console.log("this.nCanvasHeight: " + this.nCanvasHeight);
		
		this.aFluidElements = [];
		this.oMaxSizes = this.DetermineCanvasMaxSize();
		
		//this.stage = new PIXI.Stage(0x000000, true);
		
		this.renderer = PIXI.autoDetectRenderer(this.oMaxSizes.nGameMaxWidth,this.oMaxSizes.nGameMaxHeight,{
			backgroundColor: 0xFFFFFF
		});
		
		
		this.oParent.oStage = new PIXI.Container();
		$("#gameCanvas").append(this.renderer.view);
		
		this.oParent.devText = new PIXI.Text("Dev Text", {fontFamily:"Verdana, Geneva, sans-serif", fontSize:"20", fill:"#000000"});
		this.oParent.arText = new PIXI.Text("ar Text", {fontFamily:"Verdana, Geneva, sans-serif", fontSize:"20", fill:"#000000"});
		
		this.oParent.oStage.addChild(this.oParent.devText);
		this.oParent.oStage.addChild(this.oParent.arText);
		this.oParent.arText.position.y = 25;
		
		this.renderer.render(this.oParent.oStage);
		
		
		this.Resize();
		
		window.addEventListener('resize', function () {
			this.Resize();
		}.bind(this));
		
		
	};
	
	Stage.DetermineCanvasMaxSize = function(){
		console.log("DetermineCanvasMaxSize");
		//Firstly - determine if the chosen width and height can be acheived for this window
		// if not no point creating a huge canvas.  Make a small one and scale the content down.
		
		var nCanvasWidthRatio = this.nCanvasWidth/this.nCanvasHeight;
		//so >1 means wider than taller.  < 1 means taller than wider
		//if the game is wider than taller - it makes sense that the windows largest dimension needs to be widthways
		// to get the biggest possible game size.
		
		
		var nWindowWidth = window.innerWidth;
		var nWindowHeight = window.innerHeight;
		var nWindowWidthRatio = nWindowWidth/nWindowHeight;
		
		var sWindowLongest = "none";
		var nWindowLong = 0;
		var nWindowShort = 0;
		
		if(nWindowWidthRatio >= 1){
			sWindowLongest = "width";
			nWindowLong = nWindowWidth;
			nWindowShort = nWindowHeight;
		}else{
			sWindowLongest = "height";
			nWindowLong = nWindowHeight;
			nWindowShort = nWindowWidth;
			
			nWindowWidthRatio = nWindowHeight/nWindowWidth; // effectively rototate the window
		}
		
		console.log("sWindowLongest: " + sWindowLongest);
		console.log("nWindowLong: " + nWindowLong);
		console.log("nWindowShort: " + nWindowShort);
		
		var nGameMaxWidth = this.nCanvasWidth;
		var nGameMaxHeight = this.nCanvasHeight;
		
		/*
		if(nWindowWidthRatio >= nCanvasWidthRatio){
			//console.log("Window is relatively wider than canvas - tram tracks edges");
		}else{
			
		}*/
		
		
		
		
		if(nCanvasWidthRatio >= 1){
			console.log("We have a wide game");
			// so if windows longest dimension is width
			
			if(nWindowWidthRatio >= nCanvasWidthRatio){
				console.log("Window is relatively wider than canvas - tram tracks edges");
				nGameMaxHeight = nWindowShort;
				nGameMaxWidth =  nGameMaxHeight*nCanvasWidthRatio;
				
			}else{
				console.log("Window is relatively taller than canvas - tram tracks top,bottom");
				nGameMaxWidth = nWindowLong;
				nGameMaxHeight = nGameMaxWidth/nCanvasWidthRatio;
			}
			
			
		}else{
			console.log("We have a tall game");
			// so if windows longest dimension is height
			
			if(nWindowWidthRatio >= nCanvasWidthRatio){
				console.log("Window is relatively wider than canvas - tram tracks edges");
				nGameMaxHeight = nWindowLong;
				nGameMaxWidth = nGameMaxHeight*nCanvasWidthRatio;
			}else{
				console.log("Window is relatively taller than canvas - tram tracks top,bottom");
				nGameMaxHeight = nWindowShort;
				nGameMaxWidth =  nGameMaxHeight/nCanvasWidthRatio;
			}
			
			
		}
		
		//var nWindowWidthRatio = nWindowWidth/nWindowHeight;

		
		
		if(nGameMaxWidth > this.nCanvasWidth){
			nGameMaxWidth = this.nCanvasWidth;
			nGameMaxHeight = this.nCanvasHeight;
		}
		
		console.log("nGameMaxWidth: " + nGameMaxWidth);
		console.log("nGameMaxHeight: " + nGameMaxHeight);
		var o = {};
		o.nGameMaxWidth = nGameMaxWidth;
		o.nGameMaxHeight = nGameMaxHeight;
		this.nCanvasWidthRatio = nCanvasWidthRatio;
		
		
		console.log("scaleX: " + nGameMaxWidth/this.nCanvasWidth);
		console.log("scaleY: " + nGameMaxHeight/this.nCanvasHeight);
		
		this.nScaleFactor = nGameMaxWidth/this.nCanvasWidth;
		
		return o;
		
	};
	
	Stage.Resize  = function(){
		
		if(this.nCanvasWidthRatio > 1){
			this.ResizeForWideGame();
		}else{
			this.ResizeForTallGame();
		}
		
		
	};
	
	
	Stage.ResizeForTallGame = function(){
		var nMaxX = this.oMaxSizes.nGameMaxWidth*2;
		var nMaxY = this.oMaxSizes.nGameMaxHeight*2;
		
		var nWideAR = 0.85333;
		var nNarrowAR = 0.6956;
		
		var nARTotalDiff = nWideAR - nNarrowAR;
		
		var nLargestHeight = nMaxY;
		if(window.innerHeight < nMaxY){
			nLargestHeight = window.innerHeight;
		}
	
		var nLargestWidth = nMaxX;
		if(window.innerWidth < nMaxX){
			nLargestWidth = window.innerWidth;
		}
		
		
		var nWindowAR = window.innerWidth/window.innerHeight;
		var nStageInnerAR = nLargestWidth / nLargestHeight;
		
		
		var nARCurrentDiff = nStageInnerAR - nNarrowAR;
		this.nARPerc = nARCurrentDiff/nARTotalDiff;
		
		this.nARPerc = 1-this.nARPerc;
		//console.log("this.nARPerc: " + this.nARPerc);
		
		if(this.nARPerc < 0){
			this.nARPerc = 0;
			//nLargestHeight = nLargestWidth/nNarrowAR;
				nLargestWidth = nLargestHeight*nWideAR;
		}
		
		if(this.nARPerc > 1){
			this.nARPerc = 1;
			//nLargestWidth = nLargestHeight*nWideAR;
			nLargestHeight = nLargestWidth/nNarrowAR;
		}
		
		
		$(".stageInner").css("width", nLargestWidth);
		$(".stageInner").css("height", nLargestHeight);
		$(".stageInner canvas").css("width", nLargestWidth);
		
		$(".stageInner").css("top", (window.innerHeight-nLargestHeight)/2);
		
		this.oParent.arText.text = this.nARPerc;
		
		for(var i=0;i<this.aFluidElements.length;i++){
			var oFluidElement = this.aFluidElements[i];
			if(oFluidElement.oDispObj){
				oFluidElement.oDispObj.position.y = (oFluidElement.nShortY + (oFluidElement.nDiff * this.nARPerc));//*HandleDimensions.nPosScaleX;
			}
		}
		
		this.oParent.oStage.scale.x =  this.nScaleFactor;
		this.oParent.oStage.scale.y =  this.nScaleFactor;
		
		this.renderer.render(this.oParent.oStage);
	};
	
	Stage.ResizeForWideGame = function(){
		var nMaxX = this.oMaxSizes.nGameMaxWidth*2;
		var nMaxY = this.oMaxSizes.nGameMaxHeight*2;
		
		// 1200/640 = 1.4375;
		// 768/640 = 1.2;
		
		var nWideAR = 1.777;
		var nNarrowAR = 1.777;
		
		var nARTotalDiff = nWideAR - nNarrowAR;
		
		var nLargestHeight = nMaxY;
		if(window.innerHeight < nMaxY){
			nLargestHeight = window.innerHeight;
		}
	
		var nLargestWidth = nMaxX;
		if(window.innerWidth < nMaxX){
			nLargestWidth = window.innerWidth;
		}
		
		//console.log(nLargestWidth + " " + nLargestHeight);
		
		
		var nWindowAR = window.innerWidth/window.innerHeight;
		
		var nStageInnerAR = nLargestWidth / nLargestHeight;
		
		
		var nARCurrentDiff = nStageInnerAR - nNarrowAR;
		this.nARPerc = nARCurrentDiff/nARTotalDiff;
		
		this.nARPerc = this.nARPerc;
		console.log("this.nARPerc: " + this.nARPerc);
		
		if(this.nARPerc < 0){
			this.nARPerc = 0;
		
		
				nLargestHeight = nLargestWidth/nNarrowAR;
		}
		
		if(this.nARPerc > 1){
			this.nARPerc = 1;

			nLargestWidth = nLargestHeight*nWideAR;
		}
		
		
		$(".stageInner").css("width", nLargestWidth);
		$(".stageInner").css("height", nLargestHeight);
		
		$(".stageInner canvas").css("height", nLargestHeight);
		
		//$(".stageInner canvas").css("display", 'none');
		
		
		$(".stageInner").css("top", (window.innerHeight-nLargestHeight)/2);
		
		console.log("nLargestHeight: " + nLargestHeight);
		
		this.oParent.arText.text = this.nARPerc;
		
		this.oParent.oStage.scale.x =  this.nScaleFactor;
		this.oParent.oStage.scale.y =  this.nScaleFactor;
		
	};
	
	
	
	Stage.AddFluidElement = function(oFluidElement){
    	console.log("AddFluidElement");


    	var bFluidElementValid = true;
    	for(var i=0;i<this.aFluidElements.length;i++){
    		var oExistingFluidElement = this.aFluidElements[i];
    		if(oExistingFluidElement.oDispObj == oFluidElement.oDispObj){
    			bFluidElementValid = false; //already in our aFluidElements array
    			console.log("NOT ADDING AGAIN");
    		}
    	}

    	if(bFluidElementValid){
    		this.aFluidElements.push(oFluidElement);
    	}
		
		this.Resize();
    };
	
	
	
	
	
	
	/*
	
	   Main.prototype.OnResize = function(){
    	window.scrollTo(0,0);
    	//alert("ok")
    	//$(".stageInner").css("height",window.innerHeight);
		//$(".stageInner").css("width",window.innerWidth);


		//.log("ok");



		setTimeout(function(){window.scrollTo(0,0);}.bind(this), 500);

		//960x640 AR = 1.5
		//1136x640 AR = 1.775
		
		
		//1920(2272)x 1280
		
		var nMaxX = 2272;//1136;  	//2272
		var nMaxY = 1280;//640;	//1280
		
		//var nMaxX = 2208;
		//var nMaxY = 1242;
		
		
		var nWideAR = 1.775;
		var nNarrowAR = 1.5;
		var nARTotalDiff = nWideAR - nNarrowAR;
		
		//what's the largest height I can display at?
		var nLargestHeight = nMaxY;
		if(window.innerHeight < nMaxY){
			nLargestHeight = window.innerHeight;
		}
		
		// and given the width of the window what height can I be?
		var nLargestWidth = nMaxX;
		if(window.innerWidth < nMaxX){
			nLargestWidth = window.innerWidth;
		}
				
	
		var nWindowAR = window.innerWidth/window.innerHeight;
		var nStageInnerAR = nLargestWidth / nLargestHeight;
		var nARCurrentDiff = nStageInnerAR - nNarrowAR;
		var this.nARPerc = nARCurrentDiff/nARTotalDiff;
		
		
	
		$(".stageInner").css("width", 1136);
		$(".stageInner").css("height", 640);
		
	
		//now can I render to the largest height given the window width
		if(this.nARPerc < 0){
			this.nARPerc = 0;
			nLargestHeight = nLargestWidth/nNarrowAR;
		}
		


		//If the width appears too large, we need to constrain it

		$('#scrollHelp').css('display','none');
		$('html').css('overflow','hidden');


		if(this.nARPerc > 1){
			console.log("Too wide");
			this.nARPerc = 1;
			nLargestWidth = nLargestHeight*nWideAR;
			
			//platform.product; //use this to only target phones?
			

			//so here, the aspect ratio appears to be too wide on an ios device
			//this should only occur when the navigation is present
			if (Platform.os.family == 'iOS' && parseInt(Platform.os.version, 10) > 8 || Platform.ua.indexOf('like Mac OS X') != -1) {
				$('#scrollHelp').css('display','block');
				$('#scrollhelp').css('height','1300px');
				$('html').css('overflow','visible');
			}


		}
		
	
		$(".stageInner").css("width", nLargestWidth);
		$(".stageInner").css("height", nLargestHeight);
		$(".stageInner canvas").css("height", nLargestHeight);
		//$(".stageInner canvas").css("width", nLargestWidth);
		
		$(".stageInner").css("top", (window.innerHeight-nLargestHeight)/2);
		
		


		

		//Reposition all fluid elements
		for(var i=0;i<this.aFluidElements.length;i++){
			var oFluidElement = this.aFluidElements[i];
			if(oFluidElement.oDispObj){
				oFluidElement.oDispObj.position.x = (oFluidElement.nNarrowX + (oFluidElement.nDiff * this.nARPerc));//*HandleDimensions.nPosScaleX;
			}
		}


		//Special cases - Poker Hotspot and chips on poker bet
		if(this.aHotSpots[0]){
			var nDiff = parseInt(this.aHotSpots[0].nXPosWide) - parseInt(this.aHotSpots[0].nXPosNarrow);
			this.aHotSpots[0].nX = (parseInt(this.aHotSpots[0].nXPosNarrow) + (nDiff * this.nARPerc));//*HandleDimensions.nPosScaleX;
		}
		for(var i=0;i<this.aChipList.length;i++){
			console.log(this.aChipList[i]);
			if(this.aChipList[i].oHotSpot.sID=="PB"){
				this.aChipList[i].docChip.position.x = this.aChipList[i].oHotSpot.nX;
			}
		}



		//Rotate

		
		if(window.innerHeight > window.innerWidth){


			var bMobile = this.MobileCheck();

			if(bMobile){
				$('#turnDevice').css('display','block');
			}
		}else{
			$('#turnDevice').css('display','none');
		}


    };
	*/
	
	/*
	Stage.StartTick = function (fTick) {
		console.log("Tick Instantiated");
		this.nCount= 0;
        this.nCurrentToUpdate = 0;
		//this.zIndex = 10;
		if (!this.interval) {
           // this._lastTime = performance.now();
                //now = performance.now();
            this.interval = setInterval(function () {
                // Calculate time between current and last frame
                //this.dt = (now - this._lastTime) / 1000;
               // this._lastTime = now;
                fTick();
                //this.update(this.dt);
                this.renderer.render(this.oParent.oStage);
            }.bind(this), 1000/30);
        }
    };*/
	
	Stage.StartTick = function(fTick){
		this.go=false;
		this.fTick=fTick;
		this.Draw();
		
	};
	
	Stage.Draw= function(){
		
		//var fps=45;
		//setTimeout(function(){
			if(this.go == true){
				this.fTick();
			}else{
				this.go=true;
			}
			this.renderer.render(this.oParent.oStage);
			window.requestAnimationFrame(function(){
				this.Draw();
			}.bind(this));
		//}.bind(this),1000/fps);
	};
	

	
	return Stage;
});



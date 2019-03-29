define(function(require) {
	var AssetHandler = {};
	var PIXI = require('PIXI');
	var Howler = require('Howler');
    var Howl = Howler.Howl;

	//asset handler takes JSON object, looks for all image, audio and bitmap fileSize
	//creates lists
	//loads them and holds references based on file names
	//provides sprites and controls audio playback
	
	
	
	//LOADING _________________________________________________________________________
	
	AssetHandler.Init = function (oJSON, fOnLoadProgress, fOnLoadComplete) {
		console.log("AssetHandler.Init");
		console.log(oJSON);
		this.oJSON = oJSON;
		this.fOnLoadProgress = fOnLoadProgress;
		this.fOnLoadComplete = fOnLoadComplete;
		this.aImageFiles = [];
		this.aBimapFontFiles =[];
		this.aAudioFiles = [];
		this.aSoundsAssociativeArray = [];
		this.aSounds = [];
		
		this.nTotalFiles = 0;
		this.nTotalFilesLoaded = 0;
		
		this.nMusicVol = 1;
		this.nMusicTracks = 1;
		this.nCurrentSound = 0;
		this.bMuted = false;
		
		this.sCurrentSound = "";
		this.aSoundRequestArray = [];
		this.nSoundReset = 200;
		this.bSoundReset = true;
		
		//parse JSON
		
		console.log(this.oJSON.root[1].paths.images['#text']);
		
		var sImagePath = this.oJSON.root[1].paths.images['#text'];
		var sBitmapFontPath = this.oJSON.root[1].paths.bitmapFonts['#text'];
		var sAudioPath = this.oJSON.root[1].paths.audio['#text'];
		
		this.aPIXILoaderNames = [];
		this.aPIXILoaderFiles = [];
		
		console.log(">> Images");
		for(let i=0;i<this.oJSON.root[1].images.image.length;i++){
			console.log(i + " " + this.oJSON.root[1].images.image[i].id['#text']);
			this.aPIXILoaderNames.push(this.oJSON.root[1].images.image[i].id['#text']);
			this.aPIXILoaderFiles.push(sImagePath + this.oJSON.root[1].images.image[i].id['#text'] + ".png");
			this.nTotalFiles++;
		}
		
		console.log(">> bitmap fonts");
		for(let i=0;i<this.oJSON.root[1].bitmapFonts.font.length;i++){
			console.log(i + " " + this.oJSON.root[1].bitmapFonts.font[i].id['#text']);
			this.aPIXILoaderNames.push(this.oJSON.root[1].bitmapFonts.font[i].id['#text']);
			this.aPIXILoaderFiles.push(sBitmapFontPath + this.oJSON.root[1].bitmapFonts.font[i].id['#text']);
			this.nTotalFiles+=2; //bitmap fonts load 2 files
		}
		
		console.log(">> audio files");
		for(let i=0;i<this.oJSON.root[1].audioFiles.audio.length;i++){
			console.log(i + " " + this.oJSON.root[1].audioFiles.audio[i].id['#text']);
			var sPathOGG = sAudioPath + this.oJSON.root[1].audioFiles.audio[i].id['#text'] + ".ogg";
			var sPathMP3 = sAudioPath + this.oJSON.root[1].audioFiles.audio[i].id['#text'] + ".mp3";
			
			var oPathObj = {};
			oPathObj.aPaths = [sPathMP3,sPathOGG];
			this.aAudioFiles.push(oPathObj);
			
			this.nTotalFiles++;
		}
		
		console.log("this.nTotalFiles> " + this.nTotalFiles);
		
		this.oLoader = PIXI.loader;
		for(let i=0;i<this.aPIXILoaderFiles.length;i++){
			this.oLoader.add(this.aPIXILoaderNames[i], this.aPIXILoaderFiles[i]);
		}
		
		this.oLoader.load();
		this.oLoader.on("progress", this.ImageLoadProgress.bind(this));
		this.oLoader.on("complete", this.ImageLoadComplete.bind(this));
    };
	
	AssetHandler.ImageLoadProgress = function(){
		this.nTotalFilesLoaded++;
		console.log("ImageLoadProgress> " + this.nTotalFilesLoaded);
		var nPerc = this.nTotalFilesLoaded / this.nTotalFiles;
		this.fOnLoadProgress(nPerc);
	};
	
	AssetHandler.ImageLoadComplete = function(){
		console.log("images loaded");
		//console.log("this.nTotalFilesLoaded: " + this.nTotalFilesLoaded + " / " + this.nTotalFiles);
		//console.log(this.oLoader);
		//console.log(this)
		//this.fOnLoadComplete();
		this.LoadNextSound();
	};
	
	
	AssetHandler.LoadNextSound = function(){
		//console.log("LoadNextSound")
		//console.log(this.aAudioFiles);

		var oObj = this.aAudioFiles[this.nCurrentSound];
		//console.log(this.nCurrentSound);

		var oSound = new Howl({
		    urls: oObj.aPaths,
		    onload: function () {
				//this.FileLoaded(oSound);
				AssetHandler.FileLoaded(oSound);
				//console.log("audiofile loaded");
		    }
		});
	};
	
	AssetHandler.FileLoaded = function(oSound){
		//console.log("Audio FileLoaded");
		//console.log("Audio loaded: " + this.nCurrentSound);
		var sAssociativeArrayKey = this.oJSON.root[1].audioFiles.audio[this.nCurrentSound].id['#text'];
		//console.log(sAssociativeArrayKey)
        this.aSoundsAssociativeArray[sAssociativeArrayKey] = oSound;
       	this.aSounds.push(oSound);

       	var nPerc = 0;
     
        if(this.nCurrentSound < this.oJSON.root[1].audioFiles.audio.length-1){
        	this.nCurrentSound++;
        	this.LoadNextSound();
        	//this.fLoadPerc();

        	//console.log(this.nCurrentSound);
        	//console.log(this.oJSON.root[1].audioFiles.audio.length);
			
			this.nTotalFilesLoaded++;
			nPerc = this.nTotalFilesLoaded / this.nTotalFiles;
			//console.log("this.nTotalFilesLoaded: " + this.nTotalFilesLoaded + " / " + this.nTotalFiles);
			this.fOnLoadProgress(nPerc);

        }else{
			this.nTotalFilesLoaded++;
			nPerc = this.nTotalFilesLoaded / this.nTotalFiles;
			//console.log("this.nTotalFilesLoaded: " + this.nTotalFilesLoaded + " / " + this.nTotalFiles);
			this.fOnLoadProgress(nPerc);
        	console.log("All sounds loaded");
        	console.log(this.aSounds);
        	//this.aSounds[1].play();
        	this.fOnLoadComplete();
        }
	};
	
	
	
	
	//DO STUFF _________________________________________________________________________
	
	
	AssetHandler.GetMovieClip = function(aIDArray){
		//console.log("GetMovieClip: ");
		//console.log(aIDArray);
		var aTexturesArray = [];
		
		for(var i=0;i<aIDArray.length;i++){
			var oTexture = this.GetTexture(aIDArray[i]);
			aTexturesArray.push(oTexture);
		}
		
		
		var mc = new PIXI.extras.AnimatedSprite(aTexturesArray);
		return(mc);
	};
	
	AssetHandler.GetSprite = function(sID){
		//console.log("GetSprite: " + sID);
		var sprite = new PIXI.Sprite(this.oLoader.resources[sID].texture);
		return(sprite);
	};
	
	AssetHandler.GetTexture = function(sID){
		//console.log("AssetHandler.GetTexture: " + sID)
		return(this.oLoader.resources[sID].texture);
	};
	
	AssetHandler.GetBitmapFont = function(sID, nSize, sAlign){
		console.log("GetBitmapFont: " + sID + " " + nSize + " " + sAlign);
		var sFontString = nSize + "px " + sID;
		var bitmapText = new PIXI.extras.BitmapText("text using a fancy font!", {font: sFontString, align: sAlign});
		return(bitmapText);
	};
	
	AssetHandler.LoopSound = function(sID){
		
		this.aSoundsAssociativeArray[sID].loop(true);
		//this.aSoundsAssociativeArray[sID].play();
		this.PlaySound(sID);
		this.aSoundsAssociativeArray[sID].fadeIn(1,1);
	};
	
	AssetHandler.FadeSoundOut = function(sID){
		var nDur = 2000;
		this.aSoundsAssociativeArray[sID].fadeOut(0,nDur+100);
		setTimeout(function(){ 
			this.aSoundsAssociativeArray[sID].stop();
		}.bind(this),nDur);
	};
	
	AssetHandler.StopSound = function(sID){
		this.aSoundsAssociativeArray[sID].stop();
	};
	
	AssetHandler.PlaySound = function(sID, fOnComplete){ //id should be same as filename
		//console.log("playsound: " + sID);
		//console.log("AudioHelper.PlaySound: " + sID);
		//console.log(this.aSoundsAssociativeArray);
		//console.log(this.aSoundsAssociativeArray[sID]);
		
		//clearTimeout(this.oAudioTimeOut);
		//this.oAudioTimeOut = setTimeout(function(){ this.bSoundReset=true }.bind(this),this.nSoundReset);
		
		var bSoundRequestedRecently = this.CheckRequestArray(sID);
		//console.log(bSoundRequestedRecently)
		
		if(!bSoundRequestedRecently){
			//this.bSoundReset=false;

			if(fOnComplete){
				this.aSoundsAssociativeArray[sID].on('end', 
					function(){
						fOnComplete();
					}.bind(this)
				);
			}
			//this.aSoundsAssociativeArray[sID].loop(true);
			//this.aSoundsAssociativeArray[sID].volume(0.01);
			this.aSoundsAssociativeArray[sID].play();
			
			this.aSoundRequestArray.push(sID);
			
			setTimeout(function(){ 
			//this.aSoundRequestArray=[]; console.log("cleared")
				//console.log("clear: " + sID);
				for(var i=0;i<this.aSoundRequestArray.length;i++){
					if(sID == this.aSoundRequestArray[i]){
						this.aSoundRequestArray.splice(i,1);
					}
				}
			}.bind(this),this.nSoundReset);
		}
	};
	
	AssetHandler.CheckRequestArray = function(sID){
		var bFound = false;
		for(var i=0;i<this.aSoundRequestArray.length;i++){
			if(this.aSoundRequestArray[i] == sID){
				bFound = true;
			}
		}
		return bFound;
	};
	
	AssetHandler.SetSoundVolume = function(sID,nVol){
		this.aSoundsAssociativeArray[sID].volume(nVol);
	};

	AssetHandler.MuteAll = function(){
		this.bMuted = true;
		Howler.Howler.mute();
	};
	
	AssetHandler.UnMuteAll = function(){
		this.bMuted = false;
		Howler.Howler.unmute();
	};
	
	AssetHandler.GetMuteStatus = function(){
		return this.bMuted;
	};
	
	


	
	return AssetHandler;
});



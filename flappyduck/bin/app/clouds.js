define(function (require) {
    var Clouds = {};
	var Stage = require('Stage');
	var PIXI = require('PIXI');
	var AssetHandler = require('AssetHandler');
	var Tween = require('Tween');

	Clouds.Init = function(oParent, oParentContainer){
		console.log("Clouds.Init");
		
		this.oParent = oParent;
		
		this.oParentContainer = oParentContainer;
		
		this.cCloudContainer = new PIXI.Container();
		this.oParentContainer.addChild(this.cCloudContainer);

		this.aClouds = [];

		for(let i=0;i<8;i++){
			var oCloud ={};
			oCloud.spr = AssetHandler.GetSprite("cloud0" + ( parseInt(Math.random()*4)+1 )  );
			this.aClouds.push(oCloud);
			this.cCloudContainer.addChild(oCloud.spr);
		}

		
		this.RandomiseStartPositions();
	};
	
	Clouds.RandomiseStartPositions = function(){
		for(var i=0;i<this.aClouds.length;i++){
			var oCloud = this.aClouds[i];
			oCloud.spr.x = (Math.random()*650);//+850;
			oCloud.spr.y = Math.random()*900;
			
			//var nRanSize = (Math.random()/2)+0.3;
			
			oCloud.nID = i;
			var nRanSize = ((oCloud.nID)/10)+0.3;
			oCloud.nRanSize = nRanSize;
			
			
			oCloud.spr.scale.x = oCloud.spr.scale.y = nRanSize;
			
			oCloud.nSpeed = (-2)*oCloud.nRanSize;
		}
	};
	
	Clouds.Loop = function(){
		//console.log("Loop");
		for(var i=0;i<this.aClouds.length;i++){
			var oCloud = this.aClouds[i];
			oCloud.spr.x += oCloud.nSpeed;
			
			if(oCloud.spr.x < -300){
			
				oCloud.spr.x = 640;
				oCloud.spr.y = Math.random()*900;
				//var nRanSize = (Math.random())+0.3;
				
				//oCloud.spr.scale.x = oCloud.spr.scale.y = nRanSize;
			
				//oCloud.nSpeed = (-2)*nRanSize;
			}
		}
	};
	
	Clouds.Destroy = function(){
		//console.log("Loop");
		
		for(var i=0;i<this.aClouds.length;i++){
			var oCloud = this.aClouds[i];
			this.cCloudContainer.removeChild(oCloud.spr);
			//oCloud = null;
		}
		this.aClouds = [];
	};


	
	
    return Clouds;
});
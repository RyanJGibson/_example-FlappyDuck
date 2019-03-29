define(function(require) {
	var Trig = {};

	Trig.FindDistanceBetweenTwoPoints = function(nPointAX, nPointAY, nPointBX, nPointBY){
		//trace("FindDistanceBetweenTwoPoints");
		_nPointAX = nPointAX;
		_nPointAY = nPointAY;
		_nPointBX = nPointBX;
		_nPointBY = nPointBY;

		
		_nABXDist = Math.abs(_nPointAX-_nPointBX);
		_nABYDist = Math.abs(_nPointAY-_nPointBY);
		
		_nABDist = Math.sqrt((_nABXDist*_nABXDist) + (_nABYDist*_nABYDist));
		
		
		return(_nABDist);
	};



	Trig.CalcAngleBetweenTwoPoints = function(nPointAX, nPointAY, nPointBX, nPointBY ){
		_nPointAX = nPointAX;
		_nPointAY = nPointAY;
		_nPointBX = nPointBX;
		_nPointBY = nPointBY;


		_nABXDist =  (_nPointAX - _nPointBX);
		
		_nABYDist =  (_nPointAY - _nPointBY)*-1;

		//TOA = inv Tan of Opposite / Adjascent.
		var _nInvTan = (Math.atan(_nABYDist/_nABXDist))/(Math.PI/180);
		
		
		/*  quadrant fix
		 * 
		 *  -X,+Y | +X,+Y
		 * -----------------
		 *  -X,-Y | +X,-Y
		 *  
		 */

		//Ry: Im sure there'll be a cleaner way of doing this - this'll have to do for now...
		if (_nABXDist >= 0 && _nABYDist >= 0){
			_nInvTan = (90-_nInvTan) + 180;	
		}
		if (_nABXDist >= 0 && _nABYDist < 0){
			_nInvTan = ((_nInvTan*-1)+270);	
		}
		if (_nABXDist < 0 && _nABYDist < 0){
			_nInvTan = (90-_nInvTan);
		}
		if (_nABXDist < 0 && _nABYDist >= 0){
			_nInvTan = (_nInvTan*-1)+90;
		}

		
		return(_nInvTan);
	};




	Trig.CalcNewXYBasedOnAngle = function(nAngle){
		
		_nAngle = nAngle;

		var _newX = (((Math.sin(_nAngle* (Math.PI/180)) ))); 
		var _newY = (((Math.cos(_nAngle* (Math.PI/180)) )))*-1;
		
		var _aReturnNewXYArray =[];
		_aReturnNewXYArray.push(_newX, _newY);
		
		//trace("X: " + _newX + "Y: " + _newY);
		
		return(_aReturnNewXYArray);
	};


	Trig.DegreesToRadians = function(deg){
		//console.log("DegreesToRadians: converting " + deg + " degree(s)");
		var rad = deg * (Math.PI / 180);
		//console.log("rad:" + rad);
		return rad;
	};

	Trig.RadiansToDegrees= function(rad){
		//console.log("DegreesToRadians: converting " + deg + " degree(s)");
		var deg = rad / (Math.PI / 180);
		//console.log("rad:" + rad);
		return deg;
	};

	
	
	Trig.CalcAngleOfIncidence = function(nStrikeAngle, nSurfaceAngle){
		var nReflect = ((180 + (nSurfaceAngle*2)) - nStrikeAngle)-180;
		if(nReflect > 360){
			nReflect = nReflect - 360;
		}
		if(nReflect < 0){
			nReflect = nReflect+360;
		}
		
		return nReflect;
	};
	
	
	Trig.CalcRelativeAngle = function(nAngleA, nAngleB){
   		 //used to calculate relative angle from two absolutes
   		 //eg. angleA = 10 , angleB =20.  angle B is relatively pointing 10 degrees right of angle A;
   		 // or angle A = 40, angleB = 20 - angle B is relatively 340 degrees - i.e. 20 degrees left of angle A.
   		 //350 - 10 = 340; ok
   		 //5 - 10 = -5; - but we need this as absolute - e.g. 355   		 
   		 var _nRelAngle =  nAngleA-nAngleB;
   		 if(_nRelAngle < 0){
   			 _nRelAngle = 360+_nRelAngle;
   		 }
   		 //trace(">" + _nRelAngle);
   		 return(_nRelAngle);
   	};
	
	
	
	
	
	
	
	Trig.HitTestRectangle = function(nRectTopLeftX,nRectTopLeftY,nRectWidth,nRectHeight,nTestPointX,nTestPointY){
		console.log("HitTestRectangle");
		
		/*
		var nRectCentreX = nRectTopLeftX + (nRectWidth/2);
		var nRectCentreY = nRectTopLeftY + (nRectHeight/2);
		*/
		
		//we measure the distance between the point and the rectangle centre, then determine if that distance is greater or less than the rectangle boundary
		/*
		var nDistBetweenPointAndCentre = this.FindDistanceBetweenTwoPoints(nTestPointX,nTestPointY,nRectCentreX,nRectCentreY);
		
		console.log(nDistBetweenPointAndCentre);
		
		var nAng = this.CalcAngleBetweenTwoPoints(nRectCentreX,nRectCentreY,nTestPointX,nTestPointY);
		
		console.log(nAng);*/
		
		var bWithinBounds = false;
		var bWithinXBounds = false;
		var bWithinYBounds = false;
		
		if((nTestPointX >= nRectTopLeftX) && (nTestPointX <= nRectTopLeftX + nRectWidth)){
			bWithinXBounds = true;
		}
		if((nTestPointY >= nRectTopLeftY) && (nTestPointY <= nRectTopLeftY + nRectHeight)){
			bWithinYBounds = true;
		}
		
		if(bWithinXBounds && bWithinYBounds){
			bWithinBounds = true;
		}
		
		return bWithinBounds;
		
	};
	
	
	Trig.HitTestBallOnRectangle = function(nRectTopLeftX,nRectTopLeftY,nRectWidth,nRectHeight,nBallCentreX,nBallCentreY,nBallRadius){
		var bHit = false;
		
		//console.log("nBallCentreX: " + nBallCentreX);
		//console.log("nBallCentreY: " + nBallCentreY);
		
		var nRectCentreX = nRectTopLeftX + (nRectWidth/2);
		var nRectCentreY = nRectTopLeftY + (nRectHeight/2);
		
		var nBallCentreXDiff = 0;
		var nBallCentreYDiff = 0;
		
		var nRectXToTest = 0;
		var nRectYToTest = 0;
		
		nBallCentreXDiff = (nBallCentreX-nRectCentreX);
		nBallCentreYDiff = (nBallCentreY-nRectCentreY);
	
		//console.log("nBallCentreXDiff: " + nBallCentreXDiff);
		//console.log("nBallCentreYDiff: " + nBallCentreYDiff);
		
		if(nBallCentreXDiff < 0){
			//testing ball against left side of rectngle
			nRectXToTest = nRectTopLeftX;
		}else{
			//testing ball against right side of rectngle
			nRectXToTest = nRectTopLeftX+nRectWidth;
		}
		
		if(nBallCentreYDiff < 0){
			//testing ball against left side of rectngle
			nRectYToTest = nRectTopLeftY;
		}else{
			//testing ball against right side of rectngle
			nRectYToTest = nRectTopLeftY+nRectHeight;
		}
		
		if(nBallCentreX > nRectTopLeftX && nBallCentreX < nRectTopLeftX+nRectWidth){
		
			nRectXToTest = nBallCentreX;
		}
		if(nBallCentreY > nRectTopLeftY && nBallCentreY < nRectTopLeftY+nRectHeight){
			nRectYToTest = nBallCentreY;
		}
		
		
		//console.log("nRectXToTest/nRectYToTest:" + nRectXToTest + " / " + nRectYToTest);
		
		var nDist = this.FindDistanceBetweenTwoPoints(nBallCentreX,nBallCentreY,nRectXToTest,nRectYToTest);
		
		//console.log("nDist: " + nDist);
		
		if(nDist < nBallRadius){
			bHit = true;
		}
	
		return bHit;
	};




	Trig.CalcLineInterconnection = function(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y){

		// converted from stack overflow C# example. Amazing stuff...
		
		//console.log("CalcLineInterconnection.")
		//console.log("ln 1: " + p0_x +","+ p0_y + " to " +  p1_x +","+ p1_y);
		//console.log("ln 2: " + p2_x +","+ p2_y + " to " +  p3_x +","+ p3_y);

		s1_x = p1_x-p0_x;
		s1_y = p1_y-p0_y;
		s2_x = p3_x-p2_x;
		s2_y = p3_y-p2_y;

		s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
	    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

	    var oReturnObj = {};

	    oReturnObj.bCollision = false;
	    oReturnObj.nX = 0;
	    oReturnObj.nY = 0;

	    //if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
	    if (s > 0.001 && s < 0.999 && t > 0.001 && t < 0.999)
		{
	        // Collision detected
			var nX = p0_x + (t * s1_x);
			var nY = p0_y + (t * s1_y);
			//console.log(intX + " " + intY);
			oReturnObj.bCollision = true;
			oReturnObj.nX = nX;
			oReturnObj.nY = nY;

	    }


		return oReturnObj;
	}


	
	return Trig;
});



/*
public static degreesToRadians(degrees:number):number {
            return degrees * (Math.PI / 180);
        }

        public static radiansToDegrees(radians:number):number {
            return radians / (Math.PI / 180);
        }

        public static getAngleBetweenTwoPoints(pointA:PIXI.Point, pointB:PIXI.Point) {
            var deltaX:number = pointB.x - pointA.x;
            var deltaY:number = pointB.y - pointA.y;
            var degrees:number = Math.atan2(deltaX, -deltaY);
            if (degrees < 0) {
                degrees += 2 * Math.PI;
            }
            return degrees;
        }

        public static getRelativeAngle(degreesA:number, degreesB:number) {
            var relativeAngle:number = degreesA - degreesB;
            if (relativeAngle < 0) {
                relativeAngle = 360 + relativeAngle;
            }
            return relativeAngle;
        }

        public static getNormalisedAngle(degrees:number) {
            return Math.abs(degrees % 360);
        }

        public static getPosition(degrees:number) {
            var radians:number = this.degreesToRadians(degrees - 90);
            var x:number = Math.cos(radians);
            var y:number = Math.sin(radians);
            return new PIXI.Point(x, y);
        }

*/


define(function (require) {
	var KeyboardHelper = {};
 
	KeyboardHelper.Init = function () {
		window.addEventListener(
			"keydown", function(){this.KeyDown(event);}.bind(this), false
		);
		window.addEventListener(
			"keyup", function(){this.KeyUp(event);}.bind(this), false
		);
		
		this.aFuncAssociativeArrayKeyDown = [];
		this.aFuncAssociativeArrayKeyUp = [];
	};
	
	KeyboardHelper.KeyDown = function(k){
		//console.log("KeyDown");
		//console.log(k.keyCode);
		if(this.aFuncAssociativeArrayKeyDown[k.keyCode]){
			var func = this.aFuncAssociativeArrayKeyDown[k.keyCode];
			func();
		}
	};
	
	KeyboardHelper.KeyUp = function(k){
		//console.log("KeyUp");
		//console.log(k.keyCode);
		if(this.AssignFunctionToFireOnKeyUp[k.keyCode]){
			var func = this.AssignFunctionToFireOnKeyUp[k.keyCode];
			func();
		}
	};
	
	//we add and remove functions to fire on key eents
	
	KeyboardHelper.AssignFunctionToFireOnKeyDown = function(nKeyCode, fFunctionRef){
		console.log("KeyboardHelper.AssignFunctionToFireOnKeyDown: " + nKeyCode);
		this.aFuncAssociativeArrayKeyDown[nKeyCode] = fFunctionRef;
	};
	KeyboardHelper.AssignFunctionToFireOnKeyUp = function(nKeyCode, fFunctionRef){
		console.log("KeyboardHelper.AssignFunctionToFireOnKeyUp: " + nKeyCode);
		this.AssignFunctionToFireOnKeyUp[nKeyCode] = fFunctionRef;
	};

    return KeyboardHelper;
});
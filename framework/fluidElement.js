define(function (require) {

	var FluidElement = function(oDispObj, nShortY, nTallY){
		console.log("FluidElement");

		this.oDispObj = oDispObj;
		this.nShortY = nShortY;
		this.nTallY = nTallY;

		this.nDiff = this.nTallY - this.nShortY;

	};

    return FluidElement;
});
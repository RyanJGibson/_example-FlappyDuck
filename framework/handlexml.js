define(function (require) {
	var HandleXML = {};
	
	
	// loads an xml file and returns the data as a JSON object.
  
	HandleXML.LoadXMLDoc = function (filename, fReturnFunc){
		
		this.fReturnFunc = fReturnFunc;
		
		if (window.XMLHttpRequest){
		  xhttp=new XMLHttpRequest();
		  }
		else // code for IE5 and IE6
		  {
		  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		  
		xhttp.onreadystatechange=function(){
			if(xhttp.readyState==4){ //&& xhttp.status==200){
				this.XMLLoaded(xhttp.responseXML);
			}
		}.bind(this);

		xhttp.open("GET",filename, true);
		xhttp.send();
		return xhttp.responseXML;
	};
	
	HandleXML.XMLLoaded = function(oXML){
		console.log("XMLLoaded");
		console.log(oXML);
		oXML = this.RemoveWhitespace(oXML);
		this.oJSON = this.ConvertXMLToJSON(oXML);
		this.fReturnFunc(this.oJSON);
	};

	HandleXML.RemoveWhitespace = function(xml){
		 var loopIndex;
		 for (loopIndex = 0; loopIndex < xml.childNodes.length; loopIndex++) 
		 {
			 var currentNode = xml.childNodes[loopIndex];
			
			 if (currentNode.nodeType == 1) 
				 {
					 this.RemoveWhitespace(currentNode);
				 }
			 if (!(/\S/.test(currentNode.nodeValue)) && (currentNode.nodeType == 3)) 
				 {
					 xml.removeChild(xml.childNodes[loopIndex--]);
				 }
		 }
		 return xml;
	};

	HandleXML.ConvertXMLToJSON = function(xml) {
		this.nTest++;
		// Create the return object
		var obj = {};
		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			//console.log("FOUND ATTRIBUTES");
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3 || xml.nodeType == 4) { // text / cdata
			obj = xml.nodeValue;
		}
		//console.log(this.nTest);
		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				
				var nodeName = item.nodeName;
				
				
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = this.ConvertXMLToJSON(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(this.ConvertXMLToJSON(item));
				}
			}
		}
		return obj;
	};



    return HandleXML;
});
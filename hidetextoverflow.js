function loadDomToArray(object) {
	var arrayWithTags = new Array();
	var arrayWithTagsTemp = new Array();
	arrayWithTags.push(object);
	if (arrayWithTags.length > 0) {
		var children = "true";
		var trigger = 0;
		while (children == "true") {
			if (trigger < arrayWithTags.length) {
				for (var i = 0; i < arrayWithTags.length; i++) {
					if (i == trigger) {
						if (trigger != arrayWithTags.length - 1) {
							if (arrayWithTags[i].childNodes.length > 0) {
								arrayWithTagsTemp.push(arrayWithTags[i]);
								for (var j = 0; j < arrayWithTags[i].childNodes.length; j++) {
									arrayWithTagsTemp.push(arrayWithTags[i].childNodes[j]);
								}
							}
							else {
								arrayWithTagsTemp.push(arrayWithTags[i]);
							}
						}
						else {
							if (arrayWithTags[i].childNodes.length > 0) {
								arrayWithTagsTemp.push(arrayWithTags[i]);
								for (var j = 0; j < arrayWithTags[i].childNodes.length; j++) {
									arrayWithTagsTemp.push(arrayWithTags[i].childNodes[j]);
								}
							}
							else {
								arrayWithTagsTemp.push(arrayWithTags[i]);
								children = "false";
							}
						}
					}
					else {
						arrayWithTagsTemp.push(arrayWithTags[i]);
					}
				}
				trigger += 1;
				arrayWithTags.length = 0;
				for (var i = 0; i < arrayWithTagsTemp.length; i++) {
					arrayWithTags.push(arrayWithTagsTemp[i]);
				}
				arrayWithTagsTemp.length = 0;
			}
			else {
				children = "false";
			}
		}
	}
	else {
		alert("Обнаружена ошибка: данные не получены.");
	}
	return arrayWithTags;
}
function elementsFilter(firstarray) {
	var secondarray = new Array();
	var thirdarray = new Array();
	var fourtharray = new Array();
	var fiftharray = new Array();
	var counterElementsWO = 0;
	var counterElementsDO = 0;
	var newCounterElementsWO = 0;
	var tempType = "";
	for (var i = 0; i < firstarray.length; i++) {
		if (firstarray[i].nodeName == "A" || firstarray[i].nodeName == "EM" || firstarray[i].nodeName == "Q") {
		    secondarray.push(firstarray[i]);
		}
		else if (firstarray[i].scrollWidth > firstarray[i].offsetWidth) {
		    secondarray.push(firstarray[i]);
		}
	}
	for (var i = 0; i < secondarray.length; i++) {
		if (secondarray[i].childNodes.length > 0) {
			for (var j = 0; j < secondarray[i].childNodes.length; j++) { 
				thirdarray.push(secondarray[i].childNodes[j]);
			}
		}
		if (secondarray[i].nodeName == "IMG") {
		    if (secondarray[i].alt != "") {
			thirdarray.push(secondarray[i].alt);
		    }
		}
	}
	for (var i = 0; i < firstarray.length; i++) {
		if (firstarray[i].scrollWidth > firstarray[i].offsetWidth) {
			counterElementsWO++;
		}
	}
	for (var i = 0; i < thirdarray.length; i++) {
		if (thirdarray[i].nodeValue != null) {
			varTemp = thirdarray[i].nodeValue;
			thirdarray[i].nodeValue = "";
			for (var j = 0; j < firstarray.length; j++) {
				if (firstarray[j].scrollWidth > firstarray[j].offsetWidth) {
					newCounterElementsWO++;
				}
			}
			counterElementsDO = counterElementsWO - newCounterElementsWO;
			if (counterElementsDO > 0) {
				fourtharray.push(thirdarray[i]);
				thirdarray[i].nodeValue = varTemp;				
			}
			else {
				thirdarray[i].nodeValue = varTemp;
			}
			newCounterElementsWO = 0;
			counterElementsWO = 0;
			for (var j = 0; j < firstarray.length; j++) {
				if (firstarray[j].scrollWidth > firstarray[j].offsetWidth) {
					counterElementsWO++;
				}
			}
		}				
	}
	for (var i = 0; i < fourtharray.length; i++) {
		var objectContainer = new HtoElement(i, fourtharray[i].nodeValue, fourtharray[i]);
		fiftharray.push(objectContainer);
		fourtharray[i].nodeValue = "";
	}
	return fiftharray;
}
function hideText(fourtharray, firstarray, htoLineCounter, crop) {
	var counterElementsWO = 0;
	var newCounterElementsWO = 0;
	var triggerOfStartWord = 0;
	var tempText = "";
	var tempC = "";
	var c = 0;
	var d = 0;
	var triggerOfFinishWord = 0;
	var lineCounter = 1;
	for (var j = 0; j < firstarray.length; j++) {
		if (firstarray[j].scrollWidth > firstarray[j].offsetWidth) {
			counterElementsWO++;
		}
	}
	for (var i = 0; i < fourtharray.length; i++) {
		tempText = fourtharray[i].textNode;
		while (d < tempText.length) {
			for (var j = c; j < tempText.length; j++) {
				fourtharray[i].element.nodeValue += tempText.charAt(j);
				for (var b = 0; b < firstarray.length; b++) {
					if (firstarray[b].scrollWidth > firstarray[b].offsetWidth) {
						newCounterElementsWO++;
					}
				}
				if (counterElementsWO != newCounterElementsWO) {
					triggerOfFinishWord = j;
					while (counterElementsWO != newCounterElementsWO) {
						counterElementsWO = 0;
						newCounterElementsWO = 0;
						fourtharray[i].element.nodeValue = "";
						for (var a = triggerOfStartWord; a <= triggerOfFinishWord - 1; a++) {
							fourtharray[i].element.nodeValue += tempText.charAt(a);
						}
						triggerOfFinishWord = triggerOfFinishWord - 1;
						for (var b = 0; b < firstarray.length; b++) {
							if (firstarray[b].scrollWidth > firstarray[b].offsetWidth) {
								counterElementsWO = 0;
								newCounterElementsWO = 1;
							}
						}
					}
					fourtharray[i].element.nodeValue += "\u0020";
					if (htoLineCounter != 0 && lineCounter < htoLineCounter) {
						lineCounter++;
					}
					tempC += fourtharray[i].element.nodeValue;
					fourtharray[i].element.nodeValue = "";
					triggerOfStartWord = triggerOfFinishWord + 1;
					c = triggerOfStartWord;
					counterElementsWO = 0;
					newCounterElementsWO = 0;
					break;
				}
				d++;
				if (lineCounter == htoLineCounter) {
					d = tempText.length;
				}
			}
		}
		tempC += fourtharray[i].element.nodeValue;
		fourtharray[i].element.nodeValue = tempC;
		tempC = "";
		d = 0;
		c = 0;
		counterElementsWO = 0;
		newCounterElementsWO = 0;
		triggerOfStartWord = 0;
		lineCounter = 1;
	}
	if (crop != 0) {
		for (var i = 0; i < fourtharray.length; i++) {
			tempC = "";
			tempText = fourtharray[i].element.nodeValue;
			for (var a = 0; a < tempText.length; a++) {
				if ((a == tempText.length - 1) && (tempText.charAt(a) == "\u0020")) {
					break;
				}
				else {
					tempC += tempText.charAt(a);
					triggerOfFinishWord = a;
				}
			}
			tempC += "...";
			fourtharray[i].element.nodeValue = tempC;
			for (var b = 0; b < firstarray.length; b++) {
				if (firstarray[b].scrollWidth > firstarray[b].offsetWidth) {
					newCounterElementsWO++;
				}
			}
			tempC = "";
			if (newCounterElementsWO == 0) {
				for (var a = 0; a <= triggerOfFinishWord; a++) {
					tempC += tempText.charAt(a);
				}
				fourtharray[i].element.nodeValue = tempC;
			}
			else {
				newCounterElementsWO = 0;
			}
			for (var b = 0; b < firstarray.length; b++) {
				if (firstarray[b].scrollWidth > firstarray[b].offsetWidth) {
					newCounterElementsWO++;
				}
			}
			tempText = fourtharray[i].element.nodeValue;
			if (counterElementsWO != newCounterElementsWO) {
				triggerOfFinishWord = fourtharray[i].element.nodeValue.length;
				while (counterElementsWO != newCounterElementsWO) {
					counterElementsWO = 0;
					newCounterElementsWO = 0;
					fourtharray[i].element.nodeValue = "";
					for (var a = triggerOfStartWord; a <= triggerOfFinishWord - 1; a++) {
						fourtharray[i].element.nodeValue += tempText.charAt(a);
					}
					if (crop != 0) {
						fourtharray[i].element.nodeValue += "...";
					}
					triggerOfFinishWord = triggerOfFinishWord - 1;
					for (var b = 0; b < firstarray.length; b++) {
						if (firstarray[b].scrollWidth > firstarray[b].offsetWidth) {
							counterElementsWO = 0;
							newCounterElementsWO = 1;
						}
					}
				}
			}
		}
	}
}
function HtoElement(id, textNode, element) {
	this.id = id;
	this.textNode = textNode;
	this.element = element;
}
function hideTextOverflow(htoLineCounter, crop) {
	var object = document.documentElement;
	var firstarray = loadDomToArray(object);
	var fourtharray = elementsFilter(firstarray);
	hideText(fourtharray, firstarray, htoLineCounter, crop);
}

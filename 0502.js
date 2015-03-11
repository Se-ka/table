/**
 * Created by sergiy on 05.02.15.
 */

bufferForInformation = [];
number = 0;
number1 = 0;
keyForSorting = false;
keyForSortDirections = false;

var startTime;

readyFunction = function() {
	startTime = (new Date()).getTime();
    requestMasseges();
};

$(readyFunction);

addInformInBufForForm = function (answerFromServer) {
    bufferForInformation = answerFromServer;
    renderInformation();
};

changeSymbols = function (event) {
    var elem = $(event.target),
        isDown = elem.hasClass("symbolDown");
    $('.forSymbols')
        .removeClass("symbolUp")
        .removeClass("symbolDown")
        .addClass("symbolNotSort");
    elem.removeClass("symbolNotSort");
    keyForSorting = $(elem).parent().attr("sortkey");
    console.log(elem);
    console.log($(elem).parent().attr("sortkey"));
    if (isDown) {
        elem.addClass("symbolUp");
        keyForSortDirections = false;
    }
    else{
        elem.addClass("symbolDown");
        keyForSortDirections = true;
    }
};

attachListeners = function () {
    $('.forSymbols').on ("click", function clickForSort (event)   {
        changeSymbols(event);
        sort();
        renderInformation();
    });
};

renderInformation = function () {

    var key,
	    l = bufferForInformation.length,
	    i,
	    tr, trNumbers, trTitles, span, td, textNode;

    var domFragment = document.createDocumentFragment();
	var tbody = document.createElement("tbody");
	domFragment.appendChild(tbody);

	//var tbody = ($("tbody").empty())[0];


	trNumbers = document.createElement("tr");
	trNumbers.className = "trTag1 trColomnNumbers";
	td = document.createElement("td");
	trNumbers.appendChild(td);
	tbody.appendChild(trNumbers);


	trTitles = document.createElement("tr");
	trTitles.className = "trTag2 trColomnTitles";
	td = document.createElement("td");
	trTitles.appendChild(td);
	tbody.appendChild(trTitles);


    for (key in bufferForInformation[0]) { // пошли по ключам первого объекта
	    
	    if (!bufferForInformation[0].hasOwnProperty(key)) { continue; }
	    
        //відмальовує дві головні(основні) строки
        number1++;

	    td = document.createElement("td");
	    textNode = document.createTextNode(number1);
	    td.appendChild(textNode);
        trNumbers.appendChild(td);//номери

        // вводим переменную для использования её при повторной отрисовке, по нажатию на символ сортировки
        var dynamicSymbolSort = "symbolNotSort";
	    
        if (keyForSorting === key) { // если значение переменной keyForSorting равно - key
            if (keyForSortDirections === true) { //
                dynamicSymbolSort = "symbolDown"; //
            } else { //
                dynamicSymbolSort = "symbolUp"; //
            }
        }
        //назви колонок

	    span = document.createElement("span");
	    span.className = "forSymbols " + dynamicSymbolSort;

	    td = document.createElement("td");
	    td.setAttribute("sortkey", key);
	    td.appendChild(document.createTextNode(key));
	    td.appendChild(span);

	    trTitles.appendChild(td);
    }

	
	


	var z = 0;
    for (i = 0; i < l; i++) { // проходит по индексам массива(у нас там массив с объектами)
        // и то, и то работает одинаково!!!!!!
        /*for (i in bufferForInformation) { // работает как по массиву, только проходит по ключам объектов
         //(каждый наш объект получает ключ(индекс) от 0 и ..., но названия настоящих ключей не меняются)
         // зачем это нужно?????????????
         renderOneMessage(bufferForInformation[i]);
         }
         */

        number++;
	    
	    tr = document.createElement("tr");
	    
	    td = document.createElement("td");
	    textNode = document.createTextNode(number);
	    td.appendChild(textNode);
	    tr.appendChild(td);

	    for (key in bufferForInformation[0]) { // пошли по ключам первого объекта
		    if (!bufferForInformation[0].hasOwnProperty(key)) { continue; }
		    
		    td = document.createElement("td");
		    textNode = document.createTextNode(bufferForInformation[i][key]);
		    td.appendChild(textNode);
		    tr.appendChild(td);
	    }

	    tbody.appendChild(tr);
	    
	    //z = z + tr.clientHeight;
    }
	console.log(z);

	($("table").empty())[0].appendChild(domFragment);

    attachListeners();
    number = 0;
    number1 = 0;

	finishTime = (new Date()).getTime();
	
	console.log("Time spent: ", finishTime - startTime);
};

requestMasseges = function() {
    $.ajax({url:"convertcsv.json"}).done(addInformInBufForForm);
};

sort = function () {
    var c, bFI = bufferForInformation, l = bFI.length, i, buf;
    console.log(l);
    for (c = 0; c < l; c++) {
        for (i = 0; i < l - 1; i++) {
            if (keyForSortDirections === false) {
                if (bFI[i][keyForSorting] > bFI[i + 1][keyForSorting]) {
                    buf = bFI[i];
                    bFI[i] = bFI[i + 1];
                    bFI[i + 1] = buf;
                    //console.log(bFI[0].street, "1");
                }
            } else {
                if (bFI[i][keyForSorting] < bFI[i + 1][keyForSorting]) {
                    buf = bFI[i];
                    bFI[i] = bFI[i + 1];
                    bFI[i + 1] = buf;
                    //console.log(bFI[0].street, "2");
                }
            }
        }
    }
    console.log(bFI[0].street, "3");
};

/**
 * Created by sergiy on 05.02.15.
 */

bufferForInformation = [];
number = 0;
number1 = 0;
keyForSorting = false;
keyForSortDirections = false;


radyFunction = function() {
    requestMasseges();
};
$(radyFunction);


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
    var key, l = bufferForInformation.length, i, tbody = $('tbody');
        tbody.empty();
        tbody.append("<tr class='trTag1 trColomnNumbers'></tr>");
    var trTag1 = $(".trTag1");
        trTag1.append("<td></td>");
    tbody.append("<tr class='trTag2 trColomnTitles'></tr>");
    var trTag2 = $(".trTag2");
    trTag2.append("<td></td>");


    for (key in bufferForInformation[0]) { // пошли по ключам первого объекта
        //відмальовує дві головні(основні) строки
        number1++;
        trTag1.append("<td>" + number1 +"</td>");//номери
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
        trTag2.append("<td sortkey = '" + key + "'>" + key + "<span class='forSymbols " + dynamicSymbolSort + "'></span></td>");
    }


    for (i=0;i < l; i++) { // проходит по индексам массива(у нас там массив с объектами)
        // и то, и то работает одинаково!!!!!!
        /*for (i in bufferForInformation) { // работает как по массиву, только проходит по ключам объектов
         //(каждый наш объект получает ключ(индекс) от 0 и ..., но названия настоящих ключей не меняются)
         // зачем это нужно?????????????
         renderOneMessage(bufferForInformation[i]);
         }
         */
        number++;
        tbody.append(
            "<tr>" +
            "<td>" + number +                               "</td>" +
            "<td>" + bufferForInformation[i].street +       "</td>" +
            "<td>" + bufferForInformation[i].city +         "</td>" +
            "<td>" + bufferForInformation[i].zip +          "</td>" +
            "<td>" + bufferForInformation[i].state +        "</td>" +
            "<td>" + bufferForInformation[i].beds +         "</td>" +
            "<td>" + bufferForInformation[i].baths +        "</td>" +
            "<td>" + bufferForInformation[i].sq__ft +       "</td>" +
            "<td>" + bufferForInformation[i].type +         "</td>" +
            "<td>" + bufferForInformation[i].sale_date +    "</td>" +
            "<td>" + bufferForInformation[i].price +        "</td>" +
            "<td>" + bufferForInformation[i].latitude +     "</td>" +
            "<td>" + bufferForInformation[i].longitude +    "</td>" +
            "</<tr>>");
    }
    attachListeners();
    number = 0;
    number1 = 0;
};


requestMasseges = function() {
    $.ajax({url:"convertcsv.json"
})
.done(addInformInBufForForm);
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






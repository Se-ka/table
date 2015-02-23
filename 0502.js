/**
 * Created by sergiy on 05.02.15.
 */

bufferForInformation = [];
number = 0;
number1 = 0;


radyFunction = function() {

    requestMasseges();


};
$(radyFunction);


renderOneMessage = function (information) {
    number++;
    $('tbody').append(
        "<tr>" +
            "<td>" + number +                   "</td>" +
            "<td>" + information.street +       "</td>" +
            "<td>" + information.city +         "</td>" +
            "<td>" + information.zip +          "</td>" +
            "<td>" + information.state +        "</td>" +
            "<td>" + information.beds +         "</td>" +
            "<td>" + information.baths +        "</td>" +
            "<td>" + information.sq__ft +       "</td>" +
            "<td>" + information.type +         "</td>" +
            "<td>" + information.sale_date +    "</td>" +
            "<td>" + information.price +        "</td>" +
            "<td>" + information.latitude +     "</td>" +
            "<td>" + information.longitude +    "</td>" +
        "</<tr>>");
};


addInformInBufForForm = function (answerFromServer) {
    bufferForInformation = answerFromServer;
    //console.log(bufferForInformation.length);
    takeMasseges();
};


attachListeners = function () {
    $('.forSymbols').on ("click", function clickForSort (event)   {
        var elem = $(event.target),
            isUp = elem.hasClass("symbolDown");
        console.log(elem);
        $('.forSymbols').removeClass("symbolUp")
            .removeClass("symbolDown")
            .addClass("symbolNotSort");
        elem.removeClass("symbolNotSort");
        if (isUp) {
            elem.addClass("symbolUp");
        }
        else{
            elem.addClass("symbolDown");
        }
    });
};


takeMasseges = function () {
    takeTheKeysInTheObject();
    sort();
    attachListeners();
    var l = bufferForInformation.length,
        i;
    for (i=0;i < l; i++) { // проходит по индексам массива(у нас там массив с объектами)
    renderOneMessage(bufferForInformation[i]);
    }
    // и то, и то работает одинаково!!!!!!
    /*for (i in bufferForInformation) { // работает как по массиву, только проходит по ключам объектов
    //(каждый наш объект получает ключ(индекс) от 0 и ..., но названия настоящих ключей не меняются)
    // зачем это нужно?????????????
        renderOneMessage(bufferForInformation[i]);
    }
    */
};

information



displayOneColumns = function (key) {
        number1++;
    $('.trColomnNumbers').append("<td>" + number1 +"</td>");
    $('.trColomnTitles').append("<td>" + key + "<span class='forSymbols symbolNotSort'></span></td>");
};


takeTheKeysInTheObject = function () {
    var key;
    for (key in bufferForInformation[0]) {
        displayOneColumns(key);
    }
};

requestMasseges = function() {
    $.ajax({url:"convertcsv.json"
})
.done(takeTheKeysInTheObject, addInformInBufForForm);
};


sort = function () {
   // console.log(bufferForInformation);

    //$(symbol.target).parent().attr("sortBy")

    var c, bFI = bufferForInformation, l = bFI.length, i, buf;
    console.log(l);
    for (c = 0; c < l; c++) {
        for (i = 0; i < l - 1; i++) {
            if (bFI[i].key > bFI[i+1].key) {
                buf = bFI[i];
                bFI[i] = bFI[i+1];
                bFI[i+1] = buf;
            }
        }
    }
    console.log(bFI[0].street);
};






/**
 * Created by sergiy on 05.02.15.
 */

var bufferForInformation = [];


var radyFunction = function() {
    requestMasseges();
    $('#symbolForStreet').on ("click", function clickForSort ()   {
        $('#symbolForStreet').removeClass('symbolNotSort');
        $('#symbolForStreet').addClass('symbolUp');

        //$(symbol.target).parent().attr("sortBy")

    }
    );
};

$(radyFunction);


var number = 0;
var renderOneMessage = function (message) {
    number++;
    $('tbody').append(
        "<tr>" +
            "<td>"+number+"</td>" +
            "<td>"+message.street+"</td>" +
            "<td>"+message.city+"</td>" +
            "<td>"+message.zip+"</td>" +
            "<td>"+message.state+"</td>" +
            "<td>"+message.beds+"</td>" +
            "<td>"+message.baths+"</td>" +
            "<td>"+message.sq__ft+"</td>" +
            "<td>"+message.type+"</td>" +
            "<td>"+message.sale_date+"</td>" +
            "<td>"+message.price+"</td>" +
            "<td>"+message.latitude+"</td>" +
            "<td>"+message.longitude+"</td>" +
        "</<tr>>");
};


var addInformInBufForForm = function (answerFromServer) {
    bufferForInformation = answerFromServer;
    takeMasseges();
};


var takeMasseges = function () {
    filter();
    console.log(bufferForInformation);
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


var requestMasseges = function() {
    $.ajax({url:"convertcsv.json"
})
.done(addInformInBufForForm);
};


var filter = function () {
    console.log(bufferForInformation);
var c, l = bufferForInformation.length, i, buf;
for (c = 0; c < l; c++) {
    for (i = 0; i < l - 1; i++) {
        if (bufferForInformation[i].key > bufferForInformation[i+1].key) {
            buf = bufferForInformation[i];
            bufferForInformation[i] = bufferForInformation[i+1];
            bufferForInformation[i+1] = buf;
        }

    }
}
};






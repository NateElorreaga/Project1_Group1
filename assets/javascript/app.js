


// Your web app’s Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAML9mVgPvmI9AFjHTWN4GjxxEpnBDZlqo",
    authDomain: "eventeasy-8c748.firebaseapp.com",
    databaseURL: "https://eventeasy-8c748.firebaseio.com",
    projectId: "eventeasy-8c748",
    storageBucket: "eventeasy-8c748.appspot.com",
    messagingSenderId: "704944390338",
    appId: "1:704944390338:web:ea8864bd0ac7fc4b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database()
var firestore = firebase.firestore();

var resultsDiv;
var settings;

var urlCreator = function (userInput, settingsLocal) {
    for (prop in userInput) {
        if ($("#" + prop).val() === undefined || $("#" + prop).val() === '' || $("#" + prop).val() === 'Choose...') { userInput[prop] = '' };
        settingsLocal.url = settingsLocal.url + userInput[prop];
        return userInput
    };
};

var locationConversion = function (userInput) {
    $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + $("#zipCode").val() + "&key=AIzaSyA83a9a87aUgnoMO1tcqThKpamG5UynLEI",
        success: function (response) {
            userInput['latlong'] = response.results[0].geometry.location;
            userInput['latlong'] = userInput['latlong']['lat'].toString() + "," + userInput['latlong']['lng'].toString();
            userInput['latlong'] = "&latlong=" + userInput['latlong'];
            console.log(userInput['latlong']);
            return userInput;
        },
    })
};

$("#searchButton").click(function (e) {
    e.preventDefault();

    //-----------------------------------------------------------------------//
    //initializes ajax settings
    var settingsLocal = {
        // "url": "https://app.ticketmaster.com/discovery/v2/"+$("#type").val()+".json?&apikey=wgvkeg8fAF8kBUpnimtGl3TRrktNnitx",
        "url": 'https://app.ticketmaster.com/discovery/v2/events?apikey=aWc27nlXm2SrWeETzz1BHBWck4g20amR&locale=*&size=50&countryCode=US&preferredCountry=us',
        "method": "GET",
        "error": function (response) {
            $("#errorText").text(JSON.stringify(response))
            $('#errorModal').modal('toggle')
        },
        "type": "events" //$("#type").val()
    }


    var userInput = {
        'keyword': "&keyword=" + $("#keyword").val(),
        'city': "&city="+$("#city").val(),
        'startDate': "&startDate=" + $("#startDate").val(),
        'genre': "&classificationName=" + $("#genre").val(),
        'radius': "&radius=50&unit=miles",
        'sort': "&sort=" + $("#sort").val(),
        propertyStringArray: ["keyword", "city", "type", "startDate", "genre", "sort"],

        // Sorting order of the search result. Allowed values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
        // 'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
        // 'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
        // 'venueName,asc', 'venueName,desc', 'random'
    }



    for (prop in userInput) {
        if ($("#" + prop).val() === undefined || $("#" + prop).val() === '' || $("#" + prop).val() === 'Choose...') { userInput[prop] = '' };
        // if($("#zipCode").val() === ''){userInput['zipCode']="&postalCode=84070"}
        settingsLocal['url'] = settingsLocal['url'] + userInput[prop];
    };

    // if ($("#zipCode").val() !== "") {
    //     settingsLocal = urlCreator(locationConversion(userInput), settingsLocal);

    // } else {
    //     settingsLocal = urlCreator(userInput, settingsLocal);
    // }


    // userInput['geo'] =
    // for looping over userInputs to make sure empty properties dont break the link with undefined
    // and sets location default to sandy


    settings = { 'obj': JSON.stringify(settingsLocal) };

    console.log(settingsLocal)
    //-----------------------------------------------------------------------------//

    firestore.collection("ticketmasterURL").doc("settings").set(settings)
        .then(function () {
            console.log("Document successfully written!");
            var location = window.location.toString();
            if (!location.includes(($("#searchButton").attr("href")))) {
                window.location = $("#searchButton").attr("href");
            }
            else {
                getResponse()
            }

        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        })
});

//-------------------------------------------------------------------------------//

var getResponse = function () {

    firestore.collection("ticketmasterURL").doc("settings").get()
        .then(function (doc) {
            if (doc.exists) {
                //----------------GETTING SETTINGS FROM FIRESTORE-----------//

                let settings = JSON.parse(doc.data()["obj"])
                //---------AJAX CALL USING FIREBASE SAVED SETTINGS-------//

                $.ajax(settings).then(function (response) {
                    // (responseX) is this entire html
                    appendResults(response, settings["type"])
                });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}
//);

var appendResults = function (response, type) {

    $(".card-group").empty();
    let responseResults = response._embedded[type]


    //-------------THIS LOOKS AWESOME!!!!!!!---------//
    for (var i = 0; i < responseResults.length; i++) {
        // var newRowReady = 3;
        var eventName = responseResults[i].name;
        var eventDate = responseResults[i].dates.start.localDate + " " + responseResults[i].dates.start.localTime;
        var imageURL = (responseResults[i].images[9].url);
        //links to the URL to purchase tickets 
        var linkURL = (responseResults[i].url);
    
        var date = moment(eventDate).format('MMMM Do YYYY, hh:mm a');

        //made this var global so we can use it on any html
        resultDiv = `<div class="col-md-4 m-auto p-4">
        <img src="${imageURL}" class="card-img-top">
        <div class="card-body bg-white" id="results-card">
        <h5 class="card-title">${eventName}</h5>
        <p class="card-text">${date}</p>
        <a href="${linkURL}" class="btn btn-primary" id="buy-tickets">Buy Tickets</a>
                            </div>
                        </div>`;

        $(".card-group").append(resultDiv);

    };
}

$(document).ready(function () {
    getResponse()
})

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

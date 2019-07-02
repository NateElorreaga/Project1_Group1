


// Your web app’s Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyAML9mVgPvmI9AFjHTWN4GjxxEpnBDZlqo",
   authDomain: "eventeasy-8c748.firebaseapp.com",
   databaseURL: "https://eventeasy-8c748.firebaseio.com",
   projectId: "eventeasy-8c748",
   storageBucket: "",
   messagingSenderId: "704944390338",
   appId: "1:704944390338:web:ea8864bd0ac7fc4b"
 };
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var local = window.localStorage;
var resultsDiv
var response;
$("#searchButton").click(function(e) {

    //-----------------------------------------------------------------------//
    e.preventDefault()
    //initializes ajax settings
    settings = {
        url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=wgvkeg8fAF8kBUpnimtGl3TRrktNnitx",
        "method": "GET",
        "error": function (response) {
            $("#errorText").text(JSON.stringify(response))
            $('#errorModal').modal('toggle')
        }
    }


    var userInput = {
        'keyword': "&keyword=" + $("#keyword").val(),
        'zipCode': "&postalCode=" + $("#zipCode").val(),
        'radius': "&radius=" + $("#radius").val() + "&unit=miles",
        'startDate': "&startDate=" + $("#startDate").val(),
        'genre': "&classification=" + $("#genre").val(),
        'sort': "&sort=" + $("#sort").val(),
        propertyStringArray: ["keyword", "zipCode", "radius", "startDate", "genre", "sort"],

        //Sorting order of the search result. Allowed values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
        //'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
        //'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
        //'venueName,asc', 'venueName,desc', 'random'
    }

    // for looping over userInputs to make sure empty properties dont break the link with undefined
    // and sets location default to sandy
    for (prop in userInput) {
        if ($("#" + prop).val() === undefined || $("#" + prop).val() === '') { userInput[prop] = '' };
        if (userInput.zipCode === "") { userInput.zipCode = "&postalCode=84070"; }
        if (userInput.radius === "") { userInput.radius = "&radius=25&unit=miles"; }
        settings.url = settings.url + userInput[prop];
    }

    console.log(settings.url)

    // Add a new document in collection "cities"
    database.collection("ticketmasterURL").doc("kmmH4qfXjCqxZ59xlq1u").set(settings)
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


    // double checks url before sent to api for response
    
    //---------------------------------------------------------------------------------------//

    // Calls ajax using link put together above


    location.hash = "#/results.html";
    appendResults()
})

//----JQ fx so that the results page appends results--//
var appendResults = function () {

    $.ajax(settings).then(function (responseX) {
        console.log(responseX)
        response = responseX;
    });

    $(".container-results").empty();
    response = JSON.parse(local.getItem("response"))

    //-------------THIS LOOKS AWESOME!!!!!!!---------//
    for (var i = 0; i < response._embedded.events.length; i++) {
        var eventName = response._embedded.events[i].name;
        var eventDate = response._embedded.events[i].dates.start.localDate + " " + response._embedded.events[i].dates.start.localTime;
        var imageURL = (response._embedded.events[i].images[9].url);
        //links to the URL to purchase tickets 
        var linkURL = (response._embedded.events[i].url);

        var date = moment(eventDate).format('MMMM Do YYYY, h:mm a');

        //made this var global so we can use it on any html
        resultsDiv = `<div class="col-md-4">
        <img src="${imageURL}" class="card-img-top">
        <div class="card-body" id="results-card">
        <h5 class="card-title">${eventName}</h5>
        <p class="card-text">${date}</p>
        <a href="${linkURL}" class="btn btn-primary" id="buy-tickets">Buy Tickets</a>
                            </div>
                        </div>`;
        $(".container-results").append(resultsDiv);

        //TRYING TO CONVERT DATES AND TIMES
        // var date = response._embedded.events[i].dates.start.localDate;
        // var time = response._embedded.events[i].dates.start.localTime;

        // var updatedDate = moment(date)._d;
        // console.log(updatedDate);
        // console.log(time);

    };
}

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})




// Your web app’s Firebase configuration
var firebaseConfig = {
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


var firestore = firebase.firestore();

var resultsDiv;

$("#searchButton").click(function() {
    //-----------------------------------------------------------------------//
    //initializes ajax settings
    var settings = {
        "url": "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=wgvkeg8fAF8kBUpnimtGl3TRrktNnitx",
        "method": "GET",
        "error": function (response) {
            $("#errorText").text(JSON.stringify(response))
            $('#errorModal').modal('toggle')
        },
    }


    var userInput = {
        'keyword': "&keyword=" + $("#keyword").val(),
        'zipCode': "&postalCode=" + $("#zipCode").val(),
        'radius': "&radius=" + $("#radius").val() + "&unit=miles",
        'startDate': "&startDate=" + $("#startDate").val(),
        'genre': "&classification=" + $("#genre").val(),
        'sort': "&sort=" + $("#sort").val(),
        propertyStringArray: ["keyword", "zipCode", "radius", "startDate", "genre", "sort"],

        // Sorting order of the search result. Allowed values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
        // 'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
        // 'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
        // 'venueName,asc', 'venueName,desc', 'random'
    }

    // for looping over userInputs to make sure empty properties dont break the link with undefined
    // and sets location default to sandy
    for (prop in userInput) {
        if ($("#" + prop).val() === undefined || $("#" + prop).val() === '') { userInput[prop] = '' };
        if (userInput.zipCode ==="") { userInput.zipCode = "&postalCode=84070"; }
        if (userInput.radius ==="") { userInput.radius = "&radius=25&unit=miles"; }
        settings.url = settings.url + userInput[prop];
    }

    console.log(settings)

    // Add a new document in collection "cities"
    firestore.collection("ticketmasterURL").doc("settings").set({obj: JSON.stringify(settings)},{merge: true})
        .then(function () {
            console.log("Document successfully written!");
            debugger
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });  
    //---------------------------------------------------------------------------------------//
})

var getResponse = function() {
    firestore.collection("ticketmasterURL").doc("settings").get()
    .then(function(doc) {
        if (doc.exists) {
            //----------------GETTING SETTINGS FROM FIRESTORE-----------//

             let settings = JSON.parse(doc.data()["obj"])
            console.log(settings.url)
             //---------AJAX CALL USING FIREBASE SAVED SETTINGS-------//

             $.ajax(settings).then(function (response) {
                // (responseX) is this entire html
                appendResults(response)
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

var appendResults = function(response) {
    console.log(response)
    $(".container-results").empty();

    //-------------THIS LOOKS AWESOME!!!!!!!---------//
    var resultCounter = 1;
    for (var i = 0; i < response._embedded.events.length; i++) {
        var newRowReady = 3;
        var eventName = response._embedded.events[i].name;
        var eventDate = response._embedded.events[i].dates.start.localDate + " " + response._embedded.events[i].dates.start.localTime;
        var imageURL = (response._embedded.events[i].images[9].url);
        //links to the URL to purchase tickets 
        var linkURL = (response._embedded.events[i].url);

        var date = moment(eventDate).format('MMMM Do YYYY, h:mm a');

        //made this var global so we can use it on any html
        resultDiv = `<div class="col-md-4 float-left">
        <img src="${imageURL}" class="card-img-top">
        <div class="card-body" id="results-card">
        <h5 class="card-title">${eventName}</h5>
        <p class="card-text">${date}</p>
        <a href="${linkURL}" class="btn btn-primary" id="buy-tickets">Buy Tickets</a>
                            </div>
                        </div>`;
        

        
        if (resultCounter % newRowReady !== 0) {
            $(eventRow).append(resultDiv);
        } else {
            $("#container-results").append(eventRow);
            debugger
            var eventRow = $("<div>");
            resultCounter = 1;
            $(eventRow).attr("class","row");
        };

    };
}

$(document).ready(function(){
    console.log("loaded")
    getResponse()
})

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAWhGiAZ7wZVq3md9S54IfLqDVVITJpKB4",
    authDomain: "firestore-practice1.firebaseapp.com",
    databaseURL: "https://firestore-practice1.firebaseio.com",
    projectId: "firestore-practice1",
    storageBucket: "firestore-practice1.appspot.com",
    messagingSenderId: "149291352027",
    appId: "1:149291352027:web:5730c448c25de773"
};


//Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.firestore();

var local = window.localStorage;
var resultsDiv
var response;
$("#searchButton").click(function (e) {

    //-----------------------------------------------------------------------//
    e.preventDefault()
    //initializes ajax settings
    var settings = {
        url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=wgvkeg8fAF8kBUpnimtGl3TRrktNnitx",
        "method": "GET",
        "error": function (response) {
            $("#errorText").text(JSON.stringify(response))
            $('#errorModal').modal('toggle')
        }
    }



    var userInput = {
        keyWord: "&keyword=" + $("#keyWord").val(),
        zipCode: "&postalCode=" + $("#zipCode").val(),
        radius: "&radius=" + $("#radius").val() + "&unit=miles",
        startDate: "&startDateTime=" +$("#startDate").val(),
        genre: "&classification=" + $("#genre").val(),
        sort: "&sort=" + $("#sort").val(),
        
        //Sorting order of the search result. Allowed values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
        //'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
        //'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
        //'venueName,asc', 'venueName,desc', 'random'
    }

    if($("#search").val()===undefined){userInput[keyWord]=''};
    if($("#zipCode").val()===undefined){userInput[zipCode]=''};
    if($("#distance").val()===undefined){userInput[radius]=''};
    if($("#startDate").val()===undefined){userInput[startDate]=''};
    if($("#genre").val()===undefined){userInput[genre]=''};
    if($("#sort").val()===undefined){userInput[sort]=''};

    // for looping over userInputs to make sure empty properties dont break the link with undefined
    // and sets location default to sandy
    for (prop in userInput) {
        console.log(userInput[prop])
        if (userInput[prop].includes('undefined') || userInput[prop].includes('null')) { userInput[prop] = "" }
        if (userInput.zipCode === "") { userInput.zipCode = "&postalCode=84070"; }
        if (userInput.radius === "") { userInput.radius = "&radius=25&unit=miles"; }
        settings.url = settings.url + userInput[prop];
    }


    // double checks url before sent to api for response
    console.log(settings.url)
    //---------------------------------------------------------------------------------------//

    // Calls ajax using link put together above
    $.ajax(settings).then(function (responseX) {
        Window.localStorage.setItem("response",JSON.stringify(responseX))
        console.log(responseX)
        response = responseX;
        
    });
    location.hash = "#/results.html";
    appendResults
})

//----JQ fx so that the results page appends results--//
var appendResults = function(){

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

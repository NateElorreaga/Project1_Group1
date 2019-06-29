
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

//-------Extra ajax code--------//

var response;
$("#searchButton").click(function () {

    //-----------------------------------------------------------------------//

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
        keyWord: "&keyword=" + $("#search").val(),
        zipCode: "&postalCode=" + $("#zipCode").val(),
        radius: "&radius=" + $("#city").val() + "&unit=miles",
        startDate: "&startDateTime=" + $("#startDate").val(),
        genre: "&classificationName=" + $("#genre").val(),
        sort: "&sort=" + $("#sort").val(),
        //Sorting order of the search result. Allowed values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
        //'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
        //'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
        //'venueName,asc', 'venueName,desc', 'random'
    }

    // for looping over userInputs to make sure empty properties dont break the link with undefined
    // and sets location default to sandy
    for (prop in userInput) {
        if (userInput[prop].includes('undefined')){userInput[prop] = ""}
        if (userInput.zipCode===""){userInput.zipCode = "&postalCode=84070";}
        if (userInput.radius===""){userInput.radius = "&radius=25&unit=miles";}
        settings.url = settings.url + userInput[prop]
    }


    // double checks url before sent to api for response
    console.log(settings.url)
    //---------------------------------------------------------------------------------------//

    // Calls ajax using link put together above
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
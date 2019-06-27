import { utimesSync } from "fs";

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
var userInput;
$("#searchButton").click(function(){
    userInput= {
    keyWord = $("#repoLink").val(),
    zipCode = $("#zipCode").val(),
    city = $("#city").val(),
    startDate = $("#startDate").val(),
    endDate = $("#endDate").val(),
    sort = $("#sort").val(),
    //Sorting order of the search result. Allowable values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 
    //'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 
    //'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 
    //'venueName,asc', 'venueName,desc', 'random'
    genre = $("#genre").val(),

    queryUrl = "https://gitlab.example.com/api/v4/projects/" + repoLink + "/repository/tree"
}})

var settings = {
    url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+userInput.keyWord+"&postalCode="+userInput.zipCode+"&city="+userInput.city+"&startDateTime="+userInput.startDate+"&endDateTime="+userInput.endDate+"&sort="+userInput.sort+"&classificationName="+userInpute.genre+"&apikey=wgvkeg8fAF8kBUpnimtGl3TRrktNnitx",
    "method": "GET",
    error: function (response) {
        $("#errorText").text(JSON.stringify(response))
        $('#errorModal').modal('toggle')
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
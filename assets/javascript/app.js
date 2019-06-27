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
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.firestore();

var saltLakeEvents = function(){
const cheerio = require('cheerio');
const $ = cheerio.load('https://www.visitsaltlake.com/events/free-events/');

return $("div.results").text()

}

console.log(saltLakeEvents())
 //-------Extra ajax code--------//

// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": https://gitlab.example.de/api/v4/projects/"+id+"/repository/commits,
//     "method": "GET",
//     "headers": {
//         "PRIVATE-TOKEN": "TOKEN"
//     }
// }

// var response;
// $("#goRepoLink").click(function () {
//     var repoLink = $("#repoLink").val()
//     var siteUrl = $("#repoLink").val()
//     queryUrl = "https://gitlab.example.com/api/v4/projects/" + repoLink + "/repository/tree"
// })

// //ajax
// var settings = {
//     type: "GET",
//     "async": true,
//     "crossDomain": true,
//     url: https://hxtsoafqna.execute-api.us-east-1.amazonaws.com/stage/api,
//     data: "data",
//     "method": "GET",
//     "headers": {
//         "PRIVATE-TOKEN": "TOKEN"
//     },
//     error: function (response) {
//         $("#errorText").text(JSON.stringify(response))
//         $('#errorModal').modal('toggle')
//     },
// }

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
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
$("#goRepoLink").click(function () {
    var repoLink = $("#repoLink").val()
    var siteUrl = $("#repoLink").val()
    queryUrl = "https://gitlab.example.com/api/v4/projects/" + repoLink + "/repository/tree"
})

//ajax
// var settings = {
//     type: "GET",
//     url: "https://robby.p.rapidapi.com/search.json?country=US&lng=-74.00597&city=New+York&lat=40.71435&to=2016-08-01T20%3A30%3A00%2B08%3A00&limit=30&distance=10&from=2016-06-30T20%3A30%3A00",
//     data: "data",
//     "X-RapidAPI-Host": "robby.p.rapidapi.com",
//     "X-RapidAPI-Key": "30a1796ba2msh7439ec8fbfa7e5bp1c14b6jsnd18ba567a593",
//     "method": "GET",
//     error: function (response) {
//         $("#errorText").text(JSON.stringify(response))
//         $('#errorModal').modal('toggle')
//     },
// }

unirest.get("https://robby.p.rapidapi.com/search.json?country=US&lng=-74.00597&city=New+York&lat=40.71435&to=2016-08-01T20%3A30%3A00%2B08%3A00&limit=30&distance=10&from=2016-06-30T20%3A30%3A00")
.header("X-RapidAPI-Host", "robby.p.rapidapi.com")
.header("X-RapidAPI-Key", "30a1796ba2msh7439ec8fbfa7e5bp1c14b6jsnd18ba567a593")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
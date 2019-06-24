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
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database()
  var response;
  $("#goRepoLink").click(function(){
    var repoLink = $("#repoLink").val()
    queryUrl = "/projects/:"+repoLink+"/repository/tree"
  })
  $.ajax({
      type: "method",
      url: "url",
      data: "data",
      dataType: "dataType",
      success: function (x) {
        response = x
      },
      error: function (response) {
          $("#errorText").text(JSON.stringify(response))
        $('#errorModal').modal('toggle')
      }
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
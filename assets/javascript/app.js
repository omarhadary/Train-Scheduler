// Initialize Firebase
var config = {
    apiKey: "AIzaSyBfDKvRdcIud8sDL14U8DCfwDvM3asZecQ",
    authDomain: "train-scheduler-f9b60.firebaseapp.com",
    databaseURL: "https://train-scheduler-f9b60.firebaseio.com",
    storageBucket: "train-scheduler-f9b60.appspot.com",
    messagingSenderId: "202535506276"
};
firebase.initializeApp(config);

var database = firebase.database();
var nextTrain;
var tMinutesTillTrain;
$("#add-train").on("click", function() {
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();


    var cleanTime = moment(time, "hh:mm").subtract(1, "years");
    console.log(cleanTime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(cleanTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


    // var cleanTime = moment(time).format("X");
    // console.log(cleanTime);
    // var cleanFrequency = moment(frequency).format("X");
    // var nextArrival = cleanTime+cleanFrequency;
    // console.log(nextArrival);

    // var startDate = moment(date).format("MMM Do YY");
    // var currentDate = parsetInt(moment().format("MMM Do YY"));
    // var monthsWorked = currentDate - startDate;
    // console.log(currentDate);
    // console.log(monthsWorked);

    database.ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,
        // nextTrain: nextTrain,
        // tMinutesTillTrain: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    return false;

})

database.ref().on("child_added", function(childSnapshot){


    $(".added-train").append("<tr>+<td>"+childSnapshot.val().train+"<td>"+childSnapshot.val().destination+"<td>"+childSnapshot.val().frequency+"<td>"+nextTrain+"<td>"+tMinutesTillTrain
    )





})

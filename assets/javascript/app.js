$(document).ready(function() {
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
    // Store user input in firebase
    $("#add-train").on("click", function() {
        var train = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var time = $("#time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        database.ref().push({
            train: train,
            destination: destination,
            time: time,
            frequency: frequency,
        })
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
        // prevent page from refreshing when user hits enter
        return false;
    });
    // when user input is added to Firebase, calculate next arrival, minutes away and append the stored values to the page
    database.ref().on("child_added", function(childSnapshot) {
        // Format train start time format for calculations
        var cleanTime = moment((childSnapshot.val().time), "hh:mm").subtract(1, "years");
        // Calculate difference between current time and train start time
        var differenceTime = moment().diff(moment(cleanTime), "minutes");
        // Calculate remainder of difference between times divided by frequency
        var timeRemainder = differenceTime % (childSnapshot.val().frequency);
        // Calculate minutes until next train
        var minutesNextTrain = (childSnapshot.val().frequency) - timeRemainder;
        // calculate next train arrival time
        var nextArrival = moment().add(minutesNextTrain, "minutes");
        var nextArrivalClean = moment(nextArrival).format("hh:mm A");
        // Append stored values to the page
        $(".added-train").append("<tr>+<td>" + childSnapshot.val().train + "<td>" + childSnapshot.val().destination + "<td>" + childSnapshot.val().frequency + "<td>" + nextArrivalClean + "<td>" + minutesNextTrain);
    });
});
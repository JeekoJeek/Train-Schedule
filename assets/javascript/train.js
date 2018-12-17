$(document).ready(function () {
    var database = firebase.database();

    //captures current Time
    var currentTime=moment();
    console.log(currentTime);
    //canverted to Military time
    var convertedCurrent=currentTime.format("HHmm")
    console.log(convertedCurrent);

    

    $("#submit").on("click", function (event) {
        event.preventDefault();
        //empties div before replacing with new values
        $("tbody").empty();
        //captures input values
        var newTrain = $("#train-name-input").val();
        var destination = $("#destination-input").val();
        var first = $("#first-train-input").val();
        var frequency = $("#frequency-input").val();
        //difference between current time and first train
        var nextTrain= convertedCurrent-first;
        // total minutes between trains divided by frequency resulting in the remainder
        var modulous=nextTrain%frequency;
        //frequency minus the remainder gives time until next train
        var minRemaining=frequency-modulous;
        //logging variables to make sure they are correct
        console.log(newTrain);
        console.log(destination);
        console.log(first);
        console.log(frequency);
        console.log(nextTrain)
        console.log(modulous);
        console.log(minRemaining);
        //push data to firebase
        database.ref().push({
            train: newTrain,
            destination: destination,
            departure: first,
            frequency: frequency,
            minRemaining: minRemaining,
        })
        $("tbody").empty();

        database.ref().on("child_added", function (snap) {
            //create a new row
            var newRow = $("<tr>")
            //created data variables for columns within the table
            var trainName = $("<td>");
            var newDestination = $("<td>");
            var newDeparture = $("<td>");
            var newFrequency = $("<td>")
            var newNext = $("<td>");

            //give the new columns values
            trainName.text(snap.val().train);
            newDestination.text(snap.val().destination);
            newDeparture.text(snap.val().departure);
            newFrequency.text(snap.val().frequency);
            newNext.text(snap.val().minRemaining);

            //appending the columns to the new row
            newRow.append(trainName);
            newRow.append(newDestination);
            newRow.append(newDeparture);
            newRow.append(newFrequency+ "minutes");
            newRow.append(newNext + "minutes");

            //append the new row to the table body
            $("tbody").append(newRow);

        })

    })
    // database.ref().on("value", function(snapshot){
    //     var newRow = $("<tr>")

    //     var trainName = $("<td>");
    //     var newDestination = $("<td>");
    //     var newDeparture = $("<td>");
    //     var newFrequency = $("<td>")
    //     var newNext = $("<td>");

    //     trainName.text(snapshot.val().train);
    //     console.log(trainName);
    //     newRow.append(trainName);

    //     $("tbody").append(newRow);
    // })
})
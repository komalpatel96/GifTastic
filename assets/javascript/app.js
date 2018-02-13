$(document).ready(function() {

  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "salamander", "frog"
  ];

// function to make buttons and add to page, arguments 
  function newButtons (newArray, newClass, buttonArea) {
    $(buttonArea).empty();

    for (var i = 0; i <newArray.length; i++) {
      var buttons = $("<button>");
      buttons.addClass(newClass);
      buttons.attr("data-type", newArray[i]);
      buttons.text(newArray[i]);
      $(buttonArea).append(buttons);
    }

  }

  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var animal = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=449506dd7b5248e8b5a05d0f08c1a639&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // var anotherDiv = $("<div>");
      // var h3 = $("<h3>");
      // anotherDiv.append(h3);
      // $("#scroll").append(anotherDiv);
      // h3.text("Click on the image to play the gif");
  
      var gifResults = response.data;

      for (var i = 0; i < gifResults.length; i++) {
        var animalDiv = $("<div class= \"animalItem\">");

        var rating = gifResults[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = gifResults[i].images.fixed_height.url;
        var still = gifResults[i].images.fixed_height_still.url;

        var animalGif = $("<img>");
        animalGif.attr("src", still);
        animalGif.attr("data-still", still);
        animalGif.attr("data-animate", animated);
        animalGif.attr("data-state", "still");
        animalGif.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalGif);

        $("#animals").prepend(animalDiv);
      }
    });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    newButtons(animals, "animal-button", "#animal-buttons");

  });

  newButtons(animals, "animal-button", "#animal-buttons");
});


    var zooAnimals = ["Elephant", "Giraffe", "Koala Bear", "Kangaroo", "Monkey", "Otter", "Penguin", "Panda Bear", "Poloar Bear", "Zebra"];

    function displayZooAnimals(e) {
 
     var animal = $(this).attr("data-animal");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=hzkwvcJvuyGWFSF2QwFfEoV9OuyDxj2f&limit=10";
     
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response){
         console.log(response)
         var results = response.data;
 
         for(var i = 0; i < results.length; i++) {
 
             var animalDiv = $("<div>");
             animalDiv.addClass("col-md-6 responsive");
     
             var stillImageURL = results[i].images.fixed_height_still.url;
             var animateImageURL = results[i].images.fixed_height.url;
     
             var imgURL = $("<img>").attr("src", stillImageURL);
             imgURL.attr("data-still", stillImageURL)
             imgURL.attr("data-animate", animateImageURL);
             imgURL.attr("data-state", "still");
             imgURL.addClass("gif");
     
     
             var ratingData = results[i].rating;
             var ratingDisplay = $("<p>").text("Rating: " + ratingData);
     
             animalDiv.append(imgURL, ratingDisplay);
             $("#animals-gifs").prepend(animalDiv);   
             }
         });
 };
 
 function renderButtons() {
     $("#animal-buttons").empty();
     for (var i = 0; i < zooAnimals.length; i++) {
         var a = $("<button>");
         a.addClass("animal-Btn btn btn-outline-success");
         a.attr("data-animal", zooAnimals[i]);
         a.text(zooAnimals[i]);
         $("#animal-buttons").append(a);
     };
 };
 
 $("#add-animals").on("click", function(event) {
         event.preventDefault();
         var animal = $("#animal-input").val().trim();
         zooAnimals.push(animal);
         renderButtons();
     });
 
 $(document).on("click",".gif", function() {
     var state = $(this).attr("data-state");
     if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
     } else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
     }
 });
 
 $(document).on("click", ".animal-Btn", displayZooAnimals);
 
 renderButtons();
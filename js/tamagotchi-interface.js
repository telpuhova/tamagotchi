import { Tamagotchi } from './../js/tamagotchi.js';

$(document).ready(function() {
  // $("#dead-img").hide();
  // $("#alive-img").hide();

  //gotta load a gif
  let apiKey = 'Bo412znNrvNwU4RQvdPCZrGs4pz3g59E';

  let normalId = 'S0saIQAGkcKYw';
  let eggId = 'GwdqEhLsBgyg8';
  let upsetId = 'hgjCZLrt7kYrm';
  let gameOverId = 'rcGuQhEyhQlgs';

  //add egg gif before the click
  $.ajax({
    // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
    url: `http://api.giphy.com/v1/gifs/${eggId}?api_key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      // $(".giphy-test").append(response.data.images.original.url);

      $(".giphy").append(`<img src='${response.data.images.original.url}' alt='egg gif from giphy api'>`);
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });


  //create new life button CLICK
  $("#start").click(function() {

    //add a normal alive creature gif
    $.ajax({
      // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
      url: `http://api.giphy.com/v1/gifs/${normalId}?api_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {

        // $("#egg").remove();
        $(".giphy").empty();
        $(".giphy").append(`<img src='${response.data.images.original.url}' alt='normal gif from giphy api'>`);
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });


    /*
    $.ajax({
      // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
      url: `http://api.giphy.com/v1/gifs/search?q=tamagotchi&api_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        // $('.api-response-test').append(`${response.data}`);

        // $('.api-response-test').append(`<img src='${response.data.images.fixed_height.url}' alt='gif from giphy'>`);
        // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);

        let objects = response.data;
        for (let i=0; i<objects.length; i++) {
          // $('.api-response-test').append(`<img src='${objects[i].images.original.url}' alt='gif from giphy'>`);

          if ((objects[i].images.original.width = 129) && (objects[i].images.original.height == 65)){
          // if (objects[i].images.original.width == 129){
            $('.api-response-test').append(`<img src='${objects[i].images.original.url}' alt='gif from giphy'><br>`);
          }
          // if ((objects[i].images.original.width = 133) && (objects[i].images.original.height == 69)){
          // // if (objects[i].images.original.width == 129){
          //   $('.api-response-test').append(`<img src='${objects[i].images.original.url}' alt='gif from giphy'>`);
          // }
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });

*/


    // $("#dead-img").hide();
    // $("#alive-img").show();
    let pet = new Tamagotchi("sofi");
    $("#name").text(pet.getName());

    pet.start();
    let gameLoop = setInterval(function() {
      switch (pet.getLifeStage()) {
        case 0:
        $("#age").text("baby");
        break;
        case 1:
        $("#age").text("child");
        break;
        case 2:
        $("#age").text("teen");
        break;
        case 3:
        $("#age").text("adult");
        break;
      }

      $("#foodLevel").text("food: " + pet.getFoodLevel());
      $("#sleepLevel").text("sleep: " + pet.getSleepLevel());
      $("#attentionLevel").text("attention: " + pet.getAttentionLevel());
      $("#poorCarePoints").text("poor care points:\n" + pet.getPoorCarePoints());
      if (pet.timeToDie()){
        clearInterval(gameLoop);
        // $("#alive-img").hide();
        // $("#dead-img").show();
        $.ajax({
          // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
          url: `http://api.giphy.com/v1/gifs/${gameOverId}?api_key=${apiKey}`,
          type: 'GET',
          data: {
            format: 'json'
          },
          success: function(response) {
            console.log('game over');
            $(".giphy").empty();
            $(".giphy").append(`<img src='${response.data.images.original.url}' alt='normal gif from giphy api'>`);
          },
          error: function() {
            $('#errors').text("There was an error processing your request. Please try again.")
          }
        });
      }
      if (!pet.getFoodLevel() || !pet.getSleepLevel() || !pet.getAttentionLevel()) {
        $.ajax({
          // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
          url: `http://api.giphy.com/v1/gifs/${upsetId}?api_key=${apiKey}`,
          type: 'GET',
          data: {
            format: 'json'
          },
          success: function(response) {

            $(".giphy").empty();
            $(".giphy").append(`<img src='${response.data.images.original.url}' alt='normal gif from giphy api'>`);
          },
          error: function() {
            $('#errors').text("There was an error processing your request. Please try again.")
          }
        });
      }
    }, 1000);


    $("#feed").click(function() {
      pet.feed();
    });

    $("#play").click(function() {
      pet.play();
    });

    $("#sleep").click(function() {
      pet.sleep();
    });

  });


})

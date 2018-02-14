import { Tamagotchi } from './../js/tamagotchi.js';

$(document).ready(function() {

  //gotta load a gif
  let apiKey = 'Bo412znNrvNwU4RQvdPCZrGs4pz3g59E';

  let normalId = 'S0saIQAGkcKYw';
  let eggId = 'GwdqEhLsBgyg8';
  let upsetId = 'hgjCZLrt7kYrm';
  let gameOverId = 'rcGuQhEyhQlgs';

  let normalUrl = '';
  let eggUrl = '';
  let upsetUrl = '';
  let gameOverUrl = '';


  //add egg gif before the click
  $.ajax({
    // $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
    url: `http://api.giphy.com/v1/gifs/${eggId}?api_key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      $(".giphy").append(`<img src='${response.data.images.original.url}' alt='egg gif from giphy api'>`);
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });


  let pet = new Tamagotchi("sofi");

  //settings:
  $("#settings-name").val(pet.getName());
  $("#timeUnit").val(pet.timeUnit);
  $("#timeUnitsInADay").val(pet.timeUnitsInADay);
  $("#daysPerStage").val(pet.daysPerStage);
  $("#survivability").val(pet.survivability);
  $("#lifeExpectancy").val(pet.lifeExpectancy);


  $("#settings-icon").click(function() {
    $("#settings").toggle();
  });

  $("#settings-form").submit(function(event) {
    event.preventDefault();
    pet.name = $("#settings-name").val();
    pet.timeUnit = $("#timeUnit").val();
    pet.timeUnitsInADay = $("#timeUnitsInADay").val();
    pet.daysPerStage = $("#daysPerStage").val();
    pet.survivability = $("#survivability").val();
    pet.lifeExpectancy = $("#lifeExpectancy").val();
    $("#settings").toggle();
  });


  //create new life button CLICK------------------------------------------------
  $("#start").click(function() {

    $("#settings-btn").disabled = true;

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


    $("#name").text(`name: ${pet.getName()}`);

    //add a normal alive creature gif
    $.ajax({
      url: `http://api.giphy.com/v1/gifs/${normalId}?api_key=${apiKey}`,
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

    pet.start();
    let gameLoop = setInterval(function() {
      switch (pet.getLifeStage()) {
        case 0:
        $("#age").text(`age: ${"baby"}`);
        break;
        case 1:
        $("#age").text(`age: ${"child"}`);
        break;
        case 2:
        $("#age").text(`age: ${"teen"}`);
        break;
        case 3:
        $("#age").text(`age: ${"adult"}`);
        default:
        $("#age").text(`age: ${"adult"}`);
        break;
      }


      $('#food').prop("style", `width: ${(pet.getFoodLevel() / 10)*100}%`);
      $('#attention').prop("style", `width: ${(pet.getAttentionLevel() / 10)*100}%`);
      $('#sleep').prop("style", `width: ${(pet.getSleepLevel() / 10)*100}%`);
      $('#health').prop("style", `width: ${((pet.getSurvivability() - pet.getPoorCarePoints()) / pet.getSurvivability())*100}%`);
      if (pet.timeToDie()){
        clearInterval(gameLoop);
        //add dead gif
        $.ajax({
          url: `http://api.giphy.com/v1/gifs/${gameOverId}?api_key=${apiKey}`,
          type: 'GET',
          data: {
            format: 'json'
          },
          success: function(response) {
            console.log('game over');
            $(".giphy").empty();
            $(".giphy").append(`<img src='${response.data.images.original.url}' alt='dead gif from giphy api'>`);
            $("#age").text("dead");
            console.log('its dead');
          },
          error: function() {
            $('#errors').text("There was an error processing your request. Please try again.")
          }
        });
      }
      if (!pet.getFoodLevel() || !pet.getSleepLevel() || !pet.getAttentionLevel()) {
        //add upset gif
        $.ajax({
          url: `http://api.giphy.com/v1/gifs/${upsetId}?api_key=${apiKey}`,
          type: 'GET',
          data: {
            format: 'json'
          },
          success: function(response) {
            $(".giphy").empty();
            $(".giphy").append(`<img src='${response.data.images.original.url}' alt='upset gif from giphy api'>`);
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

    $("#sleep-btn").click(function() {
      pet.sleep();
    })

  });


})

import { Tamagotchi } from './../js/tamagotchi.js';

$(document).ready(function() {
  $("#dead-img").hide();
  $("#alive-img").hide();
  $("#start").click(function() {
    $("#dead-img").hide();
    $("#alive-img").show();
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
        $("#alive-img").hide();
        $("#dead-img").show();
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

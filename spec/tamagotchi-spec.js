import { Tamagotchi } from './../js/tamagotchi.js';

describe('tamagotchi-spec', function() {

  let pet;

  beforeEach(function() {
    jasmine.clock().install();
    pet = new Tamagotchi('jim');
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should check the correct creation', function() {
    expect(pet.name).toEqual('jim');
    expect(pet.poorCarePoints).toEqual(0);
    expect(pet.lifeStage).toEqual(0);

    expect(pet.foodLevel).toEqual(10);
    expect(pet.sleepLevel).toEqual(10);
    expect(pet.attentionLevel).toEqual(10);
  });

  it('should check the gameloop. Hunger.', function() {
    pet.start();
    expect(pet.poorCarePoints).toEqual(0);
    expect(pet.foodLevel).toEqual(10);

    //gets hungrier by 1 point
    jasmine.clock().tick((pet.timeUnitsInADay * pet.timeUnit)/3);
    expect(pet.foodLevel).toEqual(9);

    //gets completely hungry, poorCarePoints start to increase
    jasmine.clock().tick(9 * (pet.timeUnitsInADay * pet.timeUnit)/3);
    expect(pet.foodLevel).toEqual(0);
    expect(pet.poorCarePoints).toEqual(3);

    //another time unit passes, with foodlevel = 0
    jasmine.clock().tick(pet.timeUnit);
    expect(pet.poorCarePoints).toEqual(6);
  })

  it('should check the gameloop. Attention.', function() {
    pet.start();
    expect(pet.poorCarePoints).toEqual(0);
    expect(pet.attentionLevel).toEqual(10);

    //to check attention, we need to keep him fed
    jasmine.clock().tick(6 * ((pet.timeUnitsInADay * pet.timeUnit)/2));
    expect(pet.attentionLevel).toEqual(4);
    console.log(pet.foodLevel);//1
    pet.feed();
    console.log(pet.foodLevel);//10

    //now jim really needs attention, poorCarePoints start to increase
    jasmine.clock().tick(4 * ((pet.timeUnitsInADay * pet.timeUnit)/2));
    expect(pet.attentionLevel).toEqual(0);

    expect(pet.poorCarePoints).toEqual(1);
    //another time unit passes, with attentionLevel = 0
    jasmine.clock().tick(pet.timeUnit);
    expect(pet.poorCarePoints).toEqual(2);
  })

  it('should check the gameloop. Energy.', function() {
    pet.start();
    expect(pet.poorCarePoints).toEqual(0);
    expect(pet.sleepLevel).toEqual(10);

    //to check attention, we need to keep him fed
    jasmine.clock().tick(3 * pet.timeUnitsInADay * pet.timeUnit);
    console.log(pet.foodLevel);
    console.log(pet.foodLevel);
    pet.feed();
    pet.play();
    jasmine.clock().tick(3 * pet.timeUnitsInADay * pet.timeUnit);
    pet.feed();
    pet.play();
    jasmine.clock().tick(3 * pet.timeUnitsInADay * pet.timeUnit);
    pet.feed();
    pet.play();
    //now jim needs sleep, poorCarePoints start to increase
    jasmine.clock().tick(pet.timeUnitsInADay * pet.timeUnit);
    expect(pet.sleepLevel).toEqual(0);
    expect(pet.poorCarePoints).toEqual(2);

    //another time unit passes, with sleepLevel = 0
    jasmine.clock().tick(pet.timeUnit);
    expect(pet.poorCarePoints).toEqual(4);
    //another time unit passes, with sleepLevel = 0
    jasmine.clock().tick(pet.timeUnit);
    expect(pet.poorCarePoints).toEqual(6);
    //etc.

    pet.feed();
    pet.play();
    pet.rest();
    jasmine.clock().tick(pet.timeUnit);
    expect(pet.poorCarePoints).toEqual(6); //doesn't increment when everything is fine
  });

  it('should check the gameloop. Dying of general neglect.', function() {
    console.log('Dying of general neglect');
    console.log('--before--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    pet.setTimeUnit(10);
    pet.start();
    while(!pet.timeToDie()) {
      jasmine.clock().tick(pet.timeUnit);
    }

    console.log('--after--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    expect(pet.timeToDie()).toEqual(true);
    expect(pet.poorCarePoints >= pet.survivability).toEqual(true);
  });

  it('should check the gameloop. Dying of hunger.', function() {
    console.log('Dying of hunger');
    console.log('--before--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    pet.setTimeUnit(1);
    pet.start();
    while(!pet.timeToDie()) {
      jasmine.clock().tick(pet.timeUnit);
      pet.rest();
      pet.play();
    }

    console.log('--after--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    expect(pet.timeToDie()).toEqual(true);
    expect(pet.foodLevel).toEqual(0);
    expect(pet.poorCarePoints >= pet.survivability).toEqual(true);
  });

  it('should check the gameloop. Dying of lack of energy.', function() {
    console.log('Dying of lack of energy');
    console.log('--before--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    pet.setTimeUnit(1);
    pet.start();
    while(!pet.timeToDie()) {
      jasmine.clock().tick(pet.timeUnit);
      pet.feed();
      pet.play();
    }

    console.log('--after--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    expect(pet.timeToDie()).toEqual(true);
    expect(pet.sleepLevel).toEqual(0);
    expect(pet.poorCarePoints >= pet.survivability).toEqual(true);
  });

  it('should check the gameloop. Dying of loneliness and boredom.', function() {
    console.log('Dying of loneliness and boredom');
    console.log('--before--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    pet.setTimeUnit(1);
    pet.start();
    while(!pet.timeToDie()) {
      jasmine.clock().tick(pet.timeUnit);
      pet.feed();
      pet.rest();
    }

    console.log('--after--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    expect(pet.timeToDie()).toEqual(true);
    expect(pet.attentionLevel).toEqual(0);
    expect(pet.poorCarePoints >= pet.survivability).toEqual(true);
  });

  it('should check the gameloop. Dying of old age.', function() {
    console.log('Dying of old age');
    console.log('--before--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    pet.setTimeUnit(1);
    pet.start();
    while(!pet.timeToDie()) {
      jasmine.clock().tick(pet.timeUnit);
      pet.feed();
      pet.rest();
      pet.play();
    }

    console.log('--after--');
    console.log('foodLevel = ' + pet.foodLevel);
    console.log('sleepLevel = ' + pet.sleepLevel);
    console.log('attentionLevel = ' + pet.attentionLevel);
    console.log('poorCarePoints = ' + pet.poorCarePoints);
    console.log('lifeStage = ' + pet.lifeStage);
    console.log('-----');

    expect(pet.timeToDie()).toEqual(true);
    expect(pet.lifeStage).toEqual(pet.lifeExpectancy);
  });
});

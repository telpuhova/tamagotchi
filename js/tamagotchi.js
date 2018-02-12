export class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.poorCarePoints = 0;
    this.lifeStage = 0;//0:Baby; 1:Child, 2:Teen, 3:Adult

    // this.familyGroup = "";
    this.foodLevel = 10;
    this.sleepLevel = 10;
    this.attentionLevel = 10;

    //settings:
    this.timeUnit = 1000;
    this.timeUnitsInADay = 6;
    this.daysPerStage = 3;
    this.survivability = 10;
    this.lifeExpectancy = 4;
  }

  // setFamilyGroup {
  //   familyGroupArray = [];
  //   this.familyGroup = familyGroupArray[Math.floor(Math.random() * 5)];
  // }

  settings(timeUnit, timeUnitsInADay, daysPerStage, survivability, lifeExpectancy) {
    this.timeUnit = timeUnit;
    this.timeUnitsInADay = timeUnitsInADay;
    this.daysPerStage = daysPerStage;
    this.survivability = survivability;
    this.lifeExpectancy = lifeExpectancy;
  }

  setTimeUnit(timeUnit) {
    this.timeUnit = timeUnit;
  }

  feed() {
    this.foodLevel = 10;
  }

  play() {
    this.attentionLevel = 10;
  }

  rest() {
    this.sleepLevel = 10;
  }

  start() {
    this.setAging();
    this.setHunger();
    this.setBoredom();
    this.setEnergyDecrease();
    this.setCareChecker();
  }

  setAging() {
    setInterval(() => {
      this.lifeStage++;
    }, this.daysPerStage * this.timeUnitsInADay * this.timeUnit);
  }

  setHunger() {
    setInterval(() => {
      if (this.foodLevel != 0) {
        this.foodLevel--;
      }
    }, (this.timeUnitsInADay * this.timeUnit)/3);
  }

  setBoredom() {
    setInterval(() => {
      if (this.attentionLevel != 0) {
        this.attentionLevel--;
      }
    }, (this.timeUnitsInADay * this.timeUnit)/2);
  }

  setEnergyDecrease() {
    let that = this;
    setInterval(function() {
      if (that.sleepLevel != 0) {
        that.sleepLevel--;
      }
    }, 6 * this.timeUnit);
  }

  //every unit of time it checks the levels and increments the poorCarePoints if something is wrong
  setCareChecker() {
    setInterval(() => {
      if (this.foodLevel === 0) {
        this.poorCarePoints += 3;
      }
      if (this.sleepLevel === 0) {
        this.poorCarePoints += 2;
      }
      if (this.attentionLevel === 0) {
        this.poorCarePoints += 1;
      }
    }, this.timeUnit);
  }

  timeToDie() {
    // if ((this.poorCarePoints >= this.survivability) || (this.lifeStage >= this.lifeExpectancy)) {
    if ((this.poorCarePoints >= this.survivability) || (this.lifeStage >= this.lifeExpectancy)){
      return true;
    }
    else {
      return false;
    }
  }

}

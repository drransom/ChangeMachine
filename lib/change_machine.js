(function() {
"use strict";

window.ChangeMachine = {};
var ChM = ChangeMachine;

var DENOMINATIONS = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
var DESCRIPTIONS = {
  10000: "one hundred dollar bill",
  2000: "twenty dollar bill",
  1000: "ten dollar bill",
  500: "five dollar bill",
  100: "one dollar bill",
  25: "quarter",
  10: "dime",
  5: "nickel",
  1: "penny"
};

ChM.pluralizeMoney = function (str) {
  var words = str.split(' ');
  var last = words[words.length -1];
  words[words.length-1] = ((last === "penny") ? "pennies" : last + "s");
  return words.join(" ");
};

ChM.calculateChange = function(str) {
  var money = ChM.stringToMoney(str);
  var change = [];
  var divisor, remainder;
  DENOMINATIONS.forEach(function(denomination) {
    divisor = Math.floor(money / denomination);
    remainder = money % denomination;
    money = remainder;
    change.push(divisor);
  });
  return change;
};

ChM.stringToMoney = function(str) {
  var money = parseFloat(str.replace(',',''))*100;
  if (money != Math.floor(money)) {
    cosole.log("not a valid amount of money");
  }
  return money;
};

})();

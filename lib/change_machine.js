(function() {
"use strict";

window.ChangeMachine = {};
var ChM = ChangeMachine;

ChM.DENOMINATIONS = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
ChM.MONEY_DESCRIPTIONS = {
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

ChM.Machine = function(el) {
  this.el = el;
  var inputArea = document.getElementById('change-machine-input');
  this.inputArea = new ChM.InputArea(inputArea, this);
  var displayArea = document.getElementById('change-machine-output');
  this.displayArea = new ChM.DisplayArea(displayArea, this);
};

var Machine = ChM.Machine;

Machine.prototype.start = function() {
  this.inputArea.start();
};

Machine.prototype.calculateAndDisplayOutput = function(digitString) {
  var change = ChM.calculateChange(digitString);
  this.displayArea.displayChange(digitString, change);
};

ChM.pluralizeMoney = function (str) {
  var words = str.split(' ');
  var last = words[words.length -1];
  words[words.length-1] = ((last === "penny") ? "pennies" : last + "s");
  return words.join(" ");
};

ChM.calculateChange = function(moneyStr) {
  var moneyInt, divisor, remainder, change = {};
  if (parseInt(moneyStr) === 0 || !moneyStr) {
    return false;
  } else {
    ChM.DENOMINATIONS.forEach(function(denomination) {
      if (denomination === 10000) {
        change[denomination] = ChM.findHundreds(moneyStr);
        moneyInt = parseInt(moneyStr.substring(moneyStr.length -4));
      } else {
        divisor = Math.floor(moneyInt / denomination);
        change[denomination] = divisor;
        moneyInt = moneyInt % denomination;
      }
    });
  return change;
  }
};

ChM.findHundreds = function (digits) {
  return digits.substring(0, digits.length - 4);
};

ChM.convertToStandardNumberFormat = function(str) {
  if (parseInt(str) === 0) {
    return "0.00";
  } else {
    var pennies = str.slice(str.length -2);
    var dollars = str.substring(0, str.length -2);
    return "" + ChM.parseIntegerString(dollars) + "." + pennies;
  }
};

ChM.parseIntegerString = function(string) {
  if (string.length <= 3) {
    return string;
  } else {
    return ChM.parseIntegerString(string.substring(0, string.length -3)) + "," +
           string.substring(string.length -3, string.length);
  }
};

//assumes int < 100
ChM.parsePennies = function(int) {
  if (int < 10) {
    return ".0" + int.toString();
  } else  {
    return "." + int.toString();
  }
};

ChM.removeLeadingZeroes = function (digits) {
  for (var i = 0; i < digits.length - 3; i++) {
    if (digits[i] != '0') {
      break;
    }
  }
  return digits.substring(i, digits.length);
};

})();

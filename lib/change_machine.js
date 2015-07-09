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

ChM.pluralizeMoney = function (str) {
  var words = str.split(' ');
  var last = words[words.length -1];
  words[words.length-1] = ((last === "penny") ? "pennies" : last + "s");
  return words.join(" ");
};

ChM.calculateChange = function(moneyStr) {
  var moneyInt, divisor, remainder, change = {};
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
};

ChM.findHundreds = function (digits) {
  return (digits.length < 5 ? "" : digits.substring(0, digits.length-3));
};

ChM.stringToMoney = function(str) {
  var money = str.replace(',','').replace('.','');
  if (money != Math.floor(money)) {
    cosole.log("not a valid amount of money");
  } if (money < 0) {
    console.log("you can't have negative money");
  }
  return money;
};

ChM.intToMoneyString = function(int) {
  if (int === 0) {
    return "0.00";
  } else if (int < 100) {
    return "0" + ChM.parsePennies(int);
  } else {
    var string = int.toString();
    var pennies = string.slice(string.length -2);
    var dollars = string.substring(0, string.length -2);
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

ChM.intToString = function(int) {
  return ChM.parseIntegerString(int.toString());
};

//assumes int < 100
ChM.parsePennies = function(int) {
  if (int < 10) {
    return ".0" + int.toString();
  } else  {
    return "." + int.toString();
  }
};

ChM.parseThousand = function(money) {
  if (money > 10000000) {
    return [money % 1000, money.toString().slice(3) + ","];
  } else if (money > 0) {
  }
};

ChM.digitsToDollars = function (digits) {
  digits = ChM.removeLeadingZeroes(digits);
  switch (digits.length) {
    case 0:
      return "$0.00";
    case 1:
      return "$0.0" + digits;
    case 2:
      return "$0." + digits;
    case 3:
      return digits[0] + "." + digits.substring(1, 3);
    default:
      return "$" + ChM.parseIntegerString(digits.substring(0, digits.length -2)) +
             "." + digits.substring(digits.length -2, digits.length);
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

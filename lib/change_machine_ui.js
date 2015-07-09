(function() {
"use strict";

window.ChangeMachine = window.ChangeMachine || {};
var ChM = ChangeMachine;

ChM.InputArea = function (el, changeMachine) {
  this.el = el;
  this.textInput = document.getElementById('change-machine-input-box');
  this.changeMachine = changeMachine;
};

var InputArea = ChM.InputArea;

InputArea.prototype.start = function() {
  var validateInput = this.validateInput(this.textInput);
  this.textInput.addEventListener('change', validateInput);
  var calculateAndDisplayOutput = this.calculateAndDisplayOutput();
  this.el.addEventListener('submit', calculateAndDisplayOutput);
};

InputArea.convertToValidMoney = function(string) {
  var digits = string.split(/\D/).join('');
  return ChM.convertToAccountingFormat(digits);
};

InputArea.prototype.validateInput = function (inputField) {
  return function(event) {
    var input = inputField.value;
    var index = input.indexOf('.');
    if (index < 0) {
      input += "00";
    } else if (index === input.length -2) {
      input += "0";
    } else if (index < input.length -2) {
      input = input.substring(0, index+3);
    }
    inputField.value = InputArea.convertToValidMoney(input);
  };
};

InputArea.prototype.calculateAndDisplayOutput = function() {
  var changeMachine = this.changeMachine;
  var textInput = this.textInput;
  return function(event) {
    event.preventDefault();
    var digits = textInput.value.split(/\D/).join('');
    changeMachine.calculateAndDisplayOutput(digits);
  };
};

ChM.DisplayArea = function(el) {
  this.el = el;
};

var DisplayArea = ChM.DisplayArea;

DisplayArea.prototype.displayChange = function(strNum, change) {
  this.el.innerHTML = "";
  if (ChM.anyChange(change)) {
    this.displayHeadine(strNum);
    this.appendResults(change);
  } else {
    this.displayNoChange();
  }

};

DisplayArea.prototype.displayHeadine = function(strNum) {
  var money = '$' + ChM.InputArea.convertToValidMoney(strNum);
  this.el.innerHTML += "<div>To make change for " + money + " you would need the\
    following:</div>";
};

DisplayArea.prototype.appendResults = function(change) {
  var li, numBillCoins, htmlString = "<ul>";
  ChM.DENOMINATIONS.forEach(function(denomination) {
    numBillCoins = ChM.parseIntegerString(change[denomination].toString());
    if (numBillCoins) {
      li = "<li>"+ numBillCoins + " ";
      if (numBillCoins === 1 || numBillCoins === "1") {
        li += ChM.MONEY_DESCRIPTIONS[denomination];
      } else {
        li += ChM.pluralizeMoney(ChM.MONEY_DESCRIPTIONS[denomination]);
      }
      li += "</li>";
      htmlString += li;
    }
  });
  htmlString += "</ul>";
  this.el.innerHTML += htmlString;
};

DisplayArea.prototype.displayNoChange = function() {
  this.el.innerHTML = "To make change for $0.00 requires no coins or bills.";
};



})();

// document.addEventListener("DOMContentLoaded", function() {
// $( document ).on("ready", function() {
// $( document ).ready(function() {
$(function() {

  $( "#tweet-text" ).on("keyup", function() {
    var inputLength = $(this).val().length;
    var counterOutput = $(".counter");
    var counterValue = 140 - inputLength;
    counterOutput.text(counterValue);
    if (counterValue < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});

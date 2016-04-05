function today() {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var march31 = new Date(2016, 2, 31, 0, 0, 0, 0); // months starts at 0
  var diff = today.valueOf() - march31.valueOf();
  var diffInDays = diff / 1000 / 60 / 60 / 24;
  return (31 + diffInDays) + " mars";
}

function setCurrentDate() {
  $('#current-date').html("Nous sommes le " + today() + ".");
}

$(document).ready(function() {
  setCurrentDate();
});

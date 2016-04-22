function parseEvents() {
  var JSONURL = "http://api.nuitdebout.be/nights/be";
  $.getJSON(JSONURL, function(data) {
    console.log('--- fetching json');
    buildEventsElements(data);
  });
}

function buildEventsElements(JSONData) {
  console.log('--- parsing data');
  var eventsContainer = $('#events-container');
  var eventsString = "";
  var cities = JSONData;

  // --- cities
  if (!isBlank(cities)) {
    for (i = 0, nbCities = cities.length; i < nbCities; i++) {
      var city = cities[i];
      eventsString += "<h2>" + city.Name + "</h2>\n";
      eventsString += "<section>\n";
      var events = city.Events;
      if (!isBlank(events)) {
        eventsString += "\t<ul>\n";
        for (j = 0, nbEvents = events.length; j < nbEvents; j++) {
          var event = events[j];
          var startDate = new Date(event.start_time);
          var fStartDate = startDate.getDate() + "/";
          fStartDate += startDate.getMonth() + 1 + "/";
          fStartDate += startDate.getFullYear() + " - ";
          fStartDate += startDate.getHours() + ":";
          if (startDate.getMinutes() < 10) {
            fStartDate += "0";
          }
          fStartDate += startDate.getMinutes();
          var URL = "https://facebook.com/events/" + event.id;

          eventsString += "\t\t<li>\n";
          eventsString += "\t\t\t<strong>" + fStartDate +  ":</strong>\n";
          eventsString += "\t\t\t<a href='" + URL + "'>" + event.name + "</a>\n";
          eventsString += "\t\t</li>\n";
        }
        eventsString += "\t</ul>\n";
      }
      eventsString += "</section>\n";
    }
    eventsContainer.html(eventsString);
  }

}

$(document).ready(function() {
  parseEvents();
});

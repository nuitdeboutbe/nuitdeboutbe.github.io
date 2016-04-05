function isBlank(property) {
  if (typeof(property) === 'undefined' || property.length == 0 || property === '') {
    return true;
  }

  return false;
}

function parseNuits() {
  var JSONURL = "http://www.nuitdebout.be/data/nuits.json";
  $.getJSON(JSONURL, function(data) {
    buildNuitsElements(data);
  });
}

function buildNuitsElements(JSONData) {
  var nuitsContainer = $('#nuits-container');
  var nuitsString = "";
  var countries = JSONData.countries;
  // -- countries
  if (!isBlank(countries)) {
    for (i = 0, nbCountries = countries.length; i < nbCountries; i++) {
      var country = countries[i];
      nuitsString += "<h2>" + country.name + "</h2>\n";
      nuitsString += "<section>\n";
      var cities = country.cities;
      // -- cities
      if (!isBlank(cities)) {
        nuitsString += "\t<ul>\n";
        for (j = 0, nbCities = cities.length; j < nbCities; j++) {
          var city = cities[j];
          nuitsString  += "\t\t<li>\n";
          nuitsString  += "\t\t\t" + city.name + "\n";
          var links = city.links;
          // -- links
          if (!isBlank(links)) {
            for (k = 0, nbLinks = links.length; k < nbLinks; k++) {
              var link = links[k];
              nuitsString += "\t\t\t";
              nuitsString += " - <a href='" + link.url + "'>" + link.name + "</a>\n";
            }
          }
          nuitsString += "\t\t</li>\n";
        }
      }
      nuitsString += "\t</ul>\n";
      nuitsString += "</section>\n";
    }
    nuitsContainer.html(nuitsString);
  }
}

$(document).ready(function() {
  parseNuits();
});

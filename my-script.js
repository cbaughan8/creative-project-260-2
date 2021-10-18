document.getElementById("search-word").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("word-value").value;
  if (value === ""){
    return;
  }
  console.log(value);
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json){
        console.log(json);
        let dResults = "";
        let tResults = "";
        let pResults = "";
        let audio = "";
 
        dResults += '<h3>Word: ' + json[0].word + '</h3>';
        tResults += '<h3>Word: ' + json[0].word + '</h3>';
        pResults += '<h3>Word: ' + json[0].word + '</h3>';



        pResults += '<div class="pro">Phonetic: ' + json[0].phonetic + '</div>';
        pResults += '<audio controls id="audio-container" class="audio-box">';
        pResults += '<source src=\"' + json[0].phonetics[0].audio + '\" type=\"audio/mp3\">';
        pResults += '</audio>';




        partsArray = json[0].meanings;
        partsArray.forEach(part => {
          defArray = json[0].meanings[0].definitions;
          defIndex = 0;
          
          dResults += '<div class="partOfSpeech">Part of Speech: ' + part.partOfSpeech + '</div>';
          tResults += '<div class="partOfSpeech">Part of Speech: ' + part.partOfSpeech + '</div>';
          dResults += '<h4 class="def"><u>Definitions: </u></h4>';
          tResults += '<h4 class="def"><u>Synonyms: </u></h4>';
          defArray.forEach(element => {
            dResults += '<div class="definitions">' + (defIndex + 1) + '. ' + element.definition + '</div>';
            ++defIndex;
  
            thesArray = element.synonyms;
            thesIndex = 0;
            tResults += '<h4 class="def">Definition #' + (defIndex) + '</h4>';
            thesArray.forEach(syn => {
              tResults += '<div class="synonyms">' + (thesIndex + 1) + '. ' + syn + '</div>';
              ++thesIndex;
            });
            if (thesIndex === 0) tResults += '<div class="synonyms">No synonyms found</div>';
          });
        });
        


    
        

        document.getElementById("dictionary").innerHTML = dResults;
        document.getElementById("thesaurus").innerHTML = tResults;
        document.getElementById("pronunciation").innerHTML = pResults;

    });
});


/*document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=cffcfe318a139298bde388416c5e2faf";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
          console.log(json);
        let results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        results += '<div>Latitude: ' + json.coord.lat + ' Longitude: ' + json.coord.lon + '</div>';
        for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        results += "Description: ";
        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
            results += ", "
        }
        results += "</p>";
        results += "<ul>";
        results += "<li>Feels like " + json.main.feels_like + "&deg;F</li>";
        results += "<li>Max Temp: " + json.main.temp_max + "&deg;F </li>";
        results += "<li>Min Temp: " + json.main.temp_min + "&deg;F </li>";
        results += "<li>Humidity: " + json.main.humidity + "% </li>";
        results += "<li>Wind: " + json.wind.speed + "mph </li>";
 

        results += "</ul>"
        document.getElementById("weatherResults").innerHTML = results;

        // Forcast
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=cffcfe318a139298bde388416c5e2faf";
    fetch(url2)
        .then(function(response) {
        return response.json();
        }).then(function(json) {
            console.log(json);
            let forecast = "";
            for (let i=0; i < json.list.length; i++) {
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                forecast += "<p>Description: " + json.list[i].weather[0].description + "</p>";
                forecast += '<div class="betweenResults"></div>';
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        });
      });
  });*/
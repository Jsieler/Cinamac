// // TMDB API Information
// var tmdbUrl = "https://api.themoviedb.org/3/";
// var tmdbKey = "&api_key=2c8ad8ff8fd528fe53a66ae9ef906e6b";
// var getTrending = "trending/movie/"
// var topRated = "movie/top_rated"
// var popFilms = "movie/popular"
// var showingFilms = "movie/now_playing"
// var popPeople = "person/popular"
// var genreSearch = "genre/movie/list"
// var multiSearch = "/search/multi?query="

// // movieGlu API Information
// var gluKey = "api-key=Dm6PtlSwNc4Vjt4WhaSTS1dXGqu9Vu48gz9TqwN0";
// var gluUrl = "https://api-gate2.movieglu.com/";

// // Global Variables/DOM elements
// var searchBar = $("#basic-search");
// var trendContentCont = $("#trending-content-cont");
// var topRatedCont = $("#rated-content-cont");
// var popFilmsCont = $("#pop-content-cont");
// var inTheatersCont = $("#showing-content-cont");
// var popPeopleCont = $("#pop-people-content-cont");
// var genreCont = $("#genre-content-cont");

// bing API Information
var bingKey = "api-key=Ai1mA8cMmJaHgOtb3KtZ66UcmJ_pr5LQjw50dKUeeDlDI4q0nE0rJKrrAdMzBAYh";

// GEOLOCATION ------ START
// var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}

// function success(pos) {
//     var crd = pos.coords;
//     var lat = crd.latitude;
//     var lon = crd.longitude;

//     console.log(`Your current position is`);
//     console.log(`Latitude: ${lat}`);
//     console.log(`Longitude: ${lon}`);
// }
// function error(err)
// {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);
// GEOLOCATION ------ END
fetch(
    'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=theaters&userLocation=&key=Ai1mA8cMmJaHgOtb3KtZ66UcmJ_pr5LQjw50dKUeeDlDI4q0nE0rJKrrAdMzBAYh'
  )
    // Convert the response to JSON
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response)
    });
// var theatersNearMe = function() {
//     locationTheaters = JSON.parse(localStorage.getItem("locationTheaters"));

//     if (!locationTheaters) {
//         fetch (
//             https://dev.virtualearth.net/REST/v1/LocalSearch/?query=theaters&userLocation=&key=Ai1mA8cMmJaHgOtb3KtZ66UcmJ_pr5LQjw50dKUeeDlDI4q0nE0rJKrrAdMzBAYh
//         )
//         .then (function(response){
//             if(response.ok) {
//                 return response.json();
//             }
//         })
//         .then (function(response){
//             saveTheatersNearMe(response);
//         })
//     }
// }
// var saveTheatersNearMe = function(response) {
//     localStorage.setItem("locationTheaters", JSON.stringify(response));
// }

// // Load or call TMDB Configuration Api
// var configurationApi = function() {
//     configJson = JSON.parse(localStorage.getItem("configJson"));

//     if (!configJson) {
//         fetch (
//             tmdbUrl + "configuration?" + tmdbKey
//         )
//         .then (function(response){
//             if(response.ok) {
//                 return response.json();
//             }
//         })
//         .then (function(response){
//             saveConfig(response);
//         })
//     }
// }

// // Save config api call
// var saveConfig = function(response) {
//     localStorage.setItem("configJson", JSON.stringify(response));
// }

// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
//   }
  
//   /* Set the width of the side navigation to 0 */
//   function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//   }

// --------------------------------------------------------------------------------------
// Search Bar Logic
// --------------------------------------------------------------------------------------
$(searchBar).on("submit", function(event){
    event.preventDefault();
    var search = $(this).children("#basic-search-input").val().trim();
    console.log(search);
    localStorage.setItem("search", JSON.stringify(search));
    window.location.href = "search.html";
})

// --------------------------------------------------------------------------------------
// HOME PAGE API LOGIC FOR DISPLAYING MOVIE INFO ON LOAD
// --------------------------------------------------------------------------------------

// Get Trending Movie window value (day || week)
var trendWindow = function(clickedBtn) {
    var startingVal = $("#trend-window").children(".active").attr("trend-id") + "?"
    if (!clickedBtn) {
        trendVal = startingVal;
    }
    else if (clickedBtn === "Daily") {
        trendVal = "day?"
    } 
    else if (clickedBtn === "Weekly") {
        trendVal = "week?"
    }

    if (trendVal === "day?") {
        $("#trending-title").text("Films Trending Today");
    } else {
        $("#trending-title").text("Films Trending this Week");
    }
    console.log("Current Interval (day vs week)",trendVal);

    getTrend(trendVal);
}

// On click of trending window buttons update api
$("#trend-window").on("click", function(target){
    var clickedBtn = $(target)[0].target.innerText
    trendWindow(clickedBtn);
})

// --------------------------------------------------------------------------------------
// // HOME PAGE API CALLS
// --------------------------------------------------------------------------------------

// Call trending films -- render with (renderTrend())
var getTrend = function(trendVal) {
    fetch(
        tmdbUrl + getTrending + trendVal + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderTrend(response)
    })
    .catch (function(error){
        alert(error);
    })
}

// Call Top Rated films -- render with (renderTrend())
var getTopRated = function() {
    fetch(
        tmdbUrl + topRated + "?region=US&adult=false&language=en-US" + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderTopRated(response)
    })
    .catch (function(error){
        alert(error);
    })
}

// Call Popular films -- render with (renderPop())
var getPopFilms = function() {
    fetch(
        tmdbUrl + popFilms + "?region=US&adult=false&language=en-US" + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderPopFilms(response)
    })
    .catch (function(error){
        alert(error);
    })
}

// Call In Theaters films -- render with (renderShowing())
var getShowing = function() {
    fetch(
        tmdbUrl + showingFilms + "?region=US&adult=false&language=en-US" + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderShowingFilms(response)
    })
    .catch (function(error){
        alert(error);
    })
}

// Call Popular People -- render with (renderPopPeople())
var getPopPeople = function() {
    fetch(
        tmdbUrl + popPeople + "?region=US&adult=false&language=en-US" + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderPopPeople(response)
    })
    .catch (function(error){
        alert(error);
    })
}

// Call Genres -- render with (renderPopPeople())
var getGenres = function() {
    fetch(
        tmdbUrl + genreSearch + "?" + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Unable to query correct items")
        }
    })
    .then (function(response){
        renderGenre(response)
    })
    .catch (function(error){
        alert(error);
    })
}

//--------------------------------------------------------------------------------------
// RENDER HOME PAGE API CALLS
//--------------------------------------------------------------------------------------

// Render trending films (getTrend())
var renderTrend = function(response) {
    trendContentCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        var postImg = $("<img></img>");
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        genCard.append(postImg);
        var imgOverlay = $("<div></div>");
            imgOverlay.addClass("card-img-overlay");
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");
        var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);
        trendContentCont.append(genCard);
    }
}

// Render top rated films (getTopRated())
var renderTopRated = function(response) {
    topRatedCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        var postImg = $("<img></img>");
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        genCard.append(postImg);
        var imgOverlay = $("<div></div>");
            imgOverlay.addClass("card-img-overlay");
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");
        var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);
        topRatedCont.append(genCard);
    }
}

// Render top rated films (getPopFilms())
var renderPopFilms = function(response) {
    popFilmsCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        var postImg = $("<img></img>");
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        genCard.append(postImg);
        var imgOverlay = $("<div></div>");
            imgOverlay.addClass("card-img-overlay");
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");;
        var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);;
        popFilmsCont.append(genCard);
    }
}

// Render top rated films (renderShowingFilms())
var renderShowingFilms = function(response) {
    inTheatersCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        var postImg = $("<img></img>");
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        genCard.append(postImg);
        var imgOverlay = $("<div></div>");
            imgOverlay.addClass("card-img-overlay");
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");;
        var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);;
        inTheatersCont.append(genCard);
    }
}

// Render top rated films (renderShowingFilms())
var renderPopPeople = function(response) {
    popPeopleCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        var postImg = $("<img></img>");
            postImg.attr("src", imgUrl + profilePicSiz + response.results[i].profile_path);
            postImg.addClass("card-img-top");
        genCard.append(postImg);
        var imgOverlay = $("<div></div>");
            imgOverlay.addClass("card-img-overlay");
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");;
        var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);;
        popPeopleCont.append(genCard);
    }
}

// Render genres (renderShowingFilms())
var renderGenre = function(response) {
    genreCont.html("");
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 w-25");
            genCard.css("width", "10rem");
        // var postImg = $("<img></img>");
        //     postImg.attr("src", imgUrl + profilePicSiz + response.results[i].profile_path);
        //     postImg.addClass("card-img-top");
        // genCard.append(postImg);
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");;
        var movTitle = $("<h5></h5>");
            movTitle.text(response.genres[i].name);
            movTitle.attr("genre-id", response.genres[i].id);
            movTitle.addClass("card-title w-100");
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(cardBody);;
        genreCont.append(genCard);
    }
}

// configurationApi();
// theatersNearMe();

// var imgUrl = configJson.images.base_url;
// var postSizCust = "w220_and_h330_face"
// var postSize185 = configJson.images.poster_sizes[2];
// var postSize342 = configJson.images.poster_sizes[3];
// var postSize500 = configJson.images.poster_sizes[4];
// var profilePicSiz = "w235_and_h235_face"

trendWindow();
getTopRated();
getPopFilms();
getShowing();
getPopPeople();
getGenres();
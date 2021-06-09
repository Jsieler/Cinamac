// TMDB API Information
var tmdbUrl = "https://api.themoviedb.org/3/";
var tmdbKey = "&api_key=2c8ad8ff8fd528fe53a66ae9ef906e6b";
var getTrending = "trending/"
var topRated = "movie/top_rated"
var popFilms = "movie/popular"
var showingFilms = "movie/now_playing"
var popPeople = "person/popular"
var genreSearch = "genre/movie/list"
var popTvShows = "tv/popular"
var multiSearch = "search/multi?query="

// movieGlu API Information
var gluKey = "api-key=Dm6PtlSwNc4Vjt4WhaSTS1dXGqu9Vu48gz9TqwN0";
var gluUrl = "https://api-gate2.movieglu.com/";

// Global Variables/DOM elements
var searchBar = $("#basic-search");
var trendContentCont = $("#trending-content-cont");
var inTheatersCont = $("#showing-content-cont");
var popPeopleCont = $("#pop-people-content-cont");
var genreCont = $("#genre-content-cont");
var popTVCont = $("#tv-content-cont");
var loadMoreBtn = $("#load-more");
var cardDiv = $("#gen-card");

// --------------------------------------------------------------------------------------
// Get Configuration Api, save to localStorage
// --------------------------------------------------------------------------------------
// Load or call TMDB Configuration Api
var configurationApi = function() {
    configJson = JSON.parse(localStorage.getItem("configJson"));

    if (!configJson) {
        fetch (
            tmdbUrl + "configuration?" + tmdbKey
        )
        .then (function(response){
            if(response.ok) {
                return response.json();
            }
        })
        .then (function(response){
            saveConfig(response);
        })
    }
}

// Save config api call
var saveConfig = function(response) {
    localStorage.setItem("configJson", JSON.stringify(response));
}

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

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

// --------------------------------------------------------------------------------------
// Global Card Rendering Functions
// --------------------------------------------------------------------------------------
// Render movie cards from api calls. This function limits the list to 10
var renderMasterShort = function(response, contentContainer) {
    for (var i = 0; i < 10; i++){
        var genCard = $("<div></div>");
            genCard.addClass("card bg-dark text-light film-card mx-3 my-2 cus-card-width");
            genCard.attr("id","gen-card-i");
        var postImg = $("<img></img>");
        genCard.append(postImg);
        var cardBody = $("<div></div>");
            cardBody.addClass("card-body");
        if(response.results[i].media_type === "movie") {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type",response.results[i].media_type);
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }
        else if (response.results[i].media_type === "tv" || response.results[i].first_air_date) {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","tv");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }  
        else if (response.results[i].gender > -1){
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","person");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].profile_path);
            postImg.addClass("card-img-top");
        } 
        else {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","in-theaters");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }
        if (i > 3) {
            genCard.addClass("media-hide");
        }
        cardBody.append(movTitle);
        genCard.append(postImg);
        genCard.append(cardBody);
        contentContainer.append(genCard);
    }
}

// Render movie cards from api calls. This function will load the entire list. 
var renderMasterLong = function(response, contentContainer){
    for (var i = 0; i < response.results.length; i++) {
        var genCard = $("<div></div>");
        genCard.addClass("card bg-dark text-light mx-3 my-2 w-25 cus-card-width");
        genCard.attr("id","gen-card-i");
        var postImg = $("<img></img>");
        var cardBody = $("<div></div>");
        cardBody.addClass("card-body");
        // Specific attributes and styling for MOVIES
        if(response.results[i].media_type === "movie") {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type",response.results[i].media_type);
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }
        // Specific attributes and styling for TV SHOWS
        else if (response.results[i].media_type === "tv" || response.results[i].first_air_date) {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","tv");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }  
        // Specific attributes and styling for PEOPLE
        else if (response.results[i].gender > -1){
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","person");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].profile_path);
            postImg.addClass("card-img-top");
        } 
        // Specific attributes and styling for NOW SHOWING IN THEATER
        else {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
            genCard.attr("content-type","in-theaters");
            genCard.attr("content-id",response.results[i].id);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }
        cardBody.append(movTitle);
        genCard.append(postImg);
        genCard.append(cardBody);
        contentContainer.append(genCard);
    }
}


// --------------------------------------------------------------------------------------
// Content Modal Logic --- 1. Click Content Card Event Listener 2. Api Query 3. Render Content Modal
// --------------------------------------------------------------------------------------
// On click event for content cards --- starts modal creation process for selected card
$(".content-cont").on("click", function(event){
    var clickedItem = event.target.localName
    var cardDiv = event.target.classList[0]
    if (clickedItem === "h5" || clickedItem === "img" || cardDiv === "card-body") {
        $("#contentModal").modal("show")
        if(clickedItem === "h5") {
            var clickedType = event.target.parentNode.parentNode.attributes[2].nodeValue;
            var clickedId = event.target.parentNode.parentNode.attributes[3].nodeValue;
        } else {
            var clickedType = event.target.parentNode.attributes[2].nodeValue;
            var clickedId = event.target.parentNode.attributes[3].nodeValue;
        }
        console.log("Type: ", clickedType, "ID: ", clickedId);
        
    }
    // cardModal();
    cardApiCall(clickedType, clickedId);
})

var cardApiCall = function (type, id) {
    if (type === "movie" || type === "in-theaters") {
        fetch (
            tmdbUrl + "movie/" + id + "?" + tmdbKey
        )
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
        })
        .then (function(response){
            renderModal(response, type);
        })
    } else if (type === "tv") {
        fetch (
            tmdbUrl + "tv/" + id + "?" + tmdbKey
        )
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
        })
        .then (function(response){
            renderModal(response, type);
        })
    }
    else if (type === "person") {
        fetch (
            tmdbUrl + "person/" + id + "?" + tmdbKey
        )
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
        })
        .then (function(response){
            renderModal(response, type);
        })
    }
}

var renderModal = function(response, type) {
    console.log(response);
    var modalContentDiv = $("#contentModal");
    var modalContentTitle = $(".modal-title");
    var modalContentImg = $("#modal-content-img"); 
    var modalContentAside = $("#content-modal-aside")
    var modalContentSection = $("#content-modal-section")
    var modalSectionTop = $("#modal-section-top");
    var modalSectionCenter = $("#modal-section-middle");
    var modalSecCenLeft = $("#modal-middle-left");
    var modalSecCenRight = $("#modal-middle-right");
    var modalSectionBottom = $("#modal-section-bottom");
    // Reset Modal
    modalContentImg.attr("src", "")
    modalSectionTop.html("");
    modalSecCenLeft.html("");
    modalSecCenRight.html("");
    modalSectionBottom.html("");

    // Specific attributes and styling for MOVIES
    if(type === "movie" || type === "in-theaters") {
        modalContentTitle.text(response.title);
        modalContentImg.attr("src", imgUrl + postSizCust + response.poster_path)
        modalContentImg.addClass("w-100");
        var descriptionHeader = $("<h6></h6>");
            descriptionHeader.text("Description:");
        var descriptionText = $("<p></p>");
            descriptionText.text(response.overview);
        var releaseDateHeader = $("<h6></h6>");
            releaseDateHeader.text("Release Date:");
        var releaseDateTxt = $("<p></p>");
            releaseDateTxt.text(formatDate(response.release_date));
        var runtimeHeader = $("<h6></h6>");
            runtimeHeader.text("Runtime:");
        var runtimeTxt = $("<p></p>");
            runtimeTxt.text(response.runtime + " mins");
        var budgetHeader = $("<h6></h6>");
            budgetHeader.text("Budget:");
        var budgetDateTxt = $("<p></p>");
            budgetDateTxt.text("$" + numberWithCommas(response.budget));
        var revenueHeader = $("<h6></h6>");
            revenueHeader.text("Revenue:");
        var revenueTxt = $("<p></p>");
            revenueTxt.text("$" + numberWithCommas(response.revenue));
            
        modalSectionTop.append(descriptionHeader, descriptionText);
        modalSecCenLeft.append(releaseDateHeader, releaseDateTxt, runtimeHeader, runtimeTxt);
        modalSecCenRight.append(budgetHeader, budgetDateTxt, revenueHeader, revenueTxt);
    }
    if(type === "tv") {
        modalContentTitle.text(response.name);
        modalContentImg.attr("src", imgUrl + postSizCust + response.poster_path)
        modalContentImg.addClass("w-100");
        var descriptionHeader = $("<h6></h6>");
            descriptionHeader.text("Description:");
        var descriptionText = $("<p></p>");
            descriptionText.text(response.overview);
        var producerHeader = $("<h6></h6>");
            producerHeader.text("Network:");
        var producerTxt = $("<p></p>");
            producerTxt.text(response.networks[(response.networks.length - 1)].name);
        var firstAiredHeader = $("<h6></h6>");
            firstAiredHeader.text("First Aired:");
        var firstAiredTxt = $("<p></p>");
            firstAiredTxt.text(formatDate(response.first_air_date));
        var mostRecentEpHeader = $("<h6></h6>");
            mostRecentEpHeader.text("Last Aired Episode:");
        var mostRecentEpTxt = $("<p></p>");
            mostRecentEpTxt.text(response.last_episode_to_air.name + " - " + formatDate(response.last_air_date));
        var onGoingHeader = $("<h6></h6>");
            onGoingHeader.text("Series On-Going?");
        var onGoingTxt = $("<p></p>");
        if(response.in_production){
            var seriesStatus = "Yes"
        } else {
            var seriesStatus = "No"
        }
            onGoingTxt.text(seriesStatus);
        var seasonsHeader = $("<h6></h6>");
            seasonsHeader.text("Seasons:");
        if (response.number_of_seasons > 1) {
            var seasonCnt = " seasons"
        } else {
            var seasonCnt = " season"
        }
        var seasonsTxt = $("<p></p>");
            seasonsTxt.text(response.number_of_seasons + seasonCnt);
        var episodesHeader = $("<h6></h6>");
            episodesHeader.text("Episodes:");
        if (response.number_of_episodes > 1) {
            var episodeCnt = " episodes"
        } else {
            var episodeCnt = " episode"
        }
        var episodesTxt = $("<p></p>");
            episodesTxt.text(response.number_of_episodes + episodeCnt);

        modalSectionTop.append(descriptionHeader, descriptionText); 
        modalSecCenLeft.append(producerHeader, producerTxt, firstAiredHeader, firstAiredTxt, mostRecentEpHeader, mostRecentEpTxt);   
        modalSecCenRight.append(onGoingHeader, onGoingTxt, seasonsHeader, seasonsTxt, episodesHeader, episodesTxt);
    }
}

// --------------------------------------------------------------------------------------
// Uncategorized Functions
// --------------------------------------------------------------------------------------
// Load More Button Logic - Changes Button state and text dependant on api available pages
var checkPages = function (response, pageCount) {
    if (pageCount === response.total_pages) {
        loadMoreBtn.attr("disabled", true);
        loadMoreBtn.text("End of the Line Bucko! No more results are available.")
    } else {
        loadMoreBtn.removeAttr("disabled");
        loadMoreBtn.text("Load More Results");
    }
}

// Converts Integers to comma separated strings
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
}
// --------------------------------------------------------------------------------------
// Function Calls on Load
// --------------------------------------------------------------------------------------
configurationApi();

// --------------------------------------------------------------------------------------
// Variables dependant on configurationApi
// --------------------------------------------------------------------------------------
var imgUrl = configJson.images.base_url;
var postSizCust = "w220_and_h330_face"
var postSize185 = configJson.images.poster_sizes[2];
var postSize342 = configJson.images.poster_sizes[3];
var postSize500 = configJson.images.poster_sizes[4];
var profilePicSiz = "w235_and_h235_face"
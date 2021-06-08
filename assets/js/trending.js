var contentType = $("main").attr("content-pg");
var windowTitle = $("#trend-window-title");
var typeTitle = $("#trend-media-title");
console.log(contentType)

// Default page for api pagination
var trendingPage = 1;

// Update Media Type Button Classes to display Active status
$("#media-type-group").on("click", function(target){
    var clickedBtn = $(target)[0].target;
    $(clickedBtn).addClass("active");
    $(clickedBtn).siblings().removeClass("active");
})

// Logic of Trending Option Aside Menu
var trendSettings = function() {
    $(trendContentCont).html("")
    trendingPage = 1;
    trendType = $("#media-type-group").children(".active").attr("trend-type");
    trendWindow = $("#trend-window").children(".active").attr("trend-id");
    console.log("Trend Media Type:",trendType,'\n',"Trend Media Window:",trendWindow);
    
    // Dynamic title to correspond with displayed content
    if (trendWindow === "day") {
        $(windowTitle).text("Daily");
    } else if (trendWindow === "week") {
        $(windowTitle).text("Weekly");
    }

    if (trendType === "all") {
        $(typeTitle).text("- All");
    }
    else if (trendType === "movie") {
        $(typeTitle).text("Movies");
    }
    else if (trendType === "tv") {
        $(typeTitle).text("TV Shows");
    }
    else if (trendType === "person") {
        $(typeTitle).text("People");
    }
    fetchTrending(trendType, trendWindow);

}

// Initial Trending on Page Load
var initTrending = function() {
    var trendType = "all";
    var trendWindow = "day";
    $(windowTitle).text("Daily");
    $(typeTitle).text("- All");
    console.log("Starting Trend Media Type:",trendType,'\n',"Starting Trend Media Window:",trendWindow);
    fetchTrending(trendType, trendWindow);
}

// Trending Api Call
var fetchTrending = function(a, b) {
    fetch (
        tmdbUrl + getTrending + a + "/" + b + "?page=" + trendingPage + tmdbKey
    )
    .then (function(response){
        if (response.ok) {
            return response.json();
        }
    }) 
    .then(function(response){
        renderTrending(response);
    })
}
    
// Rending of Trending Call
var renderTrending = function (response) {
    for (var i = 0; i < response.results.length; i++) {
        var genCard = $("<div></div>");
        genCard.addClass("card bg-dark text-light mx-3 my-2 w-25");
        // genCard.css("width", "10rem");
        var postImg = $("<img></img>");
        var cardBody = $("<div></div>");
        cardBody.addClass("card-body");
        if(response.results[i].media_type === "movie") {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].title);
            movTitle.addClass("card-title w-100");
            movTitle.attr("content-type",response.results[i].media_type);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }
        else if (response.results[i].media_type === "tv") {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            movTitle.attr("content-type",response.results[i].media_type);
            postImg.attr("src", imgUrl + postSizCust + response.results[i].poster_path);
            postImg.addClass("card-img-top");
        }  else {
            var movTitle = $("<h5></h5>");
            movTitle.text(response.results[i].name);
            movTitle.addClass("card-title w-100");
            movTitle.attr("content-type","person");
            postImg.attr("src", imgUrl + postSizCust + response.results[i].profile_path);
            postImg.addClass("card-img-top");
        }
        genCard.append(postImg);
        cardBody.append(movTitle);
        genCard.append(cardBody);
        trendContentCont.append(genCard);
    }
}

// Load more button logic
$("#load-more").on("click", function(event) {
    event.preventDefault();
    trendType = $("#media-type-group").children(".active").attr("trend-type");
    trendWindow = $("#trend-window").children(".active").attr("trend-id");
    trendingPage++;
    fetchTrending(trendType, trendWindow);
})

// Function Calls on load
initTrending();
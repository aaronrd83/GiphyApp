var topics = ["happy", "sad", "angry"]

function displayGiphy() {

    var topics = $(this).attr("data-name")
    console.log(topics)
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topics + '&api_key=hrEIgbr1ZLJhCTUrQv92LuirVHHrHldl&limit=10';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        var gifs = response.data

        console.log(gifs[2].images.original.url)

        for (i = 0; i < 10; i++) {
            //$(function () {
            //$("#giphy-view img").each(function () {
                var img = $("<img>");
                img.attr("src", gifs[i].images.fixed_height_still.url)
                img.attr("data-still", img.attr("src"));
                img.attr("data-animate", gifs[i].images.fixed_height.url);
                img.attr("data-state", 'still');
                img.addClass("gif");
               

            $("#giphy-view").prepend(img)
            //$("img").before("<p>Rating: " + gifs[i].rating)
        }
            
          
        })
};
$("body").on("click", ".gif", function() {
    console.log("click")
    var state = $(this).attr("data-state")

    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
});

renderButtons()


function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var topic = $("#giphy-input").val().trim();
    topics.push(topic);

    renderButtons();
})

$(document).on("click", ".topic-btn", displayGiphy);

renderButtons();
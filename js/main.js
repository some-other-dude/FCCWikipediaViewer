// MAIN.JS

function searchFieldZoomer() {
    e = $("#mySearch")
    $("#mySearch").toggleClass("my-search-open")
    $("#mySearch").toggleClass("my-search-closed")
    $("#mySearch").hasClass("my-search-open") ? $("#mySearch").attr("placeholder", "Search Wikipedia...") : $("#mySearch").attr("placeholder", "")
}

$("#mySearch").click(searchFieldZoomer)


function wikiSearch(q) {
    $.ajax({
        url: '//en.wikipedia.org/w/api.php',
        data: {
            action: 'query',
            list: 'search',
            srsearch: q,
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(x) {
            console.log('title', x.query.search);
        }
    })
}


$(document).keypress(function(e) {
    if (e.which == 13) {
        wikiSearch("Feynman")
    }
});
// $("#target").submit(wikiSearch($("#in-search").value))



function init() {

    //$("#in-search").attr("display", "visible")

}

init()

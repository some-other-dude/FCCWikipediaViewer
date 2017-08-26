function showResults(pages) {
    jQuery.each(pages, function(p) {
        if (this.hasOwnProperty("title")) {
            writeResultsContainerToDOM(this)
        }
    })
}

function showWikiPage(pageid) {

}

function writeResultsContainerToDOM(p) {
    let parent = $("#mainContainer")
    let title = `<h4>${p.title}</h4>`
    let snippet = `<p>${p.extract}<p>`
    let elementID = `page-${p.pageid}`
    let myHTML = `<div class="row results" id="${elementID}"><div class="col-sm-12">${title}${snippet}</div></div>`

    $("#mainContainer").append(myHTML)

    document.querySelector(`#page-${p.pageid}`).addEventListener('click', function(event) {
        goToWikipedia(p.pageid)
    });

    $(".results").animate({
        opacity: 1
    }, 400)
}

function goToWikipedia(pageid) {
    let url = `http://en.wikipedia.org/?curid=${pageid}`
    window.open(url, '_blank', 'location=yes,height=900,width=1600,scrollbars=yes,status=yes')
}

function wikiSearch(q) {
    q = encodeURIComponent(q)
    let wikipediaAPI = `http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${q}&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?`

    $.get({
            url: wikipediaAPI,
            dataType: 'json',
            success: function(data, status, jqXHR) {
                //console.log(data.query.pages);
                showResults(data.query.pages)
            }
        })
        .done(function(data) {

        })
        .fail(function(e) {
            console.log(e);
        })
        .always(function() {
            console.log("COMPLETE");
        })
}

document.onkeypress = function (e) {
    if (e.keyCode == 13) {

        $(".search-form").animate({
            paddingTop: "30px"
        },1000)

        window.setTimeout(function () {wikiSearch($("#my-search").val())},1000)
    }
}

$("#my-search").click(function () {
    let f = $("#my-search")
    if (f.css("width") == "40px") {
        //do open
        f.animate({
            width: "300px"}, 1000)
    } else {
        //do close
        f.animate({
            width: "40px"}, 1000)
            f.val("")
    }
})

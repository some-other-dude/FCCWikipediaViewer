function showResults(pages) {
    jQuery.each(pages, function (p) {
        if (this.hasOwnProperty("title")) {
            writeResultsContainerToDOM(this)
        }
    })
}

function writeResultsContainerToDOM(p) {
    let parent = $("#mainContainer")
    let title = `<h4>${p.title}</h4>`
    let snippet = `<p>${p.extract}<p>`
    let url = `<span class="hiddenURL">http://en.wikipedia.org/?curid=${p.pageid}</span>`
    let myHTML = `<div class="row results" id=><div class="col-sm-12">${title}${snippet}${url}</div></div>`

    $("#mainContainer").append(myHTML)
}

function wikiSearch(q) {
    q = encodeURIComponent(q)
    //let wikipediaAPI = `http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${q}&prop=extracts&format=json&callback=?`
    let wikipediaAPI = `http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${q}&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?`

    $.get({
        url: wikipediaAPI,
        dataType: 'json',
        success: function (data, status, jqXHR) {
            //console.log(data.query.pages);
            showResults(data.query.pages)
        }
    }
        )
        .done(function (data) {

        })
        .fail(function (e) {
            console.log(e);
        })
        .always(function () {
            console.log("COMPLETE");
        })
}

$("#btn-submit").click(function(){
    let s = $("#my-search").val()
    wikiSearch(s)
})

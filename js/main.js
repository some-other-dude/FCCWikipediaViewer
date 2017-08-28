function showResults(pages) {
    jQuery.each(pages, function(p) {
        if (this.hasOwnProperty("title")) {
            writeResultsContainerToDOM(this)
        }
    })
}

function writeResultsContainerToDOM(p) {
    let parent = $(".results-container")
    let title = `<h4>${p.title}</h4>`
    let snippet = `<p>${p.extract}<p>`
    let elementID = `page-${p.pageid}`
    let myHTML = `<div class="row results" id="${elementID}"><div class="col-sm-12">${title}${snippet}</div></div>`

    $(parent).append(myHTML)
    console.log("p: "+p.pageid);
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
                console.log(data.query.pages);
                console.log("wikiSearch() successful");
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

document.onkeypress = function(e) {
    if (e.keyCode == 13) {

        $(".search-mover").animate({
            paddingTop: "30px"
        }, 800)
        $("#instr-top").text("Reset")
        $("#instr-top").toggleClass("instr-top-reset")
        $("#instr-top").click(function functionName() {
            resetForm()
        })
        window.setTimeout(function() {
            wikiSearch($("#my-search").val())
        }, 800)
    }
}

function resetForm() {
    let rc = document.getElementById("results-container");

    $("#my-search").val("")
    rc.animate({
        opactiy: 0
    }, 400)

    while (rc.hasChildNodes()) {
        rc.removeChild(rc.lastChild);
    }

    $("#instr-top").text("Click circle to search Wikipedia")
    window.setTimeout(function() {
        $(".search-mover").animate({
            paddingTop: "300px"
        }, 800)
    }, 400)
    $("#my-search").animate({
        width: "40px"
    }, 400)
}

$("#my-search").click(function() {
    let f = $("#my-search")
    if (f.css("width") == "40px") {
        //do open
        f.animate({
            width: "300px"
        }, 1000)
    } else {
        //do close
        f.animate({
            width: "40px"
        }, 1000)
        f.val("")
    }
})

$(window).on("load", function() {
    $(".search-mover").animate({
        opacity: 1
    }, 400)
})

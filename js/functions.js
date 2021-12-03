function formatNumberInd(num) {
    return num.toLocaleString('en-IN');
}
function formatNumberPer(num) {
    return parseFloat(num).toFixed(2) + "%";
}

$('body').on('click', '.stateRow', function () {
    $(this).siblings().toggle("fade").css("display","block")
    $(this).toggleClass("active");
});

// https://www.algolia.com/blog/engineering/how-to-implement-autocomplete-with-javascript-on-your-website/
// https://www.w3schools.com/howto/howto_js_filter_dropdown.asp

var search_terms = ['apple', 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12', "behat"];

function autocompleteMatch(input) {
    console.log(input);
    if (input == '') {
        return [];
    }
    var reg = new RegExp("^["+input+"]")
    console.log(reg);

    return search_terms.filter(function (term) {
        if (term.match(reg)) {
            return term;
        }
    });
}

autocompleteMatch("b")

function showResults(val) {
    res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    for (i = 0; i < terms.length; i++) {
        list += '<li><a href="' + terms[i] + '">' + terms[i] + '</a></li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}
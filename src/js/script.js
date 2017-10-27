require('../scss/style.scss');

var inputSearch = document.querySelector('.js-input-search');
var btnSearch = document.querySelector('.js-btn-search');
var booksSearchWrapper = document.querySelector('.books__section');

btnSearch.onclick = function (e) {
    e.preventDefault();
    deleteWrapper();
    console.log(inputSearch.value);
    searchBooks(inputSearch.value);
};

function deleteWrapper() {
    while(booksSearchWrapper.hasChildNodes()) {
        booksSearchWrapper.removeChild(booksSearchWrapper.firstChild);
    }
}

function searchBooks(valueSearch) {


    const requestURL = 'https://gwo.pl/booksApi/v1/search?query=' + valueSearch + '';
    const request = new XMLHttpRequest();

// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
//
// request.onload = function() {
//     var superHeroes = request.response;
//     populateHeader(superHeroes);
//     showHeroes(superHeroes);
// };

    request.open('GET', requestURL);
    request.responseType = 'text'; // now we're getting a string!
    request.send();

    request.onload = function () {
        var superHeroesText = request.response; // get the string from the response
        var superHeroes = JSON.parse(superHeroesText); // convert it to an object
        showHeroes(superHeroes);

    };

    function showHeroes(jsonObj) {
        var books = jsonObj;
        var section = document.querySelector('section');
        var booksWrapper = document.createElement('div');
        booksWrapper.setAttribute("class", "books row");

        section.appendChild(booksWrapper);

        for (var i in books) {
            var book = document.createElement('article');
            book.setAttribute("class", "book col-md-4 col-sm-6");

            var title = document.createElement('h2');
            title.setAttribute("class", "book__title");
            title.textContent = books[i].title;

            var author = document.createElement('p');
            author.textContent = 'Author: ' + books[i].author;

            var isbn = document.createElement('p');
            isbn.textContent = 'ISBN: ' + books[i].isbn;

            var men = document.createElement('p');
            men.textContent = 'MEN: ' + books[i].men;

            var pages_count = document.createElement('p');
            pages_count.textContent = 'Pages Count: ' + books[i].pages_count;

            var subject = document.createElement('p');
            subject.textContent = 'Subject: ' + books[i].subject;

            var type = document.createElement('p');
            type.textContent = 'Type: ' + books[i].type;

            var cover = document.createElement('img');
            cover.setAttribute("src", books[i].cover);
            cover.setAttribute("class", "book__cover");

            var url = document.createElement('p');
            url.innerHTML = '<a href="' + books[i].url + '" class="btn btn-success">more</a>';

            var levels = document.createElement('div');
            levels.setAttribute("class", "book__levels");
            var levelsData = books[i].levels;
            for (var j in levelsData) {
                levels.textContent = '' + levelsData[j].school + ' / ' + levelsData[j].class;
            }

            book.appendChild(title);
            book.appendChild(levels);
            book.appendChild(cover);
            book.appendChild(author);
            book.appendChild(isbn);
            book.appendChild(men);
            book.appendChild(pages_count);
            book.appendChild(subject);
            book.appendChild(type);
            book.appendChild(url);
            booksWrapper.appendChild(book);
        }
    }
}

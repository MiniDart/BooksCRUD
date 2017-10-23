
var cxt={
    sort:null,
    author:null,
    title:null,
    isbn:null,
    yearFrom:null,
    yearTo:null
};

var page;
var arrIdBooks=[];
function fillCxt() {
    var authorVal=$("#author_input").val();
    var titleVal=$("#title_input").val();
    var isbnVal=$("#isbn_input").val();
    var yearFromVal=$("#year_start_input").val();
    var yearToVal=$("#year_end_input").val();
    cxt.sort=$("#sort_select option:selected").val();
    cxt.author=authorVal.length==0?null:authorVal;
    cxt.title=titleVal.length==0?null:titleVal;
    cxt.isbn=isbnVal.length==0?null:isbnVal;
    cxt.yearFrom=yearFromVal.length==0?null:yearFromVal;
    cxt.yearTo=yearToVal.length==0?null:yearToVal;
}


function getBooksId(callback) {
    fillCxt();
    $.get(home+"/app/rest/id-list",
        {
            param:JSON.stringify(cxt)
        },
        callback)
}


function getBooks(IdToRender,callback) {
    $.get(home+"/app/rest/books",
        {
            param:JSON.stringify(IdToRender)
        },
        callback);
}


function renderBooks(books) {
    for (var i=0;i<books.length;i++){
        var book=books[i];
        var bookDom=$("<div class='book_item_wrapper'>" +
            "<div class='book'>" +
            "<table>" +
            "<tr>" +
            "<td><p>Автор:</p>" +
            "<p class='text'>"+book.author+"</p></td>" +
            "<td><p>Название:</p>" +
            "<p class='text'>"+book.title+"</p></td>" +
            "<td><p>Год издания:</p>" +
            "<p class='text'>"+book.printYear+"</p></td></tr>" +
            "<tr><td colspan='2'>" +
            "<p>ISBN:</p>" +
            "<p class='text'>"+book.isbn+"</p></td>" +
            "<td><p>Статус:</p>" +
            "<p class='text'>"+(book.readAlready?"Прочитано":"Не прочитано")+"</p></td></tr>" +
            "<tr><td colspan='3'><p class='text'>"+book.description+"</p></td></tr></table>"+
            "</div></div>");
        var editBoxDom=$("<div class='edit_box'></div>");
        if (!book.readAlready) editBoxDom.append($("<div>Отметить как прочитано</div>")
            .on("click",function (e) {

            }));
        editBoxDom.append($("<div>Изменить</div>")
            .on("click",function (e) {

        }));
        editBoxDom.append($("<div>Удалить</div>")
            .on("click",function (e) {

            }));
        bookDom.append(editBoxDom);
        $(".list-wrapper").append(bookDom);
    }
}


function showBooks() {
    $(".list-wrapper").empty();
    var IdToRender=[];
    var end=page*10>arrIdBooks.length?arrIdBooks.length:page*10;
    for (var i=(page-1)*10;i<end;i++){
        IdToRender.push(arrIdBooks[i]);
    }
    getBooks(IdToRender,function (data) {
        renderBooks(data);
    });

}
function initialization() {
    page=1;
    $("#search_button").on("click",function () {
        getBooksId(function (data) {
            arrIdBooks=data;
            showBooks();
        });
    });
    getBooksId(function (data) {
        arrIdBooks=data;
        showBooks();
    });
}


$(document).ready(function ($) {
    initialization();
});
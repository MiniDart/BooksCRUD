
var cxt={
    sort:null,
    author:null,
    title:null,
    isbn:null,
    yearFrom:null,
    yearTo:null
};


function getBooksId(callback) {
   $.get(home+"/app/rest/id-list",
       {
           param:JSON.stringify(cxt)
       },
       callback)
}


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

function initialization() {
    $("#search_button").on("click",function () {
        fillCxt();
        getBooksId(function (data) {
            console.log(data);
        });
    });
}

$(document).ready(function ($) {
    initialization();
});
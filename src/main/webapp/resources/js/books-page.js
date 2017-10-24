
var cxt={
    sort:null,
    author:null,
    title:null,
    isbn:null,
    yearFrom:null,
    yearTo:null
};

var updateObj={
    id:null,
    title:null,
    description:null,
    isbn:null,
    printYear:null,
    readAlready:null,
    clear:function () {
        this.id=null;
        this.title=null;
        this.description=null;
        this.isbn=null;
        this.printYear=null;
        this.readAlready=null;
    }
};

var page;

var arrIdBooks=[];

function fillCxt() {
    var authorVal=$("#author_input").val();
    var titleVal=$("#title_input").val();
    var isbnVal=$("#isbn_input").val();
    var yearFromVal=$("#year_start_input").val();
    var yearToVal=$("#year_end_input").val();
    cxt.sort=$("#sort_select").val();
    cxt.author=authorVal.length==0?null:authorVal;
    cxt.title=titleVal.length==0?null:titleVal;
    cxt.isbn=isbnVal.length==0?null:isbnVal;
    cxt.yearFrom=yearFromVal.length==0?null:yearFromVal;
    cxt.yearTo=yearToVal.length==0?null:yearToVal;
}


function getBooksIdAndShow() {
    $.get(home+"/app/rest/id-list",
        {
            param:JSON.stringify(cxt)
        },
        function (data) {
            arrIdBooks=data;
            showBooks();
        })
}


function getBooksAndRender(data) {
    $.get(home+"/app/rest/books",
        {
            param:JSON.stringify(data)
        },
        function (data) {
            renderBooks(data);
        });
}


function putData(data,callback) {
    $.ajax({
        url:home+"/app/rest/books",
        type:"PUT",
        data:JSON.stringify(data),
        success:callback,
        contentType:"application/json"
    })
}


function renderBooks(books) {
    var listWrapper=$("<div class='list-wrapper'></div>");
    if (books.length==0) listWrapper.append($("<p>По вашему запросу ничего не найдено</p>"));
    else {
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
            if (!book.readAlready) editBoxDom.append($("<div data-id='"+book.id+"'>Отметить как прочитано</div>")
                .on("click",function (e) {
                    updateObj.id=$(this).attr("data-id");
                    updateObj.readAlready=true;
                    var thisElement=this;
                    putData(updateObj,function (data) {
                        console.log(data);
                        $(thisElement).remove();
                        updateObj.clear();
                    })
                }));
            editBoxDom.append($("<div>Изменить</div>")
                .on("click",function (e) {

                }));
            editBoxDom.append($("<div>Удалить</div>")
                .on("click",function (e) {

                }));
            bookDom.append(editBoxDom);
            listWrapper.append(bookDom);
        }
    }
    $(".top-list-wrapper").append(listWrapper);
}


function showBooks() {
    $(".top-list-wrapper").empty();
    if (arrIdBooks.length==0) {
        var t=[];
        renderBooks(t);
        showButtonsAndPage();
        return;
    }
    var IdToRender=[];
    var end=page*10>arrIdBooks.length?arrIdBooks.length:page*10;
    for (var i=(page-1)*10;i<end;i++){
        IdToRender.push(arrIdBooks[i]);
    }
    getBooksAndRender({
        idList:IdToRender,
        sort:cxt.sort
    });
    showButtonsAndPage();

}


function showButtonsAndPage() {
    var rightButton=$("#right_button");
    var leftButton=$("#left_button");
    var pageDom=$("#page");
    if (arrIdBooks.length==0||arrIdBooks.length<=10){
        rightButton.css("visibility","hidden");
        leftButton.css("visibility","hidden");
        pageDom.css("visibility","hidden");
        return;
    }
    pageDom.css("visibility","visible");
    pageDom.text(page);
    if (page<2){
        rightButton.css("visibility","visible");
        leftButton.css("visibility","hidden");
    }
    else if (page*10>=arrIdBooks.length){
        rightButton.css("visibility","hidden");
        leftButton.css("visibility","visible");
    }
    else {
        rightButton.css("visibility","visible");
        leftButton.css("visibility","visible");
    }
}


function initialization() {
    $("#search_button").on("click",function () {
        page=1;
        fillCxt();
        getBooksIdAndShow();
    });
    $("#left_button").on("click",function (e) {
        if (page>1) page--;
        showBooks();
    });
    $("#right_button").on("click",function (e) {
       if (page*10<arrIdBooks.length) page++;
       showBooks();
    });
    $("#sort_select").on("change",function (e) {
        page=1;
        cxt.sort=$(this).val();
        getBooksIdAndShow();
    });
    page=1;
    fillCxt();
    getBooksIdAndShow();
}


$(document).ready(function ($) {
    initialization();
});
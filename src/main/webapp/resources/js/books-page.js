
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


function addNewBook(data) {
    $.ajax({
        url:home+"/app/rest/books",
        type:"POST",
        data:JSON.stringify(data),
        success:function (data) {
            getBooksIdAndShow();
        },
        contentType:"application/json"
    })
}

function deleteBook(id) {
    $.ajax({
        url:home+"/app/rest/books/"+id,
        type:"DELETE",
        success:function (e) {
            getBooksIdAndShow();
        }
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
                "<p class='text imp'>"+book.author+"</p></td>" +
                "<td><p>Название:</p>" +
                "<p class='text imp'>"+book.title+"</p></td>" +
                "<td><p>Год издания:</p>" +
                "<p class='text'>"+book.printYear+"</p></td></tr>" +
                "<tr><td colspan='2'>" +
                "<p>ISBN:</p>" +
                "<p class='text'>"+book.isbn+"</p></td>" +
                "<td><p>Статус:</p>" +
                "<p class='text read'>"+(book.readAlready?"Прочитано":"Не прочитано")+"</p></td></tr>" +
                "<tr><td colspan='3'><p class='text'>"+book.description+"</p></td></tr></table>"+
                "</div></div>");
            var editBoxDom=$("<div class='edit_box'></div>");
            if (!book.readAlready) editBoxDom.append($("<div data-id='"+book.id+"'>Отметить как прочитано</div>")
                .on("click",function (e) {
                    updateObj.id=$(this).attr("data-id");
                    updateObj.readAlready=true;
                    var thisElement=this;
                    putData(updateObj,function (data) {
                        $(thisElement).parent().parent().find(".read").text("Прочитано");
                        $(thisElement).remove();
                        updateObj.clear();
                    })
                }));
            editBoxDom.append($("<div data-id='"+book.id+"'>Изменить</div>")
                .on("click",function (e) {
                    $("#edit_book_form").show();
                    updateObj.id=$(this).attr("data-id");
                }));
            editBoxDom.append($("<div data-id='"+book.id+"'>Удалить</div>")
                .on("click",function (e) {
                    if (!confirm("Are you sure?")) return;
                    deleteBook($(this).attr("data-id"));
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

function hideForm(formId) {
    var form=$("#"+formId);
    form.find("input").val("");
    form.find("textarea").val("");
    form.hide();

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
    $("#new_book_button").on("click",function (e) {
        $("#new_book_form").show();
    });
    $("#new_book_submit").on("click",function (e) {
       var newBook={};
       newBook.author=$("#new_author").val();
       newBook.title=$("#new_title").val();
       newBook.isbn=$("#new_isbn").val();
       newBook.printYear=$("#new_print_year").val();
       newBook.description=$("#new_description").val();
       for (var key in newBook){
           if (newBook[key].length==0){
               alert("Вы не зполнили поле "+key);
               return;
           }
       }
       addNewBook(newBook);
        hideForm("new_book_form");
    });
    $("#new_book_form .cancel").on("click",function (e) {
        hideForm("new_book_form");
    });


    $("#edit_book_submit").on("click",function (e) {
        var editTitle=$("#edit_title").val();
        var editIsbn=$("#edit_isbn").val();
        var editDescription=$("#edit_description").val();
        var editPrintYear=$("#edit_print_year").val();
        updateObj.title=editTitle.length==0?null:editTitle;
        updateObj.isbn=editIsbn.length==0?null:editIsbn;
        updateObj.printYear=editPrintYear.length==0?null:editPrintYear;
        updateObj.description=editDescription.length==0?null:editDescription;
        putData(updateObj,function (data) {
            updateObj.clear();
            getBooksIdAndShow();
        });
        hideForm("edit_book_form");
    });
    $("#edit_book_form .cancel").on("click",function (e) {
        hideForm("edit_book_form");
        updateObj.clear();
    });


    page=1;
    fillCxt();
    getBooksIdAndShow();
}


$(document).ready(function ($) {
    initialization();
});
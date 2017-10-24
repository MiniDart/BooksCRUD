<%--
  Created by IntelliJ IDEA.
  User: sergey
  Date: 19.10.17
  Time: 20:21
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:import url="header.jsp">
    <c:param name="headTitle" value="Book manager"/>
    <c:param name="headerTitle" value="Библиотека"/>
    <c:param name="cssLink" value="/resources/css/books-page.css"/>
    <c:param name="jsLink" value="/resources/js/books-page.js"/>
</c:import>
<div class="wrapper">
    <div class="search-wrapper">
        <h2>Поиск</h2>
        <p>По автору:</p>
        <p><input id="author_input" class="big_input" type="text"></p>
        <p>По названию:</p>
        <p><input id="title_input" class="big_input" type="text"></p>
        <p>По ISBN:</p>
        <p><input id="isbn_input" class="big_input" type="text"></p>
        <p>По году издания:</p>
        <p>с <input id="year_start_input" class="small_input" type="text"> по <input id="year_end_input" class="small_input" type="text"></p>
        <p><button id="search_button">Найти</button></p>
    </div>
    <div class="books-wrapper">
        <div class="books-wrapper-head">
        <div class="sort">
            Сортировать по:
            <select id="sort_select">
                <option value="author" selected>Автор от А до Я</option>
                <option value="authorDesc">Автор от Я до А</option>
                <option value="year">По году с наиболее раннего</option>
                <option value="yearDesc">По году с наиболее позднего</option>
            </select>
        </div>
            <div class="add-button">
                <button id="new_book_button">Добавить книгу</button>
            </div>
        </div>
        <div class="top-list-wrapper">

        </div>
        <div class="button_wrapper">
            <div id="left_button" class="button">Назад</div>
            <div id="page"></div>
            <div id="right_button" class="button">Вперёд</div>
        </div>
    </div>
</div>
<div id="new_book_form" class="back">
    <div class="form">
        <table>
            <tr>
                <td>Автор:</td>
                <td><input id="new_author" type="text"></td>
            </tr>
            <tr>
                <td>Название:</td>
                <td><input id="new_title" type="text"></td>
            </tr>
            <tr>
                <td>ISBN:</td>
                <td><input id="new_isbn" type="text"></td>
            </tr>
            <tr>
                <td>Год издания:</td>
                <td><input id="new_print_year" type="text"></td>
            </tr>
        </table>
        <p>Описание:</p>
        <textarea id="new_description"></textarea>
        <div class="submit">
            <button id="new_book_submit">Добавить книгу</button>
        </div>
        <div class="cancel">X</div>
    </div>
</div>
<div id="edit_book_form" class="back">
    <div class="form">
        <table>
            <tr>
                <td>Название:</td>
                <td><input id="edit_title" type="text"></td>
            </tr>
            <tr>
                <td>ISBN:</td>
                <td><input id="edit_isbn" type="text"></td>
            </tr>
            <tr>
                <td>Год издания:</td>
                <td><input id="edit_print_year" type="text"></td>
            </tr>
        </table>
        <p>Описание:</p>
        <textarea id="edit_description"></textarea>
        <div class="submit">
            <button id="edit_book_submit">Редактировать книгу</button>
        </div>
        <div class="cancel">X</div>
    </div>
</div>
<c:import url="footer.jsp"/>
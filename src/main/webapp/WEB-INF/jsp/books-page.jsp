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
    <c:param name="headTitle" value="All books"/>
    <c:param name="headerTitle" value="Книги"/>
    <c:param name="cssLink" value="/resources/css/books-page.css"/>
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
        <p><button>Найти</button></p>
    </div>
    <div class="books-wrapper">
        <div class="sort">
            Сортировать по:
            <select>
                <option value="author">Автор от А до Я</option>
                <option value="authorDesc">Автор от Я до А</option>
                <option value="year">По году с наиболее раннего</option>
                <option value="yearDesc">По году с наиболее позднего</option>
            </select>
        </div>
        <div class="list-wrapper">

        </div>
    </div>
</div>
<c:import url="footer.jsp"/>
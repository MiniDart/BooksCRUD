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
    <c:param name="cssLink" value="/resources/css/all-books.css"/>
</c:import>
<table>
    <c:forEach items="${books}" var="book">
        <tr>
            <td>${book.author}</td><td>${book.description}</td>
        </tr>
    </c:forEach>
</table>
<c:import url="footer.jsp"/>
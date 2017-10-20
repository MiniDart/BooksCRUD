<%--
  Created by IntelliJ IDEA.
  User: sergey
  Date: 19.10.17
  Time: 20:21
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Books</h1>
<table>
    <c:forEach items="${books}" var="book">
        <tr>
            <td>${book.author}</td><td>${book.description}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>

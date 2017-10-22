<%--
  Created by IntelliJ IDEA.
  User: sergey
  Date: 20.10.17
  Time: 14:14
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>${param.headTitle}</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/header.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="${param.cssLink}"/>">
</head>
<body>
<header>
    <h1>
        ${param.headerTitle}
    </h1>
</header>

package com.minidart.spring.orm;

import com.minidart.spring.containers.GetBooksContainer;
import com.minidart.spring.containers.ResponseContainer;
import com.minidart.spring.containers.SearchContainer;

import java.util.List;

public interface BookService {
    Book getById(long id);
    List<Book> getBooksId(SearchContainer container);
    ResponseContainer save(Book book);
    List<Book> getBooks(GetBooksContainer container);
    ResponseContainer update(Book book);
}

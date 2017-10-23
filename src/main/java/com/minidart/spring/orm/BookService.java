package com.minidart.spring.orm;

import com.minidart.spring.containers.PutContainer;
import com.minidart.spring.containers.ResponseContainer;
import com.minidart.spring.containers.SearchContainer;

import java.util.List;

public interface BookService {
    Book getById(long id);
    List<Book> getBooksId(SearchContainer container);
    void save(Book book);
    List<Book> getBooks(Integer[] idList);
    ResponseContainer update(PutContainer container);
}

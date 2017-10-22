package com.minidart.spring.orm;

import java.util.List;

public interface BookService {
    Book getById(long id);
    List<Book> getAll();
    void save(Book book);
}

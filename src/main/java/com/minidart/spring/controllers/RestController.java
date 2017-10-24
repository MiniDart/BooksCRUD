package com.minidart.spring.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minidart.spring.containers.GetBooksContainer;
import com.minidart.spring.containers.ResponseContainer;
import com.minidart.spring.containers.SearchContainer;
import com.minidart.spring.orm.Book;
import com.minidart.spring.orm.BookService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("rest")
public class RestController {
    @Resource(name = "bookService")
    private BookService bookService;
    @RequestMapping(value = "id-list",method = RequestMethod.GET)
    public List<Long> getIdList(@RequestParam(value="param") String param){
        SearchContainer container;
        try {
            container=new ObjectMapper().readValue(new StringReader(param),SearchContainer.class);
        }
        catch (IOException e){
            container=new SearchContainer();
            container.setAuthor("Error");
            container.setTitle(e.getMessage());
        }
        List<Book> books=bookService.getBooksId(container);
        List<Long> res=new ArrayList<>();
        for (Book book:books){
            res.add(book.getId());
        }
        return res;
    }
    @RequestMapping(value = "books",method = RequestMethod.GET)
    public List<Book> getBooksList(@RequestParam(value = "param") String param){
        GetBooksContainer container;
        try {
            container=new ObjectMapper().readValue(new StringReader(param),GetBooksContainer.class);
        }
        catch (IOException e){
            container=null;
        }
        return bookService.getBooks(container);
    }
    @RequestMapping(value = "books",method = RequestMethod.PUT)
    public ResponseContainer putBook(@RequestBody Book book){
        ResponseContainer responseContainer=bookService.update(book);
        responseContainer.setStatus("OK");
        return responseContainer;
    }
    @RequestMapping(value = "books",method = RequestMethod.POST)
    public ResponseContainer addBook(@RequestBody Book book){
        return bookService.save(book);
    }
    @RequestMapping(value = "books/{bookId}",method = RequestMethod.DELETE)
    public ResponseContainer deleteBook(@PathVariable String bookId){
        ResponseContainer responseContainer=new ResponseContainer();
        long id;
        try {
            id=Long.parseLong(bookId);
        }
        catch (NumberFormatException e){
            responseContainer.setStatus(e.getMessage());
            return responseContainer;
        }
        return bookService.delete(id);
    }
}

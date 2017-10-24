package com.minidart.spring.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minidart.spring.containers.GetBooksContainer;
import com.minidart.spring.containers.PutContainer;
import com.minidart.spring.containers.ResponseContainer;
import com.minidart.spring.containers.SearchContainer;
import com.minidart.spring.orm.Book;
import com.minidart.spring.orm.BookService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
    public ResponseContainer putBook(@RequestBody PutContainer container){
        ResponseContainer responseContainer=bookService.update(container);
        responseContainer.setStatus("OK");
        return responseContainer;
    }
}

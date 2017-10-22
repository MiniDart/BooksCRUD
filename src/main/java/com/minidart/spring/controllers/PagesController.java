package com.minidart.spring.controllers;

import com.minidart.spring.orm.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("pages")
public class PagesController {
    @Resource(name = "bookService")
    private BookService bookService;
    public BookService getBookService() {
        return bookService;
    }

    public void setBookService(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping("library")
    public String showMessage(Model model){
        model.addAttribute("books",bookService.getAll());
        return "books-page";
    }
}

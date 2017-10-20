package com.minidart.spring;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Service("bookService")
@Transactional
public class BookServiceImpl implements BookService {
    @Resource(name = "sessionFactory")
    private SessionFactory sessionFactory;

    @Override
    public void save(Book book) {

    }

    @Override
    public Book getById(long id) {
        return null;
    }

    @Override
    @Transactional
    public List<Book> getAll() {
        return sessionFactory.getCurrentSession().createQuery("FROM Book").list();
    }
}

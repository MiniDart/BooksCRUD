package com.minidart.spring.orm;

import com.minidart.spring.containers.SearchContainer;
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
    public List<Book> getBooksId(SearchContainer container) {
        container.checkValid();
        String orderBy="ORDER BY ";
        if (container.getSort().equals("author")) orderBy+="b.author";
        else if (container.getSort().equals("authorDesc")) orderBy+="b.author DESC";
        else if (container.getSort().equals("year")) orderBy+="b.printYear";
        else if (container.getSort().equals("yearDesc")) orderBy+="b.printYear DESC";
        String query;
        if (container.hasFilters()) {
            query = "FROM Book AS b WHERE ";
            if (container.getIsbn()!=null) query+="b.isbn='"+container.getIsbn()+"' ";
            else {
                if (container.getAuthor() != null)
                    query += "b.author LIKE CONCAT('%','" + container.getAuthor() + "','%') AND ";
                if (container.getTitle()!=null)
                    query+="b.title LIKE CONCAT('%','"+container.getTitle()+"','%') AND ";
                if (container.getYearFrom()!=null)
                    query+="b.printYear>="+container.getYearFrom()+" AND ";
                if (container.getYearTo()!=null)
                    query+="b.printYear<="+container.getYearTo()+" ";
                else query=query.substring(0,query.length()-4);
            }
        }
        else query="FROM Book b ";
        query+=orderBy;
        return sessionFactory.getCurrentSession().createQuery(query).list();
    }
}

package com.minidart.spring.orm;

import com.minidart.spring.containers.GetBooksContainer;
import com.minidart.spring.containers.PutContainer;
import com.minidart.spring.containers.ResponseContainer;
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
        query+=getOrderBy(container.getSort());
        return sessionFactory.getCurrentSession().createQuery(query).list();
    }

    @Override
    public List<Book> getBooks(GetBooksContainer container) {
        StringBuilder builder=new StringBuilder("FROM Book as b WHERE b.id IN (");
        for (int i=0;i<container.getIdList().size()-1;i++){
            builder.append(container.getIdList().get(i)+", ");
        }
        builder.append(container.getIdList().get(container.getIdList().size()-1)+") ");
        builder.append(getOrderBy(container.getSort()));
        return sessionFactory.getCurrentSession().createQuery(builder.toString()).list();
    }

    @Override
    public ResponseContainer update(PutContainer container) {
        ResponseContainer responseContainer=new ResponseContainer();
        if (container.isReadAlready()){
            String query="UPDATE Book AS b set b.readAlready=true WHERE b.id=:id";
            int count=sessionFactory.getCurrentSession().createQuery(query).setParameter("id",container.getId())
            .executeUpdate();
            responseContainer.setCount(count);
        }
        return responseContainer;
    }
    private String getOrderBy(String sort){
        String orderBy="ORDER BY ";
        if (sort.equals("author")) orderBy+="b.author";
        else if (sort.equals("authorDesc")) orderBy+="b.author DESC";
        else if (sort.equals("year")) orderBy+="b.printYear";
        else if (sort.equals("yearDesc")) orderBy+="b.printYear DESC";
        return orderBy;
    }
}

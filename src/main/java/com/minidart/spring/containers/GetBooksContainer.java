package com.minidart.spring.containers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;
@JsonAutoDetect
public class GetBooksContainer {
    @JsonDeserialize(as=ArrayList.class)
    private List<Integer> idList=new ArrayList<>();
    private String sort;

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public List<Integer> getIdList() {

        return idList;
    }

    public void setIdList(List<Integer> idList) {
        this.idList = idList;
    }
}

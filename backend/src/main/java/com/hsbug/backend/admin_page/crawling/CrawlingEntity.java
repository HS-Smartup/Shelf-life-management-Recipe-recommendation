package com.hsbug.backend.admin_page.crawling;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CrawlingEntity {

    @Id @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String menu;

    @Builder
    public CrawlingEntity(Long id, String menu){
        this.id = id;
        this.menu=menu;
    }

    public CrawlingEntity() {

    }


}

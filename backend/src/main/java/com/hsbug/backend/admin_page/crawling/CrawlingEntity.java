package com.hsbug.backend.admin_page.crawling;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CrawlingEntity {

    @Id @Column
    private Long id;
    private String menu;

}

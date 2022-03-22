package com.hsbug.backend.admin_page.crawling;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrawlingRequestDto {
    private String url;
    private String cssQuery;
    private String startingTag;
    private String finishingTag;
}

package com.hsbug.backend.admin_page.crawling;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class CrawlingService {

    //url 바탕으로 텍스트로 자료 가져오기
    public String findText(String url) throws IOException {
        Document docs = Jsoup.connect(url).get();
        return docs.text();
    }

    public HashMap<String,List> findTextByCssQuery(CrawlingRequestDto requestDto) throws IOException {
        HashMap<String, List> foodIngredientsMap = new HashMap<>();
        List<String> searchList = new ArrayList<>();
        Document docs = Jsoup.connect(requestDto.getUrl()).get();
//        Elements elements = docs.select("h2[class=blog-shortcode-post-title entry-title]");
        Elements elements = docs.select(requestDto.getCssQuery());


        for (Element e : elements) {
            searchList.add(e.text());
        }

        foodIngredientsMap.put("foodIngredients", searchList);
        return foodIngredientsMap;
    }

    public HashMap<String,List> findTextByCssQuery2(String url, String cssQuery) throws IOException {
        HashMap<String, List> foodIngredientsMap = new HashMap<>();
        List<String> searchList = new ArrayList<>();
        Document docs = Jsoup.connect(url).get();
//        Elements elements = docs.select("h2[class=blog-shortcode-post-title entry-title]");
        Elements elements = docs.select(cssQuery);


        for (Element e : elements) {
            searchList.add(e.text());
        }

        foodIngredientsMap.put("foodIngredients", searchList);
        return foodIngredientsMap;
    }
}

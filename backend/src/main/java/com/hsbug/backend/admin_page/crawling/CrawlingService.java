package com.hsbug.backend.admin_page.crawling;

import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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
        Elements elements = docs.select(requestDto.getCssQuery());

        for (Element e : elements) {
//            searchList.add(e.text());
            searchList.add(e.attr("abs:src"));
        }

        foodIngredientsMap.put("foodIngredients", searchList);
        return foodIngredientsMap;
    }

    public void findTextByCssQueryUserCustom(String url, String cssQuery,List<String> searchList) throws IOException {
        Document docs = Jsoup.connect(url).get();
        Elements elements = docs.select(cssQuery);

        for (Element e : elements) {
            searchList.add(e.text());
        }
    }

    public List<String> kfoodtechCrawling() throws IOException {

        // 71 10p, 975 2p, 971 2p,  961 4p, 963 3p, 967 2p, 959 2p, 734 2p
        Integer[] pageList = {71,975,971,961,963,967,959,734,973,977,969,965,957,951,953,955,943,945,947,949,734,737,739,741,69};
        String url = "http://kfoodtech.com/?page_id=";
        String cssQuery = "h2[class=blog-shortcode-post-title entry-title]";
        List<String> totalSearchList = new ArrayList<>();

        for (int i = 0; i<pageList.length; i++){
            if (pageList[i] == 71){ // 10
                this.loof(1,10,url,cssQuery,pageList[i],totalSearchList,i);
            }
            else if(pageList[i] == 975 || pageList[i] == 971 || pageList[i] == 967 || pageList[i] == 959 || pageList[i] == 734){  // 2
                this.loof(1,2,url,cssQuery,pageList[i],totalSearchList,i);
            }
            else if(pageList[i] == 961){  // 4
                this.loof(1,4,url,cssQuery,pageList[i],totalSearchList,i);
            }
            else if(pageList[i] == 963){  // 3
                this.loof(1,3,url,cssQuery,pageList[i],totalSearchList,i);
            }else {
                this.loof(1,1,url,cssQuery,pageList[i],totalSearchList,i);;
            }
        }

        return totalSearchList;
    }

    public void loof(int start,int last,String url,String cssQuery,int page,List<String> searchList ,int i) throws IOException {
        for (int j = start; j<=last; j++){
              this.findTextByCssQueryUserCustom(url + page+"&paged="+j, cssQuery, searchList);
        }
    }


    public ManageProductDto barcodeCrawling(String barcode) throws IOException {
        ManageProductDto dto = new ManageProductDto();
        String url = "http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin="+barcode;

        //connection
        Document docs = Jsoup.connect(url).get();
        //select productName
        Elements productName = docs.select("div[class=productTit]");
        //select productImg
        Elements productImg = docs.select("img[id=detailImage]");
        String name = productName.text();
        String img = productImg.attr("abs:src");

        dto.setItemName(name);
        dto.setItemImage(img);
        return dto;
    }
}

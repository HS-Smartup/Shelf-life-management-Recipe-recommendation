package com.hsbug.backend.app.refrigerator.api;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import com.hsbug.backend.app.refrigerator.add_product.AddProductDto;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.http.HttpHeaders;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@RestController
@RequestMapping("/user")        // 기본 url /user/...
public class ApiController {

    private final JwtTokenProvider jwtTokenProvider;

    public ApiController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/call_barcode")
    public JSONObject callApi(HttpServletRequest request, @RequestParam String bar_code) throws ParseException {
        String apikey = "433bea5199ba464ab499";     // 맥심
        System.out.println(bar_code);
        //예비 값
        //String bar_code = "8801037022315";
        StringBuffer result = new StringBuffer();
        try {
            String urlStr = "http://openapi.foodsafetykorea.go.kr/api/" +
                    apikey + "/" +                 // api 토큰 키
                    "I2570/json/1/5/" +             // I2570 = 바코드 인식 api, json, 시작위치, 종료위치
                    "BRCD_NO=" + bar_code;              //바코드 번호

            // url 연결 후 한줄씩 버퍼에 담아 result에 저장

            URL url = new URL(urlStr);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));

            String returnLine;
            while((returnLine = br.readLine()) != null){
                result.append(returnLine + "\n");
            }
            br.close();
            urlConnection.disconnect();
        }
        catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        {
            // String to Json parsing
            JSONParser parser = new JSONParser();
            JSONObject product_parse = (JSONObject) parser.parse(String.valueOf(result)); // json 파싱
            JSONObject obj_msg = new JSONObject();
            try {
                JSONObject product_obj = (JSONObject) product_parse.get("I2570");        // I2570 {} 추출
                JSONArray product_array = (JSONArray) product_obj.get("row");           // row [] 추출
                JSONObject product = (JSONObject) product_array.get(0);


                String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                AddProductDto addProductDto = new AddProductDto();

                // 회원 아이디 jwt 토큰 이용해서 추출 가능한지 체크 중
                //System.out.println(header);
                //String token = jwtTokenProvider.getUserPk(header.);
                //Authentication user = SecurityContextHolder.getContext().getAuthentication();
                //UserRegisterEntity user2 = (UserRegisterEntity) user.getPrincipal();

                System.out.println(request.getHeader("X-AUTH-TYPE"));
                //jwtTokenProvider.getAuthentication(request.getHeader("X-AUTH-TOKEN"));


                //System.out.println(user2.getAuthorities());
                //Long name = getCurrentMemberId();
                //System.out.println(request.getHeader("X-AUTH-TOKEN"));
                //addProductDto.setUsername();
                //

                addProductDto.setBarcode((String) product.get("BRCD_NO"));
                addProductDto.setProduct_name((String) product.get("PRDT_NM"));
                addProductDto.setProduct_type((String) product.get("PRDLST_NM"));
                addProductDto.setProduct_num(1);            // 초깃값 : 1
                addProductDto.setExp_date(today);           // local date
                addProductDto.setInput_date(today);         // local date

                obj_msg.put("message","바코드 인식 성공");
                obj_msg.put("infomation",addProductDto);
            /*
                바코드 정보 ->
                PRDLST_REPORT_NO : 품목보고(신고)번호  (197806140099)
                HTRK_PRDLST_NM : 식품 종류           (가공식품)
                LAST_UPDT_DTM : 최근 업데이트 일       (2015-01-22 11:12:12)
                HRNK_PRDLST_NM : 식품 상세 종류       (초콜릿류)
                BRCD_NO : 바코드 번호                (8801062518210)
                PRDLST_NM : 식품 품목 종류            (초콜릿 가공품)
                PRDT_NM : 제품 명                    (롯데 칸쵸 57g)
                CMPNY_NM : 회사 명                   (롯데제과(주))
             */
                System.out.println(obj_msg);
                return obj_msg;
            }catch(Exception e){
                System.out.println(e);
                obj_msg.put("message","바코드 인식 실패");
                return obj_msg;
            }
        }
    }
}

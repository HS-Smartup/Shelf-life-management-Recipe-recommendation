package com.hsbug.backend.app.refrigerator.api;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;


@RestController
@RequestMapping("/api")        // 기본 url /api/...
public class ApiController {

    @GetMapping("/call_barcode")
    public String callApi() throws ParseException {
        String apikey = "433bea5199ba464ab499";     // 맥심
        String bar_code = "8801037022315";
        StringBuffer result = new StringBuffer();
        try {
            String urlStr = "http://openapi.foodsafetykorea.go.kr/api/" +
                    apikey + "/" +                 // api 토큰 키
                    "I2570/json/1/5/" +             // I2570 = 바코드 인식 api, json, 시작위치, 종료위치
                    "BRCD_NO=" + bar_code;              //바코드 번호

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

            System.out.println(result);
            return result.toString();
        }
    }
}

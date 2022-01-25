package com.hsbug.backend.admin_page.manage_recipe;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ManageRecipeController {

    @GetMapping("/api/get_admin_recipe")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Object getAdminRecipe() throws IOException, ParseException {

        StringBuffer result1 = new StringBuffer();
        StringBuffer result2 = new StringBuffer();

        try {
            String urlStr1 = "http://openapi.foodsafetykorea.go.kr/api/456d7ca6261b4d54a702/COOKRCP01/json/1/659";
            URL url1 = new URL(urlStr1);

            HttpURLConnection urlConnection1 = (HttpURLConnection) url1.openConnection();
            urlConnection1.setRequestMethod("GET");
            BufferedReader br1 = new BufferedReader(new InputStreamReader(urlConnection1.getInputStream(), "UTF-8"));

            String returnLine1;
            while ((returnLine1 = br1.readLine()) != null) {
                result1.append(returnLine1 + "\n");
            }
            br1.close();
            urlConnection1.disconnect();


            String urlStr2 = "http://openapi.foodsafetykorea.go.kr/api/456d7ca6261b4d54a702/COOKRCP01/json/660/1318";
            URL url2 = new URL(urlStr2);

            HttpURLConnection urlConnection2 = (HttpURLConnection) url2.openConnection();
            urlConnection2.setRequestMethod("GET");
            BufferedReader br2 = new BufferedReader(new InputStreamReader(urlConnection2.getInputStream(), "UTF-8"));

            String returnLine2;
            while ((returnLine2 = br2.readLine()) != null) {
                result2.append(returnLine2 + "\n");
            }
            br2.close();
            urlConnection2.disconnect();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //System.out.println(result1);

        JSONParser parser = new JSONParser();
        JSONObject obj1 = (JSONObject) parser.parse(String.valueOf(result1));
        JSONObject obj2 = (JSONObject) parser.parse(String.valueOf(result2));

        //ObjectMapper objectMapper = new ObjectMapper();
        //objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        //String jsonString1 = objectMapper.writeValueAsString(obj1);
        //String jsonString2 = objectMapper.writeValueAsString(obj2);
        JSONObject obj1_cook = (JSONObject) obj1.get("COOKRCP01");
        //JSONArray obj1_set = (JSONArray) obj1_cook.get("row");

        JSONObject obj2_cook = (JSONObject) obj2.get("COOKRCP01");
        //JSONArray obj2_set = (JSONArray) obj2_cook.get("row");

        Object jsonDto1 = new ManageRecipeDto();
        Object jsonDto2 = new ManageRecipeDto();
        jsonDto1 = obj1_cook.get("row");
        jsonDto2 = obj2_cook.get("row");
        System.out.println(jsonDto1);
        System.out.println(jsonDto2);
        return jsonDto1;
    }

}

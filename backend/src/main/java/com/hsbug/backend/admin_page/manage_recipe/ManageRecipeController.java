package com.hsbug.backend.admin_page.manage_recipe;

import com.fasterxml.jackson.annotation.JsonInclude;
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
import java.util.List;

@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ManageRecipeController {

    @GetMapping("/api/get_admin_recipe")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public JSONObject getAdminRecipe() throws IOException, ParseException {

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


        JSONObject obj1_cook = (JSONObject) obj1.get("COOKRCP01");
        JSONObject obj2_cook = (JSONObject) obj2.get("COOKRCP01");
        // 여기까지는 맞음

        ManageRecipeDto dto = new ManageRecipeDto();

        JSONArray jsonArray1 = (JSONArray) obj1_cook.get("row");
        String a = jsonArray1.toString();

        ObjectMapper mapper = new ObjectMapper();

        JSONObject jsonObject = null;
        for (int i = 0; i < jsonArray1.size(); i++) {
            jsonObject = (JSONObject) jsonArray1.get(i);
            //ManageRecipeDto manageRecipeDtos = mapper.readValue((DataInput) jsonObject, ManageRecipeDto.class);
            // 여기가 문젲임 건들ㅇ여야햠.
            System.out.println(jsonObject.get("RCP_SEQ"));
        }


        //ManageRecipeDto dto11 = mapper.readValue((JsonParser) jsonDto1, ManageRecipeDto.class);
        //ManageRecipeDto dto11 = mapper.readValue(obj1_cook,ManageRecipeDto.class);
        //System.out.println(dto11);

        //System.out.println(jsonDto1);
        //JSONParser jsonParser1 = new JSONParser();
        //JSONObject jsonObject = (JSONObject) jsonParser1.parse(String.valueOf(obj1_cook));
        //ManageRecipeDto ddd = (ManageRecipeDto) jsonObject.get("row");

        //System.out.println(jsonDto1);
        //System.out.println(jsonDto2);
        return jsonObject;
    }

}

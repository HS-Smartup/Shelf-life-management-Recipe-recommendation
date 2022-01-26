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

@RestController
public class ManageRecipeController { //10초 정도 걸리는 듯.

    private final ManageRecipeService manageRecipeService;

    public ManageRecipeController(ManageRecipeService manageRecipeService) {
        this.manageRecipeService = manageRecipeService;
    }

    @GetMapping("/api/get_admin_recipe")
    public JSONObject getAdminRecipe() throws IOException, ParseException {

        JSONObject obj = new JSONObject();
        try {
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
            JSONArray jsonArray1 = (JSONArray) obj1_cook.get("row");
            JSONArray jsonArray2 = (JSONArray) obj2_cook.get("row");

            JSONObject jsonObject = null;

            for (Integer i = 0; i < jsonArray1.size(); i++) {
                ManageRecipeDto recipeDto = new ManageRecipeDto();
                jsonObject = (JSONObject) jsonArray1.get(i);

                //System.out.println(jsonObject.get("RCP_SEQ"));
                recipeDto.setRCP_SEQ((String) jsonObject.get("RCP_SEQ"));
                recipeDto.setRCP_NM((String) jsonObject.get("RCP_NM"));
                recipeDto.setRCP_PAT2((String) jsonObject.get("RCP_PAT2"));
                recipeDto.setRCP_PARTS_DTLS((String) jsonObject.get("RCP_PARTS_DTLS"));
                recipeDto.setRCP_WAY2((String) jsonObject.get("RCP_WAY2"));
                recipeDto.setATT_FILE_NO_MAIN((String) jsonObject.get("ATT_FILE_NO_MAIN"));
                recipeDto.setATT_FILE_NO_MK((String) jsonObject.get("ATT_FILE_NO_MK"));
                recipeDto.setMANUAL01((String) jsonObject.get("MANUAL01"));
                recipeDto.setMANUAL02((String) jsonObject.get("MANUAL02"));
                recipeDto.setMANUAL03((String) jsonObject.get("MANUAL03"));
                recipeDto.setMANUAL04((String) jsonObject.get("MANUAL04"));
                recipeDto.setMANUAL05((String) jsonObject.get("MANUAL05"));
                recipeDto.setMANUAL06((String) jsonObject.get("MANUAL06"));
                recipeDto.setMANUAL07((String) jsonObject.get("MANUAL07"));
                recipeDto.setMANUAL08((String) jsonObject.get("MANUAL08"));
                recipeDto.setMANUAL09((String) jsonObject.get("MANUAL09"));
                recipeDto.setMANUAL10((String) jsonObject.get("MANUAL10"));
                recipeDto.setMANUAL11((String) jsonObject.get("MANUAL12"));
                recipeDto.setMANUAL12((String) jsonObject.get("MANUAL13"));
                recipeDto.setMANUAL13((String) jsonObject.get("MANUAL14"));
                recipeDto.setMANUAL14((String) jsonObject.get("MANUAL15"));
                recipeDto.setMANUAL15((String) jsonObject.get("MANUAL16"));
                //recipeDto.setMANUAL16((String) jsonObject.get("MANUAL16"));
                //recipeDto.setMANUAL17((String) jsonObject.get("MANUAL17"));
                //recipeDto.setMANUAL18((String) jsonObject.get("MANUAL18"));
                //recipeDto.setMANUAL19((String) jsonObject.get("MANUAL19"));
                //recipeDto.setMANUAL20((String) jsonObject.get("MANUAL20"));

                recipeDto.setMANUAL_IMG01((String) jsonObject.get("MANUAL_IMG01"));
                recipeDto.setMANUAL_IMG02((String) jsonObject.get("MANUAL_IMG02"));
                recipeDto.setMANUAL_IMG03((String) jsonObject.get("MANUAL_IMG03"));
                recipeDto.setMANUAL_IMG04((String) jsonObject.get("MANUAL_IMG04"));
                recipeDto.setMANUAL_IMG05((String) jsonObject.get("MANUAL_IMG05"));
                recipeDto.setMANUAL_IMG06((String) jsonObject.get("MANUAL_IMG06"));
                recipeDto.setMANUAL_IMG07((String) jsonObject.get("MANUAL_IMG07"));
                recipeDto.setMANUAL_IMG08((String) jsonObject.get("MANUAL_IMG08"));
                recipeDto.setMANUAL_IMG09((String) jsonObject.get("MANUAL_IMG09"));
                recipeDto.setMANUAL_IMG10((String) jsonObject.get("MANUAL_IMG10"));
                recipeDto.setMANUAL_IMG11((String) jsonObject.get("MANUAL_IMG11"));
                //recipeDto.setMANUAL_IMG12((String) jsonObject.get("MANUAL_IMG12"));
                //recipeDto.setMANUAL_IMG13((String) jsonObject.get("MANUAL_IMG13"));
                //recipeDto.setMANUAL_IMG14((String) jsonObject.get("MANUAL_IMG14"));
                //recipeDto.setMANUAL_IMG15((String) jsonObject.get("MANUAL_IMG15"));
                //recipeDto.setMANUAL_IMG16((String) jsonObject.get("MANUAL_IMG16"));
                //recipeDto.setMANUAL_IMG17((String) jsonObject.get("MANUAL_IMG17"));
                //recipeDto.setMANUAL_IMG18((String) jsonObject.get("MANUAL_IMG18"));
                //recipeDto.setMANUAL_IMG19((String) jsonObject.get("MANUAL_IMG19"));
                //recipeDto.setMANUAL_IMG20((String) jsonObject.get("MANUAL_IMG20"));
                //recipeDto.setINFO_WGT((String) jsonObject.get("INFO_WGT"));

                recipeDto.setINFO_ENG(((String) jsonObject.get("INFO_ENG")));
                recipeDto.setINFO_CAR(((String) jsonObject.get("INFO_CAR")));
                recipeDto.setINFO_PRO(((String) jsonObject.get("INFO_PRO")));
                recipeDto.setINFO_FAT(((String) jsonObject.get("INFO_FAT")));
                recipeDto.setINFO_NA(((String) jsonObject.get("INFO_NA")));
                recipeDto.setHASH_TAG(((String) jsonObject.get("HASH_TAG")));

                //if (!manageRecipeService.checkRecipe((String) jsonObject.get("RCP_SEQ"))){
                    System.out.println("업데이트를 진행합니다.");
                 //   manageRecipeService.updateRecipe(recipeDto);
                //}else {
                 //   System.out.println("저장을 진행합니다.");
                    manageRecipeService.saveRecipe((long) (i+1),recipeDto);

                //}
                //manageRecipeService.saveRecipe(recipeDto);
            }

            for (Integer j = 0; j < jsonArray2.size(); j++) {
                ManageRecipeDto recipeDto = new ManageRecipeDto();
                jsonObject = (JSONObject) jsonArray2.get(j);

                //System.out.println(jsonObject.get("RCP_SEQ"));
                recipeDto.setRCP_SEQ((String) jsonObject.get("RCP_SEQ"));
                recipeDto.setRCP_NM((String) jsonObject.get("RCP_NM"));
                recipeDto.setRCP_PAT2((String) jsonObject.get("RCP_PAT2"));
                recipeDto.setRCP_PARTS_DTLS((String) jsonObject.get("RCP_PARTS_DTLS"));
                recipeDto.setRCP_WAY2((String) jsonObject.get("RCP_WAY2"));
                recipeDto.setATT_FILE_NO_MAIN((String) jsonObject.get("ATT_FILE_NO_MAIN"));
                recipeDto.setATT_FILE_NO_MK((String) jsonObject.get("ATT_FILE_NO_MK"));
                recipeDto.setMANUAL01((String) jsonObject.get("MANUAL01"));
                recipeDto.setMANUAL02((String) jsonObject.get("MANUAL02"));
                recipeDto.setMANUAL03((String) jsonObject.get("MANUAL03"));
                recipeDto.setMANUAL04((String) jsonObject.get("MANUAL04"));
                recipeDto.setMANUAL05((String) jsonObject.get("MANUAL05"));
                recipeDto.setMANUAL06((String) jsonObject.get("MANUAL06"));
                recipeDto.setMANUAL07((String) jsonObject.get("MANUAL07"));
                recipeDto.setMANUAL08((String) jsonObject.get("MANUAL08"));
                recipeDto.setMANUAL09((String) jsonObject.get("MANUAL09"));
                recipeDto.setMANUAL10((String) jsonObject.get("MANUAL10"));
                recipeDto.setMANUAL11((String) jsonObject.get("MANUAL12"));
                recipeDto.setMANUAL12((String) jsonObject.get("MANUAL13"));
                recipeDto.setMANUAL13((String) jsonObject.get("MANUAL14"));
                recipeDto.setMANUAL14((String) jsonObject.get("MANUAL15"));
                recipeDto.setMANUAL15((String) jsonObject.get("MANUAL16"));
                //recipeDto.setMANUAL16((String) jsonObject.get("MANUAL16"));
                //recipeDto.setMANUAL17((String) jsonObject.get("MANUAL17"));
                //recipeDto.setMANUAL18((String) jsonObject.get("MANUAL18"));
                //recipeDto.setMANUAL19((String) jsonObject.get("MANUAL19"));
                //recipeDto.setMANUAL20((String) jsonObject.get("MANUAL20"));

                recipeDto.setMANUAL_IMG01((String) jsonObject.get("MANUAL_IMG01"));
                recipeDto.setMANUAL_IMG02((String) jsonObject.get("MANUAL_IMG02"));
                recipeDto.setMANUAL_IMG03((String) jsonObject.get("MANUAL_IMG03"));
                recipeDto.setMANUAL_IMG04((String) jsonObject.get("MANUAL_IMG04"));
                recipeDto.setMANUAL_IMG05((String) jsonObject.get("MANUAL_IMG05"));
                recipeDto.setMANUAL_IMG06((String) jsonObject.get("MANUAL_IMG06"));
                recipeDto.setMANUAL_IMG07((String) jsonObject.get("MANUAL_IMG07"));
                recipeDto.setMANUAL_IMG08((String) jsonObject.get("MANUAL_IMG08"));
                recipeDto.setMANUAL_IMG09((String) jsonObject.get("MANUAL_IMG09"));
                recipeDto.setMANUAL_IMG10((String) jsonObject.get("MANUAL_IMG10"));
                recipeDto.setMANUAL_IMG11((String) jsonObject.get("MANUAL_IMG11"));
                //recipeDto.setMANUAL_IMG12((String) jsonObject.get("MANUAL_IMG12"));
                //recipeDto.setMANUAL_IMG13((String) jsonObject.get("MANUAL_IMG13"));
                //recipeDto.setMANUAL_IMG14((String) jsonObject.get("MANUAL_IMG14"));
                //recipeDto.setMANUAL_IMG15((String) jsonObject.get("MANUAL_IMG15"));
                //recipeDto.setMANUAL_IMG16((String) jsonObject.get("MANUAL_IMG16"));
                //recipeDto.setMANUAL_IMG17((String) jsonObject.get("MANUAL_IMG17"));
                //recipeDto.setMANUAL_IMG18((String) jsonObject.get("MANUAL_IMG18"));
                //recipeDto.setMANUAL_IMG19((String) jsonObject.get("MANUAL_IMG19"));
                //recipeDto.setMANUAL_IMG20((String) jsonObject.get("MANUAL_IMG20"));
                //recipeDto.setINFO_WGT((String) jsonObject.get("INFO_WGT"));

                recipeDto.setINFO_ENG(((String) jsonObject.get("INFO_ENG")));
                recipeDto.setINFO_CAR(((String) jsonObject.get("INFO_CAR")));
                recipeDto.setINFO_PRO(((String) jsonObject.get("INFO_PRO")));
                recipeDto.setINFO_FAT(((String) jsonObject.get("INFO_FAT")));
                recipeDto.setINFO_NA(((String) jsonObject.get("INFO_NA")));
                recipeDto.setHASH_TAG(((String) jsonObject.get("HASH_TAG")));
                // 660
                 manageRecipeService.saveRecipe((long) (j+660),recipeDto);

            }
            obj.put("message","관리자 레시피 업데이트 완료");
            obj.put("total_update",jsonArray1.size() + jsonArray2.size());

            return obj;
        }catch(Exception e){
            obj.put("message","관리자 레시피 업데이트 실패");
            return obj;
        }

    }
}

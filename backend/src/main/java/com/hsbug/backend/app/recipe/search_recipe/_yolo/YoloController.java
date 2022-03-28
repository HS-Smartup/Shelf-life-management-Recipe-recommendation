package com.hsbug.backend.app.recipe.search_recipe._yolo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
public class YoloController {

    @GetMapping("/test")
    public String Test(){

        String url = "http://127.0.0.1:5000";
        String sb = "";
        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();

            BufferedReader br = new BufferedReader((new InputStreamReader(conn.getInputStream(),"utf-8")));

            String line = null;

            while ((line = br.readLine()) != null) {
                sb = sb + line + "\n";
            }
            System.out.println("========br========" + sb.toString());

            if (sb.toString().contains("ok")){
                System.out.println("test");
            }
            br.close();

            System.out.println("" + sb.toString());
        } catch(MalformedURLException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }

        return sb;
    }
}

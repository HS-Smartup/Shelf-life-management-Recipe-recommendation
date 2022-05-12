package com.hsbug.backend.app.search_recipe._yolo;

import com.sun.net.httpserver.HttpsParameters;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user/search")
public class YoloController {

    @GetMapping("/train")
    public void Train(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect("http://localhost:5000/train");
    }

    @GetMapping("/predict")
    public void Predict(@RequestParam String obj){
        System.out.println(obj);
        String[] obj_list = obj.split(":");
        ArrayList food_obj = new ArrayList<>();
        for (int i = 0 ; i< obj_list.length; i++){
            food_obj.add(obj_list[i]);
        }
        System.out.println(Arrays.toString(obj_list));
        food_obj = this.convert(food_obj);
        System.out.println(food_obj);
        // image file 인수로 같이 넘겨 줘야 함.
    }

    public ArrayList convert(ArrayList obj_list)throws NullPointerException {
        ArrayList converted = new ArrayList<String>();
        for (int i = 0; i < obj_list.size(); i++) {
            String tmp = (String) obj_list.get(i);
            String food = null;
            if (tmp.equals("mandarin")){
                System.out.println(1);
            }
            converted.add(food);
        }

        return converted;
    }
}

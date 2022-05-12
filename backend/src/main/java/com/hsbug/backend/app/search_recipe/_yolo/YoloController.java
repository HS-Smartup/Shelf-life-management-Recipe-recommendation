package com.hsbug.backend.app.search_recipe._yolo;

import com.sun.net.httpserver.HttpsParameters;
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
import java.util.Arrays;


@RestController
@RequestMapping("/user/search")
public class YoloController {

    @GetMapping("/train")
    public void Train(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect("http://localhost:5000/train");
    }

    @GetMapping("/predict")
    public void Predict(@RequestParam String obj){
        System.out.println(obj);
        String[] aaa = obj.split(":");
        System.out.println(Arrays.toString(aaa));

        // image file 인수로 같이 넘겨 줘야 함.
    }
}

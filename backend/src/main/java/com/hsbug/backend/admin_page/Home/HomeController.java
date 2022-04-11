package com.hsbug.backend.admin_page.Home;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

//관리자 페이지 컨트롤러
public class HomeController {
    @RequestMapping(value = "/home", method= RequestMethod.GET)
    public String goHome(HttpServletRequest request) {
        return "content/home";
    }

}

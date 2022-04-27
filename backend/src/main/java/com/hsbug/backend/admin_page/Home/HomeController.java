package com.hsbug.backend.admin_page.Home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

//관리자 페이지 컨트롤러
@Controller
public class HomeController {
    @RequestMapping(value = "/admin/home", method= RequestMethod.GET)
    public String goHome(HttpServletRequest request) {
        return "Home";
    }

    @GetMapping("/api/login")
    public String login(){
        return "post/login";
    }

    @GetMapping("/admin/Home")
    public String adminHome(){ return "Home";}

    @GetMapping("/admin/AdminManage")
    public String adminManage(){ return "AdminManage";}

    @GetMapping("/admin/Q&A")
    public String QA(){ return "Q&A";}

    @GetMapping("/admin/RecipeManage")
    public String RecipeManage(){ return "RecipeManage";}

    @GetMapping("/admin/UserManage")
    public String UserManage(){ return "UserManage";}

    @GetMapping("/admin/AdminRecipe")
    public String AdminRecipe(){ return "AdminRecipe";}

    @GetMapping("/admin/UserRecipe")
    public String UserRecipe(){ return "UserRecipe";}



}



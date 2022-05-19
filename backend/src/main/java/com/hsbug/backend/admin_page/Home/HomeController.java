package com.hsbug.backend.admin_page.Home;

import com.hsbug.backend.admin_page.manage_question.ManageQuestionDto;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionRepository;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionService;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import com.hsbug.backend.app.user_register.UserRegisterDto;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//관리자 페이지 컨트롤러
@Controller
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final ManageQuestionService manageQuestionService;
    private final ManageQuestionRepository manageQuestionRepository;
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
    public String adminManage(Model model){
        List<UserRegisterDto> dtos = homeService.getAdminAll();
        System.out.println(dtos);
        model.addAttribute("admins", dtos);
        return "AdminManage";}


    @GetMapping("/admin/UserManage")
    public String UserManage(Model model){
         List<UserRegisterDto> dtos = homeService.getUserAll();
        System.out.println(dtos);
        model.addAttribute("user", dtos);
        return "UserManage";
    }


    @GetMapping("/admin/AdminRecipe")
    public String AdminRecipe(Model model){
        List<SearchRecipeRefrigDto> dtos = homeService.getRecipeAll();
        System.out.println(dtos);
        model.addAttribute("AdminRecipe",dtos);
        return "AdminRecipe";
    }


}



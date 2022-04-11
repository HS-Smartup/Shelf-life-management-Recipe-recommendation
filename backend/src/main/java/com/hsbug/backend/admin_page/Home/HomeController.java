package com.hsbug.backend.admin_page.Home;
//관리자 페이지 컨트롤러
public class HomeController {
    @RequestMapping(value = "/home", method=RequestMethod.GET)

    public String goHome(HttpServletRequest request) {
        return "content/home";
    }

}

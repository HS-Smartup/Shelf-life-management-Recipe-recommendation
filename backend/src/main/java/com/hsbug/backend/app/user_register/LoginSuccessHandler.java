package com.hsbug.backend.app.user_register;


import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {
    // accountService;
    UserRegisterDto form;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,HttpServletResponse response,
                Authentication authentication)throws IOException, ServletException {

        HttpSession session = request.getSession();

        System.out.println("Success Log In : " + authentication.getName());
        session.setAttribute("userid", authentication.getName());
        session.setAttribute("role", authentication.getAuthorities());


       // String a = accountService.loadUserByUsername(authentication.getName()).getCredit_check();
        //System.out.println(a);

        //if authentication.getName() == "[ROLE_USER]"
        response.sendRedirect("/api/log");
    }
}

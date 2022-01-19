package com.hsbug.backend.app.Config;
import com.hsbug.backend.app.user_register.LoginSuccessHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/js/**","/css/**","/images/**","/font/**", "/h2-console/**");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .and()
                .formLogin()
                .loginPage("/api/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/api/loginsuccess")
                .failureUrl("/api/loginfailure")
                //.successHandler(new LoginSuccessHandler())
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/")
                .and()
                .exceptionHandling().accessDeniedPage("/login/denied");
    http.csrf()
            .ignoringAntMatchers("/h2-console/**")
            .disable();

    }

}

package com.hsbug.backend.app.Config;

import com.hsbug.backend.app.user_register.external_login.CustomOAuth2Provider;
import com.hsbug.backend.app.user_register.external_login.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.hsbug.backend.app.user_register.external_login.SocialType.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Order(1)
    @Configuration
    public static class SecurityConfig1 extends WebSecurityConfigurerAdapter{

        @Override
        public void configure(WebSecurity web) {
            web.ignoring().antMatchers("/js/**", "/css/**", "/images/**", "/font/**", "/h2-console/**");
        }

        @Override
        public void configure(HttpSecurity httpSecurity) throws Exception {
            httpSecurity.authorizeRequests()
                        .antMatchers("/admin/**").hasRole("ADMIN")
                        .antMatchers("/**").permitAll()
                        .antMatchers("/h2-console/**").permitAll()
                    .and()
                        .formLogin()        // 기본 login
                        .loginPage("/api/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/api/loginSuccess")     // 로그인 성공 Url
                        .failureUrl("/api/loginFailure")        // 로그인 실패 url
                        //.successHandler(new LoginSuccessHandler())
                    .and()
                        .logout()       // logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .invalidateHttpSession(true)
                        .logoutSuccessUrl("/")
                    .and()
                        .exceptionHandling().accessDeniedPage("/login/denied");
            httpSecurity.csrf()
                    .ignoringAntMatchers("/h2-console/**")
                    .disable();

            httpSecurity.authorizeRequests()
                        .antMatchers("/", "/oauth2/**", "/login/**", "/css/**",
                                "/images/**", "/js/**", "/console/**", "/favicon.ico/**", "/h2-console/**")
                        .permitAll()
                        .antMatchers("/google").hasAuthority(GOOGLE.getRoleType())
                        .antMatchers("/kakao").hasAuthority(KAKAO.getRoleType())
                        .antMatchers("/naver").hasAuthority(NAVER.getRoleType())
                        //.antMatchers("/api/**").permitAll()
                        .anyRequest().authenticated()
                    .and()
                        .oauth2Login()
                        .userInfoEndpoint().userService(new CustomOAuth2UserService())  // 네이버 USER INFO의 응답을 처리하기 위한 설정
                    .and()
                        .defaultSuccessUrl("/api/loginSuccess")
                        .failureUrl("/api/loginFailure")
                    .and()
                        .exceptionHandling()
                        .accessDeniedPage("/login");
            httpSecurity.csrf()
                    .ignoringAntMatchers("/h2-console/**")
                    .disable();

        }

        @Bean
        public ClientRegistrationRepository clientRegistrationRepository(
                OAuth2ClientProperties oAuth2ClientProperties,
                @Value("${custom.oauth2.kakao.client-id}") String kakaoClientId,
                @Value("${custom.oauth2.kakao.client-secret}") String kakaoClientSecret,
                @Value("${custom.oauth2.naver.client-id}") String naverClientId,
                @Value("${custom.oauth2.naver.client-secret}") String naverClientSecret) {
            List<ClientRegistration> registrations = oAuth2ClientProperties
                    .getRegistration().keySet().stream()
                    .map(client -> getRegistration(oAuth2ClientProperties, client))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
                    .clientId(kakaoClientId)
                    .clientSecret(kakaoClientSecret)
                    .jwkSetUri("temp")
                    .build());

            registrations.add(CustomOAuth2Provider.NAVER.getBuilder("naver")
                    .clientId(naverClientId)
                    .clientSecret(naverClientSecret)
                    .jwkSetUri("temp")
                    .build());
            return new InMemoryClientRegistrationRepository(registrations);
        }

        private ClientRegistration getRegistration(OAuth2ClientProperties clientProperties, String client) {
            if ("google".equals(client)) {
                OAuth2ClientProperties.Registration registration = clientProperties.getRegistration().get("google");
                return CommonOAuth2Provider.GOOGLE.getBuilder(client)
                        .clientId(registration.getClientId())
                        .clientSecret(registration.getClientSecret())
                        .scope("email", "profile")
                        .build();
            }

            return null;
        }
    }
}

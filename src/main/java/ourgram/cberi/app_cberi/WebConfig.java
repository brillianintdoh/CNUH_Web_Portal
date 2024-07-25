package ourgram.cberi.app_cberi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import jakarta.annotation.PostConstruct;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.service.webPush.ServicePush;

@Configuration
@EnableWebSecurity
public class WebConfig {    
    private ServletData data;
    private DBGet get;
    
    @Autowired
    public WebConfig(ServletData data, DBGet get) {
        this.data = data;
        this.get = get;
    } 

    @PostConstruct
    public void init() {
        UserDB.init(get.getDataJson());
        System.out.println("쿠키 초기화 완료");

        ServicePush.init(data.getPublicKey(), data.getPrivateKey(), data.getGcmKey());
        System.out.println("web-push 설정 완료");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
        .formLogin(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests((authorize) -> authorize
        .anyRequest().permitAll());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
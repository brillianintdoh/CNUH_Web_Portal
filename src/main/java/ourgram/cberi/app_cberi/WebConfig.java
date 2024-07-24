package ourgram.cberi.app_cberi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.service.webPush.ServicePush;

@Configuration
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
}
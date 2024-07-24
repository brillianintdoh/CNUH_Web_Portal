package ourgram.cberi.app_cberi.service.webPush;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.spec.InvalidKeySpecException;
import java.util.concurrent.ExecutionException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.Subscription;
import nl.martijndwars.webpush.Subscription.Keys;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.security.db.PushMysql;

@RestController
@RequestMapping("/push")
public class WebPush {

    @Autowired
    private PushMysql push;

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(HttpServletRequest req, @CookieValue(name="token", required=true) String token) {
        String key = req.getParameter("key");
        String auth = req.getParameter("auth");
        String endpoint = req.getParameter("endpoint");
        push.save(key, auth, endpoint, UserDB.getId(token));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@CookieValue(name="token", required=true) String token) {
        push.pop(UserDB.getId(token));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<String> send(@CookieValue(name="token", required=true) String token, @RequestParam(name="body", required=true) String body) throws NoSuchAlgorithmException, NoSuchProviderException, InvalidKeySpecException {
        String result = "";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        String key = push.getKey(id);
        String auth = push.getAuth(id);
        String endpoint = push.getEndpoint(id);

        Subscription sub = new Subscription(endpoint, new Keys(key, auth));
        Notification not = new Notification(sub, body);
        try {
            ServicePush.get().send(not);
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
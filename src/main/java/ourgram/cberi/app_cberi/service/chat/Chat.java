package ourgram.cberi.app_cberi.service.chat;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.Subscription;
import nl.martijndwars.webpush.Subscription.Keys;
import ourgram.cberi.app_cberi.security.db.DBEdit;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.service.webPush.ServicePush;
import ourgram.cberi.app_cberi.security.db.PushMysql;

@Controller
@RequestMapping("/chat")
public class Chat {
    private PushMysql dbPush;
    private DBGet get;
    private DBEdit edit;
    private DBUser user;

    @Autowired
    public Chat(DBUser user, DBEdit edit ,DBGet get, PushMysql dbPush) {
        this.user = user;
        this.get = get;
        this.dbPush = dbPush;
        this.edit = edit;
    }

    @GetMapping("/room/{username}")
    public String userChat(Model model, @PathVariable String username, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        if(get.isUser(username) && get.isFollow(id, user.getID(username))) {
            model.addAttribute("follow_name", username);
            model.addAttribute("username", user.getUsername(id));
            return "page/chat/index";
        }
        return "error";
    }

    @PostMapping("/save")
    public String save(@CookieValue(name="token", required=true) String token, @RequestParam(name="username", required=true) String username, @RequestParam(name="follow_name", required=true) String follow_name, @RequestParam(name="message", required=true) String message) {
        String id = UserDB.getId(token);
        String follow_id = user.getID(follow_name);
        if(id.equals(user.getID(username)) && message.equals("")) {
            String room_id = get.getChatRoomId(id, follow_id);

            dbPush.addNotif(room_id, follow_id);
            UserDB.setPush(follow_id, message);
            edit.setChat(message, id, room_id);
        } 
        return "error";
    }

    @PostMapping("/push")
    public String push(@CookieValue(name="token", required=true) String token, @RequestParam(name="follow_name", required=true) String follow_name) throws NoSuchAlgorithmException, NoSuchProviderException, InvalidKeySpecException {
        String id = UserDB.getId(token);
        String username = user.getUsername(id);
        String f_id = user.getID(follow_name);
        String room_id = get.getChatRoomId(f_id, id);

        if(get.isNotif(room_id, f_id)) {
            dbPush.popNotif(room_id, f_id);
            if(dbPush.isPush(f_id) && get.getChat(f_id)) {
                String message = "{ \"title\":\""+username+"님이 메서지를 보냈습니다\", \"badge\": \"/img/chat.png\" , \"body\": \""+UserDB.getPush(f_id)+"\", \"icon\": \"/load/profile.png?name="+username+"\", \"url\": \"/chat/room/"+username+"\" }";
                UserDB.pushRemove(f_id);
                
                Subscription sub = new Subscription(dbPush.getEndpoint(f_id), new Keys(dbPush.getKey(f_id), dbPush.getAuth(f_id)));
                Notification not = new Notification(sub, message);
                try {
                    ServicePush.get().send(not);
                } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        return "error";
    }

    @PostMapping("/unpush")
    public String unPush(@CookieValue(name="token", required=true) String token, @RequestParam(name="follow_name", required=true) String follow_name) {
        String id = UserDB.getId(token);
        String f_id = user.getID(follow_name);
        String room_id = get.getChatRoomId(id, f_id);

        dbPush.popNotif(room_id, id);
        UserDB.pushRemove(f_id);
        return "error";
    }

    @PostMapping("/load")
    public String chatLoad(Model model, @CookieValue(name="token", required=true) String token, @RequestParam(name="username", required=true) String username, @RequestParam(name="follow_name", required=true) String follow_name) {
        String id = UserDB.getId(token);
        String follow_id = user.getID(follow_name);
        if(id.equals(user.getID(username)) && get.isFollow(id, follow_id)) {
            String room_id = get.getChatRoomId(id, follow_id);
            List<Map<String, Object>> list = get.getChatList(room_id);
            List<String> me = new ArrayList<>();
            List<String> follow = new ArrayList<>();
            me.add(id);
            me.add(username);
            follow.add(follow_id);
            follow.add(follow_name);
            for (Map<String, Object> chat : list) {
                chat.put("time_at", formatTime(chat.get("time_at").toString()));
            }
            model.addAttribute("me", me);
            model.addAttribute("follow", follow);
            model.addAttribute("list", list);
            return "page/chat/load";
        }
        return "error";
    }

    private String formatTime(String date_s) {
        SimpleDateFormat input = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S", Locale.KOREAN);
        SimpleDateFormat output = new SimpleDateFormat("a h:mm", Locale.KOREAN);
        try {
            return output.format(input.parse(date_s));
        } catch (ParseException e) {
            e.printStackTrace();
            return "0:00";
        }
    } 
}
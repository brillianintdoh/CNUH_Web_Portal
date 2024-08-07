package ourgram.cberi.app_cberi.service.account;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ourgram.cberi.app_cberi.ServletData;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@Controller
@RequestMapping("/menu")
public class Menu {
    private DBUser user;
    private ServletData data;
    private DBGet get;

    @Autowired
    public Menu(DBUser user, DBGet get, ServletData data) {
        this.get = get;
        this.user = user;
        this.data = data;
    }

    @PostMapping("/1")
    public String page_1(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("username", user.getUsername(id));
        model.addAttribute("name", get.getname(id));
        model.addAttribute("teacher", get.isTeacher(id));
        model.addAttribute("dropdown", new String[]{"a","b","c","d"});
        model.addAttribute("a", get.getA(id));
        model.addAttribute("b", get.getB(id));
        model.addAttribute("c", get.getC(id));
        model.addAttribute("d", get.getD(id));
        model.addAttribute("grade", get.getGrade(id));
        model.addAttribute("seat", get.getSeat(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        return "page/account/main/1";
    }

    @PostMapping("/2")
    public String page_2(Model model, @CookieValue(name="token",required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("page", 2);
        model.addAttribute("publicKey", data.getPublicKey());
        model.addAttribute("is_push", get.getIsPush(id));
        model.addAttribute("news", get.getNews(id));
        model.addAttribute("chat", get.getChat(id));
        model.addAttribute("mission", get.getMission(id));
        return "page/account/main/2";
    }

    @PostMapping("/3")
    public String page_3(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        List<String> follow_list = new ArrayList<>();
        List<String> following_list = new ArrayList<>();
        for(String user_id : get.getFollow(id)) {
            follow_list.add(user.getUsername(user_id));
        }
        for(String user_id : get.getFollowing(id)) {
            following_list.add(user.getUsername(user_id));
        }
        model.addAttribute("follow_list", follow_list);
        model.addAttribute("following_list", following_list);
        model.addAttribute("page", 3);
        return "page/account/main/3";
    }

    @PostMapping("/4")
    public String page_4(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        List<String> chatList = new ArrayList<>();
        List<String> chatRoomList = new ArrayList<>();
        for(String room_id : get.getChatRoomList(id)) {
            String[] list_id = get.getChatList_id(room_id);
            if(list_id[0].equals(id)) {
                chatRoomList.add(list_id[1]);
            }else {
                chatRoomList.add(list_id[0]);
            }
        }
        for(String user_id : chatRoomList) {
            chatList.add(user.getUsername(user_id));
        }
        model.addAttribute("chatList", chatList);
        model.addAttribute("page", 4);
        return "page/account/main/4";
    }

    @PostMapping("/5")
    public String page_5(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("page", 5);

        model.addAttribute("username", user.getUsername(id));
        model.addAttribute("name", get.getname(id));
        model.addAttribute("email", get.getEmail(id));
        model.addAttribute("grade", get.getGrade(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("seat", get.getSeat(id));
        return "page/account/main/5";
    }

    @PostMapping("/admin")
    public String page_admin(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        if(!get.isManager(id)) {
            return "error";
        }

        List<Map<String, String>> user_list = new ArrayList<>();
        for(String user_id : user.allID()) {
            String username = user.getUsername(user_id);
            user_list.add(Map.of("id", user.getID(username), "username", username, "name", get.getname(user_id), "email", get.getEmail(user_id)));
        }
        model.addAttribute("user_list", user_list);
        model.addAttribute("page", "admin");
        return "/page/account/admin/index";
    }

    @PostMapping("/teacher")
    public String page_teacher(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        if(!get.isManager(id)) {
            return "error";
        }
        model.addAttribute("page", "teacher");
        return "/page/account/admin/teacher";
    }
}
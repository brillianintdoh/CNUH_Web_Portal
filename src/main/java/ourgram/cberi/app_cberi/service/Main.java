package ourgram.cberi.app_cberi.service;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@Controller
public class Main {
    private DBUser user;
    private DBGet get;

    @Autowired
    public Main(DBUser user, DBGet get) {
        this.user = user;
        this.get = get;
    }

    @GetMapping("/")
    public String index(Model model, @CookieValue(name="token", required=false) String token) {
        String id = UserDB.getId(token);
        if(token == null || id == null) {
            return "page/index/login";
        }
        model.addAttribute("username", user.getUsername(id));
        return "page/index/index";
    }

    @GetMapping("/signup")
    public String signup() {
        return "page/index/signup";
    }

    @GetMapping("/timetable")
    public String timetable(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("timetable", get.getTimetable(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("grade", get.getGrade(id));
        return "page/timetable/index";
    }

    @GetMapping("/account")
    public String account(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("follow_count", get.getFollowCount(id));
        model.addAttribute("following_count", get.getFollowingCount(id));
        model.addAttribute("username", user.getUsername(id));
        model.addAttribute("name", get.getname(id));
        model.addAttribute("grade", get.getGrade(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("manager", get.isManager(id));
        model.addAttribute("teacher", get.isTeacher(id));
        model.addAttribute("seat", get.getSeat(id));
        return "page/account/index";
    }

    @PostMapping("/account/modal")
    public String account_model(Model model, @CookieValue(name="token", required=true) String token, @RequestParam(name="username", required=true) String username) throws IOException {
        String user_id = user.getID(username);
        model.addAttribute("username", username);
        model.addAttribute("name", get.getname(user_id));
        model.addAttribute("follow_count", get.getFollowCount(user_id));
        model.addAttribute("following_count", get.getFollowingCount(user_id));
        return "page/account/user/body";
    }
}
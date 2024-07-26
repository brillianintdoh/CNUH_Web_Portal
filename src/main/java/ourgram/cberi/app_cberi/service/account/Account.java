package ourgram.cberi.app_cberi.service.account;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;

@RestController
@RequestMapping("/account")
public class Account {
    private DBUser user;
    private DBGet get;

    @Autowired
    public Account(DBUser user, DBGet get) {
        this.user = user;
        this.get = get;
    }
    
    @GetMapping("/")
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

    @PostMapping("/modal")
    public String model(Model model, @CookieValue(name="token", required=true) String token, @RequestParam(name="username", required=true) String username) throws IOException {
        String user_id = user.getID(username);
        model.addAttribute("username", username);
        model.addAttribute("name", get.getname(user_id));
        model.addAttribute("follow_count", get.getFollowCount(user_id));
        model.addAttribute("following_count", get.getFollowingCount(user_id));
        return "page/account/user/modal_body";
    }

    @PostMapping("/search")
    public String search(Model model, @CookieValue(name="token", required=true) String token, @RequestParam(name="search_value", required=true) String search_value) {
        return "page/account/user/search";
    }
}
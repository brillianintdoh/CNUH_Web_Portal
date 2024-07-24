package ourgram.cberi.app_cberi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@Controller
public class Main {
    private DBUser dbUser;
    private DBGet get;

    @Autowired
    public Main(DBUser dbUser, DBGet get) {
        this.dbUser = dbUser;
        this.get = get;
    }

    @GetMapping("/")
    public String index(Model model, @CookieValue(name="token", required=false) String token) {
        String id = UserDB.getId(token);
        if(token == null || id == null) {
            return "page/index/login";
        }
        model.addAttribute("username", dbUser.getUsername(id));
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
        model.addAttribute("username", dbUser.getUsername(id));
        model.addAttribute("name", get.getname(id));
        model.addAttribute("grade", get.getGrade(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("manager", get.isManager(id));
        model.addAttribute("teacher", get.isTeacher(id));
        model.addAttribute("seat", get.getSeat(id));
        return "page/account/index";
    }
}
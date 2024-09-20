package ourgram.cberi.app_cberi.service;

import java.time.LocalDate;
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

    @GetMapping("/materials")
    public String timetable(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("timetable", get.getTimetable(id));
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("grade", get.getGrade(id));
        return "page/materials/index";
    }

    @GetMapping("/calendar")
    public String calendar(Model model, @CookieValue(name="token", required=true) String token) {
        LocalDate date = LocalDate.now();
        model.addAttribute("month", date.getMonthValue());
        model.addAttribute("year", date.getYear());
        return "page/calendar/index";
    }

    @GetMapping("/draw")
    public String draw(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        model.addAttribute("class_nm", get.getClassNm(id));
        model.addAttribute("right", get.isTeacher(id) ? true : get.isManager(id));
        return "page/draw/index";
    }
}
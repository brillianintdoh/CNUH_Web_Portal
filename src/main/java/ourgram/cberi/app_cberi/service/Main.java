package ourgram.cberi.app_cberi.service;

import java.time.LocalDate;
import java.util.Map;

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
        Map<String, Object> data = get.getClass_setting(get.getGrade(id), get.getClassNm(id));
        boolean is_edit = false;
        for(String edit_id : data.get("edit_id").toString().split(",")) {
            if(id.equals(edit_id)) {
                is_edit = true;
                break;
            }
        }
        model.addAttribute("data", data);
        model.addAttribute("right", get.isTeacher(id) ? true : get.isManager(id));
        model.addAttribute("is_edit", is_edit);
        return "page/draw/index";
    }
}
package ourgram.cberi.app_cberi.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.security.db.DBGet;

@Controller
@RequestMapping("/draw")
public class Draw {

    @Autowired
    private DBGet get;

    @GetMapping("")
    public String index(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        Map<String, Object> data = get.getClass_setting(get.getGrade(id), get.getClassNm(id));
        model.addAttribute("seating", data.get("seating"));
        return "page/draw/index";
    }

    @GetMapping("/seating")
    public String seating(Model model, @CookieValue(name="token", required=true) String token) {
        String id = UserDB.getId(token);
        Map<String, Object> data = get.getClass_setting(get.getGrade(id), get.getClassNm(id));
        model.addAttribute("data", data);
        model.addAttribute("right", get.isTeacher(id) ? true : get.isManager(id));
        model.addAttribute("is_edit", get.isSeating_edit(id, data.get("edit_id").toString().split(",")));
        return "page/draw/seating/index";
    }
}
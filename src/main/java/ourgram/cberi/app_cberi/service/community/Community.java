package ourgram.cberi.app_cberi.service.community;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ourgram.cberi.app_cberi.security.db.DBGet;

@Controller
@RequestMapping("/community")
public class Community {

    @Autowired
    private DBGet get;

    @GetMapping("")
    public String index(Model model, @CookieValue(name="token", required=true) String token) {
        model.addAttribute("topic", get.getCom_topic());
        return "page/community/index";
    }

    @GetMapping("/topic/{id}")
    public String topic(Model model, @CookieValue(name="token", required=true) String token, @PathVariable String id) {
        return "error";
    }
}
package ourgram.cberi.app_cberi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.security.db.DBEdit;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;

@Controller
@RequestMapping("/service")
public class Login {
    private DBUser user;
    private DBEdit edit;
    private DBGet get;

    @Autowired
    public Login(DBEdit edit, DBGet get, DBUser user) {
        this.user = user;
        this.edit = edit;
        this.get = get;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletResponse res, @RequestParam(name="username", required=true) String username, @RequestParam(name="password", required=true) String password) {
        String result = "404";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");

        if(user.isUser(username)) {
            String id = user.getID(username);
            if(user.isPassword(id, password)) {
                Cookie cookie = new Cookie("token", UserDB.CreateToken(id));
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setMaxAge(3 * 24 * 60 * 60);
                res.addCookie(cookie);
                edit.setLoginJson();
                result = "<button id='login_ok' class='btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm'>로그인 성공</button>";
            }else {
                result = "<button id='login_no' class='btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm'>로그인 실패</button>";
            }
        }else {
            result = "<button id='login_no' class='btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm'>로그인 실패</button>";
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @GetMapping("/log_out")
    public ResponseEntity<String> log_out(HttpServletResponse res, @CookieValue(name="token", required=true) String token) {
        String result = "<script>location.replace('/')</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        UserDB.userRemove(token);
        Cookie cookie = new Cookie("token", "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        res.addCookie(cookie);
        edit.setLoginJson();
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(HttpServletRequest req) {
        String result = "<script>alert('가입 실패 (에러)')</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String confirm_password = req.getParameter("confirm_password");
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String grade = req.getParameter("grade");
        String class_nm = req.getParameter("class_nm");
        String seat = req.getParameter("seat");

        if(password.equalsIgnoreCase(confirm_password) && !grade.equals("null") && !class_nm.equals("null")) {
            if(!get.isUser(username)) {
                user.singup(username, password);
                String id = user.getID(username);
                edit.setSingup(id, name, grade, class_nm, seat, email);
                result = "<script>alert('가입 성공'); location.replace('/');</script>";
            }
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @PostMapping("/teacher/signup")
    public ResponseEntity<String> teacher(HttpServletRequest req, @CookieValue(name="token", required=true) String token) {
        String result = "<script>alert('가입 실패 (에러)')</script>";
        String id = UserDB.getId(token);
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        if(get.isManager(id)) {
            String username = req.getParameter("username");
            String password = req.getParameter("password");
            String name = req.getParameter("name");
            String email = req.getParameter("email");

            if(!get.isUser(username)) {
                user.singup(username, password);
                String teacher_id = user.getID(username);
                edit.setTeacher(teacher_id, name, email);
                result = "<script>alert('가입 성공'); location.replace('/');</script>";
            }
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
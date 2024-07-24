package ourgram.cberi.app_cberi.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import ourgram.cberi.app_cberi.security.db.DBEdit;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@RestController
@RequestMapping("/service/edit")
public class Edit {
    private String[] check = new String[]{"1","2","3","4","5","6","null"};
    private DBUser user;
    private DBEdit edit;
    private DBGet get;

    @Autowired
    public Edit(DBEdit edit, DBUser user, DBGet get) {
        this.user = user;
        this.edit = edit;
        this.get = get;
    }

    @PostMapping("/password")
    public ResponseEntity<String> password(@RequestParam(name="pass", required=true) String pass, @RequestParam(name="pass_new", required=true) String pass_new, @CookieValue(name="token", required=true) String token) {
        String result = "<script>alert('비번 변경 실패'); location.reload();</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        if(user.isPassword(id, pass)) {
            user.setPass(id, pass_new);
            result = "<script>alert('비밀번호 변경 성공'); location.reload(); </script>";
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @PostMapping("/timetable")
    public ResponseEntity<String> timeEdit(HttpServletRequest req, @CookieValue(name="token", required=true) String token) throws IOException {
        String result = "<script>location.reload(); alert('변경 완료')</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        String a = req.getParameter("a");
        String a_class = req.getParameter("a_class");

        String b = req.getParameter("b");
        String b_class = req.getParameter("b_class");

        String c = req.getParameter("c");
        String c_class = req.getParameter("c_class");

        String d = req.getParameter("d");
        String d_class = req.getParameter("d_class");
        List<String> ch = new ArrayList<>(Arrays.asList(check));


        if(get.isTimechck(id, (a+","+a_class), (b+","+b_class), (c+","+c_class), (d+","+d_class)) || !ch.contains(a_class) || !ch.contains(b_class) || !ch.contains(c_class) || !ch.contains(d_class)) {
            result = "<script>alert('에러 발생')</script>";
        }else {
            edit.setTimetable(id, (a+","+a_class), (b+","+b_class), (c+","+c_class), (d+","+d_class));
        }

        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @PostMapping("/account")
    public ResponseEntity<String> account(HttpServletRequest req, @CookieValue(name="token", required=true) String token) {
        String result = "<script>alert('계정 정보 수정 실패'); location.reload();</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        String username = req.getParameter("username");
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String grade = req.getParameter("grade");
        String seat = req.getParameter("seat");
        String password = req.getParameter("password");

        if(username.isEmpty() || name.isEmpty() || email.isEmpty() || grade.isEmpty() || seat.isEmpty()) {
            result = "<script>alert('모든 값을 입력해주세요.'); location.reload(); </script>";
            return new ResponseEntity<>(result, head, HttpStatus.OK);
        }else if(!user.isPassword(id, password)) {
            result = "<script>alert('현재 비밀번호가 틀렸습니다.'); location.reload(); </script>";
            return new ResponseEntity<>(result, head, HttpStatus.OK);
        }

        edit.setSetting(id, name, email, grade, seat);
        user.setUsername(id, username);
        result = "<script>alert('계정 정보 수정 성공'); location.reload(); </script>";
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }

    @PostMapping("/webpush")
    public ResponseEntity<String> webpush(HttpServletRequest req, @CookieValue(name="token", required=true) String token) {
        String result = "<script>alert('웹 푸시 설정 실패'); location.reload();</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type","text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        String news;
        String chat;
        String mission;

        try {
            news = req.getParameter("news");
        } catch(Exception e) {
            news = "0";
        }

        try {
            chat = req.getParameter("chat");
        }catch(Exception e) {
            chat = "0";
        }

        try {
            mission = req.getParameter("mission");
        }catch(Exception e) {
            mission = "0";
        }

        edit.setPushSetting(id, news, chat, mission);
        result = "<script>alert('웹 푸시 설정 성공'); location.reload();</script>";
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
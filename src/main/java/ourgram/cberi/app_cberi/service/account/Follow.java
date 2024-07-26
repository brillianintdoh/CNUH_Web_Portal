package ourgram.cberi.app_cberi.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ourgram.cberi.app_cberi.security.UserDB;
import ourgram.cberi.app_cberi.security.db.DBEdit;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;

@RestController
@RequestMapping("/service")
public class Follow {
    private DBEdit edit;
    private DBUser user;
    private DBGet get;

    @Autowired
    public Follow(DBEdit edit, DBUser user, DBGet get) {
        this.edit = edit;
        this.user = user;
        this.get = get;
    }

    @PostMapping("/follow")
    public ResponseEntity<String> follow(@CookieValue(name="token", required=true) String token, @RequestParam(name="username", required=true) String username) {
        String result = "<script>alert('(에러) 팔로우 실패')</script>";
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "text/html; charset=UTF-8");
        String id = UserDB.getId(token);
        String follow_id = user.getID(username);

        if(!get.isFollow(id, follow_id) && !id.equals(follow_id)) {
            edit.setFollow(id, follow_id);
            result = "<script>alert('팔로우 성공'); location.reload()</script>";
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
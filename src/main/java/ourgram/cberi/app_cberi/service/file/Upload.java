package ourgram.cberi.app_cberi.service.file;

import java.io.File;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@RestController
@RequestMapping("/upload")
public class Upload {
    public static String directory = "/media/wheedo/ubuntu/resources/web/cberi/profile/";
    private JdbcTemplate jdbc;
    private DBUser db;

    @Autowired
    public Upload(JdbcTemplate jdbc, DBUser db) {
        this.jdbc = jdbc;
        this.db = db;
    }

    @PostMapping("/profile")
    public ResponseEntity<String> profile(@RequestParam(name="img_profile", required=true) MultipartFile img, @CookieValue(name="token", required=true) String token) {
        String result = "<script>location.reload()</script>";
        HttpHeaders head = new HttpHeaders();
        String id = UserDB.getId(token);
        head.add("Content-Type","text/html; charset=UTF-8");

        List<String> list = jdbc.queryForList("SELECT user_id FROM profile_img", String.class);
        String path = directory + db.getUsername(id) + ".png";
        try {
            if(list.contains(id)) {
                path = jdbc.queryForObject("SELECT file_path FROM profile_img WHERE user_id=?", String.class, id);
            }else {
                jdbc.update("INSERT INTO profile_img (user_id, file_path) VALUES (?,?)", id, path);
            }
            File file = new File(path);
            img.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
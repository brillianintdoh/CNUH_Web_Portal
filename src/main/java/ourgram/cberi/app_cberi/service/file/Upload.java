package ourgram.cberi.app_cberi.service.file;

import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ourgram.cberi.app_cberi.security.db.DBEdit;
import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@RestController
@RequestMapping("/upload")
public class Upload {
    public static String directory = "/media/wheedo/ubuntu/resources/web/cberi/profile/";
    private DBUser db;
    private DBGet get;
    private DBEdit edit;

    @Autowired
    public Upload(DBGet get, DBUser db, DBEdit edit) {
        this.get = get;
        this.db = db;
        this.edit = edit;
    }

    @PostMapping("/profile")
    public ResponseEntity<String> profile(@RequestParam(name="img_profile", required=true) MultipartFile img, @CookieValue(name="token", required=true) String token) {
        String result = "<script>location.reload()</script>";
        HttpHeaders head = new HttpHeaders();
        String id = UserDB.getId(token);
        head.add("Content-Type","text/html; charset=UTF-8");

        String path = directory + db.getUsername(id) + ".png";
        try {
            if(get.isProfileImg(id)) {
                path = get.getProfilePath(id);
            }else {
                edit.setProfileImg(id, path);
            }
            File file = new File(path);
            img.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(result, head, HttpStatus.OK);
    }
}
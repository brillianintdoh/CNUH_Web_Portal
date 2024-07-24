package ourgram.cberi.app_cberi.service.file;

import java.io.IOException;
import java.nio.file.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ourgram.cberi.app_cberi.security.db.DBUser;
import ourgram.cberi.app_cberi.security.UserDB;

@RestController
public class Download {
    private JdbcTemplate jdbc;
    private ResourceLoader load;
    private DBUser db;

    @Autowired
    public Download(JdbcTemplate jdbc, ResourceLoader load, DBUser db) {
        this.jdbc = jdbc;
        this.load = load;
        this.db = db;
    }

    @GetMapping("/load/profile.png")
    public ResponseEntity<Resource> profile(@CookieValue(name="token", required=true) String token, @RequestParam(name="name", required=false) String username) throws IOException {
        String id;
        if(username == null) {
            id = UserDB.getId(token);
        }else {
            id = db.getID(username);
        }
        HttpHeaders head = new HttpHeaders();
        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM profile_img WHERE user_id=?", Integer.class, id);

        if(count > 0) {
            String path = jdbc.queryForObject("SELECT file_path FROM profile_img WHERE user_id=?", String.class, id);
            Resource file = load.getResource("file:" + path);
            head.add("Content-Type", Files.probeContentType(file.getFile().toPath()));
            return new ResponseEntity<>(file, head, HttpStatus.OK);
        } else {
            Resource default_file = load.getResource("file:" + Upload.directory+"default.png");
            head.add("Content-Type", Files.probeContentType(default_file.getFile().toPath()));
            return new ResponseEntity<>(default_file, head, HttpStatus.OK);
        }
    }
}
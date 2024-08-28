package ourgram.cberi.app_cberi.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import ourgram.cberi.app_cberi.ServletData;

@RestController
@RequestMapping("/service")
public class SchoolData {

    @Autowired
    private ServletData servlet_db;

    @PostMapping("/timetable")
    public ResponseEntity<String> timetable(HttpServletRequest req) throws IOException {
        StringBuilder result = new StringBuilder();
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "application/json; charset=UTF-8");
        LocalDate now = LocalDate.now();
        String sem = req.getParameter("sem");
        String grade = req.getParameter("grade");
        String[] yaer = getYear();

        String parame = "?KEY="+servlet_db.getApiKey()+"&Type=json&pIndex=1&pSize=300&ATPT_OFCDC_SC_CODE=M10&SD_SCHUL_CODE=7003892&AY="+now.getYear()+"&GRADE="+grade+"&SEM="+sem+"&TI_FROM_YMD="+yaer[0]+"&TI_TO_YMD="+yaer[1];
        URL url = new URL("https://open.neis.go.kr/hub/hisTimetable"+parame);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while((line = reader.readLine()) != null) {
            result.append(line);
        }
        reader.close();

        return new ResponseEntity<>(result.toString(), head, HttpStatus.OK);
    }

    @PostMapping("/meals")
    public ResponseEntity<String> meals() throws IOException {
        StringBuilder result = new StringBuilder();
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "application/json; charset=UTF-8");
        String[] yaer = getYear();

        String parame = "?KEY="+servlet_db.getApiKey()+"&Type=json&pIndex=1&pSize=300&ATPT_OFCDC_SC_CODE=M10&SD_SCHUL_CODE=7003892&MLSV_FROM_YMD="+yaer[0]+"&MLSV_TO_YMD="+yaer[1];
        URL url = new URL("https://open.neis.go.kr/hub/mealServiceDietInfo"+parame);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while((line = reader.readLine()) != null) {
            result.append(line);
        }
        reader.close();

        return new ResponseEntity<>(result.toString(), head, HttpStatus.OK);
    }

    private String[] getYear() {
        LocalDate now = LocalDate.now();
        int week = now.getDayOfWeek().getValue();
        int month = now.getMonthValue();
        int start_day = (now.getDayOfMonth() - week)+1;
        int end_day = now.getDayOfMonth()+(5 - week);
        String dayIs = "";
        String monthIS = "";
        if(month < 10) {
            monthIS = "0";
        }
        if(start_day < 10) {
            dayIs = "0";
        }

        String startYear = now.getYear() + ""+ monthIS + month + "" + dayIs + start_day;
        if(end_day >= 10) {
            dayIs = "";
        }
        String endYear = now.getYear() + "" + monthIS + month + "" + dayIs + (now.getDayOfMonth()+(5 - week));

        return new String[]{startYear, endYear};
    }
}
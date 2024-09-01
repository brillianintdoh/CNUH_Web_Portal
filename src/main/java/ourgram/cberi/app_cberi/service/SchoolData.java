package ourgram.cberi.app_cberi.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.YearMonth;
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
        StringBuilder json = new StringBuilder();
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "application/json; charset=UTF-8");

        URL url = new URL("http://comci.net:4082/36179_T?NzM2MjlfMjcwMjFfMF8x");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while((line = reader.readLine()) != null) {
            json.append(line);
        }
        reader.close();

        String result = json.toString();
        result = result.substring(0, result.lastIndexOf("}") + 1);

        return new ResponseEntity<>(result, head, HttpStatus.OK);
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
        int start_day, end_day;
        if(week > 5) {
            start_day = now.getDayOfMonth() + (7 % (week-1));
            end_day = now.getDayOfMonth() + (4 + (7 % (week-1)));
        }else {
            start_day = (now.getDayOfMonth() - week)+1;
            end_day = now.getDayOfMonth()+(5 - week);
        }

        int length = YearMonth.now().lengthOfMonth();
        if(start_day > length) {
            month++;
            start_day = start_day - length;
        }

        if(end_day > length) {
            end_day = end_day - length;
        }

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
        String endYear = now.getYear() + "" + monthIS + month + "" + dayIs + end_day;

        return new String[]{startYear, endYear};
    }
}
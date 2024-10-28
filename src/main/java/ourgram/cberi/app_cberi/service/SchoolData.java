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

    @PostMapping("/calendar")
    public ResponseEntity<String> calendar() throws IOException {
        StringBuilder result = new StringBuilder();
        HttpHeaders head = new HttpHeaders();
        head.add("Content-Type", "application/json; charset=UTF-8");
        YearMonth year = YearMonth.now();

        String parame = "?KEY="+servlet_db.getApiKey()+"&Type=json&pIndex=1&pSize=500&ATPT_OFCDC_SC_CODE=M10&SD_SCHUL_CODE=7003892&AA_FROM_YMD="+year.getYear()+"0101&AA_TO_YMD="+year.getYear()+"1231";
        URL url = new URL("https://open.neis.go.kr/hub/SchoolSchedule"+parame);
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
        LocalDate start = LocalDate.now();
        int week = start.getDayOfWeek().getValue();
        start = start.minusDays(week - 1);
        LocalDate end = start.plusDays(7);
        int month = start.getMonthValue();
        int start_day = start.getDayOfMonth();
        int end_day = end.getDayOfMonth();
        String monthIS = month < 10 ? "0" : "";
        String dayIs = start_day < 10 ? "0" : "";

        String startYear = start.getYear() + ""+ monthIS + month + "" + dayIs + start_day;

        dayIs = end_day < 10 ? "0" : "";
        month = end.getMonthValue();
        String endYear = end.getYear() + ""+ monthIS + month + "" + dayIs + end_day;

        return new String[]{startYear, endYear};
    }
}
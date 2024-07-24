package ourgram.cberi.app_cberi.service.chat;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import ourgram.cberi.app_cberi.security.db.DBGet;
import ourgram.cberi.app_cberi.security.db.DBUser;

@Component
public class Websocket extends TextWebSocketHandler {
    private Set<WebSocketSession> client = Collections.synchronizedSet(new HashSet<>());
    private DBGet get;
    private DBUser user;

    @Autowired
    public Websocket(DBGet get, DBUser user) {
        this.get = get;
        this.user = user;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession sess) {
        client.add(sess);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession sess, CloseStatus status) {
        client.remove(sess);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws IOException {
        String mess = msg.getPayload();
        Map<String, Object> htmx = new GsonJsonParser().parseMap(mess);
        String username = (String) htmx.get("username");
        String follow_name = (String) htmx.get("follow_name");

        String id = user.getID(username);
        String follow_id = user.getID(follow_name);
        if(get.isFollow(id, follow_id)) {
            for(WebSocketSession clients : client) {
                clients.sendMessage(new TextMessage("{\"username\":\"" + username + "\", \"getName\":\"" + follow_name + "\"}"));
            }
        }
    }
}
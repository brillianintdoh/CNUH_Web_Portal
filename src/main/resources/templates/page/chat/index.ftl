<!doctype html>
<html>
    <head>
        <title> ${follow_name}님과의 채팅 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <script src="/js/boot.js"></script>
        <link rel="icon" href="/img/chat.png">
        <link rel="stylesheet" href="/css/chat.css">
    </head>
    <body>
        <main id="chat_page" hx-ext="ws" ws-connect="/chat/ws">
            <div class="chat-container">
                <div class="chat-header">
                    <h5 class="mb-0"> ${follow_name}님과의 채팅 </h5>
                </div>
                <div class="chat-body">
                    <div class="message-container" hx-post="/chat/load" hx-include="[name=username],[name=follow_name]" hx-trigger="load">
                    </div>
                </div>
                <div class="chat-footer">
                    <form class="input-group" ws-send>
                        <input type="text" id="input_mess" name="message" class="form-control" placeholder="메시지를 입력하세요" autocomplete="off">
                        <input type="hidden" name="username" id="username" value="${username}">
                        <input type="hidden" name="follow_name" id="follow_name" value="${follow_name}">
                        <button class="btn btn-primary" type="submit">전송</button>
                    </form>
                </div>
            </div>
        </main>
        <button id="chat_reload" hx-post="/chat/load" hx-include="[name=username],[name=follow_name]" hx-target=".message-container" style="display:none;"></button>
        <script src="/js/index.js"></script>
    </body>
</html>
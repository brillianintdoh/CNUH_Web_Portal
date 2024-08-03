<#if list?has_content>
    <#list list as chat>
        <#if me[0] == chat.sender_id?string>
            <#assign username = me[1] />
            <#assign mess_class = "sent">
        <#elseif follow[0] == chat.sender_id?string>
            <#assign username = follow[1] />
            <#assign mess_class = "received">
        <#else>
            <#assign username = "Unknown" />
            <#assign mess_class = "err">
        </#if>
        <div class="message-group ${mess_class}">
            <div class="sender-name">${username}</div>
            <div class="message-wrapper">
                <#if me[0] == chat.sender_id?string>
                    <span class="message-time">${chat.time_at}</span>
                    <pre class="message message-${mess_class}">${chat.content?html}</pre>
                <#else>
                    <pre class="message message-${mess_class}">${chat.content?html}</pre>
                    <span class="message-time">${chat.time_at}</span>
                </#if>
            </div>
        </div>
    </#list>
</#if>
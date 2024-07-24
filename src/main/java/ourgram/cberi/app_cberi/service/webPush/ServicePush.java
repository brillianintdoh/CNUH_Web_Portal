package ourgram.cberi.app_cberi.service.webPush;

import java.security.GeneralSecurityException;
import java.security.Security;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import nl.martijndwars.webpush.PushService;

public class ServicePush {
    private static PushService push;

    public static void init(String publicKey, String privateKey, String gcmKey) {
        try {
            Security.addProvider(new BouncyCastleProvider());
            push = new PushService(publicKey, privateKey).setGcmApiKey(gcmKey);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }
    }

    public static PushService get() {
        return push;
    }
}
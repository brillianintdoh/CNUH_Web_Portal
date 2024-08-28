package ourgram.cberi.app_cberi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ServletData {

    @Value("${apikey}")
    private String apiKey;

    @Value("${public_key}")
    private String public_key;

    @Value("${private_key}")
    private String private_key;

    @Value("${gcm_key}")
    private String gcm_key;

    public String getApiKey() {
        return apiKey;
    }

    public String getPublicKey() {
        return public_key;
    }

    public String getPrivateKey() {
        return private_key;
    }

    public String getGcmKey() {
        return gcm_key;
    }
}
package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class GiroApi implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String clientId;
    private String clientSecret;
    private String accessToken;
    private String tokenType;
    private Long expiresIn;
    private String expiresDe;
    private String scope;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getExpiresDe() {
        return expiresDe;
    }

    public void setExpiresDe(String expiresDe) {
        this.expiresDe = expiresDe;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @Override
    public String toString() {
        return "GiroApi{" +
                "clientId='" + clientId + '\'' +
                ", clientSecret='" + clientSecret + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", expiresIn=" + expiresIn +
                ", expiresDe='" + expiresDe + '\'' +
                ", scope='" + scope + '\'' +
                '}';
    }
}

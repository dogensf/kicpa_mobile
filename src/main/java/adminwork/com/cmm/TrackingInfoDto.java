package adminwork.com.cmm;

public class TrackingInfoDto {

	private String result;

	
	//token 
	private String access_token;
	private String token_type;
	private String expires_in;
	private String scope;
	private String ptco_code;
	//
	
	
	
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public String getToken_type() {
		return token_type;
	}

	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}

	public String getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(String expires_in) {
		this.expires_in = expires_in;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getPtco_code() {
		return ptco_code;
	}

	public void setPtco_code(String ptco_code) {
		this.ptco_code = ptco_code;
	}
	
	
	
	
}

package adminwork.com.cmm.web;

import java.nio.charset.Charset;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import adminwork.com.cmm.service.JiroService;


@Controller
public class JiroController {

	
	@Resource(name = "JiroService")
	private JiroService jiroService;
	
	
	
	@RequestMapping("/cmm/testToken.do")
	public void testToken() throws Exception{
		
		String baseUrl = "https://testapi.giro.or.kr/oauth/2.0/token";

		//HEADER 셋팅
		HttpHeaders headers = new HttpHeaders();		
			headers.set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
		 
		// 파라미터 세팅
		MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
			parameters.add("client_id", "a53bee4b-e9bd-425a-ba89-da38dc27d7d4");
			parameters.add("client_secret", "8f8f9bfb-7428-431f-800d-389a97ad73df");
			parameters.add("scope", "bill");
			parameters.add("grant_type", "client_credentials");			
		
		HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(parameters, headers);		
		
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        	factory.setConnectTimeout(25000); // api 호출 타임아웃
        	factory.setReadTimeout(25000);   // api 읽기 타임아웃

		RestTemplate template = new RestTemplate(factory);
		
		//Method POST 호출 
		ResponseEntity<String> response = template.postForEntity(baseUrl, entity, String.class);
		//JSON 파싱
		JSONParser jsonParser = new JSONParser(); 
		JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());	
		
		System.out.println("1.::access_token:: "+json.get("access_token").toString());		
		
		System.out.println("----"+response);
		System.out.println("----"+response.getHeaders());
		System.out.println("----"+response.getBody());
		System.out.println("----"+response.toString());
				
	}
	
	@RequestMapping("/cmm/organizations.do")
	public void organizations() throws Exception{
		
		String baseUrl = "https://testapi.giro.or.kr/v1/organizations";

		//HEADER 셋팅
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));		 
		headers.set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJiaWxsIl0sImV4cCI6MTY0NDU3NjQxMywianRpIjoiZjNlYjhiYjktMWI2Yy00NGY3LTlkZTEtMDZmMjU1MzYyNzE2IiwiY2xpZW50X2lkIjoiYTUzYmVlNGItZTliZC00MjVhLWJhODktZGEzOGRjMjdkN2Q0In0.2kXVPZDMHBMw_gYuckqZCv6Slr5MBZEjtZOrQ58cMQI");
		
		//파라미터 셋팅
		UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(baseUrl)
		                .queryParam("ptco_code", "951012534")
		                .queryParam("req_page", "1")
		                .queryParam("page_size", "100")
		                .build(false);  // 인코딩 하지않음
					 
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(5000); // api 호출 타임아웃
        factory.setReadTimeout(5000);   // api 읽기 타임아웃

        RestTemplate template = new RestTemplate(factory);
		
        //GET 방식 호출 
        ResponseEntity<String> response = template.exchange(uriComponents.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        
		JSONParser jsonParser = new JSONParser(); 
		JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());				
		JSONArray docuArray = (JSONArray) json.get("org_list");
		//documents만 뽑아오고  
		for(Object o : docuArray) {
			JSONObject docuObject = (JSONObject) o;
			System.out.println("2:: "+docuObject.get("cls_code").toString());
		}
		 
		//			         
		System.out.println("1:: "+json.get("rsp_code").toString());		
		System.out.println("----"+response);
		System.out.println("----"+response.getBody());
		System.out.println("----"+response.toString());

		
	}
	
	
	@RequestMapping("/cmm/testEai.do")
	public void testEai() throws Exception{
		
		String baseUrl = "http://localhost:8081/eai/select";

		//HEADER 셋팅
		HttpHeaders headers = new HttpHeaders();		
			headers.set("Content-Type","text/html; charset=UTF-8");
			//headers.setContentType(MediaType.APPLICATION_XML);
		 
		// 파라미터 세팅
		MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
			parameters.add("name", "search");
			parameters.add("q", "구글검색");
			
			JSONObject infos = new JSONObject();
			infos.put("name", "search");			
			infos.put("q", "구글검색");
			
				
		
		HttpEntity<String> entity = new HttpEntity<>(infos.toString(), headers);		
		
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        	factory.setConnectTimeout(25000); // api 호출 타임아웃
        	factory.setReadTimeout(25000);   // api 읽기 타임아웃

		RestTemplate template = new RestTemplate(factory);
		
		//Method POST 호출 
		ResponseEntity<String> response = template.postForEntity(baseUrl, entity, String.class);
		//JSON 파싱
		JSONParser jsonParser = new JSONParser(); 
		//JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());	
		
		//System.out.println("1.::access_token:: "+json.get("access_token").toString());		
		
		System.out.println("----"+response);
		System.out.println("----"+response.getHeaders());
		System.out.println("----"+response.getBody());
		System.out.println("----"+response.toString());
				
	}
	
	@RequestMapping("/cmm/doToken.do")
	public void doToken() throws Exception{
		
		String baseUrl = "http://localhost:8081/eai/doToken";

		//HEADER 셋팅
		HttpHeaders headers = new HttpHeaders();		
			headers.set("Content-Type","application/json; charset=UTF-8");
			//headers.setContentType(MediaType.APPLICATION_XML);
		 
		// 파라미터 세팅

			
		JSONObject infos = new JSONObject();
			infos.put("name", "doToken");
			infos.put("uri", "https://testapi.giro.or.kr/oauth/2.0/token");
			infos.put("contentType", "application/x-www-form-urlencoded; charset=UTF-8");
		
		HttpEntity<String> entity = new HttpEntity<>(infos.toString(), headers);		
		
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        	factory.setConnectTimeout(25000); // api 호출 타임아웃
        	factory.setReadTimeout(25000);   // api 읽기 타임아웃

		RestTemplate template = new RestTemplate(factory);
		
		//Method POST 호출 
		ResponseEntity<String> response = template.postForEntity(baseUrl, entity, String.class);
		//JSON 파싱
		JSONParser jsonParser = new JSONParser(); 
		//JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());	
		
		//System.out.println("1.::access_token:: "+json.get("access_token").toString());		
		
		System.out.println("----"+response);
		System.out.println("----"+response.getHeaders());
		System.out.println("----"+response.getBody());
		System.out.println("----"+response.toString());
				
	}
	
	@RequestMapping("/cmm/testEai1.do")
	public void testEai1() throws Exception{
		
		String baseUrl = "http://localhost:8081/eai/doPost";

		//HEADER 셋팅
		HttpHeaders headers = new HttpHeaders();		
			headers.set("Content-Type","application/json; charset=UTF-8");
			//headers.setContentType(MediaType.APPLICATION_XML);
		 
		// 파라미터 세팅
		MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
			parameters.add("name", "doPost");
			parameters.add("q", "구글검색");
			
			JSONObject infos = new JSONObject();
			infos.put("name", "doPost");
			
			infos.put("q", "구글검색");
			infos.put("uri", "https://testapi.giro.or.kr/oauth/2.0/token");
			infos.put("contentType", "application/x-www-form-urlencoded; charset=UTF-8");
			
				JSONObject params = new JSONObject();				
				params.put("client_id", "a53bee4b-e9bd-425a-ba89-da38dc27d7d4");
				params.put("client_secret", "8f8f9bfb-7428-431f-800d-389a97ad73df");
				params.put("scope", "bill");
				params.put("grant_type", "client_credentials");
		    infos.put("params", params.toString());		
		
		HttpEntity<String> entity = new HttpEntity<>(infos.toString(), headers);		
		
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        	factory.setConnectTimeout(25000); // api 호출 타임아웃
        	factory.setReadTimeout(25000);   // api 읽기 타임아웃

		RestTemplate template = new RestTemplate(factory);
		
		//Method POST 호출 
		ResponseEntity<String> response = template.postForEntity(baseUrl, entity, String.class);
		//JSON 파싱
		JSONParser jsonParser = new JSONParser(); 
		//JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());	
		
		//System.out.println("1.::access_token:: "+json.get("access_token").toString());		
		
		System.out.println("----"+response);
		System.out.println("----"+response.getHeaders());
		System.out.println("----"+response.getBody());
		System.out.println("----"+response.toString());
				
	}
	
}

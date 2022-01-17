package adminwork.kicpa.dues.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.annotation.Resource;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import adminwork.kicpa.dues.service.DeusApiService;
import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroApi;
import adminwork.kicpa.dues.service.GiroApiLog;
import adminwork.let.utl.fcc.service.DateUtil;
import adminwork.let.utl.fcc.service.StringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("DuesApiService")
public class DuesApiServiceImpl extends EgovAbstractServiceImpl implements DeusApiService{

	@Resource(name="DuesDAO")
	private DuesDAO duesDAO;
	
	public String createGiroApiToken() throws Exception {
        String baseUrl = "http://localhost:8081/eai/doToken";

        GiroApi giroApi = duesDAO.selectGiroApi();

        if(giroApi == null) {
            GiroApiLog giroApiLog = new GiroApiLog();
            String access_token = "";

            try {
                JSONObject json = callGiroApi("doToken", "https://testapi.giro.or.kr/oauth/2.0/token", "" , "");

                String rsp_code = (String) json.get("rsp_code");
                String rsp_msg = (String) json.get("rsp_msg");

                if(StringUtil.isEmpty(rsp_code)) {

                    String jsonBodyStr = (String) json.get("body");
                    JSONParser jsonParser = new JSONParser();

                    JSONObject jsonBody = (JSONObject) jsonParser.parse(jsonBodyStr);

                    access_token = (String) jsonBody.get("access_token");
                    Long expires_in = Optional.ofNullable(jsonBody.get("expires_in"))
                            .map(o -> Long.valueOf( (StringUtil.isEmpty(String.valueOf(o)) ? "0" : String.valueOf(o)) )).orElse(0L);

                    giroApi = new GiroApi();

                    giroApi.setAccessToken(access_token);
                    giroApi.setTokenType((String) jsonBody.get("token_type"));
                    giroApi.setExpiresIn(expires_in);
                    giroApi.setScope((String) jsonBody.get("scope"));

                    duesDAO.updateGiroApi(giroApi);
                }

                try {
                    giroApiLog.setLog(json.toString());
                    duesDAO.insertGiroApiLog(giroApiLog);
                }catch(Exception e) {

                }

            }catch(Exception e) {
                giroApiLog.setLog("doToken : https://testapi.giro.or.kr/oauth/2.0/token =>  message : " + e.getMessage());
                duesDAO.insertGiroApiLog(giroApiLog);
            }

            return access_token;
        }

        return giroApi.getAccessToken();
    }
	
	
	@Override
    public boolean cancelNoticeGiro(List<Dues> duesVo) throws Exception {

        String accessToken = createGiroApiToken();
        JSONParser jsonParser = new JSONParser();
        boolean success = true;

        ArrayList<GiroApiLog> giroApiLogs = new ArrayList<>();

        for(Dues vo : duesVo) {
            JSONObject params = new JSONObject();
            if("N".equals(vo.getNtic_cancl_flag())) {
            	params.put("ptco_code" , "951012534"); //제휴사 코드
                params.put("cls_code" , "90"); //고지내역 이용기관 분류코드
                params.put("giro_no" , "7613018"); //고지내역 이용기관 지로번호
                params.put("epay_no" , vo.getEpay_no()); //전자납부번호 (“-”제외)
                params.put("pay_yymm_seq" , vo.getPay_yymm_seq()); //납부년월(회)차 (YYYYMM)
                params.put("noti_issu_type" , vo.getNoti_issu_type()); //고지(발행)형태
                params.put("etc_type_code" , vo.getEtc_type_code()); //기타 구분코드

                try {
                    JSONObject json = callGiroApi("doPost", "https://testapi.giro.or.kr/v1/bills/giro/cancel", params.toString() ,accessToken);
                    JSONObject jsonBody = (JSONObject) jsonParser.parse((String)json.get("body"));

                    String rsp_code = (String) jsonBody.get("rsp_code");
                    String rsp_msg = (String) jsonBody.get("rsp_msg");

                    if("A0000".equals(rsp_code)) {
                        vo.setNtic_cancl_flag("Y");
                        duesDAO.updateGiroNtic(vo);
                    }else {
                        success = false;                       
                    }

                    try {
                        giroApiLogs.add(addLog(jsonBody.toString()
                                ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                    }catch(Exception e) {
                    	success = false;
                    }
                }catch(Exception e) {
                	try {
                		giroApiLogs.add(addLog("doPost : https://testapi.giro.or.kr/v1/bills/giro/cancel => param : " + params.toString() + "  token : " + accessToken + " message : " + e.getMessage()
                        ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                	}catch (Exception e1) {
						// TODO: handle exception
                		success = false;
					}
                    
                }
            }
        }

        try {
        	duesDAO.insertGiroApiLogAll(giroApiLogs);
        }catch (Exception e) {
        	success = false;
        }

        return success;
    }
	
	
	@Override
    public boolean createNoticeGiro(List<Dues> duesVo) throws Exception {

        String accessToken = createGiroApiToken();
        JSONParser jsonParser = new JSONParser();
        boolean success = true;


        ArrayList<GiroApiLog> giroApiLogs = new ArrayList<>();

        for(Dues vo : duesVo) {

            JSONObject params = new JSONObject();

           
            if("N".equals(vo.getNtic_flag())) {

                params.put("ptco_code" , "951012534"); //제휴사 코드
                params.put("cls_code" , "90"); //고지내역 이용기관 분류코드
                params.put("giro_no" , "7613018"); //고지내역 이용기관 지로번호
                params.put("cust_inqr_no" , vo.getGiro_cd()); //고객조회번호
                params.put("dudt_in_amt" , String.valueOf(vo.getDudt_in_amt())); //납기내 금액
                params.put("dudt_aft_amt" , String.valueOf(vo.getDudt_aft_amt())); //납기후 금액
                params.put("data_form_type" , "A"); //데이터 형식구분
                params.put("dudt" , vo.getDudt()); //납기일 (YYYYMMDD)
                params.put("noti_dl_dt" , vo.getNoti_dl_dt()); //고지마감일 (YYYYMMDD)
                params.put("epay_no" , vo.getEpay_no()); //전자납부번호 (“-”제외)
                params.put("noti_issu_type" , vo.getNoti_issu_type()); //고지(발행)형태
                params.put("etc_type_code" , vo.getEtc_type_code()); //기타 구분코드
                params.put("name" , vo.getName()); //납부자 성명
                params.put("pay_yymm_seq" , vo.getPay_yymm_seq()); //납부년월(회)차 (YYYYMM)
                params.put("pay_prrt_rank" , vo.getPay_prrt_rank()); //납부우선순위
                //params.put("etc_info_ttl" , giroNtic.getEtcInfoTtl()); //기타고지정보 제목
                //params.put("etc_info_cnte" , giroNtic.getEtcInfoCnte()); //기타고지정보 내용

                try {
                    JSONObject json = callGiroApi("doPost", "https://testapi.giro.or.kr/v1/bills/giro", params.toString() ,accessToken);
                    JSONObject jsonBody = (JSONObject) jsonParser.parse((String)json.get("body"));

                    String rsp_code = (String) jsonBody.get("rsp_code");
                    String rsp_msg = (String) jsonBody.get("rsp_msg");
                    System.out.println("=================================지로 생성 결과 :: "+ (String) jsonBody.get("rsp_msg"));
                    if("A0000".equals(rsp_code)) {
                        vo.setNtic_flag("Y");
                        vo.setNtic_cancl_flag("N");
                        duesDAO.updateGiroNtic(vo);
                        System.out.println("=====================================지로 생성 :: "+ params.toString());
                        System.out.println("=================================지로 생성 결과1 :: "+ (String) jsonBody.get("rsp_msg"));
                        
                    }else {
                        success = false;
                    }

                    try {
                        giroApiLogs.add(addLog(jsonBody.toString()
                                ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                    }catch(Exception e) {

                    }
                }catch(Exception e) {
                    giroApiLogs.add(addLog("doPost : https://testapi.giro.or.kr/v1/bills/giro => param : " + params.toString() + "  token : " + accessToken + " message : " + e.getMessage()
                            ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                }
            }
        }

        try {
        	duesDAO.insertGiroApiLogAll(giroApiLogs);
        }catch (Exception e) {

        }

        return success;
    }
	
    @SuppressWarnings("unchecked")
	@Override
    public Dues createNoticeGiroLink(Dues vo) throws Exception {
    	Dues rt = new Dues();
    	String accessToken = createGiroApiToken();
        JSONParser jsonParser = new JSONParser();
        boolean success = true;
        String linkUrl = "";


        ArrayList<GiroApiLog> giroApiLogs = new ArrayList<>();

            JSONObject params = new JSONObject();

           
            if("Y".equals(vo.getNtic_flag())) {
            	
                params.put("ptco_code" , "951012534"); //제휴사 코드
                params.put("org_tran_id" , "951012534"+"T"+DateUtil.getCurrentDateTime()+"C"+vo.getCust_inqr_no().substring(vo.getCust_inqr_no().length()-5,vo.getCust_inqr_no().length())); // 제휴사 거래고유번호
                params.put("cls_code" , "90"); //고지내역 이용기관 분류코드
                params.put("giro_no" , "7613018"); //고지내역 이용기관 지로번호
                params.put("pay_meth_type" , "Q"); //고지내역 이용기관 지로번호
                params.put("epay_no" , vo.getEpay_no()); //전자납부번호 (“-”제외)
                params.put("pay_yymm" , vo.getPay_yymm_seq()); //납부년월(회)차 (YYYYMM)
                params.put("noti_issu_type" , vo.getNoti_issu_type()); //고지(발행)형태
                params.put("etc_type_code" , vo.getEtc_type_code()); //기타 구분코드
                

                try {
                	System.out.println("============ link ::: "+ params.toString());
                    JSONObject json = callGiroApi("doPost", "https://testapi.giro.or.kr/v1/payments/link-pay-url", params.toString() ,accessToken);
                    JSONObject jsonBody = (JSONObject) jsonParser.parse((String)json.get("body"));

                    String rsp_code = (String) jsonBody.get("rsp_code");
                    String rsp_msg = (String) jsonBody.get("rsp_msg");                    
                    String org_tran_id = (String) jsonBody.get("org_tran_id");
                    System.out.println("============ link ::: "+ rsp_msg);
                    if("A0000".equals(rsp_code)) { 
                    	linkUrl = (String) jsonBody.get("link_pay_url");
                        vo.setOrg_tran_id(org_tran_id);
                        duesDAO.updateGiroNtic(vo);
                        vo.setLinkUrl(linkUrl);
                        vo.setOrg_tran_id(org_tran_id);                        
                    }else {
                        success = false;
                    }

                    try {
                        giroApiLogs.add(addLog(jsonBody.toString()
                                ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                    }catch(Exception e) {

                    }
                }catch(Exception e) {
                    giroApiLogs.add(addLog("doPost : https://testapi.giro.or.kr/v1/payments/link-pay-url => param : " + params.toString() + "  token : " + accessToken + " message : " + e.getMessage()
                            ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                }
            }
        

        try {
        	duesDAO.insertGiroApiLogAll(giroApiLogs);
        }catch (Exception e) {

        }

        return vo;
    }
    
    
    
    @Override
    public boolean giroPayments(DuesVO vo) throws Exception {

        String accessToken = createGiroApiToken();
        JSONParser jsonParser = new JSONParser();
        boolean success = true;


        ArrayList<GiroApiLog> giroApiLogs = new ArrayList<>();


            JSONObject params = new JSONObject();

                params.put("ptco_code" , "951012534"); //제휴사 코드
                params.put("org_tran_id" , vo.getOrg_tran_id()); //
                

                try {
                    JSONObject json = callGiroApi("doGet", "https://testapi.giro.or.kr/v1/payments", params.toString() ,accessToken);
                    JSONObject jsonBody = (JSONObject) jsonParser.parse((String)json.get("body"));

                    String rsp_code = (String) jsonBody.get("rsp_code");
                    String rsp_msg = (String) jsonBody.get("rsp_msg");

                    if("A0000".equals(rsp_code)) {
                       /* vo.setNtic_flag("Y");
                        vo.setNtic_cancl_flag("N");
                        duesDAO.updateGiroNtic(vo);*/
                    }else {
                        success = false;
                    }

                    try {
                        giroApiLogs.add(addLog(jsonBody.toString()
                                ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                    }catch(Exception e) {

                    }
                }catch(Exception e) {
                    giroApiLogs.add(addLog("doPost : https://testapi.giro.or.kr/v1/payments => param : " + params.toString() + "  token : " + accessToken + " message : " + e.getMessage()
                            ,vo.getEpay_no(),vo.getGiro_cd(),vo.getEtc_type_code()));
                }

        try {
        	duesDAO.insertGiroApiLogAll(giroApiLogs);
        }catch (Exception e) {

        }

        return success;
    }
	
	private static JSONObject callGiroApi(String callType , String uri , String params, String accessToken) throws Exception {

        String baseUrl = "http://localhost:8081/eai/" + callType;

        //HEADER 셋팅
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type","application/json; charset=UTF-8");

        JSONObject infos = new JSONObject();
        infos.put("name", callType);
        infos.put("uri", uri);
        infos.put("contentType", "application/x-www-form-urlencoded; charset=UTF-8");

        if(!StringUtil.isEmpty(accessToken)) {
            infos.put("authorization","Bearer " + accessToken);
        }

        if(!StringUtil.isEmpty(params)) {
            infos.put("params", params);
        }

        HttpEntity<String> entity = new HttpEntity<>(infos.toString(), headers);

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(25000); // api 호출 타임아웃
        factory.setReadTimeout(25000);   // api 읽기 타임아웃

        RestTemplate template = new RestTemplate(factory);

        //Method POST 호출
        ResponseEntity<String> response = template.postForEntity(baseUrl, entity, String.class);
        //JSON 파싱
        JSONParser jsonParser = new JSONParser();

        JSONObject json = (JSONObject) jsonParser.parse(response.getBody().toString());

        return json;
    }
	
	
	
	
	
    private GiroApiLog addLog(String log,String epayNo,String giroCd,String etcTypeCode) throws Exception{
        GiroApiLog giroApiLog = new GiroApiLog();

        giroApiLog.setEpayNo(epayNo);
        giroApiLog.setGiroCd(giroCd);
        giroApiLog.setEtcTypeCode(etcTypeCode);
        giroApiLog.setLogTm(getLogTime());
        giroApiLog.setLog(log);

        return giroApiLog;
    }
    
    private String getLogTime() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSSSSS", Locale.ENGLISH);

        Calendar cal = Calendar.getInstance();
        return sdf.format(cal.getTimeInMillis());
    }
}

package adminwork.com.cmm;

import java.io.Serializable;

/**
 * @Class Name : LoginVO.java
 * @Description : Login VO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.03.03    박지욱          최초 생성
 *
 *  @author 공통서비스 개발팀 박지욱
 *  @since 2009.03.03
 *  @version 1.0
 *  @see
 *  
 */
public class LoginVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8274004534207618049L;
	
	/** 아이디 */
	private String id;
	/** 이름 */
	private String name;
	/** 주민등록번호 */
	private String ihidNum;
	/** 이메일주소 */
	private String email;
	/** 비밀번호 */
	private String password;
	/** 비밀번호 힌트 */
	private String passwordHint;
	/** 비밀번호 정답 */
	private String passwordCnsr;
	/** 사용자구분 */
	private String userSe;
	/** 조직(부서)ID */
	private String orgnztId;
	/** 조직(부서)명 */
	private String orgnztNm;
	/** 고유아이디 */
	private String uniqId;
	/** 로그인 후 이동할 페이지 */
	private String url;
	/** 사용자 IP정보 */
	private String ip;
	/** GPKI인증 DN */
	private String dn;
	/** 사번 */
	private String empId;
	
	private String author;
	

	private String aima_emp_id;
	private String aima_dept_pcode;
	private String aima_dept_code;
	private String aima_dept_pname;
	private String aima_dept_name;
	private int aima_dept_ord;
	private String aima_posi_code;
	private String aima_posi_name;
	private String aima_posi_rcode;
	private String aima_posi_rname;
	private String aima_kor_nm;
	private String aima_eng_nm;
	private String aima_chi_nm;
	private String aima_psl_id;
	private String aima_birth;
	private int aima_sex;
	private String aima_enter_dt;
	private String aima_retire_dt;
	private String aima_work_gubn;
	private String aima_zip;
	private String aima_add1;
	private String aima_add2;
	private String aima_tel;
	private String aima_mobile;
	private String aima_e_mail;
	private String aima_off_tel;
	private String aima_fax;
	private int aima_eap_ord;
	private String aima_dept2_pcode;
	private String aima_dept2_code;
	private String aima_dept2_pname;
	private String aima_dept2_name;
	private int aima_dept2_ord;
	
	
	private String imi_login_id;
	private String apma_emp_id;
	private String apma_kor_name;
	
	private String giroPin;
	
	
	private String pin;
	private String cpa_id;
	private String korean_nm;
	private String meber_flag_nm;
	private String audit_nm;
	private String status;
	
	/**
	 * id attribute 를 리턴한다.
	 * @return String
	 */
	public String getId() {
		return id;
	}
	/**
	 * id attribute 값을 설정한다.
	 * @param id String
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * name attribute 를 리턴한다.
	 * @return String
	 */
	public String getName() {
		return name;
	}
	/**
	 * name attribute 값을 설정한다.
	 * @param name String
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * ihidNum attribute 를 리턴한다.
	 * @return String
	 */
	public String getIhidNum() {
		return ihidNum;
	}
	/**
	 * ihidNum attribute 값을 설정한다.
	 * @param ihidNum String
	 */
	public void setIhidNum(String ihidNum) {
		this.ihidNum = ihidNum;
	}
	/**
	 * email attribute 를 리턴한다.
	 * @return String
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * email attribute 값을 설정한다.
	 * @param email String
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * password attribute 를 리턴한다.
	 * @return String
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * password attribute 값을 설정한다.
	 * @param password String
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * passwordHint attribute 를 리턴한다.
	 * @return String
	 */
	public String getPasswordHint() {
		return passwordHint;
	}
	/**
	 * passwordHint attribute 값을 설정한다.
	 * @param passwordHint String
	 */
	public void setPasswordHint(String passwordHint) {
		this.passwordHint = passwordHint;
	}
	/**
	 * passwordCnsr attribute 를 리턴한다.
	 * @return String
	 */
	public String getPasswordCnsr() {
		return passwordCnsr;
	}
	/**
	 * passwordCnsr attribute 값을 설정한다.
	 * @param passwordCnsr String
	 */
	public void setPasswordCnsr(String passwordCnsr) {
		this.passwordCnsr = passwordCnsr;
	}
	/**
	 * userSe attribute 를 리턴한다.
	 * @return String
	 */
	public String getUserSe() {
		return userSe;
	}
	/**
	 * userSe attribute 값을 설정한다.
	 * @param userSe String
	 */
	public void setUserSe(String userSe) {
		this.userSe = userSe;
	}
	/**
	 * orgnztId attribute 를 리턴한다.
	 * @return String
	 */
	public String getOrgnztId() {
		return orgnztId;
	}
	/**
	 * orgnztId attribute 값을 설정한다.
	 * @param orgnztId String
	 */
	public void setOrgnztId(String orgnztId) {
		this.orgnztId = orgnztId;
	}
	/**
	 * uniqId attribute 를 리턴한다.
	 * @return String
	 */
	public String getUniqId() {
		return uniqId;
	}
	/**
	 * uniqId attribute 값을 설정한다.
	 * @param uniqId String
	 */
	public void setUniqId(String uniqId) {
		this.uniqId = uniqId;
	}
	/**
	 * url attribute 를 리턴한다.
	 * @return String
	 */
	public String getUrl() {
		return url;
	}
	/**
	 * url attribute 값을 설정한다.
	 * @param url String
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	/**
	 * ip attribute 를 리턴한다.
	 * @return String
	 */
	public String getIp() {
		return ip;
	}
	/**
	 * ip attribute 값을 설정한다.
	 * @param ip String
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}
	/**
	 * dn attribute 를 리턴한다.
	 * @return String
	 */
	public String getDn() {
		return dn;
	}
	/**
	 * dn attribute 값을 설정한다.
	 * @param dn String
	 */
	public void setDn(String dn) {
		this.dn = dn;
	}
	/**
	 * @return the orgnztNm
	 */
	public String getOrgnztNm() {
		return orgnztNm;
	}
	/**
	 * @param orgnztNm the orgnztNm to set
	 */

	public void setOrgnztNm(String orgnztNm) {
		this.orgnztNm = orgnztNm;
	}

	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getAima_emp_id() {
		return aima_emp_id;
	}
	public void setAima_emp_id(String aima_emp_id) {
		this.aima_emp_id = aima_emp_id;
	}
	public String getAima_dept_pcode() {
		return aima_dept_pcode;
	}
	public void setAima_dept_pcode(String aima_dept_pcode) {
		this.aima_dept_pcode = aima_dept_pcode;
	}
	public String getAima_dept_code() {
		return aima_dept_code;
	}
	public void setAima_dept_code(String aima_dept_code) {
		this.aima_dept_code = aima_dept_code;
	}
	public String getAima_dept_pname() {
		return aima_dept_pname;
	}
	public void setAima_dept_pname(String aima_dept_pname) {
		this.aima_dept_pname = aima_dept_pname;
	}
	public String getAima_dept_name() {
		return aima_dept_name;
	}
	public void setAima_dept_name(String aima_dept_name) {
		this.aima_dept_name = aima_dept_name;
	}
	public int getAima_dept_ord() {
		return aima_dept_ord;
	}
	public void setAima_dept_ord(int aima_dept_ord) {
		this.aima_dept_ord = aima_dept_ord;
	}
	public String getAima_posi_code() {
		return aima_posi_code;
	}
	public void setAima_posi_code(String aima_posi_code) {
		this.aima_posi_code = aima_posi_code;
	}
	public String getAima_posi_name() {
		return aima_posi_name;
	}
	public void setAima_posi_name(String aima_posi_name) {
		this.aima_posi_name = aima_posi_name;
	}
	public String getAima_posi_rcode() {
		return aima_posi_rcode;
	}
	public void setAima_posi_rcode(String aima_posi_rcode) {
		this.aima_posi_rcode = aima_posi_rcode;
	}
	public String getAima_posi_rname() {
		return aima_posi_rname;
	}
	public void setAima_posi_rname(String aima_posi_rname) {
		this.aima_posi_rname = aima_posi_rname;
	}
	public String getAima_kor_nm() {
		return aima_kor_nm;
	}
	public void setAima_kor_nm(String aima_kor_nm) {
		this.aima_kor_nm = aima_kor_nm;
	}
	public String getAima_eng_nm() {
		return aima_eng_nm;
	}
	public void setAima_eng_nm(String aima_eng_nm) {
		this.aima_eng_nm = aima_eng_nm;
	}
	public String getAima_chi_nm() {
		return aima_chi_nm;
	}
	public void setAima_chi_nm(String aima_chi_nm) {
		this.aima_chi_nm = aima_chi_nm;
	}
	public String getAima_psl_id() {
		return aima_psl_id;
	}
	public void setAima_psl_id(String aima_psl_id) {
		this.aima_psl_id = aima_psl_id;
	}
	public String getAima_birth() {
		return aima_birth;
	}
	public void setAima_birth(String aima_birth) {
		this.aima_birth = aima_birth;
	}
	public int getAima_sex() {
		return aima_sex;
	}
	public void setAima_sex(int aima_sex) {
		this.aima_sex = aima_sex;
	}
	public String getAima_enter_dt() {
		return aima_enter_dt;
	}
	public void setAima_enter_dt(String aima_enter_dt) {
		this.aima_enter_dt = aima_enter_dt;
	}
	public String getAima_retire_dt() {
		return aima_retire_dt;
	}
	public void setAima_retire_dt(String aima_retire_dt) {
		this.aima_retire_dt = aima_retire_dt;
	}
	public String getAima_work_gubn() {
		return aima_work_gubn;
	}
	public void setAima_work_gubn(String aima_work_gubn) {
		this.aima_work_gubn = aima_work_gubn;
	}
	public String getAima_zip() {
		return aima_zip;
	}
	public void setAima_zip(String aima_zip) {
		this.aima_zip = aima_zip;
	}
	public String getAima_add1() {
		return aima_add1;
	}
	public void setAima_add1(String aima_add1) {
		this.aima_add1 = aima_add1;
	}
	public String getAima_add2() {
		return aima_add2;
	}
	public void setAima_add2(String aima_add2) {
		this.aima_add2 = aima_add2;
	}
	public String getAima_tel() {
		return aima_tel;
	}
	public void setAima_tel(String aima_tel) {
		this.aima_tel = aima_tel;
	}
	public String getAima_mobile() {
		return aima_mobile;
	}
	public void setAima_mobile(String aima_mobile) {
		this.aima_mobile = aima_mobile;
	}
	public String getAima_e_mail() {
		return aima_e_mail;
	}
	public void setAima_e_mail(String aima_e_mail) {
		this.aima_e_mail = aima_e_mail;
	}
	public String getAima_off_tel() {
		return aima_off_tel;
	}
	public void setAima_off_tel(String aima_off_tel) {
		this.aima_off_tel = aima_off_tel;
	}
	public String getAima_fax() {
		return aima_fax;
	}
	public void setAima_fax(String aima_fax) {
		this.aima_fax = aima_fax;
	}
	public int getAima_eap_ord() {
		return aima_eap_ord;
	}
	public void setAima_eap_ord(int aima_eap_ord) {
		this.aima_eap_ord = aima_eap_ord;
	}
	public String getAima_dept2_pcode() {
		return aima_dept2_pcode;
	}
	public void setAima_dept2_pcode(String aima_dept2_pcode) {
		this.aima_dept2_pcode = aima_dept2_pcode;
	}
	public String getAima_dept2_code() {
		return aima_dept2_code;
	}
	public void setAima_dept2_code(String aima_dept2_code) {
		this.aima_dept2_code = aima_dept2_code;
	}
	public String getAima_dept2_pname() {
		return aima_dept2_pname;
	}
	public void setAima_dept2_pname(String aima_dept2_pname) {
		this.aima_dept2_pname = aima_dept2_pname;
	}
	public String getAima_dept2_name() {
		return aima_dept2_name;
	}
	public void setAima_dept2_name(String aima_dept2_name) {
		this.aima_dept2_name = aima_dept2_name;
	}
	public int getAima_dept2_ord() {
		return aima_dept2_ord;
	}
	public void setAima_dept2_ord(int aima_dept2_ord) {
		this.aima_dept2_ord = aima_dept2_ord;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getImi_login_id() {
		return imi_login_id;
	}
	public void setImi_login_id(String imi_login_id) {
		this.imi_login_id = imi_login_id;
	}
	public String getApma_emp_id() {
		return apma_emp_id;
	}
	public void setApma_emp_id(String apma_emp_id) {
		this.apma_emp_id = apma_emp_id;
	}
	public String getApma_kor_name() {
		return apma_kor_name;
	}
	public void setApma_kor_name(String apma_kor_name) {
		this.apma_kor_name = apma_kor_name;
	}
	public String getGiroPin() {
		return giroPin;
	}
	public void setGiroPin(String giroPin) {
		this.giroPin = giroPin;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getCpa_id() {
		return cpa_id;
	}
	public void setCpa_id(String cpa_id) {
		this.cpa_id = cpa_id;
	}
	public String getKorean_nm() {
		return korean_nm;
	}
	public void setKorean_nm(String korean_nm) {
		this.korean_nm = korean_nm;
	}
	public String getMeber_flag_nm() {
		return meber_flag_nm;
	}
	public void setMeber_flag_nm(String meber_flag_nm) {
		this.meber_flag_nm = meber_flag_nm;
	}
	public String getAudit_nm() {
		return audit_nm;
	}
	public void setAudit_nm(String audit_nm) {
		this.audit_nm = audit_nm;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}

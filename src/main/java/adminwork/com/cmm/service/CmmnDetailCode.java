package adminwork.com.cmm.service;

import java.io.Serializable;

/**
 * 공통상세코드 모델 클래스
 * @author 공통서비스 개발팀 이중호
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.01  이중호          최초 생성
 *
 * </pre>
 */
public class CmmnDetailCode implements Serializable {

	private static final long serialVersionUID = -6508801327314181679L;

	private String level1;
	private String level2;
	private String level3;
	private String part;
	private String manager;
	private String manager_email;
	private String noti;
	
	 
	private String cd = "";
	private String grp_cd = "";
	private String cd_nm = "";
	private String sort = "";
	private String use_yn = "";
	private String upper_cd = "";
	private String optn1 = "";
	private String optn2 = "";
	private String frst_regist_id = "";
	private String frst_regist_dt = "";
	private String last_updt_id = "";
	private String last_updt_dt = "";
	
	
	/*
	 * 코드ID
	 */
	private String codeId = "";

	/*
	 * 코드ID명
	 */
	private String codeIdNm = "";

	/*
	 * 코드
	 */
	private String code = "";

	/*
	 * 코드명
	 */
	private String codeNm = "";

	/*
	 * 코드설명
	 */
	private String codeDc = "";

	/*
	 * 사용여부
	 */
	private String useAt = "";

	/*
	 * 최초등록자ID
	 */
	private String frstRegisterId = "";

	/*
	 * 최종수정자ID
	 */
	private String lastUpdusrId = "";

	/**
	 * codeId attribute 를 리턴한다.
	 * @return String
	 */
	public String getCodeId() {
		return codeId;
	}

	/**
	 * codeId attribute 값을 설정한다.
	 * @param codeId String
	 */
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	/**
	 * codeIdNm attribute 를 리턴한다.
	 * @return String
	 */
	public String getCodeIdNm() {
		return codeIdNm;
	}

	/**
	 * codeIdNm attribute 값을 설정한다.
	 * @param codeIdNm String
	 */
	public void setCodeIdNm(String codeIdNm) {
		this.codeIdNm = codeIdNm;
	}

	/**
	 * code attribute 를 리턴한다.
	 * @return String
	 */
	public String getCode() {
		return code;
	}

	/**
	 * code attribute 값을 설정한다.
	 * @param code String
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * codeNm attribute 를 리턴한다.
	 * @return String
	 */
	public String getCodeNm() {
		return codeNm;
	}

	/**
	 * codeNm attribute 값을 설정한다.
	 * @param codeNm String
	 */
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}

	/**
	 * codeDc attribute 를 리턴한다.
	 * @return String
	 */
	public String getCodeDc() {
		return codeDc;
	}

	/**
	 * codeDc attribute 값을 설정한다.
	 * @param codeDc String
	 */
	public void setCodeDc(String codeDc) {
		this.codeDc = codeDc;
	}

	/**
	 * useAt attribute 를 리턴한다.
	 * @return String
	 */
	public String getUseAt() {
		return useAt;
	}

	/**
	 * useAt attribute 값을 설정한다.
	 * @param useAt String
	 */
	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	/**
	 * frstRegisterId attribute 를 리턴한다.
	 * @return String
	 */
	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	/**
	 * frstRegisterId attribute 값을 설정한다.
	 * @param frstRegisterId String
	 */
	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	/**
	 * lastUpdusrId attribute 를 리턴한다.
	 * @return String
	 */
	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	/**
	 * lastUpdusrId attribute 값을 설정한다.
	 * @param lastUpdusrId String
	 */
	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public String getCd() {
		return cd;
	}

	public void setCd(String cd) {
		this.cd = cd;
	}

	public String getGrp_cd() {
		return grp_cd;
	}

	public void setGrp_cd(String grp_cd) {
		this.grp_cd = grp_cd;
	}

	public String getCd_nm() {
		return cd_nm;
	}

	public void setCd_nm(String cd_nm) {
		this.cd_nm = cd_nm;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getUse_yn() {
		return use_yn;
	}

	public void setUse_yn(String use_yn) {
		this.use_yn = use_yn;
	}

	public String getUpper_cd() {
		return upper_cd;
	}

	public void setUpper_cd(String upper_cd) {
		this.upper_cd = upper_cd;
	}

	public String getOptn1() {
		return optn1;
	}

	public void setOptn1(String optn1) {
		this.optn1 = optn1;
	}

	public String getOptn2() {
		return optn2;
	}

	public void setOptn2(String optn2) {
		this.optn2 = optn2;
	}

	public String getFrst_regist_id() {
		return frst_regist_id;
	}

	public void setFrst_regist_id(String frst_regist_id) {
		this.frst_regist_id = frst_regist_id;
	}

	public String getFrst_regist_dt() {
		return frst_regist_dt;
	}

	public void setFrst_regist_dt(String frst_regist_dt) {
		this.frst_regist_dt = frst_regist_dt;
	}

	public String getLast_updt_id() {
		return last_updt_id;
	}

	public void setLast_updt_id(String last_updt_id) {
		this.last_updt_id = last_updt_id;
	}

	public String getLast_updt_dt() {
		return last_updt_dt;
	}

	public void setLast_updt_dt(String last_updt_dt) {
		this.last_updt_dt = last_updt_dt;
	}

	public String getLevel1() {
		return level1;
	}

	public void setLevel1(String level1) {
		this.level1 = level1;
	}

	public String getLevel2() {
		return level2;
	}

	public void setLevel2(String level2) {
		this.level2 = level2;
	}

	public String getLevel3() {
		return level3;
	}

	public void setLevel3(String level3) {
		this.level3 = level3;
	}

	public String getPart() {
		return part;
	}

	public void setPart(String part) {
		this.part = part;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getNoti() {
		return noti;
	}

	public void setNoti(String noti) {
		this.noti = noti;
	}

	public String getManager_email() {
		return manager_email;
	}

	public void setManager_email(String manager_email) {
		this.manager_email = manager_email;
	}

	
	
}

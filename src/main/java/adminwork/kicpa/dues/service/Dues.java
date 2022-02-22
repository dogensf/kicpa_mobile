package adminwork.kicpa.dues.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Dues implements Serializable{
	
	   /*GIRO_MASTER*/ 
	private String  yyyy;
	private String  giro_cd;
    private String  check_digit;
    private String  giro_job_cd;
    private String  giro_job_nm;
    private String  sup_giro_cd;
    private String  cust_inqr_no;
    private String  ntic_de;
    private long    ntic_amt;
    private String  cstmr_flag;
    private String  cstmr_cd;
    private String  cstmr_nm;
    private String  rqest_cd;
    private String  rqest_nm;
    private String  rqest_de;
    private String  process_flag;
    private String  pay_de;
    private String  transfr_de;
    private String  succes_amt;
    private long    fee_amt;
    private String  frst_regist_id;
    private String  frst_regist_dt;
    private String  last_updt_id;
    private String  last_updt_dt;
    
    
    
   /*GIRO_NTIC*/ 

    private String epay_no;
    private String pay_yymm_seq;
    private String noti_issu_type;
    private String etc_type_code;
   
    private long   dudt_in_amt;
    private String dudt_in_amt_;
    private long   dudt_aft_amt;
    private String dudt;
    private String noti_dl_dt;
    private String name;
    private String pay_prrt_rank;
    private String deflt_prd;
    private String deflt_mm_cnt;
    private String etc_info_ttl;
    private String etc_info_cnte;
    private String ntic_flag;
    private String ntic_cancl_flag;
    private String pay_yn;
    private String org_tran_id;
    
    private String  sub_giro_cd;
    
    private String linkUrl;
    
	public String getGiro_cd() {
		return giro_cd;
	}
	public void setGiro_cd(String giro_cd) {
		this.giro_cd = giro_cd;
	}
	public String getCheck_digit() {
		return check_digit;
	}
	public void setCheck_digit(String check_digit) {
		this.check_digit = check_digit;
	}
	public String getGiro_job_cd() {
		return giro_job_cd;
	}
	public void setGiro_job_cd(String giro_job_cd) {
		this.giro_job_cd = giro_job_cd;
	}
	public String getSup_giro_cd() {
		return sup_giro_cd;
	}
	public void setSup_giro_cd(String sup_giro_cd) {
		this.sup_giro_cd = sup_giro_cd;
	}
	public String getCust_inqr_no() {
		return cust_inqr_no;
	}
	public void setCust_inqr_no(String cust_inqr_no) {
		this.cust_inqr_no = cust_inqr_no;
	}
	public String getNtic_de() {
		return ntic_de;
	}
	public void setNtic_de(String ntic_de) {
		this.ntic_de = ntic_de;
	}
	public long getNtic_amt() {
		return ntic_amt;
	}
	public void setNtic_amt(long ntic_amt) {
		this.ntic_amt = ntic_amt;
	}
	public String getCstmr_flag() {
		return cstmr_flag;
	}
	public void setCstmr_flag(String cstmr_flag) {
		this.cstmr_flag = cstmr_flag;
	}
	public String getCstmr_cd() {
		return cstmr_cd;
	}
	public void setCstmr_cd(String cstmr_cd) {
		this.cstmr_cd = cstmr_cd;
	}
	public String getCstmr_nm() {
		return cstmr_nm;
	}
	public void setCstmr_nm(String cstmr_nm) {
		this.cstmr_nm = cstmr_nm;
	}
	public String getRqest_cd() {
		return rqest_cd;
	}
	public void setRqest_cd(String rqest_cd) {
		this.rqest_cd = rqest_cd;
	}
	public String getRqest_de() {
		return rqest_de;
	}
	public void setRqest_de(String rqest_de) {
		this.rqest_de = rqest_de;
	}
	public String getProcess_flag() {
		return process_flag;
	}
	public void setProcess_flag(String process_flag) {
		this.process_flag = process_flag;
	}
	public String getPay_de() {
		return pay_de;
	}
	public void setPay_de(String pay_de) {
		this.pay_de = pay_de;
	}
	public String getTransfr_de() {
		return transfr_de;
	}
	public void setTransfr_de(String transfr_de) {
		this.transfr_de = transfr_de;
	}
	public String getSucces_amt() {
		return succes_amt;
	}
	public void setSucces_amt(String succes_amt) {
		this.succes_amt = succes_amt;
	}
	public long getFee_amt() {
		return fee_amt;
	}
	public void setFee_amt(long fee_amt) {
		this.fee_amt = fee_amt;
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
	public String getEpay_no() {
		return epay_no;
	}
	public void setEpay_no(String epay_no) {
		this.epay_no = epay_no;
	}
	public String getPay_yymm_seq() {
		return pay_yymm_seq;
	}
	public void setPay_yymm_seq(String pay_yymm_seq) {
		this.pay_yymm_seq = pay_yymm_seq;
	}
	public String getNoti_issu_type() {
		return noti_issu_type;
	}
	public void setNoti_issu_type(String noti_issu_type) {
		this.noti_issu_type = noti_issu_type;
	}
	public String getEtc_type_code() {
		return etc_type_code;
	}
	public void setEtc_type_code(String etc_type_code) {
		this.etc_type_code = etc_type_code;
	}
	public long getDudt_in_amt() {
		return dudt_in_amt;
	}
	public void setDudt_in_amt(long dudt_in_amt) {
		this.dudt_in_amt = dudt_in_amt;
	}
	public long getDudt_aft_amt() {
		return dudt_aft_amt;
	}
	public void setDudt_aft_amt(long dudt_aft_amt) {
		this.dudt_aft_amt = dudt_aft_amt;
	}
	public String getDudt() {
		return dudt;
	}
	public void setDudt(String dudt) {
		this.dudt = dudt;
	}
	public String getNoti_dl_dt() {
		return noti_dl_dt;
	}
	public void setNoti_dl_dt(String noti_dl_dt) {
		this.noti_dl_dt = noti_dl_dt;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPay_prrt_rank() {
		return pay_prrt_rank;
	}
	public void setPay_prrt_rank(String pay_prrt_rank) {
		this.pay_prrt_rank = pay_prrt_rank;
	}
	public String getDeflt_prd() {
		return deflt_prd;
	}
	public void setDeflt_prd(String deflt_prd) {
		this.deflt_prd = deflt_prd;
	}
	public String getDeflt_mm_cnt() {
		return deflt_mm_cnt;
	}
	public void setDeflt_mm_cnt(String deflt_mm_cnt) {
		this.deflt_mm_cnt = deflt_mm_cnt;
	}
	public String getEtc_info_ttl() {
		return etc_info_ttl;
	}
	public void setEtc_info_ttl(String etc_info_ttl) {
		this.etc_info_ttl = etc_info_ttl;
	}
	public String getEtc_info_cnte() {
		return etc_info_cnte;
	}
	public void setEtc_info_cnte(String etc_info_cnte) {
		this.etc_info_cnte = etc_info_cnte;
	}
	public String getNtic_flag() {
		return ntic_flag;
	}
	public void setNtic_flag(String ntic_flag) {
		this.ntic_flag = ntic_flag;
	}
	public String getNtic_cancl_flag() {
		return ntic_cancl_flag;
	}
	public void setNtic_cancl_flag(String ntic_cancl_flag) {
		this.ntic_cancl_flag = ntic_cancl_flag;
	}
	public String getPay_yn() {
		return pay_yn;
	}
	public void setPay_yn(String pay_yn) {
		this.pay_yn = pay_yn;
	}
	public String getOrg_tran_id() {
		return org_tran_id;
	}
	public void setOrg_tran_id(String org_tran_id) {
		this.org_tran_id = org_tran_id;
	}
	public String getGiro_job_nm() {
		return giro_job_nm;
	}
	public void setGiro_job_nm(String giro_job_nm) {
		this.giro_job_nm = giro_job_nm;
	}
	public String getYyyy() {
		return yyyy;
	}
	public void setYyyy(String yyyy) {
		this.yyyy = yyyy;
	}
	public String getDudt_in_amt_() {
		return dudt_in_amt_;
	}
	public void setDudt_in_amt_(String dudt_in_amt_) {
		this.dudt_in_amt_ = dudt_in_amt_;
	}
	public String getRqest_nm() {
		return rqest_nm;
	}
	public void setRqest_nm(String rqest_nm) {
		this.rqest_nm = rqest_nm;
	}
	public String getSub_giro_cd() {
		return sub_giro_cd;
	}
	public void setSub_giro_cd(String sub_giro_cd) {
		this.sub_giro_cd = sub_giro_cd;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
   
	
	
}

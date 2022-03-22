package adminwork.kicpa.faq.service;

import java.io.Serializable;


@SuppressWarnings("serial")
public class Faq implements Serializable{
	
	
	  private String faq_id;
	  private String faq_sj;
	  private String faq_cn;
	  private String faq_cate;
	  private String faq_job;
	  private String faq_part;
	  private String faq_manager;
	  private String atch_file_id;
	  private String del_yn;
	  private String reg_id;
	  private String reg_dt;
	  private String updt_id;
	  private String updt_dt;
	  
	  private int rdcnt;
	  
	  
	  private String pre_id;
	  private String next_id;
	  
	  
	public String getFaq_id() {
		return faq_id;
	}
	public void setFaq_id(String faq_id) {
		this.faq_id = faq_id;
	}
	public String getFaq_sj() {
		return faq_sj;
	}
	public void setFaq_sj(String faq_sj) {
		this.faq_sj = faq_sj;
	}
	public String getFaq_cn() {
		return faq_cn;
	}
	public void setFaq_cn(String faq_cn) {
		this.faq_cn = faq_cn;
	}
	public String getFaq_cate() {
		return faq_cate;
	}
	public void setFaq_cate(String faq_cate) {
		this.faq_cate = faq_cate;
	}

	public String getFaq_job() {
		return faq_job;
	}
	public void setFaq_job(String faq_job) {
		this.faq_job = faq_job;
	}
	public String getFaq_part() {
		return faq_part;
	}
	public void setFaq_part(String faq_part) {
		this.faq_part = faq_part;
	}
	public String getFaq_manager() {
		return faq_manager;
	}
	public void setFaq_manager(String faq_manager) {
		this.faq_manager = faq_manager;
	}
	public String getAtch_file_id() {
		return atch_file_id;
	}
	public void setAtch_file_id(String atch_file_id) {
		this.atch_file_id = atch_file_id;
	}
	public String getReg_id() {
		return reg_id;
	}
	public void setReg_id(String reg_id) {
		this.reg_id = reg_id;
	}
	public String getReg_dt() {
		return reg_dt;
	}
	public void setReg_dt(String reg_dt) {
		this.reg_dt = reg_dt;
	}
	public String getUpdt_id() {
		return updt_id;
	}
	public void setUpdt_id(String updt_id) {
		this.updt_id = updt_id;
	}
	public String getUpdt_dt() {
		return updt_dt;
	}
	public void setUpdt_dt(String updt_dt) {
		this.updt_dt = updt_dt;
	}
	public String getPre_id() {
		return pre_id;
	}
	public void setPre_id(String pre_id) {
		this.pre_id = pre_id;
	}
	public String getNext_id() {
		return next_id;
	}
	public void setNext_id(String next_id) {
		this.next_id = next_id;
	}
	public String getDel_yn() {
		return del_yn;
	}
	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}
	public int getRdcnt() {
		return rdcnt;
	}
	public void setRdcnt(int rdcnt) {
		this.rdcnt = rdcnt;
	}
	
	  

}

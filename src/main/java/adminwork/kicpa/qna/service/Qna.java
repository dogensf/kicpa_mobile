package adminwork.kicpa.qna.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Qna implements Serializable{
	
	private String qna_id;
	private String pin;
	private String category;
	private String job;
	private String reg_email;
	private String reg_dt;
	private String depart;
	private String manager;
	private String manager_email;
	private String qna_sj;
	private String qna_cn;
	private String atch_file_id;
	private String status;
	private String answer_ty;
	private String answer_cn;
	private String answer_dt;
	private String answer_id;
	private String del_yn;
	private String last_updt;
	private String last_updusr_id;
	public String getQna_id() {
		return qna_id;
	}
	public void setQna_id(String qna_id) {
		this.qna_id = qna_id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public String getReg_email() {
		return reg_email;
	}
	public void setReg_email(String reg_email) {
		this.reg_email = reg_email;
	}
	public String getReg_dt() {
		return reg_dt;
	}
	public void setReg_dt(String reg_dt) {
		this.reg_dt = reg_dt;
	}
	public String getDepart() {
		return depart;
	}
	public void setDepart(String depart) {
		this.depart = depart;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public String getManager_email() {
		return manager_email;
	}
	public void setManager_email(String manager_email) {
		this.manager_email = manager_email;
	}
	public String getQna_sj() {
		return qna_sj;
	}
	public void setQna_sj(String qna_sj) {
		this.qna_sj = qna_sj;
	}
	public String getQna_cn() {
		return qna_cn;
	}
	public void setQna_cn(String qna_cn) {
		this.qna_cn = qna_cn;
	}
	public String getAtch_file_id() {
		return atch_file_id;
	}
	public void setAtch_file_id(String atch_file_id) {
		this.atch_file_id = atch_file_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAnswer_ty() {
		return answer_ty;
	}
	public void setAnswer_ty(String answer_ty) {
		this.answer_ty = answer_ty;
	}
	public String getAnswer_cn() {
		return answer_cn;
	}
	public void setAnswer_cn(String answer_cn) {
		this.answer_cn = answer_cn;
	}
	public String getAnswer_dt() {
		return answer_dt;
	}
	public void setAnswer_dt(String answer_dt) {
		this.answer_dt = answer_dt;
	}
	public String getAnswer_id() {
		return answer_id;
	}
	public void setAnswer_id(String answer_id) {
		this.answer_id = answer_id;
	}
	public String getDel_yn() {
		return del_yn;
	}
	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}
	public String getLast_updt() {
		return last_updt;
	}
	public void setLast_updt(String last_updt) {
		this.last_updt = last_updt;
	}
	public String getLast_updusr_id() {
		return last_updusr_id;
	}
	public void setLast_updusr_id(String last_updusr_id) {
		this.last_updusr_id = last_updusr_id;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	
	


}

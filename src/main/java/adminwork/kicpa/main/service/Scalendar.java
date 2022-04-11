package adminwork.kicpa.main.service;

import java.io.Serializable;


@SuppressWarnings("serial")
public class Scalendar implements Serializable{
	
	
	  private String schDt;
	  private String dtLabel;
	  private String schTy;
	  private String subject;
	  private String contents;
	  
	  
	  private String month;
	  private String ymd;
	  private int cnt01;
	  private int cnt02;
	  private int cnt03;
	  
	  

	public String getSchDt() {
		return schDt;
	}
	public void setSchDt(String schDt) {
		this.schDt = schDt;
	}
	public String getDtLabel() {
		return dtLabel;
	}
	public void setDtLabel(String dtLabel) {
		this.dtLabel = dtLabel;
	}
	public String getSchTy() {
		return schTy;
	}
	public void setSchTy(String schTy) {
		this.schTy = schTy;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public int getCnt01() {
		return cnt01;
	}
	public void setCnt01(int cnt01) {
		this.cnt01 = cnt01;
	}
	public int getCnt02() {
		return cnt02;
	}
	public void setCnt02(int cnt02) {
		this.cnt02 = cnt02;
	}
	public int getCnt03() {
		return cnt03;
	}
	public void setCnt03(int cnt03) {
		this.cnt03 = cnt03;
	}
	public String getYmd() {
		return ymd;
	}
	public void setYmd(String ymd) {
		this.ymd = ymd;
	}

	  
	  
	 
	  

}

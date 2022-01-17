package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class Giro implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String giroCd;
    private String checkDigit;
    private Long giroJobCd;
    private String supGiroCd;
    private String subGiroCd;
    private String custInqrNo;
    private String nticDe;
    private Long nticAmt;
    private String cstmrFlag;
    private String cstmrCd;
    private String cstmrNm;
    private String rqestCd;
    private String rqestDe;
    private String processFlag;
    private String payDe;
    private String transfrDe;
    private Long succesAmt;
    private int feeAmt;
    private String frstRegistId;
    private String frstRegistDt;
    private String lastUpdtId;
    private String lastUpdtDt;

    public String getGiroCd() {
        return giroCd;
    }

    public void setGiroCd(String giroCd) {
        this.giroCd = giroCd;
    }

    public String getCheckDigit() {
        return checkDigit;
    }

    public void setCheckDigit(String checkDigit) {
        this.checkDigit = checkDigit;
    }

    public Long getGiroJobCd() {
        return giroJobCd;
    }

    public void setGiroJobCd(Long giroJobCd) {
        this.giroJobCd = giroJobCd;
    }

    public String getSupGiroCd() {
        return supGiroCd;
    }

    public void setSupGiroCd(String supGiroCd) {
        this.supGiroCd = supGiroCd;
    }

    public String getCustInqrNo() {
        return custInqrNo;
    }

    public void setCustInqrNo(String custInqrNo) {
        this.custInqrNo = custInqrNo;
    }

    public String getNticDe() {
        return nticDe;
    }

    public void setNticDe(String nticDe) {
        this.nticDe = nticDe;
    }

    public Long getNticAmt() {
        return nticAmt;
    }

    public void setNticAmt(Long nticAmt) {
        this.nticAmt = nticAmt;
    }

    public String getCstmrFlag() {
        return cstmrFlag;
    }

    public void setCstmrFlag(String cstmrFlag) {
        this.cstmrFlag = cstmrFlag;
    }

    public String getCstmrCd() {
        return cstmrCd;
    }

    public void setCstmrCd(String cstmrCd) {
        this.cstmrCd = cstmrCd;
    }

    public String getCstmrNm() {
        return cstmrNm;
    }

    public void setCstmrNm(String cstmrNm) {
        this.cstmrNm = cstmrNm;
    }

    public String getRqestCd() {
        return rqestCd;
    }

    public void setRqestCd(String rqestCd) {
        this.rqestCd = rqestCd;
    }

    public String getRqestDe() {
        return rqestDe;
    }

    public void setRqestDe(String rqestDe) {
        this.rqestDe = rqestDe;
    }

    public String getProcessFlag() {
        return processFlag;
    }

    public void setProcessFlag(String processFlag) {
        this.processFlag = processFlag;
    }

    public String getPayDe() {
        return payDe;
    }

    public void setPayDe(String payDe) {
        this.payDe = payDe;
    }

    public String getTransfrDe() {
        return transfrDe;
    }

    public void setTransfrDe(String transfrDe) {
        this.transfrDe = transfrDe;
    }

    public Long getSuccesAmt() {
        return succesAmt;
    }

    public void setSuccesAmt(Long succesAmt) {
        this.succesAmt = succesAmt;
    }

    public int getFeeAmt() {
        return feeAmt;
    }

    public void setFeeAmt(int feeAmt) {
        this.feeAmt = feeAmt;
    }

    public String getFrstRegistId() {
        return frstRegistId;
    }

    public void setFrstRegistId(String frstRegistId) {
        this.frstRegistId = frstRegistId;
    }

    public String getFrstRegistDt() {
        return frstRegistDt;
    }

    public void setFrstRegistDt(String frstRegistDt) {
        this.frstRegistDt = frstRegistDt;
    }

    public String getLastUpdtId() {
        return lastUpdtId;
    }

    public void setLastUpdtId(String lastUpdtId) {
        this.lastUpdtId = lastUpdtId;
    }

    public String getLastUpdtDt() {
        return lastUpdtDt;
    }

    public void setLastUpdtDt(String lastUpdtDt) {
        this.lastUpdtDt = lastUpdtDt;
    }

    
    
    public String getSubGiroCd() {
		return subGiroCd;
	}

	public void setSubGiroCd(String subGiroCd) {
		this.subGiroCd = subGiroCd;
	}

	@Override
    public String toString() {
        return "Giro{" +
                "giroCd='" + giroCd + '\'' +
                ", checkDigit='" + checkDigit + '\'' +
                ", giroJobCd=" + giroJobCd +
                ", supGiroCd='" + supGiroCd + '\'' +
                ", subGiroCd='" + subGiroCd + '\'' +
                ", custInqrNo='" + custInqrNo + '\'' +
                ", nticDe='" + nticDe + '\'' +
                ", nticAmt=" + nticAmt +
                ", cstmrFlag='" + cstmrFlag + '\'' +
                ", cstmrCd='" + cstmrCd + '\'' +
                ", cstmrNm='" + cstmrNm + '\'' +
                ", rqestCd='" + rqestCd + '\'' +
                ", rqestDe='" + rqestDe + '\'' +
                ", processFlag='" + processFlag + '\'' +
                ", payDe='" + payDe + '\'' +
                ", transfrDe='" + transfrDe + '\'' +
                ", succesAmt=" + succesAmt +
                ", feeAmt=" + feeAmt +
                ", frstRegistId='" + frstRegistId + '\'' +
                ", frstRegistDt='" + frstRegistDt + '\'' +
                ", lastUpdtId='" + lastUpdtId + '\'' +
                ", lastUpdtDt='" + lastUpdtDt + '\'' +
                '}';
    }
    
    
}

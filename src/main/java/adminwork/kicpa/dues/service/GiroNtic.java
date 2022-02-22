package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class GiroNtic implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String giroCd;
    private String epayNo;
    private String payYymmSeq;
    private String subGiroCd;
    private String notiIssuType;
    private String etcTypeCode;
    private String custInqrNo;
    private Long dudtInAmt;
    private Long dudtAftAmt;
    private String dudt;
    private String notiDlDt;
    private String name;
    private String payPrrtRank;
    private String defltPrd;
    private String defltMmCnt;
    private String etcInfoTtl;
    private String etcInfoCnte;
    private String nticFlag;
    private String nticCanclFlag;
    private String payYn;
    private String payDe;
    private String orgTranId;
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

    public String getEpayNo() {
        return epayNo;
    }

    public void setEpayNo(String epayNo) {
        this.epayNo = epayNo;
    }

    public String getPayYymmSeq() {
        return payYymmSeq;
    }

    public void setPayYymmSeq(String payYymmSeq) {
        this.payYymmSeq = payYymmSeq;
    }

    public String getNotiIssuType() {
        return notiIssuType;
    }

    public void setNotiIssuType(String notiIssuType) {
        this.notiIssuType = notiIssuType;
    }

    public String getEtcTypeCode() {
        return etcTypeCode;
    }

    public void setEtcTypeCode(String etcTypeCode) {
        this.etcTypeCode = etcTypeCode;
    }

    public String getCustInqrNo() {
        return custInqrNo;
    }

    public void setCustInqrNo(String custInqrNo) {
        this.custInqrNo = custInqrNo;
    }

    public Long getDudtInAmt() {
        return dudtInAmt;
    }

    public void setDudtInAmt(Long dudtInAmt) {
        this.dudtInAmt = dudtInAmt;
    }

    public Long getDudtAftAmt() {
        return dudtAftAmt;
    }

    public void setDudtAftAmt(Long dudtAftAmt) {
        this.dudtAftAmt = dudtAftAmt;
    }

    public String getDudt() {
        return dudt;
    }

    public void setDudt(String dudt) {
        this.dudt = dudt;
    }

    public String getNotiDlDt() {
        return notiDlDt;
    }

    public void setNotiDlDt(String notiDlDt) {
        this.notiDlDt = notiDlDt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPayPrrtRank() {
        return payPrrtRank;
    }

    public void setPayPrrtRank(String payPrrtRank) {
        this.payPrrtRank = payPrrtRank;
    }

    public String getDefltPrd() {
        return defltPrd;
    }

    public void setDefltPrd(String defltPrd) {
        this.defltPrd = defltPrd;
    }

    public String getDefltMmCnt() {
        return defltMmCnt;
    }

    public void setDefltMmCnt(String defltMmCnt) {
        this.defltMmCnt = defltMmCnt;
    }

    public String getEtcInfoTtl() {
        return etcInfoTtl;
    }

    public void setEtcInfoTtl(String etcInfoTtl) {
        this.etcInfoTtl = etcInfoTtl;
    }

    public String getEtcInfoCnte() {
        return etcInfoCnte;
    }

    public void setEtcInfoCnte(String etcInfoCnte) {
        this.etcInfoCnte = etcInfoCnte;
    }

    public String getNticFlag() {
        return nticFlag;
    }

    public void setNticFlag(String nticFlag) {
        this.nticFlag = nticFlag;
    }

    public String getNticCanclFlag() {
        return nticCanclFlag;
    }

    public void setNticCanclFlag(String nticCanclFlag) {
        this.nticCanclFlag = nticCanclFlag;
    }

    public String getPayYn() {
        return payYn;
    }

    public void setPayYn(String payYn) {
        this.payYn = payYn;
    }

    public String getPayDe() {
        return payDe;
    }

    public void setPayDe(String payDe) {
        this.payDe = payDe;
    }

    public String getOrgTranId() {
        return orgTranId;
    }

    public void setOrgTranId(String orgTranId) {
        this.orgTranId = orgTranId;
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
        return "GiroNtic{" +
                "giroCd='" + giroCd + '\'' +
                ", epayNo='" + epayNo + '\'' +
                ", payYymmSeq='" + payYymmSeq + '\'' +
                ", subGiroCd='" + subGiroCd + '\'' +
                ", notiIssuType='" + notiIssuType + '\'' +
                ", etcTypeCode='" + etcTypeCode + '\'' +
                ", custInqrNo='" + custInqrNo + '\'' +
                ", dudtInAmt=" + dudtInAmt +
                ", dudtAftAmt=" + dudtAftAmt +
                ", dudt='" + dudt + '\'' +
                ", notiDlDt='" + notiDlDt + '\'' +
                ", name='" + name + '\'' +
                ", payPrrtRank='" + payPrrtRank + '\'' +
                ", defltPrd='" + defltPrd + '\'' +
                ", defltMmCnt='" + defltMmCnt + '\'' +
                ", etcInfoTtl='" + etcInfoTtl + '\'' +
                ", etcInfoCnte='" + etcInfoCnte + '\'' +
                ", nticFlag='" + nticFlag + '\'' +
                ", nticCanclFlag='" + nticCanclFlag + '\'' +
                ", payYn='" + payYn + '\'' +
                ", payDe='" + payDe + '\'' +
                ", orgTranId='" + orgTranId + '\'' +
                ", frstRegistId='" + frstRegistId + '\'' +
                ", frstRegistDt='" + frstRegistDt + '\'' +
                ", lastUpdtId='" + lastUpdtId + '\'' +
                ", lastUpdtDt='" + lastUpdtDt + '\'' +
                '}';
    }
    
    
}

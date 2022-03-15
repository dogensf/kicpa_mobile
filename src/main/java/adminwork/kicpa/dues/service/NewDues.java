package adminwork.kicpa.dues.service;

import java.io.Serializable;
import java.util.HashMap;

public class NewDues implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private long sbscrbSn;
    private String appCpaNo;
    private String pin;
    private String name;
    private String brthdy;
    private String accnutYear;
    private String cpaId;    
    private String registFlag;
    private String registPreDe;
    private String accnutDe;
    private String payDe;
    private String acntCd;
    private String acnutNo;
    private long gnrlEntrncAmt;
    private long gnrlYyAmt;
    private long cmitEntrncAmt;
    private long asstnEntrncAmt;
    private long asstnYyAmt;
    private long payNo;
    
    private String ageDiscountYn;
    
    private String calcFlag;    
    private long preGnrlYyAmt;
    private long preAsstnYyAmt;
    
    private String payStatus;
    private String payIdFlag;
    private String payId;
    private String giroYn;
    private String frstRegistId;
    private String frstRegistDt;
    private String lastUpdtId;
    private String lastUpdtDt;
    private String notice;
    private HashMap<String, Object> keys;

    private String status;
    public long getSbscrbSn() {
        return sbscrbSn;
    }

    public void setSbscrbSn(long sbscrbSn) {
        this.sbscrbSn = sbscrbSn;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getRegistFlag() {
        return registFlag;
    }

    public void setRegistFlag(String registFlag) {
        this.registFlag = registFlag;
    }

    public String getRegistPreDe() {
        return registPreDe;
    }

    public void setRegistPreDe(String registPreDe) {
        this.registPreDe = registPreDe;
    }

    public String getAccnutDe() {
        return accnutDe;
    }

    public void setAccnutDe(String accnutDe) {
        this.accnutDe = accnutDe;
    }

    public String getPayDe() {
        return payDe;
    }

    public void setPayDe(String payDe) {
        this.payDe = payDe;
    }

    public String getAcntCd() {
        return acntCd;
    }

    public void setAcntCd(String acntCd) {
        this.acntCd = acntCd;
    }

    public String getAcnutNo() {
        return acnutNo;
    }

    public void setAcnutNo(String acnutNo) {
        this.acnutNo = acnutNo;
    }

    public long getGnrlEntrncAmt() {
        return gnrlEntrncAmt;
    }

    public void setGnrlEntrncAmt(long gnrlEntrncAmt) {
        this.gnrlEntrncAmt = gnrlEntrncAmt;
    }

    public long getGnrlYyAmt() {
        return gnrlYyAmt;
    }

    public void setGnrlYyAmt(long gnrlYyAmt) {
        this.gnrlYyAmt = gnrlYyAmt;
    }

    public long getCmitEntrncAmt() {
        return cmitEntrncAmt;
    }

    public void setCmitEntrncAmt(long cmitEntrncAmt) {
        this.cmitEntrncAmt = cmitEntrncAmt;
    }

    public long getAsstnEntrncAmt() {
        return asstnEntrncAmt;
    }

    public void setAsstnEntrncAmt(long asstnEntrncAmt) {
        this.asstnEntrncAmt = asstnEntrncAmt;
    }

    public long getAsstnYyAmt() {
        return asstnYyAmt;
    }

    public void setAsstnYyAmt(long asstnYyAmt) {
        this.asstnYyAmt = asstnYyAmt;
    }

    public long getPayNo() {
        return payNo;
    }

    public void setPayNo(long payNo) {
        this.payNo = payNo;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public String getPayIdFlag() {
        return payIdFlag;
    }

    public void setPayIdFlag(String payIdFlag) {
        this.payIdFlag = payIdFlag;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public String getGiroYn() {
        return giroYn;
    }

    public void setGiroYn(String giroYn) {
        this.giroYn = giroYn;
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

    public HashMap<String, Object> getKeys() {
        return keys;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setKeys(HashMap<String, Object> keys) {
        this.keys = keys;
        if( keys instanceof HashMap) {
            this.sbscrbSn = ((java.math.BigDecimal) keys.get("SBSCRBSN")).longValue();
            this.payNo = ((java.math.BigDecimal)keys.get("PAYNO")).longValue();
        }
    }

	public String getNotice() {
		return notice;
	}

	public void setNotice(String notice) {
		this.notice = notice;
	}

	public String getBrthdy() {
		return brthdy;
	}

	public void setBrthdy(String brthdy) {
		this.brthdy = brthdy;
	}

	public String getAccnutYear() {
		return accnutYear;
	}

	public void setAccnutYear(String accnutYear) {
		this.accnutYear = accnutYear;
	}

	public String getCpaId() {
		return cpaId;
	}

	public void setCpaId(String cpaId) {
		this.cpaId = cpaId;
	}

	public String getCalcFlag() {
		return calcFlag;
	}

	public void setCalcFlag(String calcFlag) {
		this.calcFlag = calcFlag;
	}

	public long getPreGnrlYyAmt() {
		return preGnrlYyAmt;
	}

	public void setPreGnrlYyAmt(long preGnrlYyAmt) {
		this.preGnrlYyAmt = preGnrlYyAmt;
	}

	public long getPreAsstnYyAmt() {
		return preAsstnYyAmt;
	}

	public void setPreAsstnYyAmt(long preAsstnYyAmt) {
		this.preAsstnYyAmt = preAsstnYyAmt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAgeDiscountYn() {
		return ageDiscountYn;
	}

	public void setAgeDiscountYn(String ageDiscountYn) {
		this.ageDiscountYn = ageDiscountYn;
	}

	public String getAppCpaNo() {
		return appCpaNo;
	}

	public void setAppCpaNo(String appCpaNo) {
		this.appCpaNo = appCpaNo;
	}
	
	
	
}

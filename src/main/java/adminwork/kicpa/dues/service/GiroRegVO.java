package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class GiroRegVO implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String rqestCd;
    private String giroJobNm;
    private String etcTypeCode;
    private String rqestDe;
    private String empPin;
    private String empId;
    
    private String etcInfoTtl;
    private String etcInfoCnte;

    public String getRqestCd() {
        return rqestCd;
    }

    public void setRqestCd(String rqestCd) {
        this.rqestCd = rqestCd;
    }

    public String getGiroJobNm() {
        return giroJobNm;
    }

    public void setGiroJobNm(String giroJobNm) {
        this.giroJobNm = giroJobNm;
    }

    public String getEtcTypeCode() {
        return etcTypeCode;
    }

    public void setEtcTypeCode(String etcTypeCode) {
        this.etcTypeCode = etcTypeCode;
    }

    public String getRqestDe() {
        return rqestDe;
    }

    public void setRqestDe(String rqestDe) {
        this.rqestDe = rqestDe;
    }

    public String getEmpPin() {
        return empPin;
    }

    public void setEmpPin(String empPin) {
        this.empPin = empPin;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
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

	@Override
    public String toString() {
        return "GiroRegVO{" +
                "rqestCd='" + rqestCd + '\'' +
                ", giroJobNm='" + giroJobNm + '\'' +
                ", etcTypeCode='" + etcTypeCode + '\'' +
                ", rqestDe='" + rqestDe + '\'' +
                ", empPin='" + empPin + '\'' +
                ", empId='" + empId + '\'' +
                '}';
    }
}

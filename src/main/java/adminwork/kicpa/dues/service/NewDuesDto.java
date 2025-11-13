package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class NewDuesDto implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String pin;
    private String mber_flag;
    private String audit_cd;
    private String audit_nm;
    private String reg_de;

    public NewDuesDto() {
    }

    public NewDuesDto(String pin, String mber_flag, String audit_cd, String audit_nm, String reg_de) {
        this.pin = pin;
        this.mber_flag = mber_flag;
        this.audit_cd = audit_cd;
        this.audit_nm = audit_nm;
        this.reg_de = reg_de;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getMber_flag() {
        return mber_flag;
    }

    public void setMber_flag(String mber_flag) {
        this.mber_flag = mber_flag;
    }

    public String getAudit_cd() {
        return audit_cd;
    }

    public void setAudit_cd(String audit_cd) {
        this.audit_cd = audit_cd;
    }

    public String getAudit_nm() {
        return audit_nm;
    }

    public void setAudit_nm(String audit_nm) {
        this.audit_nm = audit_nm;
    }

    public String getReg_de() {
        return reg_de;
    }

    public void setReg_de(String reg_de) {
        this.reg_de = reg_de;
    }
}

package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class NewDuesDetail implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private Integer sbscrb_sn;
    private String pin;
    private String dues_cl;
    private Integer dues_amt;
    private String pay_de;
    private String pay_status;
    private String pay_nm;
    private String duty_nm;
    private Enum<NewDuesCl> newDuesCl;

    public Integer getSbscrb_sn() {
        return sbscrb_sn;
    }

    public void setSbscrb_sn(Integer sbscrb_sn) {
        this.sbscrb_sn = sbscrb_sn;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getDues_cl() {
        return dues_cl;
    }

    public void setDues_cl(String dues_cl) {
        this.dues_cl = dues_cl;
    }

    public Integer getDues_amt() {
        return dues_amt;
    }

    public void setDues_amt(Integer dues_amt) {
        this.dues_amt = dues_amt;
    }

    public String getPay_de() {
        return pay_de;
    }

    public void setPay_de(String pay_de) {
        this.pay_de = pay_de;
    }

    public String getPay_status() {
        return pay_status;
    }

    public void setPay_status(String pay_status) {
        this.pay_status = pay_status;
    }

    public String getPay_nm() {
        return pay_nm;
    }

    public void setPay_nm(String pay_nm) {
        this.pay_nm = pay_nm;
    }

    public String getDuty_nm() {
        return duty_nm;
    }

    public void setDuty_nm(String duty_nm) {
        this.duty_nm = duty_nm;
    }

    public Enum<NewDuesCl> getNewDuesCl() {
        return newDuesCl;
    }

    public void setNewDuesCl(Enum<NewDuesCl> newDuesCl) {
        this.newDuesCl = newDuesCl;
    }

    public String getDuesCl() {
        return newDuesCl != null ? ((NewDuesCl) newDuesCl).getDuesCl() : null;
    }

    public String getDuesTypeNm() {
        return newDuesCl != null ? ((NewDuesCl) newDuesCl).getDuesTypeNm() : null;
    }

    public String getDuesNm() {
        return newDuesCl != null ? ((NewDuesCl) newDuesCl).getDuesNm() : null;
    }

    public String getDuesType() {
        return newDuesCl != null ? ((NewDuesCl) newDuesCl).getDuesType() : null;
    }
}
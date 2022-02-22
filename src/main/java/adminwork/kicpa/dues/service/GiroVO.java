package adminwork.kicpa.dues.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class GiroVO extends Giro implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;
    private List<GiroDetail> detailList = new ArrayList<GiroDetail>();
    private String epayNo;
    private String name;
    private String notiDlDt;
    private Long addCheckAmt;

    public List<GiroDetail> getDetailList() {
        return detailList;
    }

    public void setDetailList(GiroDetail giroDetail) {
        this.detailList.add(giroDetail);
        giroDetail.setGiroSn(this.detailList.size());
    }

    public String getEpayNo() {
        return epayNo;
    }

    public void setEpayNo(String epayNo) {
        this.epayNo = epayNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotiDlDt() {
        return notiDlDt;
    }

    public void setNotiDlDt(String notiDlDt) {
        this.notiDlDt = notiDlDt;
    }

    public Long getAddCheckAmt() {
        return addCheckAmt;
    }

    public void setAddCheckAmt(Long addCheckAmt) {
        this.addCheckAmt = addCheckAmt;
    }

    @Override
    public String toString() {
        return "GiroVO{" +
                "detailList=" + detailList +
                ", epayNo='" + epayNo + '\'' +
                ", name='" + name + '\'' +
                ", notiDlDt='" + notiDlDt + '\'' +
                ", addCheckAmt=" + addCheckAmt +
                '}';
    }
}

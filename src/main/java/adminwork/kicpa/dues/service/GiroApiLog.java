package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class GiroApiLog implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String logTm;
    private Long logSn;
    private String epayNo;
    private String giroCd;
    private String etcTypeCode;
    private String log;

    public String getLogTm() {
        return logTm;
    }

    public void setLogTm(String logTm) {
        this.logTm = logTm;
    }

    public Long getLogSn() {
        return logSn;
    }

    public void setLogSn(Long logSn) {
        this.logSn = logSn;
    }

    public String getEpayNo() {
        return epayNo;
    }

    public void setEpayNo(String epayNo) {
        this.epayNo = epayNo;
    }

    public String getGiroCd() {
        return giroCd;
    }

    public void setGiroCd(String giroCd) {
        this.giroCd = giroCd;
    }

    public String getEtcTypeCode() {
        return etcTypeCode;
    }

    public void setEtcTypeCode(String etcTypeCode) {
        this.etcTypeCode = etcTypeCode;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    @Override
    public String toString() {
        return "GiroApiLog{" +
                "logTm='" + logTm + '\'' +
                ", logSn=" + logSn +
                ", epayNo='" + epayNo + '\'' +
                ", giroCd='" + giroCd + '\'' +
                ", etcTypeCode='" + etcTypeCode + '\'' +
                ", log='" + log + '\'' +
                '}';
    }
}

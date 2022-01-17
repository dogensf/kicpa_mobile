package adminwork.kicpa.dues.service;

import java.io.Serializable;

public class GiroDetail implements Serializable {

    private static final long serialVersionUID = -6508801327314181679L;

    private String giroCd;
    private String duesCl;
    private int giroSn;
    private String key1;
    private String key2;
    private String key3;
    private String key4;
    private String key5;

    public String getGiroCd() {
        return giroCd;
    }

    public void setGiroCd(String giroCd) {
        this.giroCd = giroCd;
    }

    public String getDuesCl() {
        return duesCl;
    }

    public void setDuesCl(String duesCl) {
        this.duesCl = duesCl;
    }

    public int getGiroSn() {
        return giroSn;
    }

    public void setGiroSn(int giroSn) {
        this.giroSn = giroSn;
    }

    public String getKey1() {
        return key1;
    }

    public void setKey1(String key1) {
        this.key1 = key1;
    }

    public String getKey2() {
        return key2;
    }

    public void setKey2(String key2) {
        this.key2 = key2;
    }

    public String getKey3() {
        return key3;
    }

    public void setKey3(String key3) {
        this.key3 = key3;
    }

    public String getKey4() {
        return key4;
    }

    public void setKey4(String key4) {
        this.key4 = key4;
    }

    public String getKey5() {
        return key5;
    }

    public void setKey5(String key5) {
        this.key5 = key5;
    }

    @Override
    public String toString() {
        return "GiroDetail{" +
                "giroCd='" + giroCd + '\'' +
                ", duesCl='" + duesCl + '\'' +
                ", giroSn=" + giroSn +
                ", key1='" + key1 + '\'' +
                ", key2='" + key2 + '\'' +
                ", key3='" + key3 + '\'' +
                ", key4='" + key4 + '\'' +
                ", key5='" + key5 + '\'' +
                '}';
    }
}

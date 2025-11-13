package adminwork.kicpa.dues.service;

//11 : 일반-입회비, 12 : 일반-연회비, 21 : 회관-입회비, 31 : 부조-입회비, 32 : 부조-연회비
public enum NewDuesCl {
    GN_SBSCRB("11","입회금", "1", "일반회계"),
    GN_YEAR("12","연회비", "1", "일반회계"),
    CMIT_SBSCRB("21","입회금", "2", "회관회계"),
    AID_SBSCRB("31","입회금", "3", "부조회계"),
    AID_YEAR("32","연회비", "3", "부조회계"),
    ;

    private String duesCl;
    private String duesNm;
    private String duesType;
    private String duesTypeNm;

    NewDuesCl(String duesCl, String duesNm, String duesType, String duesTypeNm) {
        this.duesCl = duesCl;
        this.duesNm = duesNm;
        this.duesType = duesType;
        this.duesTypeNm = duesTypeNm;
    }

    public String getDuesCl() {
        return duesCl;
    }

    public String getDuesNm() {
        return duesNm;
    }

    public String getDuesType() {
        return duesType;
    }

    public String getDuesTypeNm() {
        return duesTypeNm;
    }
}
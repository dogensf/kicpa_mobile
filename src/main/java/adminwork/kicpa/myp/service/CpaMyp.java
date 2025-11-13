package adminwork.kicpa.myp.service;

public class CpaMyp {

    private String cpaSn;			        //CPA순번(마이페이지)
    private String pin;					    //개인식별번호
    private String koreanNm;		        //한글성명
    private String brthdy;				    //생년월일
    private String agreeInfo1Yn;		    //회원약관동의1
    private String agreeInfo2Yn;		    //회원약관동의2
    private String aidMberFlag;			    //부조회원구분(R정회원,A준회원)
    private String bizrNo;				    //사업자등록번호
    private String registDe;                //등록일(등록예정일)
    private String lastRegistDe;            //최종등록일
    private String mberFlag;                //회원구분 (grp_cd GA2020)
    private String auditNm;				    //감사인명
    private String auditId;				    //감사인ID
    private String auditOfcps;			    //감사인구성구분(grp_cd GA3020)
    private String passCrtiFileId;		    //공인합격사본
    private String rsumFileId;			    //이력서파일ID
    private String apntcEndFileId;		    //실무종료파일ID
    private String atchFileId;			    //기타파일ID
    private String rsumFile;			    //이력서(binary파일)
    private String rsumFileNm;			    //이력서파일명
    private String eventn;				    //이력서파일형식
    private String closedCl;			    //근무형태코드-GA2170,GA2171,GA2179
    private String closedClNm;			    //휴업분류명
    private String regFlag;				    //등록구분(승인대기:Y,승인완료 ;E, 반려:F)
    private String rejectRsn;			    //반려사유
    private String sbscrbMypSn;			    //입회비순번
    private String sbscrbYn;			    //입회비 납부여부
    private String remark;				    //비고
    private String opetrDe;				    //처리일(제출일자)
    private String userId;				    //사용자id


    public String getCpaSn() {
        return cpaSn;
    }

    public void setCpaSn(String cpaSn) {
        this.cpaSn = cpaSn;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getKoreanNm() {
        return koreanNm;
    }

    public void setKoreanNm(String koreanNm) {
        this.koreanNm = koreanNm;
    }

    public String getBrthdy() {
        return brthdy;
    }

    public void setBrthdy(String brthdy) {
        this.brthdy = brthdy;
    }

    public String getAgreeInfo1Yn() {
        return agreeInfo1Yn;
    }

    public void setAgreeInfo1Yn(String agreeInfo1Yn) {
        this.agreeInfo1Yn = agreeInfo1Yn;
    }

    public String getAgreeInfo2Yn() {
        return agreeInfo2Yn;
    }

    public void setAgreeInfo2Yn(String agreeInfo2Yn) {
        this.agreeInfo2Yn = agreeInfo2Yn;
    }

    public String getAidMberFlag() {
        return aidMberFlag;
    }

    public void setAidMberFlag(String aidMberFlag) {
        this.aidMberFlag = aidMberFlag;
    }

    public String getBizrNo() {
        return bizrNo;
    }

    public void setBizrNo(String bizrNo) {
        this.bizrNo = bizrNo;
    }

    public String getRegistDe() {
        return registDe;
    }

    public void setRegistDe(String registDe) {
        this.registDe = registDe;
    }

    public String getLastRegistDe() {
        return lastRegistDe;
    }

    public void setLastRegistDe(String lastRegistDe) {
        this.lastRegistDe = lastRegistDe;
    }

    public String getMberFlag() {
        return mberFlag;
    }

    public void setMberFlag(String mberFlag) {
        this.mberFlag = mberFlag;
    }

    public String getAuditNm() {
        return auditNm;
    }

    public void setAuditNm(String auditNm) {
        this.auditNm = auditNm;
    }

    public String getAuditId() {
        return auditId;
    }

    public void setAuditId(String auditId) {
        this.auditId = auditId;
    }

    public String getAuditOfcps() {
        return auditOfcps;
    }

    public void setAuditOfcps(String auditOfcps) {
        this.auditOfcps = auditOfcps;
    }

    public String getPassCrtiFileId() {
        return passCrtiFileId;
    }

    public void setPassCrtiFileId(String passCrtiFileId) {
        this.passCrtiFileId = passCrtiFileId;
    }

    public String getRsumFileId() {
        return rsumFileId;
    }

    public void setRsumFileId(String rsumFileId) {
        this.rsumFileId = rsumFileId;
    }

    public String getApntcEndFileId() {
        return apntcEndFileId;
    }

    public void setApntcEndFileId(String apntcEndFileId) {
        this.apntcEndFileId = apntcEndFileId;
    }

    public String getAtchFileId() {
        return atchFileId;
    }

    public void setAtchFileId(String atchFileId) {
        this.atchFileId = atchFileId;
    }

    public String getRsumFile() {
        return rsumFile;
    }

    public void setRsumFile(String rsumFile) {
        this.rsumFile = rsumFile;
    }

    public String getRsumFileNm() {
        return rsumFileNm;
    }

    public void setRsumFileNm(String rsumFileNm) {
        this.rsumFileNm = rsumFileNm;
    }

    public String getEventn() {
        return eventn;
    }

    public void setEventn(String eventn) {
        this.eventn = eventn;
    }

    public String getClosedCl() {
        return closedCl;
    }

    public void setClosedCl(String closedCl) {
        this.closedCl = closedCl;
    }

    public String getClosedClNm() {
        return closedClNm;
    }

    public void setClosedClNm(String closedClNm) {
        this.closedClNm = closedClNm;
    }

    public String getRegFlag() {
        return regFlag;
    }

    public void setRegFlag(String regFlag) {
        this.regFlag = regFlag;
    }

    public String getRejectRsn() {
        return rejectRsn;
    }

    public void setRejectRsn(String rejectRsn) {
        this.rejectRsn = rejectRsn;
    }

    public String getSbscrbMypSn() {
        return sbscrbMypSn;
    }

    public void setSbscrbMypSn(String sbscrbMypSn) {
        this.sbscrbMypSn = sbscrbMypSn;
    }

    public String getSbscrbYn() {
        return sbscrbYn;
    }

    public void setSbscrbYn(String sbscrbYn) {
        this.sbscrbYn = sbscrbYn;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getOpetrDe() {
        return opetrDe;
    }

    public void setOpetrDe(String opetrDe) {
        this.opetrDe = opetrDe;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

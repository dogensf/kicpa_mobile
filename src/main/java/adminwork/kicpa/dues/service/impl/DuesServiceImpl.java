package adminwork.kicpa.dues.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.dues.service.DeusApiService;
import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesRef;
import adminwork.kicpa.dues.service.DuesRefVO;
import adminwork.kicpa.dues.service.DuesService;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroApiLog;
import adminwork.kicpa.dues.service.GiroDetail;
import adminwork.kicpa.dues.service.GiroNtic;
import adminwork.kicpa.dues.service.GiroRegVO;
import adminwork.kicpa.dues.service.GiroVO;
import adminwork.kicpa.dues.service.NewDues;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;


@Service("DuesService")
public class DuesServiceImpl extends EgovAbstractServiceImpl implements DuesService {

	@Resource(name="DuesDAO")
	private DuesDAO duesDAO;
	
    @Resource(name = "DuesRefManageIdGnrService")
    private EgovIdGnrService idgenService;
	
	@Resource(name = "DuesApiService")
	private  DeusApiService duesApiService;
	
	
	public long selectDuesPayNo() throws Exception{
		return duesDAO.selectDuesPayNo();
	}
	
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception{
		
		return duesDAO.selectTempDuesList(vo);
	}
	
	public List<Dues> selectNewDuesList(DuesVO vo) throws Exception{		
		return duesDAO.selectNewDuesList(vo);
	}
	
	public Dues selectDues(DuesVO vo) throws Exception{
		return duesDAO.selectDues(vo);
	}
		
	public void deleteTempDues(DuesVO vo) throws Exception{
		duesDAO.deleteTempDues(vo);
	}
	
	
	public Map<String, Object> selectDuesList(DuesVO vo) throws Exception{
		List<Dues> master = duesDAO.selectDuesMasterList(vo);
		List<Dues> detail = duesDAO.selectDuesDetailList(vo);

		//고지서 정보 조회
		List<Dues> bill = duesDAO.selectDuesBillList(detail);
		List<Dues> billSum = duesDAO.selectDuesBillSum(detail);
		
		
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("master", master);
		map.put("detail", detail);
		map.put("bill", bill);
		map.put("billSum", billSum);
		
		
		return map;
	}
	
	public String selectEtcTypeCode(DuesVO vo) throws Exception{
		
		return duesDAO.selectEtcTypeCode(vo);
	}
	
	public String registerTempGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception{
        //String giroJobNm = giroRegVO.getGiroJobNm();
        String rqestDe = giroRegVO.getRqestDe();
        String giroCd = "";

        // 지로 발행 내역 등록
        Long giroJobCd = 0L;

        List<String> giroCdList = duesDAO.selectGiroCd(giroVOList.size());
        if(giroCdList.size() > 0) {
        	giroCd = giroCdList.get(0);
        }
         
        duesDAO.insertGiroAll(giroJobCd,giroCdList,giroVOList);

        // 지로발행 내역상세 등록
        for(GiroVO giroVO : giroVOList) {
            /*
             * 기존 고지 취소 처리
             * - 기존에 고지내역 조회
             * - 기존고지내역 취소요청 처리 => 차후 고지등록 시 기존 취소요청 처리 한 내역 취소 삭제 처리
             * */

            // 고지 내역 생성 
            GiroNtic giroNtic = new GiroNtic();

            giroNtic.setEpayNo(giroVO.getEpayNo());
            giroNtic.setPayYymmSeq(rqestDe.substring(0,6));
            giroNtic.setNotiIssuType("0");
            giroNtic.setEtcTypeCode(giroRegVO.getEtcTypeCode());
            giroNtic.setGiroCd(giroVO.getGiroCd());
            giroNtic.setSubGiroCd(giroVO.getSubGiroCd());
            giroNtic.setCustInqrNo(giroVO.getCustInqrNo());
            giroNtic.setDudtInAmt(giroVO.getNticAmt());
            giroNtic.setDudtAftAmt(giroVO.getNticAmt());
            giroNtic.setDudt(rqestDe);
            giroNtic.setNotiDlDt(giroVO.getNotiDlDt());
            giroNtic.setName(giroSubString(giroVO.getCstmrNm(),0,16));
            giroNtic.setPayPrrtRank("0");
            giroNtic.setEtcInfoTtl(giroRegVO.getEtcInfoTtl());
            giroNtic.setEtcInfoCnte(giroRegVO.getEtcInfoCnte());
            giroNtic.setNticFlag("N");
            giroNtic.setNticCanclFlag("N");
            giroNtic.setPayYn("N");
            giroNtic.setFrstRegistId(giroRegVO.getEmpPin());
            giroNtic.setLastUpdtId(giroRegVO.getEmpPin());

            giroNtics.add(giroNtic);
        }

        duesDAO.insertGiroNticList(giroNtics);

        return giroCd;
    }
	
	
	public List<GiroNtic> registerGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception{
        String giroJobNm = giroRegVO.getGiroJobNm();
        String rqestDe = giroRegVO.getRqestDe();

        // 지로 업무 기본 등록
        HashMap<String,Object> giroBassVO = new HashMap<String,Object>();
        giroBassVO.put("rqestCd",giroRegVO.getRqestCd());
        giroBassVO.put("giroJobNm",giroRegVO.getGiroJobNm());
        giroBassVO.put("rqestDe",giroRegVO.getRqestDe());
        giroBassVO.put("frstRegistId",giroRegVO.getEmpPin());
        giroBassVO.put("lastUpdtId",giroRegVO.getEmpPin());

        duesDAO.insertGiroBass(giroBassVO);

        // 지로 발행 내역 등록
        Long giroJobCd = (Long) giroBassVO.get("giroJobCd");

        List<String> giroCdList = duesDAO.selectGiroCd(giroVOList.size());

        duesDAO.insertGiroAll(giroJobCd,giroCdList,giroVOList);

        // 지로발행 내역상세 등록
        for(GiroVO giroVO : giroVOList) {
            /*
             * 기존 고지 취소 처리
             * - 기존에 고지내역 조회
             * - 기존고지내역 취소요청 처리 => 차후 고지등록 시 기존 취소요청 처리 한 내역 취소 삭제 처리
             * */

            // 고지 내역 생성
            GiroNtic giroNtic = new GiroNtic();

            giroNtic.setEpayNo(giroVO.getEpayNo());
            giroNtic.setPayYymmSeq(rqestDe.substring(0,6));
            giroNtic.setNotiIssuType("0");
            giroNtic.setEtcTypeCode(giroRegVO.getEtcTypeCode());
            giroNtic.setGiroCd(giroVO.getGiroCd());
            giroNtic.setCustInqrNo(giroVO.getCustInqrNo());
            giroNtic.setDudtInAmt(giroVO.getNticAmt());
            giroNtic.setDudtAftAmt(giroVO.getNticAmt());
            giroNtic.setDudt(rqestDe);
            giroNtic.setNotiDlDt(giroVO.getNotiDlDt());
            giroNtic.setName(giroSubString(giroVO.getCstmrNm(),0,16));
            giroNtic.setPayPrrtRank("0");
            giroNtic.setEtcInfoTtl("연회비");
            giroNtic.setEtcInfoCnte(giroSubString(giroRegVO.getGiroJobNm(),0,30));
            giroNtic.setNticFlag("N");
            giroNtic.setNticCanclFlag("N");
            giroNtic.setPayYn("N");
            giroNtic.setFrstRegistId(giroRegVO.getEmpPin());
            giroNtic.setLastUpdtId(giroRegVO.getEmpPin());

            giroNtics.add(giroNtic);
        }

        duesDAO.insertGiroNticList(giroNtics);

        return giroNtics;
    }
	
	
	
	
	
	
	
	
	public List<NewDues> checkDuesNewList(List<NewDues> volist) throws Exception{
		
		List<NewDues> resultList = new ArrayList();
		
		for(NewDues vo : volist) {
			NewDues rt = new NewDues();			
			
			try {
				rt = duesDAO.checkDuesNewInfo(vo);
				if(rt == null ) {
					vo.setNotice("회계사 수습번호, 이름 불일치");
					vo.setStatus("E");
				}else {
					vo.setAccnutYear(rt.getAccnutYear());
					vo.setName(rt.getName());
					vo.setPin(rt.getPin());
					vo.setCpaId(rt.getCpaId());
					vo.setGnrlEntrncAmt(rt.getGnrlEntrncAmt());
					vo.setPreGnrlYyAmt(rt.getPreGnrlYyAmt());
					vo.setCmitEntrncAmt(rt.getCmitEntrncAmt());
					vo.setAsstnEntrncAmt(rt.getAsstnEntrncAmt());
					vo.setPreAsstnYyAmt(rt.getPreAsstnYyAmt());
					vo.setAgeDiscountYn(rt.getAgeDiscountYn());
					vo.setGiroYn(rt.getGiroYn());
					vo.setCalcFlag(rt.getCalcFlag());
					vo.setNotice("정상 조회");
					vo.setStatus("S");
				}
				
			}catch(Exception e) {
				vo.setNotice("조회시 오류 발생!!");
				vo.setStatus("E");
			}
			resultList.add(vo);
			
			
		}
		
		
		
		return resultList;
		
		
	}
	
	
	
	public List<NewDues> selectDuesNewSearch(NewDues vo) throws Exception{		
		return duesDAO.selectDuesNewSearch(vo);
			
	}
	
	@Override
    public NewDues saveNewDuesPay(NewDues newDues) throws Exception {
        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        if("admin".equals(user.getUniqId())) {
            newDues.setFrstRegistId("0000000000000");
            newDues.setLastUpdtId("0000000000000");
        }else {
            newDues.setFrstRegistId(user.getAima_psl_id());
            newDues.setLastUpdtId(user.getAima_psl_id());
        }

       

        // 입회비대장 등록
        NewDues rtnNewDues = duesDAO.insertNewDues(newDues);
      
        return rtnNewDues;
    }
	
	@Override
    public Dues saveNewDuesPays(List<NewDues> newList,GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception {
        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        //입회비 마스터 정보 입력
        //납부번호 조회
       // Long payNo = duesDAO.selectDuesPayNo();
        
        for(NewDues vo : newList) {
        	
        	 if("admin".equals(user.getUniqId())) {
        		 vo.setFrstRegistId("0000000000000");
        		 vo.setLastUpdtId("0000000000000");
             }else {
            	 vo.setFrstRegistId(user.getUniqId());
            	 vo.setLastUpdtId(user.getUniqId());
             }
        	
			System.out.println("-----pin :: " + vo.getPin());
			System.out.println("-----getUniqId :: " + user.getUniqId());
			
			 //vo.setPayNo(payNo);
            if("".equals(vo.getRegistFlag()) || vo.getRegistFlag() == null){
                vo.setRegistFlag("1");
            }
            if(user.getUniqId().length()<13){
                vo.setPayIdFlag("A");	//납부자구분 A:감사인
            }
            else{
                vo.setPayIdFlag("P");	//납부자구분 P:개인
            }
            vo.setPayStatus("W");	//납부상태 W:대기
            vo.setPayId(user.getUniqId());		//납부자(감사인코드)
            vo.setGiroYn("Y");		//지로입금여부
			 
			// 입회비대장 등록
			 NewDues rtnNewDues = duesDAO.insertNewDuesTemp(vo);
			 vo.setSbscrbSn(rtnNewDues.getSbscrbSn());			 
		}
        
        
      
        //지로마스터 정보  생성
        String rqestDe = giroRegVO.getRqestDe();
        String giroCd = "";

        // 지로 발행 내역 등록
        Long giroJobCd = 0L;

        List<String> giroCdList = duesDAO.selectGiroCd(giroVOList.size());
        if(giroCdList.size() > 0) {
        	giroCd = giroCdList.get(0);
        }
        
        //giroVOList.stream().forEach(g -> g.setPayNo(payNo));
        
        duesDAO.insertGiroAll(giroJobCd,giroCdList,giroVOList);

        // 지로발행 내역상세 등록
        for(GiroVO giroVO : giroVOList) {
            /*
             * 기존 고지 취소 처리
             * - 기존에 고지내역 조회
             * - 기존고지내역 취소요청 처리 => 차후 고지등록 시 기존 취소요청 처리 한 내역 취소 삭제 처리
             * */
        	DuesVO vos = new DuesVO();
        	vos.setEpay_no(giroVO.getEpayNo());
        	vos.setPay_yymm_seq(rqestDe.substring(0,6));
        	vos.setNoti_issu_type("0");
        	vos.setEtc_type_code(giroRegVO.getEtcTypeCode());
        	List<Dues> tempList = duesDAO.selectNewDuesList(vos);
        	System.out.println("cancelList :: tempList = " + vos.toString());
        	System.out.println("cancelList :: tempList = " + tempList.size());
    		//지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
    		if(tempList.size() > 0) {    			
    			 duesApiService.cancelNoticeGiro(tempList);
    		}
        	
            // 고지 내역 생성 
            GiroNtic giroNtic = new GiroNtic();

            giroNtic.setEpayNo(giroVO.getEpayNo());
            giroNtic.setPayYymmSeq(rqestDe.substring(0,6));
            giroNtic.setNotiIssuType("0");
            giroNtic.setEtcTypeCode(giroRegVO.getEtcTypeCode());
            giroNtic.setGiroCd(giroVO.getGiroCd());
            giroNtic.setSubGiroCd("");
            giroNtic.setCustInqrNo(giroVO.getCustInqrNo());
            giroNtic.setDudtInAmt(giroVO.getNticAmt());
            giroNtic.setDudtAftAmt(giroVO.getNticAmt());
            giroNtic.setDudt(rqestDe);
            giroNtic.setNotiDlDt(giroVO.getNotiDlDt());
            giroNtic.setName(giroSubString(giroVO.getCstmrNm(),0,16));
            giroNtic.setPayPrrtRank("0");
            giroNtic.setEtcInfoTtl(giroRegVO.getEtcInfoTtl());
            giroNtic.setEtcInfoCnte(giroRegVO.getEtcInfoCnte());
            giroNtic.setNticFlag("N");
            giroNtic.setNticCanclFlag("N");
            giroNtic.setPayYn("N");
            giroNtic.setFrstRegistId(giroRegVO.getEmpPin());
            giroNtic.setLastUpdtId(giroRegVO.getEmpPin());

            giroNtics.add(giroNtic);
        }

        duesDAO.insertGiroNticList(giroNtics);
        
        List<GiroDetail> detailList = new ArrayList<>();
        
        
        int i = 0;
        for(NewDues rt : newList) {
        	// 지로발행 내역상세 등록
        	GiroDetail giroDetail = new GiroDetail();
            giroDetail.setGiroCd(giroCd);
            giroDetail.setDuesCl("00170008");
        	giroDetail.setGiroSn(i);
            giroDetail.setKey1(String.valueOf(rt.getSbscrbSn()));
            giroDetail.setKey2(rt.getPin());
            detailList.add(giroDetail);
            System.out.println("sbscrbsn =========" + rt.getSbscrbSn());
            i++;
        }
        duesDAO.insertGiroDetail(detailList);
        boolean success = true;
        // DUES_CL -- 00170008
        List<Dues> infoList = new ArrayList<Dues>();
        DuesVO vo = new DuesVO();
        vo.setGiro_cd(giroCd);
        Dues giroInfo = new Dues();
        giroInfo = duesDAO.selectDues(vo);
        infoList.add(giroInfo);
        
        
        
        success = duesApiService.createNoticeGiro(infoList);
        
        giroInfo = new Dues();
		vo.setGiro_cd(giroCd);
		giroInfo = duesDAO.selectDues(vo);
		
		Dues rt = duesApiService.createNoticeGiroLink(giroInfo);
        
        
       // return giroCd;
        return rt;
        
        
    }
	
	
	
	/**
	 * 지로 결과 저장
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int updateGiroNtic(Dues vo) throws Exception {
		vo.setNtic_flag("Y");
        vo.setNtic_cancl_flag("N");
        return duesDAO.updateGiroNtic(vo);
    }
	
	/**
	 * callBack 지로 결과 저장
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int updateGiroNticCallback(DuesVO vo) throws Exception {
				//입회비 체크
				Dues dues = duesDAO.selectGiroCode(vo);
				//입회비 이관 (SBSCRB_MASTER_EXCEL --> SBSCRB_MASTER)
				//입회비 매칭 처리 
				List<Dues> newList = new ArrayList();
				newList = duesDAO.selectNewDuesInfos(dues);
				if(newList.size() > 0 ) {
					for(Dues rt : newList) {
						duesDAO.setNewDuesInfos(rt);
					}
				}
				duesDAO.transferNewDues(dues);
						
			   vo.setPay_yn("Y");
		
			   duesDAO.updateGiroNticSubCallback(vo);
        return duesDAO.updateGiroNticCallback(vo);
    }
	
	/**
	 * callBack 지로 취소 저장
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int updateGiroNticCallbackCancel(DuesVO vo) throws Exception {
				/*//입회비 체크
				Dues dues = duesDAO.selectGiroCode(vo);
				//입회비 이관 (SBSCRB_MASTER_EXCEL --> SBSCRB_MASTER)
				duesDAO.transferNewDues(dues);
						
			   vo.setPay_yn("Y");*/
		
			   //duesDAO.updateGiroNticSubCallback(vo);
        return duesDAO.updateGiroNticCallbackCancel(vo);
    }
	
	
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception{		
		return duesDAO.selectDuesResultInfo(vo);
	}

	public List<Dues> selectDuesResultListAll(DuesVO vo) throws Exception{		
		return duesDAO.selectDuesResultListAll(vo);
	}
	
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception{		
		return duesDAO.selectDuesResultList(vo);
	}
	
	
	
	

	
	private String giroSubString(String strData , int iStartPos, int iByateLength) {
        byte[] byteTemp = null;
        int iRealStart = 0;
        int iRealEnd = 0;
        int iLength =0;
        int iChar = 0;

        String rtnStrData = "";

        try {
            byteTemp = strData.getBytes("EUC-KR");
            iLength = byteTemp.length;

            for (int iIndex =0; iIndex < iLength; iIndex++) {
                if(iStartPos <= iIndex) {
                    break;
                }
                iChar = (int)byteTemp[iIndex];

                if(iChar > 127 || iChar < 0) {
                    iRealStart++;
                    iIndex++;
                }else {
                    iRealStart++;
                }
            }

            iRealEnd = iRealStart;
            int iEndLength = iRealStart + iByateLength;
            for(int iIndex = iRealStart; iIndex < iEndLength; iIndex++) {
                iChar = (int)byteTemp[iIndex];

                if(iChar > 127 || iChar < 0) {
                    iRealEnd++;
                    iIndex++;
                }else {
                    iRealEnd++;
                }
            }

            byteTemp = strData.substring(iRealStart,iRealEnd).getBytes("EUC-KR");

            if(byteTemp.length > iByateLength) {
                iRealEnd = iRealEnd - 1;
            }

        }catch (Exception e) {

        }

        rtnStrData = strData.substring(iRealStart,iRealEnd);

        return rtnStrData;
    }
	
	
	public void updatePostSendYn(DuesVO vo) throws Exception{
		duesDAO.updatePostSendYn(vo);
	}
	
	
	public void insertDuesRef(DuesRefVO vo) throws Exception{
		String id = idgenService.getNextStringId();
		vo.setRef_id(id);
		duesDAO.insertDuesRef(vo);
	}
	
	public void updateDuesRef(DuesRefVO vo) throws Exception{
		duesDAO.updateDuesRef(vo);
	}
	
	public void deleteDuesRef(DuesRefVO vo) throws Exception{
		duesDAO.deleteDuesRef(vo);
	}
	
	public DuesRef selectDuesRefInfo(DuesRefVO vo) throws Exception{
		return duesDAO.selectDuesRefInfo(vo);
	}
	
	public Map<String, Object> selectDuesRefList(DuesRefVO vo) throws Exception{
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<DuesRef> result = duesDAO.selectDuesRefList(vo);
		int cnt = duesDAO.selectDuesRefListCnt(vo);
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	public void insertGiroApiLog(GiroApiLog giroApiLog) throws Exception {      
		duesDAO.insertGiroApiLog(giroApiLog);
	}


    public void updateSingleGiroMasterSub(Dues vo) throws Exception{
        duesDAO.updateSingleGiroMasterSub(vo);
    }

	
}

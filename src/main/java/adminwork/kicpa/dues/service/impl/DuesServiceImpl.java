package adminwork.kicpa.dues.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesService;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroNtic;
import adminwork.kicpa.dues.service.GiroRegVO;
import adminwork.kicpa.dues.service.GiroVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("DuesService")
public class DuesServiceImpl extends EgovAbstractServiceImpl implements DuesService {

	@Resource(name="DuesDAO")
	private DuesDAO duesDAO;
	
	
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception{
		
		return duesDAO.selectTempDuesList(vo);
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
		
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("master", master);
		map.put("detail", detail);
		
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
            giroNtic.setEtcInfoTtl("통합 지로");
            giroNtic.setEtcInfoCnte("통합 지로");
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
	
	
	
	
	
	
	
	
	
	
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception{		
		return duesDAO.selectDuesResultInfo(vo);
	}
	
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception{		
		return duesDAO.selectDuesResultList(vo);
	}
	
}

package adminwork.com.cmm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.com.cmm.ComDefaultCodeVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.CmmnDetailCode;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : CmmUseServiceImpl.java
 * @Description : 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기위한 서비스 구현 클래스
 * @Modification Information
 *
 * @author 공통 서비스 개발팀
 * @since 2021. 9. 25.
 * @version
 * @see
 *
 */
@Service("CmmUseService")
public class CmmUseServiceImpl extends EgovAbstractServiceImpl implements CmmUseService {

	@Resource(name = "cmmUseDAO")
	private CmmUseDAO cmmUseDAO;

	
	
	
	
	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<CmmnDetailCode> getCsCmmCodeAll() throws Exception {
		return cmmUseDAO.getCsCmmCodeAll();
	}
	
	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<CmmnDetailCode> getCmmCodeDetailAll() throws Exception {
		return cmmUseDAO.getCmmCodeDetailAll();
	}
	
	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<CmmnDetailCode> getCmmCodeDetail(ComDefaultCodeVO vo) throws Exception {
		return cmmUseDAO.getCmmCodeDetail(vo);
	}
	
	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<CmmnDetailCode> getCmmCodeDetailGrp(ComDefaultCodeVO vo) throws Exception {
		return cmmUseDAO.getCmmCodeDetailGrp(vo);
	}
	
	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<CmmnDetailCode> getCmmCodeDetailCds(ComDefaultCodeVO vo) throws Exception {
		return cmmUseDAO.getCmmCodeDetailCds(vo);
	}

	/**
	 * ComDefaultCodeVO의 리스트를 받아서 여러개의 코드 리스트를 맵에 담아서 리턴한다.
	 *
	 * @param voList
	 * @return
	 * @throws Exception
	 *//*
	@Override
	@SuppressWarnings("rawtypes")
	public Map<String, List<CmmnDetailCode>> selectCmmCodeDetails(List voList) throws Exception {
		ComDefaultCodeVO vo;
		Map<String, List<CmmnDetailCode>> map = new HashMap<String, List<CmmnDetailCode>>();

		Iterator<?> iter = voList.iterator();
		while (iter.hasNext()) {
			vo = (ComDefaultCodeVO) iter.next();
			map.put(vo.getCodeId(), cmmUseDAO.selectCmmCodeDetail(vo));
		}

		return map;
	}

	*//**
	 * 조직정보를 코드형태로 리턴한다.
	 *
	 * @param 조회조건정보 vo
	 * @return 조직정보 List
	 * @throws Exception
	 *//*
	@Override
	public List<CmmnDetailCode> selectOgrnztIdDetail(ComDefaultCodeVO vo) throws Exception {
		return cmmUseDAO.selectOgrnztIdDetail(vo);
	}

	*//**
	 * 그룹정보를 코드형태로 리턴한다.
	 *
	 * @param 조회조건정보 vo
	 * @return 그룹정보 List
	 * @throws Exception
	 *//*
	@Override
	public List<CmmnDetailCode> selectGroupIdDetail(ComDefaultCodeVO vo) throws Exception {
		return cmmUseDAO.selectGroupIdDetail(vo);
	}*/
}

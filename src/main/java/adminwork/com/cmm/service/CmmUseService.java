package adminwork.com.cmm.service;

import java.util.List;

import adminwork.com.cmm.ComDefaultCodeVO;



/**
 *
 * 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기 위한 서비스 인터페이스
 *
 * </pre>
 */
public interface CmmUseService {

	

    /**
     * 공통코드를 조회한다.
     *
     * @param vo
     * @return List(코드)
     * @throws Exception
     */
    public List<CmmnDetailCode> getCsCmmCodeAll() throws Exception;
	
	
    /**
     * 공통코드를 조회한다.
     *
     * @param vo
     * @return List(코드)
     * @throws Exception
     */
    public List<CmmnDetailCode> getCmmCodeDetailAll() throws Exception;
	
    /**
     * 공통코드를 조회한다.
     *
     * @param vo
     * @return List(코드)
     * @throws Exception
     */
    public List<CmmnDetailCode> getCmmCodeDetail(ComDefaultCodeVO vo) throws Exception;
    
    /**
     * 공통코드를 조회한다.
     *
     * @param vo
     * @return List(코드)
     * @throws Exception
     */
    public List<CmmnDetailCode> getCmmCodeDetailGrp(ComDefaultCodeVO vo) throws Exception;
    
    /**
     * 공통코드를 조회한다.
     *
     * @param vo
     * @return List(코드)
     * @throws Exception
     */
    public List<CmmnDetailCode> getCmmCodeDetailCds(ComDefaultCodeVO vo) throws Exception;
    
    
    
    
    

   /* *//**
     * ComDefaultCodeVO의 리스트를 받아서 여러개의 코드 리스트를 맵에 담아서 리턴한다.
     *
     * @param voList
     * @return Map(코드)
     * @throws Exception
     *//*
    public Map<String, List<CmmnDetailCode>> selectCmmCodeDetails(List<?> voList) throws Exception;

    *//**
     * 조직정보를 코드형태로 리턴한다.
     *
     * @param 조회조건정보 vo
     * @return 조직정보 List
     * @throws Exception
     *//*
    public List<CmmnDetailCode> selectOgrnztIdDetail(ComDefaultCodeVO vo) throws Exception;

    *//**
     * 그룹정보를 코드형태로 리턴한다.
     *
     * @param 조회조건정보 vo
     * @return 그룹정보 List
     * @throws Exception
     *//*
    public List<CmmnDetailCode> selectGroupIdDetail(ComDefaultCodeVO vo) throws Exception;*/
}

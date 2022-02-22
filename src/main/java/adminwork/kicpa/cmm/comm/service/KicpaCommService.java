package adminwork.kicpa.cmm.comm.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  KicpaCommService {


	public List<EgovMap> selectCodebaseList(Map<String,Object> map) throws Exception;
}
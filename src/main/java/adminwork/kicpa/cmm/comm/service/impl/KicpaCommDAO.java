package adminwork.kicpa.cmm.comm.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("kicpaCommDAO")
public class KicpaCommDAO extends EgovAbstractDAO{

	public List<EgovMap> selectCodebaseList(Map<String,Object> map) throws Exception {
        return (List<EgovMap>) list("KicpaCommDAO.selectCodebaseList",map);
	}
}

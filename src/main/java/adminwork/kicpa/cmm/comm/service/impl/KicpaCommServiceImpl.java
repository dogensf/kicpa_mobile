package adminwork.kicpa.cmm.comm.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("kicpaCommService")
public class KicpaCommServiceImpl extends EgovAbstractServiceImpl implements KicpaCommService{

	@Resource(name="kicpaCommDAO")
	private KicpaCommDAO kicpaCommDAO;

	@Override
	public List<EgovMap> selectCodebaseList(Map<String,Object> map) throws Exception {
		return kicpaCommDAO.selectCodebaseList(map);
	}

	@Override
	public void selectImmnum(Map<String, Object> map) throws Exception {
		try {
			int cnt = kicpaCommDAO.selectImmnumCnt(map);

			if(cnt == 0) {
				kicpaCommDAO.insertImmnum(map);
			}

			String immnum = kicpaCommDAO.selectImmnum(map);
			map.put("immnum", immnum);

		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}




}

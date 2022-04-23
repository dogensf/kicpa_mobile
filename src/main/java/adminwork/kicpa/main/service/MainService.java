package adminwork.kicpa.main.service;

import java.util.List;

public interface  MainService {
	
	public Scalendar selectCalCnt(Scalendar vo)throws Exception;
	
	public List<Scalendar> selectCalList(Scalendar vo)throws Exception;
	
	public void setFcmToken(Main vo)throws Exception;

}

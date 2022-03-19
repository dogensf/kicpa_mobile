package adminwork.let.uat.uia.service.impl;

import org.springframework.stereotype.Repository;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;


@Repository("loginDAO2")
public class LoginDAO2 extends EgovComAbstractDAO2 {

	
    
    public LoginVO kicpaInfo(LoginVO vo) throws Exception {
    	return (LoginVO)select("loginDAO2.kicpaInfo", vo);
    }

    
    
    
}

package adminwork.let.uat.uia.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import adminwork.com.cmm.LoginVO;
import egovframework.rte.fdl.security.userdetails.EgovUserDetails;
import egovframework.rte.fdl.security.userdetails.jdbc.EgovUsersByUsernameMapping;

/**
 * mapRow 결과를 사용자 EgovUserDetails Object 에 정의한다.
 *
 * @author ByungHun Woo
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    -------------    ----------------------
 *   2009.03.10  ByungHun Woo    최초 생성
 *   2009.03.20  이문준          UPDATE
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 * </pre>
 */

public class SessionMapping extends EgovUsersByUsernameMapping  {

	/**
	 * 사용자정보를 테이블에서 조회하여 EgovUsersByUsernameMapping 에 매핑한다.
	 * @param ds DataSource
	 * @param usersByUsernameQuery String
	 */
	public SessionMapping(DataSource ds, String usersByUsernameQuery) {
        super(ds, usersByUsernameQuery);
    }

	/**
	 * mapRow Override
	 * @param rs ResultSet 결과
	 * @param rownum row num
	 * @return Object EgovUserDetails
	 * @exception SQLException
	 */
	@Override
	protected EgovUserDetails mapRow(ResultSet rs, int rownum) throws SQLException {
    	logger.debug("## EgovUsersByUsernameMapping mapRow ##");

        String strUserId    = rs.getString("user_id");
        String strPassWord  = rs.getString("password");
        //String strPassWord  = "0000";
        boolean strEnabled  = rs.getBoolean("enabled");
        //boolean strEnabled  = true;

        String strUserNm    = rs.getString("user_nm");
        String strUserSe    = rs.getString("user_se");
        /*String strUserEmail = rs.getString("user_email");*/
        String strOrgnztId  = rs.getString("orgnzt_id");
        String strUniqId    = rs.getString("esntl_id");
        
        //String strOrgnztNm    = rs.getString("orgnzt_nm");

        /*String aima_emp_id   =  rs.getString("aima_emp_id");
        String aima_dept_pcode   =  rs.getString("aima_dept_pcode");
        String aima_dept_code   =  rs.getString("aima_dept_code");
        String aima_dept_pname   =  rs.getString("aima_dept_pname");
        String aima_dept_name   =  rs.getString("aima_dept_name");
        String aima_dept_ord   =  rs.getString("aima_dept_ord");
        String aima_posi_code   =  rs.getString("aima_posi_code");
        String aima_posi_name   =  rs.getString("aima_posi_name");
        String aima_posi_rcode   =  rs.getString("aima_posi_rcode");
        String aima_posi_rname   =  rs.getString("aima_posi_rname");
        String aima_kor_nm   =  rs.getString("aima_kor_nm");
        String aima_eng_nm   =  rs.getString("aima_eng_nm");
        String aima_chi_nm   =  rs.getString("aima_chi_nm");
        String aima_psl_id   =  rs.getString("aima_psl_id");
        String aima_birth   =  rs.getString("aima_birth");
        String aima_sex   =  rs.getString("aima_sex");
        String aima_enter_dt   =  rs.getString("aima_enter_dt");
        String aima_retire_dt   =  rs.getString("aima_retire_dt");
        String aima_work_gubn   =  rs.getString("aima_work_gubn");
        String aima_zip   =  rs.getString("aima_zip");
        String aima_add1   =  rs.getString("aima_add1");
        String aima_add2   =  rs.getString("aima_add2");
        String aima_tel   =  rs.getString("aima_tel");
        String aima_mobile   =  rs.getString("aima_mobile");
        String aima_e_mail   =  rs.getString("aima_e_mail");
        String aima_off_tel   =  rs.getString("aima_off_tel");
        String aima_fax   =  rs.getString("aima_fax");
        String aima_eap_ord   =  rs.getString("aima_eap_ord");
        String aima_dept2_pcode   =  rs.getString("aima_dept2_pcode");
        String aima_dept2_code   =  rs.getString("aima_dept2_code");
        String aima_dept2_pname   =  rs.getString("aima_dept2_pname");
        String aima_dept2_name   =  rs.getString("aima_dept2_name");
        String aima_dept2_ord   =  rs.getString("aima_dept2_ord");*/
        
        


        // 세션 항목 설정
        LoginVO loginVO = new LoginVO();
/*        loginVO.setEmpId(aima_emp_id);
        loginVO.setAima_dept_pcode(aima_dept_pcode);
        loginVO.setAima_dept_code(aima_dept_code);
        loginVO.setAima_dept_name(aima_dept_name);
        
        
        loginVO.setEmail(strUserEmail);
        */
        loginVO.setPassword(strPassWord);
        loginVO.setName(strUserNm);
        loginVO.setUserSe(strUserSe);
        loginVO.setId(strUserId);
        loginVO.setUniqId(strUniqId);
        loginVO.setOrgnztId(strOrgnztId);
       
        //loginVO.setOrgnztNm(strOrgnztNm);

        return new EgovUserDetails(strUserId, strPassWord, strEnabled, loginVO);
    }
}

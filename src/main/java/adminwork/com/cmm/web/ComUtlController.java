package adminwork.com.cmm.web;

import egovframework.rte.fdl.property.EgovPropertyService;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.ComDefaultCodeVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.CmmnDetailCode;
import adminwork.com.cmm.service.EgovCmmUseService;

/**
 * 공통유틸리티성 작업을 위한 Controller 클래스
 *
 *  </pre>
 */
@Controller
public class ComUtlController {

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;
	
    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;
	
	@RequestMapping(value = "/getComnCode.do")
	public  ModelAndView getCommCodes(@RequestParam("grpCd") String grpCd, HttpSession session, @RequestParam(value = "useYn", required = false) String useYn)throws Exception {

		ModelAndView mav = new ModelAndView("jsonView");		
		ComDefaultCodeVO vo = new ComDefaultCodeVO();

		List<String> list = new ArrayList<String>();

		String[] splitStr = grpCd.split(",");
		for(int i=0; i<splitStr.length; i++){
		    list.add(splitStr[i]);
		}
		
		Iterator<String> iter = list.iterator();
		String cd = "";
		while(iter.hasNext()){ 
			cd = iter.next();
			vo.setGrpCd(cd);
			vo.setUseYn(useYn);
			List<CmmnDetailCode> lists = cmmUseService.getCmmCodeDetail(vo);
			mav.addObject(cd, lists);			
			System.out.println(cd);
		}
		
		//mav.set
		
		return mav;
		
	}
	
	
	

/*	*//**
	 * JSP 호출작업만 처리하는 공통 함수
	 *//*
	@RequestMapping(value = "/EgovPageLink.do")
	public String moveToPage(@RequestParam("link") String linkPage, HttpSession session, @RequestParam(value = "baseMenuNo", required = false) String baseMenuNo) {
		String link = linkPage;
		// service 사용하여 리턴할 결과값 처리하는 부분은 생략하고 단순 페이지 링크만 처리함
		if (linkPage == null || linkPage.equals("")) {
			link = "cmm/egovError";
		} else {
			if (link.indexOf(",") > -1) {
				link = link.substring(0, link.indexOf(","));
			}
		}
		// 선택된 메뉴정보를 세션으로 등록한다.
		if (baseMenuNo != null && !baseMenuNo.equals("") && !baseMenuNo.equals("null")) {
			session.setAttribute("baseMenuNo", baseMenuNo);
		}
		return link;
	}*/




}
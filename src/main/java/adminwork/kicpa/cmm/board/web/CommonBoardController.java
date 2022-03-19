package adminwork.kicpa.cmm.board.web;


import java.io.File;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Controller
@RequestMapping(value="/kicpa/commonBoard")
public class CommonBoardController {

	@Resource(name = "commonBoardService")
	private CommonBoardService commonBoardService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;


	@RequestMapping(value = "/boardDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap boardDetail = null;


        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

        //param를 boardmaster맵으로 merge
        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
        	commonBoardService.updateCommonBoardReadCnt(boardMaster);
        	boardDetail = commonBoardService.selectCommonCafeBoardDetail(boardMaster);
        }else {
        	commonBoardService.updateCommonCafeBoardReadCnt(boardMaster);
        	boardDetail = commonBoardService.selectCommonBoardDetail(boardMaster);
        }

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			model.addAttribute("loginVO", user);
		}

//        StringUtil.checkMapReplaceHtml(boardDetail);
        model.addAttribute("boardDetail", boardDetail);
        model.addAttribute("boardMaster", boardMaster);


		return "kicpa/common/boardDetail";
	}


	@RequestMapping(value="/getCommonBoardList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
    		modelAndView.setViewName("jsonView");

    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

    			if(isAuthenticated) {
    				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    				map.put("userId", user.getId());
    			}

	    		List<EgovMap> boardList = null;
	    		int totalCnt;


		        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
		        map.put("pageSize", 10);

		        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

		        //param를 boardmaster맵으로 merge
		        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

		        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
		        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
		        	totalCnt = commonBoardService.selectCommonCafeBoardListCnt(boardMaster);
		        }else {
		        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
		        	totalCnt = commonBoardService.selectCommonBoardListCnt(boardMaster);

		        }

		        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("boardList", boardList);
				modelAndView.addObject("boardMaster", boardMaster);
				modelAndView.addObject("totalCnt", totalCnt);
				modelAndView.addObject("pageIndex", map.get("pageIndex"));
				modelAndView.addObject("isLogin", true);

    		}else {
    			modelAndView.addObject("isLogin", false);
    		}
    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	// boardId가 다수일때
	@RequestMapping(value="/getCommonBoardArrList.do")
    public ModelAndView getBoardArrList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
    		modelAndView.setViewName("jsonView");

    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

	    		List<EgovMap> boardList = null;
	    		int totalCnt;


		        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
		        map.put("pageSize", 10);

		        map.put("boardIds", StringUtil.isNullToString(map.get("boardId"),"").split("/"));

	//	        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

		        //param를 boardmaster맵으로 merge
	//	        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));
	//
	//	        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
	//	        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
	//	        	totalCnt = commonBoardService.selectCommonCafeBoardListCnt(boardMaster);
	//	        }else {
	//	        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
	//	        	totalCnt = commonBoardService.selectCommonBoardListCnt(boardMaster);
	//
	//	        }

		        boardList = commonBoardService.selectCommonBoardIdArrList(map);
		        totalCnt = commonBoardService.selectCommonBoardIdArrListCnt(map);

	//
		        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));

				modelAndView.addObject("boardList", boardList);
				modelAndView.addObject("totalCnt", totalCnt);
				modelAndView.addObject("pageIndex", map.get("pageIndex"));
				modelAndView.addObject("isLogin", true);

     		}else {
    			modelAndView.addObject("isLogin", false);
    		}
    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }


	@RequestMapping(value="/getCommonBoardDetail.do")
    public ModelAndView getCommonBoardDetail(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{

    		EgovMap boardDetail = null;

	        modelAndView.setViewName("jsonView");

	        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

	        //param를 boardmaster맵으로 merge
	        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

	        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
	        	commonBoardService.updateCommonBoardReadCnt(map);
	        	boardDetail = commonBoardService.selectCommonCafeBoardDetail(boardMaster);
	        }else {
	        	commonBoardService.updateCommonCafeBoardReadCnt(map);
	        	boardDetail = commonBoardService.selectCommonBoardDetail(boardMaster);
	        }


//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardDetail", boardDetail);
			modelAndView.addObject("boardMaster", boardMaster);

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }




	@RequestMapping(value="/boardFileDownload.do")
	public void boardFileDownload(@RequestParam Map<String,Object> map, HttpServletRequest request,HttpServletResponse response) throws Exception{

		try{

			EgovMap boardDetail = null;

			Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

			//param를 boardmaster맵으로 merge
//			map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

			EgovMap fileDetail = null;

			if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {

				fileDetail = commonBoardService.selectCommonCateBoardFileDetail(map);
				commonBoardService.updateCommonCafeBoardFileDownCnt(map);
			}else {
				fileDetail = commonBoardService.selectCommonBoardFileDetail(map);
				commonBoardService.updateCommonBoardFileDownCnt(map);
			}



//			String path = "https://www.kicpa.or.kr"+File.separator+"upload"+File.separator+"board"+File.separator+"attach"+File.separator+fileDetail.get("boardId")+File.separator+fileDetail.get("fileMask");
			String path = propertyService.getString("Globals.fileStorePath")+File.separator+"board"+File.separator+"attach"+File.separator+fileDetail.get("boardId")+File.separator+fileDetail.get("fileMask");
			fileUtil.downFile(response,path , String.valueOf(fileDetail.get("fileNm")));



//	        StringUtil.checkMapReplaceHtml(boardDetail);


		}catch (Exception e) {
			e.printStackTrace();
		}

	}



}

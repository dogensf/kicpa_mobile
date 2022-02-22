package adminwork.kicpa.accIstAlert.web;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/accIstAlert")
public class AccIstAlertController {


	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;


	@RequestMapping(value = "/accIstBoardList.do")
	public String accIstBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/accIstBoardList";
	}

	@RequestMapping(value = "/inspectTaskBoardList.do")
	public String inspectTaskBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/inspectTaskBoardList";
	}

	@RequestMapping(value = "/authTaskBoardList.do")
	public String authTaskBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/authTaskBoardList";
	}

	@RequestMapping(value = "/relationTaskBoardList.do")
	public String relationTaskBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/relationTaskBoardList";
	}

	@RequestMapping(value = "/accManagementBoardList.do")
	public String accManagementBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/accIstAlert/accManagementBoardList";
	}

	@RequestMapping(value = "/evaluationkBoardList.do")
	public String evaluationkBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/evaluationkBoardList";
	}

	@RequestMapping(value = "/etcBoardList.do")
	public String etcBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/etcBoardList";
	}

	@RequestMapping(value = "/accIstWlBoardList.do")
	public String accIstWlBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/accIstWlBoardList";
	}

	@RequestMapping(value = "/writeCaseBoardList.do")
	public String writeCaseBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/writeCaseBoardList";
	}

	@RequestMapping(value = "/organizationBoardList.do")
	public String organizationBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/organizationBoardList";
	}


}

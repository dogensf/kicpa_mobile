package adminwork.kicpa.accIstAlert.web;


import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;



@Controller
@RequestMapping(value="/kicpa/accIstAlert")
public class AccIstAlertController {


	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;

	@RequestMapping(value = "/accIstAlertCategoryMain.do")
	public String accIstAlertCategoryMain(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		model.addAttribute("views", map.get("views"));
		return "kicpa/accIstAlert/accIstAlertCategoryMain";
	}

	@RequestMapping(value = "/accIstAlertCategory.do")
	public String accIstAlertCategory(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		model.addAttribute("views", map.get("views"));
		return "kicpa/accIstAlert/accIstAlertCategory";
	}
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
	@RequestMapping(value = "/ethicsBoardList.do")
	public String ethicsBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/ethicsBoardList";
	}
	@RequestMapping(value = "/contributeBoardList.do")
	public String contributeBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/contributeBoardList";
	}
	@RequestMapping(value = "/ifrsBoardList.do")
	public String ifrsBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/accIstAlert/ifrsBoardList";
	}


}

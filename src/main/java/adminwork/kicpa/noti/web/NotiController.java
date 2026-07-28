package adminwork.kicpa.noti.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.noti.service.NotiService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
@RequestMapping(value = "/kicpa/noti")
public class NotiController {

	@Resource(name = "NotiService")
	private NotiService notiService;

	/** 알림함 화면 */
	@RequestMapping(value = "/notiList.do")
	public String notiList(@RequestParam Map<String, Object> map, ModelMap model) throws Exception {
		model.addAttribute("title", "알림");
		return "kicpa/noti/notiList";
	}

	/** 알림함 목록 JSON */
	@RequestMapping(value = "/getNotiList.do")
	public ModelAndView getNotiList(@RequestBody Map<String, Object> map) throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		try {
			modelAndView.setViewName("jsonView");
			map.put("pageIndex", Integer.parseInt(StringUtil.isNullToString(map.get("pageIndex"), "1")));
			map.put("pageSize", 10);
			notiService.selectNotiLists(map);
			@SuppressWarnings("unchecked")
			List<EgovMap> notiList = (List<EgovMap>) map.get("resultList");
			notiList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("boardList", notiList);
			modelAndView.addObject("totalCnt", map.get("resultCnt"));
			modelAndView.addObject("pageIndex", map.get("pageIndex"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return modelAndView;
	}

	/** 기기(토큰)별 푸시 수신동의 조회 */
	@RequestMapping(value = "/getPushSetting.do")
	public ModelAndView getPushSetting(@RequestBody Map<String, Object> map) throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		try {
			modelAndView.setViewName("jsonView");
			String token = StringUtil.isNullToString(map.get("token"));
			if ("".equals(token)) {
				modelAndView.addObject("pushYn", "N");
			} else {
				modelAndView.addObject("pushYn", notiService.selectPushSetting(map));
			}
		} catch (Exception e) {
			e.printStackTrace();
			modelAndView.addObject("pushYn", "N");
		}
		return modelAndView;
	}

	/** 기기(토큰)별 푸시 수신동의 저장 */
	@RequestMapping(value = "/savePushSetting.do")
	public ModelAndView savePushSetting(@RequestBody Map<String, Object> map) throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		try {
			modelAndView.setViewName("jsonView");
			String token = StringUtil.isNullToString(map.get("token"));
			String pushYn = StringUtil.isNullToString(map.get("pushYn"));
			if ("".equals(token) || (!"Y".equals(pushYn) && !"N".equals(pushYn))) {
				modelAndView.addObject("result", "FAIL");
			} else {
				notiService.updatePushSetting(map);
				modelAndView.addObject("result", "OK");
			}
		} catch (Exception e) {
			e.printStackTrace();
			modelAndView.addObject("result", "FAIL");
		}
		return modelAndView;
	}
}

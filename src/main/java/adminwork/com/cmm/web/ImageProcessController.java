package adminwork.com.cmm.web;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import adminwork.com.cmm.SessionVO;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileVO;

/**
 * @Class Name :ImageProcessController.java
 * @Description :
 * @Modification Information
 *
 *
 *
 * @version
 * @see
 *
 */
@SuppressWarnings("serial")
@Controller
public class ImageProcessController extends HttpServlet {

	@Resource(name = "FileMngService")
	private FileMngService fileService;

	private static final Logger LOGGER = LoggerFactory.getLogger(ImageProcessController.class);

	/**
	 * 첨부된 이미지에 대한 미리보기 기능을 제공한다.
	 *
	 * @param atchFileId
	 * @param fileSn
	 * @param sessionVO
	 * @param model
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("resource")
	@RequestMapping("/cmm/fms/getImage.do")
	public void getImageInf(SessionVO sessionVO, ModelMap model, @RequestParam Map<String, Object> commandMap, HttpServletResponse response) throws Exception {

		String atchFileId = (String) commandMap.get("atchFileId");
		String fileSn = (String) commandMap.get("fileSn");

		FileVO vo = new FileVO();

		vo.setAtchFileId(atchFileId);
		vo.setFileSn(fileSn);

		FileVO fvo = fileService.selectFileInf(vo);

		File file = new File(fvo.getFileStreCours(), fvo.getStreFileNm());
		FileInputStream fis = null;
		new FileInputStream(file);

		BufferedInputStream in = null;
		ByteArrayOutputStream bStream = null;
		try {
			fis = new FileInputStream(file);
			in = new BufferedInputStream(fis);
			bStream = new ByteArrayOutputStream();
			int imgByte;
			while ((imgByte = in.read()) != -1) {
				bStream.write(imgByte);
			}

			String type = "";

			if (fvo.getFileExtsn() != null && !"".equals(fvo.getFileExtsn())) {
				if ("jpg".equals(fvo.getFileExtsn().toLowerCase())) {
					type = "image/jpeg";
				} else {
					type = "image/" + fvo.getFileExtsn().toLowerCase();
				}
				type = "image/" + fvo.getFileExtsn().toLowerCase();

			} else {
				LOGGER.debug("Image fileType is null.");
			}

			response.setHeader("Content-Type", type);
			response.setContentLength(bStream.size());

			bStream.writeTo(response.getOutputStream());

			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			LOGGER.debug("{}", e);
		} finally {
			if (bStream != null) {
				try {
					bStream.close();
				} catch (Exception est) {
					LOGGER.debug("IGNORED: {}", est.getMessage());
				}
			}
			if (in != null) {
				try {
					in.close();
				} catch (Exception ei) {
					LOGGER.debug("IGNORED: {}", ei.getMessage());
				}
			}
			if (fis != null) {
				try {
					fis.close();
				} catch (Exception efis) {
					LOGGER.debug("IGNORED: {}", efis.getMessage());
				}
			}
		}
	}
}

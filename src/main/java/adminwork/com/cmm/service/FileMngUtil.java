package adminwork.com.cmm.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.utils.URLEncodedUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
//import java.util.HashMap;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import adminwork.let.utl.fcc.service.StringUtil;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Class Name  : EgovFileMngUtil.java
 * @Description : 메시지 처리 관련 유틸리티
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *   2009.02.13       이삼섭                  최초 생성
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 02. 13
 * @version 1.0
 * @see
 *
 */
@Component("FileMngUtil")
public class FileMngUtil {

    public static final int BUFF_SIZE = 2048;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    @Resource(name = "egovFileIdGnrService")
    private EgovIdGnrService idgenService;

    private static final Logger LOGGER = LoggerFactory.getLogger(FileMngUtil.class);

    /**
     * 첨부파일에 대한 목록 정보를 취득한다.
     *
     * @param files
     * @return
     * @throws Exception
     */
    public List<FileVO> parseFileInf(Map<String, MultipartFile> files, String KeyStr, int fileKeyParam, String atchFileId, String storePath) throws Exception {
	int fileKey = fileKeyParam;

	String storePathString = "";
	String atchFileIdString = "";

	if ("".equals(storePath) || storePath == null) {
	    storePathString = propertyService.getString("Globals.fileStorePath");
	} else {
	    storePathString = propertyService.getString(storePath);
	}

	if ("".equals(atchFileId) || atchFileId == null) {
	    atchFileIdString = idgenService.getNextStringId();
	} else {
	    atchFileIdString = atchFileId;
	}

	File saveFolder = new File(storePathString);

	if (!saveFolder.exists() || saveFolder.isFile()) {
	    saveFolder.mkdirs();
	}

	Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
	MultipartFile file;
	String filePath = "";
	List<FileVO> result  = new ArrayList<FileVO>();
	FileVO fvo;

	while (itr.hasNext()) {
	    Entry<String, MultipartFile> entry = itr.next();

	    file = entry.getValue();
	    String orginFileName = file.getOriginalFilename();

	    //--------------------------------------
	    // 원 파일명이 없는 경우 처리
	    // (첨부가 되지 않은 input file type)
	    //--------------------------------------
	    if ("".equals(orginFileName)) {
		continue;
	    }
	    ////------------------------------------

	    int index = orginFileName.lastIndexOf(".");
	    //String fileName = orginFileName.substring(0, index);
	    String fileExt = orginFileName.substring(index + 1);
	    String newName = KeyStr + StringUtil.getTimeStamp() + fileKey;
	    long _size = file.getSize();

	    if (!"".equals(orginFileName)) {
		filePath = storePathString + File.separator + newName;
		file.transferTo(new File(filePath));
	    }
	    fvo = new FileVO();
	    fvo.setFileExtsn(fileExt);
	    fvo.setFileStreCours(storePathString);
	    fvo.setFileMg(Long.toString(_size));
	    fvo.setOrignlFileNm(orginFileName);
	    fvo.setStreFileNm(newName);
	    fvo.setAtchFileId(atchFileIdString);
	    fvo.setFileSn(String.valueOf(fileKey));

	    //writeFile(file, newName, storePathString);
	    result.add(fvo);

	    fileKey++;
	}

	return result;
    }

	/**
	 * 첨부파일에 대한 목록 정보를 취득한다.
	 *
	 * @param files
	 * @return
	 * @throws Exception
	 */
	public List<FileVO> parseAtchFileInf(Map<String, MultipartFile> files, String KeyStr, int fileKeyParam, String atchFileId, String storePath) throws Exception {
		int fileKey = fileKeyParam;

		String storePathString = "";
		String atchFileIdString = "";

		if ("".equals(storePath) || storePath == null) {
			storePathString = propertyService.getString("Globals.fileStorePath");
		} else {
			storePathString = propertyService.getString(storePath);
		}

		storePathString = storePathString +  File.separator +  KeyStr;

		if ("".equals(atchFileId) || atchFileId == null) {
			atchFileIdString = idgenService.getNextStringId();
		} else {
			atchFileIdString = atchFileId;
		}

		File saveFolder = new File(storePathString);

		if (!saveFolder.exists() || saveFolder.isFile()) {
			saveFolder.mkdirs();
		}

		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		MultipartFile file;
		String filePath = "";
		List<FileVO> result  = new ArrayList<FileVO>();
		FileVO fvo;

		//while (itr.hasNext()) {
		Entry<String, MultipartFile> entry = null;
			for(int i=0; i<=fileKey; i++){
				entry = itr.next();
			}


			file = entry.getValue();
			String orginFileName = file.getOriginalFilename();

			//--------------------------------------
			// 원 파일명이 없는 경우 처리
			// (첨부가 되지 않은 input file type)
			//--------------------------------------
			/*if ("".equals(orginFileName)) {
				continue;
			}*/
			////------------------------------------
			fileKey=0;
			int index = orginFileName.lastIndexOf(".");
			//String fileName = orginFileName.substring(0, index);
			String fileExt = orginFileName.substring(index + 1);
			String newName = "SNAP_" + StringUtil.getTimeStamp() + fileKey+"."+fileExt;
			long _size = file.getSize();

			if (!"".equals(orginFileName)) {
				filePath = storePathString + File.separator + newName;
				file.transferTo(new File(filePath));
			}
			fvo = new FileVO();
			fvo.setFileExtsn(fileExt);
			fvo.setFileStreCours(storePathString);
			fvo.setFileMg(Long.toString(_size));
			fvo.setOrignlFileNm(orginFileName);
			fvo.setStreFileNm(newName);
			fvo.setAtchFileId(atchFileIdString);
			fvo.setFileSn(String.valueOf(fileKey));

			//writeFile(file, newName, storePathString);
			result.add(fvo);

			//fileKey++;
		//}

		return result;
	}

    /**
     * 첨부파일을 서버에 저장한다.
     *
     * @param file
     * @param newName
     * @param stordFilePath
     * @throws Exception
     */
    protected void writeUploadedFile(MultipartFile file, String newName, String stordFilePath) throws Exception {
	InputStream stream = null;
	OutputStream bos = null;
	String stordFilePathReal = (stordFilePath==null?"":stordFilePath).replaceAll("..","");
	try {
	    stream = file.getInputStream();
	    File cFile = new File(stordFilePathReal);

	    if (!cFile.isDirectory()) {
		boolean _flag = cFile.mkdir();
		if (!_flag) {
		    throw new IOException("Directory creation Failed ");
		}
	    }

	    bos = new FileOutputStream(stordFilePathReal + File.separator + newName);

	    int bytesRead = 0;
	    byte[] buffer = new byte[BUFF_SIZE];

	    while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
		bos.write(buffer, 0, bytesRead);
	    }
	} catch (FileNotFoundException fnfe) {
		LOGGER.debug("fnfe: {}", fnfe);
	} catch (IOException ioe) {
		LOGGER.debug("ioe: {}", ioe);
	} catch (Exception e) {
		LOGGER.debug("e: {}", e);
	} finally {
	    if (bos != null) {
		try {
		    bos.close();
		} catch (Exception ignore) {
			LOGGER.debug("IGNORED: {}", ignore.getMessage());
		}
	    }
	    if (stream != null) {
		try {
		    stream.close();
		} catch (Exception ignore) {
			LOGGER.debug("IGNORED: {}", ignore.getMessage());
		}
	    }
	}
    }

    /**
     * 서버의 파일을 다운로드한다.
     *
     * @param request
     * @param response
     * @throws Exception
     */
    public static void downFile(HttpServletRequest request, HttpServletResponse response) throws Exception {

    String downFileName = StringUtil.isNullToString(request.getAttribute("downFile")).replaceAll("..","");
    String orgFileName = StringUtil.isNullToString(request.getAttribute("orgFileName")).replaceAll("..","");

	/*if ((String)request.getAttribute("downFile") == null) {
	    downFileName = "";
	} else {
	    downFileName = EgovStringUtil.isNullToString(request.getAttribute("downFile"));
	}*/

	/*if ((String)request.getAttribute("orgFileName") == null) {
	    orgFileName = "";
	} else {
	    orgFileName = (String)request.getAttribute("orginFile");
	}*/

	File file = new File(downFileName);

	if (!file.exists()) {
	    throw new FileNotFoundException(downFileName);
	}

	if (!file.isFile()) {
	    throw new FileNotFoundException(downFileName);
	}

	byte[] b = new byte[BUFF_SIZE]; //buffer size 2K.
    String fName = (new String(orgFileName.getBytes(), "UTF-8")).replaceAll("\r\n","");
	response.setContentType("application/x-msdownload");
	response.setHeader("Content-Disposition:", "attachment; filename=" + fName);
	response.setHeader("Content-Transfer-Encoding", "binary");
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Expires", "0");

	BufferedInputStream fin = null;
	BufferedOutputStream outs = null;

	try {
		fin = new BufferedInputStream(new FileInputStream(file));
	    outs = new BufferedOutputStream(response.getOutputStream());
	    int read = 0;

		while ((read = fin.read(b)) != -1) {
		    outs.write(b, 0, read);
		}
	} finally {
	    if (outs != null) {
			try {
			    outs.close();
			} catch (Exception ignore) {
				LOGGER.debug("IGNORED: {}", ignore.getMessage());
			}
		    }
		    if (fin != null) {
			try {
			    fin.close();
			} catch (Exception ignore) {
				LOGGER.debug("IGNORED: {}", ignore.getMessage());
			}
		    }
		}
    }

    /**
     * 첨부로 등록된 파일을 서버에 업로드한다.
     *
     * @param file
     * @return
     * @throws Exception

    public static HashMap<String, String> uploadFile(MultipartFile file) throws Exception {

	HashMap<String, String> map = new HashMap<String, String>();
	//Write File 이후 Move File????
	String newName = "";
	String stordFilePath = EgovProperties.getProperty("Globals.fileStorePath");
	String orginFileName = file.getOriginalFilename();

	int index = orginFileName.lastIndexOf(".");
	//String fileName = orginFileName.substring(0, _index);
	String fileExt = orginFileName.substring(index + 1);
	long size = file.getSize();

	//newName 은 Naming Convention에 의해서 생성
	newName = EgovStringUtil.getTimeStamp() + "." + fileExt;
	writeFile(file, newName, stordFilePath);
	//storedFilePath는 지정
	map.put(Globals.ORIGIN_FILE_NM, orginFileName);
	map.put(Globals.UPLOAD_FILE_NM, newName);
	map.put(Globals.FILE_EXT, fileExt);
	map.put(Globals.FILE_PATH, stordFilePath);
	map.put(Globals.FILE_SIZE, String.valueOf(size));

	return map;
    }
*/
    /**
     * 파일을 실제 물리적인 경로에 생성한다.
     *
     * @param file
     * @param newName
     * @param stordFilePath
     * @throws Exception
     */
    protected static void writeFile(MultipartFile file, String newName, String stordFilePath) throws Exception {
	InputStream stream = null;
	OutputStream bos = null;
	newName = StringUtil.isNullToString(newName).replaceAll("..", "");
	stordFilePath = StringUtil.isNullToString(stordFilePath).replaceAll("..", "");
	try {
	    stream = file.getInputStream();
	    File cFile = new File(stordFilePath);

	    if (!cFile.isDirectory())
		cFile.mkdir();

	    bos = new FileOutputStream(stordFilePath + File.separator + newName);

	    int bytesRead = 0;
	    byte[] buffer = new byte[BUFF_SIZE];

	    while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
		bos.write(buffer, 0, bytesRead);
	    }
	} catch (FileNotFoundException fnfe) {
		LOGGER.debug("fnfe: {}",fnfe);
	} catch (IOException ioe) {
		LOGGER.debug("ioe: {}", ioe);
	} catch (Exception e) {
		LOGGER.debug("e: {}", e);
	} finally {
	    if (bos != null) {
		try {
		    bos.close();
		} catch (Exception ignore) {
			LOGGER.debug("IGNORED: {}", ignore.getMessage());
		}
	    }
	    if (stream != null) {
		try {
		    stream.close();
		} catch (Exception ignore) {
			LOGGER.debug("IGNORED: {}", ignore.getMessage());
		}
	    }
	}
    }

    /**
     * 서버 파일에 대하여 다운로드를 처리한다.
     *
     * @param response
     * @param streFileNm
     *            : 파일저장 경로가 포함된 형태
     * @param orignFileNm
     * @throws Exception
     */
    public void downFile(HttpServletResponse response, String streFileNm, String orignFileNm) throws Exception {
    	File file = new File(streFileNm);
    	System.out.println(orignFileNm);
		if (!file.exists()) {
		    throw new FileNotFoundException(streFileNm);
		}

		if (!file.isFile()) {
		    throw new FileNotFoundException(streFileNm);
		}

		byte[] b = new byte[BUFF_SIZE]; //buffer size 2K.
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename="+new String(orignFileNm.getBytes("KSC5601"),"ISO8859_1"));
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;

		try {
			fin = new BufferedInputStream(new FileInputStream(file));
		    outs = new BufferedOutputStream(response.getOutputStream());
		    int read = 0;

			while ((read = fin.read(b)) != -1) {
			    outs.write(b, 0, read);
			}
		} finally {
		    if (outs != null) {
				try {
				    outs.close();
				} catch (Exception ignore) {
					LOGGER.debug("IGNORED: {}", ignore.getMessage());
				}
			    }
			    if (fin != null) {
				try {
				    fin.close();
				} catch (Exception ignore) {
					LOGGER.debug("IGNORED: {}", ignore.getMessage());
				}
			    }
			}

    }


    /**
     * 첨부파일에 대한 목록 정보를 취득한다.
     *
     * @param files
     * @return
     * @throws Exception
     */
    public  List<HashMap<String,Object>> parseFileInfMap(HttpServletRequest request, MultipartHttpServletRequest multipart,String subPath) throws Exception {

		String storePathString = "";

	    storePathString = request.getSession().getServletContext().getRealPath("")+subPath;
	    List<HashMap<String,Object>> fileList = new ArrayList<HashMap<String,Object>>();
	    try {

			File saveFolder = new File(storePathString);

			if (!saveFolder.exists() || saveFolder.isFile()) {
			    saveFolder.mkdirs();
			}

			List<MultipartFile> files= multipart.getFiles("upFile");
	//		Iterator<Entry<String, MultipartFile>> itr = 	files.entrySet().iterator();
			String filePath = "";

			if(files != null && !files.isEmpty()) {
				for(MultipartFile mFile : files ) {
					HashMap<String,Object> fileMap = new HashMap<String,Object>();
				    String orginFileName = mFile.getOriginalFilename();
				    //--------------------------------------
				    // 원 파일명이 없는 경우 처리
				    // (첨부가 되지 않은 input file type)
				    //--------------------------------------
				    if ("".equals(orginFileName)) {
					continue;
				    }
				    ////------------------------------------

				    int index = orginFileName.lastIndexOf(".");
				    //String fileName = orginFileName.substring(0, index);
				    String fileExt = orginFileName.substring(index + 1);
				    String newName = StringUtil.getTimeStamp() +"_" +orginFileName;
				    long _size = mFile.getSize();

				    if (!"".equals(orginFileName)) {
						filePath = storePathString + File.separator + newName;
						mFile.transferTo(new File(filePath));
				    }

				    fileMap.put("fileExtsn", fileExt);
				    fileMap.put("fileStreCours", storePathString);
				    fileMap.put("fileMg", Long.toString(_size));
				    fileMap.put("orignlFileNm", orginFileName);
				    fileMap.put("streFileNm", newName);

				    //writeFile(file, newName, storePathString);
				    fileList.add(fileMap);

				}
			}
	    }catch (Exception e) {
	    	e.printStackTrace();
		}
		return fileList;
    }

}

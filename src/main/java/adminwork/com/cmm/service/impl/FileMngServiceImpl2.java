package adminwork.com.cmm.service.impl;

import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngService2;
import adminwork.com.cmm.service.FileVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Class Name : EgovFileMngServiceImpl.java
 * @Description : 파일정보의 관리를 위한 구현 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 25.     이삼섭    최초생성
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 25.
 * @version
 * @see
 *
 */
@Service("FileMngService2")
public class FileMngServiceImpl2 extends EgovAbstractServiceImpl implements FileMngService2 {

	@Resource(name = "FileManageDAO2")
	private FileManageDAO2 fileMngDAO2;

	/**
	 * 여러 개의 파일을 삭제한다.
	 *
	 * @see FileMngService#deleteFileInfs(List)
	 */
	@Override
	@SuppressWarnings("rawtypes")
	public void deleteFileInfs(List fvoList) throws Exception {
		fileMngDAO2.deleteFileInfs(fvoList);
	}

	/**
	 * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 *
	 * @see FileMngService#insertFileInf(FileVO)
	 */
	@Override
	public String insertFileInf(FileVO fvo) throws Exception {
		String atchFileId = fvo.getAtchFileId();

		fileMngDAO2.insertFileInf(fvo);

		return atchFileId;
	}

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 *
	 * @see FileMngService#insertFileInfs(List)
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public String insertFileInfs(List fvoList) throws Exception {
		String atchFileId = "";

		if (fvoList.size() != 0) {
			atchFileId = fileMngDAO2.insertFileInfs(fvoList);
		}
		if (atchFileId == "") {
			atchFileId = null;
		}
		return atchFileId;
	}

	/**
	 * 파일에 대한 목록을 조회한다.
	 *
	 * @see FileMngService#selectFileInfs(FileVO)
	 */
	@Override
	public List<FileVO> selectFileInfs(FileVO fvo) throws Exception {
		return fileMngDAO2.selectFileInfs(fvo);
	}

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
	 *
	 * @see FileMngService#updateFileInfs(List)
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public void updateFileInfs(List fvoList) throws Exception {
		//Delete & Insert
		fileMngDAO2.updateFileInfs(fvoList);
	}

	/**
	 * 하나의 파일을 삭제한다.
	 *
	 * @see FileMngService#deleteFileInf(FileVO)
	 */
	@Override
	public void deleteFileInf(FileVO fvo) throws Exception {
		fileMngDAO2.deleteFileInf(fvo);
	}

	/**
	 * 파일에 대한 상세정보를 조회한다.
	 *
	 * @see FileMngService#selectFileInf(FileVO)
	 */
	@Override
	public FileVO selectFileInf(FileVO fvo) throws Exception {
		return fileMngDAO2.selectFileInf(fvo);
	}

	/**
	 * 파일 구분자에 대한 최대값을 구한다.
	 *
	 * @see FileMngService#getMaxFileSN(FileVO)
	 */
	@Override
	public int getMaxFileSN(FileVO fvo) throws Exception {
		return fileMngDAO2.getMaxFileSN(fvo);
	}

	/**
	 * 전체 파일을 삭제한다.
	 *
	 * @see FileMngService#deleteAllFileInf(FileVO)
	 */
	@Override
	public void deleteAllFileInf(FileVO fvo) throws Exception {
		fileMngDAO2.deleteAllFileInf(fvo);
	}

	/**
	 * 파일명 검색에 대한 목록을 조회한다.
	 *
	 * @see FileMngService#selectFileListByFileNm(FileVO)
	 */
	@Override
	public Map<String, Object> selectFileListByFileNm(FileVO fvo) throws Exception {
		List<FileVO> result = fileMngDAO2.selectFileListByFileNm(fvo);
		int cnt = fileMngDAO2.selectFileListCntByFileNm(fvo);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 이미지 파일에 대한 목록을 조회한다.
	 *
	 * @see FileMngService#selectImageFileList(FileVO)
	 */
	@Override
	public List<FileVO> selectImageFileList(FileVO vo) throws Exception {
		return fileMngDAO2.selectImageFileList(vo);
	}
}

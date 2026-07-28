package adminwork.kicpa.noti.service.impl;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import adminwork.kicpa.noti.service.NotiService;

/**
 * 신규 게시글 푸시 폴링 스케줄러.
 * 게시글 등록이 이 소스 밖(포털 CMS)에서 일어나므로 BULLETIN을 주기 감시한다.
 * context-scheduler.xml 의 task:annotation-driven 으로 활성화된다.
 * 이중화 서버에서 동시 실행되어도 LETTAPPNOTI 유니크 키 클레임으로 중복 발송되지 않는다.
 */
@Service("BoardPushScheduler")
public class BoardPushScheduler {

	@Resource(name = "NotiService")
	private NotiService notiService;

	/** 기동 2분 후부터 5분 간격 */
	@Scheduled(initialDelay = 120000, fixedDelay = 300000)
	public void pollBoardPosts() {
		notiService.pollNewBoardPosts();
	}
}

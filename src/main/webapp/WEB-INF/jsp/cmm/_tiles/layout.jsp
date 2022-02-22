<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles"  prefix="tiles"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <tiles:insertAttribute name="head"/>
</head>
<!--begin::Body-->
<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
<!--begin::Header Mobile-->
<div id="kt_header_mobile" class="header-mobile align-items-center header-mobile-fixed">
	<!--begin::Logo-->
	<a href="javascript:addNewTab('tabview10','','메인');" >
		<img src="assets/images/logo.png">
	</a>
	<!--end::Logo-->
	<!--begin::Toolbar-->
	<div class="d-flex align-items-center">
		<!--begin::Aside Mobile Toggle-->
		<button class="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
			<span></span>
		</button>
		<!--end::Aside Mobile Toggle-->
		<!--begin::Header Menu Mobile Toggle-->
		<!--button class="btn p-0 burger-icon ml-4" id="kt_header_mobile_toggle">
			<span></span>
		</button-->
		<!--end::Header Menu Mobile Toggle-->
		<!--begin::Topbar Mobile Toggle-->
		<button class="btn btn-hover-text-primary p-0 ml-2" id="kt_header_mobile_topbar_toggle">
			<span class="svg-icon svg-icon-xl">
				<!--begin::Svg Icon | path:assets/media/svg/icons/General/User.svg-->
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<polygon points="0 0 24 0 24 24 0 24" />
						<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
						<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
					</g>
				</svg>
				<!--end::Svg Icon-->
			</span>
		</button>
		<!--end::Topbar Mobile Toggle-->
	</div>
	<!--end::Toolbar-->
</div>
<!--end::Header Mobile-->

<div class="d-flex flex-column flex-root">
	<!--begin::Page-->
	<div class="d-flex flex-row flex-column-fluid page">
		<tiles:insertAttribute name="left"/>
		<!--begin::Wrapper-->
		<div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
			<tiles:insertAttribute name="header"/>			
			<tiles:insertAttribute name="content"/>				
			<tiles:insertAttribute name="footer"/>
		</div>    
	</div>
</div>
<tiles:insertAttribute name="common"/>
<tiles:insertAttribute name="popup"/>
<!--begin::Scrolltop-->
<div id="kt_scrolltop" class="scrolltop">
	<span class="svg-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<polygon points="0 0 24 0 24 24 0 24" />
				<rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
				<path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" fill="#000000" fill-rule="nonzero" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
</div>
<!--end::Scrolltop-->
<tiles:insertAttribute name="scripts"/>
<script src="<c:url value='/js/kik.tabs.js'/>"></script>
<script>
	$.noConflict();
	var $ = jQuery;
	$(document).ready(function() {
		
		//add ajax tabs							
		$("#addajaxtab").dynatabs({
			tabBodyID : "addajaxtabbody",
			showCloseBtn : true,
			confirmDelete : true
		});
		
		//$.initTabs();
	});
	
	function addNewTab(id,url,title,param)
	{
		param = param || {};

		var len = $("#addajaxtab").find("li > a").length;
		if(len > 13){
			Swal.fire({title:"탭 14개 초과",text:"기존 탭을 닫고 열어 주세요.",type:"question",confirmButtonColor:"#556ee6"});
			return;
		}

		$.addDynaTab({
			tabID : "addajaxtab",
			tID   : id,
			type : "ajax",
			url : url,
			method : "get",
			dtype : "html",
			params : param,
			tabTitle : title
		});



	}
	
	function closeTab(a,ba){
		//$('#'+a+'_tab').children('span:eq(0)').trigger('click');		
		//delete it		
		$('#'+a+'_tab').parent().remove();
		$('#tabview_'+a).remove();
		//activate the next tab (if any)
		var tabs = $('#addajaxtab');
		
		/* if(tabs.find("a").length > 0)
		{
			var tmp = tabs.find("a")[tabs.find("a").length-1];
			$(tmp).tab('show');
			$.fn.activateTab($(tmp).attr('href'), tmp, tabs);
		} */
		
		if(ba != undefined){
			$.each(tabs.find("li > a"), function(idx, a){
				if(ba+'_tab' == $(a).attr('id'))
				{
					$(a).tab('show');
					return;
				}
			});	
		}else{
			if(tabs.find("a").length > 0)
			{
				var tmp = tabs.find("a")[tabs.find("a").length-1];
				$(tmp).tab('show');
				$.fn.activateTab($(tmp).attr('href'), tmp, tabs);
			}
		}
		
		
		/* if(tabs.find("a").length > 0)
		{
			var tmp = tabs.find("a")[tabs.find("a").length-1];
			$(tmp).tab('show');
			$.fn.activateTab($(tmp).attr('href'), tmp, tabs);
		}	 */	
	}

	function Global_grid_resize(func){
		/*var initFunction = defaults.tID+'.fn_init_resize_AUIGrid';
		alert(initFunction);*/
		//alert(func);
		//$(window).resize();
         try{
            window[func]();
         }catch(e){
            console.log("Not Function");
         };
         /* setTimeout(function(){$(window).resize();}, 1000);		*/
	}
</script>
</body>
</html>

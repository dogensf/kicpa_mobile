
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- <script>var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";</script> -->
<!--begin::Global Config(global config for global JS scripts)-->
<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1400 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#3699FF", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#E4E6EF", "dark": "#181C32" }, "light": { "white": "#ffffff", "primary": "#E1F0FF", "secondary": "#EBEDF3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#3F4254", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#EBEDF3", "gray-300": "#E4E6EF", "gray-400": "#D1D3E0", "gray-500": "#B5B5C3", "gray-600": "#7E8299", "gray-700": "#5E6278", "gray-800": "#3F4254", "gray-900": "#181C32" } }, "font-family": "Poppins" };</script>
<!--end::Global Config-->
<!--begin::Global Theme Bundle(used by all pages)-->
<script src="<c:url value='/'/>assets/plugins/global/plugins.bundle.js"></script>
<script src="<c:url value='/'/>assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
<script src="<c:url value='/'/>assets/js/scripts.bundle.js"></script>
<!-- <script src="https://keenthemes.com/metronic/assets/js/engage_code.js"></script> -->
<!--end::Global Theme Bundle-->
<!--begin::Page Vendors(used by this page)-->
<script src="<c:url value='/'/>assets/plugins/custom/fullcalendar/fullcalendar.bundle.js"></script>
<script src="<c:url value='/'/>assets/js/pages/crud/forms/widgets/bootstrap-select.js"></script>
<!--end::Page Vendors-->


<!--begin::Page Scripts(used by this page)-->
<script src="<c:url value='/'/>assets/js/pages/widgets.js"></script>
<!--end::Page Scripts-->

<!-- AUIGrid 테마 CSS 파일입니다. 그리드 출력을 위해 꼭 삽입하십시오. -->
<!-- 원하는 테마가 있다면, 다른 파일로 교체 하십시오. -->
<link href="<c:url value='/'/>auigrid/AUIGrid/AUIGrid_style.css" rel="stylesheet">
<link href="<c:url value='/'/>auigrid/AUIGrid/AUIGrid_style_custom.css" rel="stylesheet">


<!-- AUIGrid 라이센스 파일입니다. 그리드 출력을 위해 꼭 삽입하십시오. -->
<script type="text/javascript" src="<c:url value='/'/>auigrid/AUIGrid/AUIGridLicense.js"></script>


<!-- AUIGrid 엑셀다운로드 파일  엑셀다운로드를 위해 꼭 삽입하십시오. -->
<script type="text/javascript" src="<c:url value='/'/>auigrid/pdfkit/FileSaver.min.js"></script>
<script type="text/javascript" src="<c:url value='/'/>auigrid/pdfkit/AUIGrid.pdfkit.js"></script>


<!-- 실제적인 AUIGrid 라이브러리입니다. 그리드 출력을 위해 꼭 삽입하십시오.-->
<script type="text/javascript" src="<c:url value='/'/>auigrid/AUIGrid/AUIGrid.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/dateHelper.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/numericHelper.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/stringHelper.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/utilHelper.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/const.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/KicpaCommon.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/mainCommon.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/xlsx.js"></script>
<script type="text/javascript" src="<c:url value='/'/>js/kicpa/popup.js"></script>


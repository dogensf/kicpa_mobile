<%@page import="java.util.Properties"%>
<%@page import="com.saltware.enpass.client.EnpassClient"%>
<%@page import="java.util.Enumeration"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Set"%><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SSO TEST</title>
</head>
<body>
<%
	Properties props = System.getProperties();
	/*
	Object k[] = props.keySet().toArray();
	for( int i=0; i< k.length;i++) {
		out.println( k[i] + ":" + props.getProperty(k[i].toString()) );
		out.println("</br>");
	}
	*/
	out.println( "java version=" + props.getProperty("java.runtime.version"));
	out.println("</br>");

	EnpassClient client = new EnpassClient( request, response);
	client.doLogin();
	
	Enumeration en = session.getAttributeNames();
	String key;
	while( en.hasMoreElements()) {
		key = (String)en.nextElement();
		out.println( key +"=" + session.getAttribute(key)  + "<br>");
	}

	String ssoId = null;
	HashMap ssoMap = null;
	String userTpId = null;
	ssoId = (String)session.getAttribute("_enpass_id_");
	ssoMap = (HashMap)session.getAttribute("_enpass_attr_");
	if( ssoId!=null) {
		out.println("SSO SUCCESS.");
		out.println("<br/>");
		out.println("SSO ID : " + ssoId);
		out.println("<br/>");
		/*
		Object[] keys = ssoMap.keySet().toArray();
		for( int i=0; i < keys.length; i++) {
			out.println(" > " + keys[i] + " : " + (String)ssoMap.get(keys[i]));
			out.println("<br/>");
		}
		 */
	} else {
		out.println("SSO FAILED");
		// SSO 실패시 LOGOUT으로 판단하고 세션 삭제
//		session.invalidate();
	}
%>
</body>
</html>
/**
 * 
 */

/* 전체 선택 */
 $(".authority-wrap .menu-list .all input[type='checkbox'] + span, .authority-wrap .menu-list .all input[type='checkbox'] + span + .text").on('click',function(){
	 
     var checked = $(".menu-list li.all input[type='checkbox']").prop("checked");
     if(!checked){
         $(".menu-list .menu input[type='checkbox']").prop("checked",true);
     }else{
         $(".menu-list .menu input[type='checkbox']").prop("checked",false);
     }
 });

 /* depth1 */
 $(".authority-wrap .menu-list .depth1 > .checkbox > input[type='checkbox'] + span, .authority-wrap .menu-list .depth1 > .checkbox > input[type='checkbox'] + span + .text").on('click',function(){
	 
     var checked = $(this).parent().find('input[type="checkbox"]').prop("checked");
     if(!checked){
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",true);
     }else{
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",false);
     }
 });

 /* depth2 */
 $(".authority-wrap .menu-list .depth2 .checkbox > input[type='checkbox'] + span, .authority-wrap .menu-list .depth2 .checkbox > input[type='checkbox'] + span + .text").on('click',function(){
	 
     var checked = $(this).parent().find('input[type="checkbox"]').prop("checked"); console.log(checked);
     if(!checked){
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",true);
         $(this).parent().parent().parent().parent().find('input[type="checkbox"]:eq(0)').prop("checked",true);
     }else{
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",false);
     }
 });
 
 
 /* depth3 */
 $(".authority-wrap .menu-list .depth3 .checkbox > input[type='checkbox'] + span, .authority-wrap .menu-list .depth3 .checkbox > input[type='checkbox'] + span + .text").on('click',function(){
	 
     var checked = $(this).parent().find('input[type="checkbox"]').prop("checked"); console.log(checked);
     if(!checked){
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",true);
         $(this).parent().parent().parent().parent().find('input[type="checkbox"]:eq(0)').prop("checked",true);
         $(this).parent().parent().parent().parent().parent().parent().find('input[type="checkbox"]:eq(0)').prop("checked",true);
     }else{
         $(this).parent().next().find('input[type="checkbox"]').prop("checked",false);
     }
 });
 
 function getUserMenuList(userNo){
	 $('.userMenuNo_All').prop("checked",false);
	 $('.userMenuNo_').prop("checked",false);
	 
	 $.ajax({
    	 type: 'POST',
         url : '/kicpa/user/getUserMenuList.do',
         data : {'user_no':userNo},
         datatype: "JSON",
         error: function(xhr, status, error){
             alert(error);
         },
         success : function(rt){             
              $.each(rt.resultList,function(index,item){              
            	 var menuNo = item.menu_no;            	
            	 $('.userMenuNo_').each(function(index, item){	
            		 if(menuNo == item.value){
            			 $(this).prop("checked",true);
            		 }
            	 });            		 
             });

             $('#userMenuListForm_user_no').val(userNo);
         }
     });
 }
 
 function setUserMenuList(){
	 if($('#userMenuListForm_user_no').val() ==""){
		 alert("사용자를 먼저 선택해 주세요.");
		 return;
	 }
	 var forms = $('#userMenuListForm')[0];
	 var formData = new FormData(forms);
	 
	 //alert(formData);
     $.ajax({
    	 type: 'POST',
         url : '/kicpa/user/setUserMenuList.do',
         data : formData,
         contentType : false,     
         processData : false,
         error: function(xhr, status, error){
             alert(error);
         },
         success : function(json){
        	 alert("메뉴 저장이 완료 되었습니다.");
         }
     });

 }
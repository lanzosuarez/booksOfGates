document.ready=(function(){

    function remove(){
        $('#loaderBody').fakeLoader({bgColor:"#ffff00",show:false});
        $("#loaderBody").remove();
    }

    if(window.location.pathname==='/admin/login' ||
       window.location.pathname==='/new' ||
       IndexLib.returnIndex.testIfEdit(window.location.pathname)){
            remove();
        }
    
}());
  

(function showLoadPage(){
        document.getElementById('gates').insertAdjacentHTML('afterbegin', '<div id="loaderBody"></div>' );
            $('#loaderBody').fakeLoader({
               show:true,
                    timeToHide:3000, //Time in milliseconds for fakeLoader disappear
                    zIndex:"999",
                    spinner:"spinner6",
                    bgColor:"#ffff00",
                });
}());

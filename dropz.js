"use strict";

var DropZ = function(id, option = {}){
  
  if(id){
    var globalFiles = [];

    //Default options
    var _defaultOptions = {
      zoneText: "<p class='zone-text'>Drop files here or click.</p>",
    };
    //Init default options
    var _zoneText = _defaultOptions.zoneText;

    //Zone text user
    if(option.zoneText){
      const _pText     = document.createElement("p");
      _pText.classList.add("zone-text");
      _pText.innerHTML = option.zoneText;
      _zoneText        = _pText;
    }

    //Append defult items
    $(id).append(_zoneText);

    var input = $(id).find(":input");
    if(input.attr("type") == "file"){
      input.on("change", handleFiles);
    }

    function handleFiles(event){
      var files = event.currentTarget.files;
      for (let i = 0; i < files.length; i++) {
        globalFiles.push(files[i]);
      };
      renderImages();
    }

    $(document).delegate(".p-remove", "click", function(){
      var i = $(this).attr("i-file");
      globalFiles.splice(i, 1);
    
      renderImages();

      if(globalFiles.length == 0){
        $(id).append(_zoneText);
      }
    });

    function renderImages(){
      $(id).find(".zone-text").remove();
      $(id).find(".drop-img").remove();
      for (let i = 0; i < globalFiles.length; i++) {
        const file = globalFiles[i];
        
        if (!file.type.startsWith('image/')){ continue }
        
        const dropImg = document.createElement("div");
        dropImg.classList.add("drop-img");

        //element remove
        const remove = document.createElement("span");
        remove.innerHTML = "×";
        remove.classList.add("p-remove");
        remove.setAttribute("i-file", i);

        //Img
        const img    = document.createElement("img");
        img.file     = file;

        dropImg.append(remove);
        dropImg.append(img);
        $(id).append(dropImg);
        
        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
      }

      updateInputInfos();
    }

    function updateInputInfos(){
      var dataTransfer = new DataTransfer();
      for (let i = 0; i < globalFiles.length; i++) {
        dataTransfer.items.add(globalFiles[i]);
      }
      $(id).find(":input")[0].files = dataTransfer.files;
    }

    return this;
  }else{
    console.log("DropZ element no found");
  }
};
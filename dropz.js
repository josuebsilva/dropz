"use strict";

var DropZ = function(id){
  if(id){
    var globalFiles = [];
    var p = document.createElement("p")
    p.innerHTML = "Drop files here or click.";
    $(id).append(p);

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
        $(id).append(p);
      }
    });

    function renderImages(){
      $(id).find("p").remove();
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
        $(id).append(dropImg); // Assuming that "preview" is the div output where the content will be displayed.
        
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
  }
  return null;
};
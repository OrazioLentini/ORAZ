var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";
function getCameraModels() {
    getModels(document.getElementById("pictureInput").value);

}
function getPictures() {
    getPhotos(document.getElementById("pictureInput").value);
}
function getFavs() {
    loadFavs();
}

function applySettings(){
    numbrand = document.getElementById("brands").value;
    storeBSetting(numbrand);
    numPics = document.getElementById("pictures").value;
    storePSetting(numPics);
 
}


function storeBSetting(numofBrands){
  localStorage.setItem('numofBrand',numofBrands);
}
function storePSetting(numofPics){
  localStorage.setItem("numofPics", numofPics);
}


function getModels(str){
  s = str;
  
  numbrands = localStorage.getItem('numofBrand');
  if(numbrands != null){numbrands = numbrands}
  else {numbrands = 10}

  saveBrand(s);
  //alert(s);
  $.ajax({
    url: "http://api.flickr.com/services/rest/?",
    data: {
      api_key: apiKey,
      format: 'json',
      method: "flickr.cameras.getBrandModels",
      brand: s,
      },
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    success: function(rsp){
      window.rsp = rsp;
      console.log(rsp);
      if(rsp.cameras != null){
	$("#cameraModels ul").empty();
	for (var i=0; i<numbrands; i++) {
	    camera = rsp.cameras.camera[i];
	    var brand = rsp.cameras.brand;
	    var model = camera.id;
	    var image = camera.images.small;
	    //var cameraImage="js/bypass.php?image_src="+image;
	    //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+cameraImage+"'>"+brand+" "+model+"</a></li>");
	    $("#cameraModels ul").append("<li><a onclick=getPhotos('"+ brand + "_" +model+"') href=#results>"+brand+" "+model+"</a></li>");
	    $("#cameraModels ul").listview('refresh');  
	}
     }
      else{
	alert("Brand not found");
	$("#").html;
	
      }
    }
  });
}

function getPhotos(model){
  s = model;
   var numPics = localStorage.getItem('numofPics');
  if(numPics != null){numPics = numPics}
  else {numPics = 20}
  saveModel(s);
  //alert(s);
  $.ajax({
      url: "http://api.flickr.com/services/rest/?",
      data: {
        api_key: apiKey,
        format: 'json',
        method: "flickr.photos.search",
        tags: s,
        per_page: numPics
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function(rsp){
        window.rsp = rsp;
        console.log(rsp);
        var output='';
        var head='';
	output += '<div data-role="header"><h1><center>'+s+'</center></h1></div>';
        for (var i=0; i<rsp.photos.photo.length; i++) {
          photo = rsp.photos.photo[i];
          var title = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "z.jpg";
          var link = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
          output += '<div class="ui-block-' + 'a' + '">';
	  output += '<img alt="'+ photo.title + '"src="' + title + '"/>' + '</a>';
          output += '</a>';
          output += '</div>';
        } // go through each photo
        $('#photolist').html(output);
        
      }
    });
}

// FOR FAVORITES --------------------------------------------------------------------------------------------------

function saveModel(s){
	console.log(s);
	sessionStorage.setItem('favModel', s);	
}

function addFavs(){
  favM = sessionStorage.getItem("favModel");
  alert(s + ' is Added to Favorites' );
  var favM2 = {id: favM};
  var favModels = JSON.parse(localStorage.getItem("key")) || [];
  favModels.push(favM2);
  localStorage.setItem('key', JSON.stringify(favModels));
  console.log(favModels);
  
  //console.log(JSON.parse(localStorage.getItem("key")));
}

function loadFavs() {
  console.log(JSON.parse(localStorage.getItem("key")));
  var array = JSON.parse(localStorage.getItem("key"));
  //alert(array[5]);
 
  $("#fav ul").empty();
  for (var i=0; i<array.length; i++) {
    var favCam = array[i].id;
    $("#fav ul").append("<li><a onclick=getPhotos('"+favCam+"') href=#favResults>"+favCam+"</a></li>");
    $("#fav ul").listview('refresh');  
  }
}

function clearFavs(){
  localStorage.clear();
  location.reload();
}

function removeFavs() {

  
 var json = JSON.parse(localStorage.getItem("key"));
 
    console.log(localStorage.getItem("key"));

   console.log(localStorage.getItem("key"));
for (var i=0;i<json.length;i++){
  console.log(json[i].id);
        if (json[i].id == s) json.splice(i,1);
	localStorage.setItem("key", JSON.stringify(json));
//localStorage["key"] = JSON.stringify(json);
}
  console.log(localStorage.getItem("key"));
   alert( s + ' is removed from the favorites');
}


// RELOAD MODELS--------------------------------------------------------------------------------------------

function saveBrand(s){
	console.log(s);
	sessionStorage.setItem('saveBrand', s);	
}

function reloadModels(){
  s = sessionStorage.getItem("saveBrand");
  //alert(s);
  $.ajax({
    url: "http://api.flickr.com/services/rest/?",
    data: {
      api_key: apiKey,
      format: 'json',
      method: "flickr.cameras.getBrandModels",
      brand: s,
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    success: function(rsp){
      window.rsp = rsp;
      console.log(rsp);
      $("#cameraModels ul").empty();
      for (var i=0; i<15; i++) {
          camera = rsp.cameras.camera[i];
          var brand = rsp.cameras.brand;
          var model = camera.id;
          var image = camera.images.small;
          //var cameraImage="js/bypass.php?image_src="+image;
          //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+cameraImage+"'>"+brand+" "+model+"</a></li>");
	  $("#cameraModels ul").append("<li><a onclick=getPhotos('"+ brand + "_" +model+"') href=#results>"+brand+" "+model+"</a></li>");
          $("#cameraModels ul").listview('refresh');  
      }
    }
  });
}


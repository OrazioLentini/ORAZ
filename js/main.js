//     VIEW
//=========
window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#about').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page3View = Backbone.View.extend({

    template:_.template($('#favs').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page4View = Backbone.View.extend({
  
    template:_.template($('#results').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page5View = Backbone.View.extend({
  
    template:_.template($('#favResults').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});
window.Page6View = Backbone.View.extend({
  
    template:_.template($('#cameraList').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});
window.Page7View = Backbone.View.extend({
  
    template:_.template($('#settings').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});
//   ROUTER
//=========
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "about":"about",
        "favs":"favs",
        "results":"results",
        "favResults":"favResults",
        "cameraList":"cameraList",
        "settings":"settings"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },
    about:function () {
        console.log('#about');
        this.changePage(new Page2View());
    },
    
    favs:function () {
        console.log('#favs');
        this.changePage(new Page3View());
    },
    
    results:function () {
        console.log('#results');
        this.changePage(new Page4View());
    },
    
     favResults:function () {
        console.log('#favResults');
        this.changePage(new Page5View());
    },
    cameraList:function () {
        console.log('#cameraList');
        this.changePage(new Page6View());
    },
      settings:function () {
        console.log('#settings');
        this.changePage(new Page7View());
    },
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: 'fade'});
		//$.mobile.changePage($(results), {changeHash:false, transition: 'fade', role: 'dialog'});
		//$.mobile.changePage('#results', {transition: 'pop', role: 'dialog'});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});

/*
var image = Backbone.Model.extend({
    fullsize_url: function () {
        return this.image_url('medium');
    },
    thumb_url: function () {
        return this.image_url('square');
    },
    image_url: function (size) {
        var size_code;
        switch (size) {
            case 'square': size_code = '_s'; break; // 75x75
            case 'medium': size_code = '_z'; break; // 640 on the longest side
            case 'large': size_code = '_b'; break; // 1024 on the longest side
            case 'thumbnail': size_code = '_t'; break; // 1024 on the longest side
            default: size_code = '';
        }
        return "http://farm" + this.get('farm') + ".static.flickr.com/" + this.get('server') + "/" +this.get('id') + "_" + this.get('secret') + size_code + ".jpg";
    }
})

var imageCollection = Backbone.Collection.extend({
    model: image,
    key: apiKey,
    page: 1,
 
            fetch: function (str){
             s = str;
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
      for (var i=0; i<10; i++) {
          camera = rsp.cameras.camera[i];
          var brand = rsp.cameras.brand;
          var model = camera.id;
          var image = camera.images.small;
          //var cameraImage="js/bypass.php?image_src="+image;
          self.add(camera.id);
          //success();
          //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+image+"'>"+brand+" "+model+"</a></li>");
          //$("#cameraModels ul").listview('refresh');
        app.changePage(new Page6View({collection: self}));
      }
    }
  });*/
 
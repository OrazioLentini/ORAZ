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
var flickrAPIkey = "48b33ec586d5c4cb6b715d77fa1e8e97";


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
    key: flickrAPIkey,
    page: 1,
    fetch: function (keywords, lat, lon, success) {
        var self = this;
        success = success || $.noop;
        this.keywords = keywords || this.keywords;
        this.lat = lat || this.lat;
        this.lon = lon || this.lon;
        $.ajax({
            url : 'http://api.flickr.com/services/rest/',
            data : {
                api_key : self.key,
                format : 'json',
                method : 'flickr.photos.search',
                tags : this.keywords,
                has_geo: 1,
                lat: this.lat,
                lon: this.lon,
                accuracy: 11,
                extras: 'geo',
                per_page : 30,
                page : this.page
            },
            dataType : 'jsonp',
            jsonp : 'jsoncallback',
            success : function (response) {
                self.add(response.photos.photo);
                success();
                //once data succesfully loaded
                app.changePage(new locationIndexView({collection: self}));
            }
        });
    },
    nextPage: function (callback) {
        this.page += 1;
        this.remove(this.models);
        this.fetch(null, callback);
    },
    prevPage: function(callback) {
        if (this.page > 1) {this.page -= 1;}
        this.remove(this.models);
        this.fetch(null, callback);
    }
});

imageView = Backbone.View.extend({
    
    tagName: "div",
    //className: "imageContainer",
    template: _.template($('#imageTemplate').html()),
    
   
    intialize: function(){
        _.bindAll(this,"render");
        this.collection.bind("all",this.count);
    },
    
    
    
});

var imageCollection = new imageCollection();

//router and views


window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.geolocationView = Backbone.View.extend({
    
    template:_.template($('#geolocation').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.locationIndexView = Backbone.View.extend({

    template: _.template($('#locationIndex').html()),
    
    initialize: function(){
        _.bindAll(this,'render','loadImage');
        
    },
    
    render: function (eventName) {
       /* _.each(this.collection.models, function (item) {
            console.log(item);
        });
       

       
        console.log(this.el);
        
        
       $(this.el).html(this.template());
       $(this.el).append("<div>");
       console.log(this.collection.models.length);
       for(var i = 0; i < this.collection.models.length; i++) {
            console.log(this.collection.models[i]);
            var url = this.collection.models[i].image_url('small');
            $(this.el).append("<div class = 'listImageContainer'><img src = '" + url + "' class = 'listImage'/></div>");
       }
       $(this.el).append("</div>")
        return this;
    },
    
    loadImage: function(item){
        alert("hi");
        
    }
    

});

window.locationPageView = Backbone.View.extend({

    template:_.template($('#locationPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "geolocation":"geolocation",
        "locationIndex":"locationIndex",
        "locationPage":"locationPage"
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

    locationIndex:function () {
        console.log('#locationIndex');
        this.changePage(new locationIndexView());
    },
    
    locationPage:function () {
        console.log('#locationPage');
        this.changePage(new locationPageView());
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
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});*/
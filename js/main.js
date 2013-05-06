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
        "settings": "settings"
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

var templates = {
	tutorialViewTemplate:"views/tutorialViewTemplate.html",
    aboutViewTemplate:"views/aboutViewTemplate.html",
    defaultViewTemplate:"views/defaultViewTemplate.html",
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Mousetache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}

function onTemplateLoaded(template, key) {
    
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}

function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}

ViewAssembler.prototype.defaultView = function() {
    var el = $( templates.defaultViewTemplate );
	el.find("#tutorial").on( this.CLICK_EVENT, onTutorialViewClick );
    el.find("#entryData").on( this.CLICK_EVENT, onNearbyViewClick );
    el.find("#about").on( this.CLICK_EVENT, onAboutViewClick );	
    return el;
}

ViewAssembler.prototype.turoialView = function() {
    var el = $( templates.tutorialViewTemplate );
    return el;
}

ViewAssembler.prototype.aboutView = function() {
    var el = $( templates.aboutViewTemplate );
    return el;
}

/*HTMLElement.prototype.originalRemoveEventListener
        = HTMLElement.prototype.removeEventListener;
 
HTMLElement.prototype.removeEventListener = function(type, listener, useCapture)
{
    console.log('remove: ' + type);
    this.originalRemoveEventListener(type, listener, useCapture);
};
*/

var markets = [];
var viewAssembler = new ViewAssembler();

$(document).ready( function(){
    loadTemplates( setupDefaultView );
} );

function setupDefaultView() { 
    
    var bodyView = viewAssembler.defaultView(); 
    
    //Setup the default view
    var defaultView = { title: "Main Menu", 
		view:  bodyView,
    };
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );	
    window.viewNavigator.pushView( defaultView );
}

function onTutorialViewClick( event ) {
    var view = { title: "Tutorial",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.tutorialView()
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function onAboutViewClick( event ) {
    var view = { title: "About CoralWatch",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.aboutView()
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}
	
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
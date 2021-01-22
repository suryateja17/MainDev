({
    jsLoaded : function(component) {
        component.set("v.jsLoaded", true);
    },
    
    onPlotMapMarker: function(component, event, helper) {
        var id = event.getParam('sObjectId');
        var latitude = event.getParam('lat');
        var longitude = event.getParam('long');
        var label = event.getParam('label');
        
		console.log("onPlotMapMarker.lat: " + latitude);
		console.log("onPlotMapMarker.long: " + longitude);
		component.set("v.location", {'lat' : latitude, 'long' : longitude});
    }
})
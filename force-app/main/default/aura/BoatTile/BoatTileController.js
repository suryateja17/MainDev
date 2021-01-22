({
	onBoatClick : function(component, event, helper) {
		var boat = component.get("v.boat");
        console.log("BoatTileController boatId : " + boat.Id);
        var boatSelectEvent = component.getEvent("BoatSelect");
        boatSelectEvent.setParams({ "boat.Id" : boat.Id });
        boatSelectEvent.fire();
        
        var boatSelectedEvent = $A.get("e.c:BoatSelected");
        boatSelectedEvent.setParams({ "boat" : boat });
        boatSelectedEvent.fire();
        
        var plotMapEvent = $A.get("e.c:PlotMapMarker");
        plotMapEvent.setParams({
            "lat" : boat.Geolocation__Latitude__s,
            "long" : boat.Geolocation__Longitude__s,
            "label" : boat.Name,
            "SObjectId" : boat.Id
        });
        plotMapEvent.fire();
	}
})
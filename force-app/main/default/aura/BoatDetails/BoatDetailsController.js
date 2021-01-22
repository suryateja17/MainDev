({
	onBoatSelected : function(component, event, helper) {
		var boat = event.getParam("boat");
        component.set("v.id", boat.Id);
        console.log("BoatDetailsController received boatId : " + boat.Id);
        component.find("service").reloadRecord();
	},
    
    onRecordUpdated : function(component, event, helper) {
        var boatreview = component.find("boatreview");
        if(typeof boatreview != 'undefined') {
            boatreview.refresh();
        }
    },
    
    onBoatReviewAdded : function(component, event, helper) {
        console.log("Navigating to Boat Review tab");
        component.find("boattabs").set("v.selectedTabId", "boatreviewtab");
        
        var boatreview = component.find("boatreview");
        if(typeof boatreview != 'undefined') {
            boatreview.refresh();
        }
    }
})
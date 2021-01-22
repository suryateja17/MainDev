({
    loadBoats : function(component, event, helper) {
        helper.onSearch(component);
    },
    
    doSearch : function(component, event, helper) {
        //console.log('JSON data of arguments : ' + JSON.stringify(event.getParam('arguments')));
        //var callback = event.getParam('arguments').callback;
        //console.log('callback : ' + callback);
        var boatTypeId = event.getParam('arguments').boatTypeId;
        component.set("v.boatTypeId", boatTypeId);
        //helper.onSearch(component, boatTypeId, callback);
        helper.onSearch(component);
    },
    
    onBoatSelect : function(component, event, helper) {
        var selectedBoatId = event.getParam("boatId");
        console.log("BoatSearchResultsController BoatId received: " + selectedBoatId);
        component.set("v.selectedBoatId", selectedBoatId);
    }
})
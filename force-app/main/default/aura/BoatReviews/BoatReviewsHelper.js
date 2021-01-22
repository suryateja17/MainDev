({
    onInit : function(component, event, helper) {
        var getBoatReviews = component.get("c.getAll");
        getBoatReviews.setParams({
            boatId : component.get("v.boat.Id")
        });
        console.log("boat Id : " + component.get("v.boat.Id"));
        getBoatReviews.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Fetch Boat Reviews success: " + response.getReturnValue());
                component.set("v.boatReviews", response.getReturnValue());
            }
            else {
                console.log("Error: " + state);
            }
        });
        $A.enqueueAction(getBoatReviews);
    }
})
({
    onSearch : function(component) {
        var getBoatAction = component.get("c.getBoats");
        getBoatAction.setParams({
            boatTypeId : component.get("v.boatTypeId")
        });
        getBoatAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Fetch Boats success: " + response.getReturnValue());
                var boats = response.getReturnValue();
                component.set("v.boats", boats);
                //if(callback)	callback(boats);
            }
            else {
                console.log("Error: " + state);
            }
        });
        $A.enqueueAction(getBoatAction);
    }
})
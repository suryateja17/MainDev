({
    getBoatTypes : function(component, response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var boatTypesMap = response.getReturnValue();
            component.set("v.boatTypesMap", boatTypesMap);
            var boatTypes = [];
            for(var key in boatTypesMap) {
                boatTypes.push(boatTypesMap[key]);
            }
            component.set("v.boatTypes", boatTypes);
        }
        else {
            console.log("Failed with state: " + state);
        }
    },
    getBoatTypeId : function(component) {
        var selectedBoatType = component.get("v.selectedBoatType");
        var boatTypeMap = component.get("v.boatTypesMap");
        var boatTypeId = null;
        
        for(var key in boatTypeMap) {
            if(boatTypeMap[key] == selectedBoatType) {
                boatTypeId = key;
            }
        }
        return boatTypeId;
    }
})
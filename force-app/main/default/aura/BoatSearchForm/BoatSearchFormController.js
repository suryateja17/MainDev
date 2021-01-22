({
    loadBoatTypes : function(component, event, helper) {
        var isNewButtonAvailable = $A.get("e.force:createRecord");
        if(isNewButtonAvailable) {
            component.set("v.isNewButtonVisible","true");
        }
        var action = component.get("c.getBoatTypes");
        action.setCallback(this, function(response) {
            helper.getBoatTypes(component, response);
        });
        $A.enqueueAction(action);
    },
    
    onFormSubmit : function(component, event, helper) {
        var boatTypeId = helper.getBoatTypeId(component);
        console.log("Search button pressed: " + boatTypeId);
        var searchEvent = component.getEvent("formsubmit");
        searchEvent.setParams({ "formData": {"boatTypeId" : boatTypeId} });
        searchEvent.fire();
    },
    
    handleCreateBoatType : function(component, event, helper) {
        var selectedBoatType = component.get("v.selectedBoatType");
        var boatTypeMap = component.get("v.boatTypesMap");
        var boatTypeId = helper.getBoatTypeId(component);
        var createBoatTypeEvent = $A.get("e.force:createRecord");
        
        createBoatTypeEvent.setParams({
            "entityApiName": "Boat__c",
            "defaultFieldValues": {
                'BoatType__c' : boatTypeId
            }
        });
        createBoatTypeEvent.fire();
    }
})
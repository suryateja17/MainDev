({
    init: function(component, event, helper) {
        component.set("v.enableFullDetails", $A.get("e.force:navigateToSObject"));
    },
    
    onFullDetails : function(component, event, helper) {
        var navigateToFullRecordEvent = $A.get("e.force:navigateToSObject");
        navigateToFullRecordEvent.setParams({
            "recordId": component.get("v.boat.Id")
        });
        navigateToFullRecordEvent.fire();
    }
})
({
	doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },
    
    onUserInfoClick : function(component, event, helper) {
        var navigateToAuthorEvent = $A.get("e.force:navigateToSObject");
        navigateToAuthorEvent.setParams({
            "recordId": event.currentTarget.getAttribute("data-userid")
        });
        navigateToAuthorEvent.fire();
    }
})
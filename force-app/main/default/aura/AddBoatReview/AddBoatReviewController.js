({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },
    
    onSave : function(component, event, helper) {
        component.find("service").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                if($A.get("e.force:showToast")) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The review is successfully submited."
                    });
                    toastEvent.fire();
                }
                else {
                    alert("The review is successfully submited.");
                }
                helper.onInit(component, event, helper);
                var reviewCreated = component.getEvent("BoatReviewAdded");
                reviewCreated.setParams({ });
                reviewCreated.fire();
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
    },
    
    onRecordUpdated : function(component, event, helper) {
        /*if($A.get("e.force:showToast")) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "The review is successfully submited."
            });
            toastEvent.fire();
        }
        else {
            alert("The review is successfully submited.");
        }*/
    }
})
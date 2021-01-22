({
    onFormSubmit : function(component, event, helper) {
        var formData = event.getParam("formData");
        var boatTypeId = formData.boatTypeId;
        console.log("boatTypeId received by BoatSearchController : " + boatTypeId);
        var boatSearchComp = component.find("boatSearchComp");
        var searchResult = boatSearchComp.search(boatTypeId);
    }
})
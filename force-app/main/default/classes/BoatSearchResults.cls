public with sharing class BoatSearchResults {
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId) {
        List<Boat__c> lstBoat = new List<Boat__c>();
        if(String.isNotBlank(boatTypeId)) {
            lstBoat = [SELECT Id, Name, Contact__c, Contact__r.Name, BoatType__c, 
                       Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s 
                       FROM Boat__c WHERE BoatType__c = :boatTypeId Limit 50000];
        }
        else {
            lstBoat = [SELECT Id, Name, Contact__c, Contact__r.Name, BoatType__c, 
                       Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s 
                       FROM Boat__c Limit 50000];
        }
        System.Debug(LoggingLevel.ERROR, 'Id: ' + boatTypeId + ' => ' + lstBoat);
        return lstBoat;
    }
}
public with sharing class BoatSearchFormController {
  @AuraEnabled
    public static Map<String, String> getBoatTypes() {
        Map<String, String> mapBoatType = new Map<String, String>();
        for(BoatType__c bt : [Select Id, Name From BoatType__c Limit 50000]) {
            mapBoatType.put(bt.Id, bt.Name);
        }
        return mapBoatType;
    }
}
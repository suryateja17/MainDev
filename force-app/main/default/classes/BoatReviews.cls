public with sharing class BoatReviews {
    @AuraEnabled
    public static List<BoatReview__c> getAll(Id boatId) {
        List<BoatReview__c> lstBoatReview = new List<BoatReview__c>();
        if(String.isNotBlank(boatId)) {
            lstBoatReview = [Select Id, Name, Comment__c, Rating__c, LastModifiedDate, CreatedDate, 
                             CreatedBy.Name, CreatedBy.SmallPhotoUrl, CreatedBy.CompanyName
                            FROM BoatReview__c
                            WHERE Boat__c=:boatId];
        }
        return lstBoatReview;
    }

}
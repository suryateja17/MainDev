trigger BatchApexErrorTrigger on BatchApexErrorEvent (after insert) {

    list<BatchLeadConvertErrors__c> lstLce = new list<BatchLeadConvertErrors__c>();
    for(BatchApexErrorEvent aee : trigger.new){
        BatchLeadConvertErrors__c lce = new BatchLeadConvertErrors__c();
        lce.AsyncApexJobId__c = aee.AsyncApexJobId;
        lce.Records__c = aee.JobScope;
        lce.StackTrace__c = aee.StackTrace;
        lstLce.add(lce);
    }
    insert lstLce;
}
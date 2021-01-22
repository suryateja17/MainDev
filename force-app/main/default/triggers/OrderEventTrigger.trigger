trigger OrderEventTrigger on Order_Event__e (after insert) {
    list<task> lstTsks = new list<Task>();
    for(Order_Event__e evt : trigger.new){
        if(evt.Has_Shipped__c == true){
            task t = new task();
            t.subject = 'Follow up on shipped order ' + evt.Order_Number__c;
            t.OwnerId = evt.createdbyId;
            lstTsks.add(t);
        }
    }
    list<database.saveResult> sr = database.insert(lstTsks);

}
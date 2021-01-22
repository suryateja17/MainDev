public class batchApexPractice implements Database.Batchable<sobject>{

    public Database.QueryLocator start(Database.BatchableContext BC){
        string q = 'select id , name from account';
        return Database.getQueryLocator(q);
    }
    
    public void execute(Database.BatchableContext BC, list<account> scope){
        
        for(account a : scope){
            system.debug('Account Id: '+a.Id+ ' Acc Name '+a.Name);
            
        }
    }
    public void finish(Database.BatchableContext BC){}

}
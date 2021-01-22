public without sharing class OrderHelper {
    
    /**
    * @name AfterUpdate
    * @description 
    * @param List<Order> newList
    * @param List<Order> oldList
    * @return void
    **/
    public static void AfterUpdate(List<Order> newList, List<Order> oldList){
        Set<Id> orderIds = new Set<Id>();
        for ( Integer i=0; i<newList.size(); i++ ){
            if ( newList[i].Status == Constants.ACTIVATED_ORDER_STATUS && oldList[i].Status == Constants.DRAFT_ORDER_STATUS){
                orderIds.add(newList[i].Id);
            }
        }
        RollUpOrderItems(orderIds);
    }
    
    /**
    * @name RollUpOrderItems
    * @description Given a set of Activated Order ids, query the child Order Items and related Products to calculate Inventory levels
    * @param Set<Id> activatedOrderIds
    * @return void
    **/
    public static void RollUpOrderItems(Set<Id> activatedOrderIds){
        Map<Id, Product2> productMap = new Map<Id, Product2>();
        
        for(OrderItem oi : [SELECT Id, Product2Id FROM OrderItem WHERE OrderId IN : activatedOrderIds])
        { 
            if(!productMap.containsKey(oi.Product2Id))
                productMap.put(oi.Product2Id, new Product2(Id=oi.Product2Id, Quantity_Ordered__c=0)); 
        }
        
        for(AggregateResult agres : [SELECT Sum(Quantity), Product2Id FROM OrderItem 
                                  WHERE Product2Id IN : productMap.keySet() Group By Product2Id])
        {
            Id productId = (Id)agres.get('Product2Id');
            Product2 prodOrd = productMap.get(productId);
            prodOrd.Quantity_Ordered__c = (Decimal)agres.get('expr0');
            productMap.put(productId , prodOrd);
        }
        
        try { 
            if(productMap != null && !productMap.values().isEmpty()){ 
                update productMap.values(); 
            } 
        }
        catch(Exception ex){ 
            System.debug(LoggingLevel.ERROR, 'Exception occured : ' + ex.getStackTraceString()); 
        } 
    }
    
}
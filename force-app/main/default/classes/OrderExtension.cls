/**
 * @name OrderExtension
 * @description This class is provided for you to facilitate the Super Badge
**/
public class OrderExtension {

    public Order orderRecord {get;set;}
    public List<OrderItem> orderItemList {get;set;}
    public String selectedFamily {get;set;}
    public List<chartHelper.chartData> pieData {get;set;}
    public Decimal total {get;set;}

    public Map<Id,OrderItem> orderItemMap;
    ApexPages.StandardSetController standardSetController;
    private Map<Id, OrderItem> mapOI = new Map<Id, OrderItem>(); 

    public OrderExtension(ApexPages.StandardController standardController){
        orderRecord = (Order)standardController.getRecord();
        orderItemMap = new Map<id,OrderItem>();
        if ( orderRecord.Id != null ){
            orderRecord = queryOrderRecord(orderRecord.Id);
        }
        for(OrderItem oi : orderRecord.OrderItems) {
            mapOI.put(oi.Product2Id, oi);
        }
        orderItemList = new List<OrderItem>();
        
        initializeData();
        populateOrderItemList();
        OnFieldChange();
    }
  
    //ToDo: Implement your own method to populate orderItemList
    //  that you will call after pagination and/or family selection
    
    private void initializeData() {
        String query = 'SELECT Id, Name, Product2.Family, Product2.Name, Product2Id, UnitPrice, Product2.Quantity_Remaining__c'
            + '  FROM PricebookEntry WHERE IsActive = TRUE';
        
        if (String.isNotBlank(selectedFamily) && !selectedFamily.equalsIgnoreCase(Constants.SELECT_ONE)) {
            query += ' AND Product2.Family = \'' + selectedFamily + '\'';
        }
        query += ' ORDER BY Name';
        
        standardSetController = new ApexPages.StandardSetController(Database.getQueryLocator(query));
        standardSetController.setPageSize(Constants.DEFAULT_ROWS);
    }
    
    public void populateOrderItemList() {
        orderItemList = new List<OrderItem>();
        for(PricebookEntry pbi : (List<PricebookEntry>) standardSetController.getRecords()) {
            if(mapOI.containsKey(pbi.Product2Id)) {
                orderItemList.add(mapOI.get(pbi.Product2Id));
            }
            else {
                OrderItem oi = new OrderItem();
                oi.Quantity = 0;
                oi.Product2 = pbi.Product2;
                oi.Product2Id = pbi.Product2Id;
                oi.PricebookEntryId = pbi.Id;
                oi.UnitPrice = 0;
                orderItemList.add(oi);
            }
        }
    }
    
    /**
     * @name OnFieldChange
     * @description
    **/
    public void OnFieldChange(){
        //ToDo: Implement logic to store the values changed on the page
        //      and populate pieData
        //      and populate total
        for(OrderItem oi : orderItemList) {
            mapOI.put(oi.Product2Id, oi);
        }
        
    total = 0;
        List<ChartHelper.ChartData> cht = new List<ChartHelper.ChartData>();
        for(OrderItem oi : mapOI.values()) {
            if(oi.Quantity > 0 && oi.UnitPrice > 0) {
                cht.add(new ChartHelper.ChartData(oi.Product2.Name, oi.UnitPrice * oi.Quantity));
              total += oi.UnitPrice * oi.Quantity;
            }
        }
        pieData = cht;
    }

    /**
     * @name SelectFamily
     * @description
    **/
    public void SelectFamily(){
        //ToDo: Implement logic to filter based on the selected product family
        initializeData();
        populateOrderItemList();
    }

    /**
     * @name Save
     * @description
    **/
    public void Save(){
        //ToDo: Implement logic to save the Order and populated OrderItems
        System.Savepoint sp = Database.setSavepoint();
        List<OrderItem> itemsToDelete = new List<OrderItem>();
        List<OrderItem> itemsToUpsert = new List<OrderItem>();
        
        try {
            if(orderRecord != null) {
                if (orderRecord.Pricebook2Id == null) {
                  orderRecord.Pricebook2Id = Constants.STANDARD_PRICEBOOK_ID;
              }
                upsert orderRecord;
            }
            
            for(OrderItem oi : mapOI.values()) {
                if(oi.OrderId != null) {
                    //This is existing Product
                    if(oi.Quantity == 0) {itemsToDelete.add(oi);}
                    else {
                        itemsToUpsert.add(oi);
                    }
                }
                else {
                    if(oi.Quantity > 0){
                        oi.OrderId = orderRecord.Id;
                        itemsToUpsert.add(oi);
                    }
                }
            }
            
            delete itemsToDelete;
            upsert itemsToUpsert;
        }
        catch(Exception ex) {
            Database.rollback(sp);
            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.INFO,Constants.ERROR_MESSAGE));
        }
        
    }


    /**
     * @name First
     * @description
    **/
    public void First(){
    standardSetController.first();
        populateOrderItemList();
    }
  
    /**
     * @name Next
     * @description
    **/
    public void Next(){
    standardSetController.next();
        populateOrderItemList();
    }


    /**
     * @name Previous
     * @description
    **/
    public void Previous(){
    standardSetController.previous();
        populateOrderItemList();
    }

    /**
     * @name Last
     * @description
    **/
    public void Last(){
    standardSetController.last();
        populateOrderItemList();
    }

    /**
     * @name GetHasPrevious
     * @description
    **/
    public Boolean GetHasPrevious(){
        return standardSetController.getHasPrevious();
    }

    /**
     * @name GetHasNext
     * @description
    **/
    public Boolean GetHasNext(){
        return standardSetController.getHasNext();
    }

    /**
     * @name GetTotalPages
     * @description
    **/
    public Integer GetTotalPages(){
        Decimal totalSize = standardSetController.getResultSize();
        Decimal pageSize = standardSetController.getPageSize();
        Decimal pages = totalSize/pageSize;
        return (Integer)pages.round(System.RoundingMode.CEILING);
    }

    /**
     * @name GetPageNumber
     * @description
    **/
    public Integer GetPageNumber(){
        return standardSetController.getPageNumber();
    }

    /**
     * @name GetFamilyOptions
     * @description
    **/
    public List<SelectOption> GetFamilyOptions(){
        List<SelectOption> familyOptions = new List<SelectOption>();
        
        familyOptions.add(new SelectOption(Constants.SELECT_ONE, Constants.SELECT_ONE));
        for( Schema.PicklistEntry ple : Constants.PRODUCT_FAMILY) {
            familyOptions.add(new SelectOption(ple.getLabel(), ple.getValue()));
        }       
        return familyOptions;
    }

    /**
     * @name QueryOrderRecord
     * @description
    **/
    public static Order QueryOrderRecord(Id orderId){
        return [
            SELECT Id, AccountId, EffectiveDate, Name, Status, Pricebook2Id,
                (
                    SELECT Id, OrderId, Quantity, UnitPrice, PricebookEntryId, Product2Id,
                         Product2.Name, Product2.Family, Product2.Quantity_Remaining__c
                    FROM OrderItems
                )
            FROM Order
            WHERE Id = :orderId
        ];
    }

}
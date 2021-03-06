public class Product2Helper {

    /**
     * @name COLLABORATION_GROUP
     * @description List of CollaborationGroup used in both business and test logic
    **/
    static List<CollaborationGroup> COLLABORATION_GROUP = [
        SELECT Id
        FROM CollaborationGroup
        WHERE Name = :Constants.INVENTORY_ANNOUNCEMENTS
        OR Name = :('TEST' + Constants.INVENTORY_ANNOUNCEMENTS)
        LIMIT 1
    ];

    /**
     * @name afterUpdate
     * @description called by product2 Trigger on After Update
     * @param List<Product2> newList
     * @param List<Product2> oldList
    **/
    public static void AfterUpdate(List<Product2> newList, List<Product2> oldList) {
        //ToDo: Declare a List of Product2 records named needsAnnouncement

        //ToDo: Declare a Map of Strings to Inventory_Setting__mdt records

        //ToDo: Loop through a query of Inventory_Setting__mdt records and populate the Map with Name as the key

        //ToDo: Loop through the Products in newList
        // Use the corresponding Inventory Setting record to determine the correct Low Quantity Alert
        // If the Product's Quantity Remaining has been changed to less than the Low Quantity Alert
        //      add it to the needsAnnouncement list

        //ToDo: Pass records to the postAlerts method
        
        try {
            List<Product2> needsAnnouncement = new List<Product2>();
            Map<String, Inventory_Setting__mdt> mapInventory = new Map<String, Inventory_Setting__mdt>();
            for(Inventory_Setting__mdt inventory_rec : [Select DeveloperName, Low_Quantity_Alert__c From Inventory_Setting__mdt]) {
                mapInventory.put(inventory_rec.DeveloperName , inventory_rec);
            }
            
            for(Product2 prod : newList) {
                if(prod.Quantity_Remaining__c < mapInventory.get(prod.Family).Low_Quantity_Alert__c) {
                    needsAnnouncement.add(prod);
                }
            }
            PostAlerts(needsAnnouncement);
        }
        catch(Exception ex) {
            System.Debug('Error occured : ' + ex.getStackTraceString());
        }
    }

    /**
     * @name postAlerts
     * @description called by product2 Trigger on After Update
     * @param List<Product2> productList
    **/
    public static void PostAlerts(List<Product2> productList){
        List<ConnectApi.AnnouncementInput> toPost = new List<ConnectApi.AnnouncementInput>();
        for ( Product2 p : productList ){
            // ToDo: Construct a new AnnouncementInput for the Chatter Group so that it:
            // expires in a day
            // does not notify users via email.
            // and has a text body that includes the name of the product followed by the INVENTORY_LEVEL_LOW constant
            ConnectApi.MessageBodyInput message = new ConnectApi.MessageBodyInput();
            List<ConnectApi.MessageSegmentInput> segmentInput = new List<ConnectApi.MessageSegmentInput>();
            ConnectApi.TextSegmentInput textsegement = new ConnectApi.TextSegmentInput();
            textsegement.text = p.Name + ' ' + Constants.INVENTORY_LEVEL_LOW;
            segmentInput.add(textsegement);
            message.messageSegments = segmentInput;
            
            ConnectApi.AnnouncementInput input = new ConnectApi.AnnouncementInput();
            input.parentId = COLLABORATION_GROUP.get(0).Id;
            input.expirationDate = system.today().addDays(1);
            input.sendEmails = false;
            input.body = message;
            
            toPost.add(input);
        }
        // ToDo: Create and enqueue an instance of the announcementQueuable class with the list of Products
        AnnouncementQueueable announce = new AnnouncementQueueable(toPost);
        System.enqueueJob(announce);
    }
}
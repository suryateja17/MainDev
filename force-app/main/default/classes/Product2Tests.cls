@isTest
private class Product2Tests {
  
    /**
     * @name product2Extension_UnitTest
     * @description UnitTest for product2Extension
    **/
    static TestMethod void Product2Extension_UnitTest(){
      Test.setCurrentPage(Page.Product2New);
        
        User runningUser = new User(
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id,
            LastName = 'last',
            Email = 'test@test.com',
            Username = 'test@test.com.username',
            CompanyName = 'TEST',
            Title = 'title',
            Alias = 'alias',
            TimeZoneSidKey = 'America/Phoenix',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            IsActive = true
        );
        
        System.runAs(runningUser) {
            Test.startTest();
            ApexPages.StandardController sc = new ApexPages.StandardController(new Product2());
            Product2Extension ext = new Product2Extension(sc);
            System.assertEquals(Constants.DEFAULT_ROWS, ext.productsToInsert.size());
            ext.addRows();
            System.assertEquals(Constants.DEFAULT_ROWS*2, ext.productsToInsert.size());
            
            for(integer i = 0 ; i < ext.productsToInsert.size()/2 ; i++) {
                ext.productsToInsert[i].productRecord.Name = 'Test' + i;
                ext.productsToInsert[i].pricebookEntryRecord.IsActive = true;
                ext.productsToInsert[i].productRecord.IsActive = true;
                ext.productsToInsert[i].productRecord.Initial_Inventory__c = 10 + i;
                ext.productsToInsert[i].productRecord.Family = 'Entree';
                ext.productsToInsert[i].pricebookEntryRecord.UnitPrice = 100;
            }
            List<Product2Extension.ProductWrapper> lstProductsToInsert = ext.productsToInsert.clone();
            ext.save();
            List<Product2> lstProduct = [Select Id, Name, IsActive, Initial_Inventory__c, Family 
                                         From Product2 Order By Initial_Inventory__c ASC];
            
            for(integer i = 0 ; i < lstProductsToInsert.size()/2 ; i++) {
                system.assertEquals(lstProduct[i].Name, lstProductsToInsert[i].productRecord.Name);
                system.assertEquals(lstProduct[i].IsActive, lstProductsToInsert[i].productRecord.IsActive);
                system.assertEquals(lstProduct[i].Initial_Inventory__c, lstProductsToInsert[i].productRecord.Initial_Inventory__c);
                system.assertEquals(lstProduct[i].Family, lstProductsToInsert[i].productRecord.Family);
      }
            Test.stopTest();
        }
    }
    
    static testMethod void Product2Trigger_UnitTest() {
        Test.setCurrentPage(Page.Product2New);
        Product2 prod = new Product2(Name='Test', Family='Entree', Quantity_Ordered__c = 10, Initial_Inventory__c = 100, IsActive=true);
        insert prod;
        System.assertNotEquals(prod.Id, null);
        CollaborationGroup cg = new CollaborationGroup(
        Name = 'TEST' + Constants.INVENTORY_ANNOUNCEMENTS,
        CollaborationType = 'Public',
            IsArchived = false,
            IsAutoArchiveDisabled = true
      );
        insert cg;
        System.assertNotEquals(cg.id, null);
        
        User runningUser = new User(
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id,
            LastName = 'last',
            Email = 'test@test.com',
            Username = 'test@test.com.username',
            CompanyName = 'TEST',
            Title = 'title',
            Alias = 'alias',
            TimeZoneSidKey = 'America/Phoenix',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            IsActive = true
        );
        
        System.runAs(runningUser) {
            Test.startTest();
            ApexPages.StandardController sc = new ApexPages.StandardController(new Product2());
            Product2Extension ext = new Product2Extension(sc);
            System.assertEquals(Constants.DEFAULT_ROWS, ext.productsToInsert.size());
            List<SelectOption> lst = ext.GetFamilyOptions();
            system.assertEquals(lst.size(), 5);
            ext.GetInventory();
            
            Product2 updatedProd = [Select Id, Quantity_Ordered__c, Quantity_Remaining__c From Product2 Limit 1];
            Product2 originalProduct = updatedProd.clone();
            updatedProd.Quantity_Ordered__c += 90;
            update updatedProd;
            TestDataFactory.VerifyQuantityOrdered(
                originalProduct, 
                updatedProd, 
                90
            );
        }
    }
}
import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findId from '@salesforce/apex/fetchCaseNumber.fetchId'
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import ContactEmail_FIELD from '@salesforce/schema/Case.ContactEmail';
import AccountId_FIELD from '@salesforce/schema/Case.AccountId';
import Type_FIELD from '@salesforce/schema/Case.Type';
import Description_FIELD from '@salesforce/schema/Case.Description';
import Subject_FIELD from '@salesforce/schema/Case.Subject';
import Comments_FIELD from '@salesforce/schema/Case.Comments';
import ParentId_FIELD from '@salesforce/schema/Case.ParentId';
import Product_FIELD from '@salesforce/schema/Case.Product__c';
import IsEscalated_FIELD from '@salesforce/schema/Case.IsEscalated';
import OwnerId_FIELD from '@salesforce/schema/Case.OwnerId';

export default class SearchAndUpdateCase extends LightningElement {
    @track caseNumber;
    @track csNum;
    showForm = false;
    recordId='';
    objectApiName = 'Case';

    @wire(findId,{caseNum : '$csNum'})
    csId ;

    @track fields = [REASON_FIELD,ContactEmail_FIELD,AccountId_FIELD,Description_FIELD,Type_FIELD,Subject_FIELD,
        Comments_FIELD,ParentId_FIELD,Product_FIELD,IsEscalated_FIELD,OwnerId_FIELD ];

    handleCaseNumChange(event){
        console.log('>>Inside handle case change');
        this.csNum = event.target.value;
        console.log('>>>The typed incident number is '+this.csNum);
        console.log('>>>Case Id is :'+JSON.stringify(this.csId)); 
    }

    handleButtonClick(event){
        //console.log(event.target);
        console.log('>>>Case Id is from button :'+JSON.stringify(this.csId));
        if(this.csId){
            this.showForm = true;
            this.recordId = this.csId.data;}
    }

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        console.log('>>Inside Submit<<');
        //const fields = event.detail.fields;
        //fields.LastName = 'My Custom Last Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(this.fields);
        
     } 

     handleSuccess(event){
        console.log('>>>Inside success<<<');
        const evt = new ShowToastEvent({
            title: "Case Updated",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.showForm = false;

     }

     handleCancel(event){

        console.log('>>Inside Cancel<<');
        this.showForm = false;
     }
}
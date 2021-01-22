import { LightningElement,track,wire,api } from 'lwc';
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
import ContId_FIELD from '@salesforce/schema/Case.ContactId';
import { refreshApex } from '@salesforce/apex';

export default class SearchAndUpdateCase extends LightningElement {
    @track caseNumber;
    @track csNum;
    showForm = false;
    showGetCase = true;
    @track recordId;
    objectApiName = 'Case';
    @track wireddata;
    @track caseN='';

    @wire(findId,{caseNum : '$csNum'})
    csId({ error, data }){
        if(data){
            console.log('>>data>>'+data);
            this.wiredData = data !== null && data !== undefined ? data : undefined;
            this.recordId = this.wiredData;
            this.caseN = this.wiredData;
            //this.showForm = data !== undefined;
            
        }
        else if(error){
            console.log('>>>Did not find record>>>', error );
            this.recordId = '';
        }
    } ;

    @track fields = [ContId_FIELD,REASON_FIELD,ContactEmail_FIELD,AccountId_FIELD,Description_FIELD,Type_FIELD,Subject_FIELD,
        Comments_FIELD,ParentId_FIELD,Product_FIELD,IsEscalated_FIELD,OwnerId_FIELD ];
      

    handleCaseNumChange(event){

        this.showForm = false; 
        this.csNum = event.target.value;
        //this.caseN = event.target.value;
        console.log('****Setting caseN to :'+this.caseN);
        if(this.wiredData !== null && this.wiredData !== undefined)
        this.recordId = this.wiredData;

    }

    handleButtonClick(event){

            console.log('>>>RC ID >>>'+this.recordId);
            if(this.recordId)
            this.showForm = true;
        }

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting

        const fields = event.detail.fields;
        //fields.Comments += 'My Custom Comment'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
        
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
        //refreshApex(this.wireddata);

     }

     handleCancel(event){

        console.log('>>Inside Cancel<<');
        this.showForm = false;
     }

     handleError(event){
         console.log('>>Inside error>>');
     }

     handleload(event){

        console.log('>>>>Loaded<<<<');
        //refreshApex(this.wireddata);
     }

     fireEventToTableCmp(recordId){
        console.log('**Firing custom event');

     }
}
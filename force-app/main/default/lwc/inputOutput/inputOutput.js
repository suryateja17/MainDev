import { LightningElement,track } from 'lwc';

export default class InputOutput extends LightningElement {
    @track inputvalReverse='';
    inputVal;

    handleInputChange(event){
        this.inputvalReverse = '';
        this.inputVal = '';
        this.inputVal = event.target.value;
        console.log('Value is :'+this.inputVal);
        var strlen = this.inputVal.length;
        console.log('Input length'+strlen);
        if(strlen > 0)
        while(strlen > 0){
            console.log('***char'+this.inputVal[strlen -1]);
            this.inputvalReverse = this.inputvalReverse + this.inputVal[strlen -1];
            strlen--;
        }
    }

}
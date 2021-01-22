<aura:application extends="force:slds">
    <lightning:layout horizontalAlign="spread" multipleRows="true">
        
        <lightning:layoutItem flexibility="grow" size="12">
            <lightning:card title="Friends with Boats" iconName="custom:custom54" /> 
        </lightning:layoutItem>
        
        <lightning:layoutItem flexibility="grow" size="8" mediumDeviceSize="10" largeDeviceSize="8">
            <lightning:card title="Find a Boat">
                <p class="slds-p-horizontal_small">
                    <c:BoatSearchForm />
                </p>
            </lightning:card>
            
            <lightning:card title="Matching Boats">
                <p class="slds-p-horizontal_small">
                    <c:BoatSearchResults />
                </p>
            </lightning:card>
            
        </lightning:layoutItem>
        
        <lightning:layoutItem flexibility="grow" size="4" mediumDeviceSize="2" largeDeviceSize="4">
            <lightning:layout horizontalAlign="spread" multipleRows="true">
                <lightning:layoutItem flexibility="grow" size="12">
                    2
                </lightning:layoutItem>
                <lightning:layoutItem flexibility="grow" size="12">
                    3
                </lightning:layoutItem>
            </lightning:layout>
        </lightning:layoutItem>
    </lightning:layout>
</aura:application>
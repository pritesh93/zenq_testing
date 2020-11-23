class DeviceManagementPage
{
    getDeviceManagement(){
        return cy.get('.page-topbar__title')
    }

    getDeviceManagementBar(){
        return cy.get('.device-management-actionbar')
    }

    getToggle(device){
        return cy.xpath('(//*[contains(text(),"'+device+'")])/parent::div/div[@class="toggle"]/input')
    }

    // getStatus(device){
    //     return cy.xpath('(//*[contains(text(),"'+device+'")])/parent::div/div[@class="device__status-label--disabled device__status-label"]')
    // }

    getStatus(){
        return cy.get('.device__status-label')
    }

    getDeviceName(device){
        return cy.contains(device)
    }

    getDeviceNameTextBox(){
        return cy.get('.device__input>input')
    }

    getTickMark(){
        return cy.get('.device-actions__action:nth-child(1)')
    }

    getCrossMark(){
        return cy.get('.device-actions > :nth-child(2) > .feather')
    }

    getFirstDevice(){
        return cy.get('.device-items>#device-item-0')
    }

    getSearch(){
        return cy.get('#search-input')
    }

    getSearchBarIcon(){
        return cy.get('.searchbar-icon')
    }

    getClearSearch(){
        return cy.get('#clear-search')
    }

    getError(){
        return cy.get('.error')
    }

    getTooltipClose(){
        return cy.get('button[class="btn btn__text"]')
    }

    getAddDevice(){
        return cy.get('#add-device-button')
    }

    getMACAddress(){
        return cy.get('#address-input-device-modal')
    }

    getContinueButton(){
        return cy.get('#continue-device-modal')
    }

    getServeelet(){
        return cy.get('#cabinet-device-modal')
    }

    getAddserverLinkContinue(){
        return cy.get('#continue-device-modal:nth-child(3)')
    }

    getDoor0(){
        return cy.get('#0-door-name-device-modal')
    }

    getDoor1(){
        return cy.get('#1-door-name-device-modal')
    }

    getSubmitAddDevice(){
        return cy.get('#submit-device-modal')
    }

    getFeedbackClose(){
        return cy.get('#exit-feedback-modal')
    }

    getAddedDevices(){
        return cy.get('.device-item')
    }

     getAlertMessage(){
         return cy.get('.alert-bar__message')
     }

     getCloseAddDevices(){
         return cy.get('#exit-device-modal > .feather');
     }

     getMenuOfDevice(){
         return cy.get('#device-menu > span > .feather')
     }

     getDeleteDevice(){
         return cy.get('#delete-device-menu')
     }

     getConfirmationPopUp(){
         return cy.get('#accept-confirmation-modal')
     }

    verifyDeviceManagementPage(){
        cy.wait(3000)
        this.getDeviceManagement().should('have.text','Device Management')
        this.getDeviceManagementBar().should('be.visible')
    }

    clickonToggle(devicename){
        cy.wait(2000)
        this.getToggle(devicename).click()
        cy.wait(1000)
    }

    verifyToggleStatus(devicename,value){
        this.getStatus().contains(value).should('be.visible')
    }

    searchDevices(devicename){
        this.getSearch().clear().type(devicename)
        this.getSearchBarIcon().click()
        cy.wait(3000)
    }

    clickOnClearSearch(){
        this.getClearSearch().click()
    }

    renameDevice(devicename,newDevicename,bRename){
        this.getDeviceName(devicename).click()
        this.getDeviceNameTextBox().clear().type(newDevicename)
        if(bRename==true){
            cy.log(bRename)
            this.getTickMark().click()
            this.getFirstDevice().contains(newDevicename).should('be.visible')    
        }else{
            this.getCrossMark().click()
            this.getFirstDevice().contains(newDevicename).should('not.be.visible')
        }
    }

    closeTooltip(){
        cy.waitFor(2000)
        this.getTooltipClose().click()
    }

    addDevice(macAddress,door0,door1){
        this.getAddDevice().click()
        this.getMACAddress().clear().type(macAddress)
        this.getContinueButton().click()
        this.getServeelet().click()
        this.getAddserverLinkContinue().click()
        this.getDoor0().clear().type(door0)
        this.getDoor1().clear().type(door1)
        this.getSubmitAddDevice().click()
        
    }

    verifyAddedDevices(devices){
        this.getFeedbackClose().click()
        for(let item of devices){
            this.searchDevices(item)
            this.getAddedDevices().contains(item).should('be.visible')
            this.clickOnClearSearch()
        }
    }

    verifyErrorMessage(){
        this.getAlertMessage().contains('Device already exists.').should('be.visible')
        this.getCloseAddDevices().click()
    }

    deleteDevice(deviceName){
        this.searchDevices(deviceName)
        this.getMenuOfDevice().click()
        this.getDeleteDevice().click()
        this.getConfirmationPopUp().click()
    }

    
}export default DeviceManagementPage
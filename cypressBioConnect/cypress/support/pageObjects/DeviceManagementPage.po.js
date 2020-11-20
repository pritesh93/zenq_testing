class DeviceManagementPage
{
    getDeviceManagement(){
        return cy.get('.page-topbar__title')
    }

    getDeviceManagementBar(){
        return cy.get('.device-management-actionbar')
    }
//Test5
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
        return cy.get('.device-actions__action:nth-child(2)')
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

    verifyDeviceManagementPage(){
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

    renameDevice(devicename,newDevicename,bRename,rename,errorMsg){
        this.getDeviceName(devicename).click()
        this.getDeviceNameTextBox().clear().type(newDevicename)
        if(bRename=true){
            this.getTickMark().click()
            this.getFirstDevice().contains(newDevicename).should('be.visible')    
        }else{
            this.getCrossMark().click()
            this.getFirstDevice().contains(newDevicename).should('be.visible')
        }
    }

    closeTooltip(){
        cy.waitFor(2000)
        this.getTooltipClose().click()
    }

    


    
}export default DeviceManagementPage
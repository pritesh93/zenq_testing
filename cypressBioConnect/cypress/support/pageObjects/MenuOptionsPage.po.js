class MenuOptionsPage
{
    getGroupIcon(){
        return cy.get('#group-management-nav')
    }

    getDeviceIcon(){
        return cy.get('#device-management-nav')
    }

    clickonGroupIcon(){
        this.getGroupIcon().click()
    }
    
    clickonDeviceIcon(){
        this.getDeviceIcon().click()
    }

}export default MenuOptionsPage
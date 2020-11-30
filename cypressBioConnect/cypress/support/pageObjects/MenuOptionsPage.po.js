class MenuOptionsPage
{
    getGroupIcon(){
        return cy.get('#group-management-nav')
    }

    getDeviceIcon(){
        return cy.get('#device-management-nav')
    }

    getAuthenticationIcon(){
        return cy.get('#configuration-nav')
    }

    getAlertIcon(){
        return cy.get('#alerts-toggle-nav')
    }

    clickonGroupIcon(){
        this.getGroupIcon().click()
    }
    
    clickonDeviceIcon(){
        this.getDeviceIcon().click()
    }

    clickonACMIcon(){
        this.getAuthenticationIcon().click()
    }

    clickOnAlertIcon(){
        this.getAlertIcon().click()
    }

}export default MenuOptionsPage
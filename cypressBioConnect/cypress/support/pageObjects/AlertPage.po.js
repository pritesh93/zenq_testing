class AlertPage
{
    getAlertsTitle(){
        return cy.get('.sidepanel-topbar__title')
    }

    getAlertMessage(){
        return cy.get('.empty-state')
    }

    getCloseAlert(){
        return cy.get('#exit-sidepanel > .feather')
    }

    verifyAlertPage(){
        this.getAlertsTitle().contains('Alerts').should('be.visible')
    }

    verifyAlerts(){
        this.getAlertMessage().contains('There are no new alerts at this time.').should('be.visible')
    }

    clickOnCloseAlert(){
        this.getCloseAlert().click()
    }

    verifyClosedAlert(){
        this.getAlertsTitle().should('not.exist')
    }




}export default AlertPage
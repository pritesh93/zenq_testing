class StatusPage{

    getHealthyText(){
        return cy.get('.health__level')
    }

    getHealthyMessage(){
        return cy.get('.health__message')
    }

    getSignIn(){
        return cy.get('#sign-in')
    }

    verifySystemHealthPage(){
        cy.title().should('eq','BioConnect Link')
    }

    verfiyStatusMessage(){
        cy.waitFor(3000)
        cy.url().should('include','status');
        this.getHealthyText().should('contain.text','healthy')
        // this.getHealthyMessage().should('contain.text','System is online, no issues to report.')
    }

    clickOnSignIn(){
        this.getSignIn().click()
    }
}export default StatusPage
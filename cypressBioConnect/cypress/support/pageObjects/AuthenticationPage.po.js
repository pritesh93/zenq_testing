class AuthenticationPage
{
    getPageTitle(){
        return cy.get('.page-topbar__title')
    }

    getACMSyncTab(){
        return cy.get('#tab-1')
    }

    getAboutBioConnectText(){
        return cy.get('.column--two>.acm-sync-container')
    }

    getBeforeText(){
        return cy.get('.column--three>.acm-sync-container')
    }

    getContactUs(){
        return cy.get('[href="mailto:schatterjee@bioconnect.com"]')
    }

    getAuthenticatorsTab(){
        return cy.get('#tab-0')
    }

    getSMS(){
        return cy.get('#sms-authenticator')
    }

    getDefaultCheckbox(){
        return cy.get('label[for="default-authenticator-check"]')
    }

    getSubmitButtonforSMS(){
        return cy.get('#submit-button-sms')
    }

    getActiveSMS(){
        return cy.get('#sms-authenticator>div[class="authenticator-box authenticator-box--active"]')
    }

    getDeactiveSMS(){
        return cy.get('div[class="authenticator-section-content"]>div#sms-authenticator')
    }

    getBC(){
        return cy.get('#bcid-authenticator')
    }

    getBCActivate(){
        return cy.get('div[class="authenticator-section-content"]>div#bcid-authenticator>div:nth-child(1)')
    }

    getSubmitButtonforBC(){
        return cy.get('#submit-button-bcid')
    }

    getActivatedBC(){
        return cy.get('#bcid-authenticator>div[class="authenticator-box authenticator-box--active"]')
    }
  

   verifyAuthenticationManagementPage(){
        this.getPageTitle().contains('Authenticator Management').should('be.visible')
    }
    
    clickOnACMAndVerify(){
        this.getACMSyncTab().click()
        this.getAboutBioConnectText().contains('p','The BioConnect Link ACM Sync will automatically extract and encrypt required user information for BioConnect Link.').should('be.visible')
        this.getBeforeText().contains('div','Before you begin...').should('be.visible')
    }

    clickOnContactUSAndVerify(email){
        // this.getContactUs().click()
        this.getContactUs().should('be.visible')
    }

    clickOnAuthenticatorsTab(){
        this.getAuthenticatorsTab().click()
    }

    activateSMS(){
        this.getSMS().click()
        this.getDefaultCheckbox().click()
        this.getSubmitButtonforSMS().click()
        cy.wait(2000)
    }

    verifyActivatedSMS(){
        this.getActiveSMS().should('be.visible')
    }

    deactivateSMS(){
        this.getSMS().click()
        this.getDefaultCheckbox().click()
        this.getSubmitButtonforSMS().click()
        cy.wait(2000)
    }

    verifyDeactivatedSMS(){
        this.getDeactiveSMS().contains('div','authenticator-box authenticator-box--active').should('not.be.visible')
    }

   
    activateBC(){
        this.getBCActivate().then(($btn) => {
            const cls = $btn.attr('class')
            if(cls.includes('authenticator-box authenticator-box--active')){
                cy.log('BC is activated already')
            }else{
                this.getBC().click()
                this.getDefaultCheckbox().click()
                this.getSubmitButtonforBC().click()
            }
          })
    }

    verifyActivatedBC(){
        this.getActivatedBC().should('be.visible')
    }
    
    

}export default AuthenticationPage
class LoginPage
{
    getSubDomainTextBox() {
        return cy.get('#subDomain')
    }
    getUsernameTextBox() {
        return cy.get('#username')
    }
    getPasswordTextBox() {
        return cy.get('#password')
    }

    getLoginButton() {
        return cy.get('#submit-login')
    }

    getUserManagementText(){
        return cy.contains('User Management')
    }

    getForGotPasswordLink(){
        return cy.get('#forgot-password')
    }

    getLoginError(){
        return cy.get('.login__error-message')
    }

    getSystemHealth(){
        return cy.get('#system-health')
    }
    
    enterUsernameAndPassword(subdomain,uname,password)
    {
        this.getSubDomainTextBox().clear().type(subdomain)
        this.getUsernameTextBox().clear().type(uname)
        this.getPasswordTextBox().clear().type(password)
    }
    
    clickOnLogin(){
        this.getLoginButton().click()
    }       
    
    verifyLoginError(errorMessage){
        this.getLoginError().should('contain.text',errorMessage)
    }

    clickonForgotPassword(){
        this.getForGotPasswordLink()
    }

    clickonSystemHealthLink(){
        this.getSystemHealth().click()
    }
    
    verifySignInPage(){
        cy.title().should('eq','Link Manager')
        this.getSubDomainTextBox().should('be.visible')
        this.getUsernameTextBox().should('be.visible')
        this.getPasswordTextBox().should('be.visible')
    }   
    

}
export default LoginPage; 
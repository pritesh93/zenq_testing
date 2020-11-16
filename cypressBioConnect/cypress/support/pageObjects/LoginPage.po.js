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

    getLoginError(){
        return cy.get('.login__error-message')
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

    

}
export default LoginPage; 
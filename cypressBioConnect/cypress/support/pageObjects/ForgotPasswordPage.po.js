class ForgotPasswordPage
{
    getSubDomainTextBox() {
        return cy.get('#subDomain')
    }
    getUsernameTextBox() {
        return cy.get('#username')
    }

    getRestPasswordText(){
        return cy.get('.login-form__title')
    }
    getResetPasswordLink(){
        return cy.get('#reset-password')
    }

    enterForgotPasswordDetails(subdomain,emailID){
        this.getRestPasswordText().should('be.visible')
        this.getSubDomainTextBox().clear().type(subdomain)
        this.getUsernameTextBox().clear().type(emailID)
    }

    clickOnResetPassword(){
        this.getResetPasswordLink().click()
    }
}export default ForgotPasswordPage
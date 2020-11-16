class UserManagementPage{
    getUserLogoutMenu() {
        return cy.get('#account-menu-nav')
    }

    getSignoutLink() {
        return cy.get('#logout-menu-nav')
    }

    verifyLogin(){
        cy.title().should('eq','User Management')
    }

    logoutFromApplication(){
        this.getUserLogoutMenu().click()
        this.getSignoutLink().click()
        cy.wait(3000)
    }

    
}export default UserManagementPage; 
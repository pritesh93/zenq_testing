class UserManagementPage{
    getUserLogoutMenu() {
        return cy.get('#account-menu-nav')
    }

    getSignoutLink() {
        return cy.get('#logout-menu-nav')
    }

    getUserTable() {
        return cy.get('div.user-table')
    }

    getUserList(){
        return cy.get('div.user-table>label')
    }

    verifyLogin(){
        cy.title().should('eq','User Management')
    }

    logoutFromApplication(){
        this.getUserLogoutMenu().click()
        this.getSignoutLink().click()
        cy.wait(3000)
    }

    verifyUserList(){
        this.getUserTable().should('be.visible')
        this.getUserList().should('have.length',2)
    }
    
}export default UserManagementPage; 
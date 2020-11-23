import CommonFunctions from '../../support/pageObjects/CommonFunctions'
const faker = require('faker');
const comFun= new CommonFunctions()
const randomEmail = faker.internet.email()
const randomFirstName = faker.name.findName()
const randomLastName = faker.name.findName()

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

    getUserTableHeader(){
        return cy.get('#user-table > .user-item')
    }

    getAddUser(){
        return cy.get('#add-user-button')
    }

    getFirstName(){
        return cy.get('#firstName-user-modal')
    }

    getLastName(){
        return cy.get('#lastName-user-modal')
    }

    getEmail(){
        return cy.get('#email-user-modal')
    }

    getUserName(){
        return cy.get('#username-user-modal')
    }

    getAdminCheckbox(){
        return cy.contains('Assign as Administrator')
    }

    getAddCardCheckbox(){
        return cy.contains('Add Card')
    }

    getAddButton(){
        return cy.get('#add-button-user-modal')
    }

    getCloseFeedback(){
        return cy.get('#exit-feedback-modal > .feather')
    }

    getUserTableData(){
        return cy.get('.user-item')
    }

    getUserCheckbox(userName){
        return cy.get('.user-table>label[data-testid="'+userName+'"]>input')
    }

    getManageDropdown(){
        return cy.get('.dropdown-button-chevron')
    }

    getEditDetails(){
        return cy.get('#edit-details-dropdown')
    }

    getDeleteUser(){
        return cy.get('#delete-button-user-modal')
    }

    getSearchInput(){
        return cy.get('#search-input')
    }

    getSearchButton(){
        return cy.get('.searchbar-icon')
    }

    getClearSearch(){
        return cy.get('#clear-search > .feather')
    }

    getUpdateButton(){
        return cy.get('#add-button-user-modal')
    }

    getPaginationDropdown(){
        return cy.get('#perpage-select-pagination')
    }

    verifyLogin(){
        cy.title().should('eq','User Management')
    }

    logoutFromApplication(){
        this.getUserLogoutMenu().click()
        this.getSignoutLink().click()
        cy.wait(3000)
    }
    
    verifyUserList(name){
        cy.wait(3000)
        this.getUserTable().should('be.visible')
        this.getUserTableHeader().contains('span','Name').should('be.visible')
        this.getUserTableHeader().contains('span','Username').should('be.visible')
        this.getUserTableHeader().contains('span','Email').should('be.visible')
        this.getUserTableHeader().contains('span','Phone Number').should('be.visible')
        this.getUserTableHeader().contains('span','2FA Cards').should('be.visible')
        this.getSearchInput().clear({force: true}).type(name)
        this.getSearchButton().click()
        cy.wait(1000)
        this.verifyUserData(name)
        this.getClearSearch().click()
     }

      addUSers(addCard){
          this.getAddUser().click();
          this.getFirstName().clear().type(randomFirstName)
          this.getLastName().clear().type(randomLastName)
          this.getEmail().clear().type(randomEmail)
          this.getUserName().clear().type(randomEmail)
        if(addCard){
            enterAddCardDetails()
        }
          this.getAddButton().click()
          cy.wait(2000)
          this.getCloseFeedback().click()
          cy.wait(2000)
          this.verifyUserData(randomFirstName+" "+randomLastName)
          this.verifyUserData(randomEmail)
          return randomEmail
      }

      verifyUserData(value){
        this.getUserTableData().contains('span',value).should('be.visible')
      }

      enterAddCardDetails(){
        
      }
    
      deleteUser(email){
        this.getUserCheckbox(email).check()
        this.getManageDropdown().trigger('mouseover')
        this.getEditDetails().click({force: true})
        this.getDeleteUser().click()
        this.getUserTableData().contains('span',email).should('not.be.visible')
      }

      searchUserAndverify(name){
          this.getSearchInput().clear({force: true}).type(name)
          this.getSearchButton().click()
          cy.waitFor(1000)
          this.verifyUserData(name)
          this.getUserList().should('have.length',2)
          this.getClearSearch().click()
      }

      updateDetails(firstName,lastName){
          var email=this.addUSers(false)
          this.getUserCheckbox(email).check()
          this.getManageDropdown().trigger('mouseover')
          this.getEditDetails().click({force: true})
          this.getFirstName().clear().type(firstName)
          this.getLastName().clear().type(lastName)
          this.getUpdateButton().click()
          this.verifyUserData(firstName+" "+lastName) 
      }

      selectUsersPerPage(value1,value2){
          this.getPaginationDropdown().select(value1)
          cy.waitFor(1000)
          this.getUserList().should('have.length',value1)
          this.getPaginationDropdown().select(value2)
          cy.waitFor(1000)
          this.getUserList().should('have.length',value2)
      }


}export default UserManagementPage; 
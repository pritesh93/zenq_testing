import CommonFunctions from '../../support/pageObjects/CommonFunctions'
const faker = require('faker');
const comFun= new CommonFunctions()
const randomEmail = faker.internet.email()
const randomFirstName = faker.name.findName()
const randomLastName = faker.name.findName()

class UserManagementPage{
    getUserLogoutMenu() {
        return cy.get('.sidebar__admin-icon')
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
        // label[for="add-card"]
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

    getUserCheckBox2(email){
        return cy.get('label[data-testid="'+email+'"]>input[type="checkbox"]')
    }

    getAddCardButton(){
        return cy.get('(//button[contains(text(),"ADD CARD")])[1]')
    }

    getUSerRow(email){
        return cy.get('[data-testid="'+email+'"]')
    }

    getAddNewCardWindowTitle(){
        return cy.get('.modal_topbar-title')
    }

    getManageDropdown(){
        return cy.get('#manage-user-dropdown-button')
    }

    getEnable2FA(){
        return cy.get('#enable-stepup-dropdown')
    }

    getSucessPopUp(){
        return cy.get('[class="alert-bar__message"]')
    }

    verifyLogin(){
        cy.title().should('eq','User Management')
    }

    logoutFromApplication(){
        // cy.reload()
        cy.wait(2000)
        this.getUserLogoutMenu().click()
        this.getSignoutLink().click({force:true})
        cy.wait(2000)
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

      addUSers(){
          this.getAddUser().click();
          cy.wait(2000)
          var firstName=comFun.userID_Alpha()
          var lastName=comFun.userID_Alpha()
          var mail='BioConnect'+`${Cypress.moment().format('YYYYMMDDhhmmss')}`+'@gmail.com'
          cy.log(firstName+" "+lastName)
          this.getFirstName().clear().type(firstName)
          this.getLastName().clear().type(lastName)
          this.getEmail().clear().type(mail)
          this.getUserName().clear().type(mail)
          this.getAddButton().click()
          cy.wait(2000)
          this.getCloseFeedback().click()
          cy.wait(2000)
          this.verifyUserData(firstName+" "+lastName)
          this.verifyUserData(mail)
          return mail
      }

      addUSerswithCard(){
        this.getAddUser().click();
        cy.wait(2000)
        var firstName=comFun.userID_Alpha()
        var lastName=comFun.userID_Alpha()
        var mail='BioConnect'+`${Cypress.moment().format('YYYYMMDDhhmmss')}`+'@gmail.com'
        cy.log(firstName+" "+lastName)
        this.getFirstName().clear().type(firstName)
        this.getLastName().clear().type(lastName)
        this.getEmail().clear().type(mail)
        this.getUserName().clear().type(mail)
        this.enterAddCardDetailsAndVerify(mail)
        return mail
    }
      verifyUserData(value){
        this.getUserTableData().contains('span',value).should('be.visible')
      }

      enterAddCardDetailsAndVerify(email){
        this.getAddCardCheckbox().click()
        this.getAddButton().click()
        this.getAddNewCardWindowTitle().contains('Add new card for').should('be.visible')
        this.getAddCardButton().click()
        cy.wait(2000)
        this.getUSerRow(email).contains('span','1 / 1').should('be.visible')
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

      updateDetails(firstName1,lastName1){
          var email=this.addUSers("false")
          this.getUserCheckbox(email).check()
          this.getManageDropdown().trigger('mouseover')
          this.getEditDetails().click({force: true})
          this.getFirstName().clear().type(firstName1)
          this.getLastName().clear().type(lastName1)
          this.getUpdateButton().click()
          this.verifyUserData(firstName1+" "+lastName1) 
      }

      selectUsersPerPage(value1,value2){
          cy.reload()
          this.getPaginationDropdown().select(value1)
          cy.waitFor(1000)
          this.getUserList().should('have.length',value1)
          this.getPaginationDropdown().select(value2)
          cy.waitFor(1000)
          this.getUserList().should('have.length',value2)
      }

      selectMultipleUsers(firstname,lastname,emails){
          for(let item of emails){
              var mail=item+`${Cypress.moment().format('YYYYMMDDhhmmss')}`+'@gmail.com'
            this.getAddUser().click();
            this.getFirstName().clear().type(firstname+comFun.userID_Alpha())
            this.getLastName().clear().type(lastname+comFun.userID_Alpha())
            this.getEmail().clear().type(mail)
            this.getUserName().clear().type(mail)
            this.getAddCardCheckbox().click()
            this.getAddButton().click()
            this.getAddNewCardWindowTitle().contains('Add new card for').should('be.visible')
            this.getAddCardButton().click()
            cy.wait(2000)
            this.getCloseFeedback().click()
            this.getUserCheckBox2(mail).check()
          }
      }

      ClickEnableOnCardsDropDownAndverify(){
          this.getManageDropdown().click()
          this.getEnable2FA().click({force:true})
          this.getSucessPopUp().contains('Enabled two-factor for').should('be.visible')
      }



}export default UserManagementPage; 
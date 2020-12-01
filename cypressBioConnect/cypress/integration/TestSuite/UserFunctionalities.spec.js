/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'
import ForgotPasswordPage from '../../support/pageObjects/ForgotPasswordPage.po'
import StatusPage from '../../support/pageObjects/StatusPage.po'

const loginPage = new LoginPage()
const userManagementPage = new UserManagementPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('User suite', function()
{
  before(() => 
  {
    cy.visit(Cypress.env('url'));
  })

  it('After logging in to the system, verify the user is taken directly to User Management',function()
  {
    loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
    loginPage.clickOnLogin()
    userManagementPage.verifyLogin()
    userManagementPage.verifyUserList(this.data.searchUser.name)
   })

   it('Create new user and verify the new user is created with all information correctly',function()
   {
      var email=userManagementPage.addUSers()
      userManagementPage.deleteUser(email)
    })

    it('Create new user, add card to user and verify the new user is created with card',function()
   {
      userManagementPage.addUSerswithCard()
    })

    it('Select multiple users,Enable crads and verify message',function()
   {
      userManagementPage.selectMultipleUsers(this.data.UserManagement.FirstName,this.data.UserManagement.LastName,this.data.UserManagement.Emails)
      userManagementPage.ClickEnableOnCardsDropDownAndverify()
    })

    it('Search user by name and verify the user list is filtered correctly',function()
   {
      userManagementPage.searchUserAndverify(this.data.searchUser.name)
    })

    it('Update user details and verify the details are correctly updated',function()
   {
      userManagementPage.updateDetails(this.data.updateDetails.firstname,this.data.updateDetails.lastname)
    })

    it('verify number of users per page',function()
    {
       userManagementPage.selectUsersPerPage(this.data.pagination.users1,this.data.pagination.users2)
     })

     afterEach(function()
     {
      cy.get("body").then($body => {
        if ($body.find("#exit-user-modal > .feather").length > 0) {   
        //evaluates as true if button exists at all
        cy.get('#exit-user-modal > .feather').then($header => {
              if ($header.is(':visible')){
                cy.get('#exit-user-modal > .feather').click({force:true})
              } else {
                assert.isOk('everything ok','everything ok')
              }
            });
        } else if($body.find(".modal_topbar-exit > .feather").length > 0){
          cy.get('.modal_topbar-exit > .feather').then($header => {
            if ($header.is(':visible')){
              cy.get('.modal_topbar-exit > .feather').click({force:true})
            } else {
              assert.isOk('everything ok','everything ok')
            }
          });
        }
    });
     })
})
after(function()
{
    userManagementPage.logoutFromApplication()
})
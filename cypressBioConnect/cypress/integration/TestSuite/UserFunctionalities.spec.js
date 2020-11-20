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
    userManagementPage.verifyUserList()
   })

   it('Create new user and verify the new user is created with all information correctly',function()
   {
      var email=userManagementPage.addUSers(this.data.addCard-false)
      userManagementPage.deleteUser(email)
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
    
})

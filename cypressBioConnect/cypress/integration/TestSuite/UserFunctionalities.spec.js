/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'
import ForgotPasswordPage from '../../support/pageObjects/ForgotPasswordPage.po'
import StatusPage from '../../support/pageObjects/StatusPage.po'

const loginPage = new LoginPage()
const userManagementPage = new UserManagementPage()
const forgotPasswordPage = new ForgotPasswordPage()
const statusPage = new StatusPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('User suite', function()
{
  beforeEach(() => 
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

  
    
})

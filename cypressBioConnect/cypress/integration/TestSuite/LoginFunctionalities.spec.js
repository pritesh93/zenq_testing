/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'

const loginPage = new LoginPage()
const userManagementPage = new UserManagementPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('TestApp suite', function()
{
  beforeEach(() => 
  {
    cy.visit(Cypress.env('url'));
  })

  it('Login into BioConnect application with valid credentials',function()
  {
    loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
    loginPage.clickOnLogin()
    userManagementPage.verifyLogin()
    userManagementPage.logoutFromApplication()
   })

   it('Login into BioConnect application with invalid subdomain',function()
   {
     loginPage.enterUsernameAndPassword(this.data.invalidsubDomain,this.data.username,this.data.password)
     loginPage.clickOnLogin()
     loginPage.verifyLoginError(this.data.errorMessage)
    })

    it('Login into BioConnect application with invalid password',function()
   {
     loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.invalidPassword)
     loginPage.clickOnLogin()
     loginPage.verifyLoginError(this.data.errorMessage)
    })

    it('Login into BioConnect application with invalid userName',function()
   {
     loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.invalidUsername,this.data.password)
     loginPage.clickOnLogin()
     loginPage.verifyLoginError(this.data.errorMessage)
    })

    
})

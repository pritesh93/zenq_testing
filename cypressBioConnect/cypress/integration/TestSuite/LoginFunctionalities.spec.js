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

describe('Login suite', function()
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

    it('Login into BioConnect application with empty fields',function()
    {
      loginPage.clickOnLogin()
      loginPage.verifyLoginError(this.data.errorMessageForEmptyFields)
     })

  //    it('Login into BioConnect application with 10E6 length of string into login fields',function()
  //  {
  //    loginPage.enterUsernameAndPassword(this.data.overflowCharactersString,this.data.overflowCharactersString,this.data.overflowCharactersString)
  //    loginPage.clickOnLogin()
  //    loginPage.verifyLoginError(this.data.errorMessage)
  //   })

    it('Login into BioConnect application with Naughty Strings into login fields',function()
    {
      loginPage.enterUsernameAndPassword(this.data.naughtyString,this.data.naughtyString,this.data.naughtyString)
      loginPage.clickOnLogin()
      loginPage.verifyLoginError(this.data.errorMessage)
     })

    // it('Press Forgot Password link and enter Forgot Password information',function(){
      // loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.invalidPassword)
      // forgotPasswordPage.enterForgotPasswordDetails(this.data.subDomain,this.data.username)
      // forgotPasswordPage.clickOnResetPassword()

    // })

  it('Press the "System Health" link and verify link redirects to page,status on the "System Health" page and click on signin to back to login page',function()
      {
        loginPage.clickonSystemHealthLink()
        statusPage.verifySystemHealthPage()
        statusPage.verfiyStatusMessage()
        statusPage.clickOnSignIn()
        loginPage.verifySignInPage()      
      })

  it('Press the "Logout" link and verify link redirects to login page',function()
      {
        loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
        loginPage.clickOnLogin()
        userManagementPage.verifyLogin()
        userManagementPage.logoutFromApplication()
        loginPage.verifySignInPage()      
      })

    
})

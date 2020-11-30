/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'
import MenuOptionsPage from '../../support/pageObjects/MenuOptionsPage.po'
import AuthenticationPage from '../../support/pageObjects/AuthenticationPage.po'

const loginPage = new LoginPage()
const authenticationPage = new AuthenticationPage()
const menuOptionsPage = new MenuOptionsPage()
const userManagementPage = new UserManagementPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('Authentication suite', function()
{
  before(function()
  {
    cy.visit(Cypress.env('url'))
    loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
    loginPage.clickOnLogin()
    menuOptionsPage.clickonACMIcon()
  })

  it('Navigate to Authentication Management page and verify Page details',function()
  {
    authenticationPage.verifyAuthenticationManagementPage()
  })

   it('Navigate to ACM tab and verify the details',function()
  {
    authenticationPage.clickOnACMAndVerify()
  })

  it('verify contact us mailto',function()
  {
    authenticationPage.clickOnContactUSAndVerify()
  })

  it('verify BC authenticator is activated or not',function()
  {
    authenticationPage.clickOnAuthenticatorsTab()
    authenticationPage.activateBC()
    authenticationPage.verifyActivatedBC()
  })

  it('verify SMS authenticator is activated or not',function()
  {
    authenticationPage.activateSMS()
    authenticationPage.verifyActivatedSMS()
  })

  it('verify SMS authenticator is deactivated or not',function()
  {
    authenticationPage.deactivateSMS()
    authenticationPage.verifyDeactivatedSMS()
  })
    
})
after(function()
{
    userManagementPage.logoutFromApplication()
})
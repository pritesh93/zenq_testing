/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'
import MenuOptionsPage from '../../support/pageObjects/MenuOptionsPage.po'
import AlertPage from '../../support/pageObjects/AlertPage.po'

const loginPage = new LoginPage()
const alertPage = new AlertPage()
const menuOptionsPage = new MenuOptionsPage()
const userManagementPage = new UserManagementPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('Alert suite', function()
{
  before(function()
  {
    cy.visit(Cypress.env('url'))
    loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
    loginPage.clickOnLogin()
    menuOptionsPage.clickOnAlertIcon()
  })

  it('Click on the bell icon to access alerts and verify',function()
  {
    alertPage.verifyAlertPage()
    alertPage.verifyAlerts()
  })

   it('Click on the "x" icon to close alerts and verify',function()
  {
    alertPage.clickOnCloseAlert()
    alertPage.verifyClosedAlert()
  })
      
})
after(function()
{
    userManagementPage.logoutFromApplication()
})
/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import MenuOptionsPage from '../../support/pageObjects/MenuOptionsPage.po'
import GroupManagementPage from '../../support/pageObjects/GroupManagementPage.po'

const loginPage = new LoginPage()
const menuOptionsPage = new MenuOptionsPage()
const groupManagementPage = new GroupManagementPage();


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

    it('Navigate and verify Group Management page',function()
    {
        loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
        loginPage.clickOnLogin()
        menuOptionsPage.clickonGroupIcon()
        groupManagementPage.verifyGroupPage()

    })

    it('Create Group and verify details',function()
    {
        groupManagementPage.addGroup(this.data.groupManagement.groupName,this.data.groupManagement.description,this.data.groupManagement.emails,this.data.groupManagement.users,this.data.groupManagement.devices)
    })

    it('Update Group and verify details',function()
    {
        groupManagementPage.updateGroup(this.data.updateGroupDetails.groupName,this.data.updateGroupDetails.users,this.data.updateGroupDetails.devices)
    })

    it('delete Group and verify group get deleted or not',function()
    {
        groupManagementPage.deleteGroup(this.data.updateGroupDetails.groupName)
    })

    it('Select no.of users for page and verify',function()
    {
        groupManagementPage.paginationInEdtUsers(this.data.pagination.users1,this.data.pagination.users2)
    })

    it('Select no.of devices for page and verify',function()
    {
        groupManagementPage.paginationInEditDevices(this.data.pagination.users1,this.data.pagination.users2)
    })

})
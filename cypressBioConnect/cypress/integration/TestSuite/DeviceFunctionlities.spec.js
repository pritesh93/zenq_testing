/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage.po'
import UserManagementPage from '../../support/pageObjects/UserManagementPage.po'
import MenuOptionsPage from '../../support/pageObjects/MenuOptionsPage.po'
import DeviceManagementPage from '../../support/pageObjects/DeviceManagementPage.po'

const loginPage = new LoginPage()
const deviceManagementPage = new DeviceManagementPage()
const menuOptionsPage = new MenuOptionsPage()
const userManagementPage = new UserManagementPage()

before(function()
{
    cy.fixture('testdata').then(function(data)
    {
        this.data=data
    })
})

describe('Device suite', function()
{
  before(function()
  {
    cy.visit(Cypress.env('url'))
    loginPage.enterUsernameAndPassword(this.data.subDomain,this.data.username,this.data.password)
    loginPage.clickOnLogin()
    menuOptionsPage.clickonDeviceIcon()
    deviceManagementPage.closeTooltip()
  })

  it('Navigate to device page and verify devices',function()
  {
    deviceManagementPage.verifyDeviceManagementPage()
   })

   it('Add new device and verify',function()
  {
    deviceManagementPage.addDevice(this.data.deviceManagement.macAddress,this.data.deviceManagement.door0,this.data.deviceManagement.door1)
    deviceManagementPage.verifyAddedDevices(this.data.deviceManagement.doors)
   })

   it('Add already added device and verify',function()
  {
    deviceManagementPage.addDevice(this.data.deviceManagement.macAddress,this.data.deviceManagement.door0,this.data.deviceManagement.door1)
    deviceManagementPage.verifyErrorMessage()
   })

  it('Press toggle button and verify toggle status',function()
  {
    deviceManagementPage.searchDevices(this.data.deviceManagement.deviceName)
    deviceManagementPage.clickonToggle(this.data.deviceManagement.deviceName)
    deviceManagementPage.verifyToggleStatus(this.data.deviceManagement.deviceName,this.data.deviceManagement.toggleStatusenable)
    deviceManagementPage.clickonToggle(this.data.deviceManagement.deviceName)
    deviceManagementPage.verifyToggleStatus(this.data.deviceManagement.deviceName,this.data.deviceManagement.toggleStatusdisable)
    deviceManagementPage.clickOnClearSearch()
   })

   it('Rename device and verify',function()
  {
    deviceManagementPage.searchDevices(this.data.deviceManagement.deviceName)
    deviceManagementPage.renameDevice(this.data.deviceManagement.deviceName,this.data.deviceManagement.newDeviceName,this.data.deviceManagement.btrue)
   })

   it('Cancel rename device and verify',function()
  {
    deviceManagementPage.searchDevices(this.data.deviceManagement.newDeviceName)
    deviceManagementPage.renameDevice(this.data.deviceManagement.newDeviceName,this.data.deviceManagement.deviceName,this.data.deviceManagement.bfalse)
   })

   it('Rename device with naughty string and verify',function()
  {
    deviceManagementPage.searchDevices(this.data.deviceManagement.newDeviceName)
    deviceManagementPage.renameDevice(this.data.deviceManagement.newDeviceName,this.data.deviceManagement.naughtyInput,this.data.deviceManagement.btrue)
   })
    
})
after(function()
{
    deviceManagementPage.deleteDevice(this.data.deviceManagement.naughtyInput)
    userManagementPage.logoutFromApplication()
})
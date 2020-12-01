class MenuOptionsPage
{
    getGroupManagementText(){
       return cy.get('.page-topbar__title')
    }

    getGroupTable(){
        return cy.get('.group-management-table')
    }

    getGroupTableHeader(){
        return cy.get('.group-management-table__header')
    }

    getGroupTableRows(){
        return cy.get('div[class="group-management-table__item"]')
    }

    getAddGroupButton(){
        return cy.get('#add-group-button')
    }

    getAddGroupName(){
        return cy.get('#name-group-modal')
    }

    getAddDescription(){
        return cy.get('#description-group-modal')
    }

    getEmail(){
        return cy.get('input#emails-group-modal')
    }

    getAddGroupContinue(){
        return cy.get(':nth-child(2) > .modal_footer > #continue-group-modal')
    }

    getSearch(){
        return cy.get('[style=""] > .table-list-container > .searchbar-container > .searchbar')
    }

    getSearchIcon(){
        return cy.get('[style=""] > .table-list-container > .searchbar-container > .searchbar-icon > .feather')
    }

    getUser(){
        return cy.get(':nth-child(3) > .table-list-container > .table-list > #item-0')
    }

    getDevice(){
        return cy.get(':nth-child(4) > .table-list-container > .table-list > #item-0')
    }

    getClearSearch(){
        return cy.get('[style=""]#clear-search-')
    }

    getAddUserContinue(){
        return cy.get('[style=""] > .modal_footer > #continue-group-modal')
    }

    getAddDevicesContinue(){
        return cy.get(':nth-child(4) > .modal_footer > :nth-child(2)')
    }

    getGroupDetails(){
        return cy.get('div[style=""]>.group-list-container')
    }

    getAddedUsers()
    {
        return cy.get('div[class="column--two group-list-container"][style=""]:nth-child(1)')
    }

    getAddedDevices()
    {
        return cy.get('div[class="column--two group-list-container"][style=""]:nth-child(3)')
    }

    getFinalAdddGroup(){
        return cy.get(':nth-child(5) > .modal_footer > #continue-group-modal')
    }

    getEditDevicesText(){
        return cy.contains('Add Group: Edit Devices')
    }

    getEditDevicesText(){
        return cy.contains('Add Group: Edit Devices')
    }

    getEditUsersText(){
        return cy.contains('Add Group: Edit Users')
    }

    getAddGroupDetailsText(){
        return cy.contains('Add Group: Details')
    }

    getAddedGroupDetails(){
        return cy.get('#group-item-0')
    }

    getGroupNameForEdit(name){
        return cy.contains(name)
    }

    getDeleteIcon(){
        return cy.get('#group-item-0 > :nth-child(6) > #delete-group > span > .feather')
    }

    getEditUserPagination(){
        return cy.get('.table-list-container > .pagination > .pagination-perpage > #perpage-select-pagination')
    }

    getEditUserTable(){
        return cy.get('div[class="table-list__item"]')
    }

    getEditDevicesTable(){
        return cy.get('div[style=""]>div>table>div[class="table-list__item"]')
    }

    getEditDeviesTable(){
        return cy.get('[style=""] > .table-list-container > .pagination > .pagination-perpage > #perpage-select-pagination')
    }

    getCloseAddGroup(){
        return cy.get('#exit-group-modal')
    }

    getGroupPagination(){
        return cy.get('#perpage-select-pagination')        
    }

    addGroup(groupName,description,emails,users,devices){
        cy.waitFor(5000)
        this.getAddGroupButton().click()
        this.getAddGroupDetailsText().should('be.visible')
        this.getAddGroupName().clear().type(groupName)
        this.getAddDescription().clear().type(description)
        this.getEmail().clear().type(emails)
        this.getAddGroupContinue().click()
        this.getEditUsersText().should('be.visible')
        for (let item of users) {
            this.selectUsers(item)
        }
        cy.waitFor(2000)
        this.getAddUserContinue().click()
        this.getEditDevicesText().should('be.visible')
        for (let item of devices) {
             this.selectDevices(item)
        }
        this.getAddDevicesContinue().click()
        cy.waitFor(2000)
        this.getGroupDetails().contains(groupName).should('be.visible')
        this.getGroupDetails().contains(description).should('be.visible')
        this.getGroupDetails().contains(description).should('be.visible')
        for (let item of users) {
            this.getAddedUsers().contains(item).should('be.visible')
        }

        for (let item of devices) {
            this.getAddedDevices().contains(item).should('be.visible')
            }
        this.getFinalAdddGroup().click()
        cy.wait(2000)
    }

    verifyAddedGroup(groupname,description,users,devices){
        this.getAddedGroupDetails().should('contain.text',groupname)
        this.getAddedGroupDetails().should('contain.text',description)
        this.getAddedGroupDetails().should('contain.text',users)
        this.getAddedGroupDetails().should('contain.text',devices)
    }

    verifyGroupPage(){
        this.getGroupManagementText().should('have.text','Group Management')
        this.getGroupTable().should('be.visible')
        this.getGroupTableHeader().contains('span','Name').should('be.visible')
        this.getGroupTableHeader().contains('span','Description').should('be.visible')
        this.getGroupTableHeader().contains('span','Users').should('be.visible')
        this.getGroupTableHeader().contains('span','Devices').should('be.visible')
    }

    updateGroup(groupName,user,device,usercount,devicescount){
        this.getGroupNameForEdit(groupName).click()
        this.getAddGroupContinue().click()
        this.selectUsers(user)
        this.getAddUserContinue().click()
        this.selectDevices(device)
        this.getAddDevicesContinue().click()
        this.getFinalAdddGroup().click()
        cy.waitFor(1000)
        this.getAddedGroupDetails().should('contain.text',usercount)
        this.getAddedGroupDetails().should('contain.text',devicescount)
    }

    deleteGroup(groupname){
        this.getDeleteIcon().click()
        cy.waitFor(2000)
        this.getAddedGroupDetails().should('not.have.text',groupname)
    }

    paginationInEdtUsers(value1,value2){
        this.getAddGroupButton().click()
        this.getAddGroupName().clear().type('Test')
        this.getAddDescription().clear().type('Test Description')
        this.getAddGroupContinue().click()
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value1)
        this.getEditUserPagination().select(value2)
        this.getEditUserTable().should('have.length',value2)
        this.getCloseAddGroup().click()
    }

    paginationInEditDevices(value1,value2){
        this.getAddGroupButton().click()
        this.getAddGroupName().clear().type('Test')
        this.getAddDescription().clear().type('Test Description')
        this.getAddGroupContinue().click()
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value1)
        this.getEditUserPagination().select(value2)
        this.getEditUserTable().should('have.length',value2)
        this.getCloseAddGroup().click()
    }

    selectUsers(value){
        cy.wait(1000)
        this.getSearch().clear().type(value)
        this.getSearchIcon().click()
        cy.wait(2000)
        this.getUser().contains(value).click()
        cy.wait(2000)
        // this.getClearSearch().click()
    }

    selectDevices(value){
        this.getSearch().clear().type(value)
        this.getSearchIcon().click()
        cy.waitFor(5000)
        this.getDevice().contains(value).click() 
        cy.waitFor(2000)
        // this.getClearSearch().click()
    }

    closeAddGroupWindow(){
        this.getCloseAddGroup().then($button =>{
            if($button.is(':visible')){
                this.getCloseAddGroup().click()
            }
        })
    }

    verifyGroupPagePagination(value1,value2){
        this.getGroupPagination().select(value1)
        this.getGroupTableRows().should('have.length',value1)
        this.getGroupPagination().select(value2)
        this.getGroupTableRows().should('have.length',value2)
    }


    

}export default MenuOptionsPage
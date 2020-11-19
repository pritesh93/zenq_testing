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
        return cy.get('#item-0')
    }

    getClearSearch(){
        return cy.get('[style=""]#clear-search-')
    }

    getAddUserContinue(){
        return cy.get('[style=""] > .modal_footer > #continue-group-modal')
    }

    getAddDevicesContinue(){
        return cy.get(':nth-child(5) > .modal_footer > #continue-group-modal')
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

    addGroup(groupName,description,emails,users,devices){
        this.getAddGroupButton().click()
        this.getAddGroupDetailsText().should('be.visible')
        this.getAddGroupName().clear().type(groupName)
        this.getAddDescription().clear().type(description)
        this.getEmail().clear().type(emails)
        this.getAddGroupContinue().click()
        this.getEditUsersText().should('be.visible')
        for (let item of users) {
            this.getSearch().clear().type(item)
            this.getSearchIcon().click()
            this.getUser().click()
            this.getClearSearch().click()
        }
//         users.forEach(myFunction);
// function myFunction(item) {
//     MenuOptionsPage.getSearch().clear().type(item)
//     MenuOptionsPage.getSearchIcon().click()
//     MenuOptionsPage.getUser().click()
//     MenuOptionsPage.getClearSearch().click()
// }
        this.getAddUserContinue().click()
        this.getEditDevicesText().should('be.visible')
    //     devices.each(($el,index,$list)=>{
    //         this.getSearch().clear().type($el)
    //         this.getSearchIcon().click()
    //         this.getUser().click()
    //         this.getClearSearch().click()
    //     })

    //     this.getGroupDetails().should('have.text',groupName)
    //     this.getGroupDetails().should('have.text',description)
    //     this.getGroupDetails().should('have.text',emails)
    //     this.users.each(($el,index,$list)=>{
    //     this.getAddedUsers().should('have.text',$el)
    //     })

    //     this.users.each(($el,index,$list)=>{
    //         this.getAddedDevices().should('have.text',$el)
    //         })
    //     this.getFinalAdddGroup().click()
    // }

    // verifyAddedGroup(groupname,description,users,devices){
    //     this.getAddedGroupDetails().should('have.text',groupname)
    //     this.getAddedGroupDetails().should('have.text',description)
    //     this.getAddedGroupDetails().should('have.text',users)
    //     this.getAddedGroupDetails().should('have.text',devices)
    }

    verifyGroupPage(){
        this.getGroupManagementText().should('have.text','Group Management')
        this.getGroupTable().should('be.visible')
        this.getGroupTableHeader().contains('span','Name').should('be.visible')
        this.getGroupTableHeader().contains('span','Description').should('be.visible')
        this.getGroupTableHeader().contains('span','Users').should('be.visible')
        this.getGroupTableHeader().contains('span','Devices').should('be.visible')
    }

    updateGroup(groupName,user,device){
        this.getGroupNameForEdit(groupName).click()
        this.getAddGroupContinue().click()
        selectUserOrDevices(user)
        this.getAddUserContinue().click()
        selectUserOrDevices(device)
        this.getAddDevicesContinue().click()
        this.getFinalAdddGroup().click()
        cy.waitFor(1000)
        this.getAddedGroupDetails().should('have.text',user)
        this.getAddedGroupDetails().should('have.text',device)
    }

    deleteGroup(groupname){
        this.getDeleteIcon().click()
        cy.waitFor(2000)
        this.getAddedGroupDetails().should('not.have.text',groupname)
    }

    paginationInEdtUsers(value1,value2){
        this.getAddGroupButton().click()
        this.getAddGroupName().clear().type('Test')
        this.getAddGroupContinue().click()
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value1)
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value2)
        this.getCloseAddGroup().click()
    }

    paginationInEditDevices(value1,value2){
        this.getAddGroupButton().click()
        this.getAddGroupName().clear().type('Test')
        this.getAddGroupContinue().click()
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value1)
        this.getEditUserPagination().select(value1)
        this.getEditUserTable().should('have.length',value2)
        this.getCloseAddGroup().click()
    }


    selectUserOrDevices(value){
        this.getSearch().clear().type(value)
        this.getSearchIcon().click()
        cy.waitFor(1000)
        this.getUser().click()
        this.getClearSearch().click() 
    }

}export default MenuOptionsPage
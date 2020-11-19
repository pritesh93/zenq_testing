class MenuOptionsPage
{
    getGroupIcon(){
        return cy.get('#group-management-nav')
    }

    clickonGroupIcon(){
        this.getGroupIcon().click()
    }
}export default MenuOptionsPage
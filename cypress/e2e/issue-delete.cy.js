describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

    it('Test 1: Create a new test case for deleting issue.', () => {

        //Confirming that correct screen is opened, clicking on trash icon
        cy.get('[placeholder="Short summary"]').contains('This is an issue of type: Task.');
        cy.get('[data-testid="icon:trash"]').click();

        //Working on dialog 
        cy.get('[data-testid="modal:confirm"]').should("be.visible");
        cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should("not.exist");

        //Reload the page
        cy.reload();

        //Assert than only one list with name Backlog is visible and do steps inside of it
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        //Assert that this list contains 3 issues and element specified text doesn't exist anymore
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '3')
          .first()
          .find('p')
          .contains('This is an issue of type: Task.').should('not.exist');

    });
    });

    it.only('Test 2: Create new test case for starting the deleting issue process, but cancelling this action', () => {

      //Confirming that correct screen is opened, clicking on trash icon
      cy.get('[placeholder="Short summary"]').contains('This is an issue of type: Task.');
      cy.get('[data-testid="icon:trash"]').click();

      //Working on dialog 
      cy.get('[data-testid="modal:confirm"]').should("be.visible");
      cy.get('[data-testid="modal:confirm"]').contains('Cancel').click();
      cy.get('[data-testid="modal:confirm"]').should("not.exist");


      cy.get('[placeholder="Short summary"]').contains('This is an issue of type: Task.');
      //cy.get('[data-testid="icon:trash"]').next().contains('[data-testid="icon:close"]')

      //Reload the page
      cy.reload();

      //Assert than only one list with name Backlog is visible and do steps inside of it
      cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 4 issues and element specified text doesn't exist anymore
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '4')
        .first()
        .find('p')
        .contains('This is an issue of type: Task.').should('be.visible');

  });
  });
});

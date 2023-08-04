import { LoremModule, faker } from '@faker-js/faker';
describe('Issue time tracking, adding -> editing -> removing estimations', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
          cy.visit(url + '/board?modal-issue-create=true');
        });
    });

    const getIssueCreateModal = () => cy.get('[data-testid="modal:issue-create"]');
    const getBoardListBacklog = () => cy.get('[data-testid="board-list:backlog');
    const getIssueModalDetail = () => cy.get('[data-testid="modal:issue-details"]');
    const getModalTracking = () => cy.get('[data-testid="modal:tracking"]')
    const addDescription = faker.lorem.paragraph();
    const randomTitle = faker.word.words(3);

  it('Should create an issue, than add -> edit -> remove estimations', () => {
    //System finds modal for creating issue and does next steps inside of it
    getIssueCreateModal().within(() => {  
      cy.get('.ql-editor').type(addDescription);
      cy.get('input[name="title"]').type(randomTitle);
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
      });

    getIssueCreateModal().should('not.exist');
    cy.reload();

    //Check the ticket on board and open it
    getBoardListBacklog().should('be.visible').within(() => {
      cy.contains(randomTitle)
            .click();
  });
    //Check "No time..." string -> Fill in estimation value -> Close screen
    getIssueModalDetail().within(() => {

      cy.contains('No time logged')
        .should('be.visible');

      cy.get('input[placeholder="Number"]')
        .click()
        .type('10');

      cy.contains('Add a comment...').click();

      cy.get('[data-testid="icon:close"]')
        .first()
        .click();
});

    getIssueModalDetail().should('not.exist');
    cy.reload();

    //Check the ticket on board and open it
    getBoardListBacklog().should('be.visible').within(() => {
      cy.contains(randomTitle)
        .click();
});
cy.get('[data-testid="modal:issue-details"]').should('be.visible');
cy.get('input[placeholder="Number"]').should('have.value', '10').and('be.visible');
    });
});


      /*cy.get('[data-testid="icon:stopwatch"]')
          .next()
          .click();
  });

      /*getModalTracking().within(() => {
        cy.get('input[placeholder="Number"]')
          .first()
          .click()
          .type('3');

        cy.contains('button', 'Done')
          .click();
  }); */
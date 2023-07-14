/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    
    // steps to delete issue
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    cy.reload();

    //Check that ticket isn't on board anymore 
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it('Should cancel deletion process successfully', () => {
    //add steps to start deletion proces but cancel it
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();

    //Closing ticket's screen
    IssueModal.closeDetailModal();

    //Check that ticket is still on board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});

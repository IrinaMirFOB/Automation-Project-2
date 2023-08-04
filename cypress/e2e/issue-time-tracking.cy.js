import { LoremModule, faker } from '@faker-js/faker';
describe('Time Tracking Test Cases', () => {
    
    const getIssueCreateModal = () => cy.get('[data-testid="modal:issue-create"]');
    const getBoardListBacklog = () => cy.get('[data-testid="board-list:backlog');
    const getIssueModalDetail = () => cy.get('[data-testid="modal:issue-details"]');
    const getModalTracking = () => cy.get('[data-testid="modal:tracking"]');
    const addDescription = faker.lorem.paragraph();
    const randomTitle = faker.word.words(3);

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
          cy.visit(url + '/board?modal-issue-create=true')

        //Filling in info in ticket and than create it
        cy.get('.ql-editor').type(addDescription);
        cy.get('input[name="title"]').type(randomTitle);
        cy.get('[data-testid="select:userIds"]').click();
        cy.get('[data-testid="select-option:Lord Gaben"]').click();
        cy.get('button[type="submit"]').click();
        //Check ticket in backlog and open it
        getIssueCreateModal().should('not.exist');
        cy.reload();
        getBoardListBacklog().contains(randomTitle).click();

        });
    });

    it('Time estimation functionality', () => {

        getIssueModalDetail().should('be.visible').within(() => {
            //Add estimation value
            cy.contains('No time logged').should('be.visible');
            cy.get('input[placeholder="Number"]').click().type('10');
            cy.contains('10h estimated', { timeout: 10000 }).should('be.visible');
            cy.get('[data-testid="icon:close"]').first().click();
        });

        //Ticket is on board, open
        getIssueModalDetail().should('not.exist');
            cy.reload();
        getBoardListBacklog().contains(randomTitle).click();
    
        getIssueModalDetail().should('be.visible').within(() => {
            //Update estimation value
            cy.get('input[placeholder="Number"]').should('have.value', '10').click().clear().type('20');
            cy.contains('20h estimated', { timeout: 10000 }).should('be.visible');
            cy.get('[data-testid="icon:close"]').first().click();
        });

        //Ticket is on board, open
        getIssueModalDetail().should('not.exist');
            cy.reload();
        getBoardListBacklog().contains(randomTitle).click();

        getIssueModalDetail().should('be.visible').within(() => {
            //Remove estimation value
            cy.get('input[placeholder="Number"]').should('have.value', '20').click().clear();
            cy.get('[data-testid="icon:stopwatch"]', { timeout: 10000 }).next().should('not.contain', '20h estimated');
            cy.get('[data-testid="icon:close"]').first().click();
        });

        //Ticket is on board, open
        getIssueModalDetail().should('not.exist');
            cy.reload();
        getBoardListBacklog().contains(randomTitle).click();

        getIssueModalDetail().should('be.visible').within(() => {
            //Confirm estimation value is empty
            cy.get('input[placeholder="Number"]').should('have.value', '');
        });
    });

    it('Time logging functionality', () => {

        getIssueModalDetail().should('be.visible').within(() => {
            //Check initial timing status
            cy.contains('No time logged').should('be.visible');
            cy.get('[data-testid="icon:stopwatch"]').next().click();
        });

        getModalTracking().should('be.visible').within(() =>{
            //Fill in new timing
            cy.get('input[placeholder="Number"]').eq(0).click().type('2');
            cy.get('input[placeholder="Number"]').eq(1).click().type('5');
            cy.contains('button', 'Done').click();
        });

        getIssueModalDetail().should('be.visible').within(() => {
            //Check timing status after
            cy.contains('2h logged').should('be.visible');
            cy.get('[data-testid="icon:stopwatch"]').next().should('not.contain', 'No time logged');
            cy.contains('5h remaining').should('be.visible');
        });

            cy.get('[data-testid="icon:stopwatch"]').next().click();

        getModalTracking().should('be.visible').within(() =>{
            //Remove timing
            cy.get('input[placeholder="Number"]').eq(0).click().clear();
            cy.get('input[placeholder="Number"]').eq(1).click().clear();
            cy.contains('button', 'Done').click();  
        }); 
        
        getIssueModalDetail().should('be.visible').within(() => {
            //Check timing status after
            cy.get('[data-testid="icon:stopwatch"]').next().should('not.contain', '2h logged');
            cy.get('[data-testid="icon:stopwatch"]').next().should('not.contain', '5h remaining');
        });
    });
});


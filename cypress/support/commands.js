Cypress.Commands.add('login',(username,password) => {
    cy.visit('/portal/xlogin');
    cy.get('#eid').type(username);
    cy.get('#pw').type(password);
    cy.get('#submit').click();
    cy.url().should('not.include','/xlogin');
    cy.get('h4').should('contain.text',username);
});
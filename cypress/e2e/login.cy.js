Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

let locale = 'en';

describe('Test 1: SAKAI Home Page', function() {
  it('visit home page', function(){
    cy.fixture('messages').then((msgs) => {
        const msg = msgs[locale];

        cy.visit('/portal')
        cy.get('a[title="Gateway"]').should('contain',msg.gateway)
            
        // Check MOTD iframe
        cy.get('iframe#Mainxgatewayx110', { timeout: 10000 }).should('be.visible');
        cy.get('iframe#Mainxgatewayx110').then((ifr) => {
            const ifb = ifr.contents().find('body');
            cy.wrap(ifb).find('p').should('contain.text',msg.no_messages);
        });

        // Check Welcome iframe
        cy.get('iframe#id_gateway_120').scrollIntoView();
        cy.get('iframe#id_gateway_120', { timeout: 10000 }).should('be.visible');
        cy.get('iframe#id_gateway_120').then(($iframe) => {
            const ifbody = $iframe.contents().find('body');
            // Warning !! In Spanish is H3 this title element
            cy.wrap(ifbody).find('h1').should('contain.text',msg.welcome);
        });
    });
  })
})

describe('Test 2: SAKAI Login', function() {
    it('login to sakai', function(){
      cy.fixture('users').then( (users) => {
        // Selecciona aleatoriamente entre el user 0 y 1
        const usr = users[Math.floor(Math.random()*2)];
        cy.fixture('messages').then( (msgs) => {
            const msg = msgs[locale];

            cy.login(usr.username,usr.password);

            cy.visit('/portal/site/~'+usr.username);
    
            cy.get('span.Mrphs-toolTitleNav__text').should('contain.text',msg[usr.isAdmin?'admin_home':'regular_home']);
    
        })
      })
    })
})
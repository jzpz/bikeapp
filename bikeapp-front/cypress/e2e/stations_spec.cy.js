describe('Test station', () => {
    it('search and select a station', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="change-station"]').click();
        cy.get('[data-cy="station-search"]').type('rautatie');
        cy.get('span').contains('Rautatientori / itä').parent().click();
        cy.get('[data-cy="current-journey"]').children('span').should('to.contain', 'Rautatientori / itä')
    })
});
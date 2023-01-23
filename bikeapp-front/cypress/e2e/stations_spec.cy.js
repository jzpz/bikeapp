describe('Test station', () => {
    it('search and select a station', () => {
        let stationName = "Rautatientori / itä";
        
        cy.intercept({pathname: '/stations'}).as('getStations');

        cy.visit('http://localhost:3000');
        cy.wait('@getStations').its('response.statusCode').should('eq', 200);

        cy.get('[data-cy="change-station"]').click();
        cy.get('[data-cy="station-search"]').type(stationName);
        cy.get('[data-cy="station-list-item"] span').contains(stationName).parent().click();
        
        cy.get('[data-cy="current-journey-departure-station"]').should('to.contain', stationName);
    })
});
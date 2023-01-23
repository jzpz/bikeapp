describe('Test select station on map', () => {
    it('hovers and selects station marker on the map', () => {
        cy.intercept({pathname: '/stationinfo'}).as('getStationInfo');

        cy.visit('http://localhost:3000');
        
        for(let i = 0; i < 4; i++) {
            cy.get('.pigeon-zoom-out').click(); // zoom out map
        }

        cy.get('[data-cy="map-container"]')
            // marker image
            .find('.pigeon-click-block > svg > g').last().then($marker => {
                cy.wrap($marker).trigger('mouseover', {force: true})
                // marker infobox
                cy.get('[data-cy="map-container"]').find('.pigeon-click-block > div').should('be.visible');
                cy.wrap($marker).click({force: true});
            });
        cy.wait('@getStationInfo').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="current-journey-data"] h4').should('not.contain', 'Click');
        cy.get('[data-cy="map-container"]').find('.pigeon-click-block').should('have.class', 'active');
    })
});
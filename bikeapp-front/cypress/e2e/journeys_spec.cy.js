describe('Test select journey', () => {
    it('selects and views journey on map', () => {
        cy.intercept('http://localhost:8080/journeys').as('getJourneys');

        cy.visit('http://localhost:3000');

        cy.get('[data-cy="view-journeys"]').click();
        cy.wait('@getJourneys').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="journey-list"]').children().not('[data-cy="empty-list-item"]')
            .last().click();
        cy.get('.btn-close').click(); // Uses bootstrap class because the element is made by bootstrap
    })
});

describe('Test page switch', () => {
    it('changes page on journey list', () => {
        cy.intercept({pathname: '/journeys'}).as('getJourneys');
        cy.intercept({
            pathname: '/journeys',
            query: {
                page: '1',
            },
        }).as('getJourneysPage1');

        cy.visit('http://localhost:3000');

        // Get first page
        cy.get('[data-cy="view-journeys"]').click();
        cy.wait('@getJourneys').its('response.statusCode').should('eq', 200);
        // Get second page
        cy.get('[data-cy=pagination-next]').click();
        cy.wait('@getJourneysPage1').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=pagination-current]').contains('1');
    })
});

describe('Test departure and return listing', () => {
    it('selects station and checks departures and returns for that station', () => {
        let stationName = "Olympiastadion";

        cy.intercept({pathname: '/journeys'}).as('getJourneys');
        cy.visit('http://localhost:3000');

        cy.get('[data-cy="change-station"]').click();
        cy.get('[data-cy="station-search"]').type(stationName);
        cy.get('[data-cy="station-list-item"] span').contains(stationName).parent().click();
        
        // Check departures
        cy.get('[data-cy="view-journeys"]').click();
        cy.wait('@getJourneys').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="journey-list-item"] div').children('[data-cy=departure-station]').should('to.contain', stationName);
        // Check returns
        cy.get('button').contains('Returns').click();
        cy.wait('@getJourneys').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="journey-list-item"] div').children('[data-cy=return-station]').should('to.contain', stationName);
    })
});

describe('Test order change', () => {
    it('changes journey order column and direction', () => {
        cy.intercept({pathname: '/journeys'}).as('getJourneys');
        cy.intercept({
            pathname: '/journeys',
            query: {
                orderBy: 'distanceCoveredInMeters',
            },
        }).as('getJourneysByDistance');
        cy.intercept({
            pathname: '/journeys',
            query: {
                descending: 'true',
            },
        }).as('getJourneysDescending');

        cy.visit('http://localhost:3000');

        cy.get('[data-cy="view-journeys"]').click();
        cy.wait('@getJourneys').its('response.statusCode').should('eq', 200);

        // Set order column to distance
        cy.get('[data-cy="order-column-button"] button').click();
        cy.get('[data-cy="order-column-button"] div').contains('Distance').click();
        cy.wait('@getJourneysByDistance').its('response.statusCode').should('eq', 200);

        // Set order direction to descending
        cy.get('[data-cy="order-direction-button"]').click();
        cy.wait('@getJourneysDescending').its('response.statusCode').should('eq', 200);
    })
});
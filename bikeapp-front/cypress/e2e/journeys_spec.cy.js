describe('Test select journey', () => {
    it('selects and views journey on map', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="view-journeys"]').click();
        cy.get('[data-cy="journey-list"]').children().not('[data-cy="empty-list-item"]')
            .last().click();
        cy.get('.btn-close').click(); // Uses bootstrap class because the element is made by bootstrap
    })
});

describe('Test page switch', () => {
    it('changes page on journey list', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="view-journeys"]').click();
        cy.get('[data-cy=journey-list-pagination]').children().last().click();
    })
});

describe('Test return listing', () => {
    it('changes journey list to show returns instead of departures', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="view-journeys"]').click();
        cy.get('button').contains('Returns').click();
    })
});
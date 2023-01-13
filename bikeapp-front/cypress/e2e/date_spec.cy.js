describe('Test select date', () => {
    it('selects date that contains journeys', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="datepicker-datefrom"]').find('input').click();
        cy.get('.react-datepicker__current-month').invoke('text').then(currentMonthString =>
            // Dataset is set in around summer 2021, so we select a date accordingly
            clickPrevMonthUntil(currentMonthString.trim(), 'June 2021')
        )
        cy.get('[data-cy="date-selector"]').find('div').contains(9).click();
        cy.get('[data-cy="datepicker-datefrom"]').find('input').should('have.value', '2021-06-09');
        cy.get('[data-cy="datepicker-dateto"]').find('input').should('have.value', '2021-06-09');
        cy.get('[data-cy="datepicker-dateto"]').find('input').click();
        cy.get('[aria-label="Next Month"]').click();
        cy.get('[data-cy="date-selector"]').find('div').contains(10).click();
        cy.get('[data-cy="datepicker-dateto"]').find('input').should('have.value', '2021-07-10');
    })
});

function clickPrevMonthUntil(monthString, targetMonthString) {
    if(monthString !== targetMonthString) {
        cy.get('[aria-label="Previous Month"]').click();
        cy.get('.react-datepicker__current-month').invoke('text').then(currentMonthString =>
            clickPrevMonthUntil(currentMonthString.trim(), targetMonthString)
        )
    }
}
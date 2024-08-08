describe('CPU Load Monitor', () => {
  it('shows title and CPU load', () => {
    cy.intercept('GET', '/api/cpu-load', { fixture: 'cpu-load-low.json' })
    cy.visit('/')
    cy.contains('h1', 'CPU Load Monitor')
    cy.contains('h2', '0.5')
  })

  it('shows high CPU load', () => {
    cy.intercept('GET', '/api/cpu-load', { fixture: 'cpu-load-high.json' })
    cy.visit('/')
    cy.contains('h2', '1.5')
    cy.contains('div', 'No alerts registered')
    cy.wait(2 * 60 * 1000 + 10 * 1000) // wait for ~2 minutes to trigger the alert
    cy.contains('div', 'High average CPU load')
  })
})



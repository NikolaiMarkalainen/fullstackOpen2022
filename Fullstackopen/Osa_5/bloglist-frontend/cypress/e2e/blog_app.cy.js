describe('Blog app', () => {
beforeEach(function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'Nikolai',
    username: 'Lastis',
    password: '1234'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
  cy.visit('http://localhost:3000/')
  

})

  it('Login form is shown', () => {
    cy.contains('BLOGS')
    cy.contains('Login').click()

    cy.contains('username')
    cy.contains('password')
  })
  
  describe('Logging into page', function () {
    beforeEach(function(){
      cy.contains('BLOGS')
      cy.contains('Login').click()
    })
    it('succeeds with correct credentials', function (){
      cy.get('#username').type('Lastis')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains(`Lastis logged in`)
    })
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('lastis')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
})
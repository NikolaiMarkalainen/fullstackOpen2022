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
      cy.get('#username').type('Lastis')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains(`Lastis logged in`)
    })
    it('A blog can be created', function () {
      cy.get('#toggle-create').click()
      cy.get('#blog-title').type('Test Blog')
      cy.get('#blog-author').type('Tester')
      cy.get('#blog-url').type('TestBlogbyTester.com')
      cy.get('#submit-button').click()
      cy.contains('Test Blog has been added')
      cy.contains('Test Blog')
      cy.contains('Tester')
      cy.contains('TestBlogbyTester.com')
    })
  })

  describe('fails with incorrect credentials', function() {
    beforeEach(function(){
      cy.contains('BLOGS')
      cy.contains('Login').click()
    })
    it('attempt at login', function() {
      cy.get('#username').type('lastis')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
})
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
      it('Can login with proper credentials', function(){
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


  describe('When logged in', function(){
    beforeEach(function(){
      cy.contains('BLOGS')
      cy.contains('Login').click()
      cy.get('#username').type('Lastis')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains(`Lastis logged in`)
      cy.createBlog({
        title:'Tested title',
        author:'Tested author',
        url:'TestedbyAuthorandTitle',
        like:0
      })
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
    it('A Blog can be liked', function() {
      cy.contains('Show more').click()
      cy.get('#like-button').click()
      cy.get('.likes-data').should('contain', 1)
    })
  })
})

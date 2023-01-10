import blogs from "../../src/services/blogs";

describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Nikolai",
      username: "Lastis",
      password: "1234",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000/");
  });

  it("Login form is shown", () => {
    cy.contains("BLOGS");
    cy.contains("Login").click();

    cy.contains("username");
    cy.contains("password");
  });

  describe("Logging into page", function () {
    beforeEach(function () {
      cy.contains("BLOGS");
      cy.contains("Login").click();
    });
    it("Can login with proper credentials", function () {
      cy.get("#username").type("Lastis");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
      cy.contains("Lastis logged in");
    });
    it("fails with incorrect credentials", function () {
      cy.get("#username").type("lastis");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.contains("Wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("BLOGS");
      cy.contains("Login").click();
      cy.get("#username").type("Lastis");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
      cy.contains("Lastis logged in");
      cy.createBlog({
        title: "Tested title",
        author: "Tested author",
        url: "TestedbyAuthorandTitle",
        like: 0,
      });
    });
    it("A blog can be created", function () {
      cy.get("#toggle-create").click();
      cy.get("#blog-title").type("Test Blog");
      cy.get("#blog-author").type("Tester");
      cy.get("#blog-url").type("TestBlogbyTester.com");
      cy.get("#submit-button").click();
      cy.contains("Test Blog has been added");
      cy.contains("Test Blog");
      cy.contains("Tester");
      cy.contains("TestBlogbyTester.com");
    });
    it("A Blog can be liked", function () {
      cy.contains("Show more").click();
      cy.get("#like-button").click();
      cy.get(".likes-data").should("contain", 1);
    });
    it("A created blog can be deleted", function () {
      cy.contains("Show more").click();
      cy.get("#delete-button").click();
      cy.get(".error").should(
        "contain",
        "Deleted, Tested title by Tested author"
      );
    });
    it("Deleting someone elses blog", function () {
      cy.newUser({
        name: "nikolai",
        username: "last2",
        password: "1234",
      });
      cy.get("#log-out").click();
      cy.contains("BLOG");
      cy.contains("Login").click();
      cy.get("#username").type("last2");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
      cy.contains("last2 logged in");
      cy.contains("Show more").click();
      cy.contains("Creator: Lastis");
    });
    it("Ordered by highest amount of likes", function () {
      cy.createBlog({
        title: "Most-liked",
        author: "Best-author",
        url: "most-liked-best-author.com",
        like: 2,
      });
      cy.createBlog({
        title: "Second-most-likes",
        author: "Second-best-author",
        url: "Second-best-author.com",
        like: 2,
      });

      cy.contains("Most-liked, Best-author").contains("Show more").click();
      cy.contains("Most-liked, Best-author").contains("Show less");
      cy.contains("Second-most-likes, Second-best-author")
        .contains("Show more")
        .click();
      cy.get("#like-button").click();
      cy.contains("Second-most-likes, Second-best-author");
      cy.get("#blog-data:nth-of-type(2)").contains("LIKE").click();
      cy.get("#blog-data:nth-of-type(2)").contains("LIKE").click();
      cy.get("#blog-data:nth-of-type(2)").contains("LIKE").click();
      cy.get("#blog-data:nth-of-type(2)").contains("LIKE").click();

      cy.get("ul>li").eq(0).should("contain", "Most-liked, Best-author");
      cy.get("ul>li")
        .eq(1)
        .should("contain", "Second-most-likes, Second-best-author");
    });
  });
});

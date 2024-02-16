import { func } from "prop-types";

describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });
  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  describe("when logged in", function () {
    beforeEach(async function () {
      cy.contains("login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      await cy.get("#login-button").click();
    });
    // it('a new blog can be created',function(){
    //     cy.contains('add Blog').click()
    //     cy.get('#title').type('The Roaming Tiger')
    //     cy.get('#author').type('Harry')
    //     cy.get('#url').type('https://www.youtube.com/watch?v=QK-RxEEVAWs&ab_channel=ThePrimeTime')
    //     cy.get('#add-button').click()
    //     cy.contains('The Roaming Tiger')
    // })
    it("a blog can be liked", function () {
      cy.contains("👁️").click();
      cy.contains("👍").click();
    });
    it("user who created a blog can delete it", function () {
      cy.contains("👁️").click();
      cy.contains("🚮");
    });
  });
  describe("When logging with different account", function () {
    beforeEach(async function () {
      cy.contains("login").click();
      cy.get("#username").type("Ultrauser");
      cy.get("#password").type("123456");
      await cy.get("#login-button").click();
    });
    it("user who created a blog cannnot see delete button", function () {
      cy.contains("👁️").click();
      cy.get('button:contains("🚮")').should('not.exist');
    });
  });
});

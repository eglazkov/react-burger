import {API_URL} from '../../../src/constants';
import stabs from '../../../src/utils/data.json';

describe('constructor test', () => {

  const dragItemBun = stabs.data.find(ingredient => ingredient.type === 'bun');

  it('should open constructor', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
        cy.stub(win, 'fetch').withArgs(`${API_URL}/ingredients`)
        .resolves({
          ok: true,
          json: () => stabs,
        })
      },
    });
  });
  
  it('drag bun first to constructor and have it in drop location', () => {  
    /** Drag bun to constructor */
    cy.getIngredientById(dragItemBun._id)
      .drag('[data-testid=constructor-drop-location]');
    cy.getDropLocation().contains(dragItemBun.name).should('exist');
    cy.getIngredientById(dragItemBun._id)
      .find('[data-testid=counter]')
      .contains('2')
      .should('exist');
    cy.get('[data-testid=price]')
      .contains('2510')
      .should('exist');
    cy.wait(200);
  });

  it('make action "Оформить заказ" by not signed in user', () => {
    cy.contains('Оформить заказ')
      .click();
    cy.location('pathname').should('eq', '/login');
    cy.wait(200);
  });

  it('sign in', () => {
    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: {
        accessToken: "Bearer safsdgregherhreh",
        refreshToken: "rwehy557",
        success: true,
        user: {
          email: "usermail@ya.ru",
          name: "userName"
        }
      }
    });
    cy.intercept('GET', `${API_URL}/auth/user`, {
      statusCode: 200,
      body: {
        success: false,
        user: null
      }
    }).as('getUser');
    cy.location('pathname').should('eq', '/login');
    cy.wait('@getUser');
    
    cy.contains('Войти')
      .click();
    cy.location('pathname').should('eq', '/');
    cy.wait(200);
  });

  it('make action "Оформить заказ" by signed in user', () => {
    cy.intercept('POST', `${API_URL}/orders`, {
      statusCode: 200,
      body: {
        name: "Флюоресцентный бургер",
        order: {number: 8073},
        success: true
      }
    });
    cy.contains('Оформить заказ')
      .click();
    cy.contains('8073')
      .should('exist');
    cy.contains('Ваш заказ начали готовить')
      .should('exist');
    cy.wait(200);
  });

  it('close order dialog', () => {
    cy.get('#modals')
      .find('button')
      .click();
    cy.getDropLocation()
      .find('[data-test-id=constructor-element]')
      .should('not.exist');
  });
});

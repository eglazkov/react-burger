import {API_URL} from '../../../src/constants';
import stabs from '../../../src/utils/data.json';

// disable antivirus software if you have it. need to load images from stabs
describe('login page is available', function() {
  it('should be available on localhost:3000', function() {

    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
        cy.stub(win, 'fetch').withArgs(`${API_URL}/ingredients`)
        .resolves(new Promise((resolve) => resolve({
          ok: true,
          json: () => stabs,
        })))
      }
    });
  });

  it('should open feed after click on "Личный кабинет"', function() {
    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 201,
      body: {
        name: 'Peter Pan',
      }
    });

    cy.contains('Личный кабинет')
      .click();
    
    cy.contains('Вход');
    cy.contains('Email');
    
    cy.contains('Войти')
      .click();
  });
});

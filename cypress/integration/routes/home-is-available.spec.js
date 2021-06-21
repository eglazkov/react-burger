import {API_URL} from '../../../src/constants';
import stabs from '../../../src/utils/data.json';

// disable antivirus software if you have it. need to load images from stabs
describe('home page is available', function() {
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

  it('should open constructor by default', function() {
    cy.contains('Соберите бургер');
    cy.contains('Краторная булка N-200i');
  });
});

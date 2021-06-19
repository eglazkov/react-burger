import {ingredientsReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });

  it('should reset ingredeints array and change isIngredientsLoading flag to true', () => {
    expect(ingredientsReducer(undefined, {
      type: ActionTypes.FETCH_INGREDIENTS_PENDING
    })).toEqual({
      isIngredientsLoading: true,
      ingredients: [],
      errorMessage: null,
      ingredientDetails: {},
      showIngredientDetails: false
    });
  });

  it(`should return ingredeints from payload 
      and change isIngredientsLoading to false`, () => {
    expect(ingredientsReducer(undefined, {
      type: ActionTypes.FETCH_INGREDIENTS_SUCCESS,
      payload: {
        ingredients: [{_id: 1}]
      }
    })).toEqual({
      isIngredientsLoading: false,
      ingredients: [{_id: 1}],
      errorMessage: null,
      ingredientDetails: {},
      showIngredientDetails: false
    });
  });

  it(`should return ingredeints from payload 
      and change isIngredientsLoading to false like previous test`, () => {
    expect(ingredientsReducer(undefined, {
      type: ActionTypes.CHANGE_INGREDIENTS,
      payload: {
        ingredients: [{_id: 1}]
      }
    })).toEqual({
      isIngredientsLoading: false,
      ingredients: [{_id: 1}],
      errorMessage: null,
      ingredientDetails: {},
      showIngredientDetails: false
    });
  });
  
  it(`should change isIngredientsLoading to false, ingredients to empty array and
      return errorMessage from payload`, () => {
    expect(ingredientsReducer(undefined, {
      type: ActionTypes.FETCH_INGREDIENTS_FAIL,
      payload: {
        errorMessage: 'errorMessage',
        isIngredientsLoading: true,
        ingredients: [{_id: 1}]
      }
    })).toEqual({
      isIngredientsLoading: false,
      ingredients: [],
      errorMessage: 'errorMessage',
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });

  it(`should increase by one "count" property in ingredients
      array by id from payload`, () => {
    const intitalState = {
      ingredients: [
        {count:0, _id: 0},
        {count: 4, _id: 1},
        {_id: 2},
        {count: 2, _id: 3}
      ]
    };
    expect(ingredientsReducer(intitalState, {
      type: ActionTypes.INCREASE_INGREDIENT_COUNT,
      payload: {
        id: 1
      }
    })).toEqual({
      ingredients: [
        {count:0, _id: 0},
        {count: 5, _id: 1},
        {_id: 2},
        {count: 2, _id: 3}
      ]
    });
  });

  it(`should decrease by one "count" property in ingredients
      array by id from payload`, () => {
    const intitalState = {
      ingredients: [
        {count:0, _id: 0},
        {count: 4, _id: 1},
        {_id: 2},
        {count: 2, _id: 3}
      ]
    };
    expect(ingredientsReducer(intitalState, {
      type: ActionTypes.DECREASE_INGREDIENT_COUNT,
      payload: {
        id: 3
      }
    })).toEqual({
      ingredients: [
        {count:0, _id: 0},
        {count: 4, _id: 1},
        {_id: 2},
        {count: 1, _id: 3}
      ]
    });
  });

  it(`should toggle showIngredientDetails flag to true and
      return ingredientDetails from payload details`, () => {
    const initialState = {
      showIngredientDetails: false,
      ingredientDetails: {}
    };
    expect(ingredientsReducer(initialState, {
      type: ActionTypes.OPEN_INGREDIENT_DETAILS,
      payload: {
        details: {foo: 'bar'}
      }
    })).toEqual({
      showIngredientDetails: true,
      ingredientDetails: {foo: 'bar'}
    });
  });

  it(`should toggle showIngredientDetails flag to false and
      change ingredientDetails to empty object`, () => {
    const initialState = {
      showIngredientDetails: true,
      ingredientDetails: {foo: 'bar'}
    };
    expect(ingredientsReducer(initialState, {
      type: ActionTypes.CLOSE_INGREDIENT_DETAILS
    })).toEqual({
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });
});

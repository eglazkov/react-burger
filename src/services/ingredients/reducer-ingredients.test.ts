import {ingredientsReducer, TIngredientsInitialState} from './reducer';
import * as ActionTypes from './action-types';

const successResult = {
  isIngredientsLoading: false,
  ingredients: [{_id: 1}],
  errorMessage: null,
  ingredientDetails: {},
  showIngredientDetails: false
};

const initialState: TIngredientsInitialState = {
  ingredients: [{
    constructorId: '0',
    _id: 'de3gr5hbr5e4h45',
    calories: 122,
    carbohydrates: 55,
    description: 'description',
    fat: 7,
    image_large: '',
    image_mobile: '',
    name: 'name',
    price: 213,
    proteins: 45,
    type: 'main',
    count: 1,
    image: ''
  }],
  isIngredientsLoading: false,
  errorMessage: null,
  showIngredientDetails: false,
  ingredientDetails: {}
};

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
    })).toEqual(successResult);
  });

  it(`should return ingredeints from payload 
      and change isIngredientsLoading to false like previous test`, () => {
    expect(ingredientsReducer(undefined, {
      type: ActionTypes.CHANGE_INGREDIENTS,
      payload: {
        ingredients: [{_id: 1}]
      }
    })).toEqual(successResult);
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
    expect(ingredientsReducer(initialState, {
      type: ActionTypes.INCREASE_INGREDIENT_COUNT,
      payload: {
        id: 'de3gr5hbr5e4h45'
      }
    })).toEqual({
      ingredients: [{
        constructorId: '0',
        _id: 'de3gr5hbr5e4h45',
        calories: 122,
        carbohydrates: 55,
        description: 'description',
        fat: 7,
        image_large: '',
        image_mobile: '',
        name: 'name',
        price: 213,
        proteins: 45,
        type: 'main',
        count: 2,
        image: ''
      }],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });

  it(`should decrease by one "count" property in ingredients
      array by id from payload`, () => {
    expect(ingredientsReducer(initialState, {
      type: ActionTypes.DECREASE_INGREDIENT_COUNT,
      payload: {
        id: 'de3gr5hbr5e4h45'
      }
    })).toEqual({
      ingredients: [{
        constructorId: '0',
        _id: 'de3gr5hbr5e4h45',
        calories: 122,
        carbohydrates: 55,
        description: 'description',
        fat: 7,
        image_large: '',
        image_mobile: '',
        name: 'name',
        price: 213,
        proteins: 45,
        type: 'main',
        count: 1,
        image: ''
      }],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });

  it(`should toggle showIngredientDetails flag to true and
      return ingredientDetails from payload details`, () => {
    expect(ingredientsReducer(initialState, {
      type: ActionTypes.OPEN_INGREDIENT_DETAILS,
      payload: {
        details: {foo: 'bar'}
      }
    })).toEqual({
      ingredients: [{
        constructorId: '0',
        _id: 'de3gr5hbr5e4h45',
        calories: 122,
        carbohydrates: 55,
        description: 'description',
        fat: 7,
        image_large: '',
        image_mobile: '',
        name: 'name',
        price: 213,
        proteins: 45,
        type: 'main',
        count: 1,
        image: ''
      }],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: true,
      ingredientDetails: {foo: 'bar'}
    });
  });

  it(`should toggle showIngredientDetails flag to false and
      change ingredientDetails to empty object`, () => {
    expect(ingredientsReducer({
      ingredients: [{
        constructorId: '0',
        _id: 'de3gr5hbr5e4h45',
        calories: 122,
        carbohydrates: 55,
        description: 'description',
        fat: 7,
        image_large: '',
        image_mobile: '',
        name: 'name',
        price: 213,
        proteins: 45,
        type: 'main',
        count: 1,
        image: ''
      }],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: true,
      ingredientDetails: {foo: 'bar'}
    }, {
      type: ActionTypes.CLOSE_INGREDIENT_DETAILS
    })).toEqual({
      ingredients: [{
        constructorId: '0',
        _id: 'de3gr5hbr5e4h45',
        calories: 122,
        carbohydrates: 55,
        description: 'description',
        fat: 7,
        image_large: '',
        image_mobile: '',
        name: 'name',
        price: 213,
        proteins: 45,
        type: 'main',
        count: 1,
        image: ''
      }],
      isIngredientsLoading: false,
      errorMessage: null,
      showIngredientDetails: false,
      ingredientDetails: {}
    });
  });
});

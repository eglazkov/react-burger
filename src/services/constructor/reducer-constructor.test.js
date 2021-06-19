import {constructorReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual({
      constructorIngredients: [],
      showDropLocation: false
    });
  });

  it('should add item from payload by index to constructorIngredients', () => {
    const initialState = {
      constructorIngredients: [{constructorId: 0}],
      showDropLocation: false
    };
    expect(constructorReducer(initialState, {
      type: ActionTypes.ADD_TO_CONSTRUCTOR,
      payload: {
        index: 0, item: {constructorId: 1}
      }
    })).toEqual({
      showDropLocation: false,
      constructorIngredients: [{constructorId: 1},{constructorId: 0}]
    });
  });

  it(`should remove item from constructorIngredients
      in state by index from`, () => {
    const initialState = {
      constructorIngredients: [{constructorId: 0}],
      showDropLocation: false
    };
    expect(constructorReducer(initialState, {
      type: ActionTypes.REMOVE_FROM_CONSTRUCTOR,
      payload: {
        index: 0
      }
    })).toEqual({
      showDropLocation: false,
      constructorIngredients: []
    });
  });

  it(`should change location from dragIndex to replaceToIndex of
      item inside constructorIngredients array`, () => {
    const intitalState = {
      constructorIngredients: [
        {constructorId: 0},
        {constructorId: 1},
        {constructorId: 2},
        {constructorId: 3}
      ],
      showDropLocation: false
    };
    expect(constructorReducer(intitalState, {
      type: ActionTypes.DROP_CONSTRUCTOR_ITEM,
      payload: {
        dragIndex: 0,
        replaceToIndex: 2
      }
    })).toEqual({
      ...intitalState,
      constructorIngredients: [       
        {constructorId: 0},        
        {constructorId: 2},
        {constructorId: 3},
        {constructorId: 1}
      ],      
      showDropLocation: false
    });
  });

  it('should clear of constructorIngredients array in state', () => {
    const intitalState = {
      constructorIngredients: [
        {constructorId: 0},
        {constructorId: 1},
        {constructorId: 2},
        {constructorId: 3}
      ],
      showDropLocation: false
    };
    expect(constructorReducer(intitalState, {
      type: ActionTypes.RESET_CONSTRUCTOR
    })).toEqual({
      ...intitalState,
      constructorIngredients: [],
      showDropLocation: false
    });
  });

  it('should toggle showDropLocation flag to true', () => {
    const initialState = {
      showDropLocation: false,
      constructorIngredients: []
    };
    expect(constructorReducer(initialState, {
      type: ActionTypes.SHOW_DROP_LOCATION
    })).toEqual({
      showDropLocation: true,
      constructorIngredients: []
    });
  });

  it('should toggle showDropLocation flag to false', () => {
    const initialState = {
      showDropLocation: true,
      constructorIngredients: []
    };
    expect(constructorReducer(initialState, {
      type: ActionTypes.HIDE_DROP_LOCATION
    })).toEqual({
      showDropLocation: false,
      constructorIngredients: []
    });
  });

});

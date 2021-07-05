import {constructorReducer} from './reducer';
import {TConstructorState} from './reducer';
import * as ActionTypes from './action-types';

const successResult = {
  showDropLocation: false,
  constructorIngredients: []
};

const initialState: TConstructorState = {
  constructorIngredients: [{
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
  showDropLocation: false
};

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual({
      constructorIngredients: [],
      showDropLocation: false
    });
  });

  it('should add item from payload by index to constructorIngredients', () => {
    expect(constructorReducer(initialState, {
      type: ActionTypes.ADD_TO_CONSTRUCTOR,
      payload: {
        index: 0, item: {
          constructorId: '1',
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
        }
      }
    })).toEqual({
      showDropLocation: false,
      constructorIngredients: [{
        constructorId: '1',
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
      },{
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
      }]
    });
  });

  it(`should remove item from constructorIngredients
      in state by index from`, () => {
    expect(constructorReducer(initialState, {
      type: ActionTypes.REMOVE_FROM_CONSTRUCTOR,
      payload: {
        index: 0
      }
    })).toEqual(successResult);
  });

  it(`should change location from dragIndex to replaceToIndex of
      item inside constructorIngredients array`, () => {
    expect(constructorReducer({
      constructorIngredients: [
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '0';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '1';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '2';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '3';
          return item
        })[0]}
      ],
      showDropLocation: false
    }, {
      type: ActionTypes.DROP_CONSTRUCTOR_ITEM,
      payload: {
        dragIndex: 0,
        replaceToIndex: 2
      }
    })).toEqual({
      constructorIngredients: [       
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '0';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '2';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '3';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '1';
          return item
        })[0]}
      ],      
      showDropLocation: false
    });
  });

  it('should clear of constructorIngredients array in state', () => {
    expect(constructorReducer({
      constructorIngredients: [
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '0';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '1';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '2';
          return item
        })[0]},
        {...initialState.constructorIngredients.map(item => {
          item.constructorId = '3';
          return item
        })[0]}
      ],
      showDropLocation: false
    }, {
      type: ActionTypes.RESET_CONSTRUCTOR
    })).toEqual({
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
    })).toEqual(successResult);
  });

});

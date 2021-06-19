import {orderReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      totalCost: 0,
      isSendingDataOrder: false,
      orderId: null,
      isShowOrderDetails: false,
      errorMessage: null
    });
  });

  it('should increase totalCost in state by adding value from payload amount property', () => {
    expect(orderReducer({
      totalCost: 1250
    }, {
      type: ActionTypes.INCREASE_TOTALCOST,
      payload: {
        amount: 1234
      }
    })).toEqual({
      totalCost: 1250 + 1234
    });
  });

  it('should decrease totalCost in state by substract value from payload amount property', () => {
    expect(orderReducer({
      totalCost: 1250 + 1234
    }, {
      type: ActionTypes.DECREASE_TOTALCOST,
      payload: {
        amount: 1234
      }
    })).toEqual({
      totalCost: 1250
    });
  });

  it('should reset totalCost property to zero', () => {
    expect(orderReducer({
      totalCost: 1250
    }, {
      type: ActionTypes.RESET_TOTALCOST
    })).toEqual({
      totalCost: 0
    });
  });

  it('should reset ingredeints array and change isSendingDataOrder flag to true', () => {
    expect(orderReducer({
      totalCost: 0,
      isSendingDataOrder: false,
      orderId: null,
      isShowOrderDetails: false,
      errorMessage: null
    }, {
      type: ActionTypes.FETCH_DATA_ORDER_PENDING
    })).toEqual({
      totalCost: 0,
      isSendingDataOrder: true,
      orderId: null,
      isShowOrderDetails: false,
      errorMessage: null
    });
  });

  it(`should return orderId from payload 
      and change isSendingDataOrder to false`, () => {
    expect(orderReducer({
      totalCost: 0,
      isSendingDataOrder: true,
      orderId: null,
      isShowOrderDetails: false,
      errorMessage: null
    }, {
      type: ActionTypes.FETCH_DATA_ORDER_SUCCESS,
      payload: {
        orderId: '023859827'
      }
    })).toEqual({
      totalCost: 0,
      isSendingDataOrder: false,
      orderId: '023859827',
      isShowOrderDetails: false,
      errorMessage: null
    });
  });

  it(`should change isSendingDataOrder to false, orderId to null and
      return errorMessage from payload`, () => {
    expect(orderReducer({
      totalCost: 0,
      isSendingDataOrder: true,
      orderId: 'null',
      isShowOrderDetails: false,
      errorMessage: null
    }, {
      type: ActionTypes.FETCH_DATA_ORDER_FAIL,
      payload: {
        errorMessage: 'errorMessage'
      }
    })).toEqual({
      totalCost: 0,
      isSendingDataOrder: false,
      orderId: null,
      isShowOrderDetails: false,
      errorMessage: 'errorMessage'
    });
  });

  it(`should toggle isShowOrderDetails flag to true`, () => {
    const initialState = {
      isShowOrderDetails: false
    };
    expect(orderReducer(initialState, {
      type: ActionTypes.SHOW_ORDER_DETAILS
    })).toEqual({
      isShowOrderDetails: true
    });
  });

  it(`should toggle isShowOrderDetails flag to false`, () => {
    const initialState = {
      isShowOrderDetails: true
    };
    expect(orderReducer(initialState, {
      type: ActionTypes.CLOSE_ORDER_DETAILS
    })).toEqual({
      isShowOrderDetails: false
    });
  });
});

import _ from 'lodash';
import * as modelTypes from './actionTypes';

// redux state
const initialState = {
  results: [],
  id: null,
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case modelTypes.GET_RESULT_SUCCESS:
      return {
        results: [
          ...state.results,
          {
            id: action.id,
            result: action.result,
          },
        ],
        id: action.id,
      };
    case modelTypes.GET_RESULT_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}

// selectors
export const getResults = (state) => {
  return state.model.results.filter((result) => result.id == state.id).result;
};

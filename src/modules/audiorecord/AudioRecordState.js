import {Map} from 'immutable';

// Initial state
const initialState = Map({
});

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
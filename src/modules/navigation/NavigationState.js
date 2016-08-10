import {fromJS, Map} from 'immutable';

const initialState = fromJS({
  index: 0,
  children: [{
    key: 'Home',
    index: 0
  }]
});

// TODO: ATM all the views are saved to navigation state, but possibly it could be
// edited so that the navigation stack doesn't hold information about the views
// that the user can not return to anyway.

// Actions
export const INITIALIZE_STATE = 'NavigationState/INITIALIZE_STATE';
const RESET_ROUTE = 'NavigationState/RESET_ROUTE';
export const RESET_STATE = 'NavigationState/RESET_STATE';
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const NAVIGATION_COMPLETED = 'NavigationState/NAVIGATION_COMPLETED';

// Action creators
export function resetRoute() {
  return {type: RESET_ROUTE};
}

export function pushRoute(state) {
  return (dispatch) => {
    dispatch({
      type: PUSH_ROUTE,
      payload: Map({key: state.key, allowReturn: state.allowReturn})
    });
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

export function navigationCompleted() {
  return {type: NAVIGATION_COMPLETED};
}

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE
  };
}

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {

    case INITIALIZE_STATE:
    case RESET_ROUTE:
    case RESET_STATE:
      return initialState;

    case PUSH_ROUTE:
      var newPath = Map({
        key: action.payload.get('key'),
        index: state.get('index') + 1,
        allowReturn: action.payload.get('allowReturn')});

      return state
        .set('isNavigating', true)
        .updateIn(['children'], list => list.push(newPath))
        .update('index', index => index + 1);

    case POP_ROUTE:
      var poppedRouteIndex = state.get('index');
      var tmp = state.get('children').slice();
      tmp = tmp.filter(function deleteRoute(item) { return item.get('index') !== poppedRouteIndex; });

      return state
        .set('isNavigating', true)
        .set('children', tmp)
        .update('index', index => index - 1);

    case NAVIGATION_COMPLETED:
      return state.set('isNavigating', false);

    default:
      return state;
  }
}

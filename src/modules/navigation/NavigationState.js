import {fromJS, Map} from 'immutable';

const initialState = fromJS({
  index: 0,
  children: [{
    key: 'Home',
    index: 0,
    pageLayout: Map({
      showTitle: false,
      voteThumbs: false
    })
  }]
});

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const NAVIGATION_COMPLETED = 'NavigationState/NAVIGATION_COMPLETED';

// Action creators
export function pushRoute(state) {
  return (dispatch) => {
    dispatch({
      type: PUSH_ROUTE,
      payload: Map({key: state.key, pageLayout: state.pageLayout})
    });
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

export function navigationCompleted() {
  return {type: NAVIGATION_COMPLETED};
}

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE:
      var newPath = Map({
        key: action.payload.get('key'),
        index: state.get('index') + 1,
        pageLayout: action.payload.get('pageLayout')});

      return state
        .set('isNavigating', true)
        .updateIn(['children'], list => list.push(newPath))
        .update('index', index => index + 1);

    case POP_ROUTE:
      console.log('POPPING ROUTE 1');
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

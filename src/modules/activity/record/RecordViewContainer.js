import {connect} from 'react-redux';
import Record from './Record';

export default connect(
  state => ({
    savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
    activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
    answers: state.getIn(['user', 'currentUser', 'answers'])
  })
)(Record);

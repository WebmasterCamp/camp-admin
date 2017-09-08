import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';

import { actions as gradingActions } from '../../../ducks/grading';

const enhance = compose(
  connect(
    state => ({
      item: state.grading.item
    }),
    { ...gradingActions }
  ),
  withProps(
    
  ),
  lifecycle({
    componentDidMount() {
      this.props.getStageOneItem(this.props.match.params.id);
    }
  })
);
const StageOneGrading = props => {
  console.log(props);
  return (
    <h1>YES</h1>
  );
}

export default enhance(StageOneGrading);

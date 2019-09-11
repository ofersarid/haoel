const frame = state => state.getIn(['scrollSnap', 'frame']);
const count = state => state.getIn(['scrollSnap', 'count']);
const disableNext = state => state.getIn(['scrollSnap', 'disable', 'next']);
const disablePrev = state => state.getIn(['scrollSnap', 'disable', 'prev']);

export default {
  frame,
  disableNext,
  disablePrev,
  count,
};

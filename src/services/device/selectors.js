import { createSelector } from 'reselect/lib/index';

export const deviceType = state => state.getIn(['device', 'type']);
export const isTouchDevice = state => state.getIn(['device', 'isTouchDevice']);
export const isMobile = createSelector(deviceType, type => type === 'mobile');
export const orientation = state => state.getIn(['device', 'orientation']);

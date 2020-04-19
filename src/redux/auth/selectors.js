import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectUser = createSelector(
  [selectAuth],
  auth => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  auth => auth.token && auth.user
);

export const selectUserRole = createSelector(
  [selectUser],
  user => user?.role
);

export const selectIsOnline = createSelector(
  [selectAuth],
  auth => auth.isOnline
)

export const selectCurrentUserId = createSelector(
  [selectAuth],
  auth => auth.userId
)

export const selectToken = createSelector(
  [selectAuth],
  auth => auth.token
)
import { createSelector } from 'reselect';

const selectUsersModule = state => state.users;

export const selectUsers = createSelector(
  [selectUsersModule],
  users => users.users
);

export const selectTotal = createSelector(
  [selectUsersModule],
  users => users.total
);

export const selectUserFormInitials = createSelector(
    [selectUsersModule],
    users => users.userById
)

export const selectError = createSelector(
    [selectUsersModule],
    users => users.error
)
import { createSelector } from 'reselect';

const selectChat = state => state.chat;

export const selectRooms = createSelector(
  [selectChat],
  chat => chat.rooms
);

export const selectRoomMessages = createSelector(
    [selectChat],
    chat => chat.messages
);

export const selectCurrentRoom = createSelector(
    [selectChat],
    chat => chat.currentRoom
);
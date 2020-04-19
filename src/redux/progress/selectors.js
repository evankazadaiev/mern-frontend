export const createLoadingSelector = (actions) => (state) => {
    console.log(state.progress);
    return actions.some(action => state.progress[action])
}


// export const signUpLoading = createLoadingSelector('SIGN_UP')(['SIGN_UP']);

// export const signInLoading = createLoadingSelector('SIGN_IN')(['SIGN_IN']);

export const authRequestsLoading = createLoadingSelector(['SIGN_UP', 'SIGN_IN', 'UPDATE_USER']);

export const messagesLoading = createLoadingSelector(['SELECT_CURRENT_ROOM']);
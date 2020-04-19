export const loadingTypeRegExp = /(.*)_(START|SUCCESS|FAILURE)$/;

export default (state = {}, action) => {
  console.log(action.type)
  const matches = loadingTypeRegExp.exec(action.type);
  if (matches) {
    const [, requestName, requestState] = matches;
    
    return {
      ...state,
      [requestName]: requestState === 'START'
    }
  }
  
  return state
}
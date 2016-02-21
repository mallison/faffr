// TODO could generate these
//
// reducer = APICallReducerFactory('SAVE_APP')
//
//
export default function reduce(state = null, action) {
  if (action.type === 'SAVE_APP') {
    return 'saving';
  }

  if (action.type === 'SAVE_APP_SUCCESS') {
    return new Date();
  }

  if (action.type === 'SAVE_APP_FAIL') {
    return 'save_fail';
  }

  return state;
}

import request from 'superagent';

export function fetch() {
  return (dispatch) => {
    return request
      .get('/slots')
      .end((err, res) => dispatch({
        type: 'LOAD_APP_DATA_SUCCESS',
        data: res.body
      }));
  };
}

export function save(slots, tasks) {
  return (dispatch) => {
    dispatch(saveApp());
    return request
      .post('/slots')
      .send({slots, tasks})
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(saveAppFail());
        } else {
          dispatch(saveAppSuccess());
        }
      });
  };
}

function saveApp() {
  return {
    type: 'SAVE_APP'
  };
}

function saveAppSuccess() {
  return {
    type: 'SAVE_APP_SUCCESS'
  };
}

function saveAppFail() {
  return {
    type: 'SAVE_APP_FAIL'
  };
}

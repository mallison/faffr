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
    // TODO dispatch a SAVE_START action or something
    return request
      .post('/slots')
      .send({slots, tasks})
      .end();
    // TODO .end => dispatch save success/fail action
  };
}

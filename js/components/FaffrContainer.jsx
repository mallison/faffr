import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';

import Faffr from './Faffr';

const mapStateToProps = (state) => {
  return {
    slots: state
  };
};

// TODO autogenerate this?
const mapDispatchToProps = (dispatch) => {
  return {
    save: (slots) => {
      dispatch(
        () => {
          // TODO dispatch a SAVE_START action or something
          return request
            .post('/slots')
            .send(slots)
            .end();
          // TODO .end => dispatch save success/fail action
        });
    },
    addSlot: (task, start) => {
      dispatch({
        type: 'add',
        task,
        start
      });
    },
    // TODO possibly this could be two separate actions?
    updateSlot: (slotID, task, start) => {
      dispatch({
        type: 'update',
        slotID,
        task,
        start
      });
    },
    updateNote: (slotID, note) => {
      dispatch({
        type: 'updateNote',
        slotID,
        note
      });
    },
    deleteSlot: (slotID) => {
      dispatch({
        type: 'delete',
        slotID
      });
    },
    insertSlot: (beforeSlotID) => {
      dispatch({
        type: 'insert',
        slotID: beforeSlotID
      });
    },
    endDay: () => {
      dispatch({
        type: 'end'
      });
    }
  };
};


const FaffrContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faffr);

export default FaffrContainer;

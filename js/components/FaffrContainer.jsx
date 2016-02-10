import { connect } from 'react-redux';

import Faffr from './Faffr';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    slots: state
  };
};

// TODO autogenerate this, very repititve to write out?
const mapDispatchToProps = (dispatch) => {
  return {
    save: (slots) => {
      dispatch(actions.saveSlots(slots));
    },
    addSlot: (task, start) => {
      dispatch(actions.addSlot(task, start));
    },
    // TODO possibly this could be two separate actions?
    updateSlot: (slotID, task, start) => {
      dispatch(actions.updateSlot(slotID, task, start));
    },
    updateNote: (slotID, note) => {
      dispatch(actions.updateNote(slotID, note));
    },
    deleteSlot: (slotID) => {
      dispatch(actions.deleteSlot(slotID));
    },
    insertSlot: (beforeSlotID) => {
      dispatch(actions.insertSlot(beforeSlotID));
    },
    endDay: () => {
      dispatch(actions.endDay());
    }
  };
};


const FaffrContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faffr);

export default FaffrContainer;

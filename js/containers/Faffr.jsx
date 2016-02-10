import { connect } from 'react-redux';

import Faffr from '../components/Faffr';
import * as actions from '../actions';

// TODO do I need this identity function?
const mapStateToProps = (state) => state;

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
    },
    markEditable: (slotID) => {
      dispatch(actions.markEditable(slotID));
    }
  };
};

const FaffrContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faffr);

export default FaffrContainer;

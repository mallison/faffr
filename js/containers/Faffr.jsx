import { connect } from 'react-redux';

import Faffr from '../components/Faffr';
import * as actionCreators from '../actionCreators/api';

// TODO do I need this identity function?
const mapStateToProps = state => state;

// TODO autogenerate this, very repititve to write out?
const mapDispatchToProps = (dispatch) => {
  return {
    save: (slots, tasks) => {
      dispatch(actionCreators.save(slots, tasks));
    },
    addSlot: (task, start) => {
      dispatch(actionCreators.addSlot(task, start));
    },
    // TODO possibly this could be two separate actionCreators?
    updateSlot: (slotID, task, start) => {
      dispatch(actionCreators.updateSlot(slotID, task, start));
    },
    updateNote: (slotID, note) => {
      dispatch(actionCreators.updateNote(slotID, note));
    },
    deleteSlot: (slotID) => {
      dispatch(actionCreators.deleteSlot(slotID));
    },
    insertSlot: (beforeSlotID) => {
      dispatch(actionCreators.insertSlot(beforeSlotID));
    },
    endSlot: (slotID) => {
      dispatch(actionCreators.endSlot(slotID));
    },
    markEditable: (slotID) => {
      dispatch(actionCreators.markEditable(slotID));
    }
  };
};

const FaffrContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faffr);

export default FaffrContainer;

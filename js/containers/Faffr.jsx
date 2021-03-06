import { connect } from 'react-redux';

import Faffr from '../components/Faffr';
import * as APIActionCreators from '../actionCreators/api';
import * as slotActionCreators from '../actionCreators/slots';

// TODO do I need this identity function?
const mapStateToProps = state => state;

// TODO autogenerate this, very repititve to write out?
const mapDispatchToProps = (dispatch) => {
  return {
    save: (slots, tasks) => {
      dispatch(APIActionCreators.save(slots, tasks));
    },
    addSlot: (task, start) => {
      dispatch(slotActionCreators.addSlot(task, start));
    },
    // Could move these to Slot container as only component where these are needed
    updateSlot: (slotID, task, start, end) => {
      dispatch(slotActionCreators.updateSlot(slotID, task, start, end));
    },
    updateNote: (slotID, note) => {
      dispatch(slotActionCreators.updateNote(slotID, note));
    },
    deleteSlot: (slotID) => {
      dispatch(slotActionCreators.deleteSlot(slotID));
    },
    insertSlot: (beforeSlotID) => {
      dispatch(slotActionCreators.insertSlot(beforeSlotID));
    },
    markEditable: (slotID) => {
      dispatch(slotActionCreators.markEditable(slotID));
    }
  };
};

const FaffrContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faffr);

export default FaffrContainer;

import React from 'react';
import classnames from 'classnames';


const AppSaveStatus = ({ status }) => {
  if (!status) {
    return <span />;
  }
  let alertClass = classnames({
    alert: true,
    'alert-info': status === 'saving',
    'alert-success': typeof status === 'object',
    'alert-danger': status === 'save_fail'
  });
  let message;
  if (status === 'saving') {
    message = 'Saving ...';
  } else if (typeof status === 'object') {
    message = `Last saved ${status.toGMTString()}`;
  } else if (status === 'save_fail') {
    message = 'Saving failed \u2639. Please try again.';
  }
  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

export default AppSaveStatus;

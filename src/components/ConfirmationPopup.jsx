import React from "react";

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmationPopup">
      <div className="innerPopupOne">
        <h3>Are you sure you want to Delete?</h3>
        <div className="popupButtons">
          <button className="yesButton" onClick={onConfirm}>
            Yes
          </button>
          <button className="noButton" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
/*<p>Are you sure you wnat to delete?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button> */

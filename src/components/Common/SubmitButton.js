import React from "react";

const SubmitButton = ({ onSubmit, text = "Submit" }) => (
  <div className="website">
    <button
      type="button"
      className="action-button submit-button pointer"
      onClick={onSubmit}
    >
      <span>{text}</span>
    </button>
  </div>
);

export default SubmitButton;

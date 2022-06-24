import React from "react";

const SubmitButton = (props) => {
  // const { onSubmit, text = "Submit" } = props;

  return (
    <div className="website">
      <button
        type="button"
        className="action-button submit-button pointer"
        onClick={props.onSubmit}
        {...props}
      >
        <span>{props.text || "Submit"}</span>
      </button>
    </div>
  );
};

export default SubmitButton;

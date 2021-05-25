import React, { useState } from "react";
import {
  RECEIVE_ALERT_TEXT,
  FEEDBACK_MIN_LENGTH,
  RATE_STEPS,
  INIT_USER_RATE,
  REVIEW_API,
  BASE_URL,
} from "../../constans";
import { confirmAlert, errorAlert } from "../../utils";

// styles
import "./style.scss";

const NegativeRateStep = ({ hash, setActiveStep, setUserRate }) => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ review }),
    };

    const url = `${BASE_URL}${REVIEW_API}?hash=${hash}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        if (data.statusCode !== 200) {
          return errorAlert(data.error || errMsg);
        }

        confirmAlert(
          `Your reference no. is ${data.data.referenceNo}`,
          RECEIVE_ALERT_TEXT
        ).then(() => {
          // set to the first step
          setActiveStep(RATE_STEPS.FIRST_STEP);
          setUserRate(INIT_USER_RATE);
        });
      })
      .catch((error) => errorAlert(error));
  };

  const submitButtonDisabled = review.length < FEEDBACK_MIN_LENGTH;

  return (
    <div className="step-container negative-step">
      <p>
        We are sorry to hear that.
        <br />
        Please tell us what went wrong so that we could improve our services.
        Your feedback is very important to us!
      </p>
      <textarea
        value={review}
        onChange={(event) => setReview(event.target.value)}
      />
      <div className="tooltip">
        <button
          type="button"
          className={`submit-button ${
            submitButtonDisabled ? "disabled-button" : "pointer"
          }`}
          disabled={submitButtonDisabled}
          onClick={handleSubmit}
        >
          Submit Feedback
          {submitButtonDisabled && (
            <span className="tooltip-text">
              Please make sure you typed out more than 10 characters to be able
              to send your feedback.
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default NegativeRateStep;

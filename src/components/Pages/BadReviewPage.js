import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  // RECEIVE_ALERT_TEXT,
  FEEDBACK_MIN_LENGTH,
  APP_FLOW_PAGES,
  INIT_USER_RATE,
  REVIEW_API,
  BASE_URL,
} from "../../constans";
import {
  // confirmAlert,
  errorAlert,
} from "../../utils";

// styles
import "./style.scss";

const BadReviewPage = ({
  hash,
  setActivePage,
  setUserRate,
  resetActivePage,
}) => {
  const [review, setReview] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ review }),
    };

    fetch(`${BASE_URL}${REVIEW_API}?hash=${hash}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        if (data.statusCode !== 200) {
          return errorAlert(data.error || errMsg);
        }

        setIsReviewed(true);

        // confirmAlert(
        //   `Your reference no. is ${data.data.referenceNo}`,
        //   RECEIVE_ALERT_TEXT
        // ).then(() => {
        //   // set to the first step
        //   setActivePage(APP_FLOW_PAGES.RATE_PAGE);
        //   setUserRate(INIT_USER_RATE);
        // });
      })
      .catch((error) => errorAlert(error));
  };

  const submitButtonDisabled = review.length < FEEDBACK_MIN_LENGTH;

  const GoBackButton = ({ style }) => (
    <button
      type="button"
      className={`action-button pointer ${style || ""}`}
      onClick={() => {
        // set to the first step
        resetActivePage(APP_FLOW_PAGES.RATE_PAGE);
        setUserRate(INIT_USER_RATE);
      }}
    >
      <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-1" />
      Go Back
    </button>
  );

  return (
    <div className="step-container negative-step">
      {isReviewed ? (
        <>
          <div className="negative-step__reviewed-header">
            <h1 className="heading ml-1">Thank you!</h1>
          </div>
          {/* <GoBackButton /> */}
        </>
      ) : (
        <>
          <p>
            We are sorry to hear that.
            <br />
            Please tell us what went wrong so that we could improve our
            services. Your feedback is very important to us!
          </p>
          <textarea
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
          <div className="button-group">
            <GoBackButton style="mr-5" />
            <div className="tooltip">
              <button
                type="button"
                className={`action-button ${
                  submitButtonDisabled ? "disabled-button" : "pointer"
                }`}
                disabled={submitButtonDisabled}
                onClick={handleSubmit}
              >
                Submit Feedback
                {submitButtonDisabled && (
                  <span className="tooltip-text">
                    Please make sure you typed out more than 10 characters to be
                    able to send your feedback.
                  </span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BadReviewPage;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
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

const BadReviewPage = ({ hash, setActivePage, setUserRate }) => {
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
        console.log(data, "data");
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

  return (
    <div className="step-container negative-step">
      {isReviewed ? (
        <div className="negative-step__reviewed-header mb-2 mt-2">
          <h1 className="heading">Thank you!</h1>
        </div>
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
            <div className="tooltip">
              <button
                type="button"
                className={`negative-step__button ${
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
            <button
              type="button"
              className="negative-step__button ml-5 pointer"
              onClick={() => {
                console.log("NEGATIVE_STEP");
                // set to the first step
                setActivePage(APP_FLOW_PAGES.RATE_PAGE);
                setUserRate(INIT_USER_RATE);
              }}
            >
              Go Back
              <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BadReviewPage;

import React, { useState } from "react";
import {
  FEEDBACK_MIN_LENGTH,
  APP_FLOW_PAGES,
  INIT_USER_RATE,
  REVIEW_API,
  // BASE_URL,
} from "../../constans";
import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const BadReviewPage = ({ hash, setUserRate, resetActivePage }) => {
  const [review, setReview] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ review }),
    };

    fetch(
      `${process.env.REACT_APP_BASE_URL}${REVIEW_API}?hash=${hash}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        if (data.statusCode !== 200) {
          return errorAlert(data.error || errMsg);
        }

        setReferenceNumber(data.data.referenceNo);
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
      className={`action-button go-back-button pointer ${style || ""}`}
      onClick={() => {
        // set to the first step
        resetActivePage(APP_FLOW_PAGES.RATE_PAGE);
        setUserRate(INIT_USER_RATE);
      }}
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        className="go-back-arrow"
      >
        <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
      </svg>
      <div>Go Back</div>
    </button>
  );

  return (
    <div className="step-container negative-step">
      {isReviewed ? (
        <>
          <div className="negative-step__reviewed-header">
            {/* <h1 className="heading ml-1">Thank you!</h1> */}
            <p>
              Dear client, we received your review, our customer care team will
              investigate it. We will contact you as soon as possible.
              <br /> Your reference number is <strong>{referenceNumber}</strong>
              .
            </p>
          </div>
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
                    Please make sure you typed more than 10 characters.
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

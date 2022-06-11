import React, { useState } from "react";
import {
  FEEDBACK_MIN_LENGTH,
  APP_FLOW_PAGES,
  INIT_USER_RATE,
  REVIEW_API,
  // BASE_URL,
} from "../../constans";
// import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const BadReviewPage = ({
  hash,
  setUserRate,
  resetActivePage,
  redirectToTheClientWebsite,
}) => {
  const [review, setReview] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isReviewed, setIsReviewed] = useState(true);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ review, userAgent: navigator.userAgent }),
    };

    fetch(
      `${process.env.REACT_APP_BASE_URL}${REVIEW_API}?hash=${hash}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          redirectToTheClientWebsite(data.error);
          return;
        }

        setReferenceNumber(data.data.referenceNo);
        setIsReviewed(true);
      })
      .catch(() => {
        redirectToTheClientWebsite("Bad Review Page Error");
      });
  };

  const submitButtonDisabled = review.length < FEEDBACK_MIN_LENGTH;

  const GoBackButton = ({ style }) => (
    <>
      {/* computer screen */}
      <button
        type="button"
        className={`action-button go-back-button pointer display-sm-none  ${
          style || ""
        }`}
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
    </>
  );

  return (
    <div className="step-container negative-step">
      {isReviewed ? (
        <>
          <div className="negative-step__reviewed-header">
            <h2 className="heading pb-0 ml-1">Thank you!</h2>
            <p>
              Your opinion is important to us.
              {/* Dear client, we received your review, our customer care team will
              investigate it.
              <br /> We will contact you as soon as possible.
              <br /> Your reference number is <strong>{referenceNumber}</strong>
              . */}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="negative-step__reviewed-text">
            We're sorry to hear you didn't have a great experience with us. We
            Would really appreciate more information and your feedback so we
            could improve our service.
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
                className={`action-button submit-button  ${
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

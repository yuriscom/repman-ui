import React from "react";
import {
  ACKNOWLEDGE_RATING_API,
  // BASE_URL,
  INIT_USER_RATE,
  APP_FLOW_PAGES,
} from "../../constans";
// import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const GoodReviewPage = ({
  reviewLink,
  hash,
  resetActivePage,
  setActivePage,
  setUserRate,
  redirectToTheClientWebsite,
}) => {
  const sendAcknowledgeLinkAndRedirect = () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userAgent: navigator.userAgent }),
    };

    const url = `${process.env.REACT_APP_BASE_URL}${ACKNOWLEDGE_RATING_API}?hash=${hash}`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // const errMsg = "Something went wrong. Please try again later.";

        // if (data.data) {
        //   window.open(reviewLink);
        // } else {
        //   return errorAlert(data.error || errMsg);
        // }

        if (!data.data) {
          redirectToTheClientWebsite();
          // return errorAlert(data.error || errMsg);
        }

        // // set to the first step
        setActivePage(APP_FLOW_PAGES.RATE_PAGE);
        setUserRate(INIT_USER_RATE);
      })
      .catch((error) => {
        redirectToTheClientWebsite();
        // errorAlert(error)
      });
  };

  return (
    <div className="step-container positive-step">
      <p>
        We are so glad you had a positive experience!
        <br />
        We would appreciate it if you could share your review on Google!
        <br />
        Thank you for the feedback!
      </p>
      <h2 className="share-review-heading">Share your review!</h2>
      <a
        target="_blank"
        className="redirect-link"
        href={reviewLink}
        onClick={() => sendAcknowledgeLinkAndRedirect()}
      >
        {reviewLink}
      </a>
      <button
        type="button"
        className="action-button go-back-button pointer display-sm-none mt-1"
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
    </div>
  );
};

export default GoodReviewPage;

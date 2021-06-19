// import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ACKNOWLEDGE_RATING_API,
  BASE_URL,
  INIT_USER_RATE,
  APP_FLOW_PAGES,
} from "../../constans";
import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const GoodReviewPage = ({
  reviewLink,
  hash,
  resetActivePage,
  setActivePage,
  setUserRate,
}) => {
  const sendAcknowledgeLinkAndRedirect = () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    const url = `${BASE_URL}${ACKNOWLEDGE_RATING_API}?hash=${hash}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        // if (data.data) {
        //   window.open(reviewLink);
        // } else {
        //   return errorAlert(data.error || errMsg);
        // }

        if (!data.data) {
          return errorAlert(data.error || errMsg);
        }

        // // set to the first step
        setActivePage(APP_FLOW_PAGES.RATE_PAGE);
        setUserRate(INIT_USER_RATE);
      })
      .catch((error) => errorAlert(error));
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
        className="action-button pointer mt-2"
        onClick={() => {
          // set to the first step
          resetActivePage(APP_FLOW_PAGES.RATE_PAGE);
          setUserRate(INIT_USER_RATE);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default GoodReviewPage;

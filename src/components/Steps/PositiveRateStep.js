import React from "react";
import {
  ACKNOWLEDGE_RATING_API,
  BASE_URL,
  INIT_USER_RATE,
  RATE_STEPS,
} from "../../constans";
import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const PositiveRateStep = ({ reviewLink, hash, setActiveStep, setUserRate }) => {
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
        setActiveStep(RATE_STEPS.FIRST_STEP);
        setUserRate(INIT_USER_RATE);
      })
      .catch((error) => errorAlert(error));
  };

  return (
    <div className="step-container positive-step">
      <p>
        We are so happy you had a great experience!
        <br />
        We would appreciate it if you could share your review on Google!
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
    </div>
  );
};

export default PositiveRateStep;

import React from "react";
import {
  ACKNOWLEDGE_RATING_API,
  INIT_USER_RATE,
  APP_FLOW_PAGES,
  GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME,
} from "../../constans";
import SubmitButton from "../Common/SubmitButton";

// styles
import "./style.scss";

const GoodReviewPage = ({
  reviewLink,
  hash,
  clinicUname,
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
        if (!data.data) {
          redirectToTheClientWebsite("Good Review Page Error");
          return;
        }
        window.open(reviewLink, "_self");
        setActivePage(APP_FLOW_PAGES.RATE_PAGE);
        setUserRate(INIT_USER_RATE);
      })
      .catch(() => {
        redirectToTheClientWebsite("Good Review Page Error");
      });
  };

  return (
    <div className="step-container positive-step">
      <p className="share-review-text">
        {clinicUname
          ? GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME[clinicUname]
          : GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME.accuro}{" "}
        <br />{" "}
        {clinicUname === "cosmetic" && (
          <span className="restrictions-word"> (restrictions apply)</span>
        )}
      </p>

      <SubmitButton
        href={reviewLink}
        onSubmit={sendAcknowledgeLinkAndRedirect}
        text="Post a review"
      />
    </div>
  );
};

export default GoodReviewPage;

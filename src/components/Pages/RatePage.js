import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { STAR_RATING_API, NUMBER_OF_STARS, API_STATUS } from "../../constans";
import SubmitButton from "../Common/SubmitButton";

// styles
import "./style.scss";

const RatePage = ({
  patientName,
  userRate,
  hash,
  clinicName,
  setUserRate,
  setActivePage,
  setHash,
  redirectToTheClientWebsite,
}) => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const changeRating = () => {
    setApiStatus(API_STATUS.LOADING);
    setTimeout(() => {
      // send star rating
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          rating: userRate,
          userAgent: navigator.userAgent,
        }),
      };

      fetch(
        `${process.env.REACT_APP_BASE_URL}${STAR_RATING_API}?hash=${hash}`,
        requestOptions
      )
        .then((ratePageResult) => ratePageResult.json())
        .then((data) => {
          if (data.status !== 200) {
            // setApiStatus(API_STATUS.ERROR);
            redirectToTheClientWebsite(data.error);
            return;
          }

          // setUserRate(newUserRate);
          // setApiStatus(API_STATUS.SUCCESS);
          setHash(data.data.hash);
          setActivePage();
        })
        .catch(() => {
          // setApiStatus(API_STATUS.ERROR);
          redirectToTheClientWebsite("Change Rating Error Page");
        });
    }, 300);
  };

  return (
    <div className="step-container">
      <p className="rate-page-text">
        Hi{`${patientName ? " " : ""}${patientName}`}, thanks for visiting us at{" "}
        {clinicName}. We would love some feedback about your experience today!
      </p>
      {apiStatus === API_STATUS.LOADING ? (
        <div className="loader-container">
          <div className="loader" />
          <span className="mt-1">Please wait a moment...</span>
        </div>
      ) : (
        <>
          <StarRatings
            rating={userRate}
            starRatedColor="#f4cc1c"
            changeRating={setUserRate}
            numberOfStars={NUMBER_OF_STARS}
            starSpacing="0.3rem"
            starHoverColor="#f4cc1c"
          />
          <SubmitButton disabled={userRate === 0} onSubmit={changeRating} />
        </>
      )}
    </div>
  );
};

export default RatePage;

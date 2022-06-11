import React from "react";
import StarRatings from "react-star-ratings";
import { STAR_RATING_API, NUMBER_OF_STARS } from "../../constans";

// styles
import "./style.scss";

const RatePage = ({
  userRate,
  hash,
  setUserRate,
  setActivePage,
  setHash,
  redirectToTheClientWebsite,
  patientName,
}) => {
  const changeRating = (newUserRate) => {
    setTimeout(() => {
      // send star rating
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          rating: newUserRate,
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
            redirectToTheClientWebsite(data.error);
            return;
          }

          setUserRate(newUserRate);
          setHash(data.data.hash);
          setActivePage();
        })
        .catch(() => {
          redirectToTheClientWebsite("Change Rating Error Page");
        });
    }, 300);
  };

  return (
    <div className="step-container">
      <p className="rate-page-text">
        Hi {patientName}, thanks for visiting us at Wilderman Cosmetic Clinic.
        We would love some feedback about your experience today!
      </p>
      <StarRatings
        rating={userRate}
        starRatedColor="#f4cc1c"
        changeRating={changeRating}
        numberOfStars={NUMBER_OF_STARS}
        starSpacing="0.3rem"
        starHoverColor="#f4cc1c"
      />
    </div>
  );
};

export default RatePage;

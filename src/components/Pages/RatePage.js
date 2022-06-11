import React from "react";
import StarRatings from "react-star-ratings";
import {
  // BASE_URL,
  // DEFAULT_ERROR_MESSAGE,
  REVIEW_LINK_IDENTIFIER,
  STAR_RATING_API,
  NUMBER_OF_STARS,
} from "../../constans";
// import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const RatePage = ({
  userRate,
  hash,
  // clientWebsite,
  setUserRate,
  setActivePage,
  setHash,
  // setReviewLink,
  redirectToTheClientWebsite,
}) => {
  const identifyReviewLink = (link) =>
    decodeURIComponent(
      link.slice(
        link.lastIndexOf(REVIEW_LINK_IDENTIFIER) +
          REVIEW_LINK_IDENTIFIER.length +
          1
      )
    );

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
      <p className="description">
        We are always looking for ways to improve the quality of our products,
        services, and customer support. If you have a moment, we would
        appreciate if you could share your experience with us.
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

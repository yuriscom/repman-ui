import React from "react";
import StarRatings from "react-star-ratings";
import {
  BASE_URL,
  DEFAULT_ERROR_MESSAGE,
  RATE_STEPS,
  REVIEW_LINK_IDENTIFIER,
  STAR_RATING_API,
} from "../../constans";
import { errorAlert } from "../../utils";

// styles
import "./style.scss";

const FirstStep = ({
  userRate,
  hash,
  setUserRate,
  setActiveStep,
  setHash,
  setReviewLink,
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
    // send star rating
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ rating: newUserRate });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const url = `${BASE_URL}${STAR_RATING_API}?hash=${hash}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== 200) {
          return errorAlert(data.error || DEFAULT_ERROR_MESSAGE);
        }

        setUserRate(newUserRate);

        /* if user put more than 3 stars,
           send them to the positive rate page,
           otherwise, send them to the negative one 
        */

        const nextStep =
          newUserRate > 3
            ? RATE_STEPS.POSITIVE_RATE_STEP
            : RATE_STEPS.NEGATIVE_RATE_STEP;

        setActiveStep(nextStep);
        setHash(data.data.hash);

        setReviewLink(identifyReviewLink(data.data.reviewLink));
      })
      .catch((error) => errorAlert(error));
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
        numberOfStars={5}
        starSpacing="0.3rem"
        starHoverColor="#f4cc1c"
      />
    </div>
  );
};

export default FirstStep;

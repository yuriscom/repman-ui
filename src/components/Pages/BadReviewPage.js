import React, { useState } from "react";
import { REVIEW_API } from "../../constans";
import SubmitButton from "../Common/SubmitButton";

// styles
import "./style.scss";

const BadReviewPage = ({
  hash,
  redirectToTheClientWebsite,
  badReviewPageReviewed,
  setBadReviewPageReviewed,
}) => {
  const [review, setReview] = useState("");

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
        console.log(data, 'datadata');
        // if (data.status !== 200) {
        //   redirectToTheClientWebsite(data.error);
        //   return;
        // }

        setBadReviewPageReviewed(true);
      })
      .catch(() => {
        redirectToTheClientWebsite("Bad Review Page Error");
      });
  };

  return (
    <div className="step-container negative-step">
      {badReviewPageReviewed ? (
        <>
          <div className="negative-step__reviewed-header">
            <h2 className="heading pb-0 ml-1">Thank you!</h2>
            <p>Your opinion is important to us.</p>
          </div>
        </>
      ) : (
        <>
          <p className="negative-step__reviewed-text">
            We're sorry to hear you didn't have a great experience with us. We
            would really appreciate more information and your feedback so we
            could improve our service.
          </p>
          <textarea
            value={review}
            placeholder="Your message"
            onChange={(event) => setReview(event.target.value)}
          />
          <SubmitButton onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default BadReviewPage;

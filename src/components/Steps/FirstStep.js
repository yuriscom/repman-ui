import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { apiConstants } from "../../api/constants";

// styles
import "./style.scss";

class FirstStep extends Component {
  changeRating = (newRating) => {
    // send star rating
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ rating: newRating });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const url = `${apiConstants.BASE_URL}${apiConstants.STAR_RATING}?hash=${this.props.hash}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        if (data.statusCode !== 200) {
          const error = data.error || errMsg;
          return Promise.reject(error);
        }
        if (true) {
          this.props.setRating(newRating);
          this.props.setActiveStep(2);
          this.props.setHash(data.data.hash);
        } else {
          alert(errMsg);
        }
      });
  };

  render() {
    return (
      <div className="step-container">
        <p className="description">
          We are always looking for ways to improve the quality of our products,
          services, and customer support. If you have a moment, we would
          appreciate if you could share your experience with us.
        </p>
        <StarRatings
          rating={this.props.newRating}
          starRatedColor="#f4cc1c"
          changeRating={this.changeRating}
          numberOfStars={5}
          /* starDimension="9rem" */
          starSpacing="0.3rem"
          starHoverColor="#f4cc1c"
        />
      </div>
    );
  }
}

export default FirstStep;

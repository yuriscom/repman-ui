import React, { Component } from "react";
import { apiConstants } from "../../api/constants";
import { RECEIVE_ALERT_TEXT, FEEDBACK_MIN_LENGTH } from "../../constans";
import { confirmAlert } from "../../utils";

// styles
import "./style.scss";

class SecondStep extends Component {
  handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const tempReview = this.props.review;
    const tempHash = this.props.hash;

    const raw = JSON.stringify({ review: tempReview });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const url = `${apiConstants.BASE_URL}${apiConstants.REVIEW}?hash=${tempHash}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const errMsg = "Something went wrong. Please try again later.";

        if (data.statusCode !== 200) {
          const error = data.error || errMsg;
          return Promise.reject(error);
        }

        confirmAlert(
          `Your reference no. is ${data.data.referenceNo}`,
          RECEIVE_ALERT_TEXT
        );
        this.props.setActiveStep(3);
      });
  };

  handleChange = (e) => {
    this.props.setReview(e.target.value);
  };

  render() {
    console.log(this.props, "this.props");
    const { review } = this.props;

    const submitButtonDisabled = review.length < FEEDBACK_MIN_LENGTH;
    return (
      <div className="step-container second-step">
        <p>
          Why did you choose that score?
          <br />
          Tell us about your experience so that we could improve our services.
          Your feedback is valuable for us!
        </p>
        <textarea onChange={this.handleChange} />
        <div className="tooltip">
          <button
            type="button"
            className={`submit-button ${
              submitButtonDisabled ? "disabled-button" : "pointer"
            }`}
            disabled={submitButtonDisabled}
            onClick={this.handleSubmit}
          >
            Submit Feedback
            {submitButtonDisabled && (
              <span className="tooltip-text">
                Please make sure you typed out more than 10 characters to be
                able to send your feedback.
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default SecondStep;

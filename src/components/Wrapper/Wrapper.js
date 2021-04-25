import React, { useState, useEffect } from "react";
import { FirstStep, SecondStep, ThirdStep } from "../Steps";
import { apiConstants } from "../../api/constants";
import { errorAlert } from "../../utils";
import { useLocation } from "react-router";

// styles
import "./style.scss";

// assets
import logo from "../../assets/logo.png";

const Wrapper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [newRating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [hash, setHash] = useState();

  // const location = useLocation();

  // Get initial hash
  useEffect(() => {
    // read hash from the url
    // if (location && location.pathname) {
    //   setHash(location.pathname.slice(1));
    // }

    /* TEST */
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ phoneNumber: apiConstants.PHONE_NUMBER });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const url = `${apiConstants.BASE_URL}${apiConstants.TEST_HASH}`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== 200) {
          return errorAlert(data.error);
        } else {
          // set state hash variable
          setHash(data.data.hash);
        }
      })
      .catch((error) => errorAlert(error));
  }, []);
  // Get initial hash

  let activeStepComponent = (
    <FirstStep
      newRating={newRating}
      hash={hash}
      setRating={setRating}
      setActiveStep={setActiveStep}
      setReviewLink={setReviewLink}
      setHash={setHash}
    />
  );

  switch (activeStep) {
    case 1:
      activeStepComponent = (
        <FirstStep
          newRating={newRating}
          setRating={setRating}
          setActiveStep={setActiveStep}
          hash={hash}
          setReviewLink={setReviewLink}
          setHash={setHash}
        />
      );
      break;
    case 2:
      activeStepComponent = (
        <SecondStep
          review={review}
          setReview={setReview}
          setActiveStep={setActiveStep}
          hash={hash}
        />
      );
      break;
    case 3:
      activeStepComponent = <ThirdStep reviewLink={reviewLink} />;
      break;
    default:
      activeStepComponent = (
        <FirstStep
          newRating={newRating}
          setRating={setRating}
          setActiveStep={setActiveStep}
          hash={hash}
          setReviewLink={setReviewLink}
          setHash={setHash}
        />
      );
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="heading-container">
          <h1 className="heading">Please Rate Us</h1>
        </div>
        {/* Review Container */}
        <div className="review-container">
          <div className="review-component">
            <div className="logo-container">
              <img src={logo} alt="logo" />
            </div>
            <div className="interaction">{activeStepComponent}</div>
            <div className="website">
              <a href="https://drwilderman.com/" target="blank">
                <button type="button" className="pink-button pointer">
                  Visit Our Website
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content-container">
          <p className="text">
            8054 Yonge Street, Thornhill, ON L4J 1W3, Canada <br /> Mon - Fri:
            9:00am - 7:00pm
          </p>
          <p className="text">
            Mon - Fri: 9:00am - 7:00pm
            <br />
            +1 (807) 770-1743
          </p>
          <a href="https://drwilderman.com/request-appointment/" target="blank">
            <button type="button" className="navy-button pointer">
              Schedule Appointment
            </button>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Wrapper;

import React, { useState, useEffect } from "react";
import { FirstStep, NegativeRateStep, PositiveRateStep } from "../Steps";
// import { errorAlert } from "../../utils";
import { useLocation } from "react-router";
import { INIT_USER_RATE, RATE_STEPS } from "../../constans";

// styles
import "./style.scss";

// assets
import logo from "../../assets/logo.png";

const Wrapper = () => {
  const [activeStep, setActiveStep] = useState(RATE_STEPS.FIRST_STEP);
  const [userRate, setUserRate] = useState(INIT_USER_RATE);
  const [reviewLink, setReviewLink] = useState("");
  const [hash, setHash] = useState();

  const location = useLocation();

  // Get initial hash
  useEffect(() => {
    // read hash from the url
    if (location && location.pathname) {
      setHash(location.pathname.slice(1));
    }
    /* TEST */
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({ phoneNumber: process.env.REACT_APP_TEST_PHONE_NUMBER });
    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    // };
    // const url = `${BASE_URL}${TEST_HASH_API}`;
    // fetch(url, requestOptions)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.statusCode !== 200) {
    //       return errorAlert(data.error);
    //     } else {
    //       // set state hash variable
    //       setHash(data.data.hash);
    //     }
    //   })
    //   .catch((error) => errorAlert(error));
  }, []);

  const identifyActiveStepComponent = () => {
    switch (activeStep) {
      case RATE_STEPS.FIRST_STEP:
        return (
          <FirstStep
            userRate={userRate}
            hash={hash}
            setUserRate={setUserRate}
            setActiveStep={setActiveStep}
            setReviewLink={setReviewLink}
            setHash={setHash}
          />
        );

      case RATE_STEPS.NEGATIVE_RATE_STEP:
        return (
          <NegativeRateStep
            hash={hash}
            setActiveStep={setActiveStep}
            setUserRate={setUserRate}
          />
        );

      case RATE_STEPS.POSITIVE_RATE_STEP:
        return (
          <PositiveRateStep
            reviewLink={reviewLink}
            hash={hash}
            userRate={userRate}
            setActiveStep={setActiveStep}
            setUserRate={setUserRate}
          />
        );

      default:
        return (
          <FirstStep
            userRate={userRate}
            hash={hash}
            setUserRate={setUserRate}
            setActiveStep={setActiveStep}
            setReviewLink={setReviewLink}
            setHash={setHash}
          />
        );
    }
  };

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
            <div className="interaction">{identifyActiveStepComponent()}</div>
            <div className="website">
              <a href="https://drwilderman.com/" target="_blank">
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
          <a
            href="https://drwilderman.com/request-appointment/"
            target="_blank"
          >
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

import React, { useState, useEffect } from "react";
import { RatePage, BadReviewPage, GoodReviewPage } from "../Pages";
import { useLocation } from "react-router";
import {
  // BASE_URL,
  CLIENT_WEBSITE_LINK,
  INIT_USER_RATE,
  APP_FLOW_PAGES,
  STEP_API,
  APPOINTMENT_LINK,
  DEBUG_LINK,
} from "../../constans";

// styles
import "./style.scss";

// assets
import logo from "../../assets/logo.png";

const Wrapper = () => {
  const [activePage, setActivePage] = useState(APP_FLOW_PAGES.RATE_PAGE);
  const [userRate, setUserRate] = useState(INIT_USER_RATE);
  const [reviewLink, setReviewLink] = useState("");
  const [hash, setHash] = useState();
  const [clientWebsite, setClientWebsite] = useState();

  const location = useLocation();

  const redirectToTheClientWebsite = () => window.open(clientWebsite, "_self");

  const resetActivePage = () => setActivePage(APP_FLOW_PAGES.RATE_PAGE);

  const validateHash = (hash) =>
    fetch(`${process.env.REACT_APP_BASE_URL}${STEP_API}?hash=${hash}`, {
      method: "GET",
    }).then((res) => res.json());

  // Get link to client website
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}${CLIENT_WEBSITE_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(({ data: { website } }) => setClientWebsite(website));
  }, []);

  // Get initial hash
  useEffect(() => {
    if (
      location?.pathname &&
      location.pathname !== DEBUG_LINK &&
      clientWebsite
    ) {
      const hash = location.pathname.slice(1);

      if (hash !== "") {
        setHash(hash);
        validateHash(hash).then(({ statusCode, error, data: { step } }) => {
          if (statusCode !== 200) {
            return redirectToTheClientWebsite();
          }
          setActivePage(step);
        });
      } else {
        return redirectToTheClientWebsite();
      }
    }
  }, [clientWebsite]);

  const handleActivePage = () => {
    // validate hash first
    validateHash(hash).then(({ statusCode, data: { step } }) => {
      if (statusCode !== 200) {
        return redirectToTheClientWebsite();
      }
      setActivePage(step);
    });
  };

  const identifyActivePageComponent = () => {
    switch (activePage) {
      case APP_FLOW_PAGES.RATE_PAGE:
        return (
          <RatePage
            userRate={userRate}
            hash={hash}
            clientWebsite={clientWebsite}
            setUserRate={setUserRate}
            setActivePage={handleActivePage}
            setReviewLink={setReviewLink}
            setHash={setHash}
          />
        );

      case APP_FLOW_PAGES.BAD_REVIEW_PAGE:
        return (
          <BadReviewPage
            hash={hash}
            clientWebsite={clientWebsite}
            setActivePage={handleActivePage}
            setUserRate={setUserRate}
            resetActivePage={resetActivePage}
          />
        );

      case APP_FLOW_PAGES.SHARE_GOOD_REVIEW_PAGE:
        return (
          <GoodReviewPage
            reviewLink={reviewLink}
            hash={hash}
            userRate={userRate}
            clientWebsite={clientWebsite}
            setActivePage={handleActivePage}
            setUserRate={setUserRate}
            resetActivePage={resetActivePage}
          />
        );

      default:
        return (
          <RatePage
            userRate={userRate}
            hash={hash}
            clientWebsite={clientWebsite}
            setUserRate={setUserRate}
            setActivePage={setActivePage}
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
          <h1 className="heading uppercase">Please Rate Us</h1>
        </div>
        {/* Review Container */}
        <div className="review-container">
          <div className="review-component">
            <div className="logo-container">
              <img src={logo} alt="logo" />
            </div>
            <div className="interaction">{identifyActivePageComponent()}</div>
            <div className="website">
              {activePage !== APP_FLOW_PAGES.RATE_PAGE ? (
                <>
                  {/* <button
                  className="go-back-button-sm-screen"
                  onClick={() => {
                    // set to the first step
                    resetActivePage(APP_FLOW_PAGES.RATE_PAGE);
                    setUserRate(INIT_USER_RATE);
                  }}
                > */}
                  {/* <svg
                    width="44"
                    height="40"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="43"
                      height="43"
                      rx="21.5"
                      fill="#F8EBEA"
                      stroke="#D4D1D1"
                    />
                    <path
                      d="M26 21.4949V22.5051H19.9394L22.7172 25.2828L22 26L18 22L22 18L22.7172 18.7172L19.9394 21.4949H26Z"
                      fill="#6B7086"
                    />
                  </svg> */}
                  {/* Back */}
                  <svg
                    type="button"
                    width="44"
                    height="44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="go-back-button-sm-screen"
                    onClick={() => {
                      // set to the first step
                      resetActivePage(APP_FLOW_PAGES.RATE_PAGE);
                      setUserRate(INIT_USER_RATE);
                    }}
                  >
                    <rect
                      x=".5"
                      y=".5"
                      width="43"
                      height="43"
                      rx="21.5"
                      fill="#F8EBEA"
                      stroke="#D4D1D1"
                    />
                    <path
                      d="M26 21.495v1.01h-6.06l2.777 2.778L22 26l-4-4 4-4 .717.717-2.778 2.778H26z"
                      fill="#6B7086"
                    />
                  </svg>
                  {/* </button> */}
                </>
              ) : null}
              <a href={clientWebsite}>
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
          <a href={`${clientWebsite}${APPOINTMENT_LINK}`} target="_blank">
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

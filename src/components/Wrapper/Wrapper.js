import React, { useState, useEffect } from "react";
import { RatePage, BadReviewPage, GoodReviewPage } from "../Pages";
import { useLocation } from "react-router";
import * as Sentry from "@sentry/react";
import {
  // BASE_URL,
  INIT_USER_RATE,
  APP_FLOW_PAGES,
  STEP_API,
  APPOINTMENT_LINK,
  DEBUG_LINK,
  REVIEW_LINK_IDENTIFIER,
} from "../../constans";

// styles
import "./style.scss";

// assets
import defaultLogo from "../../assets/logo.png";
import { detectMobile } from "../../utils";

const Wrapper = () => {
  const [activePage, setActivePage] = useState(APP_FLOW_PAGES.RATE_PAGE);
  const [userRate, setUserRate] = useState(INIT_USER_RATE);
  const [reviewLink, setReviewLink] = useState("");
  const [hash, setHash] = useState();
  const [clientWebsite, setClientWebsite] = useState();
  const [stepIdentified, setStepIdentified] = useState(false);
  const [logoPath, setLogoPath] = useState();

  const location = useLocation();

  const redirectToTheClientWebsite = (error, link = undefined) => {
    const errorMsg = error || "Hash is invalid";
    // Sentry.captureMessage(errorMsg);
    sendError(errorMsg).then(() => window.open(link || clientWebsite, "_self"));
    window.open(clientWebsite, "_self");
  };

  const resetActivePage = () => setActivePage(APP_FLOW_PAGES.RATE_PAGE);

  const validateHash = (hash) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userAgent: navigator.userAgent }),
    };

    return fetch(
      `${process.env.REACT_APP_BASE_URL}${STEP_API}?hash=${hash}`,
      requestOptions
    )
      .then((res) => res.json())
      .catch((error) => error);
  };

  // Get link to client website
  useEffect(() => {
    if (location.pathname === DEBUG_LINK) {
      setStepIdentified(true);
      setLogoPath(defaultLogo);
    }
  }, []);

  // Get initial hash
  useEffect(() => {
    if (location?.pathname && location.pathname !== DEBUG_LINK) {
      const containsSlash = location.pathname.slice(1).lastIndexOf("/");

      const hash = location.pathname.slice(
        1,
        containsSlash === -1 ? location.length : containsSlash
      );

      if (hash !== "") {
        setHash(hash);
        validateHash(hash)
          .then(({ status, error, data }) => {
            const {
              step,
              forwardToUrl,

              clientDetails: {
                website,
                linkGoogleDesktop,
                linkGoogleMobile,
                logo,
              },
            } = data;

            if (status !== 200) {
              return redirectToTheClientWebsite(null, website);
            }

            // set Logo image
            setLogoPath(
              logo
                ? `https://reviewclever.com/static/media/${logo}`
                : defaultLogo
            );
            // if we get this link right onload, we have to redirect a user
            if (data[REVIEW_LINK_IDENTIFIER]) {
              setReviewLink(data[REVIEW_LINK_IDENTIFIER]);
              window.open(data[REVIEW_LINK_IDENTIFIER], "_self");
            } else {
              setStepIdentified(true);
            }

            // set review link
            if (detectMobile()) {
              setReviewLink(linkGoogleMobile);
            } else {
              setReviewLink(linkGoogleDesktop);
            }

            setClientWebsite(website);
            setActivePage(step);
          })
          .catch((error) => redirectToTheClientWebsite(error));
      } else {
        return redirectToTheClientWebsite();
      }
    }
  }, []);

  const handleActivePage = () => {
    // validate hash first
    validateHash(hash).then(({ status, data }) => {
      const { step } = data;

      if (status !== 200) {
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
            redirectToTheClientWebsite={redirectToTheClientWebsite}
          />
        );

      case APP_FLOW_PAGES.BAD_REVIEW_PAGE:
      case APP_FLOW_PAGES.CLAIM_REFERENCE_PAGE:
        return (
          <BadReviewPage
            hash={hash}
            clientWebsite={clientWebsite}
            setActivePage={handleActivePage}
            setUserRate={setUserRate}
            resetActivePage={resetActivePage}
            redirectToTheClientWebsite={redirectToTheClientWebsite}
          />
        );

      case APP_FLOW_PAGES.SHARE_GOOD_REVIEW_PAGE:
      case APP_FLOW_PAGES.THANKYOU_PAGE:
        return (
          <GoodReviewPage
            reviewLink={reviewLink}
            hash={hash}
            userRate={userRate}
            clientWebsite={clientWebsite}
            setActivePage={handleActivePage}
            setUserRate={setUserRate}
            resetActivePage={resetActivePage}
            redirectToTheClientWebsite={redirectToTheClientWebsite}
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

  return stepIdentified ? (
    <>
      <div className="page-wrapper">
        <div className="heading-container">
          <h1 className="heading uppercase">Please Rate Us</h1>
        </div>
        {/* Review Container */}
        <div className="review-container">
          <div className="review-component">
            <div className="logo-container">
              <img src={logoPath} alt="logo" />
            </div>
            <div className="interaction">{identifyActivePageComponent()}</div>
            <div
              className="website"
              style={{
                left: activePage !== APP_FLOW_PAGES.RATE_PAGE ? "-22px" : "0",
              }}
            >
              {activePage !== APP_FLOW_PAGES.RATE_PAGE ? (
                <>
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
                      height="40"
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
  ) : null;
};

export default Wrapper;

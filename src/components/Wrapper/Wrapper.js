import React, { useState, useEffect } from "react";
import { RatePage, BadReviewPage, GoodReviewPage } from "../Pages";
import { useLocation } from "react-router";
import {
  BASE_URL,
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

  const validateHash = (hash) =>
    fetch(`${BASE_URL}${STEP_API}?hash=${hash}`, {
      method: "GET",
    }).then((res) => res.json());

  // Get link to client website
  useEffect(() => {
    fetch(`${BASE_URL}${CLIENT_WEBSITE_LINK}`, {
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
    console.log("HANDLE _ACTIVE_PAGE");
    // validate hash first
    validateHash(hash).then(({ statusCode, data: { step } }) => {
      if (statusCode !== 200) {
        return redirectToTheClientWebsite();
      }
      setActivePage(step);
    });
  };

  console.log(activePage, "activePage");
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

import React, { useState, useEffect } from "react";
import { RatePage, BadReviewPage, GoodReviewPage } from "../Pages";
import { useLocation } from "react-router";
import * as Sentry from "@sentry/react";
import {
  INIT_USER_RATE,
  APP_FLOW_PAGES,
  STEP_API,
  APPOINTMENT_LINK,
  DEBUG_LINK,
  REVIEW_LINK_IDENTIFIER,
} from "../../constans";
import { detectMobile, getFloorFromAddress } from "../../utils";

// styles
import "./style.scss";

// assets
// import defaultLogo from "../../assets/logo.bc3311f1.png";
import defaultLogo from "../../assets/logo.aic331132.png";

const Wrapper = () => {
  const [activePage, setActivePage] = useState(APP_FLOW_PAGES.RATE_PAGE);
  const [userRate, setUserRate] = useState(INIT_USER_RATE);
  const [reviewLink, setReviewLink] = useState("");
  const [hash, setHash] = useState();
  const [clientWebsite, setClientWebsite] = useState();
  const [clinicUname, setClinicUname] = useState();
  const [clinicName, setClinicName] = useState();
  const [stepIdentified, setStepIdentified] = useState(false);
  const [logoPath, setLogoPath] = useState();
  const [patientName, setPatientName] = useState("");
  const [badReviewPageReviewed, setBadReviewPageReviewed] = useState(false);
  const [clinicPhone, setClinicPhone] = useState();
  const [clinicAddress, setClinicAddress] = useState();
  const [clinicFloor, setClinicFloor] = useState();

  const location = useLocation();

  const redirectToTheClientWebsite = (error, link = clientWebsite) => {
    const errorMsg = error || "Hash is invalid";
    Sentry.captureMessage(errorMsg);
    window.open(link, "_self");
  };

  const validateHash = async (hash) => {
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
          .then(({ status, data }) => {
            const {
              step,
              clientDetails: {
                website,
                linkGoogleDesktop,
                linkGoogleMobile,
                logo,
                uname,
                name,
                additionalDetails: { phone, address },
              },
              patientDetails: { fullname },
            } = data;
            if (status !== 200) {
              return redirectToTheClientWebsite(data?.error, website);
            }

            // set Logo image
            setLogoPath(
              logo
                ? `https://reviewclever.com/static/media/${logo}`
                : defaultLogo
            );

            const { modifiedAddress, floorInfo } = getFloorFromAddress(address);

            setClinicAddress(modifiedAddress);
            setClinicFloor(floorInfo);
            setClinicPhone(phone);
            setClinicUname(uname);
            setClinicName(name);

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

            setPatientName(fullname);
            setClientWebsite(website);
            setActivePage(step);
            // it's reviewed if page is equal to claim reference page
            setBadReviewPageReviewed(
              step === APP_FLOW_PAGES.CLAIM_REFERENCE_PAGE
            );
          })
          .catch((error) => redirectToTheClientWebsite(error.message));
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
        return redirectToTheClientWebsite(data?.error);
      }
      setActivePage(step);
    });
  };

  const RatePageWithProps = () => (
    <RatePage
      patientName={patientName}
      userRate={userRate}
      hash={hash}
      clinicName={clinicName}
      setUserRate={setUserRate}
      setActivePage={handleActivePage}
      setHash={setHash}
      redirectToTheClientWebsite={redirectToTheClientWebsite}
    />
  );

  const identifyActivePageComponent = () => {
    switch (activePage) {
      case APP_FLOW_PAGES.RATE_PAGE:
        return <RatePageWithProps />;

      case APP_FLOW_PAGES.BAD_REVIEW_PAGE:
      case APP_FLOW_PAGES.CLAIM_REFERENCE_PAGE:
        return (
          <BadReviewPage
            hash={hash}
            clientWebsite={clientWebsite}
            redirectToTheClientWebsite={redirectToTheClientWebsite}
            badReviewPageReviewed={badReviewPageReviewed}
            setBadReviewPageReviewed={setBadReviewPageReviewed}
          />
        );

      case APP_FLOW_PAGES.SHARE_GOOD_REVIEW_PAGE:
      case APP_FLOW_PAGES.THANKYOU_PAGE:
        return (
          <GoodReviewPage
            reviewLink={reviewLink}
            clinicUname={clinicUname}
            hash={hash}
            setActivePage={handleActivePage}
            setUserRate={setUserRate}
            redirectToTheClientWebsite={redirectToTheClientWebsite}
          />
        );

      default:
        return <RatePageWithProps />;
    }
  };

  return stepIdentified ? (
    <div className={`${clinicUname}-container`}>
      <div className="logo-container">
        {activePage !== APP_FLOW_PAGES.RATE_PAGE && !badReviewPageReviewed && (
          <>
            <button
              className="arrow-left"
              onClick={() => setActivePage(APP_FLOW_PAGES.RATE_PAGE)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7.881"
                height="14.348"
                viewBox="0 0 7.881 14.348"
              >
                <path
                  id="Path_29"
                  data-name="Path 29"
                  d="M576.728,27.344l-6.82,6.82,6.82,6.82"
                  transform="translate(-569.2 -26.99)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="1"
                />
              </svg>
            </button>
          </>
        )}
        <img src={logoPath} alt="logo" />
      </div>
      <div className="page-wrapper">
        <div className="review-container">
          <div className="review-component">
            {(activePage === APP_FLOW_PAGES.BAD_REVIEW_PAGE ||
              activePage === APP_FLOW_PAGES.CLAIM_REFERENCE_PAGE) &&
            badReviewPageReviewed ? null : (
              <div className="heading-container">
                <h1 className="heading">Please Rate Us</h1>
              </div>
            )}
            <div className="interaction">{identifyActivePageComponent()}</div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content-container">
          <p className="text">
            <span className="footer-address">
              {clinicAddress} <br />
            </span>
            {clinicFloor}
          </p>
          <p className="text">
            <span className="footer-time">
              Mon - Fri: 9:00am - 7:00pm
              <br />
            </span>

            <span className="footer-number">
              <a
                href={`tel:${clinicPhone}`}
                aria-label={clinicPhone ? clinicPhone.split("").join(" ") : ""}
              >
                {clinicPhone}
              </a>
            </span>
          </p>
          <a
            href={`${clientWebsite}${APPOINTMENT_LINK}`}
            target="_blank"
            className="footer-schedule-appt-button"
          >
            <button
              type="button"
              className="schedule-appointment-button pointer"
            >
              Schedule Appointment
            </button>
          </a>
        </div>
      </footer>
    </div>
  ) : null;
};

export default Wrapper;

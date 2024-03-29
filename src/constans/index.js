/* Constants that are shared across app */

/* API */
export const CLIENT_WEBSITE_LINK = "/client";
export const STAR_RATING_API = "/rating";
export const REVIEW_API = "/rating/review";
export const ACKNOWLEDGE_RATING_API = "/rating/ack";
export const TEST_HASH_API = "/test/patient";
export const STEP_API = "/step";
export const APPOINTMENT_LINK = "/contact/#bookappointment";
export const DEBUG_LINK = "/home";
/* Components */
export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong. Please try again later.";

export const RECEIVE_ALERT_TEXT =
  "We have received your review and we're looking into it!";

export const INIT_USER_RATE = 0;
export const FEEDBACK_MIN_LENGTH = 10;
export const NUMBER_OF_STARS = 5;
// export const REVIEW_LINK_IDENTIFIER = "redirectTo";
export const REVIEW_LINK_IDENTIFIER = "forwardToUrl";

export const APP_FLOW_PAGES = {
  RATE_PAGE: "RATE_PAGE",
  BAD_REVIEW_PAGE: "BAD_REVIEW_PAGE",
  THANKYOU_PAGE: "THANKYOU_PAGE",
  SHARE_GOOD_REVIEW_PAGE: "SHARE_GOOD_REVIEW_PAGE",
  FORWARD: "FORWARD",
  CLAIM_REFERENCE_PAGE: "CLAIM_REFERENCE_PAGE",
};

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME = {
  accuro: `Thank you for your feedback, we are so happy you enjoyed your visit.
          Please share this on Google reviews.`,

  cosmetic: `Thank you for your feedback, we are so happy you enjoyed your visit.
  Please share this on Google reviews to receive 100 reward points,
  redeemable at our clinic.
  `,
};

GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME.imaging =
  GOOD_REVIEW_CONTENT_BY_CLINIC_UNAME.accuro;

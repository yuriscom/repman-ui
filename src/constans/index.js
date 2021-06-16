/* Constants that are shared across app */

/* API */
// export const BASE_URL =
//   "http://ec2-18-207-112-127.compute-1.amazonaws.com:8080";
export const BASE_URL =
  "http://ec2-18-207-112-127.compute-1.amazonaws.com:8080";
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
export const REVIEW_LINK_IDENTIFIER = "redirectTo";

export const APP_FLOW_PAGES = {
  RATE_PAGE: "RATE_PAGE",
  BAD_REVIEW_PAGE: "BAD_REVIEW_PAGE",
  SHARE_GOOD_REVIEW_PAGE: "SHARE_GOOD_REVIEW_PAGE",
};

export const ALERT_PROCESSING_TIME = 25000;

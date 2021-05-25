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

/* Components */
export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong. Please try again later.";

export const RECEIVE_ALERT_TEXT =
  "We have received your review and we're looking into it!";

export const INIT_USER_RATE = 0;
export const FEEDBACK_MIN_LENGTH = 10;
export const REVIEW_LINK_IDENTIFIER = "redirectTo";

export const RATE_STEPS = {
  FIRST_STEP: "FIRST_STEP",
  NEGATIVE_RATE_STEP: "NEGATIVE_RATE_STEP",
  POSITIVE_RATE_STEP: "POSITIVE_RATE_STEP",
};

export const ALERT_PROCESSING_TIME = 5000;

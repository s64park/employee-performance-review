/**
 * Created by Terry on 2016-12-20.
 */
const ratingTransformer = (rating) => {
    switch (rating) {
        case "O":
            return "Outstanding";
        case "E":
            return "Exceeds Expectation";
        case "M":
            return "Meets Expectation";
        case "NI":
            return "Needs Improvement";
        case "U":
            return "Unsatisfactory";
        case "NA":
            return "Not Applicable";
        default:
            return "";
    }
};

export default ratingTransformer;
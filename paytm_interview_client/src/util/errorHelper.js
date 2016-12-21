/**
 * Created by Terry on 2016-12-20.
 */
const errorHelper = (err) => {
    if(err.response.data.error) {
        toastr.error(`Error: ${err.response.data.error}`);
    }
    localStorage.clear();
};

export default errorHelper;

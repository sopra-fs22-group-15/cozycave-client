export const queryStringBuilder = (params) => {
    // if null or 0 dont add to query string and begin with ?

    const queryString = Object.keys(params)
        .filter(key => params[key] !== null && params[key] !== 0 && params[key] !== '')
        .map(key => {
            if(key === "AVAILABLE_TO" && params[key] === "both"){
                return `${key}=${""}`
            } else {
                return `${key}=${params[key]}`
            }
        })
        .join('&');

    return queryString.length > 0 ? `?${queryString}` : '';
};
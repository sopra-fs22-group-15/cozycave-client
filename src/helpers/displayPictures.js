export const displayPictures = (pictures) => {
    if (!pictures || pictures.length === 0) {
        return "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";
    } else {
        return pictures[0].picture_url;
    }
}
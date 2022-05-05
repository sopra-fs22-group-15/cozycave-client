export const displayPictures = (pictures) => {
    if (pictures == null) {
        return "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";
    } else {
        return pictures[0];
    }
}
export const decideGender = (gender) => {
    if (gender.length >= 3) {
        return (
            "Any"
        )
    } else if (gender[0] === "FEMALE") {
        return (
            "Female"
        )

    } else {
        return (
            "Male"
        )
    }
};
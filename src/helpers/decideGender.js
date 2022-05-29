export const decideGender = (gender) => {
// TODO: Upadte with correct gender
    if (gender===null){
        return (
            "Any"
        )
    }
    else if (gender.length > 2) {
        return (
            "Any"
        )
    } else {
        let decision = ""
        gender.map(item => {
            decision = `${item[0] + item.slice(1,).toLowerCase()}` + " " + decision
        })
        decision.split(" ")
        return decision;
    }
};
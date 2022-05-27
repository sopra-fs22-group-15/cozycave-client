import React from "react";

export const getGenderOptions = gender => {
    if (gender === "MALE") {
        return (
            <>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
            </>
        )

    } else if (gender === "FEMALE") {
        return (
            <>
                <option value="MALE">MALE</option>
                <option value="OTHER">OTHER</option>
            </>
        )
    } else if (gender === "OTHER") {
        return (
            <>
                <option value="FEMALE">FEMALE</option>
                <option value="MALE">MALE</option>
            </>
        )
    }
}
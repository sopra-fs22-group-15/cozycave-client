import React from "react";

export const getGenderOptions = gender => {
    if (gender === "MALE") {
        return (
            <>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER NOT TO SAY">Prefer not to say</option>
            </>
        )

    } else if (gender === "FEMALE") {
        return (
            <>
                <option value="MALE">Male</option>
                <option value="OTHER">Other</option>
                <option value="PREFER NOT TO SAY">Prefer not to say</option>
            </>
        )
    } else if (gender === "OTHER") {
        return (
            <>
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="PREFER NOT TO SAY">Prefer not to say</option>
            </>
        )
    }
}
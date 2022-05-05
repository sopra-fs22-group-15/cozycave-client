import Address from "../schemas/Address";

export const addressCreator = (streetName, houseNr, postalCode, city) => {
    const address = new Address()
    address.streetName = streetName;
    address.houseNr = houseNr;
    address.zip_code = postalCode;
    address.city = city;
    address.country = "Switzerland";

    return address;
};
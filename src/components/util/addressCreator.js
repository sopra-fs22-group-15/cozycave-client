import Address from "../schemas/Address";

export const addressCreator = (streetName, houseNr, postalCode, city) => {
    const address = new Address()
    address.streetName = streetName;
    address.houseNr = houseNr;
    address.postalcode = postalCode;
    address.city = city;

    return address;
};
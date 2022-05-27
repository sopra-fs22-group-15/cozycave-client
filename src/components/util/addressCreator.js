import Address from "../schemas/Address";

export const addressCreator = (street, house_number, city, zip_code, state, apartment_number=null, name=null) => {
    const address = new Address()
    address.street = street;
    address.name = name;
    address.house_number = house_number;
    address.zip_code = zip_code;
    address.city = city;
    address.state = state
    // TODO add rest of address fields
    address.country = "Switzerland";

    return address;
};
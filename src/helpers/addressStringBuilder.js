export const addressStringBuilder = (address) => {
  if (address !== null) {
    const { street, house_number, city, zip_code } = address;
    return `${street} ${house_number}, ${zip_code} ${city}`;
  } else {
    return "No address available."
  }
}
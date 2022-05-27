export const priceRangeStringBuilder = (minPrice, maxPrice) =>{
    if(maxPrice === ""){
        maxPrice = 0;
    }
    if(minPrice === ""){
        minPrice = 0;
    }

    if(minPrice === maxPrice){
        return `CHF${minPrice}`;
    }
    if(minPrice === 0){
        return `up to CHF ${maxPrice}`;
    }
    if(maxPrice === 0){
        return `from CHF ${minPrice}`;
    } else if (minPrice !== 0 && maxPrice !== 0){
        return `CHF ${minPrice} - ${maxPrice}`;
    }

}
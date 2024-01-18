 
 const rgb_to_hex  = (r, g, b)  => {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const hexR = toHex(r);
    const hexG = toHex(g);
    const hexB = toHex(b);

    return `#${hexR}${hexG}${hexB}`;
}

const convert_decimal_to_rgba_value = (value = .5) => {
    // convert to 255 rgba value and be sure to round to the nearest whole number
    return Math.round(value * 255);

}

  const color_and_opacity_converter =  (color, opacity) =>  {
    
 
     
    const { r, g, b } = color;
    const red = convert_decimal_to_rgba_value(r);
    const green = convert_decimal_to_rgba_value(g);
    const blue = convert_decimal_to_rgba_value(b);

     
    if(+opacity === 1){
        let hex =  rgb_to_hex(red, green, blue);
        return hex;
    } else {
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    }
  
    

}


// export colorAndOpacityConverter and rgb_to_hex
module.exports=  { color_and_opacity_converter, rgb_to_hex, convert_decimal_to_rgba_value }
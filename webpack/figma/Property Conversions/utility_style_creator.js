 import { color_and_opacity_converter } from "../utils/colors/color_capacity_converter";
export default class utiltiy_style_creator {
    constructor(node, css_to_be_processed) {
        this.node = node;
        this.css_to_be_processed = css_to_be_processed;
       
    }
    generate() {
        let functions_to_be_called = [
            this.createRadiusStyle.bind(this),
           
            this.createBorderStyle.bind(this),
            this.createOpacityStyles.bind(this),
            this.createRotationStyle.bind(this),
            this.createDropshadowStyle.bind(this),

        ];
    
        functions_to_be_called.forEach((func) => {
            let returned_object = (func && func()) || null;
            if (returned_object) {
                 let keys = Object.keys(returned_object);
                keys.forEach(key => {
                    this.css_to_be_processed.base[key] = returned_object[key];
            }
                );
            }
        });
    }
    
    createRadiusStyle() {
        const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } = this.node || null;
        if(!topLeftRadius && !topRightRadius && !bottomRightRadius && !bottomLeftRadius) return;
        // if all zeros return
        if(topLeftRadius === 0 && topRightRadius === 0 && bottomRightRadius === 0 && bottomLeftRadius === 0) return;

        return {
            ['border-radius']: `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`,
        };
    }

    createPaddingStyle() {
        const { paddingTop, paddingRight, paddingBottom, paddingLeft } = this.node || null;
        if(!paddingTop && !paddingRight && !paddingBottom && !paddingLeft) return;
        // if all zeros return
        
        return {
            padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        };
    }

    createBorderStyle() {
        
        const { strokes, 
            strokeTopWeight, 
            strokeRightWeight,
            strokeBottomWeight,
            strokeLeftWeight,
        } = this.node || null;
        if(!strokes) return;
        const stroke = strokes && strokes[0];
     

        if (!stroke) {
            return null; // No strokes provided
        }

        const { color, opacity } = stroke;
   
        const roundedOpacity = opacity.toFixed(2);

        const rgbaColor = color_and_opacity_converter(color, roundedOpacity);
          let weight; 
        if(strokeTopWeight === strokeRightWeight && strokeTopWeight === strokeBottomWeight && strokeTopWeight === strokeLeftWeight){
            weight = `${strokeTopWeight}px`;
        } else {
            weight = `${strokeTopWeight}px ${strokeRightWeight}px ${strokeBottomWeight}px ${strokeLeftWeight}px`;
        }

        return {
            border: `${weight}  solid ${rgbaColor}`,
          
        };
    }

    createOpacityStyles() {
        const { opacity } = this.node || null;
        if(!opacity) return;
        
        const dividedBy100 = opacity;
        const roundedOpacity = dividedBy100.toFixed(2);
            
        return {
            opacity: `${roundedOpacity}`,
        };
    }

    createRotationStyle() {
        const { rotation } = this.node || null  ;
        let rotationValue = rotation;
        // fixc to 2 
        if(!rotationValue) return;
        rotationValue = rotationValue.toFixed(2);
        return {
            transform: `rotate(${rotationValue || 0}deg)`,
        };
    }

    createDropshadowStyle() {
        const { effects } = this.node || null;
        if(!effects) return;
        const dropShadowEffect = effects && effects.find(effect => effect.type === "DROP_SHADOW");

        if (!dropShadowEffect) {
            return null;
        }

        const { color, offset, radius, spread } = dropShadowEffect;
        let new_color = {
            r: color.r,
            g: color.g,
            b: color.b,
            
        }
        let new_opacity = color.a;
        const roundedOpacity = new_opacity.toFixed(2);
        const rgbaColor = color_and_opacity_converter(new_color, roundedOpacity);
        const boxShadowValue = `${offset.x}px ${offset.y}px ${radius}px ${spread}px  ${rgbaColor}`;

        return {
             ['box-shadow']: boxShadowValue,
        };
    }
}

 
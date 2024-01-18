import { color_and_opacity_converter,convert_decimal_to_rgba_value } from "../utils/colors/color_capacity_converter";



 

export default class create_fill_style {
    constructor(node, process_array, isText = false) {
        this.figmaLayers =  node.fills;
        // get first three 
        this.figmaLayers = this.figmaLayers.slice(0, 3);
        this.process_array = process_array;
        this.isText = isText;
       
        this.colorAndOpacityConverter = color_and_opacity_converter;
        this.convert_decimal_to_rgba_value = convert_decimal_to_rgba_value;

         
    }

    fillSelection(){
        if(this.isText){
            this.textColorCss();
        } else {
            this.figmaLayersToBackgroundCSS();
        }
    }

    textColorCss() {
        let color = this.colorAndOpacityConverter(
            this.figmaLayers[0].color,
            this.figmaLayers[0].opacity
        );
        this.process_array.base.color = color;

    }

    figmaLayersToBackgroundCSS() {
          // First layer
         let  first_background =  this.imageOrSolidCss(this.figmaLayers[0]);
         if(!first_background) return;
         this.parse_and_add_background_to_array(first_background);
         this.process_array.base.position = 'relative';
        // Second layer (if present)
        if (this.figmaLayers.length > 1) {
            let second_background = this.imageOrSolidCss(this.figmaLayers[1]);
            this.parse_and_add_background_to_array(second_background, 'before');
            this.setStyles('before');
         }

        // Third layer (if present)
        if (this.figmaLayers.length > 2) {
            let third_background = this.imageOrSolidCss(this.figmaLayers[2]);
            this.parse_and_add_background_to_array(third_background, 'after');
            this.setStyles('after', 10);
         }

        
    }

    imageOrSolidCss(layer) {
        if(!layer) return;
        if (layer.type === "IMAGE") {
            return this.generateImageLayerCSS(layer);
        } else if (layer.type === "SOLID") {
            return this.generateSolidLayerCSS(layer);
        }
    }

    generateImageLayerCSS(layer) {
        return  {
            'background-image': 'url(https://picsum.photos/1600/800)',
            'background-size': 'cover',
            'background-position': 'center'
        }
    }
        
    generateSolidLayerCSS(layer) {
      
        return {
            'background': this.colorAndOpacityConverter(
                layer.color,
                layer.opacity
            )
        }
    }



    parse_and_add_background_to_array(background, type = 'base'){
        let background_keys = Object.keys(background);
        background_keys.forEach((key) => {
            this.process_array[type][key] = background[key];
        })
    }

  
 

    setStyles( type, zIndex = 5) {
        this.process_array[type].content = '';
        this.process_array[type].position = 'absolute';
        this.process_array[type].top = '0';
        this.process_array[type].left = '0';
        this.process_array[type].width = '100%';
        this.process_array[type].height = '100%';
        this.process_array[type]['z-index'] = zIndex;
     }
}


 
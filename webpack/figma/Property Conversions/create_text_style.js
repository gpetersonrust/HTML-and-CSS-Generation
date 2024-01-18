export default class create_text_style {
    constructor(node, process_array) {
       
        this.fills = node.fills;
        this.fontName = node.fontName;
        this.fontSize = node.fontSize;
        this.fontWeight = node.fontWeight;
        this.letterSpacing = node.letterSpacing;
        this.lineHeight = node.lineHeight;
        this.paragraphIndent = node.paragraphIndent;
        this.paragraphSpacing = node.paragraphSpacing;
        this.textCase = node.textCase;
        this.textDecoration = node.textDecoration;
        
        this.textAlignHorizontal = node.textAlignHorizontal;
        this.textAlignVertical = node.textAlignVertical;
        this.process_array = process_array;
        

        this.textCaseMappings = {
            UPPER: 'text-transform: uppercase',
            LOWER: 'text-transform: lowercase',
            TITLE: 'text-transform: capitalize',
            ORIGINAL: 'text-transform: none',
        };

        this.textDecorationMappings = {
            UNDERLINE: 'text-decoration: underline',
            STRIKETHROUGH: 'text-decoration: line-through',
            NONE: 'text-decoration: none',
        };
    }

    static getStyleByValue(value, mapping) {
        return mapping[value] || '';
    }

    createTextStyle() {
       
        const unitConversion   = {
            PIXELS: 'px',
            PERCENT: '%',
            AUTO: 'auto',
        };
      
    
        // Text Decoration
       
        let textDecoration = create_text_style.getStyleByValue(this.textDecoration, this.textDecorationMappings).split(':')[1];
        this.process_array.base['text-decoration'] =  textDecoration.trim();
     
       

        // Letter Spacing
        let letterSpacing = isNaN(this.letterSpacing.value) ? "" :  this.letterSpacing.value;
       
        
        if(letterSpacing) {
            this.process_array.base['letter-spacing'] =  `${letterSpacing}${unitConversion[this.letterSpacing.unit]}`;
        }
       
        // lineHeight: 
        let lineHeight = isNaN(this.lineHeight.value) ? "" :  this.lineHeight.value;
        if(lineHeight) {
            this.process_array.base['line-height'] =  `${Math.round(lineHeight)}${unitConversion[this.lineHeight.unit]}`;
        }
     let paragraph_spacing = isNaN(this.paragraphSpacing) ? "" :  this.paragraphSpacing;
        if(paragraph_spacing) {
            this.process_array.base['margin-bottom'] =  `${Math.round(paragraph_spacing)}px`;
        }
      
 
       let text_case  = create_text_style.getStyleByValue(this.textCase, this.textCaseMappings).split(':')[1];
         this.process_array.base['text-transform'] =  text_case.trim();
      
        
        
  
        this.process_array.base['font-family'] =  this.fontName.family;
        this.process_array.base['font-size'] =  this.fontSize + 'px';
        this.process_array.base['font-weight'] =  this.fontWeight;


    // see if align is left, right, center, or justify
        let text_align = this.textAlignHorizontal.toLowerCase();
        if (!text_align.includes('left')) {
            this.process_array.base['text-align'] =   text_align;
        }
        if (this.fontName.style.toLowerCase().includes('italic')) {
       
            this.process_array.base['font-style'] =  'italic';
        }

      
    }
}
 


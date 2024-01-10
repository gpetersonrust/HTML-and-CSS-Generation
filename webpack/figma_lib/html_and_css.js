/**
 * Class for generating HTML code based on Figma node structure.
 */
export class HTMLGenerationForFigma {
    /**
     * Constructor for HTMLGenerationForFigma class.
     * @param {Object} node - The Figma node for which HTML is generated.
     * @param {Object} parent - The parent node.
     * @param {Array} usedIds - Array of used IDs to ensure uniqueness.
     */
    constructor(node, parent = null, usedIds = [], variants = null, type) {
        this.node = node;
        this.parent = parent;
        this.css = new CSSGenerationForFigma(node);
        this.html = [];
        this.usedIds = usedIds;
        this.variants = variants;
        this.type = type;
        this.css  = new CSSGenerationForFigma(node, variants, type, this.html);
          //    reduce variants to css name use name corrector to get class name
    
       if(this.variants){
        // get variant vlaues;
        let values = Object.values(this.variants);
        // convert to css class
        this.variant_css_class = values.reduce((acc,variant, index)=>{
            if(index== 0) {
                //  skip and return acc
                return acc;
            }
            // if last item remove word default
            return acc+`${this.nameCorrector(variant)} `
        },"").replace("default","").trim();
         
       }else{
              this.variant_css_class = ""
         }
       
  
        
    }

    /**
     * Generate HTML code recursively for the Figma node.
     * @param {number} indentation - Number of spaces for indentation.
     * @param {Array} usedIds - Array of used IDs to ensure uniqueness.
     * @returns {string} - The generated HTML code.
     */
    generator(indentation = 0, usedIds = this.usedIds, parent = null) {
        // Skip the node if it's the same as the parent
        if (this.shouldSkipNode()) {
            return;
        }
   
      
        const correctedName = this.nameCorrector(this.node.name);
        const id = this.generateUniqueId(correctedName, usedIds);
        const linespacing = "\n";
        const indent = " ".repeat(indentation * 2);
        const elementBeginning = `${indent}${this.tagHandler(correctedName, id, this.node)}`;

          
        if(parent){
            let parent_name = this.nameCorrector(parent.name);
             let isText = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`].includes(parent_name);
                if(isText){
                    return `${indent} ${this.node.characters} \n`;
                }
            }
        
        
    
        if (this.isImageElement(correctedName) || this.isInputElement(correctedName)) {
            return elementBeginning;
        }
    
        const elementEnd = `${indent}</${this.correctTagForNode()}>\n`;
    
        // Recursively generate HTML for child nodes
        this.generateHtmlForChildren(indentation, usedIds , this.node);
    
        const html = elementBeginning + this.html.join(linespacing) + elementEnd;
         let unique_css_name = `
          .${correctedName}${this.variant_css_class ? "."+this.variant_css_class : ""}
         `;
          
        this.css.generator(unique_css_name, this.node, this.variants, this.type, this.parent, this.html);
    
        return html;
    }
    /**
     * 
     * @returns {boolean} - True if it has base CSS properties, otherwise false.
     *  
     */
    
    shouldSkipNode() {
        return this.parent && this.node.name.toLowerCase() === this.parent.name.toLowerCase();
    }

    /**
     * 
     * @param {*} correctedName 
     * @returns  {boolean} - True if it an `img` element, otherwise false.
     */
    
    isImageElement(correctedName) {
        return correctedName === "img";
    }

    /**
     * 
     * @param {*} correctedName 
     * @returns  {boolean} -  True if it an `input` element, otherwise false.
     */
    
    isInputElement(correctedName) {
        return correctedName === "input";
    }


    /**
     * 
     * @param {*} indentation 
     * @param {*} usedIds 
     */
    generateHtmlForChildren(indentation, usedIds, node) {
        if (this.node.children) {
            this.node.children.forEach(child => {
                const childHtml = new HTMLGenerationForFigma(child, this.node);
                this.html.push(childHtml.generator(indentation + 1, usedIds, node));
            });
        }
    }
    /**
     * Determine the appropriate tag and handle accordingly.
     * @param {string} correctedName - The corrected name of the Figma node.
     * @param {string} id - The generated or dynamic ID for the node.
     * @param {Object} node - The Figma node.
     * @returns {string} - The HTML tag or attributes string.
     */
    tagHandler(correctedName, id, node) {
        if(correctedName === "image")return this.imageAttributes(node);
        if(correctedName === 'input') return this.inputAttributes(node);
        return this.defaultElementBeginning(correctedName, id);
     
    }

    /**
     * Generate the default opening tag for the element.
     * @param {string} correctedName - The corrected name of the Figma node.
     * @param {string} id - The generated or dynamic ID for the node.
     * @returns {string} - The opening tag string.
     */
    defaultElementBeginning(correctedName, id) {
        return `<${this.correctTagForNode()} class="${correctedName} ${this.variant_css_class}" id="${id}">\n`;
    }

    inputAttributes(node){
        let correctedName = this.nameCorrector(node.name);
        let placeholder = node.characters;
        let type = node.type;
        return `<input type="${type}" class="${correctedName} ${ this.variant_css_class}" placeholder="${placeholder}" />\n`;
    }

    /**
     * Generate image attributes for an image node.
     * @param {Object} node - The Figma node representing an image.
     * @returns {string} - The image tag with alt and src attributes.
     */
    imageAttributes(node) {
        let correctedName = this.nameCorrector(node.name);
        // download image
         let temp_image = "https://picsum.photos/1600/800";
         return `<img class="img-fit" alt="${correctedName}" src="${ temp_image}" />\n`;
    }

    /**
     * Correct the name of the Figma node for use in HTML.
     * @param {string} name - The original name of the Figma node.
     * @returns {string} - The corrected name.
     */
    nameCorrector(name) {
      
    //    lower case name 
        name = name.toLowerCase();
        // remove spaces
        name = name.replaceAll(" ","-");
        // remove = sign
        name = name.split("=")[1] || name;
        // check if name has surface
        if(name.includes("surface")){
            return "page-wrapper";
        }
        return name;
    }

    /**
     * Generate a unique ID for the Figma node based on the corrected name.
     * @param {string} id - The corrected name of the Figma node.
     * @param {Array} usedIds - Array of used IDs to ensure uniqueness.
     * @returns {string} - The generated or dynamic ID.
     */
    generateUniqueId(id, usedIds) {
        let unqiueId = id;
        if (usedIds.includes(id)) {
            const existingCount = usedIds.filter(_id => _id === id).length;
            unqiueId = id + "-" + existingCount;
        }
        usedIds.push(id);
        return unqiueId;
    }

    /**
     * Determine the correct HTML tag based on the Figma node name.
     * @returns {string} - The HTML tag.
     */
    correctTagForNode() {
        const name = this.node.name.toLowerCase();
    
        const tagMap = {
            "button": "button",
            "section": "section",
            "image": "img",
            "h1": "h1",
            "h2": "h2",
            "h3": "h3",
            "h4": "h4",
            "h5": "h5",
            "h6": "h6",
            "body-copy": "p",
            "link": "a",
            "list": "ul",
            "list-item": "li",
            "form": "form",
            "input": "input",
            "textarea": "textarea",
            "label": "label",
            "select": "select",
            "option": "option",
            "table": "table",
            "table-row": "tr",
            "table-cell": "td",
            "table-header": "th",
            "table-body": "tbody",
            "table-head": "thead",
            "table-foot": "tfoot",
            "table-caption": "caption",
            "article": "article",
            "aside": "aside",
            "details": "details",
            "summary": "summary",
            "figure": "figure",
            "figcaption": "figcaption",
            "main": "main",
        };
    
        return tagMap[name] || "div";
    }
    
}

/**
 * Class for generating CSS code based on Figma node structure.
 */
export class CSSGenerationForFigma  {
    /**
     * Constructor for CSSGenerationForFigma class.
     * @param {Object} node - The Figma node for which CSS is generated.
     */
    constructor(node, variants = null, type) {
        this.node = node;
        this.variants = variants;
        this.type = type;
    
 
    }

     generator(unique_css_name, node, variants, type, parent) {
      
        const padding = this.getPadding(node, parent);
        
        const aspectRatio = this.getAspectRatio(node.width, node.height);
      
        const dimensions = this.checkMinMaxDimensions(node.minWidth, node.minHeight, node.maxWidth, node.maxHeight);
         
        const grid = this.generateGrid(node);
       
        // const layoutProperties = this.getLayoutProperties(node.layoutMode, node.mainAxis, node.spacing);
        const backgroundProperties = this.getBackgroundProperties(node);
        console.log(backgroundProperties,"backgroundProperties");
        const borderProperties = this.getBorderProperties(node);
        // const boxProperties = this.getBoxProperties(node.opacity, node.visible, node.locked, node.constraints, node.effects);
        // const typeProperties = this.getTypeProperties(type);
        // const textProperties = this.getTextProperties(type);
        // const boxModelProperties = this.getBoxModelProperties(type);
        // const spacingProperties = this.getSpacingProperties(type);
        // const fillProperties = this.getFillProperties(type);
        // const borderRadiusProperty = this.getBorderRadiusProperty(type);
        // const colorProperties = this.getColorProperties(type);
        // const textShadowProperty = this.getTextShadowProperty(type);
        // const textLayoutProperties = this.getTextLayoutProperties(type);
        // const listProperties = this.getListProperties(type);
        // const cursorProperty = this.getCursorProperty(type);
        // const outlineProperty = this.getOutlineProperty(type);
        // const cssVariables = this.generateCSSVariables(variants);
    
        // Your main logic to apply the properties to the HTML or CSS representation
         return;
        // Example:
        const styles = `
            .${unique_css_name} {
                padding: ${padding};
                aspect-ratio: ${aspectRatio};
                ${dimensions}
                ${grid}
                ${layoutProperties}
                ${backgroundProperties}
                ${borderProperties}
                ${boxProperties}
                ${typeProperties}
                ${textProperties}
                ${boxModelProperties}
                ${spacingProperties}
                ${fillProperties}
                ${borderRadiusProperty}
                ${colorProperties}
                ${textShadowProperty}
                ${textLayoutProperties}
                ${listProperties}
                ${cursorProperty}
                ${outlineProperty}
                ${cssVariables}
            }
        `;

      
    
        return styles;
    }
    getPadding(node,){
        let paddingLeft = node.paddingLeft;
        let paddingRight = node.paddingRight;
        let paddingTop = node.paddingTop;
        let paddingBottom = node.paddingBottom;
        return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;

    }
    
    getAspectRatio(width, height) {
      let ratio =  width / height;
   
        return ratio;
     
        

    }

    getBorderProperties(node) {
        const {
            strokeAlign: borderInset,
            strokeBottomWeight: borderBottomWidth,
            strokeCap,
            strokeGeometry,
            strokeJoin,
            strokeLeftWeight: borderLeftWidth,
            strokeMiterLimit,
            strokeRightWeight: borderRightWidth,
            strokeStyleId,
            strokeTopWeight: borderTopWidth,
            strokeWeight: borderWidth,
            strokes: borderColors,
            topLeftRadius,
            topRightRadius,
            bottomLeftRadius,
            bottomRightRadius,
        } = node;
        let   editable_border_colors  = JSON.parse(JSON.stringify(borderColors));
          let borderColor  = editable_border_colors.reverse()[0];
         if(!borderColor) return "";
         let border_color_css;
         if(borderColor) {
              border_color_css   = `rgba(${Math.round(borderColor.color.r * 255)}, ${Math.round(borderColor.color.g * 255)}, ${Math.round(borderColor.color.b * 255)}, ${borderColor.opacity.toFixed(2)})`;
            }
 
    

    
        let styles = [
           `border-width: ${borderTopWidth}px ${borderRightWidth}px ${borderBottomWidth}px ${borderLeftWidth}px`,
            `border-style: solid`,
            `border-color: ${border_color_css}`,
            `border-radius: ${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`,
           
           

        ].filter(Boolean).join(';\n');

       console.log(styles, 'styles');

    }

     getBackgroundProperties(node) {
    let styles = "";
    let figmaData = node.fills;

    figmaData.forEach((layer, index) => {
        if (layer.type === 'SOLID' && layer.visible) {
            const color = `rgba(${Math.round(layer.color.r * 255)}, ${Math.round(layer.color.g * 255)}, ${Math.round(layer.color.b * 255)}, ${layer.opacity.toFixed(2)})`;
            styles += `background-color: ${color};\n`;
        } else if (layer.type === 'IMAGE' && layer.visible) {
            let placeholder = "https://picsum.photos/1600/800";
            styles += `background-image: url(${ placeholder});\n`;
            styles += `background-size: cover;\n`;  // You can customize this based on your needs
            styles += `background-repeat: no-repeat;\n`;  // You can customize this based on your needs
            styles += `background-position: center center;\n`;  // You can customize this based on your needs
        } else if (layer.type === 'GRADIENT_LINEAR' && layer.visible) {
            const gradientStops = layer.gradientStops.map(stop => `rgba(${Math.round(stop.color.r * 255)}, ${Math.round(stop.color.g * 255)}, ${Math.round(stop.color.b * 255)}, ${stop.color.a.toFixed(2)}) ${stop.position.toFixed(2) * 100}%`).join(', ');

            styles += `background: linear-gradient(${layer.gradientTransform[0][2].toFixed(2)}deg, ${gradientStops});\n`;
        }
    });

    return styles;
}

    checkMinMaxDimensions(minWidth, minHeight, maxWidth, maxHeight) {
        let styles = "";
        if (minWidth) {
            styles += `min-width:${minWidth}px; \n`;
        }
        if (minHeight) {
            styles += `min-height:${minHeight}px; \n`;
        }
        if (maxWidth) {
            styles += `max-width:${maxWidth}px; \n`;
        }
        if (maxHeight) {
            styles += `max-height:${maxHeight}px; \n`;
        }
        return styles;
    }
  
      
    generateGrid(node) {
        if (node.name.toLowerCase() !== 'grid') return '';
    
        const width = node.width;
        const children = node.children;
        const templateColumns = children.map(child => (child.width / width) * 12).join('fr ') + 'fr';
        let height = children[0].height;
    
        return `display: grid;\ngrid-template-columns: ${templateColumns}; grid-template-rows: ${height}px;`;
    }
    
    /**
     * Check if the Figma node has base CSS properties.
     * @returns {boolean} - True if it has base CSS properties, otherwise false.
     */
    baseCssForNode() {
        const baseCssTags = ['surface-phone', 'surface-tablet', 'surface-laptop', 'surface-desktop'];

        return baseCssTags.includes(this.node.name);
    }
}

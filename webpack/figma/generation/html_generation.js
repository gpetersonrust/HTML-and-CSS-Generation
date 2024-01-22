/** 
 * HTML_Generation class represents a utility for generating HTML code based on a provided node.
 * 
 * Table of Contents:
 * 1. Constructor
 * 2. generate
 * 3. html_creation
 * 4. tag_handler
 * 5. attributes
 * 6. get_variants
 * 7. is_closed_html_elements_method
 * 8. convert_children_to_html
 * 9. indentation_spacing
 * 10. isText
 */

import tags from "../constants/tags";
 

import { uid } from "uid";
import CSS_Generation from "./css_genereation";
import Node_Manager from "../node_manager";
 

 
export default class HTML_Generation {
    /**
     * 1. Constructor for HTML_Generation class.
     * @param {Object} node - The node used for HTML generation.
     */
    constructor(node, responsive_design = false, max_screen_size = null, dyanmic_properties = null) {
        this.node = node;
        this.responsive_design = responsive_design;
        this.max_screen_size = max_screen_size;
        this.dyanmic_properties = dyanmic_properties;
        console.log(this.max_screen_size, this.dyanmic_properties,  this.node.name);
       this.tag;
    }

    /**
     * 2. Generates HTML code based on the provided node.
     */
    generate(indentation = 1, css_objects_to_string  = []) {
        this.indentation = indentation;
        this.css_objects_to_string = css_objects_to_string;
        this.html = this.html_creation();
      
        //  console.log(this.continue_generation(), 'generate');
       
     return this.html;
    }

    continue_generation(){
        let continue_generation = false;
        if(!this.responsive_design )  
        {
            return true;
        }


     
        this.dyanmic_properties == 'responsive'  || this.dyanmic_properties == this.max_screen_size  ? continue_generation = true : continue_generation = false;  
        return continue_generation;
    }

    /**
     * 3. Creates HTML code by handling tags, attributes, and self-closing elements.
     */
    html_creation() {
       
        const { tag, id, variant_classes } = this.tag_handler(this.node.name);
      
        const isText = this.isText(this.node);
        
        const indentation_spacing = this.indentation_spacing();
        let text = isText ? this.node.characters : '';
         const selfClosing = this.is_closed_html_elements_method(tag);
         this.tag = tag;
         this.css =  new CSS_Generation(this.node, this.id,  variant_classes, this.tag);
         this.css =  this.css.generate();
        
         this.css_objects_to_string.push(this.css);
         if(this.continue_generation()) {
 
        const closingTag = selfClosing ? '' : `</${ isText ? "span" : tag}>`;
        const closing_slash = selfClosing ? '/' : '';
         const children_html = this.convert_children_to_html(this.node.children);
         


         return `\n${indentation_spacing}<${isText ? 'span' : tag} id="${id}" class="${variant_classes}"${closing_slash}>${text}${children_html}${ !isText ? indentation_spacing : ""}${ closingTag}`; 
         } else {
                return '';
         }
    }

    /**
     * 4. Handles the selection of tags based on the node name.
     * @param {string} name - The name of the node.
     * @returns {Object} - An object containing tag, id, and variant_classes.
     */
    tag_handler(name) {
    //    regex to remove from :[ to ]
       let prop_regex =  /:\[.*?\]/g;
         name = name.replace(prop_regex, ''); 
        let orginial_name = name;
        name = name.split('.')[0];

        const tag = tags[name.toLowerCase()] || "div";
        const { id, variant_classes } =  this.attributes(orginial_name);
        return { tag, id, variant_classes };
    }

    /**
     * 5. Extracts attributes (id and variant_classes) from the provided name.
     * @param {string} name - The name of the node.
     * @returns {Object} - An object containing id and variant_classes.
     */
    attributes(name) {
        let orginial_name = name;
       if(name.includes('.')){
           name = name.split('.')[1];
         }
        const id = `${name.toLowerCase() + "-" + uid(10)}`.replaceAll(" ", "-");
        const classes = name.toLowerCase().replaceAll(" ", "-");
        this.id = id;
        this.class_name = classes;
        const variant_classes = `${classes}${this.get_variants()}`;
        return { id, variant_classes };
    }

    /**x
     * 6. Extracts variant classes from the node's variant properties.
     * @returns {string} - A string containing variant classes.
     */
    get_variants() {
        return this.node.variantProperties ? Object.keys(this.node.variantProperties).map((key) => ` ${this.node.variantProperties[key].toLowerCase().replace(" ", "-")}`).join("") : "";
    }

    /**
     * 7. Checks if a given HTML element is self-closing.
     * @param {string} value - The HTML element tag.
     * @returns {boolean} - True if the element is self-closing, otherwise false.
     */
    is_closed_html_elements_method(value) {
        const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'param', 'source', 'area', 'base', 'col', 'embed', 'keygen', 'menuitem', 'track', 'wbr'];
        return selfClosingTags.includes(value);
    }

    /**
     * 8. Converts the node's children to HTML code.
     * @param {Array} children - The array of children nodes.
     * 
     * @returns {string} - A string containing HTML code.
     */
    convert_children_to_html(children) {
        if (!children || !Array.isArray(children)) return "";
     
        const indentation_spacing = this.indentation_spacing();

        const children_html = children.map((child) => {
            const node_manager = new Node_Manager(child);
            return node_manager.html.generate( this.indentation + 1, this.css_objects_to_string);
        }).join("");

        return `${indentation_spacing}${children_html}\n`;
    }

    /**
     * 9. Creates indentation spacing based on the current indentation level.
     * @returns {string} - A string containing indentation spacing.
     */

    indentation_spacing() {
         
        let indentation = "";
        for (let i = 0; i <  this.indentation ; i++) {
           
            indentation += "  ";  // Use spaces for indentation
        }
    
       
        return indentation;
    }
    
    /**
     * 10. Checks if a given node is a text node.
     * @param {Object} node - The node to check.
     * @returns {boolean} - True if the node is a text node, otherwise false.
     */
    isText(node) {
        return node.type === "TEXT";
    }

}
 
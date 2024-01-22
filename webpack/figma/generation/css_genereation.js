 import create_fill_style from "../Property Conversions/create_fill_style ";
import create_flex_size from "../Property Conversions/create_flex_size";
import create_size_style from "../Property Conversions/create_size_style";
import create_text_style from "../Property Conversions/create_text_style";
import utiltiy_style_creator from "../Property Conversions/utility_style_creator";


 
 
export default class CSS_Generation{
    constructor(node, id, class_name, tag){
        this.node = node;
        this.id = id;
        this.class_name = class_name;
        this.css = '';
        this.parent  = node.parent;
        this.grid = node.name.toLowerCase().includes('grid');
        this.flex = node.name.toLowerCase().includes('flex');
        this.css_to_be_processed = {
            id: this.id,
            class_name: this.class_name,
            screenSize:"desktop",
            base: {},
            before: {},
            after: {},
            hover: {},
            focus: {},
        }
        this.layoutMode = node.layoutMode;
        this.isText = this.node.type === "TEXT";
        this.tag = tag;

    
  
    }

    generate(){
        this.css = this.css_creation();
        return this.css_to_be_processed;
    }

    css_creation(){
      let fill  = new create_fill_style(this.node, this.css_to_be_processed, this.isText).fillSelection();
      this.isText && new create_text_style(this.node, this.css_to_be_processed).createTextStyle();
      if(this.layoutMode !== 'NONE' && this.layoutMode !== undefined && this.layoutMode !== null )  new create_flex_size(this.node, this.css_to_be_processed).generate();
        new create_size_style(this.node, this.css_to_be_processed, this.isText, this.tag).generate();
        new utiltiy_style_creator(this.node, this.css_to_be_processed, this.isText).generate();
    }

}
export default class create_flex_size {
    constructor(node, css_to_be_processed) {
      
        // layoutMode, name = "", primaryAxisAlignItems = "MIN", counterAxisAlignItems = "MIN", layoutWrap = "NONE"
        const { layoutMode, name, primaryAxisAlignItems, counterAxisAlignItems, layoutWrap, verticalPadding,horizontalPadding, itemSpacing,
            counterAxisSpacing

        } = node;
       
       
        this.layoutMode = layoutMode;
        this.name = name;
        this.primaryAxisAlignItems = primaryAxisAlignItems;
        this.counterAxisAlignItems = counterAxisAlignItems;
        this.isGrid = name.toLowerCase().includes('grid');
        this.isWrap =  layoutWrap.toLowerCase() === 'wrap';
        this.css_to_be_processed = css_to_be_processed;
        this.verticalPadding = verticalPadding;

        this.horiztionalPadding = horizontalPadding;
        
        this.itemSpacing = itemSpacing;
        this.counterAxisSpacing = counterAxisSpacing;

       
    }

    generate() {
        this.handleLayoutMode();
        this.handleWrap();
        this.handleFlex();
        this.spacing();
        return this.css;
    }

    spacing(){
         this.css_to_be_processed.base['padding'] = `${this.verticalPadding}px ${this.horiztionalPadding}px`;
        //  gap based on the layout mode
        if(this.layoutMode === 'HORIZONTAL' && !this.isWrap){
            this.css_to_be_processed.base['gap'] = `${this.itemSpacing}px`;
        } else if(this.layoutMode === 'VERTICAL' && !this.isWrap){
            this.css_to_be_processed.base['gap'] = `${this.itemSpacing}px`;
        } else {
            this.css_to_be_processed.base['gap'] = `${this.counterAxisSpacing}px ${this.itemSpacing}px`;
        }

      

    }
    handleLayoutMode() {
        if (this.layoutMode === "NONE") {
            return;
        } else if (this.layoutMode === "HORIZONTAL" && !this.isGrid) {
           
          this.css_to_be_processed.base['display'] = 'flex';
            this.css_to_be_processed.base['flex-direction'] = 'row';
        } else if (this.layoutMode === "VERTICAL" && !this.isGrid) {
            
            this.css_to_be_processed.base['display'] = 'flex';
            this.css_to_be_processed.base['flex-direction'] = 'column';
        } else if (this.isGrid) {
          
            this.css_to_be_processed.base['display'] = 'grid';
             
        }
    }

    handleWrap() {
        if (this.isWrap) {
          
            this.css_to_be_processed.base['flex-wrap'] = 'wrap';
        }
    }

    handleFlex() {
        let isFlex = this.css_to_be_processed.base['display'] === 'flex';
        if ( isFlex) {
            const justify_content = this.convertAlignmentToCss(this.layoutMode === "HORIZONTAL" ? this.primaryAxisAlignItems : this.counterAxisAlignItems, 'justify-content');
            const align_items = this.convertAlignmentToCss(this.layoutMode === "HORIZONTAL" ? this.counterAxisAlignItems : this.primaryAxisAlignItems, 'align-items');
         
            this.css_to_be_processed.base['justify-content'] = justify_content.split(':')[1].trim();
            this.css_to_be_processed.base['align-items'] = align_items.split(':')[1].trim();
        }
    }

    convertAlignmentToCss(value, property) {
        value = value.toLowerCase();
        const mapping = {
            min: 'flex-start',
            center: 'center',
            max: 'flex-end'
        };

        return `${property}: ${mapping[value]};`;
    }
}

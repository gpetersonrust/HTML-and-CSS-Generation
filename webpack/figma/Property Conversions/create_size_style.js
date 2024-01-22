export default class create_size_style {
    constructor(node,css_to_be_processed, isText = false, tag) {
        this.node = node;
        this.css = '';
        this.css_to_be_processed = css_to_be_processed;
        this.isText = isText;
        this.tag = tag;
    }

    handleSizeOptions() {
        const options = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'];

        options.forEach(option => {
            // css conversion 
         
            if (this.node[option] !== undefined && this.node[option] !== 0 && this.node[option] !== null) {
               let css_option = option.replace('Width', '-width').replace('Height', '-height');
                this.css_to_be_processed.base[css_option] = `${this.node[option]}px`;
            }
        });
    }

    calculateChildSize() {
        const { width, height, parent } = this.node;
         let isContainer =  parent.width == undefined;
         let fit_content_elements = ['button', 'a', 'input', 'select', 'textarea'];
         if(isContainer || this.isText ||  fit_content_elements.includes(this.tag.toLowerCase())) {
          
            this.css_to_be_processed.base['width'] =   this.isText ?  'fit-content' : `100%`;
            this.css_to_be_processed.base['height'] =  `auto`;
            if(!this.isText){
            this.css_to_be_processed.base['aspect-ratio'] = `${width}/${height}`;
            }
            return;
         }

           let childWidth = (width / parent.width) * 100;

        childWidth = childWidth.toFixed(2);
       
        this.css_to_be_processed.base['width'] = `${childWidth}%`;

        let childHeight = (height / parent.height) * 100;
        childHeight = childHeight.toFixed(2);
        this.css_to_be_processed.base['aspect-ratio'] = `${width}/${height}`;
    }

    generate() {
        const { width, parent } = this.node;

        this.handleSizeOptions();

        if (width !== undefined) {
            if (parent) {
                this.calculateChildSize();
            } else {
                this.css += `width: 100%;\n`;
                this.css += `height: 100%;\n`;
            }
        }

        return this.css;
    }
}

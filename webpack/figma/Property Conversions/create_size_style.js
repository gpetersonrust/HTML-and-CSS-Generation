export default class create_size_style {
    constructor(node,css_to_be_processed, isText = false) {
        this.node = node;
        this.css = '';
        this.css_to_be_processed = css_to_be_processed;
        this.isText = isText;
    }

    handleSizeOptions() {
        const options = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'];

        options.forEach(option => {
            if (this.node[option] !== undefined && this.node[option] !== 0 && this.node[option] !== null) {
             
                this.css_to_be_processed.base[option] = `${this.node[option]}px`;
            }
        });
    }

    calculateChildSize() {
        const { width, height, parent } = this.node;
         let isContainer =  parent.width == undefined;
         if(isContainer || this.isText) {
          
            this.css_to_be_processed.base['width'] =  `100%`;
            this.css_to_be_processed.base['height'] =  `auto`;
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

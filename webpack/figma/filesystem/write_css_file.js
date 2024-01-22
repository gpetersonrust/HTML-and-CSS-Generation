import RemoveDuplicateHandler from "../utils/classes/duplicate_remove";

 

class write_css_file {
    constructor(css_objects){
        this.css_objects = css_objects;
        this.variant_classes = [];
        this.variant_separator();
        this.css_string = '';
        this.remove_duplicates();
        
        
     
    }

    css_string_constructor() {
      this.css_string += this.generateCssString(this.css_objects);
      this.css_string += this.generateCssString(this.variant_classes, true);
       return   this.css_string;
 }

    variant_separator() {
    let variant_separation  =  this.css_objects.reduce((acc, css_object) => {
        let classes = css_object.class_name.split(' ');
        // if less than 2 classes, return
        if(classes.length < 2) {
            acc.regular_css.push(css_object);
            return acc;
        };
        css_object.base_variant_class = classes[0];
       
        if(acc.variants.length === 0){
            css_object.variant_classes =  '';
            console.log(css_object, 'first');
            acc.variants.push(css_object);
            return acc;
        } else {
            css_object.variant_classes = classes.slice(1).join(' ');
        }
        // let found = acc.find((css_object_in_acc) => css_object_in_acc.base_variant_class === css_object.base_variant_class);
        let found = acc.variants.find((css_object_in_acc) => css_object_in_acc.base_variant_class === css_object.base_variant_class);
        if(found) {
         let clean_css = new RemoveDuplicateHandler(found, css_object);
            let cleaned_css = clean_css.removeDuplicateStates();
           acc.variants.push(cleaned_css);
           return acc;

        } else {
            acc.variants.push(css_object);
            return acc;
        }

   
     }  , {
        variants: [],
        regular_css: []
     });
 

     const {variants, regular_css} = variant_separation;
         this.variant_classes = variants;
         this.css_objects = regular_css;
       
        return this;
  

    }

/**
 * Removes duplicate CSS objects based on class_name and properties within states.
 */
remove_duplicates() {
    

    // Initialize an array to store unique CSS objects
    this.clean_css_objects = [];

    // Iterate through each CSS object
    this.css_objects.forEach((css_object) => {
        // Call the helper function to handle duplicate removal
        this.removeDuplicateStates(css_object);
    });
}

/**
 * Checks for duplicate CSS objects based on class_name and decides whether to add the current css_object.
 * @param {Object} css_object - The CSS object to check for duplicates.
 */
removeDuplicateStates(css_object,) {
    // Find a comparable object in the existing clean_css_objects array
    //   css_object,
    let compareable_object = this.clean_css_objects.find((clean_css_object) => clean_css_object.class_name === css_object.class_name);

    // If a comparable object is found, remove duplicates and add the current css_object
    if (compareable_object) {
        this.removeDuplicateProperties(css_object, compareable_object);
        this.clean_css_objects.push(css_object);
        
    } else {
        css_object.modify_id = false;
        // If no comparable object is found, simply add the current css_object
        this.clean_css_objects.push(css_object);
    }
}

/**
 * Compares and removes duplicate properties within states.
 * @param {Object} css_object - The current CSS object.
 * @param {Object} compareable_object - The comparable CSS object.
 */
removeDuplicateProperties(css_object, compareable_object) {
    // Define the states to compare
    let states = ['base', 'before', 'after', 'hover', 'focus'];

    // Iterate through each state
    states.forEach((state) => {
        // Extract the state's object and keys
        let object = css_object[state];
        let object_keys = Object.keys(object);

        // If necessary properties are missing, skip this state
        if (!css_object || !object_keys || object_keys.length === 0) return;

        // Iterate through each property within the state
        object_keys.forEach((key) => {
            let value = object[key];

            // If a property is found and matches the comparable object, delete it
            if (value && compareable_object[state][key] === value) {
                delete css_object[state][key];
            }
        });
    });
    css_object.modify_id = true;
}


    
 /**
  * 
  * @param {*} cssObject 
  *  
  */

generateCssString(cssObjects, isVariant = false) {
     let cssString = '';

   const processClassName = (className)  => {
        let multipleClassNames = className.split(' ');
        // map and attach '.' to each class name
        multipleClassNames = multipleClassNames.map((name) => `.${name}`);
        // join the class names
        return multipleClassNames.join('').replace('.default', '');
    }

    const process_variant_class = (cssObject) => { 

        return cssObject.variant_classes ? `${processClassName(cssObject.base_variant_class)}${processClassName(cssObject.variant_classes)}` : processClassName(cssObject.base_variant_class);
    }
 

   const processPropertyValues = (key, value) =>  {
        let skipValues = ['undefined', 'null', '', 'none', 'auto', '1', '1.00'];
        return (value && !skipValues.includes(value)) ? `${key}: ${value}; \n` : '';
    }

     const generateStateCss = (cssObject,state) =>  {
        let object = cssObject[state];
        
         
        // object_keys
        let objectKeys = Object.keys(object);
        // if cssObject or objectKeys is empty or object keys = 0 return;
        if (!cssObject || !objectKeys || objectKeys.length === 0) return '';

        let addId = cssObject.modify_id ? `#${cssObject.id}` : '';
        let processedClassName = isVariant ? process_variant_class(cssObject) : processClassName(cssObject.class_name);
        // css string with id and class name for specificity; if state is not base, add pseudo-class
        let stateCss = `${addId}${processedClassName}${state === 'base' ? '' : `:${state}`} { \n`;

        objectKeys.forEach((key) => {
            let value = object[key];
            stateCss += processPropertyValues(key, value);
        });

        stateCss += `} \n \n`;
        return stateCss;
    }
    
    const processCssObject = (css_object) => {
        let states = ['base', 'before', 'after', 'hover', 'focus'];
    
        states.forEach((state) => cssString += generateStateCss(css_object, state));
    };


    cssObjects.forEach((cssObject) => processCssObject(cssObject));
  
    return cssString;
}

}


export default write_css_file;
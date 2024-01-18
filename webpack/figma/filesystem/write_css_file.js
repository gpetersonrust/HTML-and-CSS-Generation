 

class write_css_file {
    constructor(css_objects){
        this.css_objects = css_objects;
        this.remove_duplicates();

        this.css_string = this.css_string_constructor();
     
    }

    css_string_constructor() {
        let css_string = '';
        this.clean_css_objects.forEach((css_object) => {
            let states = ['base', 'before', 'after', 'hover', 'focus'];
            states.forEach((state) => {
             
    
                let object = css_object[state];
                // object_keys
                let object_keys = Object.keys(object);
                // if css_object or object_keys is empty or object keys = 0 return;
                if (!css_object || !object_keys || object_keys.length === 0) return;
                let add_id = css_object.modify_id ? `#${css_object.id}` : '';
                   // css string with id and class name for specificity; if state is not base, add pseudo-class
                   css_string += `${add_id} .${css_object.class_name}${state === 'base' ? '' : `:${state}`} { \n`;
    
                object_keys.forEach((key) => {
                    let value = object[key];
                    let skip_values = ['undefined', 'null', '', 'none', 'auto', '1', '1.00'];
                    if ( value &&  skip_values.includes(value)) return;
                    css_string += `${key}: ${value}; \n`;
                });
    
                css_string += `} \n \n`;
            });
        });
        return css_string;
    
       
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
removeDuplicateStates(css_object) {
    // Find a comparable object in the existing clean_css_objects array
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


    
 


}


export default write_css_file;
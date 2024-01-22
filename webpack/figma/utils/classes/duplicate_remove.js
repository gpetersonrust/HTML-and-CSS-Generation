export default class RemoveDuplicateHandler{
    constructor(compareable_object, current_object, key_states = ['base', 'before', 'after', 'hover', 'focus']){
        this.compareable_object = compareable_object;
        this.current_object = current_object;
        this.key_states = key_states;
      this.removeDuplicateStates();
        
    }

    removeDuplicateStates(){
        this.key_states.forEach((state) => {
            // Extract the state's object and keys
            let object = this.current_object[state];
            let object_keys = Object.keys(object);
    
            // If necessary properties are missing, skip this state
            if (!this.current_object || !object_keys || object_keys.length === 0) return;
    
            // Iterate through each property within the state
            object_keys.forEach((key) => {
                let value = object[key];
    
                // If a property is found and matches the comparable object, delete it
                if (value && this.compareable_object[state][key] === value) {
                    delete this.current_object[state][key];
                }
            });
        }
        );

        return this.current_object;
    }

}
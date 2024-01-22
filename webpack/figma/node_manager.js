import HTML_Generation from "./generation/html_generation";

 
export default class Node_Manager {
    constructor(node, max_screen_size= null){
        this.node = node;
     
        this.dyanmic_properties   =   this.node.name.includes(':[')  ? this.node.name.split(':[').reverse()[0].replace(']','') : null;
         this.max_screen_size = max_screen_size;
        if(this.dyanmic_properties && (this.dyanmic_properties == 'responsive') )  {
            this.max_screen_size = this.largest_screen_finder();
        } 
        
       if(this.max_screen_size){
        this.html = new HTML_Generation(node, true,  this.max_screen_size, this.dyanmic_properties);
    
       } else {
        this.html = new HTML_Generation(node, false,  this.max_screen_size,  this.dyanmic_properties);
       }
    
         
    }

    largest_screen_finder(){
       
        let screen_size_values = [
            {value: 0, name: 'responsive-mobile'},
            {name: 'responsive-tablet', value: 768},
            {name: 'responsive-desktop', value: 1024},
            {name: 'responsive-big-desktop', value: 1440},
        ]
        let largest_screen = 'responsive-mobile';
        let {children} = this.node;
      
         if(children){
           largest_screen =  children.reduce((largest_size, surface, index) => {
                let responsive_property = surface.name.includes(':[')  ? surface.name.split(':[').reverse()[0].replace(']','') : 0;
                // if responsive not found in name, return 0
                if(!responsive_property) return largest_size;
                // if responsive property is greater than largest size, return responsive property
                let current_screen = screen_size_values.find(screen => screen.name === responsive_property);

                if(current_screen && current_screen.value > largest_size) largest_size =  current_screen.value;
                // if last item in array, return largest size
                if(index === children.length - 1) {
                    // find the screen size name
                    let screen_size = screen_size_values.find(screen => screen.value === largest_size);
                    largest_screen = screen_size.name;
                    return largest_screen;
                }
              return largest_size;
            }, 0
            )

         }
 
      return largest_screen;
         
    }

}
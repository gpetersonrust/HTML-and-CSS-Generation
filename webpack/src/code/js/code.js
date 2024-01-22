 
import write_css_file from "../../../figma/filesystem/write_css_file";
import Node_Manager from "../../../figma/node_manager";
//  (function() {
//   const currentLayer = figma.currentPage.selection[0];

//   if (!currentLayer) {
//     figma.closePlugin("Please select a layer and try again");
//   } else {
//     const node_manager = new Node_Manager(currentLayer);

//     node_manager.html.generate();
//     let html = node_manager.html.html;
//     let css_object = node_manager.html.css_objects_to_string;

    

//     const css = new write_css_file(css_object).css_string_constructor();

   
//  figma.showUI(__html__, { width: 800, height: 800 });
//     figma.ui.postMessage({
//       type: "generation",
//       html: html,
//       css: css,
    
//     }, {origin: '*'});
//   }
//   // figma.closePlugin();
//  })();
   
const currentLayer = figma.currentPage.selection[0];
 class App_Data_Manager {
  constructor(node) {
    this.node = node;
    this.nodes = [];
     
  }

  get_nodes() {
    this.nodes = [];
    let node_manager = new Node_Manager(this.node);
    this.nodes.push(node_manager);
    this.collect_children(this.node.children);
  }

  collect_children(children) {
    if (children && children.length > 0) {
      children.forEach(child => {
        let node_manager = new Node_Manager(child);
        this.nodes.push(node_manager);
        this.collect_children(child.children);
      });
    }
  }
  is_responsive(){
    // searcy this.nodes for a one that has a dynamic property of responsive
    let responsive_node = this.nodes.find(node => node.dyanmic_properties === 'responsive');
    return responsive_node ? true : false;
  }

  largest_screen_finder(){
  
    let screen_size_values = [
        {value: 0, name: 'responsive-mobile'},
        {name: 'responsive-tablet', value: 768},
        {name: 'responsive-desktop', value: 1024},
        {name: 'responsive-big-desktop', value: 1440},
    ]
    let largest_screen = 'responsive-mobile';
     
       
     if(this.nodes){
       let largest_value =   this.nodes.reduce((largest_size, surface, index) => {
            let responsive_property = surface.dyanmic_properties;
           
            let current_screen = screen_size_values.find(screen => screen.name === responsive_property);

            if(current_screen && current_screen.value > largest_size) largest_size =  current_screen.value;
             
            console.log(index, 'index');
          return largest_size;
        }, 0
        )
        largest_screen =  screen_size_values.find(screen => screen.value === largest_value).name;

        console.log('in here');

     }
     return largest_screen;
  }
}

const application_manager = new App_Data_Manager(currentLayer);
application_manager.get_nodes();
let nodes = application_manager.nodes;
let isResponsive = application_manager.is_responsive();
let largest_screen = application_manager.largest_screen_finder();
console.log(nodes, 'nodes');
console.log(isResponsive, 'isResponsive');
console.log(largest_screen, 'largest_screen');

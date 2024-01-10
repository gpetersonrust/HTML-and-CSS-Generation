import NodeManager from "../../../figma_lib/NodeManager";

let useIds = [];
 
  
//# sourceMappingURL=code.js.map  // Example usage
  
  const currentLayer = figma.currentPage.selection[0]

  if(!currentLayer) {
    figma.closePlugin("Please select a layer and try again")
  } else {
    
    const nodeManager = new NodeManager(currentLayer,  useIds);
   let html =  nodeManager.html.generator()
  
  }
 

figma.closePlugin();
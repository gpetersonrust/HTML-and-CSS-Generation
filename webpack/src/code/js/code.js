 
import write_css_file from "../../../figma/filesystem/write_css_file";
import Node_Manager from "../../../figma/node_manager";
 (function() {
  const currentLayer = figma.currentPage.selection[0];

  if (!currentLayer) {
    figma.closePlugin("Please select a layer and try again");
  } else {
    const node_manager = new Node_Manager(currentLayer);

    node_manager.html.generate();
    let html = node_manager.html.html;
    let css_object = node_manager.html.css_objects_to_string;

    const css = new write_css_file(css_object).css_string;
 figma.showUI(__html__, { width: 800, height: 800 });
    figma.ui.postMessage({
      type: "generation",
      html: html,
      css: css,
    
    }, {origin: '*'});
  }
  // figma.closePlugin();
 })();
   


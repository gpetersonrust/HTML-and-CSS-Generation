import HTML_Generation from "./generation/html_generation";

 
export default class Node_Manager {
    constructor(node){
        this.node = node;
        this.html = new HTML_Generation(node);
    
      
         
    }

}
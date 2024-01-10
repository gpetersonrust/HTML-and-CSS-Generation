/**
 * Class representing a manager for Figma nodes.
 * Helps in handling properties and generating HTML for nodes.
 */
import { HTMLGenerationForFigma, CSSGenerationForFigma } from "./html_and_css";

class NodeManager {
    /**
     * Constructor for NodeManager class.
     * @param {Object} node - The Figma node to manage.
     * @param {Array} useIds - Array of used IDs for HTML generation.
     */
    constructor(node, useIds) {
        // Destructure node properties for cleaner assignment
        const {
            name,
            type,
            layoutMode: autoLayout,
            fills: fill,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            itemSpacing: spacing,
            primaryAxisAlignItems: direction,
            counterAxisAlignItems: counterAxis,
            height,
            width,
            x,
            y,
            rotation,
            opacity,
            visible,
            locked,
            constraints,
            effects,
            parent,
            children,
            description: desc,
            variantProperties: variants
        } = node;

        // Initialize properties with destructured values
        this.node = node;
        this.name = name;
        this.type = type;
        this.autoLayout = autoLayout;
        this.fill = fill;
        this.paddingTop = paddingTop;
        this.paddingBottom = paddingBottom;
        this.paddingLeft = paddingLeft;
        this.paddingRight = paddingRight;
        this.spacing = spacing;
        this.direction = direction;
        this.counterAxis = counterAxis;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.opacity = opacity;
        this.visible = visible;
        this.locked = locked;
        this.constraints = constraints;
        this.effects = effects;
        this.parent = parent;
        this.children = this.getChildrenArray(children, useIds);
        this.desc = desc;
        this.variants = null;
    
        // Get text-related properties for text nodes
        if (type === "TEXT") {
            this.getTextProperties(node);
        }

        // Get variants for components
        if (this.isComponentType()) {
            this.variants = variants;
          
        }

        this.html = new HTMLGenerationForFigma(node, null, useIds, this.variants, this.type);
      
    }

    /**
     * Get an array of child NodeManagers with visible true.
     * @param {Array} children - The array of child nodes.
     * @param {Array} useIds - Array of used IDs for HTML generation.
     * @returns {Array} - Array of child NodeManagers.
     */
    getChildrenArray(children, useIds) {
        return children
            ? children.filter(child => child.visible === true).map(child => new NodeManager(child, useIds))
            : [];
    }

    /**
     * Get text-related properties for text nodes.
     * @param {Object} node - The Figma text node.
     */
    getTextProperties(node) {
        const { characters, fontSize, fontName, textAlignHorizontal, textAlignVertical } = node;
        this.textValue = characters;
        this.fontSize = fontSize;
        this.fontFamily = fontName.family;
        this.textAlign = textAlignHorizontal;
        this.textVerticalAlign = textAlignVertical;
        // Add more text-related properties as needed
    }

    /**
     * Check if the node type is a component type.
     * @returns {boolean} - True if the node is a component type, otherwise false.
     */
    isComponentType() {
        return ["COMPONENT", "INSTANCE", "COMPONENT_SET"].includes(this.type);
    }
}

export default NodeManager;

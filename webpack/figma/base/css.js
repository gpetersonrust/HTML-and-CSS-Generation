/** 
 * Class representing a Base CSS Generator with various style options.
 */
class BaseCssGenerator {
    constructor() {
        this.baseCss = {
            flex: 'display: flex;',
            ['flex-row']: 'flex-direction: row;',
            ['flex-column']: 'flex-direction: column;',
            grid: 'display: grid;',
            ['grid-col-1']: 'grid-template-columns: repeat(1, minmax(0, 1fr));',
            ['grid-col-2']: 'grid-template-columns: repeat(2, minmax(0, 1fr));',
            ['grid-col-3']: 'grid-template-columns: repeat(3, minmax(0, 1fr));',
            ['grid-col-4']: 'grid-template-columns: repeat(4, minmax(0, 1fr));',
            ['grid-col-5']: 'grid-template-columns: repeat(5, minmax(0, 1fr));',
            ['grid-col-6']: 'grid-template-columns: repeat(6, minmax(0, 1fr));',
            ['grid-col-7']: 'grid-template-columns: repeat(7, minmax(0, 1fr));',
            ['grid-col-8']: 'grid-template-columns: repeat(8, minmax(0, 1fr));',
            ['grid-col-9']: 'grid-template-columns: repeat(9, minmax(0, 1fr));',
            ['grid-col-10']: 'grid-template-columns: repeat(10, minmax(0, 1fr));',
            ['grid-col-11']: 'grid-template-columns: repeat(11, minmax(0, 1fr));',
            ['grid-col-12']: 'grid-template-columns: repeat(12, minmax(0, 1fr));',
            inline: 'display: inline;',
            inline_block: 'display: inline-block;',
            hidden: 'display: none;',
            block: 'display: block;',
        };
    }

    /**
     * Generates padding styles by scale of 4.
     */
    generatePadding() {
        let max = 400;
        let paddingCombinations = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl'];

        paddingCombinations.forEach((paddingCombination) => {
            for (let i = 0; i <= max; i += 4) {
                if (paddingCombination === 'p') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding: ${i}px;`;
                }
                if (paddingCombination === 'px') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-left: ${i}px; padding-right: ${i}px;`;
                }
                if (paddingCombination === 'py') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-top: ${i}px; padding-bottom: ${i}px;`;
                }
                if (paddingCombination === 'pt') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-top: ${i}px;`;
                }
                if (paddingCombination === 'pr') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-right: ${i}px;`;
                }
                if (paddingCombination === 'pb') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-bottom: ${i}px;`;
                }
                if (paddingCombination === 'pl') {
                    this.baseCss[`${paddingCombination}-${i / 4}`] = `padding-left: ${i}px;`;
                }
            }
        });
    }

    /**
     * Generates margin styles by scale of 4.
     */
    generateMargin() {
        let max = 400;
        let marginCombinations = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'];

        marginCombinations.forEach((marginCombination) => {
            for (let i = 0; i <= max; i += 4) {
                this.baseCss[`${marginCombination}-${i / 4}`] = `margin-${marginCombination}: ${i}px;`;
            }
        });
    }

    /**
     * Generates width styles by scale of 4 with percentages.
     */
    generateWidth() {
        let max = 400;
        for (let i = 0; i <= max; i += 4) {
            this.baseCss[`w-${i / 4}`] = `width: ${i}px;`;
            this.baseCss[`min-w-${i / 4}`] = `min-width: ${i}px;`;
            this.baseCss[`max-w-${i / 4}`] = `max-width: ${i}px;`;
            this.baseCss[`w-${i / 4}-percent`] = `width: ${i / 4}%;`;
            this.baseCss[`min-w-${i / 4}-percent`] = `min-width: ${i / 4}%;`;
            this.baseCss[`max-w-${i / 4}-percent`] = `max-width: ${i / 4}%;`;
        }
    }

    /**
     * Generates border-radius styles by scale of 4.
     */
    generateBorderRadius() {
        let borderCombinations = ['border', 'border-top', 'border-right', 'border-bottom', 'border-left'];
        let max = 400;

        for (let i = 0; i <= max; i += 4) {
            borderCombinations.forEach((borderCombination) => {
                this.baseCss[`${borderCombination}-radius-${i / 4}`] = `${borderCombination}-radius: ${i}px;`;
                this.baseCss[`${borderCombination}-radius-${i / 4}-percent`] = `${borderCombination}-radius: ${i / 4}%;`;
            });
        }
    }

    /**
     * Generates opacity styles from .1 to 1 on scale of .1.
     */
    generateOpacity() {
        let max = 10;
        for (let i = 1; i <= max; i++) {
            this.baseCss[`opacity-${i}`] = `opacity: ${i / 10};`;
        }
    }

    /**
     * Generates all base CSS styles.
     */
    generate() {
        this.generatePadding();
        this.generateMargin();
        this.generateWidth();
        this.generateBorderRadius();
        this.generateOpacity();
        return this.baseCss;
    }
}

// Example usage
const baseCssGenerator = new BaseCssGenerator();
let css = baseCssGenerator.generate();
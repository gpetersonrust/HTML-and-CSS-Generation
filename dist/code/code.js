/*! For license information please see code.js.LICENSE.txt */
(()=>{var t={"./figma/Property Conversions/create_fill_style .js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>r});var i=s("./figma/utils/colors/color_capacity_converter.js");class r{constructor(t,e,s=!1){this.figmaLayers=t.fills,this.figmaLayers=this.figmaLayers.slice(0,3),this.process_array=e,this.isText=s,this.colorAndOpacityConverter=i.color_and_opacity_converter,this.convert_decimal_to_rgba_value=i.convert_decimal_to_rgba_value}fillSelection(){this.isText?this.textColorCss():this.figmaLayersToBackgroundCSS()}textColorCss(){let t=this.colorAndOpacityConverter(this.figmaLayers[0].color,this.figmaLayers[0].opacity);this.process_array.base.color=t}figmaLayersToBackgroundCSS(){let t=this.imageOrSolidCss(this.figmaLayers[0]);if(t){if(this.parse_and_add_background_to_array(t),this.process_array.base.position="relative",this.figmaLayers.length>1){let t=this.imageOrSolidCss(this.figmaLayers[1]);this.parse_and_add_background_to_array(t,"before"),this.setStyles("before")}if(this.figmaLayers.length>2){let t=this.imageOrSolidCss(this.figmaLayers[2]);this.parse_and_add_background_to_array(t,"after"),this.setStyles("after",10)}}}imageOrSolidCss(t){if(t)return"IMAGE"===t.type?this.generateImageLayerCSS(t):"SOLID"===t.type?this.generateSolidLayerCSS(t):void 0}generateImageLayerCSS(t){return{"background-image":"url(https://picsum.photos/1600/800)","background-size":"cover","background-position":"center"}}generateSolidLayerCSS(t){return{background:this.colorAndOpacityConverter(t.color,t.opacity)}}parse_and_add_background_to_array(t,e="base"){Object.keys(t).forEach((s=>{this.process_array[e][s]=t[s]}))}setStyles(t,e=5){this.process_array[t].content="",this.process_array[t].position="absolute",this.process_array[t].top="0",this.process_array[t].left="0",this.process_array[t].width="100%",this.process_array[t].height="100%",this.process_array[t]["z-index"]=e}}},"./figma/Property Conversions/create_flex_size.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});class i{constructor(t,e){const{layoutMode:s,name:i,primaryAxisAlignItems:r,counterAxisAlignItems:a,layoutWrap:o,verticalPadding:n,horizontalPadding:c,itemSpacing:l,counterAxisSpacing:h}=t;this.layoutMode=s,this.name=i,this.primaryAxisAlignItems=r,this.counterAxisAlignItems=a,this.isGrid=i.toLowerCase().includes("grid"),this.isWrap="wrap"===o.toLowerCase(),this.css_to_be_processed=e,this.verticalPadding=n,this.horiztionalPadding=c,this.itemSpacing=l,this.counterAxisSpacing=h}generate(){return this.handleLayoutMode(),this.handleWrap(),this.handleFlex(),this.spacing(),this.css}spacing(){this.css_to_be_processed.base.padding=`${this.verticalPadding}px ${this.horiztionalPadding}px`,("HORIZONTAL"!==this.layoutMode||this.isWrap)&&("VERTICAL"!==this.layoutMode||this.isWrap)?this.css_to_be_processed.base.gap=`${this.counterAxisSpacing}px ${this.itemSpacing}px`:this.css_to_be_processed.base.gap=`${this.itemSpacing}px`}handleLayoutMode(){"NONE"!==this.layoutMode&&("HORIZONTAL"!==this.layoutMode||this.isGrid?"VERTICAL"!==this.layoutMode||this.isGrid?this.isGrid&&(this.css_to_be_processed.base.display="grid"):(this.css_to_be_processed.base.display="flex",this.css_to_be_processed.base["flex-direction"]="column"):(this.css_to_be_processed.base.display="flex",this.css_to_be_processed.base["flex-direction"]="row"))}handleWrap(){this.isWrap&&(this.css_to_be_processed.base["flex-wrap"]="wrap")}handleFlex(){if("flex"===this.css_to_be_processed.base.display){const t=this.convertAlignmentToCss("HORIZONTAL"===this.layoutMode?this.primaryAxisAlignItems:this.counterAxisAlignItems,"justify-content"),e=this.convertAlignmentToCss("HORIZONTAL"===this.layoutMode?this.counterAxisAlignItems:this.primaryAxisAlignItems,"align-items");this.css_to_be_processed.base["justify-content"]=t.split(":")[1].trim(),this.css_to_be_processed.base["align-items"]=e.split(":")[1].trim()}}convertAlignmentToCss(t,e){return`${e}: ${{min:"flex-start",center:"center",max:"flex-end"}[t=t.toLowerCase()]};`}}},"./figma/Property Conversions/create_size_style.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});class i{constructor(t,e,s=!1){this.node=t,this.css="",this.css_to_be_processed=e,this.isText=s}handleSizeOptions(){["minWidth","minHeight","maxWidth","maxHeight"].forEach((t=>{void 0!==this.node[t]&&0!==this.node[t]&&null!==this.node[t]&&(this.css_to_be_processed.base[t]=`${this.node[t]}px`)}))}calculateChildSize(){const{width:t,height:e,parent:s}=this.node;if(null==s.width||this.isText)return this.css_to_be_processed.base.width="100%",void(this.css_to_be_processed.base.height="auto");let i=t/s.width*100;i=i.toFixed(2),this.css_to_be_processed.base.width=`${i}%`;let r=e/s.height*100;r=r.toFixed(2),this.css_to_be_processed.base["aspect-ratio"]=`${t}/${e}`}generate(){const{width:t,parent:e}=this.node;return this.handleSizeOptions(),void 0!==t&&(e?this.calculateChildSize():(this.css+="width: 100%;\n",this.css+="height: 100%;\n")),this.css}}},"./figma/Property Conversions/create_text_style.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});class i{constructor(t,e){this.fills=t.fills,this.fontName=t.fontName,this.fontSize=t.fontSize,this.fontWeight=t.fontWeight,this.letterSpacing=t.letterSpacing,this.lineHeight=t.lineHeight,this.paragraphIndent=t.paragraphIndent,this.paragraphSpacing=t.paragraphSpacing,this.textCase=t.textCase,this.textDecoration=t.textDecoration,this.textAlignHorizontal=t.textAlignHorizontal,this.textAlignVertical=t.textAlignVertical,this.process_array=e,this.textCaseMappings={UPPER:"text-transform: uppercase",LOWER:"text-transform: lowercase",TITLE:"text-transform: capitalize",ORIGINAL:"text-transform: none"},this.textDecorationMappings={UNDERLINE:"text-decoration: underline",STRIKETHROUGH:"text-decoration: line-through",NONE:"text-decoration: none"}}static getStyleByValue(t,e){return e[t]||""}createTextStyle(){const t={PIXELS:"px",PERCENT:"%",AUTO:"auto"};let e=i.getStyleByValue(this.textDecoration,this.textDecorationMappings).split(":")[1];this.process_array.base["text-decoration"]=e.trim();let s=isNaN(this.letterSpacing.value)?"":this.letterSpacing.value;s&&(this.process_array.base["letter-spacing"]=`${s}${t[this.letterSpacing.unit]}`);let r=isNaN(this.lineHeight.value)?"":this.lineHeight.value;r&&(this.process_array.base["line-height"]=`${Math.round(r)}${t[this.lineHeight.unit]}`);let a=isNaN(this.paragraphSpacing)?"":this.paragraphSpacing;a&&(this.process_array.base["margin-bottom"]=`${Math.round(a)}px`);let o=i.getStyleByValue(this.textCase,this.textCaseMappings).split(":")[1];this.process_array.base["text-transform"]=o.trim(),this.process_array.base["font-family"]=this.fontName.family,this.process_array.base["font-size"]=this.fontSize+"px",this.process_array.base["font-weight"]=this.fontWeight;let n=this.textAlignHorizontal.toLowerCase();n.includes("left")||(this.process_array.base["text-align"]=n),this.fontName.style.toLowerCase().includes("italic")&&(this.process_array.base["font-style"]="italic")}}},"./figma/Property Conversions/utility_style_creator.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>r});var i=s("./figma/utils/colors/color_capacity_converter.js");class r{constructor(t,e){this.node=t,this.css_to_be_processed=e}generate(){[this.createRadiusStyle.bind(this),this.createBorderStyle.bind(this),this.createOpacityStyles.bind(this),this.createRotationStyle.bind(this),this.createDropshadowStyle.bind(this)].forEach((t=>{let e=t&&t()||null;if(e){Object.keys(e).forEach((t=>{this.css_to_be_processed.base[t]=e[t]}))}}))}createRadiusStyle(){const{topLeftRadius:t,topRightRadius:e,bottomRightRadius:s,bottomLeftRadius:i}=this.node||null;if((t||e||s||i)&&(0!==t||0!==e||0!==s||0!==i))return{"border-radius":`${t}px ${e}px ${s}px ${i}px`}}createPaddingStyle(){const{paddingTop:t,paddingRight:e,paddingBottom:s,paddingLeft:i}=this.node||null;if(t||e||s||i)return{padding:`${t}px ${e}px ${s}px ${i}px`}}createBorderStyle(){const{strokes:t,strokeTopWeight:e,strokeRightWeight:s,strokeBottomWeight:r,strokeLeftWeight:a}=this.node||null;if(!t)return;const o=t&&t[0];if(!o)return null;const{color:n,opacity:c}=o,l=c.toFixed(2);let h;return h=e===s&&e===r&&e===a?`${e}px`:`${e}px ${s}px ${r}px ${a}px`,{border:`${h}  solid ${(0,i.color_and_opacity_converter)(n,l)}`}}createOpacityStyles(){const{opacity:t}=this.node||null;if(!t)return;return{opacity:`${t.toFixed(2)}`}}createRotationStyle(){const{rotation:t}=this.node||null;let e=t;if(e)return e=e.toFixed(2),{transform:`rotate(${e||0}deg)`}}createDropshadowStyle(){const{effects:t}=this.node||null;if(!t)return;const e=t&&t.find((t=>"DROP_SHADOW"===t.type));if(!e)return null;const{color:s,offset:r,radius:a,spread:o}=e;let n={r:s.r,g:s.g,b:s.b};const c=s.a.toFixed(2),l=(0,i.color_and_opacity_converter)(n,c);return{"box-shadow":`${r.x}px ${r.y}px ${a}px ${o}px  ${l}`}}}},"./figma/constants/tags.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",p:"p",image:"img",section:"section",aside:"aside",form:"form",input:"input",button:"button",label:"label",select:"select",option:"option",textarea:"textarea",div:"div",span:"span",ul:"ul",li:"li",ol:"ol",nav:"nav",header:"header",footer:"footer",main:"main",article:"article",a:"a"}},"./figma/filesystem/write_css_file.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=class{constructor(t){this.css_objects=t,this.remove_duplicates(),this.css_string=this.css_string_constructor()}css_string_constructor(){let t="";return this.clean_css_objects.forEach((e=>{["base","before","after","hover","focus"].forEach((s=>{let i=e[s],r=Object.keys(i);if(!e||!r||0===r.length)return;let a=e.modify_id?`#${e.id}`:"";t+=`${a} .${e.class_name}${"base"===s?"":`:${s}`} { \n`,r.forEach((e=>{let s=i[e];s&&["undefined","null","","none","auto","1","1.00"].includes(s)||(t+=`${e}: ${s}; \n`)})),t+="} \n \n"}))})),t}remove_duplicates(){this.clean_css_objects=[],this.css_objects.forEach((t=>{this.removeDuplicateStates(t)}))}removeDuplicateStates(t){let e=this.clean_css_objects.find((e=>e.class_name===t.class_name));e?(this.removeDuplicateProperties(t,e),this.clean_css_objects.push(t)):(t.modify_id=!1,this.clean_css_objects.push(t))}removeDuplicateProperties(t,e){["base","before","after","hover","focus"].forEach((s=>{let i=t[s],r=Object.keys(i);t&&r&&0!==r.length&&r.forEach((r=>{let a=i[r];a&&e[s][r]===a&&delete t[s][r]}))})),t.modify_id=!0}}},"./figma/generation/css_genereation.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>c});var i=s("./figma/Property Conversions/create_fill_style .js"),r=s("./figma/Property Conversions/create_flex_size.js"),a=s("./figma/Property Conversions/create_size_style.js"),o=s("./figma/Property Conversions/create_text_style.js"),n=s("./figma/Property Conversions/utility_style_creator.js");class c{constructor(t,e,s){this.node=t,this.id=e,this.class_name=s,this.css="",this.parent=t.parent,this.grid=t.name.toLowerCase().includes("grid"),this.flex=t.name.toLowerCase().includes("flex"),this.css_to_be_processed={id:this.id,class_name:this.class_name,screenSize:"desktop",base:{},before:{},after:{},hover:{},focus:{}},this.layoutMode=t.layoutMode,this.isText="TEXT"===this.node.type}generate(){return this.css=this.css_creation(),this.css_to_be_processed}css_creation(){new i.default(this.node,this.css_to_be_processed,this.isText).fillSelection();this.isText&&new o.default(this.node,this.css_to_be_processed).createTextStyle(),"NONE"==!this.layoutMode&&new r.default(this.node,this.css_to_be_processed).generate(),new a.default(this.node,this.css_to_be_processed,this.isText).generate(),new n.default(this.node,this.css_to_be_processed,this.isText).generate()}}},"./figma/generation/html_generation.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>n});var i=s("./figma/constants/tags.js"),r=s("./node_modules/uid/dist/index.mjs"),a=s("./figma/generation/css_genereation.js"),o=s("./figma/node_manager.js");class n{constructor(t){this.node=t}generate(t=1,e=[]){return this.indentation=t,this.css_objects_to_string=e,this.html=this.html_creation(),this.html}html_creation(){const{tag:t,id:e,variant_classes:s}=this.tag_handler(this.node.name);this.css=new a.default(this.node,this.id,s),this.css=this.css.generate(),this.css_objects_to_string.push(this.css);const i=this.isText(this.node),r=this.indentation_spacing();let o=i?this.node.characters:"";const n=this.is_closed_html_elements_method(t),c=n?"":`</${i?"span":t}>`;return`\n${r}<${i?"span":t} id="${e}" class="${s}"${n?"/":""}>${o}${this.convert_children_to_html(this.node.children)}${i?"":r}${c}`}tag_handler(t){let e=t;t=t.split(".")[0];const s=i.default[t.toLowerCase()]||"div",{id:r,variant_classes:a}=this.attributes(e);return{tag:s,id:r,variant_classes:a}}attributes(t){t.includes(".")&&(t=t.split(".")[1]);const e=(""+(t.toLowerCase()+"-"+(0,r.uid)(10))).replaceAll(" ","-"),s=t.toLowerCase().replaceAll(" ","-");this.id=e,this.class_name=s;return{id:e,variant_classes:`${s}${this.get_variants()}`}}get_variants(){return this.node.variantProperties?Object.keys(this.node.variantProperties).map((t=>`  ${this.node.variantProperties[t].toLowerCase().replace(" ","-")}`)).join(""):""}is_closed_html_elements_method(t){return["img","input","br","hr","meta","link","param","source","area","base","col","embed","keygen","menuitem","track","wbr"].includes(t)}convert_children_to_html(t){if(!t||!Array.isArray(t))return"";return`${this.indentation_spacing()}${t.map((t=>new o.default(t).html.generate(this.indentation+1,this.css_objects_to_string))).join("")}\n`}indentation_spacing(){let t="";for(let e=0;e<this.indentation;e++)t+="  ";return t}isText(t){return"TEXT"===t.type}}},"./figma/node_manager.js":(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>r});var i=s("./figma/generation/html_generation.js");class r{constructor(t){this.node=t,this.html=new i.default(t)}}},"./figma/utils/colors/color_capacity_converter.js":t=>{const e=(t,e,s)=>{const i=t=>{const e=t.toString(16);return 1===e.length?"0"+e:e};return`#${i(t)}${i(e)}${i(s)}`},s=(t=.5)=>Math.round(255*t);t.exports={color_and_opacity_converter:(t,i)=>{const{r,g:a,b:o}=t,n=s(r),c=s(a),l=s(o);if(1==+i){return e(n,c,l)}return`rgba(${n}, ${c}, ${l}, ${i})`},rgb_to_hex:e,convert_decimal_to_rgba_value:s}},"./node_modules/uid/dist/index.mjs":(t,e,s)=>{"use strict";s.r(e),s.d(e,{uid:()=>n});for(var i,r=256,a=[],o=256;r--;)a[r]=(r+256).toString(16).substring(1);function n(t){var e=0,s=t||11;if(!i||r+s>2*o)for(i="",r=0;e<o;e++)i+=a[256*Math.random()|0];return i.substring(r,r+++s)}}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var a=e[i]={exports:{}};return t[i](a,a.exports,s),a.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};(()=>{"use strict";s.r(i);var t=s("./figma/filesystem/write_css_file.js"),e=s("./figma/node_manager.js");!function(){const s=figma.currentPage.selection[0];if(s){const i=new e.default(s);i.html.generate();let r=i.html.html,a=i.html.css_objects_to_string;const o=new t.default(a).css_string;figma.showUI(__html__,{width:800,height:800}),figma.ui.postMessage({type:"generation",html:r,css:o},{origin:"*"})}else figma.closePlugin("Please select a layer and try again")}()})()})();
//# sourceMappingURL=code.js.map
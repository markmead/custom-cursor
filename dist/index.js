
function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}export default class CustomCursor{constructor(a){this.data=a,_defineProperty(this,"hoverTargets",void 0),_defineProperty(this,"browserCursor",void 0),_defineProperty(this,"secondCursor",void 0),_defineProperty(this,"name","custom-cursor"),_defineProperty(this,"secondName","custom-cursor-second"),_defineProperty(this,"defaultStyle","position: fixed; pointer-events: none;"),_defineProperty(this,"bodyElement",document.getElementsByTagName("body")[0]),_defineProperty(this,"htmlElement",document.getElementsByTagName("html")[0]),this.hoverTargets=this.data.hoverTargets||!1,this.browserCursor=this.data.browserCursor||!1,this.secondCursor=this.data.secondCursor||!1}init(){const a=document.createElement("div");if(this.create(a,this.name),this.secondCursor){const a=document.createElement("div");this.create(a,this.secondName)}this.browserCursor||(this.htmlElement.style.cursor="none")}create(a,b){a.setAttribute("id",b),a.setAttribute("class",b),a.setAttribute("style",this.defaultStyle),this.bodyElement.append(a)}move(){const a=document.getElementById(this.name),b=document.getElementById(this.secondName);document.addEventListener("mousemove",c=>{const{clientX:d,clientY:e}=c;a&&this.position(a,d,e),b&&this.position(b,d,e)})}position(a,b,c){a.style.left=`${b-a.offsetWidth/2}px`,a.style.top=`${c-a.offsetHeight/2}px`}status(){if(this.hoverTargets instanceof Array)for(const a of this.hoverTargets){const b=document.querySelectorAll(a);for(const c of b)c.addEventListener("mouseover",this.hover.bind(this,a)),c.addEventListener("mouseleave",this.hover.bind(this,a))}}hover(a){const b=a.replace(/[.#!]/g,"");this.bodyElement.classList.toggle(`${this.name}-hover--${b}`)}mount(){this.init(),this.move(),this.status()}}

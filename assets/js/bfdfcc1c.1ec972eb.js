"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1613],{3905:(e,a,t)=>{t.d(a,{kt:()=>d});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=n.createContext({}),p=function(e){var a=n.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},l="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},g=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),g=p(t),d=r,m=g["".concat(s,".").concat(d)]||g[d]||u[d]||i;return t?n.createElement(m,o(o({ref:a},l),{},{components:t})):n.createElement(m,o({ref:a},l))}));function d(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=g;var c={};for(var s in a)hasOwnProperty.call(a,s)&&(c[s]=a[s]);c.originalType=e,c[l]="string"==typeof e?e:r,o[1]=c;for(var p=2;p<i;p++)o[p]=t[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}g.displayName="MDXCreateElement"},4969:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>s,contentTitle:()=>o,default:()=>g,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=t(3117),r=(t(7294),t(3905));const i={id:"index",sidebar_position:4},o="Nexus Package Manager",c={unversionedId:"package-manager/index",id:"package-manager/index",title:"Nexus Package Manager",description:"Purpose of the Package Manager",source:"@site/docs/package-manager/index.md",sourceDirName:"package-manager",slug:"/package-manager/",permalink:"/nexus-scripts/docs/package-manager/",draft:!1,editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/docs/package-manager/index.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"index",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Interactions between classes",permalink:"/nexus-scripts/docs/bashing-priorities/technical_documentation/class_interactions"},next:{title:"Basic Usage",permalink:"/nexus-scripts/docs/package-manager/basic_usage"}},s={},p=[{value:"Purpose of the Package Manager",id:"purpose-of-the-package-manager",level:2},{value:"Including your packages in the package listing",id:"including-your-packages-in-the-package-listing",level:2}],l={toc:p},u="wrapper";function g(e){let{components:a,...t}=e;return(0,r.kt)(u,(0,n.Z)({},l,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"nexus-package-manager"},"Nexus Package Manager"),(0,r.kt)("h2",{id:"purpose-of-the-package-manager"},"Purpose of the Package Manager"),(0,r.kt)("p",null,"The Iron Realms Nexus client allows players to write own reflexes that enhance gameplay by reacting to game output automatically, using shortcut commands, scripts and more. They are organized in packages and can be downloaded and shared with other players. However, there is currently no official central repository or way to discover, which public packages exist."),(0,r.kt)("p",null,"Some of the packages reach a greater complexity and require other packages to provide base functionality."),(0,r.kt)("p",null,"The package manager aims to solve these problem by using ",(0,r.kt)("a",{parentName:"p",href:"https://keneanung.github.io/nexus-package-repository/"},"a community based public package listing")," and automating the installation and update of packages and their dependencies, all through the Nexus user interface."),(0,r.kt)("h2",{id:"including-your-packages-in-the-package-listing"},"Including your packages in the package listing"),(0,r.kt)("p",null,"Please refer to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-package-repository"},"the package listing repository")," for more information on what packages are accepted and how to include your package."))}g.isMDXComponent=!0}}]);
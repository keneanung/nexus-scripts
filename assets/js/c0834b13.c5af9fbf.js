"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2625],{3905:(e,t,n)=>{n.d(t,{kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,v=d["".concat(l,".").concat(f)]||d[f]||u[f]||s;return n?r.createElement(v,i(i({ref:t},c),{},{components:n})):r.createElement(v,i({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7148:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var r=n(3117),a=(n(7294),n(3905));const s={},i="Using the event bus in external TypeScript projects",o={unversionedId:"event-bus/advanced_usage/external_ts",id:"event-bus/advanced_usage/external_ts",title:"Using the event bus in external TypeScript projects",description:"Using the event bus in external TypeScript projects is slightly difficult as TypeScript does not know of the type for the global variable eventBus. Additionally, using the interface functions will make the tests fail as the global is not defined.",source:"@site/docs/event-bus/advanced_usage/external_ts.md",sourceDirName:"event-bus/advanced_usage",slug:"/event-bus/advanced_usage/external_ts",permalink:"/nexus-scripts/docs/event-bus/advanced_usage/external_ts",draft:!1,editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/docs/event-bus/advanced_usage/external_ts.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Basic Usage",permalink:"/nexus-scripts/docs/event-bus/basic_usage"},next:{title:"Using the event bus as an internal dependency for events",permalink:"/nexus-scripts/docs/event-bus/advanced_usage/internal_events"}},l={},p=[],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"using-the-event-bus-in-external-typescript-projects"},"Using the event bus in external TypeScript projects"),(0,a.kt)("p",null,"Using the event bus in external TypeScript projects is slightly difficult as TypeScript does not know of the type for the global variable ",(0,a.kt)("inlineCode",{parentName:"p"},"eventBus"),". Additionally, using the interface functions will make the tests fail as the global is not defined."),(0,a.kt)("p",null,"Solving the first issue is relatively straight forward as we need to ",(0,a.kt)("inlineCode",{parentName:"p"},"declare")," the variable so TypeScript knows of it. First install the package ",(0,a.kt)("inlineCode",{parentName:"p"},"@keneanung/nexus-event-bus")," (i.e. through a terminal):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @keneanung/nexus-event-bus\n")),(0,a.kt)("p",null,"Then add the following to the top of the ",(0,a.kt)("inlineCode",{parentName:"p"},"src/index.ts")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { IEventBus } from "@keneanung/nexus-event-bus";\n\ndeclare global {\n  // eslint-disable-next-line no-var\n  var eventBus: IEventBus\n};\n')),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"eslint-disable-next-line")," is there to prevent the ESLint rule ",(0,a.kt)("inlineCode",{parentName:"p"},"no-var")," from complaining about the global variable. But we need to declare it as ",(0,a.kt)("inlineCode",{parentName:"p"},"var")," to be able to assign it in tests."),(0,a.kt)("p",null,"To make the tests work, the easiest way would be to install the npm package ",(0,a.kt)("inlineCode",{parentName:"p"},"jest-mock-extended")," as a development dependency and use it like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { mock } from 'jest-mock-extended';\nimport { IEventBus } from '@keneanung/nexus-event-bus';\n\nglobalThis.eventBus = mock<IEventBus>();\n\ntest('My Greeter', () => {\n  expect(Greeter('Carl')).toBe('');\n});\n")))}d.isMDXComponent=!0}}]);
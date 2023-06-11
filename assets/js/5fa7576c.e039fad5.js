"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5694],{3905:(e,t,r)=>{r.d(t,{kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},g="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),p=l(r),f=a,y=p["".concat(c,".").concat(f)]||p[f]||u[f]||i;return r?n.createElement(y,o(o({ref:t},g),{},{components:r})):n.createElement(y,o({ref:t},g))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[g]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},9089:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(3117),a=(r(7294),r(3905));const i={},o="Interactions between classes",s={unversionedId:"bashing-priorities/technical_documentation/class_interactions",id:"bashing-priorities/technical_documentation/class_interactions",title:"Interactions between classes",description:"Class diagram",source:"@site/docs/bashing-priorities/technical_documentation/class_interactions.md",sourceDirName:"bashing-priorities/technical_documentation",slug:"/bashing-priorities/technical_documentation/class_interactions",permalink:"/nexus-scripts/docs/bashing-priorities/technical_documentation/class_interactions",draft:!1,editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/docs/bashing-priorities/technical_documentation/class_interactions.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Nexus Bashing Priorities",permalink:"/nexus-scripts/docs/bashing-priorities/"},next:{title:"Nexus Package Manager",permalink:"/nexus-scripts/docs/package-manager/"}},c={},l=[{value:"Class diagram",id:"class-diagram",level:2}],g={toc:l},u="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"interactions-between-classes"},"Interactions between classes"),(0,a.kt)("h2",{id:"class-diagram"},"Class diagram"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-mermaid"},"classDiagram\n\nclass PriorityList{\n  -prios\n  +PriorityList(priorityArray)\n  +AsArray()\n  +PriorityOf( name) number\n  +Append(name)\n  +Remove(name)\n}\n\nclass AreaPriorities{\n  -priorityLists\n  +AreaPriorities(priorityDictionary)\n  +SetPriorityOrder(area, priorityArray)\n  +AsDictionary()\n  +GetPriority(area, name)\n  +Append(area, name)\n  +Remove(area, name)\n}\n\nclass Configuration{\n  +Priorities\n  +Configuration(config)\n  +AsPrimitive()\n}\n\nclass ConfigurationService{\n  -configuration\n  +setConfiguration(config)\n  +getConfiguration()\n  +addTargetPriority(area, target)\n  +removeTargetPriority(area, target)\n  +getPriority(area, target)\n}\n\nclass ITargetPriorityQueryable{\n  <<Interface>>\n  +getPriority(area, target)\n}\n\nBashing *-- ConfigurationService\n\nITargetPriorityQueryable <|-- ConfigurationService\nConfigurationService --\x3e Configuration\n\n\nConfiguration *-- AreaPriorities\nConfiguration *-- BattlerageStrategy\nConfiguration *-- AttackStrategy\n\nAreaPriorities *-- PriorityList\n\nBashing *-- TargetList\n\nAttacker --\x3e TargetList\n\nTargetList --\x3e ITargetPriorityQueryable\n\nBashing *-- Attacker\n\nAttacker --\x3e AttackStrategy\nAttacker --\x3e BattlerageTracker\n\nBashing *-- BattlerageTracker\n\nAttacker --\x3e QueueManager\nAttacker --\x3e ShieldTracker\nAttacker --\x3e FleeManager\n\nFleeManager --\x3e HealthTracker\nFleeManager --\x3e FleeConfiguration\n\n\nConfiguration *-- FleeConfiguration\n\nBattlerageTracker *-- BattlerageAbility\nBattlerageTracker *-- BattlerageAttackStatusTracker\nBattlerageTracker --\x3e BattlerageStrategy\nBattlerageTracker --\x3e DenizenAfflictionTracker\n\nBattlerageAttackStatusTracker --\x3e BattlerageAbility\n\nDenizenAfflictionTracker --\x3e DenizenAffliction\n\n")))}p.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[537],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),h=a,m=p["".concat(l,".").concat(h)]||p[h]||f[h]||o;return n?r.createElement(m,s(s({ref:t},u),{},{components:n})):r.createElement(m,s({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6725:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(3117),a=(n(7294),n(3905));const o={authors:"keneanung"},s="Khaseems Wishlist: v0.1.1",i={permalink:"/nexus-scripts/blog/2021/04/27/_Khaseems_Wishlist",editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/blog/blog/2021-04-27_Khaseems_Wishlist.md",source:"@site/blog/2021-04-27_Khaseems_Wishlist.md",title:"Khaseems Wishlist: v0.1.1",description:"This release is something, the Achaean Player Khaseem wished for. He's been using the original EventStream module of NexSys very extenively. However, he'd like to move to an external package to help the adoption of a standard set of Nexus packages.",date:"2021-04-27T00:00:00.000Z",formattedDate:"April 27, 2021",tags:[],readingTime:1.01,hasTruncateMarker:!1,authors:[{name:"keneanung",url:"https://github.com/keneanung",email:"keneanung@gmail.com",key:"keneanung"}],frontMatter:{authors:"keneanung"},prevItem:{title:"Hello World",permalink:"/nexus-scripts/blog/2021/10/27/_hello_world"}},l={authorsImageUrls:[void 0]},c=[{value:"New Features",id:"new-features",level:2}],u={toc:c},p="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This release is something, the Achaean Player Khaseem wished for. He's been using the original EventStream module of NexSys very extenively. However, he'd like to move to an external package to help the adoption of a standard set of Nexus packages."),(0,a.kt)("p",null,"The original EventStream had a set of features that were part of his development flow: The ability to unsubscribe from events using a function name and access to the list of subscribers to an event."),(0,a.kt)("p",null,"While the former is about a preferred coding style, the latter is useful for debugging code: That way you can easily have a look at the list of subscribers to an event and determine if all subscribers actually belong there at this point."),(0,a.kt)("h2",{id:"new-features"},"New Features"),(0,a.kt)("p",null,"You may now subscribe or unsubscribe to events using a callback function name instead of a function reference. To avoid accidental overwriting of existing callbacks, especially between different users of the EventBus, duplicate subscription names generate an error. So you may want to namespace your event names."),(0,a.kt)("p",null,"You can now access the list of subscribers to an event using the ",(0,a.kt)("inlineCode",{parentName:"p"},"getSubscribers")," method. This allows easy inspection of the subscription state of callbacks. The subscribers may not be changed this way."))}f.isMDXComponent=!0}}]);
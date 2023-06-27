"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5313],{419:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>r,contentTitle:()=>u,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var n=a(7462),i=(a(7294),a(3905));a(8209);const s={id:"index",sidebar_position:5},u="Nexus Queue Manager",o={unversionedId:"queue-manager/index",id:"queue-manager/index",title:"Nexus Queue Manager",description:"Welcome to the documentation of the Queue Manager package for the IRE Nexus client.",source:"@site/docs/queue-manager/index.md",sourceDirName:"queue-manager",slug:"/queue-manager/",permalink:"/nexus-scripts/docs/queue-manager/",draft:!1,editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/docs/queue-manager/index.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"index",sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/nexus-scripts/docs/package-manager/api"},next:{title:"Basic Usage",permalink:"/nexus-scripts/docs/queue-manager/basic_usage"}},r={},c=[],l={toc:c},m="wrapper";function d(e){let{components:t,...a}=e;return(0,i.kt)(m,(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"nexus-queue-manager"},"Nexus Queue Manager"),(0,i.kt)("p",null,"Welcome to the documentation of the Queue Manager package for the IRE Nexus client."),(0,i.kt)("p",null,"The package tracks the content of the in-game balance queue and allows the user to integrate client-side queueing with it."),(0,i.kt)("p",null,"There are multiple problems with the in-game queue this project aims to tackle:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"All queued actions that share balances are run at the same time, whether they consume a balance (and block following actions) or not"),(0,i.kt)("li",{parentName:"ul"},"Requeueing repeating actions is not automatic"),(0,i.kt)("li",{parentName:"ul"},"Custom queue names are not very readable"),(0,i.kt)("li",{parentName:"ul"},"Integration with externally queued commands needs coordination through parsing game text. This package centralizes that.")),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"CAUTION"),": The manager tries to stay out-of-the way and integrate painlessly with other external queue item sources. However, there might be conflicts these different sources and their expectations about how they can manage the individual items in the queue.")),(0,i.kt)("p",null,"This documentation describes the usage of the package and offers some best practices to look out for."))}d.isMDXComponent=!0}}]);
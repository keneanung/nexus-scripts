"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2719],{9654:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>l});var a=n(7462),s=(n(7294),n(3905));n(8209);const i={authors:"keneanung",tags:["typings","release-notes"]},o="What's Your Type?",r={permalink:"/nexus-scripts/blog/2023/07/17/_Whats_your_type",editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/blog/blog/2023-07-17_Whats_your_type.md",source:"@site/blog/2023-07-17_Whats_your_type.md",title:"What's Your Type?",description:"You have a type",date:"2023-07-17T00:00:00.000Z",formattedDate:"July 17, 2023",tags:[{label:"typings",permalink:"/nexus-scripts/blog/tags/typings"},{label:"release-notes",permalink:"/nexus-scripts/blog/tags/release-notes"}],readingTime:1.325,hasTruncateMarker:!1,authors:[{name:"keneanung",url:"https://github.com/keneanung",email:"keneanung@gmail.com",key:"keneanung"}],frontMatter:{authors:"keneanung",tags:["typings","release-notes"]},prevItem:{title:"Taking Simplified Scripting to the Next Level",permalink:"/nexus-scripts/blog/2023/08/10/_Simplified_next_level"},nextItem:{title:"Breaking the UI",permalink:"/nexus-scripts/blog/2023/07/04/_Breaking_the_UI"}},p={authorsImageUrls:[void 0]},l=[{value:"The Problem",id:"the-problem",level:2},{value:"What&#39;s Breaking?",id:"whats-breaking",level:2}],u={toc:l},h="wrapper";function c(e){let{components:t,...n}=e;return(0,s.kt)(h,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://media1.giphy.com/media/f16wgrNYaKkBcvOu5r/giphy.gif",alt:"You have a type"})),(0,s.kt)("p",null,"Part of what makes TypeScript so enjoyable for me is the ability for IDEs and tooling to check, whether functions, objects and properties you use actually exist.\nHowever, since TypeScript is interoperable with the vast JavaScript ecosystem which doesn't support the type system out of the box, away to add the information is required.\nEnter typings. This is a way to declare the typings of a JavaScript object through a number of helper files without adding functionality."),(0,s.kt)("p",null,"Since Nexus is written in plain JavaScript and doesn't publish any type information, the subproject ",(0,s.kt)("inlineCode",{parentName:"p"},"@keneanung/iron-realms-nexus-typings")," was created. It is a ever expanding collection\nof typings for the different Nexus APIs and classes it uses."),(0,s.kt)("h2",{id:"the-problem"},"The Problem"),(0,s.kt)("p",null,"Writing the types itself is pretty straightforward since they mostly use standard TypeScript constructs. However, structuring them in a way that is logical and that makes the global\n",(0,s.kt)("inlineCode",{parentName:"p"},"nexusclient")," object available, is hard 8for me). TypeScript by default supports Module syntaxes only. After some trial and error, I found a way to support both the monorepo usecase of this repository\nas well as consuming the types in an external project like ",(0,s.kt)("a",{parentName:"p",href:"https://keneanung.github.io/nssc/"},"nssc"),"."),(0,s.kt)("h2",{id:"whats-breaking"},"What's Breaking?"),(0,s.kt)("p",null,"Due to the restructuring, types for the different Nexus objects like Reflexes, Actions and so on now need to be imported like normal classes (eg. ",(0,s.kt)("inlineCode",{parentName:"p"},"import {Reflex} from '@keneanung/irong-realms-nexus-typings'"),")\ninstead of using the ",(0,s.kt)("inlineCode",{parentName:"p"},"nexusclient")," namespace. Functions like ",(0,s.kt)("inlineCode",{parentName:"p"},"ui()")," or ",(0,s.kt)("inlineCode",{parentName:"p"},"send_commands()")," on the namespace still work by siply using the namespace without any imports: ",(0,s.kt)("inlineCode",{parentName:"p"},"nexusclient.send_commands()"),"."),(0,s.kt)("p",null,"If you like the project, please consider leaving a star on the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts"},"GitHub project")," and ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/sponsors/keneanung"},"sponsoring me"),"."))}c.isMDXComponent=!0}}]);
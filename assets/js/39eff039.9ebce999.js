"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7208],{5761:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>h});var n=a(7462),s=(a(7294),a(3905));a(8209);const o={authors:"keneanung",tags:["typings","package-manager","release-notes"]},i="Breaking the UI",r={permalink:"/nexus-scripts/blog/2023/07/04/_Breaking_the_UI",editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/blog/blog/2023-07-04_Breaking_the_UI.md",source:"@site/blog/2023-07-04_Breaking_the_UI.md",title:"Breaking the UI",description:"Howdy! This release was brought to you by an unforseen change on the Nexus side, which caused external UI tabs to be saved with the settings. That in itself wouldn't be too bad if it didn't mean that critical information that made the tab an UI element was lost. So on restoring these UI elements, the whole UI would crash and all you were left with is a blank screen.",date:"2023-07-04T00:00:00.000Z",formattedDate:"July 4, 2023",tags:[{label:"typings",permalink:"/nexus-scripts/blog/tags/typings"},{label:"package-manager",permalink:"/nexus-scripts/blog/tags/package-manager"},{label:"release-notes",permalink:"/nexus-scripts/blog/tags/release-notes"}],readingTime:1.005,hasTruncateMarker:!1,authors:[{name:"keneanung",url:"https://github.com/keneanung",email:"keneanung@gmail.com",key:"keneanung"}],frontMatter:{authors:"keneanung",tags:["typings","package-manager","release-notes"]},nextItem:{title:"Queues!",permalink:"/nexus-scripts/blog/2023/06/26/_Queues"}},l={authorsImageUrls:[void 0]},h=[{value:"Additional Changes",id:"additional-changes",level:2}],u={toc:h},g="wrapper";function d(e){let{components:t,...a}=e;return(0,s.kt)(g,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Howdy! This release was brought to you by an unforseen change on the Nexus side, which caused external UI tabs to be saved with the settings. That in itself wouldn't be too bad if it didn't mean that critical information that made the tab an UI element was lost. So on restoring these UI elements, the whole UI would crash and all you were left with is a blank screen."),(0,s.kt)("p",null,"This release contains a workaround for the issue. Since the UI is already broken for most of you, the workaround I used to keep my packages was to log in via a mobile app (Android in my case, iOS should work as well, but not the browser!), gointo the settings, then ",(0,s.kt)("inlineCode",{parentName:"p"},"Custom Tabs")," and remove the ",(0,s.kt)("inlineCode",{parentName:"p"},"npkg_ui")," tab. If you then log into the webbrowser, the package manager should work on the browser and allow you to update the package manager with the workaround."),(0,s.kt)("h2",{id:"additional-changes"},"Additional Changes"),(0,s.kt)("p",null,"Since I was working with the webpack entrypoint anyways, I extended the Nexus typings by a few interfaces and functions to remove eslint and TypeScript magical comments."),(0,s.kt)("p",null,"If you like the project, please consider leaving a star on the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts"},"GitHub project")," and ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/sponsors/keneanung"},"sponsoring me"),"."))}d.isMDXComponent=!0}}]);
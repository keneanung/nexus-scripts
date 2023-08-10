"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[757],{7149:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));n(8209);const s={authors:"keneanung",tags:["typings","package-builder","simplified-scripting-converter","release-notes"]},o="Taking Simplified Scripting to the Next Level",r={permalink:"/nexus-scripts/blog/2023/08/10/_Simplified_next_level",editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/blog/blog/2023-08-10_Simplified_next_level.md",source:"@site/blog/2023-08-10_Simplified_next_level.md",title:"Taking Simplified Scripting to the Next Level",description:"There has been a lot of discussion on Simplified Scripting in Nexus 3, especially on the Nexus Discord channel.",date:"2023-08-10T00:00:00.000Z",formattedDate:"August 10, 2023",tags:[{label:"typings",permalink:"/nexus-scripts/blog/tags/typings"},{label:"package-builder",permalink:"/nexus-scripts/blog/tags/package-builder"},{label:"simplified-scripting-converter",permalink:"/nexus-scripts/blog/tags/simplified-scripting-converter"},{label:"release-notes",permalink:"/nexus-scripts/blog/tags/release-notes"}],readingTime:2.165,hasTruncateMarker:!1,authors:[{name:"keneanung",url:"https://github.com/keneanung",email:"keneanung@gmail.com",key:"keneanung"}],frontMatter:{authors:"keneanung",tags:["typings","package-builder","simplified-scripting-converter","release-notes"]},nextItem:{title:"What's Your Type?",permalink:"/nexus-scripts/blog/2023/07/17/_Whats_your_type"}},l={authorsImageUrls:[void 0]},p=[{value:"Introducing a Converter",id:"introducing-a-converter",level:2},{value:"Steps forward",id:"steps-forward",level:2},{value:"What else?",id:"what-else",level:2}],c={toc:p},d="wrapper";function h(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"There has been a lot of discussion on Simplified Scripting in Nexus 3, especially on the Nexus Discord channel."),(0,i.kt)("p",null,'On the one hand, simplified scripting is useful for people who are not used to coding. They are not overwhelmed by an empty box and infinite amount of possibilities to do something wrong. Instead, they are presented with a slimmed down list of options that they can use and can fully concentrate on the "what" they want to do and most of the "how" is abstracted away. It gets them in the mindset of algorithmical thinking while not making them think about syntax and formal language.'),(0,i.kt)("p",null,"But once they want to break outside the box of Simplified Scripting and the limited actions that are supported, some users have already created complex systems. They now need to convert that to traditional JavaScript, which can be a tedious and daunting process. Additionally, they need to learn coding syntax and formal language and look up the Nexus API for the same things they had already made."),(0,i.kt)("h2",{id:"introducing-a-converter"},"Introducing a Converter"),(0,i.kt)("p",null,"Since Simplified Scripting can be understood as an interpreted scripting language of sorts, it can also be converter (or transpiled) into actual JavaScript code."),(0,i.kt)("p",null,"While the resulting code is often overly complex (not all information, whether steps like variable expansion are needed, is available at transpilation time), it can serve as a good starting point to learn syntax and explore the Nexus API."),(0,i.kt)("p",null,"This release features the first version of a library that can do such conversions. It is not yet feature complete and misses transpilation support for more complex actions that require context (eg Goto, If, Repeat, Label) or rewrite the MUD output. But it is complete enough to convert simpler packages. Additionally, the release unblocks the development of its ",(0,i.kt)("a",{parentName:"p",href:"https://keneanung.github.io/nssc/"},"dependent project")," (see the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nssc/"},"GitHub project")," as well), a website that allows converting existing packages to a pure script version, compare these versions, and download the results."),(0,i.kt)("h2",{id:"steps-forward"},"Steps forward"),(0,i.kt)("p",null,"I try to bring both the converter library and the NSSC forward in an even pace. However, if you have ideas that can improve either projects, please contact me in the Nexus Discord. I also welcome contributions to all my projects, but especially help in these two of my current focus areas would be greatly appreciated."),(0,i.kt)("h2",{id:"what-else"},"What else?"),(0,i.kt)("p",null,"During the development, I noticed that some of the newer actions were missing from both the typings and the package builder. These projects were extended to include the new possibilities."),(0,i.kt)("p",null,"If you like the project, please consider leaving a star on the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts"},"GitHub project")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/sponsors/keneanung"},"sponsoring me"),"."))}h.isMDXComponent=!0}}]);
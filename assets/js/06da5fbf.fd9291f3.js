"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[392],{9681:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var n=a(7462),s=(a(7294),a(3905));a(8209);const r={authors:"keneanung",tags:["typings","event-bus","package-builder","package-manager","queue-manager","release-notes"]},o="Queues!",i={permalink:"/nexus-scripts/blog/2023/06/26/_Queues",editUrl:"https://github.com/keneanung/nexus-scripts/edit/development/website/blog/blog/2023-06-26_Queues.md",source:"@site/blog/2023-06-26_Queues.md",title:"Queues!",description:"This is the first release of the scripts within the new monorepo structure. For some background about the changes see here. Were're here now to celebrate the release itself!",date:"2023-06-26T00:00:00.000Z",formattedDate:"June 26, 2023",tags:[{label:"typings",permalink:"/nexus-scripts/blog/tags/typings"},{label:"event-bus",permalink:"/nexus-scripts/blog/tags/event-bus"},{label:"package-builder",permalink:"/nexus-scripts/blog/tags/package-builder"},{label:"package-manager",permalink:"/nexus-scripts/blog/tags/package-manager"},{label:"queue-manager",permalink:"/nexus-scripts/blog/tags/queue-manager"},{label:"release-notes",permalink:"/nexus-scripts/blog/tags/release-notes"}],readingTime:1.425,hasTruncateMarker:!1,authors:[{name:"keneanung",url:"https://github.com/keneanung",email:"keneanung@gmail.com",key:"keneanung"}],frontMatter:{authors:"keneanung",tags:["typings","event-bus","package-builder","package-manager","queue-manager","release-notes"]},prevItem:{title:"Breaking the UI",permalink:"/nexus-scripts/blog/2023/07/04/_Breaking_the_UI"},nextItem:{title:"A New Home for my Nexus Repositories",permalink:"/nexus-scripts/blog/2023/06/23/_a_new_home"}},u={authorsImageUrls:[void 0]},l=[{value:"New Script: Queue Manager",id:"new-script-queue-manager",level:2},{value:"Developer Documentation",id:"developer-documentation",level:2},{value:"More Infrastructure Changes",id:"more-infrastructure-changes",level:2},{value:"Other Changes",id:"other-changes",level:2}],h={toc:l},p="wrapper";function c(e){let{components:t,...a}=e;return(0,s.kt)(p,(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"This is the first release of the scripts within the new monorepo structure. For some background about the changes see ",(0,s.kt)("a",{parentName:"p",href:"/nexus-scripts/blog/2023/06/23/_a_new_home"},"here"),". Were're here now to celebrate the release itself! \u2764\ufe0f"),(0,s.kt)("h2",{id:"new-script-queue-manager"},"New Script: Queue Manager"),(0,s.kt)("p",null,"The queue manager introduced with this release is meant to make it easier to use the in-game queueing with your scripts. It tracks the queue, allows you to queue client-side commands and tries to integrate as seamlessly as possible with external queue sources."),(0,s.kt)("p",null,"This release does not allow for the foll flexibility of the in-game queueing yet (like prepending or adding at certain places in the queue), but it should be enough to vet the implementation. For more details, please refer to ",(0,s.kt)("a",{parentName:"p",href:"https://keneanung.github.io/nexus-scripts/docs/queue-manager/"},"the documentation"),"."),(0,s.kt)("h2",{id:"developer-documentation"},"Developer Documentation"),(0,s.kt)("p",null,"Due to the switch to the monorepo structure, I added a lot of additional developer documentation, like READMEs, ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts/blob/main/CODE_OF_CONDUCT.md"},"a Code of Conduct")," and ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts/blob/main/CONTRIBUTING.md"},"Contribution Guidelines"),". Please have a look!"),(0,s.kt)("h2",{id:"more-infrastructure-changes"},"More Infrastructure Changes"),(0,s.kt)("p",null,"In addition to the overall layout change of the repository and all linked changes, I also switch from dependabot to ",(0,s.kt)("a",{parentName:"p",href:"https://www.mend.io/renovate/"},"renovate"),". This hopefully further decreases the dependency maintenance burden as dependency upgrades are now bundled together. Currently, this still has some kinks to straighten out, but I'm sure we will get there."),(0,s.kt)("h2",{id:"other-changes"},"Other Changes"),(0,s.kt)("p",null,"Most packages should now export their classes as a global library, which webpack then can use to avoid bundling all the code with yours. This is still untested, so expect further changes in that area."),(0,s.kt)("p",null,"Additionally, quite a few of the linter and test rules saw some harmonization, which prompted a few non-code changes to follow best practices."),(0,s.kt)("p",null,"If you like the project, please consider leaving a star on the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-scripts"},"GitHub project")," and ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/sponsors/keneanung"},"sponsoring me"),"."))}c.isMDXComponent=!0}}]);
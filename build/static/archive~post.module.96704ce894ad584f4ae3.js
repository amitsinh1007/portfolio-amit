(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[0],{329:function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"a",(function(){return l}));var n=r(1),i=r(332),a=r(57),c=r(0);const s=Object(n.styled)("div",{target:"e1f4xj5v1"})({name:"nh1gw8",styles:"margin-top:2rem;@media (min-width: 700px){margin-top:3rem;}"}),l=Object(n.styled)("ul",{target:"e1f4xj5v0"})({name:"130c4ue",styles:"justify-content:center;color:#6d6d6d;display:flex;flex-wrap:wrap;font-size:1.5rem;font-weight:500;list-style:none;margin:-1rem 0 0 -2rem;svg{fill:currentColor;}@media (min-width: 700px){font-size:1.6rem;margin:-1.4rem 0 0 -3rem;}"});Object(n.connect)(({state:e,item:t})=>{const r=e.source.author[t.author],m=new Date(t.date);return Object(c.jsx)(s,{children:Object(c.jsxs)(l,{children:[r&&Object(c.jsxs)(i.a,{icon:a.f,label:"Post Author",link:r.link,children:["By ",Object(n.decode)(r.name)]}),Object(c.jsx)(i.a,{icon:a.a,label:"Post Date",children:m.toDateString()})]})})})},330:function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return l})),r.d(t,"e",(function(){return j})),r.d(t,"d",(function(){return x})),r.d(t,"a",(function(){return g}));var n=r(1),i=r(69),a=(r(331),r(329),r(333),r(334),r(338)),c=r(0);t.f=Object(n.connect)(({state:e,libraries:t,item:r,showExcerpt:n,showMedia:i=!0})=>{const l=e.source.category,{Component:m}=(r.categories&&r.categories.map(e=>l[e]),n?r.excerpt:r.content,t.html2react);return Object(c.jsx)(a.a,{sm:"6",xs:"6",children:Object(c.jsxs)(s,{children:[Object(c.jsx)(b,{link:r.link,className:"postLink",children:r.title.rendered}),r.acf.secondary_title&&Object(c.jsx)("h4",{className:"secondary-title",children:r.acf.secondary_title}),r.acf.short_description&&Object(c.jsx)(h,{className:"excerpt",dangerouslySetInnerHTML:{__html:r.acf.short_description}}),r.acf.test_server_url&&r.acf.live_url&&Object(c.jsxs)("div",{className:"links",children:[Object(c.jsx)("a",{href:r.acf.test_server_url,children:"Internal"}),Object(c.jsx)("a",{href:r.acf.live_url,children:"Live"})]})]})})});const s=Object(n.styled)("article",{target:"e7lz0qr9"})(""),l=Object(n.styled)("header",{target:"e7lz0qr8"})(""),m={thin:"58rem",small:"80rem",medium:"100rem"},o=e=>m[e.size]||m.medium,d=Object(n.styled)("div",{target:"e7lz0qr7"})("margin-left:auto;margin-right:auto;width:calc(100% - 4rem);max-width:",o,";@media (min-width: 700px){width:calc(100% - 8rem);}"),h=Object(n.styled)("div",{target:"e7lz0qr5"})(""),j=Object(n.styled)("h1",{target:"e7lz0qr4"})({name:"ti75j2",styles:"margin:0"}),b=(o({size:"small"}),Object(n.styled)(i.a,{target:"e7lz0qr2"})({name:"18uzyv2",styles:"color:#000000;text-decoration:none;display:block;&:hover{text-decoration:underline;}"})),x=Object(n.styled)(d,{target:"e7lz0qr1"})({name:"1xm5ovs",styles:"padding-top:5rem;@media (min-width: 700px){padding-top:8rem;}"}),g=Object(n.styled)("div",{target:"e7lz0qr0"})({name:"17zyz3c",styles:'line-height:1.5;max-width:58rem;font-family:"Hoefler Text",Garamond,"Times New Roman",serif;letter-spacing:normal;@media (min-width: 700px){font-size:2.1rem;}figure{margin:2em 0;max-width:100%;}h1,h2,h3,h4,h5,h6,cite,figcaption,table,address,.wp-caption-text,.wp-block-file{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,sans-serif;}h1,h2,h3,h4,h5,h6{margin:3.5rem auto 2rem;}@media (min-width: 700px){h1,h2,h3{margin:6rem auto 3rem;}h4,h5,h6{margin:4.5rem auto 2.5rem;}}'})},331:function(e,t,r){"use strict";r(32);var n=r(1),i=r(150),a=r(51),c=r(0);t.a=Object(n.connect)(({state:e,id:t,className:r})=>{const n=e.source.attachment[t];if(!n)return null;const i=Object.values(n.media_details.sizes).map(e=>[e.source_url,e.width]).reduce((e,t,r,n)=>e.concat(`${t.join(" ")}w${r!==n.length-1?", ":""}`),"")||null;return Object(c.jsx)(s,{className:r,children:Object(c.jsx)(a.a,{size:"medium",children:Object(c.jsx)(l,{alt:n.title.rendered,src:n.source_url,srcSet:i})})})});const s=Object(n.styled)("figure",{target:"edgxlej1"})({name:"x7iaiv",styles:"margin-top:5rem;position:relative;@media (min-width: 700px){margin-top:6rem;}"}),l=Object(n.styled)(i.a,{target:"edgxlej0"})({name:"1pdkais",styles:"margin:0 auto;max-width:100%;display:block;height:auto;max-height:440px"})},332:function(e,t,r){"use strict";var n=r(1),i=r(69),a=r(76),c=r(0);const s=Object(n.styled)("span",{target:"enbhvbr2"})({name:"1qt7at2",styles:"flex-shrink:0;margin-right:1rem"}),l=Object(n.styled)("span",{target:"enbhvbr1"})({name:"kiqxjt",styles:"a{color:inherit;text-decoration:none;}a:hover{text-decoration:underline;}"}),m=Object(n.styled)("li",{target:"enbhvbr0"})({name:"1050j2p",styles:"align-items:center;display:flex;flex-wrap:nowrap;flex-shrink:0;letter-spacing:-0.016875em;margin:1rem 0 0 2rem;max-width:calc(100% - 2rem);text-transform:capitalize;@media (min-width: 700px){margin:1.4rem 0 0 3rem;max-width:calc(100% - 3rem);}"});t.a=({icon:e,label:t,link:r,children:n})=>Object(c.jsxs)(m,{children:[Object(c.jsxs)(s,{children:[Object(c.jsx)(a.a,{children:t}),Object(c.jsx)(e,{})]}),Object(c.jsx)(l,{children:r?Object(c.jsx)(i.a,{link:r,children:n}):n})]})},333:function(e,t,r){"use strict";var n=r(1),i=r(76),a=r(69),c=r(0);t.a=Object(n.connect)(({categories:e})=>{const t=e.filter(Boolean);return 0===t.length?null:Object(c.jsxs)(s,{children:[Object(c.jsx)(i.a,{children:"Categories"}),Object(c.jsx)(l,{children:t.map(e=>Object(c.jsx)(m,{link:e.link,children:Object(n.decode)(e.name)},e.id))})]})});const s=Object(n.styled)("div",{target:"e13btr6x2"})({name:"in1q1e",styles:"line-height:1.25;margin-bottom:2rem;@media (min-width: 700px){margin-bottom:3rem;}"}),l=Object(n.styled)("div",{target:"e13btr6x1"})({name:"gknlm0",styles:"display:flex;flex-wrap:wrap;margin:-0.5rem 0 0 -1rem;@media (min-width: 700px){margin:-1rem 0 0 -2rem;}"}),m=Object(n.styled)(a.a,{target:"e13btr6x0"})({name:"o2w52d",styles:"border:none;font-size:1.4rem;font-weight:700;letter-spacing:0.036666667em;margin:0.5rem 0 0 1rem;text-decoration:none;color:#2958FF;@media (min-width: 700px){font-size:1.5rem;margin:1rem 0 0 2rem;}transition:border-bottom-color 150ms;:hover{border-bottom-color:transparent;}"})},334:function(e,t,r){"use strict";var n=r(1),i=r(2),a=r(57),c=r(69),s=r(329),l=r(332),m=r(0);Object(n.connect)(({tags:e})=>{const t=e.filter(Boolean);return 0===t.length?null:Object(m.jsx)(s.b,{children:Object(m.jsx)(s.a,{style:{justifyContent:"flex-start"},children:Object(m.jsx)(l.a,{icon:a.d,label:"Post Tags",children:t.map((e,r)=>{const a=r===t.length-1;return Object(m.jsxs)(i.Fragment,{children:[Object(m.jsx)(c.a,{link:e.link,children:Object(n.decode)(e.name)}),!a&&Object(m.jsx)(m.Fragment,{children:", "})]},e.id)})})})})})}}]);
"use strict";(self.webpackChunkuniswapeasy_buidler=self.webpackChunkuniswapeasy_buidler||[]).push([[7508,6403],{14411:(e,a,n)=>{var t=n(19701);function s(e){e.register(t),function(e){e.languages.ejs={delimiter:{pattern:/^<%[-_=]?|[-_]?%>$/,alias:"punctuation"},comment:/^#[\s\S]*/,"language-javascript":{pattern:/[\s\S]+/,inside:e.languages.javascript}},e.hooks.add("before-tokenize",(function(a){e.languages["markup-templating"].buildPlaceholders(a,"ejs",/<%(?!%)[\s\S]+?%>/g)})),e.hooks.add("after-tokenize",(function(a){e.languages["markup-templating"].tokenizePlaceholders(a,"ejs")})),e.languages.eta=e.languages.ejs}(e)}e.exports=s,s.displayName="ejs",s.aliases=["eta"]},19701:e=>{function a(e){!function(e){function a(e,a){return"___"+e.toUpperCase()+a+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,t,s,i){if(n.language===t){var r=n.tokenStack=[];n.code=n.code.replace(s,(function(e){if("function"===typeof i&&!i(e))return e;for(var s,o=r.length;-1!==n.code.indexOf(s=a(t,o));)++o;return r[o]=e,s})),n.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(n,t){if(n.language===t&&n.tokenStack){n.grammar=e.languages[t];var s=0,i=Object.keys(n.tokenStack);!function r(o){for(var u=0;u<o.length&&!(s>=i.length);u++){var l=o[u];if("string"===typeof l||l.content&&"string"===typeof l.content){var g=i[s],c=n.tokenStack[g],p="string"===typeof l?l:l.content,f=a(t,g),k=p.indexOf(f);if(k>-1){++s;var d=p.substring(0,k),m=new e.Token(t,e.tokenize(c,n.grammar),"language-"+t,c),h=p.substring(k+f.length),y=[];d&&y.push.apply(y,r([d])),y.push(m),h&&y.push.apply(y,r([h])),"string"===typeof l?o.splice.apply(o,[u,1].concat(y)):l.content=y}}else l.content&&r(l.content)}return o}(n.tokens)}}}})}(e)}e.exports=a,a.displayName="markupTemplating",a.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_ejs.5e596304.chunk.js.map
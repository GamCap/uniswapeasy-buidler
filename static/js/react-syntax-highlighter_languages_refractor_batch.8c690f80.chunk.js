"use strict";(self.webpackChunkuniswapeasy_buidler=self.webpackChunkuniswapeasy_buidler||[]).push([[4336],{48151:e=>{function r(e){!function(e){var r=/%%?[~:\w]+%?|!\S+!/,n={pattern:/\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,alias:"attr-name",inside:{punctuation:/:/}},t=/"(?:[\\"]"|[^"])*"(?!")/,a=/(?:\b|-)\d+\b/;e.languages.batch={comment:[/^::.*/m,{pattern:/((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,lookbehind:!0}],label:{pattern:/^:.*/m,alias:"property"},command:[{pattern:/((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,lookbehind:!0,inside:{keyword:/\b(?:do|in)\b|^for\b/i,string:t,parameter:n,variable:r,number:a,punctuation:/[()',]/}},{pattern:/((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:"[^"]*"|[^\s"]\S*))/im,lookbehind:!0,inside:{keyword:/\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,string:t,parameter:n,variable:r,number:a,operator:/\^|==|\b(?:equ|geq|gtr|leq|lss|neq)\b/i}},{pattern:/((?:^|[&()])[ \t]*)else\b/im,lookbehind:!0,inside:{keyword:/^else\b/i}},{pattern:/((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,lookbehind:!0,inside:{keyword:/^set\b/i,string:t,parameter:n,variable:[r,/\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],number:a,operator:/[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,punctuation:/[()',]/}},{pattern:/((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/m,lookbehind:!0,inside:{keyword:/^\w+\b/,string:t,parameter:n,label:{pattern:/(^\s*):\S+/m,lookbehind:!0,alias:"property"},variable:r,number:a,operator:/\^/}}],operator:/[&@]/,punctuation:/[()']/}}(e)}e.exports=r,r.displayName="batch",r.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_batch.8c690f80.chunk.js.map
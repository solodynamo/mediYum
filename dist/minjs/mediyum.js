var _0xe4e1=["use strict","call","document",".g-body","querySelectorAll","firefox","includes","toLowerCase","userAgent","bold","red","underline","div","createElement","<div class='options'> \n      <span class='no-overflow'> \n        <span class='ui-inputs'> \n          <button class='bold'>B</button> \n          <button class='red'>R</button> \n          <button class='underline'>U</button> \n        </span> \n      </span> \n    </div>","className","g-body","appendChild","body","text-menu hide","innerHTML","length",".text-menu",".text-menu .options","onmousedown","onmouseup","onkeydown","onkeyup","getSelection","anchorNode","nodeName","form","onresize","contentEditable","bottom","getBoundingClientRect","top","push","pageY","scrollY",".text-menu button","focusNode","test"," active","p","keyCode","previousSibling","HR","textContent","preventDefault","formatBlock","execCommand","outdent","DIV","nodeType","TEXT_NODE","P","hr","replaceChild","parentNode","data","innerText","createRange","setStart","setEnd","removeAllRanges","addRange","h1","h2","b","u","r","styleWithCSS","foreColor","#ff0000","target","srcElement","isContentEditable","isCollapsed","getRangeAt","pageYOffset","left","right","style","px","animate","text-menu active","mediYum"];_0xe4e1[0],function(){function e(){var e=m[_0xe4e1[13]](_0xe4e1[12]),n=_0xe4e1[14],x=m[_0xe4e1[13]](_0xe4e1[12]);x[_0xe4e1[15]]=_0xe4e1[16],m[_0xe4e1[18]][_0xe4e1[17]](x),e[_0xe4e1[15]]=_0xe4e1[19],e[_0xe4e1[20]]=n,0===m[_0xe4e1[4]](_0xe4e1[22])[_0xe4e1[21]]&&x[_0xe4e1[17]](e),w=m[_0xe4e1[4]](_0xe4e1[22])[0],y=m[_0xe4e1[4]](_0xe4e1[23])[0]}function n(){var e=void 0,n=void 0,x=void 0;for(m[_0xe4e1[24]]=v,m[_0xe4e1[25]]=function(e){setTimeout(function(){v(e)},1)},m[_0xe4e1[26]]=i,m[_0xe4e1[27]]=function(e){var n=window[_0xe4e1[28]]();n[_0xe4e1[29]]&&n[_0xe4e1[29]][_0xe4e1[30]]!==_0xe4e1[31]&&r(e)},g[_0xe4e1[32]]=v,e=0,n=h[_0xe4e1[21]];e<n;e++)x=h[e],x[_0xe4e1[33]]=!0,x[_0xe4e1[24]]=x[_0xe4e1[27]]=x[_0xe4e1[25]]=v}function x(e){var n=m[_0xe4e1[4]](_0xe4e1[40]),x=void 0,_=void 0,t=void 0;for(x=0,_=n[_0xe4e1[21]];x<_;x++)t=n[x],function(n){e(n)}(t)}function _(){x(function(e){e[_0xe4e1[24]]=function(n){d(e)}})}function t(){return g[_0xe4e1[28]]()[_0xe4e1[41]]}function o(){var e=void 0,n=t(),_=void 0,o=void 0;x(function(x){e=x[_0xe4e1[15]];for(var t in tagClassMap)if(_=tagClassMap[t],o=new RegExp(_),o[_0xe4e1[42]](e)){l(n,t)?x[_0xe4e1[15]]=_+_0xe4e1[43]:x[_0xe4e1[15]]=_;break}})}function i(e){var n=window[_0xe4e1[28]](),x=f(n[_0xe4e1[29]],_0xe4e1[44]);13===e[_0xe4e1[45]]&&x&&(prevSibling=x[_0xe4e1[46]],prevSibling&&prevSibling[_0xe4e1[30]]===_0xe4e1[47]&&!x[_0xe4e1[48]][_0xe4e1[21]]&&e[_0xe4e1[49]]())}function a(e){l(t(),e)?(m[_0xe4e1[51]](_0xe4e1[50],!1,_0xe4e1[44]),m[_0xe4e1[51]](_0xe4e1[52])):m[_0xe4e1[51]](_0xe4e1[50],!1,e)}function r(e){var n=window[_0xe4e1[28]](),x=void 0;13===e[_0xe4e1[45]]&&(n[_0xe4e1[29]][_0xe4e1[30]]===_0xe4e1[53]&&a(_0xe4e1[44]),(x=f(n[_0xe4e1[29]],_0xe4e1[44]))&&u(x))}function u(e){var n=void 0,x=void 0,_=void 0;for(n=e[_0xe4e1[46]],x=n;x&&x[_0xe4e1[54]]==Node[_0xe4e1[55]];)x=x[_0xe4e1[46]];n[_0xe4e1[30]]!==_0xe4e1[56]||n[_0xe4e1[48]][_0xe4e1[21]]||x[_0xe4e1[30]]===_0xe4e1[47]||(_=m[_0xe4e1[13]](_0xe4e1[57]),_[_0xe4e1[33]]=!1,e[_0xe4e1[59]][_0xe4e1[58]](_,n))}function d(e){var n=e[_0xe4e1[15]],x=window[_0xe4e1[28]](),_=x[_0xe4e1[29]],t=void 0,o=void 0;for(var i in tagClassMap)if(t=tagClassMap[i],o=new RegExp(t),o[_0xe4e1[42]](n))switch(i){case _0xe4e1[69]:return void(!_||l(_,_0xe4e1[67])||l(_,_0xe4e1[68])||m[_0xe4e1[51]](t,!1));case _0xe4e1[70]:return void m[_0xe4e1[51]](t,!1);case _0xe4e1[71]:return void s(i)}v()}function s(e){m[_0xe4e1[51]](_0xe4e1[72],!1,!0),m[_0xe4e1[51]](_0xe4e1[73],!1,_0xe4e1[74])}function c(e,n,x){if(null!==e)for(;e[_0xe4e1[59]];){if(n(e))return x(e);e=e[_0xe4e1[59]]}}function f(e,n){return c(e,function(e){return e[_0xe4e1[30]][_0xe4e1[7]]()===n},function(e){return e})}function l(e,n){return!!f(e,n)}function v(e){var n=g[_0xe4e1[28]](),x=void 0,_=void 0;if(!(e[_0xe4e1[75]]||e[_0xe4e1[76]])[_0xe4e1[77]])return void o();n[_0xe4e1[78]]?(p(b,b),w[_0xe4e1[15]]=_0xe4e1[19]):(x=n[_0xe4e1[79]](0),_=x[_0xe4e1[35]](),o(),p(_[_0xe4e1[36]]-5+g[_0xe4e1[80]],(_[_0xe4e1[81]]+_[_0xe4e1[82]])/2))}function p(e,n){w[_0xe4e1[83]][_0xe4e1[36]]=e+_0xe4e1[84],w[_0xe4e1[83]][_0xe4e1[81]]=n+_0xe4e1[84],C[_0xe4e1[85]]&&(w[_0xe4e1[15]]=e===b?_0xe4e1[19]:_0xe4e1[86])}var g=this,m=this[_0xe4e1[2]],b=-999,h=m[_0xe4e1[4]](_0xe4e1[3]),C=(h[0],navigator[_0xe4e1[8]][_0xe4e1[7]]()[_0xe4e1[6]](_0xe4e1[5]),{animate:!0}),w=void 0,y=void 0;mediYum={attachAllTheStuff:function(x,t){x&&(h=x),C=t||C,e(),n(),_()},select:function(){v()}},tagClassMap={b:_0xe4e1[9],r:_0xe4e1[10],u:_0xe4e1[11]},g[_0xe4e1[87]]=mediYum}[_0xe4e1[1]](void 0);
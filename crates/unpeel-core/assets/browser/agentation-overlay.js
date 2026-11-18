(()=>{var g1=Object.create;var Xf=Object.defineProperty;var y1=Object.getOwnPropertyDescriptor;var x1=Object.getOwnPropertyNames;var v1=Object.getPrototypeOf,w1=Object.prototype.hasOwnProperty;var zo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var b1=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of x1(t))!w1.call(e,r)&&r!==n&&Xf(e,r,{get:()=>t[r],enumerable:!(o=y1(t,r))||o.enumerable});return e};var Ee=(e,t,n)=>(n=e!=null?g1(v1(e)):{},b1(t||!e||!e.__esModule?Xf(n,"default",{value:e,enumerable:!0}):n,e));var lh=zo(je=>{"use strict";var pl=Symbol.for("react.element"),k1=Symbol.for("react.portal"),C1=Symbol.for("react.fragment"),S1=Symbol.for("react.strict_mode"),E1=Symbol.for("react.profiler"),M1=Symbol.for("react.provider"),L1=Symbol.for("react.context"),N1=Symbol.for("react.forward_ref"),I1=Symbol.for("react.suspense"),R1=Symbol.for("react.memo"),$1=Symbol.for("react.lazy"),Gf=Symbol.iterator;function T1(e){return e===null||typeof e!="object"?null:(e=Gf&&e[Gf]||e["@@iterator"],typeof e=="function"?e:null)}var Jf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zf=Object.assign,eh={};function pi(e,t,n){this.props=e,this.context=t,this.refs=eh,this.updater=n||Jf}pi.prototype.isReactComponent={};pi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};pi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function th(){}th.prototype=pi.prototype;function cd(e,t,n){this.props=e,this.context=t,this.refs=eh,this.updater=n||Jf}var dd=cd.prototype=new th;dd.constructor=cd;Zf(dd,pi.prototype);dd.isPureReactComponent=!0;var qf=Array.isArray,nh=Object.prototype.hasOwnProperty,ud={current:null},oh={key:!0,ref:!0,__self:!0,__source:!0};function rh(e,t,n){var o,r={},i=null,l=null;if(t!=null)for(o in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)nh.call(t,o)&&!oh.hasOwnProperty(o)&&(r[o]=t[o]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var a=Array(s),u=0;u<s;u++)a[u]=arguments[u+2];r.children=a}if(e&&e.defaultProps)for(o in s=e.defaultProps,s)r[o]===void 0&&(r[o]=s[o]);return{$$typeof:pl,type:e,key:i,ref:l,props:r,_owner:ud.current}}function P1(e,t){return{$$typeof:pl,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function _d(e){return typeof e=="object"&&e!==null&&e.$$typeof===pl}function D1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Kf=/\/+/g;function ad(e,t){return typeof e=="object"&&e!==null&&e.key!=null?D1(""+e.key):t.toString(36)}function js(e,t,n,o,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case pl:case k1:l=!0}}if(l)return l=e,r=r(l),e=o===""?"."+ad(l,0):o,qf(r)?(n="",e!=null&&(n=e.replace(Kf,"$&/")+"/"),js(r,t,n,"",function(u){return u})):r!=null&&(_d(r)&&(r=P1(r,n+(!r.key||l&&l.key===r.key?"":(""+r.key).replace(Kf,"$&/")+"/")+e)),t.push(r)),1;if(l=0,o=o===""?".":o+":",qf(e))for(var s=0;s<e.length;s++){i=e[s];var a=o+ad(i,s);l+=js(i,t,n,a,r)}else if(a=T1(e),typeof a=="function")for(e=a.call(e),s=0;!(i=e.next()).done;)i=i.value,a=o+ad(i,s++),l+=js(i,t,n,a,r);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Ws(e,t,n){if(e==null)return e;var o=[],r=0;return js(e,o,"","",function(i){return t.call(n,i,r++)}),o}function B1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var _n={current:null},Hs={transition:null},z1={ReactCurrentDispatcher:_n,ReactCurrentBatchConfig:Hs,ReactCurrentOwner:ud};function ih(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:Ws,forEach:function(e,t,n){Ws(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ws(e,function(){t++}),t},toArray:function(e){return Ws(e,function(t){return t})||[]},only:function(e){if(!_d(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};je.Component=pi;je.Fragment=C1;je.Profiler=E1;je.PureComponent=cd;je.StrictMode=S1;je.Suspense=I1;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z1;je.act=ih;je.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=Zf({},e.props),r=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=ud.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in t)nh.call(t,a)&&!oh.hasOwnProperty(a)&&(o[a]=t[a]===void 0&&s!==void 0?s[a]:t[a])}var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){s=Array(a);for(var u=0;u<a;u++)s[u]=arguments[u+2];o.children=s}return{$$typeof:pl,type:e.type,key:r,ref:i,props:o,_owner:l}};je.createContext=function(e){return e={$$typeof:L1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:M1,_context:e},e.Consumer=e};je.createElement=rh;je.createFactory=function(e){var t=rh.bind(null,e);return t.type=e,t};je.createRef=function(){return{current:null}};je.forwardRef=function(e){return{$$typeof:N1,render:e}};je.isValidElement=_d;je.lazy=function(e){return{$$typeof:$1,_payload:{_status:-1,_result:e},_init:B1}};je.memo=function(e,t){return{$$typeof:R1,type:e,compare:t===void 0?null:t}};je.startTransition=function(e){var t=Hs.transition;Hs.transition={};try{e()}finally{Hs.transition=t}};je.unstable_act=ih;je.useCallback=function(e,t){return _n.current.useCallback(e,t)};je.useContext=function(e){return _n.current.useContext(e)};je.useDebugValue=function(){};je.useDeferredValue=function(e){return _n.current.useDeferredValue(e)};je.useEffect=function(e,t){return _n.current.useEffect(e,t)};je.useId=function(){return _n.current.useId()};je.useImperativeHandle=function(e,t,n){return _n.current.useImperativeHandle(e,t,n)};je.useInsertionEffect=function(e,t){return _n.current.useInsertionEffect(e,t)};je.useLayoutEffect=function(e,t){return _n.current.useLayoutEffect(e,t)};je.useMemo=function(e,t){return _n.current.useMemo(e,t)};je.useReducer=function(e,t,n){return _n.current.useReducer(e,t,n)};je.useRef=function(e){return _n.current.useRef(e)};je.useState=function(e){return _n.current.useState(e)};je.useSyncExternalStore=function(e,t,n){return _n.current.useSyncExternalStore(e,t,n)};je.useTransition=function(){return _n.current.useTransition()};je.version="18.3.1"});var Et=zo((Bw,sh)=>{"use strict";sh.exports=lh()});var gh=zo(vt=>{"use strict";function md(e,t){var n=e.length;e.push(t);e:for(;0<n;){var o=n-1>>>1,r=e[o];if(0<Us(r,t))e[o]=t,e[n]=r,n=o;else break e}}function oo(e){return e.length===0?null:e[0]}function Qs(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var o=0,r=e.length,i=r>>>1;o<i;){var l=2*(o+1)-1,s=e[l],a=l+1,u=e[a];if(0>Us(s,n))a<r&&0>Us(u,s)?(e[o]=u,e[a]=n,o=a):(e[o]=s,e[l]=n,o=l);else if(a<r&&0>Us(u,n))e[o]=u,e[a]=n,o=a;else break e}}return t}function Us(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(ah=performance,vt.unstable_now=function(){return ah.now()}):(fd=Date,ch=fd.now(),vt.unstable_now=function(){return fd.now()-ch});var ah,fd,ch,vo=[],Zo=[],O1=1,jn=null,rn=3,Vs=!1,Or=!1,gl=!1,_h=typeof setTimeout=="function"?setTimeout:null,fh=typeof clearTimeout=="function"?clearTimeout:null,dh=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function gd(e){for(var t=oo(Zo);t!==null;){if(t.callback===null)Qs(Zo);else if(t.startTime<=e)Qs(Zo),t.sortIndex=t.expirationTime,md(vo,t);else break;t=oo(Zo)}}function yd(e){if(gl=!1,gd(e),!Or)if(oo(vo)!==null)Or=!0,vd(xd);else{var t=oo(Zo);t!==null&&wd(yd,t.startTime-e)}}function xd(e,t){Or=!1,gl&&(gl=!1,fh(yl),yl=-1),Vs=!0;var n=rn;try{for(gd(t),jn=oo(vo);jn!==null&&(!(jn.expirationTime>t)||e&&!mh());){var o=jn.callback;if(typeof o=="function"){jn.callback=null,rn=jn.priorityLevel;var r=o(jn.expirationTime<=t);t=vt.unstable_now(),typeof r=="function"?jn.callback=r:jn===oo(vo)&&Qs(vo),gd(t)}else Qs(vo);jn=oo(vo)}if(jn!==null)var i=!0;else{var l=oo(Zo);l!==null&&wd(yd,l.startTime-t),i=!1}return i}finally{jn=null,rn=n,Vs=!1}}var Xs=!1,Ys=null,yl=-1,hh=5,ph=-1;function mh(){return!(vt.unstable_now()-ph<hh)}function hd(){if(Ys!==null){var e=vt.unstable_now();ph=e;var t=!0;try{t=Ys(!0,e)}finally{t?ml():(Xs=!1,Ys=null)}}else Xs=!1}var ml;typeof dh=="function"?ml=function(){dh(hd)}:typeof MessageChannel<"u"?(pd=new MessageChannel,uh=pd.port2,pd.port1.onmessage=hd,ml=function(){uh.postMessage(null)}):ml=function(){_h(hd,0)};var pd,uh;function vd(e){Ys=e,Xs||(Xs=!0,ml())}function wd(e,t){yl=_h(function(){e(vt.unstable_now())},t)}vt.unstable_IdlePriority=5;vt.unstable_ImmediatePriority=1;vt.unstable_LowPriority=4;vt.unstable_NormalPriority=3;vt.unstable_Profiling=null;vt.unstable_UserBlockingPriority=2;vt.unstable_cancelCallback=function(e){e.callback=null};vt.unstable_continueExecution=function(){Or||Vs||(Or=!0,vd(xd))};vt.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):hh=0<e?Math.floor(1e3/e):5};vt.unstable_getCurrentPriorityLevel=function(){return rn};vt.unstable_getFirstCallbackNode=function(){return oo(vo)};vt.unstable_next=function(e){switch(rn){case 1:case 2:case 3:var t=3;break;default:t=rn}var n=rn;rn=t;try{return e()}finally{rn=n}};vt.unstable_pauseExecution=function(){};vt.unstable_requestPaint=function(){};vt.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=rn;rn=e;try{return t()}finally{rn=n}};vt.unstable_scheduleCallback=function(e,t,n){var o=vt.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?o+n:o):n=o,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=n+r,e={id:O1++,callback:t,priorityLevel:e,startTime:n,expirationTime:r,sortIndex:-1},n>o?(e.sortIndex=n,md(Zo,e),oo(vo)===null&&e===oo(Zo)&&(gl?(fh(yl),yl=-1):gl=!0,wd(yd,n-o))):(e.sortIndex=r,md(vo,e),Or||Vs||(Or=!0,vd(xd))),e};vt.unstable_shouldYield=mh;vt.unstable_wrapCallback=function(e){var t=rn;return function(){var n=rn;rn=t;try{return e.apply(this,arguments)}finally{rn=n}}}});var xh=zo((Ow,yh)=>{"use strict";yh.exports=gh()});var k0=zo($n=>{"use strict";var A1=Et(),In=xh();function X(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ep=new Set,Fl={};function Kr(e,t){Bi(e,t),Bi(e+"Capture",t)}function Bi(e,t){for(Fl[e]=t,e=0;e<t.length;e++)Ep.add(t[e])}var Ho=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ud=Object.prototype.hasOwnProperty,F1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,vh={},wh={};function W1(e){return Ud.call(wh,e)?!0:Ud.call(vh,e)?!1:F1.test(e)?wh[e]=!0:(vh[e]=!0,!1)}function j1(e,t,n,o){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return o?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function H1(e,t,n,o){if(t===null||typeof t>"u"||j1(e,t,n,o))return!0;if(o)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function pn(e,t,n,o,r,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=o,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Kt[e]=new pn(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Kt[t]=new pn(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Kt[e]=new pn(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Kt[e]=new pn(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Kt[e]=new pn(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Kt[e]=new pn(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Kt[e]=new pn(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Kt[e]=new pn(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Kt[e]=new pn(e,5,!1,e.toLowerCase(),null,!1,!1)});var Bu=/[\-:]([a-z])/g;function zu(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Bu,zu);Kt[t]=new pn(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Bu,zu);Kt[t]=new pn(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Bu,zu);Kt[t]=new pn(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Kt[e]=new pn(e,1,!1,e.toLowerCase(),null,!1,!1)});Kt.xlinkHref=new pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Kt[e]=new pn(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ou(e,t,n,o){var r=Kt.hasOwnProperty(t)?Kt[t]:null;(r!==null?r.type!==0:o||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(H1(t,n,r,o)&&(n=null),o||r===null?W1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,o=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,o?e.setAttributeNS(o,t,n):e.setAttribute(t,n))))}var Vo=A1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gs=Symbol.for("react.element"),yi=Symbol.for("react.portal"),xi=Symbol.for("react.fragment"),Au=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),Mp=Symbol.for("react.provider"),Lp=Symbol.for("react.context"),Fu=Symbol.for("react.forward_ref"),Qd=Symbol.for("react.suspense"),Vd=Symbol.for("react.suspense_list"),Wu=Symbol.for("react.memo"),tr=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Np=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var bh=Symbol.iterator;function xl(e){return e===null||typeof e!="object"?null:(e=bh&&e[bh]||e["@@iterator"],typeof e=="function"?e:null)}var It=Object.assign,bd;function Ml(e){if(bd===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);bd=t&&t[1]||""}return`
`+bd+e}var kd=!1;function Cd(e,t){if(!e||kd)return"";kd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var o=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){o=u}e.call(t.prototype)}else{try{throw Error()}catch(u){o=u}e()}}catch(u){if(u&&o&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),i=o.stack.split(`
`),l=r.length-1,s=i.length-1;1<=l&&0<=s&&r[l]!==i[s];)s--;for(;1<=l&&0<=s;l--,s--)if(r[l]!==i[s]){if(l!==1||s!==1)do if(l--,s--,0>s||r[l]!==i[s]){var a=`
`+r[l].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=l&&0<=s);break}}}finally{kd=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ml(e):""}function U1(e){switch(e.tag){case 5:return Ml(e.type);case 16:return Ml("Lazy");case 13:return Ml("Suspense");case 19:return Ml("SuspenseList");case 0:case 2:case 15:return e=Cd(e.type,!1),e;case 11:return e=Cd(e.type.render,!1),e;case 1:return e=Cd(e.type,!0),e;default:return""}}function Xd(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xi:return"Fragment";case yi:return"Portal";case Yd:return"Profiler";case Au:return"StrictMode";case Qd:return"Suspense";case Vd:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Lp:return(e.displayName||"Context")+".Consumer";case Mp:return(e._context.displayName||"Context")+".Provider";case Fu:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Wu:return t=e.displayName||null,t!==null?t:Xd(e.type)||"Memo";case tr:t=e._payload,e=e._init;try{return Xd(e(t))}catch{}}return null}function Y1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Xd(t);case 8:return t===Au?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function pr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ip(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Q1(e){var t=Ip(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),o=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(l){o=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return o},setValue:function(l){o=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function qs(e){e._valueTracker||(e._valueTracker=Q1(e))}function Rp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),o="";return e&&(o=Ip(e)?e.checked?"true":"false":e.value),e=o,e!==n?(t.setValue(e),!0):!1}function Ca(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Gd(e,t){var n=t.checked;return It({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function kh(e,t){var n=t.defaultValue==null?"":t.defaultValue,o=t.checked!=null?t.checked:t.defaultChecked;n=pr(t.value!=null?t.value:n),e._wrapperState={initialChecked:o,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function $p(e,t){t=t.checked,t!=null&&Ou(e,"checked",t,!1)}function qd(e,t){$p(e,t);var n=pr(t.value),o=t.type;if(n!=null)o==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(o==="submit"||o==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Kd(e,t.type,n):t.hasOwnProperty("defaultValue")&&Kd(e,t.type,pr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ch(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var o=t.type;if(!(o!=="submit"&&o!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Kd(e,t,n){(t!=="number"||Ca(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ll=Array.isArray;function Ii(e,t,n,o){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&o&&(e[n].defaultSelected=!0)}else{for(n=""+pr(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,o&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function Jd(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(X(91));return It({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Sh(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(X(92));if(Ll(n)){if(1<n.length)throw Error(X(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:pr(n)}}function Tp(e,t){var n=pr(t.value),o=pr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),o!=null&&(e.defaultValue=""+o)}function Eh(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Pp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Zd(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Pp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ks,Dp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,o,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,o,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ks=Ks||document.createElement("div"),Ks.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ks.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Wl(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Rl={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},V1=["Webkit","ms","Moz","O"];Object.keys(Rl).forEach(function(e){V1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Rl[t]=Rl[e]})});function Bp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Rl.hasOwnProperty(e)&&Rl[e]?(""+t).trim():t+"px"}function zp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var o=n.indexOf("--")===0,r=Bp(n,t[n],o);n==="float"&&(n="cssFloat"),o?e.setProperty(n,r):e[n]=r}}var X1=It({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function eu(e,t){if(t){if(X1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(X(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(X(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(X(61))}if(t.style!=null&&typeof t.style!="object")throw Error(X(62))}}function tu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var nu=null;function ju(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ou=null,Ri=null,$i=null;function Mh(e){if(e=is(e)){if(typeof ou!="function")throw Error(X(280));var t=e.stateNode;t&&(t=Ja(t),ou(e.stateNode,e.type,t))}}function Op(e){Ri?$i?$i.push(e):$i=[e]:Ri=e}function Ap(){if(Ri){var e=Ri,t=$i;if($i=Ri=null,Mh(e),t)for(e=0;e<t.length;e++)Mh(t[e])}}function Fp(e,t){return e(t)}function Wp(){}var Sd=!1;function jp(e,t,n){if(Sd)return e(t,n);Sd=!0;try{return Fp(e,t,n)}finally{Sd=!1,(Ri!==null||$i!==null)&&(Wp(),Ap())}}function jl(e,t){var n=e.stateNode;if(n===null)return null;var o=Ja(n);if(o===null)return null;n=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(X(231,t,typeof n));return n}var ru=!1;if(Ho)try{mi={},Object.defineProperty(mi,"passive",{get:function(){ru=!0}}),window.addEventListener("test",mi,mi),window.removeEventListener("test",mi,mi)}catch{ru=!1}var mi;function G1(e,t,n,o,r,i,l,s,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(p){this.onError(p)}}var $l=!1,Sa=null,Ea=!1,iu=null,q1={onError:function(e){$l=!0,Sa=e}};function K1(e,t,n,o,r,i,l,s,a){$l=!1,Sa=null,G1.apply(q1,arguments)}function J1(e,t,n,o,r,i,l,s,a){if(K1.apply(this,arguments),$l){if($l){var u=Sa;$l=!1,Sa=null}else throw Error(X(198));Ea||(Ea=!0,iu=u)}}function Jr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Hp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Lh(e){if(Jr(e)!==e)throw Error(X(188))}function Z1(e){var t=e.alternate;if(!t){if(t=Jr(e),t===null)throw Error(X(188));return t!==e?null:e}for(var n=e,o=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(o=r.return,o!==null){n=o;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return Lh(r),e;if(i===o)return Lh(r),t;i=i.sibling}throw Error(X(188))}if(n.return!==o.return)n=r,o=i;else{for(var l=!1,s=r.child;s;){if(s===n){l=!0,n=r,o=i;break}if(s===o){l=!0,o=r,n=i;break}s=s.sibling}if(!l){for(s=i.child;s;){if(s===n){l=!0,n=i,o=r;break}if(s===o){l=!0,o=i,n=r;break}s=s.sibling}if(!l)throw Error(X(189))}}if(n.alternate!==o)throw Error(X(190))}if(n.tag!==3)throw Error(X(188));return n.stateNode.current===n?e:t}function Up(e){return e=Z1(e),e!==null?Yp(e):null}function Yp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Yp(e);if(t!==null)return t;e=e.sibling}return null}var Qp=In.unstable_scheduleCallback,Nh=In.unstable_cancelCallback,ey=In.unstable_shouldYield,ty=In.unstable_requestPaint,Bt=In.unstable_now,ny=In.unstable_getCurrentPriorityLevel,Hu=In.unstable_ImmediatePriority,Vp=In.unstable_UserBlockingPriority,Ma=In.unstable_NormalPriority,oy=In.unstable_LowPriority,Xp=In.unstable_IdlePriority,Xa=null,Co=null;function ry(e){if(Co&&typeof Co.onCommitFiberRoot=="function")try{Co.onCommitFiberRoot(Xa,e,void 0,(e.current.flags&128)===128)}catch{}}var ao=Math.clz32?Math.clz32:sy,iy=Math.log,ly=Math.LN2;function sy(e){return e>>>=0,e===0?32:31-(iy(e)/ly|0)|0}var Js=64,Zs=4194304;function Nl(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function La(e,t){var n=e.pendingLanes;if(n===0)return 0;var o=0,r=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~r;s!==0?o=Nl(s):(i&=l,i!==0&&(o=Nl(i)))}else l=n&~r,l!==0?o=Nl(l):i!==0&&(o=Nl(i));if(o===0)return 0;if(t!==0&&t!==o&&!(t&r)&&(r=o&-o,i=t&-t,r>=i||r===16&&(i&4194240)!==0))return t;if(o&4&&(o|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=o;0<t;)n=31-ao(t),r=1<<n,o|=e[n],t&=~r;return o}function ay(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cy(e,t){for(var n=e.suspendedLanes,o=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-ao(i),s=1<<l,a=r[l];a===-1?(!(s&n)||s&o)&&(r[l]=ay(s,t)):a<=t&&(e.expiredLanes|=s),i&=~s}}function lu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Gp(){var e=Js;return Js<<=1,!(Js&4194240)&&(Js=64),e}function Ed(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function os(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ao(t),e[t]=n}function dy(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var o=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-ao(n),i=1<<r;t[r]=0,o[r]=-1,e[r]=-1,n&=~i}}function Uu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var o=31-ao(n),r=1<<o;r&t|e[o]&t&&(e[o]|=t),n&=~r}}var ut=0;function qp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Kp,Yu,Jp,Zp,em,su=!1,ea=[],sr=null,ar=null,cr=null,Hl=new Map,Ul=new Map,or=[],uy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ih(e,t){switch(e){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":ar=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":Hl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(t.pointerId)}}function vl(e,t,n,o,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:o,nativeEvent:i,targetContainers:[r]},t!==null&&(t=is(t),t!==null&&Yu(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function _y(e,t,n,o,r){switch(t){case"focusin":return sr=vl(sr,e,t,n,o,r),!0;case"dragenter":return ar=vl(ar,e,t,n,o,r),!0;case"mouseover":return cr=vl(cr,e,t,n,o,r),!0;case"pointerover":var i=r.pointerId;return Hl.set(i,vl(Hl.get(i)||null,e,t,n,o,r)),!0;case"gotpointercapture":return i=r.pointerId,Ul.set(i,vl(Ul.get(i)||null,e,t,n,o,r)),!0}return!1}function tm(e){var t=Wr(e.target);if(t!==null){var n=Jr(t);if(n!==null){if(t=n.tag,t===13){if(t=Hp(n),t!==null){e.blockedOn=t,em(e.priority,function(){Jp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ha(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=au(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var o=new n.constructor(n.type,n);nu=o,n.target.dispatchEvent(o),nu=null}else return t=is(n),t!==null&&Yu(t),e.blockedOn=n,!1;t.shift()}return!0}function Rh(e,t,n){ha(e)&&n.delete(t)}function fy(){su=!1,sr!==null&&ha(sr)&&(sr=null),ar!==null&&ha(ar)&&(ar=null),cr!==null&&ha(cr)&&(cr=null),Hl.forEach(Rh),Ul.forEach(Rh)}function wl(e,t){e.blockedOn===t&&(e.blockedOn=null,su||(su=!0,In.unstable_scheduleCallback(In.unstable_NormalPriority,fy)))}function Yl(e){function t(r){return wl(r,e)}if(0<ea.length){wl(ea[0],e);for(var n=1;n<ea.length;n++){var o=ea[n];o.blockedOn===e&&(o.blockedOn=null)}}for(sr!==null&&wl(sr,e),ar!==null&&wl(ar,e),cr!==null&&wl(cr,e),Hl.forEach(t),Ul.forEach(t),n=0;n<or.length;n++)o=or[n],o.blockedOn===e&&(o.blockedOn=null);for(;0<or.length&&(n=or[0],n.blockedOn===null);)tm(n),n.blockedOn===null&&or.shift()}var Ti=Vo.ReactCurrentBatchConfig,Na=!0;function hy(e,t,n,o){var r=ut,i=Ti.transition;Ti.transition=null;try{ut=1,Qu(e,t,n,o)}finally{ut=r,Ti.transition=i}}function py(e,t,n,o){var r=ut,i=Ti.transition;Ti.transition=null;try{ut=4,Qu(e,t,n,o)}finally{ut=r,Ti.transition=i}}function Qu(e,t,n,o){if(Na){var r=au(e,t,n,o);if(r===null)Td(e,t,o,Ia,n),Ih(e,o);else if(_y(r,e,t,n,o))o.stopPropagation();else if(Ih(e,o),t&4&&-1<uy.indexOf(e)){for(;r!==null;){var i=is(r);if(i!==null&&Kp(i),i=au(e,t,n,o),i===null&&Td(e,t,o,Ia,n),i===r)break;r=i}r!==null&&o.stopPropagation()}else Td(e,t,o,null,n)}}var Ia=null;function au(e,t,n,o){if(Ia=null,e=ju(o),e=Wr(e),e!==null)if(t=Jr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Hp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ia=e,null}function nm(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ny()){case Hu:return 1;case Vp:return 4;case Ma:case oy:return 16;case Xp:return 536870912;default:return 16}default:return 16}}var ir=null,Vu=null,pa=null;function om(){if(pa)return pa;var e,t=Vu,n=t.length,o,r="value"in ir?ir.value:ir.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var l=n-e;for(o=1;o<=l&&t[n-o]===r[i-o];o++);return pa=r.slice(e,1<o?1-o:void 0)}function ma(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ta(){return!0}function $h(){return!1}function Rn(e){function t(n,o,r,i,l){this._reactName=n,this._targetInst=r,this.type=o,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ta:$h,this.isPropagationStopped=$h,this}return It(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ta)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ta)},persist:function(){},isPersistent:ta}),t}var Hi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xu=Rn(Hi),rs=It({},Hi,{view:0,detail:0}),my=Rn(rs),Md,Ld,bl,Ga=It({},rs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bl&&(bl&&e.type==="mousemove"?(Md=e.screenX-bl.screenX,Ld=e.screenY-bl.screenY):Ld=Md=0,bl=e),Md)},movementY:function(e){return"movementY"in e?e.movementY:Ld}}),Th=Rn(Ga),gy=It({},Ga,{dataTransfer:0}),yy=Rn(gy),xy=It({},rs,{relatedTarget:0}),Nd=Rn(xy),vy=It({},Hi,{animationName:0,elapsedTime:0,pseudoElement:0}),wy=Rn(vy),by=It({},Hi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ky=Rn(by),Cy=It({},Hi,{data:0}),Ph=Rn(Cy),Sy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ey={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},My={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ly(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=My[e])?!!t[e]:!1}function Gu(){return Ly}var Ny=It({},rs,{key:function(e){if(e.key){var t=Sy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ma(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ey[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gu,charCode:function(e){return e.type==="keypress"?ma(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ma(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Iy=Rn(Ny),Ry=It({},Ga,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dh=Rn(Ry),$y=It({},rs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gu}),Ty=Rn($y),Py=It({},Hi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Dy=Rn(Py),By=It({},Ga,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),zy=Rn(By),Oy=[9,13,27,32],qu=Ho&&"CompositionEvent"in window,Tl=null;Ho&&"documentMode"in document&&(Tl=document.documentMode);var Ay=Ho&&"TextEvent"in window&&!Tl,rm=Ho&&(!qu||Tl&&8<Tl&&11>=Tl),Bh=" ",zh=!1;function im(e,t){switch(e){case"keyup":return Oy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vi=!1;function Fy(e,t){switch(e){case"compositionend":return lm(t);case"keypress":return t.which!==32?null:(zh=!0,Bh);case"textInput":return e=t.data,e===Bh&&zh?null:e;default:return null}}function Wy(e,t){if(vi)return e==="compositionend"||!qu&&im(e,t)?(e=om(),pa=Vu=ir=null,vi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return rm&&t.locale!=="ko"?null:t.data;default:return null}}var jy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Oh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!jy[e.type]:t==="textarea"}function sm(e,t,n,o){Op(o),t=Ra(t,"onChange"),0<t.length&&(n=new Xu("onChange","change",null,n,o),e.push({event:n,listeners:t}))}var Pl=null,Ql=null;function Hy(e){ym(e,0)}function qa(e){var t=ki(e);if(Rp(t))return e}function Uy(e,t){if(e==="change")return t}var am=!1;Ho&&(Ho?(oa="oninput"in document,oa||(Id=document.createElement("div"),Id.setAttribute("oninput","return;"),oa=typeof Id.oninput=="function"),na=oa):na=!1,am=na&&(!document.documentMode||9<document.documentMode));var na,oa,Id;function Ah(){Pl&&(Pl.detachEvent("onpropertychange",cm),Ql=Pl=null)}function cm(e){if(e.propertyName==="value"&&qa(Ql)){var t=[];sm(t,Ql,e,ju(e)),jp(Hy,t)}}function Yy(e,t,n){e==="focusin"?(Ah(),Pl=t,Ql=n,Pl.attachEvent("onpropertychange",cm)):e==="focusout"&&Ah()}function Qy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qa(Ql)}function Vy(e,t){if(e==="click")return qa(t)}function Xy(e,t){if(e==="input"||e==="change")return qa(t)}function Gy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var uo=typeof Object.is=="function"?Object.is:Gy;function Vl(e,t){if(uo(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(o=0;o<n.length;o++){var r=n[o];if(!Ud.call(t,r)||!uo(e[r],t[r]))return!1}return!0}function Fh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Wh(e,t){var n=Fh(e);e=0;for(var o;n;){if(n.nodeType===3){if(o=e+n.textContent.length,e<=t&&o>=t)return{node:n,offset:t-e};e=o}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Fh(n)}}function dm(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?dm(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function um(){for(var e=window,t=Ca();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ca(e.document)}return t}function Ku(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function qy(e){var t=um(),n=e.focusedElem,o=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&dm(n.ownerDocument.documentElement,n)){if(o!==null&&Ku(n)){if(t=o.start,e=o.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,i=Math.min(o.start,r);o=o.end===void 0?i:Math.min(o.end,r),!e.extend&&i>o&&(r=o,o=i,i=r),r=Wh(n,i);var l=Wh(n,o);r&&l&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),i>o?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ky=Ho&&"documentMode"in document&&11>=document.documentMode,wi=null,cu=null,Dl=null,du=!1;function jh(e,t,n){var o=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;du||wi==null||wi!==Ca(o)||(o=wi,"selectionStart"in o&&Ku(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Dl&&Vl(Dl,o)||(Dl=o,o=Ra(cu,"onSelect"),0<o.length&&(t=new Xu("onSelect","select",null,t,n),e.push({event:t,listeners:o}),t.target=wi)))}function ra(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var bi={animationend:ra("Animation","AnimationEnd"),animationiteration:ra("Animation","AnimationIteration"),animationstart:ra("Animation","AnimationStart"),transitionend:ra("Transition","TransitionEnd")},Rd={},_m={};Ho&&(_m=document.createElement("div").style,"AnimationEvent"in window||(delete bi.animationend.animation,delete bi.animationiteration.animation,delete bi.animationstart.animation),"TransitionEvent"in window||delete bi.transitionend.transition);function Ka(e){if(Rd[e])return Rd[e];if(!bi[e])return e;var t=bi[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in _m)return Rd[e]=t[n];return e}var fm=Ka("animationend"),hm=Ka("animationiteration"),pm=Ka("animationstart"),mm=Ka("transitionend"),gm=new Map,Hh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gr(e,t){gm.set(e,t),Kr(t,[e])}for(ia=0;ia<Hh.length;ia++)la=Hh[ia],Uh=la.toLowerCase(),Yh=la[0].toUpperCase()+la.slice(1),gr(Uh,"on"+Yh);var la,Uh,Yh,ia;gr(fm,"onAnimationEnd");gr(hm,"onAnimationIteration");gr(pm,"onAnimationStart");gr("dblclick","onDoubleClick");gr("focusin","onFocus");gr("focusout","onBlur");gr(mm,"onTransitionEnd");Bi("onMouseEnter",["mouseout","mouseover"]);Bi("onMouseLeave",["mouseout","mouseover"]);Bi("onPointerEnter",["pointerout","pointerover"]);Bi("onPointerLeave",["pointerout","pointerover"]);Kr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Kr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Kr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Kr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Kr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Kr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Il="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Il));function Qh(e,t,n){var o=e.type||"unknown-event";e.currentTarget=n,J1(o,t,void 0,e),e.currentTarget=null}function ym(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var o=e[n],r=o.event;o=o.listeners;e:{var i=void 0;if(t)for(var l=o.length-1;0<=l;l--){var s=o[l],a=s.instance,u=s.currentTarget;if(s=s.listener,a!==i&&r.isPropagationStopped())break e;Qh(r,s,u),i=a}else for(l=0;l<o.length;l++){if(s=o[l],a=s.instance,u=s.currentTarget,s=s.listener,a!==i&&r.isPropagationStopped())break e;Qh(r,s,u),i=a}}}if(Ea)throw e=iu,Ea=!1,iu=null,e}function Ct(e,t){var n=t[pu];n===void 0&&(n=t[pu]=new Set);var o=e+"__bubble";n.has(o)||(xm(t,e,2,!1),n.add(o))}function $d(e,t,n){var o=0;t&&(o|=4),xm(n,e,o,t)}var sa="_reactListening"+Math.random().toString(36).slice(2);function Xl(e){if(!e[sa]){e[sa]=!0,Ep.forEach(function(n){n!=="selectionchange"&&(Jy.has(n)||$d(n,!1,e),$d(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[sa]||(t[sa]=!0,$d("selectionchange",!1,t))}}function xm(e,t,n,o){switch(nm(t)){case 1:var r=hy;break;case 4:r=py;break;default:r=Qu}n=r.bind(null,t,n,e),r=void 0,!ru||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),o?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function Td(e,t,n,o,r){var i=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var l=o.tag;if(l===3||l===4){var s=o.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(l===4)for(l=o.return;l!==null;){var a=l.tag;if((a===3||a===4)&&(a=l.stateNode.containerInfo,a===r||a.nodeType===8&&a.parentNode===r))return;l=l.return}for(;s!==null;){if(l=Wr(s),l===null)return;if(a=l.tag,a===5||a===6){o=i=l;continue e}s=s.parentNode}}o=o.return}jp(function(){var u=i,p=ju(n),f=[];e:{var g=gm.get(e);if(g!==void 0){var C=Xu,b=e;switch(e){case"keypress":if(ma(n)===0)break e;case"keydown":case"keyup":C=Iy;break;case"focusin":b="focus",C=Nd;break;case"focusout":b="blur",C=Nd;break;case"beforeblur":case"afterblur":C=Nd;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Th;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=yy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=Ty;break;case fm:case hm:case pm:C=wy;break;case mm:C=Dy;break;case"scroll":C=my;break;case"wheel":C=zy;break;case"copy":case"cut":case"paste":C=ky;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Dh}var N=(t&4)!==0,E=!N&&e==="scroll",y=N?g!==null?g+"Capture":null:g;N=[];for(var v=u,h;v!==null;){h=v;var S=h.stateNode;if(h.tag===5&&S!==null&&(h=S,y!==null&&(S=jl(v,y),S!=null&&N.push(Gl(v,S,h)))),E)break;v=v.return}0<N.length&&(g=new C(g,b,null,n,p),f.push({event:g,listeners:N}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",C=e==="mouseout"||e==="pointerout",g&&n!==nu&&(b=n.relatedTarget||n.fromElement)&&(Wr(b)||b[Uo]))break e;if((C||g)&&(g=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,C?(b=n.relatedTarget||n.toElement,C=u,b=b?Wr(b):null,b!==null&&(E=Jr(b),b!==E||b.tag!==5&&b.tag!==6)&&(b=null)):(C=null,b=u),C!==b)){if(N=Th,S="onMouseLeave",y="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(N=Dh,S="onPointerLeave",y="onPointerEnter",v="pointer"),E=C==null?g:ki(C),h=b==null?g:ki(b),g=new N(S,v+"leave",C,n,p),g.target=E,g.relatedTarget=h,S=null,Wr(p)===u&&(N=new N(y,v+"enter",b,n,p),N.target=h,N.relatedTarget=E,S=N),E=S,C&&b)t:{for(N=C,y=b,v=0,h=N;h;h=gi(h))v++;for(h=0,S=y;S;S=gi(S))h++;for(;0<v-h;)N=gi(N),v--;for(;0<h-v;)y=gi(y),h--;for(;v--;){if(N===y||y!==null&&N===y.alternate)break t;N=gi(N),y=gi(y)}N=null}else N=null;C!==null&&Vh(f,g,C,N,!1),b!==null&&E!==null&&Vh(f,E,b,N,!0)}}e:{if(g=u?ki(u):window,C=g.nodeName&&g.nodeName.toLowerCase(),C==="select"||C==="input"&&g.type==="file")var j=Uy;else if(Oh(g))if(am)j=Xy;else{j=Qy;var Q=Yy}else(C=g.nodeName)&&C.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(j=Vy);if(j&&(j=j(e,u))){sm(f,j,n,p);break e}Q&&Q(e,g,u),e==="focusout"&&(Q=g._wrapperState)&&Q.controlled&&g.type==="number"&&Kd(g,"number",g.value)}switch(Q=u?ki(u):window,e){case"focusin":(Oh(Q)||Q.contentEditable==="true")&&(wi=Q,cu=u,Dl=null);break;case"focusout":Dl=cu=wi=null;break;case"mousedown":du=!0;break;case"contextmenu":case"mouseup":case"dragend":du=!1,jh(f,n,p);break;case"selectionchange":if(Ky)break;case"keydown":case"keyup":jh(f,n,p)}var D;if(qu)e:{switch(e){case"compositionstart":var V="onCompositionStart";break e;case"compositionend":V="onCompositionEnd";break e;case"compositionupdate":V="onCompositionUpdate";break e}V=void 0}else vi?im(e,n)&&(V="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(V="onCompositionStart");V&&(rm&&n.locale!=="ko"&&(vi||V!=="onCompositionStart"?V==="onCompositionEnd"&&vi&&(D=om()):(ir=p,Vu="value"in ir?ir.value:ir.textContent,vi=!0)),Q=Ra(u,V),0<Q.length&&(V=new Ph(V,e,null,n,p),f.push({event:V,listeners:Q}),D?V.data=D:(D=lm(n),D!==null&&(V.data=D)))),(D=Ay?Fy(e,n):Wy(e,n))&&(u=Ra(u,"onBeforeInput"),0<u.length&&(p=new Ph("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:u}),p.data=D))}ym(f,t)})}function Gl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ra(e,t){for(var n=t+"Capture",o=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=jl(e,n),i!=null&&o.unshift(Gl(e,i,r)),i=jl(e,t),i!=null&&o.push(Gl(e,i,r))),e=e.return}return o}function gi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Vh(e,t,n,o,r){for(var i=t._reactName,l=[];n!==null&&n!==o;){var s=n,a=s.alternate,u=s.stateNode;if(a!==null&&a===o)break;s.tag===5&&u!==null&&(s=u,r?(a=jl(n,i),a!=null&&l.unshift(Gl(n,a,s))):r||(a=jl(n,i),a!=null&&l.push(Gl(n,a,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Zy=/\r\n?/g,e5=/\u0000|\uFFFD/g;function Xh(e){return(typeof e=="string"?e:""+e).replace(Zy,`
`).replace(e5,"")}function aa(e,t,n){if(t=Xh(t),Xh(e)!==t&&n)throw Error(X(425))}function $a(){}var uu=null,_u=null;function fu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hu=typeof setTimeout=="function"?setTimeout:void 0,t5=typeof clearTimeout=="function"?clearTimeout:void 0,Gh=typeof Promise=="function"?Promise:void 0,n5=typeof queueMicrotask=="function"?queueMicrotask:typeof Gh<"u"?function(e){return Gh.resolve(null).then(e).catch(o5)}:hu;function o5(e){setTimeout(function(){throw e})}function Pd(e,t){var n=t,o=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(o===0){e.removeChild(r),Yl(t);return}o--}else n!=="$"&&n!=="$?"&&n!=="$!"||o++;n=r}while(n);Yl(t)}function dr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function qh(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ui=Math.random().toString(36).slice(2),ko="__reactFiber$"+Ui,ql="__reactProps$"+Ui,Uo="__reactContainer$"+Ui,pu="__reactEvents$"+Ui,r5="__reactListeners$"+Ui,i5="__reactHandles$"+Ui;function Wr(e){var t=e[ko];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Uo]||n[ko]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=qh(e);e!==null;){if(n=e[ko])return n;e=qh(e)}return t}e=n,n=e.parentNode}return null}function is(e){return e=e[ko]||e[Uo],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ki(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(X(33))}function Ja(e){return e[ql]||null}var mu=[],Ci=-1;function yr(e){return{current:e}}function St(e){0>Ci||(e.current=mu[Ci],mu[Ci]=null,Ci--)}function wt(e,t){Ci++,mu[Ci]=e.current,e.current=t}var mr={},cn=yr(mr),bn=yr(!1),Qr=mr;function zi(e,t){var n=e.type.contextTypes;if(!n)return mr;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===t)return o.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=t[i];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function kn(e){return e=e.childContextTypes,e!=null}function Ta(){St(bn),St(cn)}function Kh(e,t,n){if(cn.current!==mr)throw Error(X(168));wt(cn,t),wt(bn,n)}function vm(e,t,n){var o=e.stateNode;if(t=t.childContextTypes,typeof o.getChildContext!="function")return n;o=o.getChildContext();for(var r in o)if(!(r in t))throw Error(X(108,Y1(e)||"Unknown",r));return It({},n,o)}function Pa(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||mr,Qr=cn.current,wt(cn,e),wt(bn,bn.current),!0}function Jh(e,t,n){var o=e.stateNode;if(!o)throw Error(X(169));n?(e=vm(e,t,Qr),o.__reactInternalMemoizedMergedChildContext=e,St(bn),St(cn),wt(cn,e)):St(bn),wt(bn,n)}var Ao=null,Za=!1,Dd=!1;function wm(e){Ao===null?Ao=[e]:Ao.push(e)}function l5(e){Za=!0,wm(e)}function xr(){if(!Dd&&Ao!==null){Dd=!0;var e=0,t=ut;try{var n=Ao;for(ut=1;e<n.length;e++){var o=n[e];do o=o(!0);while(o!==null)}Ao=null,Za=!1}catch(r){throw Ao!==null&&(Ao=Ao.slice(e+1)),Qp(Hu,xr),r}finally{ut=t,Dd=!1}}return null}var Si=[],Ei=0,Da=null,Ba=0,Hn=[],Un=0,Vr=null,Fo=1,Wo="";function Ar(e,t){Si[Ei++]=Ba,Si[Ei++]=Da,Da=e,Ba=t}function bm(e,t,n){Hn[Un++]=Fo,Hn[Un++]=Wo,Hn[Un++]=Vr,Vr=e;var o=Fo;e=Wo;var r=32-ao(o)-1;o&=~(1<<r),n+=1;var i=32-ao(t)+r;if(30<i){var l=r-r%5;i=(o&(1<<l)-1).toString(32),o>>=l,r-=l,Fo=1<<32-ao(t)+r|n<<r|o,Wo=i+e}else Fo=1<<i|n<<r|o,Wo=e}function Ju(e){e.return!==null&&(Ar(e,1),bm(e,1,0))}function Zu(e){for(;e===Da;)Da=Si[--Ei],Si[Ei]=null,Ba=Si[--Ei],Si[Ei]=null;for(;e===Vr;)Vr=Hn[--Un],Hn[Un]=null,Wo=Hn[--Un],Hn[Un]=null,Fo=Hn[--Un],Hn[Un]=null}var Nn=null,Ln=null,Mt=!1,so=null;function km(e,t){var n=Yn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Zh(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Nn=e,Ln=dr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Nn=e,Ln=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Vr!==null?{id:Fo,overflow:Wo}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Yn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Nn=e,Ln=null,!0):!1;default:return!1}}function gu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function yu(e){if(Mt){var t=Ln;if(t){var n=t;if(!Zh(e,t)){if(gu(e))throw Error(X(418));t=dr(n.nextSibling);var o=Nn;t&&Zh(e,t)?km(o,n):(e.flags=e.flags&-4097|2,Mt=!1,Nn=e)}}else{if(gu(e))throw Error(X(418));e.flags=e.flags&-4097|2,Mt=!1,Nn=e}}}function ep(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Nn=e}function ca(e){if(e!==Nn)return!1;if(!Mt)return ep(e),Mt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!fu(e.type,e.memoizedProps)),t&&(t=Ln)){if(gu(e))throw Cm(),Error(X(418));for(;t;)km(e,t),t=dr(t.nextSibling)}if(ep(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(X(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ln=dr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ln=null}}else Ln=Nn?dr(e.stateNode.nextSibling):null;return!0}function Cm(){for(var e=Ln;e;)e=dr(e.nextSibling)}function Oi(){Ln=Nn=null,Mt=!1}function e_(e){so===null?so=[e]:so.push(e)}var s5=Vo.ReactCurrentBatchConfig;function kl(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(X(309));var o=n.stateNode}if(!o)throw Error(X(147,e));var r=o,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var s=r.refs;l===null?delete s[i]:s[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(X(284));if(!n._owner)throw Error(X(290,e))}return e}function da(e,t){throw e=Object.prototype.toString.call(t),Error(X(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function tp(e){var t=e._init;return t(e._payload)}function Sm(e){function t(y,v){if(e){var h=y.deletions;h===null?(y.deletions=[v],y.flags|=16):h.push(v)}}function n(y,v){if(!e)return null;for(;v!==null;)t(y,v),v=v.sibling;return null}function o(y,v){for(y=new Map;v!==null;)v.key!==null?y.set(v.key,v):y.set(v.index,v),v=v.sibling;return y}function r(y,v){return y=hr(y,v),y.index=0,y.sibling=null,y}function i(y,v,h){return y.index=h,e?(h=y.alternate,h!==null?(h=h.index,h<v?(y.flags|=2,v):h):(y.flags|=2,v)):(y.flags|=1048576,v)}function l(y){return e&&y.alternate===null&&(y.flags|=2),y}function s(y,v,h,S){return v===null||v.tag!==6?(v=jd(h,y.mode,S),v.return=y,v):(v=r(v,h),v.return=y,v)}function a(y,v,h,S){var j=h.type;return j===xi?p(y,v,h.props.children,S,h.key):v!==null&&(v.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===tr&&tp(j)===v.type)?(S=r(v,h.props),S.ref=kl(y,v,h),S.return=y,S):(S=ka(h.type,h.key,h.props,null,y.mode,S),S.ref=kl(y,v,h),S.return=y,S)}function u(y,v,h,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==h.containerInfo||v.stateNode.implementation!==h.implementation?(v=Hd(h,y.mode,S),v.return=y,v):(v=r(v,h.children||[]),v.return=y,v)}function p(y,v,h,S,j){return v===null||v.tag!==7?(v=Yr(h,y.mode,S,j),v.return=y,v):(v=r(v,h),v.return=y,v)}function f(y,v,h){if(typeof v=="string"&&v!==""||typeof v=="number")return v=jd(""+v,y.mode,h),v.return=y,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Gs:return h=ka(v.type,v.key,v.props,null,y.mode,h),h.ref=kl(y,null,v),h.return=y,h;case yi:return v=Hd(v,y.mode,h),v.return=y,v;case tr:var S=v._init;return f(y,S(v._payload),h)}if(Ll(v)||xl(v))return v=Yr(v,y.mode,h,null),v.return=y,v;da(y,v)}return null}function g(y,v,h,S){var j=v!==null?v.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return j!==null?null:s(y,v,""+h,S);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Gs:return h.key===j?a(y,v,h,S):null;case yi:return h.key===j?u(y,v,h,S):null;case tr:return j=h._init,g(y,v,j(h._payload),S)}if(Ll(h)||xl(h))return j!==null?null:p(y,v,h,S,null);da(y,h)}return null}function C(y,v,h,S,j){if(typeof S=="string"&&S!==""||typeof S=="number")return y=y.get(h)||null,s(v,y,""+S,j);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Gs:return y=y.get(S.key===null?h:S.key)||null,a(v,y,S,j);case yi:return y=y.get(S.key===null?h:S.key)||null,u(v,y,S,j);case tr:var Q=S._init;return C(y,v,h,Q(S._payload),j)}if(Ll(S)||xl(S))return y=y.get(h)||null,p(v,y,S,j,null);da(v,S)}return null}function b(y,v,h,S){for(var j=null,Q=null,D=v,V=v=0,z=null;D!==null&&V<h.length;V++){D.index>V?(z=D,D=null):z=D.sibling;var K=g(y,D,h[V],S);if(K===null){D===null&&(D=z);break}e&&D&&K.alternate===null&&t(y,D),v=i(K,v,V),Q===null?j=K:Q.sibling=K,Q=K,D=z}if(V===h.length)return n(y,D),Mt&&Ar(y,V),j;if(D===null){for(;V<h.length;V++)D=f(y,h[V],S),D!==null&&(v=i(D,v,V),Q===null?j=D:Q.sibling=D,Q=D);return Mt&&Ar(y,V),j}for(D=o(y,D);V<h.length;V++)z=C(D,y,V,h[V],S),z!==null&&(e&&z.alternate!==null&&D.delete(z.key===null?V:z.key),v=i(z,v,V),Q===null?j=z:Q.sibling=z,Q=z);return e&&D.forEach(function(Z){return t(y,Z)}),Mt&&Ar(y,V),j}function N(y,v,h,S){var j=xl(h);if(typeof j!="function")throw Error(X(150));if(h=j.call(h),h==null)throw Error(X(151));for(var Q=j=null,D=v,V=v=0,z=null,K=h.next();D!==null&&!K.done;V++,K=h.next()){D.index>V?(z=D,D=null):z=D.sibling;var Z=g(y,D,K.value,S);if(Z===null){D===null&&(D=z);break}e&&D&&Z.alternate===null&&t(y,D),v=i(Z,v,V),Q===null?j=Z:Q.sibling=Z,Q=Z,D=z}if(K.done)return n(y,D),Mt&&Ar(y,V),j;if(D===null){for(;!K.done;V++,K=h.next())K=f(y,K.value,S),K!==null&&(v=i(K,v,V),Q===null?j=K:Q.sibling=K,Q=K);return Mt&&Ar(y,V),j}for(D=o(y,D);!K.done;V++,K=h.next())K=C(D,y,V,K.value,S),K!==null&&(e&&K.alternate!==null&&D.delete(K.key===null?V:K.key),v=i(K,v,V),Q===null?j=K:Q.sibling=K,Q=K);return e&&D.forEach(function(J){return t(y,J)}),Mt&&Ar(y,V),j}function E(y,v,h,S){if(typeof h=="object"&&h!==null&&h.type===xi&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Gs:e:{for(var j=h.key,Q=v;Q!==null;){if(Q.key===j){if(j=h.type,j===xi){if(Q.tag===7){n(y,Q.sibling),v=r(Q,h.props.children),v.return=y,y=v;break e}}else if(Q.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===tr&&tp(j)===Q.type){n(y,Q.sibling),v=r(Q,h.props),v.ref=kl(y,Q,h),v.return=y,y=v;break e}n(y,Q);break}else t(y,Q);Q=Q.sibling}h.type===xi?(v=Yr(h.props.children,y.mode,S,h.key),v.return=y,y=v):(S=ka(h.type,h.key,h.props,null,y.mode,S),S.ref=kl(y,v,h),S.return=y,y=S)}return l(y);case yi:e:{for(Q=h.key;v!==null;){if(v.key===Q)if(v.tag===4&&v.stateNode.containerInfo===h.containerInfo&&v.stateNode.implementation===h.implementation){n(y,v.sibling),v=r(v,h.children||[]),v.return=y,y=v;break e}else{n(y,v);break}else t(y,v);v=v.sibling}v=Hd(h,y.mode,S),v.return=y,y=v}return l(y);case tr:return Q=h._init,E(y,v,Q(h._payload),S)}if(Ll(h))return b(y,v,h,S);if(xl(h))return N(y,v,h,S);da(y,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,v!==null&&v.tag===6?(n(y,v.sibling),v=r(v,h),v.return=y,y=v):(n(y,v),v=jd(h,y.mode,S),v.return=y,y=v),l(y)):n(y,v)}return E}var Ai=Sm(!0),Em=Sm(!1),za=yr(null),Oa=null,Mi=null,t_=null;function n_(){t_=Mi=Oa=null}function o_(e){var t=za.current;St(za),e._currentValue=t}function xu(e,t,n){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===n)break;e=e.return}}function Pi(e,t){Oa=e,t_=Mi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(wn=!0),e.firstContext=null)}function Vn(e){var t=e._currentValue;if(t_!==e)if(e={context:e,memoizedValue:t,next:null},Mi===null){if(Oa===null)throw Error(X(308));Mi=e,Oa.dependencies={lanes:0,firstContext:e}}else Mi=Mi.next=e;return t}var jr=null;function r_(e){jr===null?jr=[e]:jr.push(e)}function Mm(e,t,n,o){var r=t.interleaved;return r===null?(n.next=n,r_(t)):(n.next=r.next,r.next=n),t.interleaved=n,Yo(e,o)}function Yo(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var nr=!1;function i_(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Lm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function jo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ur(e,t,n){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Ge&2){var r=o.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),o.pending=t,Yo(e,n)}return r=o.interleaved,r===null?(t.next=t,r_(o)):(t.next=r.next,r.next=t),o.interleaved=t,Yo(e,n)}function ga(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var o=t.lanes;o&=e.pendingLanes,n|=o,t.lanes=n,Uu(e,n)}}function np(e,t){var n=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,n===o)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:o.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:o.shared,effects:o.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Aa(e,t,n,o){var r=e.updateQueue;nr=!1;var i=r.firstBaseUpdate,l=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var a=s,u=a.next;a.next=null,l===null?i=u:l.next=u,l=a;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==l&&(s===null?p.firstBaseUpdate=u:s.next=u,p.lastBaseUpdate=a))}if(i!==null){var f=r.baseState;l=0,p=u=a=null,s=i;do{var g=s.lane,C=s.eventTime;if((o&g)===g){p!==null&&(p=p.next={eventTime:C,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var b=e,N=s;switch(g=t,C=n,N.tag){case 1:if(b=N.payload,typeof b=="function"){f=b.call(C,f,g);break e}f=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=N.payload,g=typeof b=="function"?b.call(C,f,g):b,g==null)break e;f=It({},f,g);break e;case 2:nr=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=r.effects,g===null?r.effects=[s]:g.push(s))}else C={eventTime:C,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(u=p=C,a=f):p=p.next=C,l|=g;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;g=s,s=g.next,g.next=null,r.lastBaseUpdate=g,r.shared.pending=null}}while(!0);if(p===null&&(a=f),r.baseState=a,r.firstBaseUpdate=u,r.lastBaseUpdate=p,t=r.shared.interleaved,t!==null){r=t;do l|=r.lane,r=r.next;while(r!==t)}else i===null&&(r.shared.lanes=0);Gr|=l,e.lanes=l,e.memoizedState=f}}function op(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var o=e[t],r=o.callback;if(r!==null){if(o.callback=null,o=n,typeof r!="function")throw Error(X(191,r));r.call(o)}}}var ls={},So=yr(ls),Kl=yr(ls),Jl=yr(ls);function Hr(e){if(e===ls)throw Error(X(174));return e}function l_(e,t){switch(wt(Jl,t),wt(Kl,e),wt(So,ls),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Zd(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Zd(t,e)}St(So),wt(So,t)}function Fi(){St(So),St(Kl),St(Jl)}function Nm(e){Hr(Jl.current);var t=Hr(So.current),n=Zd(t,e.type);t!==n&&(wt(Kl,e),wt(So,n))}function s_(e){Kl.current===e&&(St(So),St(Kl))}var Lt=yr(0);function Fa(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bd=[];function a_(){for(var e=0;e<Bd.length;e++)Bd[e]._workInProgressVersionPrimary=null;Bd.length=0}var ya=Vo.ReactCurrentDispatcher,zd=Vo.ReactCurrentBatchConfig,Xr=0,Nt=null,Wt=null,Ht=null,Wa=!1,Bl=!1,Zl=0,a5=0;function ln(){throw Error(X(321))}function c_(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!uo(e[n],t[n]))return!1;return!0}function d_(e,t,n,o,r,i){if(Xr=i,Nt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ya.current=e===null||e.memoizedState===null?_5:f5,e=n(o,r),Bl){i=0;do{if(Bl=!1,Zl=0,25<=i)throw Error(X(301));i+=1,Ht=Wt=null,t.updateQueue=null,ya.current=h5,e=n(o,r)}while(Bl)}if(ya.current=ja,t=Wt!==null&&Wt.next!==null,Xr=0,Ht=Wt=Nt=null,Wa=!1,t)throw Error(X(300));return e}function u_(){var e=Zl!==0;return Zl=0,e}function bo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?Nt.memoizedState=Ht=e:Ht=Ht.next=e,Ht}function Xn(){if(Wt===null){var e=Nt.alternate;e=e!==null?e.memoizedState:null}else e=Wt.next;var t=Ht===null?Nt.memoizedState:Ht.next;if(t!==null)Ht=t,Wt=e;else{if(e===null)throw Error(X(310));Wt=e,e={memoizedState:Wt.memoizedState,baseState:Wt.baseState,baseQueue:Wt.baseQueue,queue:Wt.queue,next:null},Ht===null?Nt.memoizedState=Ht=e:Ht=Ht.next=e}return Ht}function es(e,t){return typeof t=="function"?t(e):t}function Od(e){var t=Xn(),n=t.queue;if(n===null)throw Error(X(311));n.lastRenderedReducer=e;var o=Wt,r=o.baseQueue,i=n.pending;if(i!==null){if(r!==null){var l=r.next;r.next=i.next,i.next=l}o.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,o=o.baseState;var s=l=null,a=null,u=i;do{var p=u.lane;if((Xr&p)===p)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),o=u.hasEagerState?u.eagerState:e(o,u.action);else{var f={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(s=a=f,l=o):a=a.next=f,Nt.lanes|=p,Gr|=p}u=u.next}while(u!==null&&u!==i);a===null?l=o:a.next=s,uo(o,t.memoizedState)||(wn=!0),t.memoizedState=o,t.baseState=l,t.baseQueue=a,n.lastRenderedState=o}if(e=n.interleaved,e!==null){r=e;do i=r.lane,Nt.lanes|=i,Gr|=i,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ad(e){var t=Xn(),n=t.queue;if(n===null)throw Error(X(311));n.lastRenderedReducer=e;var o=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var l=r=r.next;do i=e(i,l.action),l=l.next;while(l!==r);uo(i,t.memoizedState)||(wn=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,o]}function Im(){}function Rm(e,t){var n=Nt,o=Xn(),r=t(),i=!uo(o.memoizedState,r);if(i&&(o.memoizedState=r,wn=!0),o=o.queue,__(Pm.bind(null,n,o,e),[e]),o.getSnapshot!==t||i||Ht!==null&&Ht.memoizedState.tag&1){if(n.flags|=2048,ts(9,Tm.bind(null,n,o,r,t),void 0,null),Ut===null)throw Error(X(349));Xr&30||$m(n,t,r)}return r}function $m(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Nt.updateQueue,t===null?(t={lastEffect:null,stores:null},Nt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Tm(e,t,n,o){t.value=n,t.getSnapshot=o,Dm(t)&&Bm(e)}function Pm(e,t,n){return n(function(){Dm(t)&&Bm(e)})}function Dm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!uo(e,n)}catch{return!0}}function Bm(e){var t=Yo(e,1);t!==null&&co(t,e,1,-1)}function rp(e){var t=bo();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:es,lastRenderedState:e},t.queue=e,e=e.dispatch=u5.bind(null,Nt,e),[t.memoizedState,e]}function ts(e,t,n,o){return e={tag:e,create:t,destroy:n,deps:o,next:null},t=Nt.updateQueue,t===null?(t={lastEffect:null,stores:null},Nt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(o=n.next,n.next=e,e.next=o,t.lastEffect=e)),e}function zm(){return Xn().memoizedState}function xa(e,t,n,o){var r=bo();Nt.flags|=e,r.memoizedState=ts(1|t,n,void 0,o===void 0?null:o)}function ec(e,t,n,o){var r=Xn();o=o===void 0?null:o;var i=void 0;if(Wt!==null){var l=Wt.memoizedState;if(i=l.destroy,o!==null&&c_(o,l.deps)){r.memoizedState=ts(t,n,i,o);return}}Nt.flags|=e,r.memoizedState=ts(1|t,n,i,o)}function ip(e,t){return xa(8390656,8,e,t)}function __(e,t){return ec(2048,8,e,t)}function Om(e,t){return ec(4,2,e,t)}function Am(e,t){return ec(4,4,e,t)}function Fm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Wm(e,t,n){return n=n!=null?n.concat([e]):null,ec(4,4,Fm.bind(null,t,e),n)}function f_(){}function jm(e,t){var n=Xn();t=t===void 0?null:t;var o=n.memoizedState;return o!==null&&t!==null&&c_(t,o[1])?o[0]:(n.memoizedState=[e,t],e)}function Hm(e,t){var n=Xn();t=t===void 0?null:t;var o=n.memoizedState;return o!==null&&t!==null&&c_(t,o[1])?o[0]:(e=e(),n.memoizedState=[e,t],e)}function Um(e,t,n){return Xr&21?(uo(n,t)||(n=Gp(),Nt.lanes|=n,Gr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,wn=!0),e.memoizedState=n)}function c5(e,t){var n=ut;ut=n!==0&&4>n?n:4,e(!0);var o=zd.transition;zd.transition={};try{e(!1),t()}finally{ut=n,zd.transition=o}}function Ym(){return Xn().memoizedState}function d5(e,t,n){var o=fr(e);if(n={lane:o,action:n,hasEagerState:!1,eagerState:null,next:null},Qm(e))Vm(t,n);else if(n=Mm(e,t,n,o),n!==null){var r=hn();co(n,e,o,r),Xm(n,t,o)}}function u5(e,t,n){var o=fr(e),r={lane:o,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qm(e))Vm(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,s=i(l,n);if(r.hasEagerState=!0,r.eagerState=s,uo(s,l)){var a=t.interleaved;a===null?(r.next=r,r_(t)):(r.next=a.next,a.next=r),t.interleaved=r;return}}catch{}finally{}n=Mm(e,t,r,o),n!==null&&(r=hn(),co(n,e,o,r),Xm(n,t,o))}}function Qm(e){var t=e.alternate;return e===Nt||t!==null&&t===Nt}function Vm(e,t){Bl=Wa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xm(e,t,n){if(n&4194240){var o=t.lanes;o&=e.pendingLanes,n|=o,t.lanes=n,Uu(e,n)}}var ja={readContext:Vn,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useInsertionEffect:ln,useLayoutEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useMutableSource:ln,useSyncExternalStore:ln,useId:ln,unstable_isNewReconciler:!1},_5={readContext:Vn,useCallback:function(e,t){return bo().memoizedState=[e,t===void 0?null:t],e},useContext:Vn,useEffect:ip,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xa(4194308,4,Fm.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xa(4194308,4,e,t)},useInsertionEffect:function(e,t){return xa(4,2,e,t)},useMemo:function(e,t){var n=bo();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var o=bo();return t=n!==void 0?n(t):t,o.memoizedState=o.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},o.queue=e,e=e.dispatch=d5.bind(null,Nt,e),[o.memoizedState,e]},useRef:function(e){var t=bo();return e={current:e},t.memoizedState=e},useState:rp,useDebugValue:f_,useDeferredValue:function(e){return bo().memoizedState=e},useTransition:function(){var e=rp(!1),t=e[0];return e=c5.bind(null,e[1]),bo().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var o=Nt,r=bo();if(Mt){if(n===void 0)throw Error(X(407));n=n()}else{if(n=t(),Ut===null)throw Error(X(349));Xr&30||$m(o,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,ip(Pm.bind(null,o,i,e),[e]),o.flags|=2048,ts(9,Tm.bind(null,o,i,n,t),void 0,null),n},useId:function(){var e=bo(),t=Ut.identifierPrefix;if(Mt){var n=Wo,o=Fo;n=(o&~(1<<32-ao(o)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zl++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=a5++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},f5={readContext:Vn,useCallback:jm,useContext:Vn,useEffect:__,useImperativeHandle:Wm,useInsertionEffect:Om,useLayoutEffect:Am,useMemo:Hm,useReducer:Od,useRef:zm,useState:function(){return Od(es)},useDebugValue:f_,useDeferredValue:function(e){var t=Xn();return Um(t,Wt.memoizedState,e)},useTransition:function(){var e=Od(es)[0],t=Xn().memoizedState;return[e,t]},useMutableSource:Im,useSyncExternalStore:Rm,useId:Ym,unstable_isNewReconciler:!1},h5={readContext:Vn,useCallback:jm,useContext:Vn,useEffect:__,useImperativeHandle:Wm,useInsertionEffect:Om,useLayoutEffect:Am,useMemo:Hm,useReducer:Ad,useRef:zm,useState:function(){return Ad(es)},useDebugValue:f_,useDeferredValue:function(e){var t=Xn();return Wt===null?t.memoizedState=e:Um(t,Wt.memoizedState,e)},useTransition:function(){var e=Ad(es)[0],t=Xn().memoizedState;return[e,t]},useMutableSource:Im,useSyncExternalStore:Rm,useId:Ym,unstable_isNewReconciler:!1};function io(e,t){if(e&&e.defaultProps){t=It({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vu(e,t,n,o){t=e.memoizedState,n=n(o,t),n=n==null?t:It({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var tc={isMounted:function(e){return(e=e._reactInternals)?Jr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var o=hn(),r=fr(e),i=jo(o,r);i.payload=t,n!=null&&(i.callback=n),t=ur(e,i,r),t!==null&&(co(t,e,r,o),ga(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var o=hn(),r=fr(e),i=jo(o,r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ur(e,i,r),t!==null&&(co(t,e,r,o),ga(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=hn(),o=fr(e),r=jo(n,o);r.tag=2,t!=null&&(r.callback=t),t=ur(e,r,o),t!==null&&(co(t,e,o,n),ga(t,e,o))}};function lp(e,t,n,o,r,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,i,l):t.prototype&&t.prototype.isPureReactComponent?!Vl(n,o)||!Vl(r,i):!0}function Gm(e,t,n){var o=!1,r=mr,i=t.contextType;return typeof i=="object"&&i!==null?i=Vn(i):(r=kn(t)?Qr:cn.current,o=t.contextTypes,i=(o=o!=null)?zi(e,r):mr),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=tc,e.stateNode=t,t._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),t}function sp(e,t,n,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,o),t.state!==e&&tc.enqueueReplaceState(t,t.state,null)}function wu(e,t,n,o){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},i_(e);var i=t.contextType;typeof i=="object"&&i!==null?r.context=Vn(i):(i=kn(t)?Qr:cn.current,r.context=zi(e,i)),r.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(vu(e,t,i,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&tc.enqueueReplaceState(r,r.state,null),Aa(e,n,r,o),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Wi(e,t){try{var n="",o=t;do n+=U1(o),o=o.return;while(o);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:r,digest:null}}function Fd(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function bu(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var p5=typeof WeakMap=="function"?WeakMap:Map;function qm(e,t,n){n=jo(-1,n),n.tag=3,n.payload={element:null};var o=t.value;return n.callback=function(){Ua||(Ua=!0,$u=o),bu(e,t)},n}function Km(e,t,n){n=jo(-1,n),n.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var r=t.value;n.payload=function(){return o(r)},n.callback=function(){bu(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){bu(e,t),typeof o!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function ap(e,t,n){var o=e.pingCache;if(o===null){o=e.pingCache=new p5;var r=new Set;o.set(t,r)}else r=o.get(t),r===void 0&&(r=new Set,o.set(t,r));r.has(n)||(r.add(n),e=N5.bind(null,e,t,n),t.then(e,e))}function cp(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function dp(e,t,n,o,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=jo(-1,1),t.tag=2,ur(n,t,1))),n.lanes|=1),e)}var m5=Vo.ReactCurrentOwner,wn=!1;function fn(e,t,n,o){t.child=e===null?Em(t,null,n,o):Ai(t,e.child,n,o)}function up(e,t,n,o,r){n=n.render;var i=t.ref;return Pi(t,r),o=d_(e,t,n,o,i,r),n=u_(),e!==null&&!wn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,Qo(e,t,r)):(Mt&&n&&Ju(t),t.flags|=1,fn(e,t,o,r),t.child)}function _p(e,t,n,o,r){if(e===null){var i=n.type;return typeof i=="function"&&!w_(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Jm(e,t,i,o,r)):(e=ka(n.type,null,o,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&r)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:Vl,n(l,o)&&e.ref===t.ref)return Qo(e,t,r)}return t.flags|=1,e=hr(i,o),e.ref=t.ref,e.return=t,t.child=e}function Jm(e,t,n,o,r){if(e!==null){var i=e.memoizedProps;if(Vl(i,o)&&e.ref===t.ref)if(wn=!1,t.pendingProps=o=i,(e.lanes&r)!==0)e.flags&131072&&(wn=!0);else return t.lanes=e.lanes,Qo(e,t,r)}return ku(e,t,n,o,r)}function Zm(e,t,n){var o=t.pendingProps,r=o.children,i=e!==null?e.memoizedState:null;if(o.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},wt(Ni,Mn),Mn|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,wt(Ni,Mn),Mn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=i!==null?i.baseLanes:n,wt(Ni,Mn),Mn|=o}else i!==null?(o=i.baseLanes|n,t.memoizedState=null):o=n,wt(Ni,Mn),Mn|=o;return fn(e,t,r,n),t.child}function e0(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ku(e,t,n,o,r){var i=kn(n)?Qr:cn.current;return i=zi(t,i),Pi(t,r),n=d_(e,t,n,o,i,r),o=u_(),e!==null&&!wn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,Qo(e,t,r)):(Mt&&o&&Ju(t),t.flags|=1,fn(e,t,n,r),t.child)}function fp(e,t,n,o,r){if(kn(n)){var i=!0;Pa(t)}else i=!1;if(Pi(t,r),t.stateNode===null)va(e,t),Gm(t,n,o),wu(t,n,o,r),o=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var a=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=Vn(u):(u=kn(n)?Qr:cn.current,u=zi(t,u));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function";f||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==o||a!==u)&&sp(t,l,o,u),nr=!1;var g=t.memoizedState;l.state=g,Aa(t,o,l,r),a=t.memoizedState,s!==o||g!==a||bn.current||nr?(typeof p=="function"&&(vu(t,n,p,o),a=t.memoizedState),(s=nr||lp(t,n,s,o,g,a,u))?(f||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=a),l.props=o,l.state=a,l.context=u,o=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{l=t.stateNode,Lm(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:io(t.type,s),l.props=u,f=t.pendingProps,g=l.context,a=n.contextType,typeof a=="object"&&a!==null?a=Vn(a):(a=kn(n)?Qr:cn.current,a=zi(t,a));var C=n.getDerivedStateFromProps;(p=typeof C=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==f||g!==a)&&sp(t,l,o,a),nr=!1,g=t.memoizedState,l.state=g,Aa(t,o,l,r);var b=t.memoizedState;s!==f||g!==b||bn.current||nr?(typeof C=="function"&&(vu(t,n,C,o),b=t.memoizedState),(u=nr||lp(t,n,u,o,g,b,a)||!1)?(p||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(o,b,a),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(o,b,a)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=b),l.props=o,l.state=b,l.context=a,o=u):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),o=!1)}return Cu(e,t,n,o,i,r)}function Cu(e,t,n,o,r,i){e0(e,t);var l=(t.flags&128)!==0;if(!o&&!l)return r&&Jh(t,n,!1),Qo(e,t,i);o=t.stateNode,m5.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:o.render();return t.flags|=1,e!==null&&l?(t.child=Ai(t,e.child,null,i),t.child=Ai(t,null,s,i)):fn(e,t,s,i),t.memoizedState=o.state,r&&Jh(t,n,!0),t.child}function t0(e){var t=e.stateNode;t.pendingContext?Kh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Kh(e,t.context,!1),l_(e,t.containerInfo)}function hp(e,t,n,o,r){return Oi(),e_(r),t.flags|=256,fn(e,t,n,o),t.child}var Su={dehydrated:null,treeContext:null,retryLane:0};function Eu(e){return{baseLanes:e,cachePool:null,transitions:null}}function n0(e,t,n){var o=t.pendingProps,r=Lt.current,i=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(r&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),wt(Lt,r&1),e===null)return yu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=o.children,e=o.fallback,i?(o=t.mode,i=t.child,l={mode:"hidden",children:l},!(o&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=rc(l,o,0,null),e=Yr(e,o,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Eu(n),t.memoizedState=Su,e):h_(t,l));if(r=e.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return g5(e,t,l,o,s,r,n);if(i){i=o.fallback,l=t.mode,r=e.child,s=r.sibling;var a={mode:"hidden",children:o.children};return!(l&1)&&t.child!==r?(o=t.child,o.childLanes=0,o.pendingProps=a,t.deletions=null):(o=hr(r,a),o.subtreeFlags=r.subtreeFlags&14680064),s!==null?i=hr(s,i):(i=Yr(i,l,n,null),i.flags|=2),i.return=t,o.return=t,o.sibling=i,t.child=o,o=i,i=t.child,l=e.child.memoizedState,l=l===null?Eu(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Su,o}return i=e.child,e=i.sibling,o=hr(i,{mode:"visible",children:o.children}),!(t.mode&1)&&(o.lanes=n),o.return=t,o.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=o,t.memoizedState=null,o}function h_(e,t){return t=rc({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ua(e,t,n,o){return o!==null&&e_(o),Ai(t,e.child,null,n),e=h_(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function g5(e,t,n,o,r,i,l){if(n)return t.flags&256?(t.flags&=-257,o=Fd(Error(X(422))),ua(e,t,l,o)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=o.fallback,r=t.mode,o=rc({mode:"visible",children:o.children},r,0,null),i=Yr(i,r,l,null),i.flags|=2,o.return=t,i.return=t,o.sibling=i,t.child=o,t.mode&1&&Ai(t,e.child,null,l),t.child.memoizedState=Eu(l),t.memoizedState=Su,i);if(!(t.mode&1))return ua(e,t,l,null);if(r.data==="$!"){if(o=r.nextSibling&&r.nextSibling.dataset,o)var s=o.dgst;return o=s,i=Error(X(419)),o=Fd(i,o,void 0),ua(e,t,l,o)}if(s=(l&e.childLanes)!==0,wn||s){if(o=Ut,o!==null){switch(l&-l){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(o.suspendedLanes|l)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,Yo(e,r),co(o,e,r,-1))}return v_(),o=Fd(Error(X(421))),ua(e,t,l,o)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=I5.bind(null,e),r._reactRetry=t,null):(e=i.treeContext,Ln=dr(r.nextSibling),Nn=t,Mt=!0,so=null,e!==null&&(Hn[Un++]=Fo,Hn[Un++]=Wo,Hn[Un++]=Vr,Fo=e.id,Wo=e.overflow,Vr=t),t=h_(t,o.children),t.flags|=4096,t)}function pp(e,t,n){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),xu(e.return,t,n)}function Wd(e,t,n,o,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=o,i.tail=n,i.tailMode=r)}function o0(e,t,n){var o=t.pendingProps,r=o.revealOrder,i=o.tail;if(fn(e,t,o.children,n),o=Lt.current,o&2)o=o&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&pp(e,n,t);else if(e.tag===19)pp(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}if(wt(Lt,o),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&Fa(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),Wd(t,!1,r,n,i);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Fa(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}Wd(t,!0,n,null,i);break;case"together":Wd(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function va(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Qo(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(X(153));if(t.child!==null){for(e=t.child,n=hr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function y5(e,t,n){switch(t.tag){case 3:t0(t),Oi();break;case 5:Nm(t);break;case 1:kn(t.type)&&Pa(t);break;case 4:l_(t,t.stateNode.containerInfo);break;case 10:var o=t.type._context,r=t.memoizedProps.value;wt(za,o._currentValue),o._currentValue=r;break;case 13:if(o=t.memoizedState,o!==null)return o.dehydrated!==null?(wt(Lt,Lt.current&1),t.flags|=128,null):n&t.child.childLanes?n0(e,t,n):(wt(Lt,Lt.current&1),e=Qo(e,t,n),e!==null?e.sibling:null);wt(Lt,Lt.current&1);break;case 19:if(o=(n&t.childLanes)!==0,e.flags&128){if(o)return o0(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),wt(Lt,Lt.current),o)break;return null;case 22:case 23:return t.lanes=0,Zm(e,t,n)}return Qo(e,t,n)}var r0,Mu,i0,l0;r0=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Mu=function(){};i0=function(e,t,n,o){var r=e.memoizedProps;if(r!==o){e=t.stateNode,Hr(So.current);var i=null;switch(n){case"input":r=Gd(e,r),o=Gd(e,o),i=[];break;case"select":r=It({},r,{value:void 0}),o=It({},o,{value:void 0}),i=[];break;case"textarea":r=Jd(e,r),o=Jd(e,o),i=[];break;default:typeof r.onClick!="function"&&typeof o.onClick=="function"&&(e.onclick=$a)}eu(n,o);var l;n=null;for(u in r)if(!o.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var s=r[u];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Fl.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in o){var a=o[u];if(s=r?.[u],o.hasOwnProperty(u)&&a!==s&&(a!=null||s!=null))if(u==="style")if(s){for(l in s)!s.hasOwnProperty(l)||a&&a.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in a)a.hasOwnProperty(l)&&s[l]!==a[l]&&(n||(n={}),n[l]=a[l])}else n||(i||(i=[]),i.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(i=i||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Fl.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&Ct("scroll",e),i||s===a||(i=[])):(i=i||[]).push(u,a))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};l0=function(e,t,n,o){n!==o&&(t.flags|=4)};function Cl(e,t){if(!Mt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var o=null;n!==null;)n.alternate!==null&&(o=n),n=n.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function sn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,o=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,o|=r.subtreeFlags&14680064,o|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,o|=r.subtreeFlags,o|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=o,e.childLanes=n,t}function x5(e,t,n){var o=t.pendingProps;switch(Zu(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(t),null;case 1:return kn(t.type)&&Ta(),sn(t),null;case 3:return o=t.stateNode,Fi(),St(bn),St(cn),a_(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(ca(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,so!==null&&(Du(so),so=null))),Mu(e,t),sn(t),null;case 5:s_(t);var r=Hr(Jl.current);if(n=t.type,e!==null&&t.stateNode!=null)i0(e,t,n,o,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!o){if(t.stateNode===null)throw Error(X(166));return sn(t),null}if(e=Hr(So.current),ca(t)){o=t.stateNode,n=t.type;var i=t.memoizedProps;switch(o[ko]=t,o[ql]=i,e=(t.mode&1)!==0,n){case"dialog":Ct("cancel",o),Ct("close",o);break;case"iframe":case"object":case"embed":Ct("load",o);break;case"video":case"audio":for(r=0;r<Il.length;r++)Ct(Il[r],o);break;case"source":Ct("error",o);break;case"img":case"image":case"link":Ct("error",o),Ct("load",o);break;case"details":Ct("toggle",o);break;case"input":kh(o,i),Ct("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!i.multiple},Ct("invalid",o);break;case"textarea":Sh(o,i),Ct("invalid",o)}eu(n,i),r=null;for(var l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="children"?typeof s=="string"?o.textContent!==s&&(i.suppressHydrationWarning!==!0&&aa(o.textContent,s,e),r=["children",s]):typeof s=="number"&&o.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&aa(o.textContent,s,e),r=["children",""+s]):Fl.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&Ct("scroll",o)}switch(n){case"input":qs(o),Ch(o,i,!0);break;case"textarea":qs(o),Eh(o);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(o.onclick=$a)}o=r,t.updateQueue=o,o!==null&&(t.flags|=4)}else{l=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Pp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof o.is=="string"?e=l.createElement(n,{is:o.is}):(e=l.createElement(n),n==="select"&&(l=e,o.multiple?l.multiple=!0:o.size&&(l.size=o.size))):e=l.createElementNS(e,n),e[ko]=t,e[ql]=o,r0(e,t,!1,!1),t.stateNode=e;e:{switch(l=tu(n,o),n){case"dialog":Ct("cancel",e),Ct("close",e),r=o;break;case"iframe":case"object":case"embed":Ct("load",e),r=o;break;case"video":case"audio":for(r=0;r<Il.length;r++)Ct(Il[r],e);r=o;break;case"source":Ct("error",e),r=o;break;case"img":case"image":case"link":Ct("error",e),Ct("load",e),r=o;break;case"details":Ct("toggle",e),r=o;break;case"input":kh(e,o),r=Gd(e,o),Ct("invalid",e);break;case"option":r=o;break;case"select":e._wrapperState={wasMultiple:!!o.multiple},r=It({},o,{value:void 0}),Ct("invalid",e);break;case"textarea":Sh(e,o),r=Jd(e,o),Ct("invalid",e);break;default:r=o}eu(n,r),s=r;for(i in s)if(s.hasOwnProperty(i)){var a=s[i];i==="style"?zp(e,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Dp(e,a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Wl(e,a):typeof a=="number"&&Wl(e,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Fl.hasOwnProperty(i)?a!=null&&i==="onScroll"&&Ct("scroll",e):a!=null&&Ou(e,i,a,l))}switch(n){case"input":qs(e),Ch(e,o,!1);break;case"textarea":qs(e),Eh(e);break;case"option":o.value!=null&&e.setAttribute("value",""+pr(o.value));break;case"select":e.multiple=!!o.multiple,i=o.value,i!=null?Ii(e,!!o.multiple,i,!1):o.defaultValue!=null&&Ii(e,!!o.multiple,o.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=$a)}switch(n){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return sn(t),null;case 6:if(e&&t.stateNode!=null)l0(e,t,e.memoizedProps,o);else{if(typeof o!="string"&&t.stateNode===null)throw Error(X(166));if(n=Hr(Jl.current),Hr(So.current),ca(t)){if(o=t.stateNode,n=t.memoizedProps,o[ko]=t,(i=o.nodeValue!==n)&&(e=Nn,e!==null))switch(e.tag){case 3:aa(o.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&aa(o.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else o=(n.nodeType===9?n:n.ownerDocument).createTextNode(o),o[ko]=t,t.stateNode=o}return sn(t),null;case 13:if(St(Lt),o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Mt&&Ln!==null&&t.mode&1&&!(t.flags&128))Cm(),Oi(),t.flags|=98560,i=!1;else if(i=ca(t),o!==null&&o.dehydrated!==null){if(e===null){if(!i)throw Error(X(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(X(317));i[ko]=t}else Oi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;sn(t),i=!1}else so!==null&&(Du(so),so=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(o=o!==null,o!==(e!==null&&e.memoizedState!==null)&&o&&(t.child.flags|=8192,t.mode&1&&(e===null||Lt.current&1?jt===0&&(jt=3):v_())),t.updateQueue!==null&&(t.flags|=4),sn(t),null);case 4:return Fi(),Mu(e,t),e===null&&Xl(t.stateNode.containerInfo),sn(t),null;case 10:return o_(t.type._context),sn(t),null;case 17:return kn(t.type)&&Ta(),sn(t),null;case 19:if(St(Lt),i=t.memoizedState,i===null)return sn(t),null;if(o=(t.flags&128)!==0,l=i.rendering,l===null)if(o)Cl(i,!1);else{if(jt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Fa(e),l!==null){for(t.flags|=128,Cl(i,!1),o=l.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),t.subtreeFlags=0,o=n,n=t.child;n!==null;)i=n,e=o,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return wt(Lt,Lt.current&1|2),t.child}e=e.sibling}i.tail!==null&&Bt()>ji&&(t.flags|=128,o=!0,Cl(i,!1),t.lanes=4194304)}else{if(!o)if(e=Fa(l),e!==null){if(t.flags|=128,o=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Cl(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!Mt)return sn(t),null}else 2*Bt()-i.renderingStartTime>ji&&n!==1073741824&&(t.flags|=128,o=!0,Cl(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Bt(),t.sibling=null,n=Lt.current,wt(Lt,o?n&1|2:n&1),t):(sn(t),null);case 22:case 23:return x_(),o=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==o&&(t.flags|=8192),o&&t.mode&1?Mn&1073741824&&(sn(t),t.subtreeFlags&6&&(t.flags|=8192)):sn(t),null;case 24:return null;case 25:return null}throw Error(X(156,t.tag))}function v5(e,t){switch(Zu(t),t.tag){case 1:return kn(t.type)&&Ta(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Fi(),St(bn),St(cn),a_(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return s_(t),null;case 13:if(St(Lt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(X(340));Oi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return St(Lt),null;case 4:return Fi(),null;case 10:return o_(t.type._context),null;case 22:case 23:return x_(),null;case 24:return null;default:return null}}var _a=!1,an=!1,w5=typeof WeakSet=="function"?WeakSet:Set,le=null;function Li(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(o){Tt(e,t,o)}else n.current=null}function Lu(e,t,n){try{n()}catch(o){Tt(e,t,o)}}var mp=!1;function b5(e,t){if(uu=Na,e=um(),Ku(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var o=n.getSelection&&n.getSelection();if(o&&o.rangeCount!==0){n=o.anchorNode;var r=o.anchorOffset,i=o.focusNode;o=o.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,s=-1,a=-1,u=0,p=0,f=e,g=null;t:for(;;){for(var C;f!==n||r!==0&&f.nodeType!==3||(s=l+r),f!==i||o!==0&&f.nodeType!==3||(a=l+o),f.nodeType===3&&(l+=f.nodeValue.length),(C=f.firstChild)!==null;)g=f,f=C;for(;;){if(f===e)break t;if(g===n&&++u===r&&(s=l),g===i&&++p===o&&(a=l),(C=f.nextSibling)!==null)break;f=g,g=f.parentNode}f=C}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(_u={focusedElem:e,selectionRange:n},Na=!1,le=t;le!==null;)if(t=le,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,le=e;else for(;le!==null;){t=le;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var N=b.memoizedProps,E=b.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?N:io(t.type,N),E);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(X(163))}}catch(S){Tt(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,le=e;break}le=t.return}return b=mp,mp=!1,b}function zl(e,t,n){var o=t.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var r=o=o.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&Lu(t,n,i)}r=r.next}while(r!==o)}}function nc(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var o=n.create;n.destroy=o()}n=n.next}while(n!==t)}}function Nu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function s0(e){var t=e.alternate;t!==null&&(e.alternate=null,s0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ko],delete t[ql],delete t[pu],delete t[r5],delete t[i5])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function a0(e){return e.tag===5||e.tag===3||e.tag===4}function gp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||a0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Iu(e,t,n){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$a));else if(o!==4&&(e=e.child,e!==null))for(Iu(e,t,n),e=e.sibling;e!==null;)Iu(e,t,n),e=e.sibling}function Ru(e,t,n){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(o!==4&&(e=e.child,e!==null))for(Ru(e,t,n),e=e.sibling;e!==null;)Ru(e,t,n),e=e.sibling}var Gt=null,lo=!1;function er(e,t,n){for(n=n.child;n!==null;)c0(e,t,n),n=n.sibling}function c0(e,t,n){if(Co&&typeof Co.onCommitFiberUnmount=="function")try{Co.onCommitFiberUnmount(Xa,n)}catch{}switch(n.tag){case 5:an||Li(n,t);case 6:var o=Gt,r=lo;Gt=null,er(e,t,n),Gt=o,lo=r,Gt!==null&&(lo?(e=Gt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(lo?(e=Gt,n=n.stateNode,e.nodeType===8?Pd(e.parentNode,n):e.nodeType===1&&Pd(e,n),Yl(e)):Pd(Gt,n.stateNode));break;case 4:o=Gt,r=lo,Gt=n.stateNode.containerInfo,lo=!0,er(e,t,n),Gt=o,lo=r;break;case 0:case 11:case 14:case 15:if(!an&&(o=n.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){r=o=o.next;do{var i=r,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&Lu(n,t,l),r=r.next}while(r!==o)}er(e,t,n);break;case 1:if(!an&&(Li(n,t),o=n.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=n.memoizedProps,o.state=n.memoizedState,o.componentWillUnmount()}catch(s){Tt(n,t,s)}er(e,t,n);break;case 21:er(e,t,n);break;case 22:n.mode&1?(an=(o=an)||n.memoizedState!==null,er(e,t,n),an=o):er(e,t,n);break;default:er(e,t,n)}}function yp(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new w5),t.forEach(function(o){var r=R5.bind(null,e,o);n.has(o)||(n.add(o),o.then(r,r))})}}function ro(e,t){var n=t.deletions;if(n!==null)for(var o=0;o<n.length;o++){var r=n[o];try{var i=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:Gt=s.stateNode,lo=!1;break e;case 3:Gt=s.stateNode.containerInfo,lo=!0;break e;case 4:Gt=s.stateNode.containerInfo,lo=!0;break e}s=s.return}if(Gt===null)throw Error(X(160));c0(i,l,r),Gt=null,lo=!1;var a=r.alternate;a!==null&&(a.return=null),r.return=null}catch(u){Tt(r,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)d0(t,e),t=t.sibling}function d0(e,t){var n=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ro(t,e),wo(e),o&4){try{zl(3,e,e.return),nc(3,e)}catch(N){Tt(e,e.return,N)}try{zl(5,e,e.return)}catch(N){Tt(e,e.return,N)}}break;case 1:ro(t,e),wo(e),o&512&&n!==null&&Li(n,n.return);break;case 5:if(ro(t,e),wo(e),o&512&&n!==null&&Li(n,n.return),e.flags&32){var r=e.stateNode;try{Wl(r,"")}catch(N){Tt(e,e.return,N)}}if(o&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&$p(r,i),tu(s,l);var u=tu(s,i);for(l=0;l<a.length;l+=2){var p=a[l],f=a[l+1];p==="style"?zp(r,f):p==="dangerouslySetInnerHTML"?Dp(r,f):p==="children"?Wl(r,f):Ou(r,p,f,u)}switch(s){case"input":qd(r,i);break;case"textarea":Tp(r,i);break;case"select":var g=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var C=i.value;C!=null?Ii(r,!!i.multiple,C,!1):g!==!!i.multiple&&(i.defaultValue!=null?Ii(r,!!i.multiple,i.defaultValue,!0):Ii(r,!!i.multiple,i.multiple?[]:"",!1))}r[ql]=i}catch(N){Tt(e,e.return,N)}}break;case 6:if(ro(t,e),wo(e),o&4){if(e.stateNode===null)throw Error(X(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(N){Tt(e,e.return,N)}}break;case 3:if(ro(t,e),wo(e),o&4&&n!==null&&n.memoizedState.isDehydrated)try{Yl(t.containerInfo)}catch(N){Tt(e,e.return,N)}break;case 4:ro(t,e),wo(e);break;case 13:ro(t,e),wo(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(g_=Bt())),o&4&&yp(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(an=(u=an)||p,ro(t,e),an=u):ro(t,e),wo(e),o&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!p&&e.mode&1)for(le=e,p=e.child;p!==null;){for(f=le=p;le!==null;){switch(g=le,C=g.child,g.tag){case 0:case 11:case 14:case 15:zl(4,g,g.return);break;case 1:Li(g,g.return);var b=g.stateNode;if(typeof b.componentWillUnmount=="function"){o=g,n=g.return;try{t=o,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(N){Tt(o,n,N)}}break;case 5:Li(g,g.return);break;case 22:if(g.memoizedState!==null){vp(f);continue}}C!==null?(C.return=g,le=C):vp(f)}p=p.sibling}e:for(p=null,f=e;;){if(f.tag===5){if(p===null){p=f;try{r=f.stateNode,u?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=f.stateNode,a=f.memoizedProps.style,l=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=Bp("display",l))}catch(N){Tt(e,e.return,N)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(N){Tt(e,e.return,N)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ro(t,e),wo(e),o&4&&yp(e);break;case 21:break;default:ro(t,e),wo(e)}}function wo(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(a0(n)){var o=n;break e}n=n.return}throw Error(X(160))}switch(o.tag){case 5:var r=o.stateNode;o.flags&32&&(Wl(r,""),o.flags&=-33);var i=gp(e);Ru(e,i,r);break;case 3:case 4:var l=o.stateNode.containerInfo,s=gp(e);Iu(e,s,l);break;default:throw Error(X(161))}}catch(a){Tt(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function k5(e,t,n){le=e,u0(e,t,n)}function u0(e,t,n){for(var o=(e.mode&1)!==0;le!==null;){var r=le,i=r.child;if(r.tag===22&&o){var l=r.memoizedState!==null||_a;if(!l){var s=r.alternate,a=s!==null&&s.memoizedState!==null||an;s=_a;var u=an;if(_a=l,(an=a)&&!u)for(le=r;le!==null;)l=le,a=l.child,l.tag===22&&l.memoizedState!==null?wp(r):a!==null?(a.return=l,le=a):wp(r);for(;i!==null;)le=i,u0(i,t,n),i=i.sibling;le=r,_a=s,an=u}xp(e,t,n)}else r.subtreeFlags&8772&&i!==null?(i.return=r,le=i):xp(e,t,n)}}function xp(e){for(;le!==null;){var t=le;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:an||nc(5,t);break;case 1:var o=t.stateNode;if(t.flags&4&&!an)if(n===null)o.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:io(t.type,n.memoizedProps);o.componentDidUpdate(r,n.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&op(t,i,o);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}op(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&Yl(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(X(163))}an||t.flags&512&&Nu(t)}catch(g){Tt(t,t.return,g)}}if(t===e){le=null;break}if(n=t.sibling,n!==null){n.return=t.return,le=n;break}le=t.return}}function vp(e){for(;le!==null;){var t=le;if(t===e){le=null;break}var n=t.sibling;if(n!==null){n.return=t.return,le=n;break}le=t.return}}function wp(e){for(;le!==null;){var t=le;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{nc(4,t)}catch(a){Tt(t,n,a)}break;case 1:var o=t.stateNode;if(typeof o.componentDidMount=="function"){var r=t.return;try{o.componentDidMount()}catch(a){Tt(t,r,a)}}var i=t.return;try{Nu(t)}catch(a){Tt(t,i,a)}break;case 5:var l=t.return;try{Nu(t)}catch(a){Tt(t,l,a)}}}catch(a){Tt(t,t.return,a)}if(t===e){le=null;break}var s=t.sibling;if(s!==null){s.return=t.return,le=s;break}le=t.return}}var C5=Math.ceil,Ha=Vo.ReactCurrentDispatcher,p_=Vo.ReactCurrentOwner,Qn=Vo.ReactCurrentBatchConfig,Ge=0,Ut=null,Ot=null,qt=0,Mn=0,Ni=yr(0),jt=0,ns=null,Gr=0,oc=0,m_=0,Ol=null,vn=null,g_=0,ji=1/0,Oo=null,Ua=!1,$u=null,_r=null,fa=!1,lr=null,Ya=0,Al=0,Tu=null,wa=-1,ba=0;function hn(){return Ge&6?Bt():wa!==-1?wa:wa=Bt()}function fr(e){return e.mode&1?Ge&2&&qt!==0?qt&-qt:s5.transition!==null?(ba===0&&(ba=Gp()),ba):(e=ut,e!==0||(e=window.event,e=e===void 0?16:nm(e.type)),e):1}function co(e,t,n,o){if(50<Al)throw Al=0,Tu=null,Error(X(185));os(e,n,o),(!(Ge&2)||e!==Ut)&&(e===Ut&&(!(Ge&2)&&(oc|=n),jt===4&&rr(e,qt)),Cn(e,o),n===1&&Ge===0&&!(t.mode&1)&&(ji=Bt()+500,Za&&xr()))}function Cn(e,t){var n=e.callbackNode;cy(e,t);var o=La(e,e===Ut?qt:0);if(o===0)n!==null&&Nh(n),e.callbackNode=null,e.callbackPriority=0;else if(t=o&-o,e.callbackPriority!==t){if(n!=null&&Nh(n),t===1)e.tag===0?l5(bp.bind(null,e)):wm(bp.bind(null,e)),n5(function(){!(Ge&6)&&xr()}),n=null;else{switch(qp(o)){case 1:n=Hu;break;case 4:n=Vp;break;case 16:n=Ma;break;case 536870912:n=Xp;break;default:n=Ma}n=x0(n,_0.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function _0(e,t){if(wa=-1,ba=0,Ge&6)throw Error(X(327));var n=e.callbackNode;if(Di()&&e.callbackNode!==n)return null;var o=La(e,e===Ut?qt:0);if(o===0)return null;if(o&30||o&e.expiredLanes||t)t=Qa(e,o);else{t=o;var r=Ge;Ge|=2;var i=h0();(Ut!==e||qt!==t)&&(Oo=null,ji=Bt()+500,Ur(e,t));do try{M5();break}catch(s){f0(e,s)}while(!0);n_(),Ha.current=i,Ge=r,Ot!==null?t=0:(Ut=null,qt=0,t=jt)}if(t!==0){if(t===2&&(r=lu(e),r!==0&&(o=r,t=Pu(e,r))),t===1)throw n=ns,Ur(e,0),rr(e,o),Cn(e,Bt()),n;if(t===6)rr(e,o);else{if(r=e.current.alternate,!(o&30)&&!S5(r)&&(t=Qa(e,o),t===2&&(i=lu(e),i!==0&&(o=i,t=Pu(e,i))),t===1))throw n=ns,Ur(e,0),rr(e,o),Cn(e,Bt()),n;switch(e.finishedWork=r,e.finishedLanes=o,t){case 0:case 1:throw Error(X(345));case 2:Fr(e,vn,Oo);break;case 3:if(rr(e,o),(o&130023424)===o&&(t=g_+500-Bt(),10<t)){if(La(e,0)!==0)break;if(r=e.suspendedLanes,(r&o)!==o){hn(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=hu(Fr.bind(null,e,vn,Oo),t);break}Fr(e,vn,Oo);break;case 4:if(rr(e,o),(o&4194240)===o)break;for(t=e.eventTimes,r=-1;0<o;){var l=31-ao(o);i=1<<l,l=t[l],l>r&&(r=l),o&=~i}if(o=r,o=Bt()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*C5(o/1960))-o,10<o){e.timeoutHandle=hu(Fr.bind(null,e,vn,Oo),o);break}Fr(e,vn,Oo);break;case 5:Fr(e,vn,Oo);break;default:throw Error(X(329))}}}return Cn(e,Bt()),e.callbackNode===n?_0.bind(null,e):null}function Pu(e,t){var n=Ol;return e.current.memoizedState.isDehydrated&&(Ur(e,t).flags|=256),e=Qa(e,t),e!==2&&(t=vn,vn=n,t!==null&&Du(t)),e}function Du(e){vn===null?vn=e:vn.push.apply(vn,e)}function S5(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var o=0;o<n.length;o++){var r=n[o],i=r.getSnapshot;r=r.value;try{if(!uo(i(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function rr(e,t){for(t&=~m_,t&=~oc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ao(t),o=1<<n;e[n]=-1,t&=~o}}function bp(e){if(Ge&6)throw Error(X(327));Di();var t=La(e,0);if(!(t&1))return Cn(e,Bt()),null;var n=Qa(e,t);if(e.tag!==0&&n===2){var o=lu(e);o!==0&&(t=o,n=Pu(e,o))}if(n===1)throw n=ns,Ur(e,0),rr(e,t),Cn(e,Bt()),n;if(n===6)throw Error(X(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Fr(e,vn,Oo),Cn(e,Bt()),null}function y_(e,t){var n=Ge;Ge|=1;try{return e(t)}finally{Ge=n,Ge===0&&(ji=Bt()+500,Za&&xr())}}function qr(e){lr!==null&&lr.tag===0&&!(Ge&6)&&Di();var t=Ge;Ge|=1;var n=Qn.transition,o=ut;try{if(Qn.transition=null,ut=1,e)return e()}finally{ut=o,Qn.transition=n,Ge=t,!(Ge&6)&&xr()}}function x_(){Mn=Ni.current,St(Ni)}function Ur(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,t5(n)),Ot!==null)for(n=Ot.return;n!==null;){var o=n;switch(Zu(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&Ta();break;case 3:Fi(),St(bn),St(cn),a_();break;case 5:s_(o);break;case 4:Fi();break;case 13:St(Lt);break;case 19:St(Lt);break;case 10:o_(o.type._context);break;case 22:case 23:x_()}n=n.return}if(Ut=e,Ot=e=hr(e.current,null),qt=Mn=t,jt=0,ns=null,m_=oc=Gr=0,vn=Ol=null,jr!==null){for(t=0;t<jr.length;t++)if(n=jr[t],o=n.interleaved,o!==null){n.interleaved=null;var r=o.next,i=n.pending;if(i!==null){var l=i.next;i.next=r,o.next=l}n.pending=o}jr=null}return e}function f0(e,t){do{var n=Ot;try{if(n_(),ya.current=ja,Wa){for(var o=Nt.memoizedState;o!==null;){var r=o.queue;r!==null&&(r.pending=null),o=o.next}Wa=!1}if(Xr=0,Ht=Wt=Nt=null,Bl=!1,Zl=0,p_.current=null,n===null||n.return===null){jt=1,ns=t,Ot=null;break}e:{var i=e,l=n.return,s=n,a=t;if(t=qt,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,p=s,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var g=p.alternate;g?(p.updateQueue=g.updateQueue,p.memoizedState=g.memoizedState,p.lanes=g.lanes):(p.updateQueue=null,p.memoizedState=null)}var C=cp(l);if(C!==null){C.flags&=-257,dp(C,l,s,i,t),C.mode&1&&ap(i,u,t),t=C,a=u;var b=t.updateQueue;if(b===null){var N=new Set;N.add(a),t.updateQueue=N}else b.add(a);break e}else{if(!(t&1)){ap(i,u,t),v_();break e}a=Error(X(426))}}else if(Mt&&s.mode&1){var E=cp(l);if(E!==null){!(E.flags&65536)&&(E.flags|=256),dp(E,l,s,i,t),e_(Wi(a,s));break e}}i=a=Wi(a,s),jt!==4&&(jt=2),Ol===null?Ol=[i]:Ol.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var y=qm(i,a,t);np(i,y);break e;case 1:s=a;var v=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof v.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(_r===null||!_r.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=Km(i,s,t);np(i,S);break e}}i=i.return}while(i!==null)}m0(n)}catch(j){t=j,Ot===n&&n!==null&&(Ot=n=n.return);continue}break}while(!0)}function h0(){var e=Ha.current;return Ha.current=ja,e===null?ja:e}function v_(){(jt===0||jt===3||jt===2)&&(jt=4),Ut===null||!(Gr&268435455)&&!(oc&268435455)||rr(Ut,qt)}function Qa(e,t){var n=Ge;Ge|=2;var o=h0();(Ut!==e||qt!==t)&&(Oo=null,Ur(e,t));do try{E5();break}catch(r){f0(e,r)}while(!0);if(n_(),Ge=n,Ha.current=o,Ot!==null)throw Error(X(261));return Ut=null,qt=0,jt}function E5(){for(;Ot!==null;)p0(Ot)}function M5(){for(;Ot!==null&&!ey();)p0(Ot)}function p0(e){var t=y0(e.alternate,e,Mn);e.memoizedProps=e.pendingProps,t===null?m0(e):Ot=t,p_.current=null}function m0(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=v5(n,t),n!==null){n.flags&=32767,Ot=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{jt=6,Ot=null;return}}else if(n=x5(n,t,Mn),n!==null){Ot=n;return}if(t=t.sibling,t!==null){Ot=t;return}Ot=t=e}while(t!==null);jt===0&&(jt=5)}function Fr(e,t,n){var o=ut,r=Qn.transition;try{Qn.transition=null,ut=1,L5(e,t,n,o)}finally{Qn.transition=r,ut=o}return null}function L5(e,t,n,o){do Di();while(lr!==null);if(Ge&6)throw Error(X(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(X(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(dy(e,i),e===Ut&&(Ot=Ut=null,qt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||fa||(fa=!0,x0(Ma,function(){return Di(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Qn.transition,Qn.transition=null;var l=ut;ut=1;var s=Ge;Ge|=4,p_.current=null,b5(e,n),d0(n,e),qy(_u),Na=!!uu,_u=uu=null,e.current=n,k5(n,e,r),ty(),Ge=s,ut=l,Qn.transition=i}else e.current=n;if(fa&&(fa=!1,lr=e,Ya=r),i=e.pendingLanes,i===0&&(_r=null),ry(n.stateNode,o),Cn(e,Bt()),t!==null)for(o=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],o(r.value,{componentStack:r.stack,digest:r.digest});if(Ua)throw Ua=!1,e=$u,$u=null,e;return Ya&1&&e.tag!==0&&Di(),i=e.pendingLanes,i&1?e===Tu?Al++:(Al=0,Tu=e):Al=0,xr(),null}function Di(){if(lr!==null){var e=qp(Ya),t=Qn.transition,n=ut;try{if(Qn.transition=null,ut=16>e?16:e,lr===null)var o=!1;else{if(e=lr,lr=null,Ya=0,Ge&6)throw Error(X(331));var r=Ge;for(Ge|=4,le=e.current;le!==null;){var i=le,l=i.child;if(le.flags&16){var s=i.deletions;if(s!==null){for(var a=0;a<s.length;a++){var u=s[a];for(le=u;le!==null;){var p=le;switch(p.tag){case 0:case 11:case 15:zl(8,p,i)}var f=p.child;if(f!==null)f.return=p,le=f;else for(;le!==null;){p=le;var g=p.sibling,C=p.return;if(s0(p),p===u){le=null;break}if(g!==null){g.return=C,le=g;break}le=C}}}var b=i.alternate;if(b!==null){var N=b.child;if(N!==null){b.child=null;do{var E=N.sibling;N.sibling=null,N=E}while(N!==null)}}le=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,le=l;else e:for(;le!==null;){if(i=le,i.flags&2048)switch(i.tag){case 0:case 11:case 15:zl(9,i,i.return)}var y=i.sibling;if(y!==null){y.return=i.return,le=y;break e}le=i.return}}var v=e.current;for(le=v;le!==null;){l=le;var h=l.child;if(l.subtreeFlags&2064&&h!==null)h.return=l,le=h;else e:for(l=v;le!==null;){if(s=le,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:nc(9,s)}}catch(j){Tt(s,s.return,j)}if(s===l){le=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,le=S;break e}le=s.return}}if(Ge=r,xr(),Co&&typeof Co.onPostCommitFiberRoot=="function")try{Co.onPostCommitFiberRoot(Xa,e)}catch{}o=!0}return o}finally{ut=n,Qn.transition=t}}return!1}function kp(e,t,n){t=Wi(n,t),t=qm(e,t,1),e=ur(e,t,1),t=hn(),e!==null&&(os(e,1,t),Cn(e,t))}function Tt(e,t,n){if(e.tag===3)kp(e,e,n);else for(;t!==null;){if(t.tag===3){kp(t,e,n);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(_r===null||!_r.has(o))){e=Wi(n,e),e=Km(t,e,1),t=ur(t,e,1),e=hn(),t!==null&&(os(t,1,e),Cn(t,e));break}}t=t.return}}function N5(e,t,n){var o=e.pingCache;o!==null&&o.delete(t),t=hn(),e.pingedLanes|=e.suspendedLanes&n,Ut===e&&(qt&n)===n&&(jt===4||jt===3&&(qt&130023424)===qt&&500>Bt()-g_?Ur(e,0):m_|=n),Cn(e,t)}function g0(e,t){t===0&&(e.mode&1?(t=Zs,Zs<<=1,!(Zs&130023424)&&(Zs=4194304)):t=1);var n=hn();e=Yo(e,t),e!==null&&(os(e,t,n),Cn(e,n))}function I5(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),g0(e,n)}function R5(e,t){var n=0;switch(e.tag){case 13:var o=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:o=e.stateNode;break;default:throw Error(X(314))}o!==null&&o.delete(t),g0(e,n)}var y0;y0=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||bn.current)wn=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return wn=!1,y5(e,t,n);wn=!!(e.flags&131072)}else wn=!1,Mt&&t.flags&1048576&&bm(t,Ba,t.index);switch(t.lanes=0,t.tag){case 2:var o=t.type;va(e,t),e=t.pendingProps;var r=zi(t,cn.current);Pi(t,n),r=d_(null,t,o,e,r,n);var i=u_();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,kn(o)?(i=!0,Pa(t)):i=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,i_(t),r.updater=tc,t.stateNode=r,r._reactInternals=t,wu(t,o,e,n),t=Cu(null,t,o,!0,i,n)):(t.tag=0,Mt&&i&&Ju(t),fn(null,t,r,n),t=t.child),t;case 16:o=t.elementType;e:{switch(va(e,t),e=t.pendingProps,r=o._init,o=r(o._payload),t.type=o,r=t.tag=T5(o),e=io(o,e),r){case 0:t=ku(null,t,o,e,n);break e;case 1:t=fp(null,t,o,e,n);break e;case 11:t=up(null,t,o,e,n);break e;case 14:t=_p(null,t,o,io(o.type,e),n);break e}throw Error(X(306,o,""))}return t;case 0:return o=t.type,r=t.pendingProps,r=t.elementType===o?r:io(o,r),ku(e,t,o,r,n);case 1:return o=t.type,r=t.pendingProps,r=t.elementType===o?r:io(o,r),fp(e,t,o,r,n);case 3:e:{if(t0(t),e===null)throw Error(X(387));o=t.pendingProps,i=t.memoizedState,r=i.element,Lm(e,t),Aa(t,o,null,n);var l=t.memoizedState;if(o=l.element,i.isDehydrated)if(i={element:o,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){r=Wi(Error(X(423)),t),t=hp(e,t,o,n,r);break e}else if(o!==r){r=Wi(Error(X(424)),t),t=hp(e,t,o,n,r);break e}else for(Ln=dr(t.stateNode.containerInfo.firstChild),Nn=t,Mt=!0,so=null,n=Em(t,null,o,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Oi(),o===r){t=Qo(e,t,n);break e}fn(e,t,o,n)}t=t.child}return t;case 5:return Nm(t),e===null&&yu(t),o=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,l=r.children,fu(o,r)?l=null:i!==null&&fu(o,i)&&(t.flags|=32),e0(e,t),fn(e,t,l,n),t.child;case 6:return e===null&&yu(t),null;case 13:return n0(e,t,n);case 4:return l_(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Ai(t,null,o,n):fn(e,t,o,n),t.child;case 11:return o=t.type,r=t.pendingProps,r=t.elementType===o?r:io(o,r),up(e,t,o,r,n);case 7:return fn(e,t,t.pendingProps,n),t.child;case 8:return fn(e,t,t.pendingProps.children,n),t.child;case 12:return fn(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(o=t.type._context,r=t.pendingProps,i=t.memoizedProps,l=r.value,wt(za,o._currentValue),o._currentValue=l,i!==null)if(uo(i.value,l)){if(i.children===r.children&&!bn.current){t=Qo(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){l=i.child;for(var a=s.firstContext;a!==null;){if(a.context===o){if(i.tag===1){a=jo(-1,n&-n),a.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?a.next=a:(a.next=p.next,p.next=a),u.pending=a}}i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),xu(i.return,n,t),s.lanes|=n;break}a=a.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(X(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),xu(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}fn(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,o=t.pendingProps.children,Pi(t,n),r=Vn(r),o=o(r),t.flags|=1,fn(e,t,o,n),t.child;case 14:return o=t.type,r=io(o,t.pendingProps),r=io(o.type,r),_p(e,t,o,r,n);case 15:return Jm(e,t,t.type,t.pendingProps,n);case 17:return o=t.type,r=t.pendingProps,r=t.elementType===o?r:io(o,r),va(e,t),t.tag=1,kn(o)?(e=!0,Pa(t)):e=!1,Pi(t,n),Gm(t,o,r),wu(t,o,r,n),Cu(null,t,o,!0,e,n);case 19:return o0(e,t,n);case 22:return Zm(e,t,n)}throw Error(X(156,t.tag))};function x0(e,t){return Qp(e,t)}function $5(e,t,n,o){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(e,t,n,o){return new $5(e,t,n,o)}function w_(e){return e=e.prototype,!(!e||!e.isReactComponent)}function T5(e){if(typeof e=="function")return w_(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Fu)return 11;if(e===Wu)return 14}return 2}function hr(e,t){var n=e.alternate;return n===null?(n=Yn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ka(e,t,n,o,r,i){var l=2;if(o=e,typeof e=="function")w_(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case xi:return Yr(n.children,r,i,t);case Au:l=8,r|=8;break;case Yd:return e=Yn(12,n,t,r|2),e.elementType=Yd,e.lanes=i,e;case Qd:return e=Yn(13,n,t,r),e.elementType=Qd,e.lanes=i,e;case Vd:return e=Yn(19,n,t,r),e.elementType=Vd,e.lanes=i,e;case Np:return rc(n,r,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mp:l=10;break e;case Lp:l=9;break e;case Fu:l=11;break e;case Wu:l=14;break e;case tr:l=16,o=null;break e}throw Error(X(130,e==null?e:typeof e,""))}return t=Yn(l,n,t,r),t.elementType=e,t.type=o,t.lanes=i,t}function Yr(e,t,n,o){return e=Yn(7,e,o,t),e.lanes=n,e}function rc(e,t,n,o){return e=Yn(22,e,o,t),e.elementType=Np,e.lanes=n,e.stateNode={isHidden:!1},e}function jd(e,t,n){return e=Yn(6,e,null,t),e.lanes=n,e}function Hd(e,t,n){return t=Yn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function P5(e,t,n,o,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ed(0),this.expirationTimes=Ed(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ed(0),this.identifierPrefix=o,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function b_(e,t,n,o,r,i,l,s,a){return e=new P5(e,t,n,s,a),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Yn(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:o,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},i_(i),e}function D5(e,t,n){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yi,key:o==null?null:""+o,children:e,containerInfo:t,implementation:n}}function v0(e){if(!e)return mr;e=e._reactInternals;e:{if(Jr(e)!==e||e.tag!==1)throw Error(X(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(kn(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(X(171))}if(e.tag===1){var n=e.type;if(kn(n))return vm(e,n,t)}return t}function w0(e,t,n,o,r,i,l,s,a){return e=b_(n,o,!0,e,r,i,l,s,a),e.context=v0(null),n=e.current,o=hn(),r=fr(n),i=jo(o,r),i.callback=t??null,ur(n,i,r),e.current.lanes=r,os(e,r,o),Cn(e,o),e}function ic(e,t,n,o){var r=t.current,i=hn(),l=fr(r);return n=v0(n),t.context===null?t.context=n:t.pendingContext=n,t=jo(i,l),t.payload={element:e},o=o===void 0?null:o,o!==null&&(t.callback=o),e=ur(r,t,l),e!==null&&(co(e,r,l,i),ga(e,r,l)),l}function Va(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Cp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function k_(e,t){Cp(e,t),(e=e.alternate)&&Cp(e,t)}function B5(){return null}var b0=typeof reportError=="function"?reportError:function(e){console.error(e)};function C_(e){this._internalRoot=e}lc.prototype.render=C_.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(X(409));ic(e,t,null,null)};lc.prototype.unmount=C_.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qr(function(){ic(null,e,null,null)}),t[Uo]=null}};function lc(e){this._internalRoot=e}lc.prototype.unstable_scheduleHydration=function(e){if(e){var t=Zp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<or.length&&t!==0&&t<or[n].priority;n++);or.splice(n,0,e),n===0&&tm(e)}};function S_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function sc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Sp(){}function z5(e,t,n,o,r){if(r){if(typeof o=="function"){var i=o;o=function(){var u=Va(l);i.call(u)}}var l=w0(t,o,e,0,null,!1,!1,"",Sp);return e._reactRootContainer=l,e[Uo]=l.current,Xl(e.nodeType===8?e.parentNode:e),qr(),l}for(;r=e.lastChild;)e.removeChild(r);if(typeof o=="function"){var s=o;o=function(){var u=Va(a);s.call(u)}}var a=b_(e,0,!1,null,null,!1,!1,"",Sp);return e._reactRootContainer=a,e[Uo]=a.current,Xl(e.nodeType===8?e.parentNode:e),qr(function(){ic(t,a,n,o)}),a}function ac(e,t,n,o,r){var i=n._reactRootContainer;if(i){var l=i;if(typeof r=="function"){var s=r;r=function(){var a=Va(l);s.call(a)}}ic(t,l,e,r)}else l=z5(n,t,e,r,o);return Va(l)}Kp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Nl(t.pendingLanes);n!==0&&(Uu(t,n|1),Cn(t,Bt()),!(Ge&6)&&(ji=Bt()+500,xr()))}break;case 13:qr(function(){var o=Yo(e,1);if(o!==null){var r=hn();co(o,e,1,r)}}),k_(e,1)}};Yu=function(e){if(e.tag===13){var t=Yo(e,134217728);if(t!==null){var n=hn();co(t,e,134217728,n)}k_(e,134217728)}};Jp=function(e){if(e.tag===13){var t=fr(e),n=Yo(e,t);if(n!==null){var o=hn();co(n,e,t,o)}k_(e,t)}};Zp=function(){return ut};em=function(e,t){var n=ut;try{return ut=e,t()}finally{ut=n}};ou=function(e,t,n){switch(t){case"input":if(qd(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var o=n[t];if(o!==e&&o.form===e.form){var r=Ja(o);if(!r)throw Error(X(90));Rp(o),qd(o,r)}}}break;case"textarea":Tp(e,n);break;case"select":t=n.value,t!=null&&Ii(e,!!n.multiple,t,!1)}};Fp=y_;Wp=qr;var O5={usingClientEntryPoint:!1,Events:[is,ki,Ja,Op,Ap,y_]},Sl={findFiberByHostInstance:Wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},A5={bundleType:Sl.bundleType,version:Sl.version,rendererPackageName:Sl.rendererPackageName,rendererConfig:Sl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vo.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Up(e),e===null?null:e.stateNode},findFiberByHostInstance:Sl.findFiberByHostInstance||B5,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(El=__REACT_DEVTOOLS_GLOBAL_HOOK__,!El.isDisabled&&El.supportsFiber))try{Xa=El.inject(A5),Co=El}catch{}var El;$n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O5;$n.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!S_(t))throw Error(X(200));return D5(e,t,null,n)};$n.createRoot=function(e,t){if(!S_(e))throw Error(X(299));var n=!1,o="",r=b0;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=b_(e,1,!1,null,null,n,!1,o,r),e[Uo]=t.current,Xl(e.nodeType===8?e.parentNode:e),new C_(t)};$n.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(X(188)):(e=Object.keys(e).join(","),Error(X(268,e)));return e=Up(t),e=e===null?null:e.stateNode,e};$n.flushSync=function(e){return qr(e)};$n.hydrate=function(e,t,n){if(!sc(t))throw Error(X(200));return ac(null,e,t,!0,n)};$n.hydrateRoot=function(e,t,n){if(!S_(e))throw Error(X(405));var o=n!=null&&n.hydratedSources||null,r=!1,i="",l=b0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=w0(t,null,e,1,n??null,r,!1,i,l),e[Uo]=t.current,Xl(e),o)for(e=0;e<o.length;e++)n=o[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new lc(t)};$n.render=function(e,t,n){if(!sc(t))throw Error(X(200));return ac(null,e,t,!1,n)};$n.unmountComponentAtNode=function(e){if(!sc(e))throw Error(X(40));return e._reactRootContainer?(qr(function(){ac(null,null,e,!1,function(){e._reactRootContainer=null,e[Uo]=null})}),!0):!1};$n.unstable_batchedUpdates=y_;$n.unstable_renderSubtreeIntoContainer=function(e,t,n,o){if(!sc(n))throw Error(X(200));if(e==null||e._reactInternals===void 0)throw Error(X(38));return ac(e,t,n,!1,o)};$n.version="18.3.1-next-f1338f8080-20240426"});var ss=zo((Fw,S0)=>{"use strict";function C0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0)}catch(e){console.error(e)}}C0(),S0.exports=k0()});var M0=zo(E_=>{"use strict";var E0=ss();E_.createRoot=E0.createRoot,E_.hydrateRoot=E0.hydrateRoot;var Ww});var N0=zo(cc=>{"use strict";var F5=Et(),W5=Symbol.for("react.element"),j5=Symbol.for("react.fragment"),H5=Object.prototype.hasOwnProperty,U5=F5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Y5={key:!0,ref:!0,__self:!0,__source:!0};function L0(e,t,n){var o,r={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(o in t)H5.call(t,o)&&!Y5.hasOwnProperty(o)&&(r[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)r[o]===void 0&&(r[o]=t[o]);return{$$typeof:W5,type:e,key:i,ref:l,props:r,_owner:U5.current}}cc.Fragment=j5;cc.jsx=L0;cc.jsxs=L0});var Pt=zo((Uw,I0)=>{"use strict";I0.exports=N0()});var Ug=Ee(M0());var Nc=Ee(Et(),1),k=Ee(Et(),1),Rc=Ee(Et(),1),yg=Ee(ss(),1),Ji=Ee(Et(),1),Zi=Ee(Et(),1),xg=Ee(ss(),1),vg=Ee(Pt(),1),Yt=Ee(Et(),1),gs=Ee(Et(),1),bg=Ee(Et(),1),dn=Ee(Et(),1),qe=Ee(Pt(),1),F_=Ee(Pt(),1),ne=Ee(Pt(),1),Mo=Ee(Et(),1),Sg=Ee(ss(),1),ni=Ee(Pt(),1),W_=Ee(Pt(),1),ti=Ee(Pt(),1),rt=Ee(Et(),1),d=Ee(Pt(),1),gt=Ee(Pt(),1),Qt=Ee(Et(),1),kr=Ee(Et(),1),c=Ee(Pt(),1),Ce=Ee(Et(),1),Ye=Ee(Pt(),1),Hv=Ee(Et(),1),Sn=Ee(Et(),1),X_=Ee(Pt(),1),Gn=Ee(Et(),1),Eo=Ee(Pt(),1),br=Ee(Et(),1),xs=Ee(Pt(),1),Ag=Ee(Et(),1),Xi=Ee(Pt(),1),Gi=Ee(Pt(),1),re=Ee(Pt(),1),Tc=Ee(Et(),1),vs=Ee(Pt(),1),U=Ee(Pt(),1),Fg=Ee(Et(),1),dg=["data-feedback-toolbar","data-annotation-popup","data-annotation-marker"],M_=dg.flatMap(e=>[`:not([${e}])`,`:not([${e}] *)`]).join(""),O_="feedback-freeze-styles",A_="__agentation_freeze";function Q5(){return typeof window>"u"?{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:t=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}:window[A_]??{frozen:!1,installed:!1,origSetTimeout:window.setTimeout.bind(window),origSetInterval:window.setInterval.bind(window),origRAF:window.requestAnimationFrame.bind(window),pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}}var He=Q5();function ug(){if(typeof window>"u")return;let e=window;He=e[A_]??(e[A_]=He),!He.installed&&(window.setTimeout=(t,n,...o)=>typeof t=="string"?He.origSetTimeout(t,n):He.origSetTimeout((...r)=>{He.frozen?He.frozenTimeoutQueue.push(()=>t(...r)):t(...r)},n,...o),window.setInterval=(t,n,...o)=>typeof t=="string"?He.origSetInterval(t,n):He.origSetInterval((...r)=>{He.frozen||t(...r)},n,...o),window.requestAnimationFrame=t=>He.origRAF(n=>{He.frozen?He.frozenRAFQueue.push(t):t(n)}),He.installed=!0)}var ot=He.origSetTimeout,_g=He.origSetInterval,Mc=He.origRAF;function V5(e){return e?dg.some(t=>!!e.closest?.(`[${t}]`)):!1}function X5(){if(typeof document>"u"||(ug(),He.frozen))return;He.frozen=!0,He.frozenTimeoutQueue=[],He.frozenRAFQueue=[];let e=document.getElementById(O_);e||(e=document.createElement("style"),e.id=O_),e.textContent=`
    *${M_},
    *${M_}::before,
    *${M_}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `,document.head.appendChild(e),He.pausedAnimations=[];try{document.getAnimations().forEach(t=>{if(t.playState!=="running")return;let n=t.effect?.target;V5(n)||(t.pause(),He.pausedAnimations.push(t))})}catch{}document.querySelectorAll("video").forEach(t=>{t.paused||(t.dataset.wasPaused="false",t.pause())})}function R0(){if(typeof document>"u"||!He.frozen)return;He.frozen=!1;let e=He.frozenTimeoutQueue;He.frozenTimeoutQueue=[];for(let n of e)He.origSetTimeout(()=>{if(He.frozen){He.frozenTimeoutQueue.push(n);return}try{n()}catch(o){console.warn("[agentation] Error replaying queued timeout:",o)}},0);let t=He.frozenRAFQueue;He.frozenRAFQueue=[];for(let n of t)He.origRAF(o=>{if(He.frozen){He.frozenRAFQueue.push(n);return}n(o)});for(let n of He.pausedAnimations)try{n.play()}catch(o){console.warn("[agentation] Error resuming animation:",o)}He.pausedAnimations=[],document.getElementById(O_)?.remove(),document.querySelectorAll("video").forEach(n=>{n.dataset.wasPaused==="false"&&(n.play().catch(()=>{}),delete n.dataset.wasPaused)})}function $0(){let e=(0,Nc.useMemo)(()=>{let t=0,n=new Set,o=()=>(n.forEach(clearTimeout),n.clear(),++t),r=l=>l===t;return{start:o,isCurrent:r,schedule:(l,s,a)=>{if(!r(l))return;let u=ot(()=>{n.delete(u),r(l)&&s()},a);n.add(u)}}},[]);return(0,Nc.useEffect)(()=>()=>{e.start()},[e]),e}function G5(e,t,n,o){let r=u=>o.get(u.id)??u.id,i=new Map(e.map(u=>[r(u),u])),l=new Map(t.map(u=>[r(u),u])),s=new Set(n.map(u=>u.id)),a=[];for(let u of n){let p=i.get(u.id),f=l.get(u.id);if(p&&!f)continue;let g=f&&p&&f.comment!==p.comment;a.push(g?{...u,comment:f.comment}:u)}for(let[u,p]of l)!i.has(u)&&!s.has(u)&&a.push(p);return a}function ws(e){if(e.tagName!=="IFRAME")return null;try{return e.contentDocument}catch{return null}}function Tn(e,t=document){if(e===t)return null;try{return e.defaultView?.frameElement}catch{return null}}function G_(e){return e.nodeType===11&&"host"in e}function Ki(e){let t=e.getBoundingClientRect(),n=e.offsetWidth?t.width/e.offsetWidth:1,o=e.offsetHeight?t.height/e.offsetHeight:1,r=e.ownerDocument.defaultView?.getComputedStyle(e),i=p=>parseFloat(p||"0")||0,l=i(r?.paddingLeft),s=i(r?.paddingTop),a=e.clientWidth-l-i(r?.paddingRight),u=e.clientHeight-s-i(r?.paddingBottom);return{x:t.left+(e.clientLeft+l)*n,y:t.top+(e.clientTop+s)*o,sx:n,sy:o,width:a*n,height:u*o}}function T0(e){try{let t=new URL(e);return t.origin+t.pathname}catch{return e}}function q5(e,t,n,o=document){let r=Tn(e,o);for(;r;){let i=Ki(r);t=i.x+t*i.sx,n=i.y+n*i.sy,r=Tn(r.ownerDocument,o)}return{x:t,y:n}}function At(e,t=document){let n=e.getBoundingClientRect();return fg(e.ownerDocument,n,t)}function fg(e,t,n){if(!Tn(e,n))return t;let o=t.left,r=t.top,i=t.right,l=t.bottom,s=Tn(e,n);for(;s;){let a=Ki(s);o=Math.max(a.x,a.x+o*a.sx),r=Math.max(a.y,a.y+r*a.sy),i=Math.min(a.x+a.width,a.x+i*a.sx),l=Math.min(a.y+a.height,a.y+l*a.sy),s=Tn(s.ownerDocument,n)}return new DOMRect(o,r,Math.max(0,i-o),Math.max(0,l-r))}function Ic(e){let t=[];for(let n of e.querySelectorAll("*"))n.tagName==="IFRAME"&&t.push(n),n.shadowRoot&&n.tagName!=="AGENTATION-TOOLBAR"&&t.push(...Ic(n.shadowRoot));return t}function K5(e,t,n,o=document){let r=[];for(let f=Tn(e.ownerDocument,o);f;f=Tn(f.ownerDocument,o))r.unshift(f);if(!r.length)return;let i=r.map(f=>{let g=Ki(f);return t=(t-g.x)/g.sx,n=(n-g.y)/g.sy,{index:Ic(f.ownerDocument).indexOf(f),id:f.id||void 0,url:ws(f)?.URL??""}}),l=e.ownerDocument.defaultView,s=!1;for(let f=e;f;f=f.parentElement)if(["fixed","sticky"].includes(l.getComputedStyle(f).position)){s=!0;break}let a=s?0:l.scrollX,u=s?0:l.scrollY,p=e.getBoundingClientRect();return{path:i,x:t+a,y:n+u,fixed:s,boundingBox:{x:p.left+a,y:p.top+u,width:p.width,height:p.height}}}function J5(e=document){let t=new Map,n=o=>{let r=t.get(o);return r||(r=Ic(o),t.set(o,r)),r};return o=>Z5(o,e,n)}function Z5(e,t=document,n=Ic){let o=e.frame;if(!o)return e;let r=t;for(let C of o.path){let b=n(r),N=C.id?b.find(y=>y.id===C.id):b[C.index],E=N&&ws(N);if(!E||T0(E.URL)!==T0(C.url))return null;r=E}let i=r.defaultView,l=o.fixed?0:i.scrollX,s=o.fixed?0:i.scrollY,a=o.x-l,u=o.y-s;for(let C=r,b=Tn(r,t);b;b=Tn(C,t)){let N=C.defaultView;if(a<0||u<0||a>N.innerWidth||u>N.innerHeight)return null;let E=Ki(b);if(E.width<=0||E.height<=0)return null;a=E.x+a*E.sx,u=E.y+u*E.sy,C=b.ownerDocument}let p=o.boundingBox,f=fg(r,new DOMRect(p.x-l,p.y-s,p.width,p.height),t),g=t.defaultView;return{...e,x:a/g.innerWidth*100,y:u+(e.isFixed?0:g.scrollY),boundingBox:{x:f.x,y:f.y+(e.isFixed?0:g.scrollY),width:f.width,height:f.height}}}function e2(e,t,n){if(!("clientX"in e)||t===n)return e;let o=q5(t,e.clientX,e.clientY,n);return new Proxy(e,{get(r,i){if(i==="clientX")return o.x;if(i==="clientY")return o.y;let l=Reflect.get(r,i,r);return typeof l=="function"?l.bind(r):l}})}function t2(e,t){let n=new Set([e]),o=new Set,r=[],i=new Set,l=!1,s=!1,a,u=(f,g)=>{let C=b=>f.listener(e2(b,g,e));f.handlers.set(g,C),g.addEventListener(f.type,C,f.options)},p=()=>{if(l=!1,!s)return;let f=new Set,g=new Set,C=[],b=N=>{C.push(N);for(let E of N.querySelectorAll("*"))if(!E.matches("agentation-toolbar, [data-agentation-portal]")&&(E.shadowRoot&&b(E.shadowRoot),E.tagName==="IFRAME")){g.add(E);let y=ws(E);y&&!f.has(y)&&(f.add(y),b(y))}};f.add(e),b(e);for(let N of n)if(!f.has(N)){for(let E of o){let y=E.handlers.get(N);y&&N.removeEventListener(E.type,y,E.options),E.handlers.delete(N)}n.delete(N)}for(let N of f)if(!n.has(N)){n.add(N);for(let E of o)u(E,N)}for(let N of i)g.has(N)||N.removeEventListener("load",p);for(let N of g)i.has(N)||N.addEventListener("load",p);i=g,a?.disconnect(),i.forEach(N=>a?.observe(N)),r.forEach(N=>N.disconnect()),r=C.map(N=>{let E=new MutationObserver(y=>{y.some(h=>[...h.addedNodes,...h.removedNodes].some(S=>S.nodeType===1&&!S.closest("agentation-toolbar, [data-agentation-portal]")&&(S.tagName==="IFRAME"||!!S.shadowRoot||!!S.querySelector("iframe"))))&&!l&&(l=!0,queueMicrotask(p))});return E.observe(N,{childList:!0,subtree:!0}),E}),t?.()};return{start(){s||(s=!0,typeof ResizeObserver=="function"&&(a=new ResizeObserver(()=>t?.())),p())},stop(){s=!1,a?.disconnect(),a=void 0,r.forEach(f=>f.disconnect()),r=[];for(let f of i)f.removeEventListener("load",p);i.clear();for(let f of o)for(let[g,C]of f.handlers)g.removeEventListener(f.type,C,f.options);o.clear(),n.clear(),n.add(e)},addEventListener(f,g,C){let b={type:f,listener:g,options:C,handlers:new Map};o.add(b);for(let N of n)u(b,N)},removeEventListener(f,g,C){for(let b of o)if(b.type===f&&b.listener===g){for(let[N,E]of b.handlers)N.removeEventListener(f,E,b.options);o.delete(b)}},querySelectorAll(f){return[...n].flatMap(g=>[...g.querySelectorAll(f)])}}}var q_=["data-testid","data-test","data-qa","data-cy","data-component"];function hs(e,t=q_){let n={};for(let o of[...new Set(t)].slice(0,16)){if(!/^[a-zA-Z_][\w:.-]*$/.test(o))continue;let r=e.getAttribute(o);r!=null&&r.length<=500&&Object.defineProperty(n,o,{value:r,enumerable:!0})}return n}function n2(e,t=q_){return Object.entries(hs(e,t)).filter(([n,o])=>/^data-[a-z0-9_-]+$/.test(n)&&o.length<=120).slice(0,2).map(([n,o])=>`[${n}="${o.replace(/[\\"\n\r\f\0]/g,r=>r==="\\"||r==='"'?`\\${r}`:`\\${r.charCodeAt(0).toString(16)} `)}"]`).join("")}function qi(e){if(e.parentElement)return e.parentElement;let t=e.getRootNode();return G_(t)?t.host:null}function Zt(e,t){let n=e;for(;n;){if(n.matches(t))return n;n=qi(n)}return null}function hg(e,t=4,n){let o=[],r=e,i=0;for(;r&&i<t;){let s=r.tagName.toLowerCase();if(s==="html"||s==="body"){o.length===0&&o.push(s);break}let a=s;if(r.id)a=`#${r.id}`;else if(r.className&&typeof r.className=="string"){let p=r.className.split(/\s+/).find(f=>f.length>2&&!f.match(/^[a-z]{1,2}$/)&&!f.match(/[A-Z0-9]{5,}/));p&&(a=`.${p.split("_")[0]}`)}a+=n2(r,n);let u=qi(r);!r.parentElement&&u&&(a=`\u27E8shadow\u27E9 ${a}`),o.unshift(a),r=u,i++}let l=Tn(e.ownerDocument);return(l?hg(l,2)+" > \u27E8iframe\u27E9 ":"")+o.join(" > ")}function o2(e){let t="";for(let n of e.childNodes)if(n.nodeType===Node.TEXT_NODE){let o=n.textContent?.trim();o&&(t+=(t?" ":"")+o)}return t}function Vi(e,t){let n=hg(e,4,t);if(e.dataset.element)return{name:e.dataset.element,path:n};let o=e.tagName.toLowerCase();if(["path","circle","rect","line","g"].includes(o)){let r=Zt(e,"svg");if(r){let i=qi(r);if(i?.namespaceURI==="http://www.w3.org/1999/xhtml")return{name:`graphic in ${Vi(i).name}`,path:n}}return{name:"graphic element",path:n}}if(o==="svg"){let r=qi(e);if(r?.tagName.toLowerCase()==="button"){let i=r.textContent?.trim();return{name:i?`icon in "${i}" button`:"button icon",path:n}}return{name:"icon",path:n}}if(o==="button"){let r=e.textContent?.trim(),i=e.getAttribute("aria-label");return i?{name:`button [${i}]`,path:n}:{name:r?`button "${r.slice(0,25)}"`:"button",path:n}}if(o==="a"){let r=e.textContent?.trim(),i=e.getAttribute("href");return r?{name:`link "${r.slice(0,25)}"`,path:n}:i?{name:`link to ${i.slice(0,30)}`,path:n}:{name:"link",path:n}}if(o==="input"){let r=e.getAttribute("type")||"text",i=e.getAttribute("placeholder"),l=e.getAttribute("name");return i?{name:`input "${i}"`,path:n}:l?{name:`input [${l}]`,path:n}:{name:`${r} input`,path:n}}if(["h1","h2","h3","h4","h5","h6"].includes(o)){let r=e.textContent?.trim();return{name:r?`${o} "${r.slice(0,35)}"`:o,path:n}}if(o==="p"){let r=e.textContent?.trim();return r?{name:`paragraph: "${r.slice(0,40)}${r.length>40?"...":""}"`,path:n}:{name:"paragraph",path:n}}if(o==="span"||o==="label"){let r=e.textContent?.trim();return r&&r.length<40?{name:`"${r}"`,path:n}:{name:o,path:n}}if(o==="li"){let r=e.textContent?.trim();return r&&r.length<40?{name:`list item: "${r.slice(0,35)}"`,path:n}:{name:"list item",path:n}}if(o==="blockquote")return{name:"blockquote",path:n};if(o==="code"){let r=e.textContent?.trim();return r&&r.length<30?{name:`code: \`${r}\``,path:n}:{name:"code",path:n}}if(o==="pre")return{name:"code block",path:n};if(o==="img"){let r=e.getAttribute("alt");return{name:r?`image "${r.slice(0,30)}"`:"image",path:n}}if(o==="video")return{name:"video",path:n};if(["div","section","article","nav","header","footer","aside","main"].includes(o)){let r=e.className,i=e.getAttribute("role"),l=e.getAttribute("aria-label");if(l)return{name:`${o} [${l}]`,path:n};if(i)return{name:`${i}`,path:n};let s=o2(e);if(s&&s.length<50)return{name:`"${s}"`,path:n};if(typeof r=="string"&&r){let a=r.split(/[\s_-]+/).map(u=>u.replace(/[A-Z0-9]{5,}.*$/,"")).filter(u=>u.length>2&&!/^[a-z]{1,2}$/.test(u)).slice(0,2);if(a.length>0)return{name:a.join(" "),path:n}}return{name:o==="div"?"container":o,path:n}}return{name:o,path:n}}function as(e){let t=[],n=e.textContent?.trim();n&&n.length<100&&t.push(n);let o=e.previousElementSibling;if(o){let i=o.textContent?.trim();i&&i.length<50&&t.unshift(`[before: "${i.slice(0,40)}"]`)}let r=e.nextElementSibling;if(r){let i=r.textContent?.trim();i&&i.length<50&&t.push(`[after: "${i.slice(0,40)}"]`)}return t.join(" ")}function dc(e){let t=qi(e);if(!t)return"";let n=e.getRootNode(),r=(G_(n)&&e.parentElement?Array.from(e.parentElement.children):Array.from(t.children)).filter(p=>p!==e&&p.namespaceURI==="http://www.w3.org/1999/xhtml");if(r.length===0)return"";let i=r.slice(0,4).map(p=>{let f=p.tagName.toLowerCase(),g=p.className,C="";if(typeof g=="string"&&g){let b=g.split(/\s+/).map(N=>N.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(N=>N.length>2&&!/^[a-z]{1,2}$/.test(N));b&&(C=`.${b}`)}if(f==="button"||f==="a"){let b=p.textContent?.trim().slice(0,15);if(b)return`${f}${C} "${b}"`}return`${f}${C}`}),s=t.tagName.toLowerCase();if(typeof t.className=="string"&&t.className){let p=t.className.split(/\s+/).map(f=>f.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(f=>f.length>2&&!/^[a-z]{1,2}$/.test(f));p&&(s=`.${p}`)}let a=t.children.length,u=a>i.length+1?` (${a} total in ${s})`:"";return i.join(", ")+u}function cs(e){let t=e.className;return typeof t!="string"||!t?"":t.split(/\s+/).filter(o=>o.length>0).map(o=>{let r=o.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);return r?r[1]:o}).filter((o,r,i)=>i.indexOf(o)===r).join(", ")}var pg=new Set(["none","normal","auto","0px","rgba(0, 0, 0, 0)","transparent","static","visible"]),r2=new Set(["p","span","h1","h2","h3","h4","h5","h6","label","li","td","th","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","a","time","cite","q"]),i2=new Set(["input","textarea","select"]),l2=new Set(["img","video","canvas","svg"]),s2=new Set(["div","section","article","nav","header","footer","aside","main","ul","ol","form","fieldset"]);function uc(e){if(typeof window>"u")return{};let t=(e.ownerDocument.defaultView??window).getComputedStyle(e),n={},o=e.tagName.toLowerCase(),r;r2.has(o)?r=["color","fontSize","fontWeight","fontFamily","lineHeight"]:o==="button"||o==="a"&&e.getAttribute("role")==="button"?r=["backgroundColor","color","padding","borderRadius","fontSize"]:i2.has(o)?r=["backgroundColor","color","padding","borderRadius","fontSize"]:l2.has(o)?r=["width","height","objectFit","borderRadius"]:s2.has(o)?r=["display","padding","margin","gap","backgroundColor"]:r=["color","fontSize","margin","padding","backgroundColor"];for(let i of r){let l=i.replace(/([A-Z])/g,"-$1").toLowerCase(),s=t.getPropertyValue(l);s&&!pg.has(s)&&(n[i]=s)}return n}var a2=["color","backgroundColor","borderColor","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textAlign","width","height","padding","margin","border","borderRadius","display","position","top","right","bottom","left","zIndex","flexDirection","justifyContent","alignItems","gap","opacity","visibility","overflow","boxShadow","transform"];function _c(e){if(typeof window>"u")return"";let t=(e.ownerDocument.defaultView??window).getComputedStyle(e),n=[];for(let o of a2){let r=o.replace(/([A-Z])/g,"-$1").toLowerCase(),i=t.getPropertyValue(r);i&&!pg.has(i)&&n.push(`${r}: ${i}`)}return n.join("; ")}function c2(e){if(!e)return;let t={},n=e.split(";").map(o=>o.trim()).filter(Boolean);for(let o of n){let r=o.indexOf(":");if(r>0){let i=o.slice(0,r).trim(),l=o.slice(r+1).trim();i&&l&&(t[i]=l)}}return Object.keys(t).length>0?t:void 0}function fc(e){let t=[],n=e.getAttribute("role"),o=e.getAttribute("aria-label"),r=e.getAttribute("aria-describedby"),i=e.getAttribute("tabindex"),l=e.getAttribute("aria-hidden");return n&&t.push(`role="${n}"`),o&&t.push(`aria-label="${o}"`),r&&t.push(`aria-describedby="${r}"`),i&&t.push(`tabindex=${i}`),l==="true"&&t.push("aria-hidden"),e.matches("a, button, input, select, textarea, [tabindex]")&&t.push("focusable"),t.join(", ")}function ps(e){let t=[],n=e;for(;n&&n.tagName.toLowerCase()!=="html";){let r=n.tagName.toLowerCase(),i=r;if(n.id)i=`${r}#${n.id}`;else if(n.className&&typeof n.className=="string"){let s=n.className.split(/\s+/).map(a=>a.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(a=>a.length>2);s&&(i=`${r}.${s}`)}let l=qi(n);!n.parentElement&&l&&(i=`\u27E8shadow\u27E9 ${i}`),t.unshift(i),n=l}let o=Tn(e.ownerDocument);return(o?ps(o)+" > \u27E8iframe\u27E9 ":"")+t.join(" > ")}var mg="agentation-toolbar, [data-agentation-root], [data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]",d2=new Set(["DIV","SPAN","SECTION","ARTICLE","MAIN","ASIDE","HEADER","FOOTER","NAV"]);function Sc(e,t){let n=document.elementFromPoint(e,t),o=new Set;for(;n&&!o.has(n);){o.add(n);let r=ws(n),i;if(r){let l=Ki(n);e=(e-l.x)/l.sx,t=(t-l.y)/l.sy,i=r.elementFromPoint?.(e,t)}else i=n.shadowRoot?.elementFromPoint?.(e,t);if(!i||i===n)break;n=i}return n}function u2(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0});let t=getComputedStyle(e);if(t.visibility==="hidden"||t.visibility==="collapse")return!1;let n=e;for(;n;){let o=getComputedStyle(n);if(o.opacity==="0"||o.display==="none"||o.contentVisibility==="hidden")return!1;let r=n.getRootNode();n=n.parentElement||(G_(r)?r.host:null)}return!0}function gg(e,t){let n=[],o=new Set,r=(i,l,s)=>{for(let a of i){if(o.has(a))continue;if(o.add(a),a.shadowRoot){let p=a.shadowRoot,f=p.elementsFromPoint?.(l,s)??[];r(f.length?f:[p.elementFromPoint?.(l,s)].filter(Boolean),l,s)}let u=ws(a);if(u){let p=Ki(a),f=(l-p.x)/p.sx,g=(s-p.y)/p.sy;r(u.elementsFromPoint?.(f,g)??[u.elementFromPoint?.(f,g)].filter(Boolean),f,g)}a!==a.ownerDocument.body&&a!==a.ownerDocument.documentElement&&!Zt(a,mg)&&u2(a)&&n.push(a)}};return r(document.elementsFromPoint?.(e,t)??[document.elementFromPoint(e,t)].filter(Boolean),e,t),n}function hc(e,t,n){if(n.width<=0||n.height<=0)return null;let o=null,r=1/0;for(let i of gg(e,t)){let l=At(i),s=l.width/n.width,a=l.height/n.height;if(s<.5||s>2||a<.5||a>2)continue;let u=Math.abs(Math.log(s))+Math.abs(Math.log(a));u<r&&(o=i,r=u)}return o}function P0(e,t){let n=Sc(e,t);if(!n||Zt(n,mg))return null;let o=gg(e,t);for(let l of o)if(!d2.has(l.tagName)&&!l.shadowRoot||Array.from(l.childNodes).some(s=>s.nodeType===Node.TEXT_NODE&&s.textContent?.trim()))return l;let r=null,i=1/0;for(let l of o){let s=At(l),a=s.width*s.height;a>0&&a<i&&(r=l,i=a)}return r}function _2(e){let t=(0,Rc.useCallback)(n=>e?(window.addEventListener("hashchange",n),window.addEventListener("popstate",n),()=>{window.removeEventListener("hashchange",n),window.removeEventListener("popstate",n)}):()=>{},[e]);return(0,Rc.useSyncExternalStore)(t,()=>window.location.pathname+(e?window.location.hash:""),()=>"/")}var pc=new Map;function f2(e,t){let n=(pc.get(e)??Promise.resolve()).then(t),o=n.then(()=>{},()=>{});return pc.set(e,o),o.then(()=>{pc.get(e)===o&&pc.delete(e)}),n}function h2(e,t,n){try{let o=new URL(e,n);return o.origin===n&&o.pathname+o.hash===t}catch{return!1}}var D0=typeof window>"u"?Ji.useEffect:Ji.useLayoutEffect;function p2(e){let[t,n]=(0,Ji.useState)(null);return D0(()=>{let o=document.createElement("div");return o.setAttribute("data-agentation-portal",""),o.style.display="contents",n(o),()=>o.remove()},[]),D0(()=>{if(!t)return;let o=e??document.body;if(o.ownerDocument!==document){console.warn("[Agentation] portalContainer belongs to another document; the toolbar will not render.");return}let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;let i=r&&t.contains(document.activeElement)?r:null;typeof t.hidePopover=="function"&&t.matches(":popover-open")&&t.hidePopover(),o.appendChild(t),e&&typeof t.showPopover=="function"?(t.setAttribute("popover","manual"),t.style.cssText="position:fixed;inset:0 auto auto 0;margin:0;padding:0;border:0;background:transparent;width:0;height:0;overflow:visible;pointer-events:none",t.showPopover()):(t.removeAttribute("popover"),t.style.cssText="display:contents"),i?.focus({preventScroll:!0})},[t,e]),t}var m2=({mode:e="open",delegatesFocus:t,slotAssignment:n,host:o="div",children:r,className:i,...l})=>{let s=(0,Zi.useRef)(null),[a,u]=(0,Zi.useState)(null);return(0,Zi.useLayoutEffect)(()=>{let f=s.current;if(!f||f.shadowRoot)return;let g=f.attachShadow({mode:e,delegatesFocus:t,slotAssignment:n});u(g)},[]),(0,vg.jsx)(o,{ref:s,...l,...o.includes("-")?{class:i}:{className:i},children:a&&(0,xg.createPortal)(r,a)})};function K_(e,t,n){let o=(0,gs.useRef)(n);(0,gs.useLayoutEffect)(()=>{o.current=n},[n]),(0,gs.useLayoutEffect)(()=>{let r=e.current;if(!t||!r)return;let i=!1,l=r.getAnimations?.()??[];return Promise.allSettled(l.map(s=>s.finished)).then(()=>{i||o.current()}),()=>{i=!0}},[e,t])}var wg=`@charset "UTF-8";
.styles-module__popup___IhzrD svg[fill=none] {
  fill: none !important;
}
.styles-module__popup___IhzrD svg[fill=none] :not([fill]) {
  fill: none !important;
}

@keyframes styles-module__popupEnter___AuQDN {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}
@keyframes styles-module__popupExit___JJKQX {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
}
@keyframes styles-module__shake___jdbWe {
  0%, 100% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(0);
  }
  20% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);
  }
  40% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);
  }
  60% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);
  }
  80% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);
  }
}
.styles-module__popup___IhzrD {
  position: fixed;
  transform: translateX(-50%);
  width: 280px;
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  z-index: 100001;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  will-change: transform, opacity;
  opacity: 0;
}
.styles-module__popup___IhzrD.styles-module__enter___L7U7N {
  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w {
  opacity: 1;
  transform: translateX(-50%) scale(1) translateY(0);
}
.styles-module__popup___IhzrD.styles-module__exit___5eGjE {
  pointer-events: none;
  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {
  animation: styles-module__shake___jdbWe 0.25s ease-out;
}

.styles-module__header___wWsSi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5625rem;
}

.styles-module__element___fTV2z {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.styles-module__headerToggle___WpW0b {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {
  flex: 1;
}

.styles-module__chevron___ZZJlR {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {
  transform: rotate(90deg);
}

.styles-module__stylesWrapper___pnHgy {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {
  grid-template-rows: 1fr;
}

.styles-module__stylesInner___YYZe2 {
  overflow: hidden;
}

.styles-module__stylesBlock___VfQKn {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.6875rem;
  line-height: 1.5;
}

.styles-module__styleLine___1YQiD {
  color: rgba(255, 255, 255, 0.85);
  word-break: break-word;
}

.styles-module__styleProperty___84L1i {
  color: #c792ea;
}

.styles-module__styleValue___q51-h {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__timestamp___Dtpsv {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.styles-module__quote___mcMmQ {
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  line-height: 1.45;
}

.styles-module__textarea___jrSae {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
}
.styles-module__textarea___jrSae:focus {
  border-color: var(--agentation-color-blue);
}
.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {
  border-color: var(--agentation-color-green);
}
.styles-module__textarea___jrSae::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__textarea___jrSae::-webkit-scrollbar {
  width: 6px;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-track {
  background: transparent;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.styles-module__actions___D6x3f {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;
  margin-top: 0.75rem;
}

.styles-module__sourceAction___EabJb {
  display: block;
  max-width: 100%;
  margin: -2px 0 8px;
  padding: 2px 0;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 11px;
  border: 0;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}
.styles-module__sourceAction___EabJb:hover, .styles-module__sourceAction___EabJb:focus-visible {
  opacity: 1;
}
.styles-module__sourceAction___EabJb:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.styles-module__light___6AaSQ .styles-module__sourceAction___EabJb {
  color: #111;
}

.styles-module__cancel___hRjnL,
.styles-module__submit___K-mIR,
.styles-module__deleteButton___4VuAE {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.875rem;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.styles-module__cancel___hRjnL {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__cancel___hRjnL:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.styles-module__submit___K-mIR {
  color: white;
}
.styles-module__submit___K-mIR:hover:not(:disabled) {
  filter: brightness(0.9);
}
.styles-module__submit___K-mIR:disabled {
  cursor: not-allowed;
}

.styles-module__deleteWrapper___oSjdo {
  display: flex;
  margin-right: auto;
}

.styles-module__deleteButton___4VuAE {
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__deleteButton___4VuAE:active {
  transform: scale(0.92);
}

.styles-module__light___6AaSQ.styles-module__popup___IhzrD {
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___6AaSQ .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.6);
}
.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {
  background: rgba(0, 0, 0, 0.03);
}
.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {
  color: #7c3aed;
}
.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.04);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae {
  background: rgba(0, 0, 0, 0.03);
  color: #1a1a1a;
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__popup___IhzrD.styles-module__enter___L7U7N, .styles-module__popup___IhzrD.styles-module__exit___5eGjE {
    animation-duration: 1ms;
    animation-delay: 0ms !important;
  }
}
.styles-module__sharedForm___8GvQl {
  --card-motion: 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  padding: 0.75rem 1rem;
  transition: padding var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__header___wWsSi {
  transition: margin-bottom var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__element___fTV2z {
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
}
.styles-module__sharedForm___8GvQl .styles-module__previewExcerpt___DCOIL {
  display: none;
}
.styles-module__sharedForm___8GvQl .styles-module__headerToggle___WpW0b .styles-module__chevron___ZZJlR {
  opacity: 1;
  margin-left: 0;
  transition: margin-left var(--card-motion), opacity 100ms ease-out, transform var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5 {
  position: relative;
  height: var(--editor-field-height, 57px);
  border-radius: 8px;
  overflow: clip;
  transition: height var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--field-border, rgba(255, 255, 255, 0.15));
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  transition: opacity var(--card-motion), border-color var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNoteContent___6q3KD {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: clip;
  transition: width var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5[data-truncated]::after {
  content: "\u2026";
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  opacity: 0;
  pointer-events: none;
  transition: opacity 80ms ease-out;
}
.styles-module__sharedForm___8GvQl .styles-module__textarea___jrSae {
  display: block;
  width: calc(280px - 2rem);
  max-width: calc(100vw - 24px - 2rem);
  margin: 0;
  background: transparent !important;
  border-color: transparent !important;
  transform: translate(0, 0);
  transition: transform var(--card-motion), color var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedExtra___RUBKC, .styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition: grid-template-rows var(--card-motion), opacity 80ms ease-out;
}
.styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl {
  transition-delay: 0ms, 120ms;
}
.styles-module__sharedForm___8GvQl .styles-module__sharedExtraInner___EuUh4 {
  min-height: 0;
  overflow: hidden;
}
.styles-module__sharedForm___8GvQl .styles-module__actions___D6x3f {
  min-height: 0;
  overflow: hidden;
  transition: margin-top var(--card-motion);
}
.styles-module__sharedForm___8GvQl[data-preview] {
  padding: 8px 12px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__header___wWsSi {
  margin-bottom: 5px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__previewExcerpt___DCOIL {
  display: inline;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__element___fTV2z {
  line-height: 1.4;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__chevron___ZZJlR {
  opacity: 0;
  margin-left: -18px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5 {
  height: 20.2px;
  border-radius: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5::before {
  opacity: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__textarea___jrSae {
  transform: translate(-11px, calc(-9px + (1.4em - 1lh) / 2));
  color: #fff;
  overflow: hidden;
  cursor: default;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedExtra___RUBKC, .styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedActions___6Glpl {
  grid-template-rows: 0fr;
  opacity: 0;
  transition-delay: 0ms;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__actions___D6x3f {
  margin-top: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__stylesWrapper___pnHgy {
  grid-template-rows: 0fr;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5[data-truncated] .styles-module__sharedNoteContent___6q3KD {
  width: calc(100% - 12px);
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5[data-truncated]::after {
  opacity: 1;
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5::before {
  border-color: var(--field-border, rgba(0, 0, 0, 0.12));
  background: rgba(0, 0, 0, 0.03);
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl[data-preview] .styles-module__textarea___jrSae, .styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5::after {
  color: rgba(0, 0, 0, 0.85);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__sharedForm___8GvQl {
    --card-motion: 1ms linear;
  }
  .styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl, .styles-module__sharedForm___8GvQl .styles-module__headerToggle___WpW0b .styles-module__chevron___ZZJlR {
    transition: opacity 100ms ease-out;
    transition-delay: 0ms;
  }
}`,De={popup:"styles-module__popup___IhzrD",enter:"styles-module__enter___L7U7N",popupEnter:"styles-module__popupEnter___AuQDN",entered:"styles-module__entered___COX-w",exit:"styles-module__exit___5eGjE",popupExit:"styles-module__popupExit___JJKQX",shake:"styles-module__shake___jdbWe",header:"styles-module__header___wWsSi",element:"styles-module__element___fTV2z",headerToggle:"styles-module__headerToggle___WpW0b",chevron:"styles-module__chevron___ZZJlR",expanded:"styles-module__expanded___2Hxgv",stylesWrapper:"styles-module__stylesWrapper___pnHgy",stylesInner:"styles-module__stylesInner___YYZe2",stylesBlock:"styles-module__stylesBlock___VfQKn",styleLine:"styles-module__styleLine___1YQiD",styleProperty:"styles-module__styleProperty___84L1i",styleValue:"styles-module__styleValue___q51-h",timestamp:"styles-module__timestamp___Dtpsv",quote:"styles-module__quote___mcMmQ",textarea:"styles-module__textarea___jrSae",green:"styles-module__green___99l3h",actions:"styles-module__actions___D6x3f",sourceAction:"styles-module__sourceAction___EabJb",light:"styles-module__light___6AaSQ",cancel:"styles-module__cancel___hRjnL",submit:"styles-module__submit___K-mIR",deleteButton:"styles-module__deleteButton___4VuAE",deleteWrapper:"styles-module__deleteWrapper___oSjdo",sharedForm:"styles-module__sharedForm___8GvQl",previewExcerpt:"styles-module__previewExcerpt___DCOIL",sharedNote:"styles-module__sharedNote___OYVi5",sharedNoteContent:"styles-module__sharedNoteContent___6q3KD",sharedExtra:"styles-module__sharedExtra___RUBKC",sharedActions:"styles-module__sharedActions___6Glpl",sharedExtraInner:"styles-module__sharedExtraInner___EuUh4"},L_="data-agentation-styles";function kg(e,t,n){if(!n||!e)return;let o=e.nodeType===9?e.head:e.nodeType===11?e:null;if(!o||typeof o.querySelector!="function"||o.querySelector(`style[${L_}~="toolbar"], style[${L_}~="${t}"]`))return;let i=(e.nodeType===9?e:e.ownerDocument).createElement("style");i.setAttribute(L_,t),i.textContent=n,o.appendChild(i)}function J_(e,t){return(0,bg.useCallback)(n=>{n&&kg(n.getRootNode(),e,t)},[e,t])}function B0(e){if(!e)return;let t=n=>n.stopImmediatePropagation();document.addEventListener("focusin",t,!0),document.addEventListener("focusout",t,!0);try{e.focus({preventScroll:!0})}finally{document.removeEventListener("focusin",t,!0),document.removeEventListener("focusout",t,!0)}}var Cg=(0,dn.forwardRef)(function({element:t,timestamp:n,selectedText:o,placeholder:r="What should change?",initialValue:i="",submitLabel:l="Add",onSubmit:s,onCancel:a,onDelete:u,onOpenSource:p,allowEmpty:f=!1,accentColor:g="#3c82f7",computedStyles:C,disabled:b=!1,preview:N=!1,resetOnPreview:E=!0,variant:y="popup"},v){let h=y==="card",[S,j]=(0,dn.useState)(i),[Q,D]=(0,dn.useState)(!1),[V,z]=(0,dn.useState)(!1),K=(0,dn.useRef)(null),Z=(0,dn.useRef)(null),J=o?` "${o.slice(0,30)}${o.length>30?"...":""}"`:"";(0,dn.useLayoutEffect)(()=>{let ce=Z.current,pe=K.current;if(!h||!ce||!pe)return;let bt=()=>{ce.style.setProperty("--editor-field-height",`${pe.offsetHeight}px`)};if(bt(),"CanvasRenderingContext2D"in window){let Ke=document.createElement("canvas").getContext("2d");if(Ke){let Oe=getComputedStyle(pe).fontFamily;Ke.font=`13px ${Oe}`;let ft=Ke.measureText(i.replace(/\s+/g," ")).width;Ke.font=`italic 12px ${Oe}`;let Vt=Ke.measureText(t+J).width,gn=Math.min(200,Math.max(120,Math.ceil(Math.max(ft,Vt))+24));ce.closest("[data-annotation-card]")?.style.setProperty("--preview-width",`${gn}px`);let Re=ce.querySelector("[data-shared-note]");Re&&Re.toggleAttribute("data-truncated",ft>gn-24)}}let ze=typeof ResizeObserver<"u"?new ResizeObserver(bt):null;return ze?.observe(pe),()=>ze?.disconnect()},[h,t,i,J]),(0,dn.useLayoutEffect)(()=>{N&&E&&(j(i),z(!1),K.current&&(K.current.scrollTop=0,K.current.scrollLeft=0))},[N,E,i]),(0,dn.useImperativeHandle)(v,()=>({focus(){let ce=K.current;B0(ce),ce&&(ce.selectionStart=ce.selectionEnd=ce.value.length,ce.scrollTop=h?0:ce.scrollHeight)}}),[h]);let de=(0,dn.useCallback)(()=>{b||!S.trim()&&!f||s(S.trim())},[b,S,f,s]),ie=ce=>{ce.stopPropagation(),!ce.nativeEvent.isComposing&&(ce.key==="Enter"&&!ce.shiftKey&&(ce.preventDefault(),de()),ce.key==="Escape"&&a())};return(0,qe.jsxs)("div",{ref:Z,className:h?De.sharedForm:void 0,style:h?void 0:{display:"contents"},"data-annotation-editor":!0,"data-preview":N||void 0,children:[(0,qe.jsxs)("div",{className:De.header,"data-editor-heading":!0,children:[C&&Object.keys(C).length>0?(0,qe.jsxs)("button",{className:De.headerToggle,onClick:()=>{let ce=V;z(!V),ce&&ot(()=>B0(K.current),0)},type:"button",children:[(0,qe.jsx)("svg",{className:`${De.chevron} ${V?De.expanded:""}`,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,qe.jsx)("path",{d:"M5.5 10.25L9 7.25L5.75 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,qe.jsxs)("span",{className:De.element,children:[t,h&&J&&(0,qe.jsx)("span",{className:De.previewExcerpt,children:J})]})]}):(0,qe.jsxs)("span",{className:De.element,children:[t,h&&J&&(0,qe.jsx)("span",{className:De.previewExcerpt,children:J})]}),n&&(0,qe.jsx)("span",{className:De.timestamp,children:n})]}),p&&(0,qe.jsx)("div",{className:h?De.sharedExtra:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsx)("div",{className:h?De.sharedExtraInner:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsx)("button",{type:"button",className:De.sourceAction,onClick:p,children:"Open in editor"})})}),C&&Object.keys(C).length>0&&(0,qe.jsx)("div",{className:`${De.stylesWrapper} ${V?De.expanded:""}`,children:(0,qe.jsx)("div",{className:De.stylesInner,children:(0,qe.jsx)("div",{className:De.stylesBlock,children:Object.entries(C).map(([ce,pe])=>(0,qe.jsxs)("div",{className:De.styleLine,children:[(0,qe.jsx)("span",{className:De.styleProperty,children:ce.replace(/([A-Z])/g,"-$1").toLowerCase()}),": ",(0,qe.jsx)("span",{className:De.styleValue,children:pe}),";"]},ce))})})}),o&&(0,qe.jsx)("div",{className:h?De.sharedExtra:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsx)("div",{className:h?De.sharedExtraInner:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsxs)("div",{className:De.quote,children:["\u201C",o.slice(0,80),o.length>80?"...":"","\u201D"]})})}),(0,qe.jsx)("div",{"data-shared-note":!0,className:h?De.sharedNote:void 0,style:h?{"--field-border":Q?g:void 0}:{display:"contents"},children:(0,qe.jsx)("div",{className:h?De.sharedNoteContent:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsx)("textarea",{ref:K,className:De.textarea,readOnly:N,"aria-hidden":N,style:h?void 0:{borderColor:Q?g:void 0},placeholder:r,value:N?S.replace(/\s+/g," "):S,onChange:ce=>j(ce.target.value),onFocus:()=>D(!0),onBlur:()=>D(!1),rows:2,onKeyDown:ie})})}),(0,qe.jsx)("div",{"data-editor-actions":!0,className:h?De.sharedActions:void 0,style:h?void 0:{display:"contents"},children:(0,qe.jsxs)("div",{className:De.actions,children:[u&&(0,qe.jsx)("div",{className:De.deleteWrapper,children:(0,qe.jsx)("button",{className:De.deleteButton,onClick:u,type:"button","aria-label":"Delete annotation",children:"Delete"})}),(0,qe.jsx)("button",{className:De.cancel,onClick:a,children:"Cancel"}),(0,qe.jsx)("button",{className:De.submit,style:{backgroundColor:g,opacity:S.trim()||f?1:.4},onClick:de,disabled:b||!S.trim()&&!f,children:l})]})})]})}),Z_=(0,Yt.forwardRef)(function({element:t,timestamp:n,selectedText:o,placeholder:r="What should change?",initialValue:i="",submitLabel:l="Add",onSubmit:s,onCancel:a,onDelete:u,onOpenSource:p,allowEmpty:f=!1,style:g,accentColor:C="#3c82f7",isExiting:b=!1,onExitComplete:N,lightMode:E=!1,computedStyles:y},v){let[h,S]=(0,Yt.useState)(!1),[j,Q]=(0,Yt.useState)("initial"),D=(0,Yt.useRef)(null),V=(0,Yt.useRef)(null);(0,Yt.useEffect)(()=>{kg(V.current?.getRootNode(),"annotation-popup",wg)},[]);let z=(0,Yt.useRef)(null);(0,Yt.useEffect)(()=>{let ie=ot(()=>{Q(ce=>ce==="initial"?"enter":ce)},0);return()=>{clearTimeout(ie),z.current&&clearTimeout(z.current)}},[]),(0,Yt.useEffect)(()=>{if(b)return;let ie=ot(()=>D.current?.focus(),50);return()=>clearTimeout(ie)},[b]);let K=(0,Yt.useCallback)(()=>{z.current&&clearTimeout(z.current),S(!0),z.current=ot(()=>{S(!1),D.current?.focus()},250)},[]);(0,Yt.useImperativeHandle)(v,()=>({shake:K}),[K]);let Z=(0,Yt.useCallback)(()=>{if(N){a();return}Q("exit")},[a,N]),J=b?"exit":j;K_(V,J==="exit",()=>{b?N?.():a()});let de=[De.popup,E?De.light:"",J==="enter"?De.enter:"",J==="entered"?De.entered:"",J==="exit"?De.exit:"",h&&J!=="exit"?De.shake:""].filter(Boolean).join(" ");return(0,F_.jsx)("div",{ref:V,className:de,"data-annotation-popup":!0,style:g,onAnimationEnd:ie=>{ie.target===ie.currentTarget&&ie.animationName.includes("popupEnter")&&!b&&Q("entered")},onKeyDownCapture:ie=>{ie.key!=="Escape"||ie.nativeEvent.isComposing||(ie.preventDefault(),ie.stopPropagation(),Z())},onClick:ie=>ie.stopPropagation(),children:(0,F_.jsx)(Cg,{ref:D,element:t,timestamp:n,selectedText:o,placeholder:r,initialValue:i,submitLabel:l,onSubmit:s,onCancel:Z,onDelete:u,onOpenSource:p,allowEmpty:f,accentColor:C,computedStyles:y,disabled:J==="exit"})})}),$c=`.icon-transitions-module__iconState___uqK9J {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center;
}

.icon-transitions-module__iconStateFast___HxlMm {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: center;
}

.icon-transitions-module__iconFade___nPwXg {
  transition: opacity 0.2s ease;
}

.icon-transitions-module__iconFadeFast___Ofb2t {
  transition: opacity 0.15s ease;
}

.icon-transitions-module__visible___PlHsU {
  opacity: 1 !important;
}

.icon-transitions-module__visibleScaled___8Qog- {
  opacity: 1 !important;
  transform: scale(1);
}

.icon-transitions-module__hidden___ETykt {
  opacity: 0 !important;
}

.icon-transitions-module__hiddenScaled___JXn-m {
  opacity: 0 !important;
  transform: scale(0.8);
}

.icon-transitions-module__sending___uaLN- {
  opacity: 0.5 !important;
  transform: scale(0.8);
}`,pt={iconState:"icon-transitions-module__iconState___uqK9J",iconStateFast:"icon-transitions-module__iconStateFast___HxlMm",iconFade:"icon-transitions-module__iconFade___nPwXg",iconFadeFast:"icon-transitions-module__iconFadeFast___Ofb2t",visible:"icon-transitions-module__visible___PlHsU",visibleScaled:"icon-transitions-module__visibleScaled___8Qog-",hidden:"icon-transitions-module__hidden___ETykt",hiddenScaled:"icon-transitions-module__hiddenScaled___JXn-m",sending:"icon-transitions-module__sending___uaLN-"};var g2=({size:e=16})=>(0,ne.jsx)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none",children:(0,ne.jsx)("path",{d:"M8 3v10M3 8h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})});var y2=({size:e=20,...t})=>(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:[(0,ne.jsx)("circle",{cx:"10",cy:"10",r:"5.375",stroke:"currentColor",strokeWidth:"1.25"}),(0,ne.jsx)("path",{d:"M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("circle",{cx:"10",cy:"12.625",r:"0.625",fill:"currentColor"})]});var x2=({size:e=24,copied:t=!1,tint:n})=>(0,ne.jsxs)("svg",{ref:J_("icon-transitions",$c),width:e,height:e,viewBox:"0 0 24 24",fill:"none",style:n?{color:n,transition:"color 0.3s ease"}:void 0,children:[(0,ne.jsxs)("g",{className:`${pt.iconState} ${t?pt.hiddenScaled:pt.visibleScaled}`,children:[(0,ne.jsx)("path",{d:"M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z",stroke:"currentColor",strokeWidth:"1.5"}),(0,ne.jsx)("path",{d:"M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),(0,ne.jsxs)("g",{className:`${pt.iconState} ${t?pt.visibleScaled:pt.hiddenScaled}`,children:[(0,ne.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})]}),v2=({size:e=24,state:t="idle"})=>{let n=t==="idle",o=t==="sent",r=t==="failed",i=t==="sending";return(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsx)("g",{className:`${pt.iconStateFast} ${n?pt.visibleScaled:i?pt.sending:pt.hiddenScaled}`,children:(0,ne.jsx)("path",{d:"M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,ne.jsxs)("g",{className:`${pt.iconStateFast} ${o?pt.visibleScaled:pt.hiddenScaled}`,children:[(0,ne.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsxs)("g",{className:`${pt.iconStateFast} ${r?pt.visibleScaled:pt.hiddenScaled}`,children:[(0,ne.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M12 8V12",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round"}),(0,ne.jsx)("circle",{cx:"12",cy:"15",r:"0.5",fill:"var(--agentation-color-red)",stroke:"var(--agentation-color-red)",strokeWidth:"1"})]})]})};var w2=({size:e=24,isOpen:t=!0})=>(0,ne.jsxs)("svg",{ref:J_("icon-transitions",$c),width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsxs)("g",{className:`${pt.iconFade} ${t?pt.visible:pt.hidden}`,children:[(0,ne.jsx)("path",{d:"M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsxs)("g",{className:`${pt.iconFade} ${t?pt.hidden:pt.visible}`,children:[(0,ne.jsx)("path",{d:"M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z",fill:"currentColor"}),(0,ne.jsx)("path",{d:"M5 19L19 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})]}),b2=({size:e=24,isPaused:t=!1})=>(0,ne.jsxs)("svg",{ref:J_("icon-transitions",$c),width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsxs)("g",{className:`${pt.iconFadeFast} ${t?pt.hidden:pt.visible}`,children:[(0,ne.jsx)("path",{d:"M8 6L8 18",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),(0,ne.jsx)("path",{d:"M16 18L16 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),(0,ne.jsx)("path",{className:`${pt.iconFadeFast} ${t?pt.visible:pt.hidden}`,d:"M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z",stroke:"currentColor",strokeWidth:"1.5"})]});var k2=({size:e=16})=>(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsx)("path",{d:"M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"2.5",stroke:"currentColor",strokeWidth:"1.5"})]});var C2=({size:e=16})=>(0,ne.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:(0,ne.jsx)("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})});var S2=({size:e=16})=>(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsxs)("g",{clipPath:"url(#clip0_2_53)",children:[(0,ne.jsx)("path",{d:"M16.25 16.25L7.75 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M7.75 16.25L16.25 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsx)("defs",{children:(0,ne.jsx)("clipPath",{id:"clip0_2_53",children:(0,ne.jsx)("rect",{width:"24",height:"24",fill:"white"})})})]});var E2=({size:e=16})=>(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 20 20",fill:"none",children:[(0,ne.jsx)("path",{d:"M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M10 3.9585V5.05698",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M10 14.9429V16.0414",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M5.7269 5.72656L6.50682 6.50649",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M13.4932 13.4932L14.2731 14.2731",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M3.95834 10H5.05683",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M14.9432 10H16.0417",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M5.7269 14.2731L6.50682 13.4932",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M13.4932 6.50649L14.2731 5.72656",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]}),M2=({size:e=16})=>(0,ne.jsx)("svg",{width:e,height:e,viewBox:"0 0 20 20",fill:"none",children:(0,ne.jsx)("path",{d:"M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z",stroke:"currentColor",strokeWidth:"1.13793",strokeLinecap:"round",strokeLinejoin:"round"})}),L2=({size:e=16})=>(0,ne.jsx)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375",stroke:"currentColor",strokeWidth:"0.9",strokeLinecap:"round",strokeLinejoin:"round"})});var N2=({size:e=16})=>(0,ne.jsx)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M8.5 3.5L4 8L8.5 12.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})});var I2=({size:e=24})=>(0,ne.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",children:[(0,ne.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),(0,ne.jsx)("line",{x1:"3",y1:"9",x2:"21",y2:"9",stroke:"currentColor",strokeWidth:"1.5"}),(0,ne.jsx)("line",{x1:"9",y1:"9",x2:"9",y2:"21",stroke:"currentColor",strokeWidth:"1.5"})]}),R2=({content:e,children:t,...n})=>{let[o,r]=(0,Mo.useState)(!1),[i,l]=(0,Mo.useState)(!1),[s,a]=(0,Mo.useState)({top:0,right:0}),u=(0,Mo.useRef)(null),p=(0,Mo.useRef)(null),f=(0,Mo.useRef)(null),g=()=>{if(u.current){let N=u.current.getBoundingClientRect();a({top:N.top+N.height/2,right:window.innerWidth-N.left+8})}},C=()=>{l(!0),f.current&&(clearTimeout(f.current),f.current=null),g(),p.current=ot(()=>{r(!0)},500)},b=()=>{p.current&&(clearTimeout(p.current),p.current=null),r(!1),f.current=ot(()=>{l(!1)},150)};return(0,Mo.useEffect)(()=>()=>{p.current&&clearTimeout(p.current),f.current&&clearTimeout(f.current)},[]),(0,ni.jsxs)(ni.Fragment,{children:[(0,ni.jsx)("span",{ref:u,onMouseEnter:C,onMouseLeave:b,...n,children:t}),i&&(0,Sg.createPortal)((0,ni.jsx)("div",{"data-feedback-toolbar":!0,style:{position:"fixed",top:s.top,right:s.right,transform:"translateY(-50%)",padding:"6px 10px",background:"#383838",color:"rgba(255, 255, 255, 0.7)",fontSize:"11px",fontWeight:400,lineHeight:"14px",borderRadius:"10px",width:"180px",textAlign:"left",zIndex:100020,pointerEvents:"none",boxShadow:"0px 1px 8px rgba(0, 0, 0, 0.28)",opacity:o?1:0,transition:"opacity 0.15s ease"},children:e}),document.body)]})},$2=`.styles-module__tooltip___mcXL2 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
}

.styles-module__tooltipIcon___Nq2nD {
  transform: translateY(0.5px);
  color: #fff;
  opacity: 0.2;
  transition: opacity 0.15s ease;
  will-change: transform;
}
.styles-module__tooltip___mcXL2:hover .styles-module__tooltipIcon___Nq2nD {
  opacity: 0.5;
}
[data-agentation-theme=light] .styles-module__tooltipIcon___Nq2nD {
  color: #000;
}`,z0={tooltip:"styles-module__tooltip___mcXL2",tooltipIcon:"styles-module__tooltipIcon___Nq2nD"},ei=({content:e})=>(0,W_.jsx)(R2,{className:z0.tooltip,content:e,children:(0,W_.jsx)(y2,{className:z0.tooltipIcon})}),T2=`.styles-module__toolbar___wNsdK svg[fill=none],
.styles-module__markersLayer___-25j1 svg[fill=none],
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] {
  fill: none !important;
}
.styles-module__toolbar___wNsdK svg[fill=none] :not([fill]),
.styles-module__markersLayer___-25j1 svg[fill=none] :not([fill]),
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__controlsContent___9GJWU :where(button, input, select, textarea, label) {
  background: unset;
  border: unset;
  border-radius: unset;
  padding: unset;
  margin: unset;
  color: unset;
  font-family: unset;
  font-weight: unset;
  font-style: unset;
  line-height: unset;
  letter-spacing: unset;
  text-transform: unset;
  text-decoration: unset;
  box-shadow: unset;
  outline: unset;
}

@keyframes styles-module__toolbarEnter___u8RRu {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
@keyframes styles-module__toolbarHide___y8kaT {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
@keyframes styles-module__badgeEnter___mVQLj {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleIn___c-r1K {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleOut___Wctwz {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}
@keyframes styles-module__slideUp___kgD36 {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__slideDown___zcdje {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
}
@keyframes styles-module__fadeIn___b9qmf {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__fadeOut___6Ut6- {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__hoverHighlightIn___6WYHY {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__hoverTooltipIn___FYGQx {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.styles-module__disableTransitions___EopxO :is(*, *::before, *::after) {
  transition: none !important;
}

:host {
  /* Set here rather than inline so a consumer className rule can still hide the toolbar. */
  display: contents;
  position: fixed;
  top: auto;
  left: auto;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 100000;
}

.styles-module__positionContext___AZFHE,
.styles-module__toolbar___wNsdK {
  position: inherit;
  top: inherit;
  left: inherit;
  bottom: inherit;
  right: inherit;
  z-index: inherit;
}

.styles-module__toolbar___wNsdK {
  width: 337px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: none;
  transition: left 0.36s cubic-bezier(0.19, 1, 0.22, 1), top 0s, right 0s, bottom 0s;
}
.styles-module__toolbar___wNsdK[data-dragging=true] {
  transition: none;
}

.styles-module__toolbarContainer___dIhma {
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  margin-left: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  transition: width 0.36s cubic-bezier(0.19, 1, 0.22, 1), transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {
  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}
.styles-module__toolbarContainer___dIhma.styles-module__hiding___1td44 {
  animation: styles-module__toolbarHide___y8kaT 0.4s cubic-bezier(0.4, 0, 1, 1) forwards;
  pointer-events: none;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  padding: 0;
  cursor: pointer;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #2a2a2a;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {
  transform: scale(0.95);
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {
  height: 44px;
  border-radius: 22px;
  padding: 5px;
  width: 297px;
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {
  width: 337px;
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__toolbar___wNsdK,
  .styles-module__toolbarContainer___dIhma {
    transition: none;
  }
}
.styles-module__buttonWrapper___rBcdv.styles-module__toggleWrapper___7N0-q {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
}

.styles-module__togglePlaceholder___wnqrL {
  width: 34px;
  flex: 0 0 34px;
  height: 34px;
}

.styles-module__toggleContent___0yfyP {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__toggleContent___0yfyP::before {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  pointer-events: none;
  background: transparent;
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover {
  color: #fff;
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover::before {
  background: rgba(255, 255, 255, 0.12);
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:active::before, .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:active .styles-module__toggleGlyph___R7Oom {
  transform: scale(0.92);
}

.styles-module__toggleIcon___Jbtus {
  transform: translateY(-0.5px);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.styles-module__expandedToggle___F7SRN .styles-module__toggleIcon___Jbtus {
  transform: none;
}

.styles-module__toggleGlyph___R7Oom {
  overflow: visible;
  transition: transform 0.1s ease;
}
.styles-module__toggleGlyph___R7Oom path {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.16s ease;
}

.styles-module__toggleTopLine___hQaCm,
.styles-module__toggleMiddleLine___sFFVe {
  vector-effect: non-scaling-stroke;
}

.styles-module__toggleBottomLine___V-jX3 {
  transform-origin: left center;
}

.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleTopLine___hQaCm {
  transform: translateY(5.25px) rotate(45deg) scaleX(1.1422494);
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleMiddleLine___sFFVe {
  transform: translateX(3.5px) rotate(-45deg) scaleX(2.4748737);
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleBottomLine___V-jX3 {
  transform: scaleX(0);
  opacity: 0;
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleSparkle___eeF99 {
  transform: scale(0);
  opacity: 0;
}

.styles-module__toggleContent___0yfyP:focus-visible,
.styles-module__controlButton___8Q0jc:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 3px;
}

.styles-module__controlsContent___9GJWU {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: filter 0.14s ease-out, opacity 0.14s ease-out, transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {
  transition: filter 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease-out, transform 0.42s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
}
.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
  pointer-events: none;
  opacity: 0;
  filter: blur(6px);
  transform: scale(0.4);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__controlsContent___9GJWU,
  .styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW,
  .styles-module__toggleContent___0yfyP,
  .styles-module__toggleContent___0yfyP::before,
  .styles-module__toggleGlyph___R7Oom,
  .styles-module__toggleIcon___Jbtus,
  .styles-module__toggleGlyph___R7Oom path {
    transition: none;
  }
  .styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
    filter: none;
    transform: none;
  }
}
.styles-module__badge___2XsgF {
  position: absolute;
  top: -13px;
  right: -13px;
  -webkit-user-select: none;
  user-select: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: scale(1);
}
.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {
  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;
}

.styles-module__controlButton___8Q0jc {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;
}
.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.styles-module__controlButton___8Q0jc:active:not(:disabled) {
  transform: scale(0.92);
}
.styles-module__controlButton___8Q0jc:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background-color: color-mix(in srgb, var(--agentation-color-blue) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {
  cursor: default;
  pointer-events: none;
  background: transparent !important;
}
.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
  cursor: default;
}
.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}

.styles-module__buttonBadge___NeFWb {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
[data-agentation-theme=light] .styles-module__buttonBadge___NeFWb {
  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-yellow) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-yellow) 0%, transparent);
  }
}
.styles-module__mcpIndicator___zGJeL {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: background-color 0.3s ease, opacity 0.15s ease, transform 0.15s ease;
  opacity: 1;
  transform: scale(1);
}
.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {
  opacity: 0;
  transform: scale(0);
  animation: none;
}

@keyframes styles-module__connectionPulse___-Zycw {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}
.styles-module__connectionIndicatorWrapper___L-e-3 {
  width: 8px;
  height: 34px;
  margin-left: 6px;
  margin-right: 6px;
}

.styles-module__connectionIndicator___afk9p {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  cursor: default;
}

.styles-module__connectionIndicatorVisible___C-i5B {
  opacity: 1;
}

.styles-module__connectionIndicatorConnected___IY8pR {
  background-color: var(--agentation-color-green);
  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;
}

.styles-module__connectionIndicatorDisconnected___kmpaZ {
  background-color: var(--agentation-color-red);
  animation: none;
}

.styles-module__connectionIndicatorConnecting___QmSLH {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;
}

.styles-module__buttonWrapper___rBcdv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition-delay: 0.85s;
}
.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {
  opacity: 0;
  visibility: hidden;
}

.styles-module__tooltipsInSession___-0lHH .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transition-delay: 0s;
}

.styles-module__sendButtonWrapper___UUxG6 {
  width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  margin-left: -6px;
  transition: width 0.36s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s cubic-bezier(0.19, 1, 0.22, 1), margin 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {
  transform: scale(0.8);
  transition: transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {
  width: 34px;
  opacity: 1;
  overflow: visible;
  pointer-events: auto;
  margin-left: 0;
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {
  transform: scale(1);
}

.styles-module__buttonTooltip___Burd9 {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 6px 10px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;
}
.styles-module__buttonTooltip___Burd9::after {
  content: "";
  position: absolute;
  top: calc(100% - 4px);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 0 0 2px 0;
}

.styles-module__shortcut___lEAQk {
  margin-left: 4px;
  opacity: 0.5;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {
  bottom: auto;
  top: calc(100% + 14px);
  transform: translateX(-50%) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {
  top: -4px;
  bottom: auto;
  border-radius: 2px 0 0 0;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-50%) scale(1);
}

.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {
  opacity: 0 !important;
  visibility: hidden !important;
  transition: none !important;
}

.styles-module__tooltipVisible___0jcCv,
.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) scale(1) !important;
  transition-delay: 0s !important;
}

.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(-12px) scale(0.95);
}
.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {
  left: 16px;
}
.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {
  left: auto;
  right: 8px;
}
.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__divider___c--s1 {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 3px;
}

.styles-module__overlay___Q1O9y {
  position: fixed;
  inset: 0;
  z-index: 99997;
  pointer-events: none;
}
.styles-module__overlay___Q1O9y > * {
  pointer-events: auto;
}

.styles-module__hoverHighlight___ogakW {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-accent) 50%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-accent) 4%, transparent);
  pointer-events: none !important;
  box-sizing: border-box;
  will-change: opacity;
  contain: layout style;
}
.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {
  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;
}

.styles-module__multiSelectOutline___cSJ-m {
  position: fixed;
  border: 2px dashed color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-green) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__singleSelectOutline___QhX-O {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-blue) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-blue) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__hoverTooltip___bvLk7 {
  position: fixed;
  z-index: 99999;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  pointer-events: none !important;
  white-space: nowrap;
  max-width: min(280px, 100vw - 16px - 1.2rem);
  overflow: hidden;
  text-overflow: ellipsis;
}
.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {
  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;
}

.styles-module__hoverReactPath___gx1IJ {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__hoverElementName___QMLMl {
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markersLayer___-25j1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__markersLayer___-25j1 > * {
  pointer-events: auto;
}

.styles-module__fixedMarkersLayer___ffyX6 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__fixedMarkersLayer___ffyX6 > * {
  pointer-events: auto;
}

.styles-module__marker___6sQrs {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  -webkit-user-select: none;
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___6sQrs:hover {
  z-index: 2;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___6sQrs.styles-module__enter___WFIki {
  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {
  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {
  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___6sQrs.styles-module__pending___2IHLC {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {
  position: fixed;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___nCTxD {
  display: block;
  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;
}

@keyframes styles-module__renumberRoll___Wgbq3 {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__markerTooltip___aLJID {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {
  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;
}

.styles-module__markerQuote___FHmrz {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___QkrrS {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

.styles-module__markerHint___2iF-6 {
  display: block;
  font-size: 0.625rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.375rem;
  white-space: nowrap;
}

.styles-module__settingsPanel___OxX3Y {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 1rem;
  padding: 13px 0 16px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___OxX3Y::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,
.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,
.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,
.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,
.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,
.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,
.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12 {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__settingsPanelContainer___Xksv8 {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 1rem;
}

.styles-module__settingsPage___6YfHH {
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 3px 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsNavLink___wCzJt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(255, 255, 255, 0.9);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(0, 0, 0, 0.8);
}
.styles-module__settingsNavLink___wCzJt svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___ZWwhj {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__mcpNavIndicator___cl9pO {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;
}

.styles-module__settingsBackButton___bIe2j {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0 12px 0;
  margin: -6px 0 0.5rem 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(255, 255, 255, 0.07);
}
.styles-module__settingsBackButton___bIe2j:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___InP0r {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___InP0r {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___NKlmo {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___NKlmo {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___8xv-x {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___8xv-x:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendRow___UblX5 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.styles-module__autoSendLabel___icDc2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: var(--agentation-color-blue);
}

.styles-module__webhookUrlInput___2375C {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__settingsHeader___pwDY9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 0.5rem;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.styles-module__settingsBrand___0gJeM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___uTG18 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___TUcFq {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {
  padding-top: calc(0.5rem + 4px);
}

.styles-module__settingsSectionGrow___h-5HZ {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___3sdhc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {
  margin-top: 8px;
}

.styles-module__dropdownContainer___BVnxe {
  position: relative;
}

.styles-module__dropdownButton___16NPz {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownButton___16NPz:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownButton___16NPz svg {
  opacity: 0.6;
}

.styles-module__cycleButton___FMKfw {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___FMKfw {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___FMKfw:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes styles-module__cycleTextIn___Q6zJf {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__cycleButtonText___fD1LR {
  display: inline-block;
  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;
}

.styles-module__cycleDots___LWuoQ {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___nPgLY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__dropdownMenu___k73ER {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.25rem;
  min-width: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;
}

.styles-module__dropdownItem___ylsLj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownItem___ylsLj:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
}

.styles-module__settingsLabel___8UjfX {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
[data-agentation-theme=light] .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__settingsLabelMarker___ewdtV {
  padding-top: 3px;
  margin-bottom: 10px;
}

.styles-module__settingsOptions___LyrBA {
  display: flex;
  gap: 0.25rem;
}

.styles-module__settingsOption___UNa12 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__settingsOption___UNa12:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
  color: var(--agentation-color-blue);
}

.styles-module__sliderContainer___ducXj {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.styles-module__slider___GLdxp {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.styles-module__slider___GLdxp::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.styles-module__slider___GLdxp:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.styles-module__sliderLabels___FhLDB {
  display: flex;
  justify-content: space-between;
}

.styles-module__sliderLabel___U8sPr {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__sliderLabel___U8sPr:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(255, 255, 255, 0.9);
}

.styles-module__colorOptions___iHCNX {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  margin-bottom: 1px;
}

.styles-module__colorOption___IodiY {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: var(--swatch);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___IodiY {
    background-color: var(--swatch-p3);
  }
}
.styles-module__colorOption___IodiY:hover {
  transform: scale(1.15);
}
.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {
  transform: scale(0.83);
}

.styles-module__colorOptionRing___U2xpo {
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
.styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
  border-color: var(--swatch);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
    border-color: var(--swatch-p3);
  }
}

.styles-module__settingsToggle___fBrFn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {
  margin-top: calc(0.5rem + 6px);
}
.styles-module__settingsToggle___fBrFn input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {
  margin-bottom: calc(0.5rem + 6px);
}

@keyframes styles-module__mcpPulse___uNggr {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___fov9B {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
.styles-module__mcpStatusDot___ibgkc {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___fov9B 2s infinite;
}

.styles-module__drawCanvas___7cG9U {
  position: fixed;
  inset: 0;
  z-index: 99996;
  pointer-events: none !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6 {
  pointer-events: auto !important;
  cursor: crosshair !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6[data-stroke-hover] {
  cursor: pointer !important;
}

.styles-module__dragSelection___kZLq2 {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-green) 8%, transparent);
  pointer-events: none;
  z-index: 99997;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__dragCount___KM90j {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--agentation-color-green);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 1.5rem;
  text-align: center;
}

.styles-module__highlightsContainer___-0xzG {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__selectedElementHighlight___fyVlI {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  border-radius: 4px;
  background: color-mix(in srgb, var(--agentation-color-green) 6%, transparent);
  pointer-events: none;
  will-change: transform, width, height;
  contain: layout style;
}

[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #f5f5f5;
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover::before {
  background: rgba(0, 0, 0, 0.06);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9 {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9::after {
  background: #fff;
}
[data-agentation-theme=light] .styles-module__divider___c--s1 {
  background: rgba(0, 0, 0, 0.1);
}`,A={toolbar:"styles-module__toolbar___wNsdK",markersLayer:"styles-module__markersLayer___-25j1",fixedMarkersLayer:"styles-module__fixedMarkersLayer___ffyX6",controlsContent:"styles-module__controlsContent___9GJWU",disableTransitions:"styles-module__disableTransitions___EopxO",positionContext:"styles-module__positionContext___AZFHE",toolbarContainer:"styles-module__toolbarContainer___dIhma",entrance:"styles-module__entrance___sgHd8",toolbarEnter:"styles-module__toolbarEnter___u8RRu",hiding:"styles-module__hiding___1td44",toolbarHide:"styles-module__toolbarHide___y8kaT",collapsed:"styles-module__collapsed___Rydsn",expanded:"styles-module__expanded___ofKPx",serverConnected:"styles-module__serverConnected___Gfbou",buttonWrapper:"styles-module__buttonWrapper___rBcdv",toggleWrapper:"styles-module__toggleWrapper___7N0-q",togglePlaceholder:"styles-module__togglePlaceholder___wnqrL",toggleContent:"styles-module__toggleContent___0yfyP",expandedToggle:"styles-module__expandedToggle___F7SRN",toggleGlyph:"styles-module__toggleGlyph___R7Oom",toggleIcon:"styles-module__toggleIcon___Jbtus",toggleTopLine:"styles-module__toggleTopLine___hQaCm",toggleMiddleLine:"styles-module__toggleMiddleLine___sFFVe",toggleBottomLine:"styles-module__toggleBottomLine___V-jX3",toggleSparkle:"styles-module__toggleSparkle___eeF99",controlButton:"styles-module__controlButton___8Q0jc",visible:"styles-module__visible___KHwEW",hidden:"styles-module__hidden___Ae8H4",badge:"styles-module__badge___2XsgF",fadeOut:"styles-module__fadeOut___6Ut6-",badgeEnter:"styles-module__badgeEnter___mVQLj",statusShowing:"styles-module__statusShowing___te6iu",buttonBadge:"styles-module__buttonBadge___NeFWb",mcpIndicator:"styles-module__mcpIndicator___zGJeL",connected:"styles-module__connected___7c28g",mcpIndicatorPulseConnected:"styles-module__mcpIndicatorPulseConnected___EDodZ",connecting:"styles-module__connecting___uo-CW",mcpIndicatorPulseConnecting:"styles-module__mcpIndicatorPulseConnecting___cCYte",connectionIndicatorWrapper:"styles-module__connectionIndicatorWrapper___L-e-3",connectionIndicator:"styles-module__connectionIndicator___afk9p",connectionIndicatorVisible:"styles-module__connectionIndicatorVisible___C-i5B",connectionIndicatorConnected:"styles-module__connectionIndicatorConnected___IY8pR",connectionPulse:"styles-module__connectionPulse___-Zycw",connectionIndicatorDisconnected:"styles-module__connectionIndicatorDisconnected___kmpaZ",connectionIndicatorConnecting:"styles-module__connectionIndicatorConnecting___QmSLH",buttonTooltip:"styles-module__buttonTooltip___Burd9",tooltipsInSession:"styles-module__tooltipsInSession___-0lHH",sendButtonWrapper:"styles-module__sendButtonWrapper___UUxG6",sendButtonVisible:"styles-module__sendButtonVisible___WPSQU",shortcut:"styles-module__shortcut___lEAQk",tooltipBelow:"styles-module__tooltipBelow___m6ats",tooltipsHidden:"styles-module__tooltipsHidden___VtLJG",tooltipVisible:"styles-module__tooltipVisible___0jcCv",buttonWrapperAlignLeft:"styles-module__buttonWrapperAlignLeft___myzIp",buttonWrapperAlignRight:"styles-module__buttonWrapperAlignRight___HCQFR",divider:"styles-module__divider___c--s1",overlay:"styles-module__overlay___Q1O9y",hoverHighlight:"styles-module__hoverHighlight___ogakW",enter:"styles-module__enter___WFIki",hoverHighlightIn:"styles-module__hoverHighlightIn___6WYHY",multiSelectOutline:"styles-module__multiSelectOutline___cSJ-m",fadeIn:"styles-module__fadeIn___b9qmf",exit:"styles-module__exit___fyOJ0",singleSelectOutline:"styles-module__singleSelectOutline___QhX-O",hoverTooltip:"styles-module__hoverTooltip___bvLk7",hoverTooltipIn:"styles-module__hoverTooltipIn___FYGQx",hoverReactPath:"styles-module__hoverReactPath___gx1IJ",hoverElementName:"styles-module__hoverElementName___QMLMl",marker:"styles-module__marker___6sQrs",clearing:"styles-module__clearing___FQ--7",markerIn:"styles-module__markerIn___5FaAP",markerOut:"styles-module__markerOut___GU5jX",pending:"styles-module__pending___2IHLC",fixed:"styles-module__fixed___dBMHC",multiSelect:"styles-module__multiSelect___YWiuz",hovered:"styles-module__hovered___ZgXIy",renumber:"styles-module__renumber___nCTxD",renumberRoll:"styles-module__renumberRoll___Wgbq3",markerTooltip:"styles-module__markerTooltip___aLJID",tooltipIn:"styles-module__tooltipIn___0N31w",markerQuote:"styles-module__markerQuote___FHmrz",markerNote:"styles-module__markerNote___QkrrS",markerHint:"styles-module__markerHint___2iF-6",settingsPanel:"styles-module__settingsPanel___OxX3Y",settingsHeader:"styles-module__settingsHeader___pwDY9",settingsBrand:"styles-module__settingsBrand___0gJeM",settingsBrandSlash:"styles-module__settingsBrandSlash___uTG18",settingsVersion:"styles-module__settingsVersion___TUcFq",settingsSection:"styles-module__settingsSection___m-YM2",settingsLabel:"styles-module__settingsLabel___8UjfX",cycleButton:"styles-module__cycleButton___FMKfw",cycleDot:"styles-module__cycleDot___nPgLY",dropdownButton:"styles-module__dropdownButton___16NPz",toggleLabel:"styles-module__toggleLabel___Xm8Aa",customCheckbox:"styles-module__customCheckbox___U39ax",sliderLabel:"styles-module__sliderLabel___U8sPr",slider:"styles-module__slider___GLdxp",themeToggle:"styles-module__themeToggle___2rUjA",settingsOption:"styles-module__settingsOption___UNa12",selected:"styles-module__selected___OwRqP",settingsPanelContainer:"styles-module__settingsPanelContainer___Xksv8",settingsPage:"styles-module__settingsPage___6YfHH",slideLeft:"styles-module__slideLeft___Ps01J",automationsPage:"styles-module__automationsPage___uvCq6",slideIn:"styles-module__slideIn___4-qXe",settingsNavLink:"styles-module__settingsNavLink___wCzJt",settingsNavLinkRight:"styles-module__settingsNavLinkRight___ZWwhj",mcpNavIndicator:"styles-module__mcpNavIndicator___cl9pO",mcpPulse:"styles-module__mcpPulse___uNggr",settingsBackButton:"styles-module__settingsBackButton___bIe2j",automationHeader:"styles-module__automationHeader___InP0r",automationDescription:"styles-module__automationDescription___NKlmo",learnMoreLink:"styles-module__learnMoreLink___8xv-x",autoSendRow:"styles-module__autoSendRow___UblX5",autoSendLabel:"styles-module__autoSendLabel___icDc2",active:"styles-module__active___-zoN6",webhookUrlInput:"styles-module__webhookUrlInput___2375C",settingsSectionExtraPadding:"styles-module__settingsSectionExtraPadding___jdhFV",settingsSectionGrow:"styles-module__settingsSectionGrow___h-5HZ",settingsRow:"styles-module__settingsRow___3sdhc",settingsRowMarginTop:"styles-module__settingsRowMarginTop___zA0Sp",dropdownContainer:"styles-module__dropdownContainer___BVnxe",settingsRowDisabled:"styles-module__settingsRowDisabled___EgS0V",toggleSwitch:"styles-module__toggleSwitch___l4Ygm",cycleButtonText:"styles-module__cycleButtonText___fD1LR",cycleTextIn:"styles-module__cycleTextIn___Q6zJf",cycleDots:"styles-module__cycleDots___LWuoQ",dropdownMenu:"styles-module__dropdownMenu___k73ER",scaleIn:"styles-module__scaleIn___c-r1K",dropdownItem:"styles-module__dropdownItem___ylsLj",settingsLabelMarker:"styles-module__settingsLabelMarker___ewdtV",settingsOptions:"styles-module__settingsOptions___LyrBA",sliderContainer:"styles-module__sliderContainer___ducXj",sliderLabels:"styles-module__sliderLabels___FhLDB",colorOptions:"styles-module__colorOptions___iHCNX",colorOption:"styles-module__colorOption___IodiY",colorOptionRing:"styles-module__colorOptionRing___U2xpo",settingsToggle:"styles-module__settingsToggle___fBrFn",settingsToggleMarginBottom:"styles-module__settingsToggleMarginBottom___MZUyF",mcpStatusDot:"styles-module__mcpStatusDot___ibgkc",disconnected:"styles-module__disconnected___cHPxR",mcpPulseError:"styles-module__mcpPulseError___fov9B",drawCanvas:"styles-module__drawCanvas___7cG9U",dragSelection:"styles-module__dragSelection___kZLq2",dragCount:"styles-module__dragCount___KM90j",highlightsContainer:"styles-module__highlightsContainer___-0xzG",selectedElementHighlight:"styles-module__selectedElementHighlight___fyVlI",scaleOut:"styles-module__scaleOut___Wctwz",slideUp:"styles-module__slideUp___kgD36",slideDown:"styles-module__slideDown___zcdje"};function P2({active:e}){return(0,ti.jsxs)("svg",{className:A.toggleGlyph,"data-active":e,width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,ti.jsx)("path",{className:A.toggleTopLine,d:"M5.5 6.75H18.5"}),(0,ti.jsx)("path",{className:A.toggleMiddleLine,d:"M5.5 12H11.5"}),(0,ti.jsx)("path",{className:A.toggleBottomLine,d:"M5.5 17.25H9.25"}),(0,ti.jsx)("path",{className:A.toggleSparkle,d:"M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z"})]})}var oe={navigation:{width:800,height:56},hero:{width:800,height:320},header:{width:800,height:80},section:{width:800,height:400},sidebar:{width:240,height:400},footer:{width:800,height:160},modal:{width:480,height:300},card:{width:280,height:240},text:{width:400,height:120},image:{width:320,height:200},video:{width:480,height:270},table:{width:560,height:220},grid:{width:600,height:300},list:{width:300,height:180},chart:{width:400,height:240},button:{width:140,height:40},input:{width:280,height:56},form:{width:360,height:320},tabs:{width:480,height:240},dropdown:{width:200,height:200},toggle:{width:44,height:24},search:{width:320,height:44},avatar:{width:48,height:48},badge:{width:80,height:28},breadcrumb:{width:300,height:24},pagination:{width:300,height:36},progress:{width:240,height:8},divider:{width:600,height:1},accordion:{width:400,height:200},carousel:{width:600,height:300},toast:{width:320,height:64},tooltip:{width:180,height:40},pricing:{width:300,height:360},testimonial:{width:360,height:200},cta:{width:600,height:160},alert:{width:400,height:56},banner:{width:800,height:48},stat:{width:200,height:120},stepper:{width:480,height:48},tag:{width:72,height:28},rating:{width:160,height:28},map:{width:480,height:300},timeline:{width:360,height:320},fileUpload:{width:360,height:180},codeBlock:{width:480,height:200},calendar:{width:300,height:300},notification:{width:360,height:72},productCard:{width:280,height:360},profile:{width:280,height:200},drawer:{width:320,height:400},popover:{width:240,height:160},logo:{width:120,height:40},faq:{width:560,height:320},gallery:{width:560,height:360},checkbox:{width:20,height:20},radio:{width:20,height:20},slider:{width:240,height:32},datePicker:{width:300,height:320},skeleton:{width:320,height:120},chip:{width:96,height:32},icon:{width:24,height:24},spinner:{width:32,height:32},feature:{width:360,height:200},team:{width:560,height:280},login:{width:360,height:360},contact:{width:400,height:320}},Eg=[{section:"Layout",items:[{type:"navigation",label:"Navigation",...oe.navigation},{type:"header",label:"Header",...oe.header},{type:"hero",label:"Hero",...oe.hero},{type:"section",label:"Section",...oe.section},{type:"sidebar",label:"Sidebar",...oe.sidebar},{type:"footer",label:"Footer",...oe.footer},{type:"modal",label:"Modal",...oe.modal},{type:"banner",label:"Banner",...oe.banner},{type:"drawer",label:"Drawer",...oe.drawer},{type:"popover",label:"Popover",...oe.popover},{type:"divider",label:"Divider",...oe.divider}]},{section:"Content",items:[{type:"card",label:"Card",...oe.card},{type:"text",label:"Text",...oe.text},{type:"image",label:"Image",...oe.image},{type:"video",label:"Video",...oe.video},{type:"table",label:"Table",...oe.table},{type:"grid",label:"Grid",...oe.grid},{type:"list",label:"List",...oe.list},{type:"chart",label:"Chart",...oe.chart},{type:"codeBlock",label:"Code Block",...oe.codeBlock},{type:"map",label:"Map",...oe.map},{type:"timeline",label:"Timeline",...oe.timeline},{type:"calendar",label:"Calendar",...oe.calendar},{type:"accordion",label:"Accordion",...oe.accordion},{type:"carousel",label:"Carousel",...oe.carousel},{type:"logo",label:"Logo",...oe.logo},{type:"faq",label:"FAQ",...oe.faq},{type:"gallery",label:"Gallery",...oe.gallery}]},{section:"Controls",items:[{type:"button",label:"Button",...oe.button},{type:"input",label:"Input",...oe.input},{type:"search",label:"Search",...oe.search},{type:"form",label:"Form",...oe.form},{type:"tabs",label:"Tabs",...oe.tabs},{type:"dropdown",label:"Dropdown",...oe.dropdown},{type:"toggle",label:"Toggle",...oe.toggle},{type:"stepper",label:"Stepper",...oe.stepper},{type:"rating",label:"Rating",...oe.rating},{type:"fileUpload",label:"File Upload",...oe.fileUpload},{type:"checkbox",label:"Checkbox",...oe.checkbox},{type:"radio",label:"Radio",...oe.radio},{type:"slider",label:"Slider",...oe.slider},{type:"datePicker",label:"Date Picker",...oe.datePicker}]},{section:"Elements",items:[{type:"avatar",label:"Avatar",...oe.avatar},{type:"badge",label:"Badge",...oe.badge},{type:"tag",label:"Tag",...oe.tag},{type:"breadcrumb",label:"Breadcrumb",...oe.breadcrumb},{type:"pagination",label:"Pagination",...oe.pagination},{type:"progress",label:"Progress",...oe.progress},{type:"alert",label:"Alert",...oe.alert},{type:"toast",label:"Toast",...oe.toast},{type:"notification",label:"Notification",...oe.notification},{type:"tooltip",label:"Tooltip",...oe.tooltip},{type:"stat",label:"Stat",...oe.stat},{type:"skeleton",label:"Skeleton",...oe.skeleton},{type:"chip",label:"Chip",...oe.chip},{type:"icon",label:"Icon",...oe.icon},{type:"spinner",label:"Spinner",...oe.spinner}]},{section:"Blocks",items:[{type:"pricing",label:"Pricing",...oe.pricing},{type:"testimonial",label:"Testimonial",...oe.testimonial},{type:"cta",label:"CTA",...oe.cta},{type:"productCard",label:"Product Card",...oe.productCard},{type:"profile",label:"Profile",...oe.profile},{type:"feature",label:"Feature",...oe.feature},{type:"team",label:"Team",...oe.team},{type:"login",label:"Login",...oe.login},{type:"contact",label:"Contact",...oe.contact}]}],_o={};for(let e of Eg)for(let t of e.items)_o[t.type]=t;function F({w:e,h:t=3,strong:n}){return(0,d.jsx)("div",{style:{width:typeof e=="number"?`${e}px`:e,height:t,borderRadius:2,background:n?"var(--agd-bar-strong)":"var(--agd-bar)",flexShrink:0}})}function _t({w:e,h:t,radius:n=3,style:o}){return(0,d.jsx)("div",{style:{width:typeof e=="number"?`${e}px`:e,height:typeof t=="number"?`${t}px`:t,borderRadius:n,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0,...o}})}function mn({size:e}){return(0,d.jsx)("div",{style:{width:e,height:e,borderRadius:"50%",border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0}})}function D2({width:e,height:t}){let n=Math.max(8,t*.2);return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",height:"100%",padding:`0 ${n}px`,gap:e*.02},children:[(0,d.jsx)(_t,{w:Math.max(20,t*.5),h:Math.max(12,t*.4),radius:2}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",gap:e*.03,marginLeft:e*.04},children:[(0,d.jsx)(F,{w:e*.06}),(0,d.jsx)(F,{w:e*.07}),(0,d.jsx)(F,{w:e*.05}),(0,d.jsx)(F,{w:e*.06})]}),(0,d.jsx)(_t,{w:e*.1,h:Math.min(28,t*.5),radius:4})]})}function B2({width:e,height:t,text:n}){return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:t*.05},children:[n?(0,d.jsx)("span",{style:{fontSize:Math.min(20,t*.08),fontWeight:600,color:"var(--agd-text-3)",textAlign:"center",maxWidth:"80%"},children:n}):(0,d.jsx)(F,{w:e*.5,h:Math.max(6,t*.04),strong:!0}),(0,d.jsx)(F,{w:e*.6}),(0,d.jsx)(F,{w:e*.4}),(0,d.jsx)(_t,{w:Math.min(140,e*.2),h:Math.min(36,t*.12),radius:6,style:{marginTop:t*.06}})]})}function z2({width:e,height:t}){let n=Math.max(3,Math.floor(t/36));return(0,d.jsxs)("div",{style:{padding:e*.08,display:"flex",flexDirection:"column",gap:t*.03},children:[(0,d.jsx)(F,{w:e*.6,h:4,strong:!0}),Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,d.jsx)(_t,{w:10,h:10,radius:2}),(0,d.jsx)(F,{w:e*(.4+r*17%30/100)})]},r))]})}function O2({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/160)));return(0,d.jsx)("div",{style:{display:"flex",padding:`${t*.12}px ${e*.03}px`,gap:e*.05},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsx)(F,{w:"60%",h:3,strong:!0}),(0,d.jsx)(F,{w:"80%",h:2}),(0,d.jsx)(F,{w:"70%",h:2}),(0,d.jsx)(F,{w:"60%",h:2})]},r))})}function A2({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsxs)("div",{style:{padding:"10px 12px",borderBottom:"1px solid var(--agd-stroke)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,d.jsx)(F,{w:e*.3,h:4,strong:!0}),(0,d.jsx)("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),(0,d.jsxs)("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[(0,d.jsx)(F,{w:"90%"}),(0,d.jsx)(F,{w:"70%"}),(0,d.jsx)(F,{w:"80%"})]}),(0,d.jsxs)("div",{style:{padding:"10px 12px",borderTop:"1px solid var(--agd-stroke)",display:"flex",justifyContent:"flex-end",gap:8},children:[(0,d.jsx)(_t,{w:70,h:26,radius:4}),(0,d.jsx)(_t,{w:70,h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})}function F2({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsx)("div",{style:{height:"40%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),(0,d.jsxs)("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,d.jsx)(F,{w:"70%",h:4,strong:!0}),(0,d.jsx)(F,{w:"95%",h:2}),(0,d.jsx)(F,{w:"85%",h:2}),(0,d.jsx)(F,{w:"50%",h:2})]})]})}function W2({width:e,height:t,text:n}){if(n)return(0,d.jsx)("div",{style:{padding:4,fontSize:Math.min(14,t*.3),lineHeight:1.5,color:"var(--agd-text-3)",wordBreak:"break-word",overflow:"hidden"},children:n});let o=Math.max(2,Math.floor(t/18));return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:6,padding:4},children:[(0,d.jsx)(F,{w:e*.6,h:5,strong:!0}),Array.from({length:o},(r,i)=>(0,d.jsx)(F,{w:`${70+i*13%25}%`,h:2},i))]})}function j2({width:e,height:t}){return(0,d.jsx)("div",{style:{height:"100%",position:"relative"},children:(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,preserveAspectRatio:"none",fill:"none",children:[(0,d.jsx)("line",{x1:"0",y1:"0",x2:e,y2:t,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,d.jsx)("line",{x1:e,y1:"0",x2:"0",y2:t,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,d.jsx)("circle",{cx:e*.3,cy:t*.3,r:Math.min(e,t)*.08,fill:"var(--agd-fill)",stroke:"var(--agd-stroke)",strokeWidth:"0.8"})]})})}function H2({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(e/100))),o=Math.max(2,Math.min(6,Math.floor(t/32)));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsx)("div",{style:{display:"flex",borderBottom:"1px solid var(--agd-stroke)",padding:"6px 0"},children:Array.from({length:n},(r,i)=>(0,d.jsx)("div",{style:{flex:1,padding:"0 8px"},children:(0,d.jsx)(F,{w:"70%",h:3,strong:!0})},i))}),Array.from({length:o},(r,i)=>(0,d.jsx)("div",{style:{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.03)",padding:"6px 0"},children:Array.from({length:n},(l,s)=>(0,d.jsx)("div",{style:{flex:1,padding:"0 8px"},children:(0,d.jsx)(F,{w:`${50+(i*7+s*13)%40}%`,h:2})},s))},i))]})}function U2({width:e,height:t}){let n=Math.max(2,Math.floor(t/28));return(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:4,padding:4},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"4px 0"},children:[(0,d.jsx)(mn,{size:8}),(0,d.jsx)(F,{w:`${55+r*17%35}%`,h:2})]},r))})}function Y2({width:e,height:t,text:n}){return(0,d.jsx)("div",{style:{height:"100%",borderRadius:Math.min(8,t/3),border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:n?(0,d.jsx)("span",{style:{fontSize:Math.min(13,t*.4),fontWeight:500,color:"var(--agd-text-3)",letterSpacing:"-0.01em"},children:n}):(0,d.jsx)(F,{w:Math.max(20,e*.5),h:3,strong:!0})})}function Q2({width:e,height:t}){return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:4,height:"100%",justifyContent:"center"},children:[(0,d.jsx)(F,{w:Math.min(80,e*.3),h:2}),(0,d.jsx)("div",{style:{height:Math.min(36,t*.6),borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",paddingLeft:8},children:(0,d.jsx)(F,{w:"40%",h:2})})]})}function V2({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(t/56)));return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:t*.04,padding:8},children:[Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsx)(F,{w:60+r*17%30,h:2}),(0,d.jsx)(_t,{w:"100%",h:28,radius:4})]},r)),(0,d.jsx)(_t,{w:Math.min(120,e*.35),h:30,radius:6,style:{marginTop:8,alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}function X2({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120)));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsx)("div",{style:{display:"flex",gap:2,borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:n},(o,r)=>(0,d.jsx)("div",{style:{padding:"8px 12px",borderBottom:r===0?"2px solid var(--agd-bar-strong)":"none"},children:(0,d.jsx)(F,{w:60,h:3,strong:r===0})},r))}),(0,d.jsxs)("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[(0,d.jsx)(F,{w:"80%",h:2}),(0,d.jsx)(F,{w:"65%",h:2}),(0,d.jsx)(F,{w:"75%",h:2})]})]})}function G2({width:e,height:t}){let n=Math.min(e,t)/2;return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("circle",{cx:e/2,cy:t/2,r:n-1,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"1.5",strokeDasharray:"3 2"}),(0,d.jsx)("circle",{cx:e/2,cy:t*.38,r:n*.28,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"}),(0,d.jsx)("path",{d:`M${e/2-n*.55} ${t*.78} C${e/2-n*.55} ${t*.55} ${e/2+n*.55} ${t*.55} ${e/2+n*.55} ${t*.78}`,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"})]})}function q2({width:e,height:t}){return(0,d.jsx)("div",{style:{height:"100%",borderRadius:t/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)(F,{w:Math.max(16,e*.5),h:2,strong:!0})})}function K2({width:e,height:t}){return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:t*.08},children:[(0,d.jsx)(F,{w:e*.5,h:Math.max(5,t*.06),strong:!0}),(0,d.jsx)(F,{w:e*.35})]})}function J2({width:e,height:t}){return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"100%",gap:t*.04,padding:e*.04},children:[(0,d.jsx)(F,{w:e*.3,h:4,strong:!0}),(0,d.jsx)(F,{w:e*.7}),(0,d.jsx)(F,{w:e*.5}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",gap:e*.03,marginTop:t*.06},children:[(0,d.jsx)(_t,{w:"33%",h:"100%",radius:4}),(0,d.jsx)(_t,{w:"33%",h:"100%",radius:4}),(0,d.jsx)(_t,{w:"33%",h:"100%",radius:4})]})]})}function Z2({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/140))),o=Math.max(1,Math.min(3,Math.floor(t/120)));return(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gridTemplateRows:`repeat(${o}, 1fr)`,gap:6,height:"100%"},children:Array.from({length:n*o},(r,i)=>(0,d.jsx)(_t,{w:"100%",h:"100%",radius:4},i))})}function ex({width:e,height:t}){let n=Math.max(2,Math.floor((t-32)/28));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsx)("div",{style:{padding:"6px 8px",borderBottom:"1px solid var(--agd-stroke)"},children:(0,d.jsx)(F,{w:e*.5,h:3,strong:!0})}),(0,d.jsx)("div",{style:{flex:1,padding:4,display:"flex",flexDirection:"column",gap:2},children:Array.from({length:n},(o,r)=>(0,d.jsx)("div",{style:{padding:"4px 6px",borderRadius:3,background:r===0?"var(--agd-fill)":"transparent"},children:(0,d.jsx)(F,{w:`${50+r*17%35}%`,h:2,strong:r===0})},r))})]})}function tx({width:e,height:t}){let n=Math.min(e,t)/2;return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("rect",{x:"1",y:"1",width:e-2,height:t-2,rx:n,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,d.jsx)("circle",{cx:e-n,cy:t/2,r:n*.7,fill:"var(--agd-bar)"})]})}function nx({width:e,height:t}){let n=Math.min(t/2,20);return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:n,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${n*.6}px`,gap:6},children:[(0,d.jsx)(mn,{size:Math.min(14,t*.4)}),(0,d.jsx)(F,{w:"50%",h:2})]})}function ox({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,d.jsx)(mn,{size:Math.min(20,t*.5)}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:"60%",h:3,strong:!0}),(0,d.jsx)(F,{w:"80%",h:2})]}),(0,d.jsx)("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3,flexShrink:0}})]})}function rx({width:e,height:t}){return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("rect",{x:"0",y:"0",width:e,height:t,rx:t/2,stroke:"var(--agd-stroke)",strokeWidth:"0.8"}),(0,d.jsx)("rect",{x:"1",y:"1",width:e*.65,height:t-2,rx:(t-2)/2,fill:"var(--agd-bar)"})]})}function ix({width:e,height:t}){let n=Math.max(3,Math.min(7,Math.floor(e/50))),o=e/(n*2);return(0,d.jsx)("div",{style:{height:"100%",display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"0 4px",borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:n},(r,i)=>{let l=30+(i*37+17)%55;return(0,d.jsx)(_t,{w:o,h:`${l}%`,radius:2},i)})})}function lx({width:e,height:t}){let n=Math.min(e,t)*.12;return(0,d.jsxs)("div",{style:{height:"100%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,d.jsx)(_t,{w:"100%",h:"100%",radius:4}),(0,d.jsx)("div",{style:{position:"absolute",width:n*2,height:n*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)("div",{style:{width:0,height:0,borderLeft:`${n*.6}px solid var(--agd-bar-strong)`,borderTop:`${n*.4}px solid transparent`,borderBottom:`${n*.4}px solid transparent`,marginLeft:n*.15}})})]})}function sx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsx)("div",{style:{flex:1,width:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)(F,{w:"60%",h:2})}),(0,d.jsx)("div",{style:{width:8,height:8,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-5}})]})}function ax({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/80)));return(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",height:"100%",gap:4},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[r>0&&(0,d.jsx)("span",{style:{color:"var(--agd-stroke)",fontSize:10},children:"/"}),(0,d.jsx)(F,{w:40+r*13%20,h:2,strong:r===n-1})]},r))})}function cx({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(e/40))),o=Math.min(28,t*.8);return(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:4},children:Array.from({length:n},(r,i)=>(0,d.jsx)(_t,{w:o,h:o,radius:4,style:i===1?{background:"var(--agd-bar)"}:void 0},i))})}function dx({width:e}){return(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",height:"100%"},children:(0,d.jsx)("div",{style:{width:"100%",height:1,background:"var(--agd-stroke)"}})})}function ux({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(t/40)));return(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:r===0?2:1},children:[(0,d.jsx)(F,{w:`${40+r*17%25}%`,h:3,strong:!0}),(0,d.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:r===0?"\u25BC":"\u25B6"})]},r))})}function _x({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:6},children:[(0,d.jsxs)("div",{style:{flex:1,display:"flex",gap:6,alignItems:"center"},children:[(0,d.jsx)("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"\u2039"}),(0,d.jsx)(_t,{w:"100%",h:"100%",radius:4}),(0,d.jsx)("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"center",gap:4},children:[(0,d.jsx)(mn,{size:5}),(0,d.jsx)(mn,{size:5}),(0,d.jsx)(mn,{size:5})]})]})}function fx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,gap:t*.04},children:[(0,d.jsx)(F,{w:e*.4,h:3,strong:!0}),(0,d.jsx)(F,{w:e*.3,h:6,strong:!0}),(0,d.jsx)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,width:"100%",padding:"8px 0"},children:Array.from({length:4},(n,o)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[(0,d.jsx)(mn,{size:5}),(0,d.jsx)(F,{w:`${50+o*17%35}%`,h:2})]},o))}),(0,d.jsx)(_t,{w:e*.7,h:Math.min(32,t*.1),radius:6,style:{background:"var(--agd-bar)"}})]})}function hx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:8},children:[(0,d.jsx)("span",{style:{fontSize:18,lineHeight:1,color:"var(--agd-stroke)",fontFamily:"serif"},children:"\u201C"}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsx)(F,{w:"90%",h:2}),(0,d.jsx)(F,{w:"75%",h:2}),(0,d.jsx)(F,{w:"60%",h:2})]}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,d.jsx)(mn,{size:20}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[(0,d.jsx)(F,{w:60,h:3,strong:!0}),(0,d.jsx)(F,{w:40,h:2})]})]})]})}function px({width:e,height:t}){return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:t*.08},children:[(0,d.jsx)(F,{w:e*.5,h:Math.max(4,t*.05),strong:!0}),(0,d.jsx)(F,{w:e*.35}),(0,d.jsx)(_t,{w:Math.min(140,e*.25),h:Math.min(32,t*.15),radius:6,style:{marginTop:t*.04,background:"var(--agd-bar)"}})]})}function mx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,d.jsx)("div",{style:{width:16,height:16,borderRadius:"50%",border:"1.5px solid var(--agd-bar-strong)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:(0,d.jsx)("div",{style:{width:2,height:6,background:"var(--agd-bar-strong)",borderRadius:1}})}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:"40%",h:3,strong:!0}),(0,d.jsx)(F,{w:"70%",h:2})]})]})}function gx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"0 12px"},children:[(0,d.jsx)(F,{w:e*.4,h:3,strong:!0}),(0,d.jsx)(_t,{w:60,h:Math.min(24,t*.6),radius:4})]})}function yx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:t*.06},children:[(0,d.jsx)(F,{w:e*.5,h:2}),(0,d.jsx)(F,{w:e*.4,h:Math.max(8,t*.18),strong:!0}),(0,d.jsx)(F,{w:e*.3,h:2})]})}function xx({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(e/100))),o=Math.min(12,t*.35);return(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 8px"},children:Array.from({length:n},(r,i)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:0,flex:1},children:[(0,d.jsx)("div",{style:{width:o,height:o,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:i===0?"var(--agd-bar)":"transparent",flexShrink:0}}),i<n-1&&(0,d.jsx)("div",{style:{flex:1,height:1,background:"var(--agd-stroke)",margin:"0 4px"}})]},i))})}function vx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:4,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"0 6px"},children:[(0,d.jsx)(F,{w:Math.max(16,e*.5),h:2,strong:!0}),(0,d.jsx)("div",{style:{width:8,height:8,borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0}})]})}function wx({width:e,height:t}){let o=Math.min(t*.7,e/7.5);return(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:o*.2},children:Array.from({length:5},(r,i)=>(0,d.jsx)("svg",{width:o,height:o,viewBox:"0 0 16 16",fill:"none",children:(0,d.jsx)("path",{d:"M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z",stroke:"var(--agd-stroke)",strokeWidth:"0.8",fill:i<3?"var(--agd-bar)":"none"})},i))})}function bx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",position:"relative",borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",overflow:"hidden"},children:[(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",style:{position:"absolute",inset:0},children:[(0,d.jsx)("line",{x1:0,y1:t*.3,x2:e,y2:t*.7,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".2"}),(0,d.jsx)("line",{x1:0,y1:t*.6,x2:e,y2:t*.2,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"}),(0,d.jsx)("line",{x1:e*.4,y1:0,x2:e*.6,y2:t,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"})]}),(0,d.jsx)("div",{style:{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%, -100%)"},children:(0,d.jsxs)("svg",{width:"16",height:"22",viewBox:"0 0 16 22",fill:"none",children:[(0,d.jsx)("path",{d:"M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z",fill:"var(--agd-bar)",opacity:".4"}),(0,d.jsx)("circle",{cx:"8",cy:"8",r:"3",fill:"var(--agd-fill)"})]})})]})}function kx({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(t/60)));return(0,d.jsxs)("div",{style:{display:"flex",height:"100%",padding:"8px 0"},children:[(0,d.jsx)("div",{style:{width:16,display:"flex",flexDirection:"column",alignItems:"center"},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)(mn,{size:8}),r<n-1&&(0,d.jsx)("div",{style:{flex:1,width:1,background:"var(--agd-stroke)"}})]},r))}),(0,d.jsx)("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-around",paddingLeft:8},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:`${35+r*13%25}%`,h:3,strong:!0}),(0,d.jsx)(F,{w:`${50+r*17%30}%`,h:2})]},r))})]})}function Cx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"2px dashed var(--agd-stroke)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:t*.06},children:[(0,d.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[(0,d.jsx)("path",{d:"M12 16V4m0 0l-4 4m4-4l4 4",stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,d.jsx)("path",{d:"M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2",stroke:"var(--agd-stroke)",strokeWidth:"1.5"})]}),(0,d.jsx)(F,{w:e*.4,h:2}),(0,d.jsx)(F,{w:e*.25,h:2})]})}function Sx({width:e,height:t}){let n=Math.max(3,Math.min(8,Math.floor(t/20)));return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:6,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",padding:8,display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsxs)("div",{style:{display:"flex",gap:3,marginBottom:4},children:[(0,d.jsx)(mn,{size:6}),(0,d.jsx)(mn,{size:6}),(0,d.jsx)(mn,{size:6})]}),Array.from({length:n},(o,r)=>(0,d.jsx)("div",{style:{display:"flex",gap:6,paddingLeft:r>0&&r<n-1?12:0},children:(0,d.jsx)(F,{w:`${25+r*23%50}%`,h:2,strong:r===0})},r))]})}function Ex({width:e,height:t}){let r=Math.min((e-16)/7,(t-40)/6);return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px"},children:[(0,d.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"\u2039"}),(0,d.jsx)(F,{w:e*.3,h:3,strong:!0}),(0,d.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:2,padding:"0 4px",flex:1},children:[Array.from({length:7},(i,l)=>(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:r*.6},children:(0,d.jsx)(F,{w:r*.5,h:2})},`h${l}`)),Array.from({length:7*5},(i,l)=>(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:r},children:(0,d.jsx)("div",{style:{width:r*.6,height:r*.6,borderRadius:"50%",background:l===12?"var(--agd-bar)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)("div",{style:{width:2,height:2,borderRadius:1,background:"var(--agd-bar-strong)",opacity:l===12?1:.3}})})},l))]})]})}function Mx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,d.jsx)(mn,{size:Math.min(32,t*.55)}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:"50%",h:3,strong:!0}),(0,d.jsx)(F,{w:"75%",h:2})]}),(0,d.jsx)(F,{w:30,h:2})]})}function Lx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,d.jsx)("div",{style:{height:"50%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),(0,d.jsxs)("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,d.jsx)(F,{w:"65%",h:4,strong:!0}),(0,d.jsx)(F,{w:"40%",h:3}),(0,d.jsx)("div",{style:{flex:1}}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,d.jsx)(F,{w:"30%",h:5,strong:!0}),(0,d.jsx)(_t,{w:Math.min(70,e*.3),h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})]})}function Nx({width:e,height:t}){let n=Math.min(48,t*.3);return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:t*.06},children:[(0,d.jsx)(mn,{size:n}),(0,d.jsx)(F,{w:e*.45,h:4,strong:!0}),(0,d.jsx)(F,{w:e*.3,h:2}),(0,d.jsxs)("div",{style:{display:"flex",gap:e*.08,marginTop:t*.04},children:[(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,d.jsx)(F,{w:20,h:3,strong:!0}),(0,d.jsx)(F,{w:28,h:2})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,d.jsx)(F,{w:20,h:3,strong:!0}),(0,d.jsx)(F,{w:28,h:2})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,d.jsx)(F,{w:20,h:3,strong:!0}),(0,d.jsx)(F,{w:28,h:2})]})]})]})}function Ix({width:e,height:t}){let n=Math.max(e*.6,80),o=Math.max(3,Math.floor(t/40));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex"},children:[(0,d.jsx)("div",{style:{width:e-n,background:"var(--agd-fill)",opacity:.3}}),(0,d.jsxs)("div",{style:{flex:1,borderLeft:"1px solid var(--agd-stroke)",display:"flex",flexDirection:"column",padding:e*.04},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:t*.06},children:[(0,d.jsx)(F,{w:n*.4,h:4,strong:!0}),(0,d.jsx)("div",{style:{width:12,height:12,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),Array.from({length:o},(r,i)=>(0,d.jsx)("div",{style:{padding:"6px 0"},children:(0,d.jsx)(F,{w:`${50+i*17%35}%`,h:2,strong:i===0})},i))]})]})}function Rx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsxs)("div",{style:{flex:1,width:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,d.jsx)(F,{w:"70%",h:3,strong:!0}),(0,d.jsx)(F,{w:"90%",h:2}),(0,d.jsx)(F,{w:"60%",h:2})]}),(0,d.jsx)("div",{style:{width:10,height:10,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-6}})]})}function $x({width:e,height:t}){let n=Math.min(t*.7,e*.3);return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:e*.08},children:[(0,d.jsx)(_t,{w:n,h:n,radius:n*.25}),(0,d.jsx)(F,{w:e*.45,h:Math.max(4,t*.2),strong:!0})]})}function Tx({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(t/56)));return(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:r===0?2:1},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,d.jsx)("span",{style:{fontSize:9,fontWeight:700,color:"var(--agd-stroke)"},children:"Q"}),(0,d.jsx)(F,{w:e*(.3+r*13%25/100),h:3,strong:!0})]}),(0,d.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:r===0?"\u25BC":"\u25B6"})]},r))})}function Px({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120))),o=Math.max(1,Math.min(3,Math.floor(t/120)));return(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gridTemplateRows:`repeat(${o}, 1fr)`,gap:4,height:"100%"},children:Array.from({length:n*o},(r,i)=>(0,d.jsx)("div",{style:{borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",position:"relative",overflow:"hidden"},children:(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"none",fill:"none",children:[(0,d.jsx)("line",{x1:"0",y1:"0",x2:"100",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"}),(0,d.jsx)("line",{x1:"100",y1:"0",x2:"0",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})},i))})}function Dx({width:e,height:t}){let n=Math.min(e,t);return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("rect",{x:"1",y:(t-n+2)/2,width:n-2,height:n-2,rx:n*.15,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,d.jsx)("path",{d:`M${n*.25} ${t/2}l${n*.2} ${n*.2} ${n*.3}-${n*.35}`,stroke:"var(--agd-bar)",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function Bx({width:e,height:t}){let n=Math.min(e,t)/2-1;return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("circle",{cx:e/2,cy:t/2,r:n,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,d.jsx)("circle",{cx:e/2,cy:t/2,r:n*.45,fill:"var(--agd-bar)"})]})}function zx({width:e,height:t}){let n=Math.max(2,t*.12),o=Math.min(t*.35,10),r=e*.55;return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",position:"relative"},children:[(0,d.jsx)("div",{style:{width:"100%",height:n,borderRadius:n/2,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",position:"relative"},children:(0,d.jsx)("div",{style:{width:r,height:"100%",borderRadius:n/2,background:"var(--agd-bar)"}})}),(0,d.jsx)("div",{style:{position:"absolute",left:r-o,width:o*2,height:o*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)"}})]})}function Ox({width:e,height:t}){let n=Math.min(36,t*.15),o=7,r=4,i=Math.min((e-16)/o,(t-n-40)/(r+1));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsxs)("div",{style:{height:n,borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 8px",justifyContent:"space-between"},children:[(0,d.jsx)(F,{w:"40%",h:2}),(0,d.jsxs)("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",children:[(0,d.jsx)("rect",{x:"2",y:"3",width:"12",height:"11",rx:"1",stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,d.jsx)("line",{x1:"2",y1:"6",x2:"14",y2:"6",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})]}),(0,d.jsxs)("div",{style:{flex:1,borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",flexDirection:"column"},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 6px"},children:[(0,d.jsx)("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"\u2039"}),(0,d.jsx)(F,{w:e*.25,h:2,strong:!0}),(0,d.jsx)("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${o}, 1fr)`,gap:1,padding:"0 4px",flex:1},children:Array.from({length:o*r},(l,s)=>(0,d.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:i},children:(0,d.jsx)("div",{style:{width:i*.5,height:i*.5,borderRadius:"50%",background:s===10?"var(--agd-bar)":"transparent"},children:(0,d.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)("div",{style:{width:1.5,height:1.5,borderRadius:1,background:"var(--agd-bar-strong)",opacity:s===10?1:.25}})})})},s))})]})]})}function Ax({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:t*.08,padding:4},children:[(0,d.jsx)("div",{style:{width:"100%",height:t*.2,borderRadius:4,background:"var(--agd-fill)"}}),(0,d.jsx)("div",{style:{width:"70%",height:Math.max(6,t*.1),borderRadius:3,background:"var(--agd-fill)"}}),(0,d.jsx)("div",{style:{width:"90%",height:Math.max(4,t*.06),borderRadius:3,background:"var(--agd-fill)"}}),(0,d.jsx)("div",{style:{width:"50%",height:Math.max(4,t*.06),borderRadius:3,background:"var(--agd-fill)"}})]})}function Fx({width:e,height:t}){return(0,d.jsx)("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:6},children:(0,d.jsxs)("div",{style:{height:"100%",flex:1,borderRadius:t/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${t*.3}px`,gap:4},children:[(0,d.jsx)(F,{w:"60%",h:2,strong:!0}),(0,d.jsx)("div",{style:{width:Math.max(6,t*.3),height:Math.max(6,t*.3),borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0,marginLeft:"auto"}})]})})}function Wx({width:e,height:t}){let n=Math.min(e,t);return(0,d.jsx)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:(0,d.jsx)("path",{d:`M${e/2} ${(t-n)/2+n*.1}l${n*.12} ${n*.25} ${n*.28} ${n*.04}-${n*.2} ${n*.2} ${n*.05} ${n*.28}-${n*.25}-${n*.12}-${n*.25} ${n*.12} ${n*.05}-${n*.28}-${n*.2}-${n*.2} ${n*.28}-${n*.04}z`,stroke:"var(--agd-stroke)",strokeWidth:"1",fill:"var(--agd-fill)"})})}function jx({width:e,height:t}){let n=Math.min(e,t)/2-2;return(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${e} ${t}`,fill:"none",children:[(0,d.jsx)("circle",{cx:e/2,cy:t/2,r:n,stroke:"var(--agd-stroke)",strokeWidth:"1.5",opacity:".2"}),(0,d.jsx)("path",{d:`M${e/2} ${t/2-n}a${n} ${n} 0 0 1 ${n} ${n}`,stroke:"var(--agd-bar-strong)",strokeWidth:"1.5",strokeLinecap:"round"})]})}function Hx({width:e,height:t}){let n=Math.min(36,t*.25,e*.12),o=Math.max(1,Math.min(3,Math.floor(t/80)));return(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-around",padding:8},children:Array.from({length:o},(r,i)=>(0,d.jsxs)("div",{style:{display:"flex",gap:e*.04,alignItems:"flex-start"},children:[(0,d.jsx)(_t,{w:n,h:n,radius:n*.25}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,d.jsx)(F,{w:`${40+i*13%20}%`,h:3,strong:!0}),(0,d.jsx)(F,{w:`${60+i*17%25}%`,h:2})]})]},i))})}function Ux({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120))),o=Math.min(36,t*.25);return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:t*.06,padding:t*.06},children:[(0,d.jsx)(F,{w:e*.3,h:4,strong:!0}),(0,d.jsx)("div",{style:{display:"flex",gap:e*.06,justifyContent:"center",flex:1,alignItems:"center"},children:Array.from({length:n},(r,i)=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[(0,d.jsx)(mn,{size:o}),(0,d.jsx)(F,{w:e*.12,h:3,strong:!0}),(0,d.jsx)(F,{w:e*.08,h:2})]},i))})]})}function Yx({width:e,height:t}){let n=Math.max(2,Math.min(3,Math.floor(t/80)));return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:e*.06,gap:t*.04},children:[(0,d.jsx)(F,{w:e*.5,h:Math.max(5,t*.04),strong:!0}),(0,d.jsx)(F,{w:e*.35,h:2}),(0,d.jsx)("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:t*.03,marginTop:t*.04},children:Array.from({length:n},(o,r)=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:Math.min(60,e*.2),h:2}),(0,d.jsx)(_t,{w:"100%",h:Math.min(32,t*.1),radius:4})]},r))}),(0,d.jsx)(_t,{w:"100%",h:Math.min(36,t*.12),radius:6,style:{marginTop:t*.03,background:"var(--agd-bar)"}}),(0,d.jsx)(F,{w:e*.4,h:2})]})}function Qx({width:e,height:t}){return(0,d.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:e*.04,gap:t*.03},children:[(0,d.jsx)(F,{w:e*.4,h:4,strong:!0}),(0,d.jsx)(F,{w:e*.6,h:2}),(0,d.jsxs)("div",{style:{display:"flex",gap:6,marginTop:t*.03},children:[(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:50,h:2}),(0,d.jsx)(_t,{w:"100%",h:Math.min(28,t*.1),radius:4})]}),(0,d.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:40,h:2}),(0,d.jsx)(_t,{w:"100%",h:Math.min(28,t*.1),radius:4})]})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,d.jsx)(F,{w:50,h:2}),(0,d.jsx)(_t,{w:"100%",h:Math.min(28,t*.1),radius:4})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3,flex:1},children:[(0,d.jsx)(F,{w:60,h:2}),(0,d.jsx)(_t,{w:"100%",h:"100%",radius:4})]}),(0,d.jsx)(_t,{w:Math.min(120,e*.3),h:Math.min(30,t*.1),radius:6,style:{alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}var Vx={navigation:D2,hero:B2,sidebar:z2,footer:O2,modal:A2,card:F2,text:W2,image:j2,table:H2,list:U2,button:Y2,input:Q2,form:V2,tabs:X2,avatar:G2,badge:q2,header:K2,section:J2,grid:Z2,dropdown:ex,toggle:tx,search:nx,toast:ox,progress:rx,chart:ix,video:lx,tooltip:sx,breadcrumb:ax,pagination:cx,divider:dx,accordion:ux,carousel:_x,pricing:fx,testimonial:hx,cta:px,alert:mx,banner:gx,stat:yx,stepper:xx,tag:vx,rating:wx,map:bx,timeline:kx,fileUpload:Cx,codeBlock:Sx,calendar:Ex,notification:Mx,productCard:Lx,profile:Nx,drawer:Ix,popover:Rx,logo:$x,faq:Tx,gallery:Px,checkbox:Dx,radio:Bx,slider:zx,datePicker:Ox,skeleton:Ax,chip:Fx,icon:Wx,spinner:jx,feature:Hx,team:Ux,login:Yx,contact:Qx};function Xx({type:e,width:t,height:n,text:o}){let r=Vx[e];return r?(0,d.jsx)("div",{style:{width:"100%",height:"100%",padding:8,position:"relative",pointerEvents:"none"},children:(0,d.jsx)(r,{width:t,height:n,text:o})}):(0,d.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,d.jsx)("span",{style:{fontSize:10,fontWeight:600,color:"var(--agd-text-3)",textTransform:"uppercase",letterSpacing:"0.06em",opacity:.5},children:e})})}var Gx=`.styles-module__overlay___aWh-q svg[fill=none],
.styles-module__rearrangeOverlay___-3R3t svg[fill=none] {
  fill: none !important;
}
.styles-module__overlay___aWh-q svg[fill=none] :not([fill]),
.styles-module__rearrangeOverlay___-3R3t svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__overlayExiting___iEmYr {
  opacity: 0 !important;
  transition: opacity 0.25s ease !important;
  pointer-events: none !important;
}

.styles-module__overlay___aWh-q {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: auto;
  cursor: default;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
  --agd-stroke: rgba(59, 130, 246, 0.35);
  --agd-fill: rgba(59, 130, 246, 0.06);
  --agd-bar: rgba(59, 130, 246, 0.18);
  --agd-bar-strong: rgba(59, 130, 246, 0.28);
  --agd-text-3: rgba(255, 255, 255, 0.6);
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q.styles-module__light___ORIft {
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) {
  --agd-surface: #141414;
}
.styles-module__overlay___aWh-q.styles-module__wireframe___itvQU {
  --agd-stroke: rgba(249, 115, 22, 0.35);
  --agd-fill: rgba(249, 115, 22, 0.06);
  --agd-bar: rgba(249, 115, 22, 0.18);
  --agd-bar-strong: rgba(249, 115, 22, 0.28);
}
.styles-module__overlay___aWh-q.styles-module__placing___45yD8 {
  cursor: crosshair;
}
.styles-module__overlay___aWh-q.styles-module__passthrough___xaFeE {
  pointer-events: none;
}

.styles-module__blankCanvas___t2Eue {
  position: fixed;
  inset: 0;
  z-index: 99994;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__visible___OKKqX {
  opacity: var(--canvas-opacity, 1);
  pointer-events: auto;
}
.styles-module__blankCanvas___t2Eue::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__gridActive___OZ-cf::after {
  opacity: 1;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.22) 1px, transparent 1px);
}

.styles-module__paletteHeader___-Q5gQ {
  padding: 0 1rem 0.375rem;
}

.styles-module__paletteHeaderTitle___oHqZC {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.0094em;
}
.styles-module__light___ORIft .styles-module__paletteHeaderTitle___oHqZC {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__paletteHeaderDesc___6i74T {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
  line-height: 14px;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T {
  color: rgba(0, 0, 0, 0.45);
}
.styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__paletteHeaderDesc___6i74T a:hover {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__wireframePurposeWrap___To-tS {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__wireframePurposeWrap___To-tS.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__wireframePurposeInner___Lrahs {
  overflow: hidden;
}

.styles-module__wireframePurposeInput___7EtBN {
  display: block;
  width: calc(100% - 2rem);
  margin: 0.25rem 1rem 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN {
  color: rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__canvasToggle___-QqSy {
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0.25rem 1rem 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.styles-module__canvasToggle___-QqSy:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}
.styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy {
  border-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}

.styles-module__canvasToggleIcon___7pJ82 {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__light___ORIft .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(0, 0, 0, 0.25);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__canvasToggleLabel___OanpY {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.0094em;
}
.styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__canvasToggleLabel___OanpY {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}

.styles-module__placement___zcxv8 {
  position: absolute;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.08);
  cursor: grab;
  transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s ease, transform 0.15s ease;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  animation: styles-module__placementEnter___TdRhf 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.styles-module__placement___zcxv8:active {
  cursor: grabbing;
}
.styles-module__placement___zcxv8:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #3c82f7;
  border-style: solid;
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8 {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.08);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.12);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__placement___zcxv8.styles-module__dragging___le6KZ {
  opacity: 0.85;
  z-index: 50;
}
.styles-module__placement___zcxv8.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__placementContent___f64A4 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.styles-module__placementLabel___0KvWl {
  position: absolute;
  top: -18px;
  left: 0;
  font-size: 10px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.7);
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.5);
}
.styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__placementLabel___0KvWl {
  color: rgba(249, 115, 22, 0.7);
}
.styles-module__wireframe___itvQU .styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #f97316;
}

.styles-module__placementAnnotation___78pTr {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__placementAnnotation___78pTr.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__sectionAnnotation___aUIs0 {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(59, 130, 246, 0.6);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__sectionAnnotation___aUIs0.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__handle___Ikbxm {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1.5px solid #3c82f7;
  border-radius: 2px;
  z-index: 12;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.styles-module__placement___zcxv8:hover .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:hover .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:hover .styles-module__handle___Ikbxm, .styles-module__placement___zcxv8:active .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:active .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:active .styles-module__handle___Ikbxm, .styles-module__selected___6yrp6 .styles-module__handle___Ikbxm {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__sectionOutline___s0hy- .styles-module__handle___Ikbxm {
  border-color: inherit;
}
.styles-module__wireframe___itvQU .styles-module__handle___Ikbxm {
  border-color: #f97316;
}

.styles-module__handleNw___4TMIj {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.styles-module__handleNe___mnsTh {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.styles-module__handleSe___oSFnk {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

.styles-module__handleSw___pi--Z {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.styles-module__handleN___aBA-Q,
.styles-module__handleE___0hM5u,
.styles-module__handleS___JjDRv,
.styles-module__handleW___ERWGQ {
  opacity: 0 !important;
  pointer-events: none !important;
}

.styles-module__edgeHandle___XxXdT {
  position: absolute;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__edgeHandle___XxXdT::after {
  content: "";
  position: absolute;
  border-radius: 4px;
  background: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__edgeHandle___XxXdT::after {
  background: #f97316;
}
.styles-module__edgeHandle___XxXdT::after {
  opacity: 0;
  transition: opacity 0.1s ease, transform 0.1s ease;
  transform: scale(0.8);
}
.styles-module__edgeHandle___XxXdT:hover::after {
  opacity: 0.85;
  transform: scale(1);
}
.styles-module__edgeHandle___XxXdT svg {
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.1s ease;
  filter: drop-shadow(0 0 2px var(--agd-surface));
}
.styles-module__edgeHandle___XxXdT:hover svg {
  opacity: 1;
}

.styles-module__edgeN___-JJDj,
.styles-module__edgeS___66lMX {
  left: 12px;
  right: 12px;
  height: 12px;
  cursor: n-resize;
}
.styles-module__edgeN___-JJDj::after,
.styles-module__edgeS___66lMX::after {
  width: 24px;
  height: 4px;
}

.styles-module__edgeN___-JJDj {
  top: -6px;
}

.styles-module__edgeS___66lMX {
  bottom: -6px;
  cursor: s-resize;
}

.styles-module__edgeE___1bGDa,
.styles-module__edgeW___lHQNo {
  top: 12px;
  bottom: 12px;
  width: 12px;
  cursor: e-resize;
}
.styles-module__edgeE___1bGDa::after,
.styles-module__edgeW___lHQNo::after {
  width: 4px;
  height: 24px;
}

.styles-module__edgeE___1bGDa {
  right: -6px;
}

.styles-module__edgeW___lHQNo {
  left: -6px;
  cursor: w-resize;
}

.styles-module__deleteButton___LkGCb {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  z-index: 15;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8);
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.styles-module__placement___zcxv8:hover .styles-module__deleteButton___LkGCb, .styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-:hover .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO:hover .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.styles-module__drawBox___BrVAa {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 2px solid #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
}

.styles-module__selectBox___Iu8kB {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 1px dashed #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 2px;
}

.styles-module__sizeIndicator___7zJ4y {
  position: fixed;
  pointer-events: none;
  z-index: 100001;
  font-size: 10px;
  color: #fff;
  background: #3c82f7;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.styles-module__guideLine___DUQY2 {
  pointer-events: none;
  z-index: 100001;
  background: #f0f;
  opacity: 0.5;
}

.styles-module__dragPreview___onPbU {
  position: fixed;
  z-index: 100002;
  pointer-events: none;
  border: 1.5px dashed #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  color: #3c82f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transition: width 0.08s ease, height 0.08s ease, opacity 0.08s ease;
}

.styles-module__dragPreviewWireframe___jsg0G {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);
}

.styles-module__palette___C7iSH {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  width: 256px;
  overflow: hidden;
  background: #1c1c1c;
  border: none;
  border-radius: 1rem;
  padding: 13px 0 16px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  z-index: 100001;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  cursor: default;
  opacity: 0;
  filter: blur(5px);
}
.styles-module__palette___C7iSH .styles-module__paletteItem___6TlnA,
.styles-module__palette___C7iSH .styles-module__paletteItemLabel___6ncO4,
.styles-module__palette___C7iSH .styles-module__paletteSectionTitle___PqnjX,
.styles-module__palette___C7iSH .styles-module__paletteFooter___QYnAG {
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__palette___C7iSH {
  opacity: 0;
  transform: translateY(var(--panel-offset-y, 4px)) scale(0.98);
  transform-origin: var(--panel-origin, bottom right);
  filter: blur(2px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.styles-module__palette___C7iSH[data-panel-present=true] {
  visibility: visible;
}
.styles-module__palette___C7iSH[data-panel-open=true] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  pointer-events: auto;
  transition-duration: 160ms;
}
@media (prefers-reduced-motion: reduce) {
  .styles-module__palette___C7iSH {
    transition: none;
    transform: none;
    filter: none;
  }
}
.styles-module__palette___C7iSH.styles-module__light___ORIft {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.styles-module__paletteSection___V8DEA {
  padding: 0 1rem;
}
.styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteSectionTitle___PqnjX {
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  padding: 0 0 3px 3px;
}
.styles-module__light___ORIft .styles-module__paletteSectionTitle___PqnjX {
  color: rgba(0, 0, 0, 0.4);
}

.styles-module__paletteItem___6TlnA {
  width: 100%;
  text-align: left;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.25rem;
  margin-bottom: 1px;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
  -webkit-user-select: none;
  user-select: none;
  min-height: 24px;
}
.styles-module__paletteItem___6TlnA:hover {
  background: rgba(255, 255, 255, 0.1);
}
.styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}

.styles-module__paletteItemIcon___0NPQK {
  width: 20px;
  height: 16px;
  border-radius: 2px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.45);
}
.styles-module__paletteItemIcon___0NPQK svg {
  display: block;
  width: 20px;
  height: 16px;
}
.styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__paletteItemLabel___6ncO4 {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: -0.0094em;
  line-height: 1;
  min-width: 0;
}
.styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}
.styles-module__light___ORIft .styles-module__paletteItemLabel___6ncO4 {
  color: rgba(0, 0, 0, 0.7);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}

.styles-module__placeScroll___7sClM {
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0.25rem;
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px);
}
.styles-module__placeScroll___7sClM.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar {
  width: 3px;
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}
.styles-module__light___ORIft .styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}

.styles-module__paletteFooterWrap___71-fI {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__paletteFooterWrap___71-fI.styles-module__footerHidden___fJUik {
  grid-template-rows: 0fr;
}

.styles-module__paletteFooterInnerContent___VC26h {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__footerHidden___fJUik .styles-module__paletteFooterInnerContent___VC26h {
  opacity: 0;
  transform: translateY(4px);
}

.styles-module__paletteFooterInner___dfylY {
  overflow: hidden;
}

.styles-module__paletteFooter___QYnAG {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  padding: 0 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteFooter___QYnAG {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteFooterCount___D3Fia {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterCount___D3Fia {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__paletteFooterClear___ybBoa {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.15s ease;
}
.styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__paletteFooterActions___fLzv8 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.styles-module__rollingWrap___S75jM {
  display: inline-block;
  overflow: hidden;
  height: 1.15em;
  position: relative;
  vertical-align: bottom;
}

.styles-module__rollingNum___1RKDx {
  position: absolute;
  left: 0;
  top: 0;
}

.styles-module__exitUp___AFDRW {
  animation: styles-module__numExitUp___FRQqx 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterUp___CPlXb {
  animation: styles-module__numEnterUp___2Yd-w 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__exitDown___-1yAy {
  animation: styles-module__numExitDown___xm5by 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterDown___DDuFR {
  animation: styles-module__numEnterDown___hpxBk 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

@keyframes styles-module__numExitUp___FRQqx {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterUp___2Yd-w {
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes styles-module__numExitDown___xm5by {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterDown___hpxBk {
  from {
    transform: translateY(-110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.styles-module__rearrangeOverlay___-3R3t {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: none;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
}

.styles-module__hoverHighlight___8eT-v {
  position: fixed;
  pointer-events: none;
  z-index: 99994;
  border: 2px dashed rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.06);
  animation: styles-module__highlightFadeIn___Lg7KY 0.12s ease;
}

.styles-module__sectionOutline___s0hy- {
  position: fixed;
  border: 2px solid;
  border-radius: 4px;
  cursor: grab;
}
.styles-module__sectionOutline___s0hy-:active {
  cursor: grabbing;
}
.styles-module__sectionOutline___s0hy- {
  transition: box-shadow 0.15s, border-color 0.3s, background-color 0.3s, border-style 0s;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}
.styles-module__sectionOutline___s0hy-:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 {
  border-style: solid;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) {
  border: 1.5px dashed rgba(150, 150, 150, 0.35);
  background-color: transparent !important;
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover {
  border-color: rgba(150, 150, 150, 0.6);
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionLabel___F80HQ {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionLabel___F80HQ {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__movedBadge___s8z-q,
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionDimensions___RcJSL {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionDimensions___RcJSL {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__sectionLabel___F80HQ {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 8px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__movedBadge___s8z-q {
  position: absolute;
  bottom: 22px;
  right: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__movedBadge___s8z-q.styles-module__badgeVisible___npbdS {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.styles-module__resizedBadge___u51V8 {
  background: #3c82f7;
  bottom: 40px;
}

.styles-module__sectionDimensions___RcJSL {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.styles-module__light___ORIft .styles-module__sectionDimensions___RcJSL {
  color: rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.7);
}

.styles-module__wireframeNotice___4GJyB {
  position: fixed;
  bottom: 16px;
  left: 24px;
  z-index: 99995;
  font-size: 9.5px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: auto;
  animation: styles-module__overlayFadeIn___aECVy 0.3s ease;
  line-height: 1.5;
  max-width: 280px;
}

.styles-module__wireframeOpacityRow___CJXzi {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.styles-module__wireframeOpacityLabel___afkfT {
  font-size: 9px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.32);
  letter-spacing: 0.02em;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
}

.styles-module__wireframeOpacitySlider___YcoEs {
  -webkit-appearance: none;
  appearance: none;
  width: 56px;
  height: 4px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs:hover {
  background: rgba(0, 0, 0, 0.13);
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb:hover {
  background: rgb(88.0082041185%, 37.39404381%, 2.2663056855%);
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  border: none;
  cursor: pointer;
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-track {
  background: rgba(0, 0, 0, 0.08);
  height: 4px;
  border-radius: 2px;
}

.styles-module__wireframeNoticeTitleRow___PJqyG {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
}

.styles-module__wireframeNoticeTitle___okr08 {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
}

.styles-module__wireframeNoticeDivider___PNKQ6 {
  width: 1px;
  height: 8px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0 8px;
  flex-shrink: 0;
}

.styles-module__wireframeStartOver___YFk-I {
  font-size: 9.5px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  text-decoration: none;
  transition: color 0.12s ease;
  white-space: nowrap;
}
.styles-module__wireframeStartOver___YFk-I:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__ghostOutline___po-kO {
  position: fixed;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.04);
  cursor: grab;
  opacity: 0.5;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__ghostEnter___EC3Mb 0.25s ease;
  transition: box-shadow 0.15s, border-color 0.3s, opacity 0.25s;
}
.styles-module__ghostOutline___po-kO:active {
  cursor: grabbing;
}
.styles-module__ghostOutline___po-kO:hover {
  opacity: 0.7;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
}
.styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 {
  opacity: 1;
  border-style: solid;
  border-width: 2px;
  border-color: #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__ghostOutline___po-kO.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__ghostBadge___tsQUK {
  position: absolute;
  bottom: calc(100% + 4px);
  left: -1px;
  font-size: 9px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.2;
  animation: styles-module__badgeSlideIn___typJ7 0.2s ease both;
}

@keyframes styles-module__badgeSlideIn___typJ7 {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__ghostBadgeExtra___6CVoD {
  display: inline;
  animation: styles-module__badgeExtraIn___i4W8F 0.2s ease both;
}

@keyframes styles-module__badgeExtraIn___i4W8F {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.styles-module__originalOutline___Y6DD1 {
  position: fixed;
  border: 1.5px dashed rgba(150, 150, 150, 0.3);
  border-radius: 4px;
  background: transparent;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}

.styles-module__originalLabel___HqI9g {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(150, 150, 150, 0.5);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: rgba(150, 150, 150, 0.08);
}

.styles-module__connectorSvg___Lovld {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__connectorLine___XeWh- {
  transition: opacity 0.2s ease;
  animation: styles-module__connectorDraw___8sK5I 0.3s ease both;
}

.styles-module__connectorDot___yvf7C {
  transform-box: fill-box;
  transform-origin: center;
  animation: styles-module__connectorDotIn___NwTUq 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes styles-module__connectorDraw___8sK5I {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__connectorDotIn___NwTUq {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.styles-module__connectorExiting___2lLOs {
  animation: styles-module__connectorOut___5QoPl 0.2s ease forwards;
}
.styles-module__connectorExiting___2lLOs .styles-module__connectorDot___yvf7C {
  animation: styles-module__connectorDotOut___FEq7e 0.2s ease forwards;
}

@keyframes styles-module__connectorOut___5QoPl {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__connectorDotOut___FEq7e {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes styles-module__placementEnter___TdRhf {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__sectionEnter___-8BXT {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__highlightFadeIn___Lg7KY {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__overlayFadeIn___aECVy {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__ghostEnter___EC3Mb {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 0.6;
    transform: scale(1);
  }
}
.styles-module__canvasToggle___-QqSy:focus-visible,
.styles-module__paletteItem___6TlnA:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: -2px;
}`,B={overlay:"styles-module__overlay___aWh-q",rearrangeOverlay:"styles-module__rearrangeOverlay___-3R3t",overlayExiting:"styles-module__overlayExiting___iEmYr",overlayFadeIn:"styles-module__overlayFadeIn___aECVy",light:"styles-module__light___ORIft",wireframe:"styles-module__wireframe___itvQU",placing:"styles-module__placing___45yD8",passthrough:"styles-module__passthrough___xaFeE",blankCanvas:"styles-module__blankCanvas___t2Eue",visible:"styles-module__visible___OKKqX",gridActive:"styles-module__gridActive___OZ-cf",paletteHeader:"styles-module__paletteHeader___-Q5gQ",paletteHeaderTitle:"styles-module__paletteHeaderTitle___oHqZC",paletteHeaderDesc:"styles-module__paletteHeaderDesc___6i74T",wireframePurposeWrap:"styles-module__wireframePurposeWrap___To-tS",collapsed:"styles-module__collapsed___Ms9vS",wireframePurposeInner:"styles-module__wireframePurposeInner___Lrahs",wireframePurposeInput:"styles-module__wireframePurposeInput___7EtBN",canvasToggle:"styles-module__canvasToggle___-QqSy",active:"styles-module__active___hosp7",canvasToggleIcon:"styles-module__canvasToggleIcon___7pJ82",canvasToggleLabel:"styles-module__canvasToggleLabel___OanpY",placement:"styles-module__placement___zcxv8",placementEnter:"styles-module__placementEnter___TdRhf",selected:"styles-module__selected___6yrp6",dragging:"styles-module__dragging___le6KZ",exiting:"styles-module__exiting___YrM8F",placementContent:"styles-module__placementContent___f64A4",placementLabel:"styles-module__placementLabel___0KvWl",placementAnnotation:"styles-module__placementAnnotation___78pTr",annotationVisible:"styles-module__annotationVisible___mrUyA",sectionAnnotation:"styles-module__sectionAnnotation___aUIs0",handle:"styles-module__handle___Ikbxm",sectionOutline:"styles-module__sectionOutline___s0hy-",ghostOutline:"styles-module__ghostOutline___po-kO",handleNw:"styles-module__handleNw___4TMIj",handleNe:"styles-module__handleNe___mnsTh",handleSe:"styles-module__handleSe___oSFnk",handleSw:"styles-module__handleSw___pi--Z",handleN:"styles-module__handleN___aBA-Q",handleE:"styles-module__handleE___0hM5u",handleS:"styles-module__handleS___JjDRv",handleW:"styles-module__handleW___ERWGQ",edgeHandle:"styles-module__edgeHandle___XxXdT",edgeN:"styles-module__edgeN___-JJDj",edgeS:"styles-module__edgeS___66lMX",edgeE:"styles-module__edgeE___1bGDa",edgeW:"styles-module__edgeW___lHQNo",deleteButton:"styles-module__deleteButton___LkGCb",drawBox:"styles-module__drawBox___BrVAa",selectBox:"styles-module__selectBox___Iu8kB",sizeIndicator:"styles-module__sizeIndicator___7zJ4y",guideLine:"styles-module__guideLine___DUQY2",dragPreview:"styles-module__dragPreview___onPbU",dragPreviewWireframe:"styles-module__dragPreviewWireframe___jsg0G",palette:"styles-module__palette___C7iSH",paletteItem:"styles-module__paletteItem___6TlnA",paletteItemLabel:"styles-module__paletteItemLabel___6ncO4",paletteSectionTitle:"styles-module__paletteSectionTitle___PqnjX",paletteFooter:"styles-module__paletteFooter___QYnAG",paletteSection:"styles-module__paletteSection___V8DEA",paletteItemIcon:"styles-module__paletteItemIcon___0NPQK",placeScroll:"styles-module__placeScroll___7sClM",fadeTop:"styles-module__fadeTop___KT9tF",fadeBottom:"styles-module__fadeBottom___x3ShT",paletteFooterWrap:"styles-module__paletteFooterWrap___71-fI",footerHidden:"styles-module__footerHidden___fJUik",paletteFooterInnerContent:"styles-module__paletteFooterInnerContent___VC26h",paletteFooterInner:"styles-module__paletteFooterInner___dfylY",paletteFooterCount:"styles-module__paletteFooterCount___D3Fia",paletteFooterClear:"styles-module__paletteFooterClear___ybBoa",paletteFooterActions:"styles-module__paletteFooterActions___fLzv8",rollingWrap:"styles-module__rollingWrap___S75jM",rollingNum:"styles-module__rollingNum___1RKDx",exitUp:"styles-module__exitUp___AFDRW",numExitUp:"styles-module__numExitUp___FRQqx",enterUp:"styles-module__enterUp___CPlXb",numEnterUp:"styles-module__numEnterUp___2Yd-w",exitDown:"styles-module__exitDown___-1yAy",numExitDown:"styles-module__numExitDown___xm5by",enterDown:"styles-module__enterDown___DDuFR",numEnterDown:"styles-module__numEnterDown___hpxBk",hoverHighlight:"styles-module__hoverHighlight___8eT-v",highlightFadeIn:"styles-module__highlightFadeIn___Lg7KY",sectionEnter:"styles-module__sectionEnter___-8BXT",settled:"styles-module__settled___b5U5o",sectionLabel:"styles-module__sectionLabel___F80HQ",movedBadge:"styles-module__movedBadge___s8z-q",sectionDimensions:"styles-module__sectionDimensions___RcJSL",badgeVisible:"styles-module__badgeVisible___npbdS",resizedBadge:"styles-module__resizedBadge___u51V8",wireframeNotice:"styles-module__wireframeNotice___4GJyB",wireframeOpacityRow:"styles-module__wireframeOpacityRow___CJXzi",wireframeOpacityLabel:"styles-module__wireframeOpacityLabel___afkfT",wireframeOpacitySlider:"styles-module__wireframeOpacitySlider___YcoEs",wireframeNoticeTitleRow:"styles-module__wireframeNoticeTitleRow___PJqyG",wireframeNoticeTitle:"styles-module__wireframeNoticeTitle___okr08",wireframeNoticeDivider:"styles-module__wireframeNoticeDivider___PNKQ6",wireframeStartOver:"styles-module__wireframeStartOver___YFk-I",ghostEnter:"styles-module__ghostEnter___EC3Mb",ghostBadge:"styles-module__ghostBadge___tsQUK",badgeSlideIn:"styles-module__badgeSlideIn___typJ7",ghostBadgeExtra:"styles-module__ghostBadgeExtra___6CVoD",badgeExtraIn:"styles-module__badgeExtraIn___i4W8F",originalOutline:"styles-module__originalOutline___Y6DD1",originalLabel:"styles-module__originalLabel___HqI9g",connectorSvg:"styles-module__connectorSvg___Lovld",connectorLine:"styles-module__connectorLine___XeWh-",connectorDraw:"styles-module__connectorDraw___8sK5I",connectorDot:"styles-module__connectorDot___yvf7C",connectorDotIn:"styles-module__connectorDotIn___NwTUq",connectorExiting:"styles-module__connectorExiting___2lLOs",connectorOut:"styles-module__connectorOut___5QoPl",connectorDotOut:"styles-module__connectorDotOut___FEq7e"},Yi=24,mc=5;function O0(e,t,n,o,r){let i=1/0,l=1/0,s=e.x,a=e.x+e.width,u=e.x+e.width/2,p=e.y,f=e.y+e.height,g=e.y+e.height/2,C=!o,b=C?[s,a,u]:[...o.left?[s]:[],...o.right?[a]:[]],N=C?[p,f,g]:[...o.top?[p]:[],...o.bottom?[f]:[]],E=[];for(let Z of t)n.has(Z.id)||E.push(Z);r&&E.push(...r);for(let Z of E){let J=Z.x,de=Z.x+Z.width,ie=Z.x+Z.width/2,ce=Z.y,pe=Z.y+Z.height,bt=Z.y+Z.height/2;for(let ze of b)for(let Ke of[J,de,ie]){let Oe=Ke-ze;Math.abs(Oe)<mc&&Math.abs(Oe)<Math.abs(i)&&(i=Oe)}for(let ze of N)for(let Ke of[ce,pe,bt]){let Oe=Ke-ze;Math.abs(Oe)<mc&&Math.abs(Oe)<Math.abs(l)&&(l=Oe)}}let y=Math.abs(i)<mc?i:0,v=Math.abs(l)<mc?l:0,h=[],S=new Set,j=s+y,Q=a+y,D=u+y,V=p+v,z=f+v,K=g+v;for(let Z of E){let J=Z.x,de=Z.x+Z.width,ie=Z.x+Z.width/2,ce=Z.y,pe=Z.y+Z.height,bt=Z.y+Z.height/2;for(let ze of[J,ie,de])for(let Ke of[j,D,Q])if(Math.abs(Ke-ze)<.5){let Oe=`x:${Math.round(ze)}`;S.has(Oe)||(S.add(Oe),h.push({axis:"x",pos:ze}))}for(let ze of[ce,bt,pe])for(let Ke of[V,K,z])if(Math.abs(Ke-ze)<.5){let Oe=`y:${Math.round(ze)}`;S.has(Oe)||(S.add(Oe),h.push({axis:"y",pos:ze}))}}return{dx:y,dy:v,guides:h}}function A0(){return`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function qx({placements:e,onChange:t,activeComponent:n,onActiveComponentChange:o,isDarkMode:r,exiting:i,onInteractionChange:l,className:s,passthrough:a,extraSnapRects:u,onSelectionChange:p,deselectSignal:f,onDragMove:g,onDragEnd:C,clearingPlacements:b,wireframe:N}){let[E,y]=(0,rt.useState)(new Set),[v,h]=(0,rt.useState)(null),[S,j]=(0,rt.useState)(null),[Q,D]=(0,rt.useState)(null),[V,z]=(0,rt.useState)([]),[K,Z]=(0,rt.useState)(null),[J,de]=(0,rt.useState)(!1),ie=(0,rt.useRef)(!1),[ce,pe]=(0,rt.useState)(new Set),bt=(0,rt.useRef)(new Map),ze=(0,rt.useRef)(null),Ke=(0,rt.useRef)(null),Oe=(0,rt.useRef)(e);Oe.current=e;let ft=(0,rt.useRef)(p);ft.current=p;let Vt=(0,rt.useRef)(g);Vt.current=g;let gn=(0,rt.useRef)(C);gn.current=C;let Re=(0,rt.useRef)(f);(0,rt.useEffect)(()=>{f!==Re.current&&(Re.current=f,y(new Set))},[f]),(0,rt.useEffect)(()=>{b?.length&&(y(q=>new Set([...q].filter(he=>!b.some(Ne=>Ne.id===he)))),Ke.current=null)},[b]),(0,rt.useEffect)(()=>{let q=he=>{let Ne=he.composedPath()[0]||he.target;if(!(Ne.tagName==="INPUT"||Ne.tagName==="TEXTAREA"||Ne.isContentEditable)){if((he.key==="Backspace"||he.key==="Delete")&&E.size>0){he.preventDefault();let we=new Set(E);pe(we),y(new Set),ot(()=>{t(Oe.current.filter(Je=>!we.has(Je.id))),pe(new Set)},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(he.key)&&E.size>0){he.preventDefault();let we=he.shiftKey?20:1,Je=he.key==="ArrowLeft"?-we:he.key==="ArrowRight"?we:0,Fe=he.key==="ArrowUp"?-we:he.key==="ArrowDown"?we:0;t(e.map(Qe=>E.has(Qe.id)?{...Qe,x:Math.max(0,Qe.x+Je),y:Math.max(0,Qe.y+Fe)}:Qe));return}if(he.key==="Escape"){n?o(null):E.size>0&&y(new Set);return}}};return document.addEventListener("keydown",q),()=>document.removeEventListener("keydown",q)},[E,n,e,t,o]);let qn=(0,rt.useCallback)(q=>{if(q.button!==0||a||q.target.closest(`.${B.placement}`))return;q.preventDefault(),q.stopPropagation();let Ne=window.scrollY,Se=q.clientX,we=q.clientY;if(n){Ke.current="place",l?.(!0);let Je=!1,Fe=Se,Qe=we,Ue=L=>{Fe=L.clientX,Qe=L.clientY;let R=Math.abs(Fe-Se),O=Math.abs(Qe-we);if((R>5||O>5)&&(Je=!0),Je){let W=Math.min(Se,Fe),ee=Math.min(we,Qe),te=Math.abs(Fe-Se),Y=Math.abs(Qe-we);h({x:W,y:ee,w:te,h:Y}),D({x:L.clientX+12,y:L.clientY+12,text:`${Math.round(te)} \xD7 ${Math.round(Y)}`})}},H=L=>{window.removeEventListener("mousemove",Ue),window.removeEventListener("mouseup",H),h(null),D(null),Ke.current=null,l?.(!1);let R=oe[n],O,W,ee,te;Je?(O=Math.min(Se,Fe),W=Math.min(we,Qe)+Ne,ee=Math.max(Yi,Math.abs(Fe-Se)),te=Math.max(Yi,Math.abs(Qe-we))):(ee=R.width,te=R.height,O=Se-ee/2,W=we+Ne-te/2),O=Math.max(0,O),W=Math.max(0,W);let Y={id:A0(),type:n,x:O,y:W,width:ee,height:te,scrollY:Ne,timestamp:Date.now()},ue=[...e,Y];t(ue),y(new Set([Y.id])),o(null)};window.addEventListener("mousemove",Ue),window.addEventListener("mouseup",H)}else{q.shiftKey||y(new Set),Ke.current="select";let Je=!1,Fe=Ue=>{let H=Math.abs(Ue.clientX-Se),L=Math.abs(Ue.clientY-we);if((H>4||L>4)&&(Je=!0),Je){let R=Math.min(Se,Ue.clientX),O=Math.min(we,Ue.clientY);j({x:R,y:O,w:Math.abs(Ue.clientX-Se),h:Math.abs(Ue.clientY-we)})}},Qe=Ue=>{if(window.removeEventListener("mousemove",Fe),window.removeEventListener("mouseup",Qe),Ke.current=null,Je){let H=Math.min(Se,Ue.clientX),L=Math.min(we,Ue.clientY)+Ne,R=Math.abs(Ue.clientX-Se),O=Math.abs(Ue.clientY-we),W=new Set(q.shiftKey?E:new Set);for(let ee of e){let te=ee.y-Ne;ee.x+ee.width>H&&ee.x<H+R&&ee.y+ee.height>L&&ee.y<L+O&&W.add(ee.id)}y(W)}j(null)};window.addEventListener("mousemove",Fe),window.addEventListener("mouseup",Qe)}},[n,a,e,t,E]),Lo=(0,rt.useCallback)((q,he)=>{if(q.button!==0)return;let Ne=q.target;if(Ne.closest(`.${B.handle}`)||Ne.closest(`.${B.deleteButton}`))return;q.preventDefault(),q.stopPropagation();let Se;q.shiftKey?(Se=new Set(E),Se.has(he)?Se.delete(he):Se.add(he)):E.has(he)?Se=new Set(E):Se=new Set([he]),y(Se),(Se.size!==E.size||[...Se].some(ue=>!E.has(ue)))&&ft.current?.(Se,q.shiftKey);let Je=window.scrollY,Fe=q.clientX,Qe=q.clientY,Ue=new Map;for(let ue of e)Se.has(ue.id)&&Ue.set(ue.id,{x:ue.x,y:ue.y});Ke.current="move",l?.(!0);let H=!1,L=!1,R=e,O=0,W=0,ee=new Map;for(let ue of e)Ue.has(ue.id)&&ee.set(ue.id,{w:ue.width,h:ue.height});let te=ue=>{let be=ue.clientX-Fe,Te=ue.clientY-Qe;if((Math.abs(be)>2||Math.abs(Te)>2)&&(H=!0),!H)return;if(ue.altKey&&!L){L=!0;let ht=[];for(let dt of e)Ue.has(dt.id)&&ht.push({...dt,id:A0(),timestamp:Date.now()});R=[...e,...ht]}let it=1/0,at=1/0,Ze=-1/0,We=-1/0;for(let[ht,dt]of Ue){let se=ee.get(ht);se&&(it=Math.min(it,dt.x+be),at=Math.min(at,dt.y+Te),Ze=Math.max(Ze,dt.x+be+se.w),We=Math.max(We,dt.y+Te+se.h))}let Ie={x:it,y:at,width:Ze-it,height:We-at},{dx:yt,dy:mt,guides:ct}=O0(Ie,R,new Set(Ue.keys()),void 0,u);z(ct);let Pe=be+yt,et=Te+mt;O=Pe,W=et,t(R.map(ht=>{let dt=Ue.get(ht.id);return dt?{...ht,x:Math.max(0,dt.x+Pe),y:Math.max(0,dt.y+et)}:ht})),Vt.current?.(Pe,et)},Y=()=>{window.removeEventListener("mousemove",te),window.removeEventListener("mouseup",Y),Ke.current=null,l?.(!1),z([]),gn.current?.(O,W,H)};window.addEventListener("mousemove",te),window.addEventListener("mouseup",Y)},[E,e,t,l]),Xo=(0,rt.useCallback)((q,he,Ne)=>{q.preventDefault(),q.stopPropagation();let Se=e.find(W=>W.id===he);if(!Se)return;y(new Set([he])),Ke.current="resize",l?.(!0);let we=q.clientX,Je=q.clientY,Fe=Se.width,Qe=Se.height,Ue=Se.x,H=Se.y,L={left:Ne.includes("w"),right:Ne.includes("e"),top:Ne.includes("n"),bottom:Ne.includes("s")},R=W=>{let ee=W.clientX-we,te=W.clientY-Je,Y=Fe,ue=Qe,be=Ue,Te=H;Ne.includes("e")&&(Y=Math.max(Yi,Fe+ee)),Ne.includes("w")&&(Y=Math.max(Yi,Fe-ee),be=Ue+Fe-Y),Ne.includes("s")&&(ue=Math.max(Yi,Qe+te)),Ne.includes("n")&&(ue=Math.max(Yi,Qe-te),Te=H+Qe-ue);let it={x:be,y:Te,width:Y,height:ue},{dx:at,dy:Ze,guides:We}=O0(it,Oe.current,new Set([he]),L,u);z(We),at!==0&&(L.right?Y+=at:L.left&&(be+=at,Y-=at)),Ze!==0&&(L.bottom?ue+=Ze:L.top&&(Te+=Ze,ue-=Ze)),t(Oe.current.map(Ie=>Ie.id===he?{...Ie,x:be,y:Te,width:Y,height:ue}:Ie)),D({x:W.clientX+12,y:W.clientY+12,text:`${Math.round(Y)} \xD7 ${Math.round(ue)}`})},O=()=>{window.removeEventListener("mousemove",R),window.removeEventListener("mouseup",O),D(null),Ke.current=null,l?.(!1),z([])};window.addEventListener("mousemove",R),window.addEventListener("mouseup",O)},[e,t,l]),Go=(0,rt.useCallback)(q=>{Ke.current=null,pe(he=>{let Ne=new Set(he);return Ne.add(q),Ne}),y(he=>{let Ne=new Set(he);return Ne.delete(q),Ne}),ot(()=>{t(Oe.current.filter(he=>he.id!==q)),pe(he=>{let Ne=new Set(he);return Ne.delete(q),Ne})},180)},[t]),No=new Set(["text","hero","button","badge","cta","toast","modal","card","navigation","tabs","input","search","breadcrumb","pricing","testimonial","alert","banner","tag","notification","stat","productCard"]),Io={hero:"Headline text",button:"Button label",badge:"Badge label",cta:"Call to action text",toast:"Notification message",modal:"Dialog title",card:"Card title",navigation:"Brand / nav items",tabs:"Tab labels",input:"Placeholder text",search:"Search placeholder",pricing:"Plan name or price",testimonial:"Quote text",alert:"Alert message",banner:"Banner text",tag:"Tag label",notification:"Notification message",stat:"Metric value",productCard:"Product name"},Ro=(0,rt.useCallback)(q=>{let he=e.find(Ne=>Ne.id===q);he&&(ie.current=!!he.text,Z(q),de(!1))},[e]),Dt=(0,rt.useCallback)(()=>{K&&(de(!0),ot(()=>{Z(null),de(!1)},150))},[K]);(0,rt.useEffect)(()=>{i&&K&&Dt()},[i]);let Kn=(0,rt.useCallback)(q=>{K&&(t(e.map(he=>he.id===K?{...he,text:q.trim()||void 0}:he)),Dt())},[K,e,t,Dt]),fo=typeof window<"u"?window.scrollY:0,Cr=["nw","ne","se","sw"],Dn=N?"#f97316":"#3c82f7",$o=[{dir:"n",cls:B.edgeN,arrow:(0,gt.jsx)("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:(0,gt.jsx)("path",{d:"M4 0.5L1 4.5h6z",fill:Dn})})},{dir:"e",cls:B.edgeE,arrow:(0,gt.jsx)("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:(0,gt.jsx)("path",{d:"M5.5 4L1.5 1v6z",fill:Dn})})},{dir:"s",cls:B.edgeS,arrow:(0,gt.jsx)("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:(0,gt.jsx)("path",{d:"M4 5.5L1 1.5h6z",fill:Dn})})},{dir:"w",cls:B.edgeW,arrow:(0,gt.jsx)("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:(0,gt.jsx)("path",{d:"M0.5 4L4.5 1v6z",fill:Dn})})}];return(0,gt.jsxs)(gt.Fragment,{children:[(0,gt.jsx)("div",{ref:ze,className:`${B.overlay} ${r?"":B.light} ${n?B.placing:""} ${a?B.passthrough:""} ${i?B.overlayExiting:""} ${N?B.wireframe:""}${s?` ${s}`:""}`,"data-feedback-toolbar":!0,onMouseDown:qn,children:e.map(q=>{let he=E.has(q.id),Ne=_o[q.type]?.label||q.type,Se=q.y-fo;return(0,gt.jsxs)("div",{"data-design-placement":q.id,className:`${B.placement} ${he?B.selected:""} ${ce.has(q.id)||b?.includes(q)?B.exiting:""}`,style:{left:q.x,top:Se,width:q.width,height:q.height,position:"fixed"},onMouseDown:we=>Lo(we,q.id),onDoubleClick:()=>Ro(q.id),children:[(0,gt.jsx)("span",{className:B.placementLabel,children:Ne}),(0,gt.jsx)("span",{className:`${B.placementAnnotation} ${q.text?B.annotationVisible:""}`,children:(q.text&&bt.current.set(q.id,q.text),q.text||bt.current.get(q.id)||"")}),(0,gt.jsx)("div",{className:B.placementContent,children:(0,gt.jsx)(Xx,{type:q.type,width:q.width,height:q.height,text:q.text})}),(0,gt.jsx)("div",{className:B.deleteButton,onMouseDown:we=>we.stopPropagation(),onClick:()=>Go(q.id),children:"\u2715"}),Cr.map(we=>(0,gt.jsx)("div",{className:`${B.handle} ${B[`handle${we.charAt(0).toUpperCase()}${we.slice(1)}`]}`,onMouseDown:Je=>Xo(Je,q.id,we)},we)),$o.map(({dir:we,cls:Je,arrow:Fe})=>(0,gt.jsx)("div",{className:`${B.edgeHandle} ${Je}`,onMouseDown:Qe=>Xo(Qe,q.id,we),children:Fe},we))]},q.id)})}),K&&(()=>{let q=e.find(H=>H.id===K);if(!q)return null;let he=q.y-fo,Ne=q.x+q.width/2,Se=he-8,we=he+q.height+8,Je=Se>200,Fe=we<window.innerHeight-100,Qe=Math.max(160,Math.min(window.innerWidth-160,Ne)),Ue;return Je?Ue={left:Qe,bottom:window.innerHeight-Se}:Fe?Ue={left:Qe,top:we}:Ue={left:Qe,top:Math.max(80,window.innerHeight/2-80)},(0,gt.jsx)(Z_,{element:_o[q.type]?.label||q.type,placeholder:Io[q.type]||"Label or content text",initialValue:q.text??"",submitLabel:ie.current?"Save":"Set",onSubmit:Kn,onCancel:Dt,onDelete:ie.current?()=>{Kn("")}:void 0,isExiting:J,lightMode:!r,style:Ue})})(),v&&(0,gt.jsx)("div",{className:B.drawBox,style:{left:v.x,top:v.y,width:v.w,height:v.h},"data-feedback-toolbar":!0}),S&&(0,gt.jsx)("div",{className:B.selectBox,style:{left:S.x,top:S.y,width:S.w,height:S.h},"data-feedback-toolbar":!0}),Q&&(0,gt.jsx)("div",{className:B.sizeIndicator,style:{left:Q.x,top:Q.y},"data-feedback-toolbar":!0,children:Q.text}),V.map((q,he)=>(0,gt.jsx)("div",{className:B.guideLine,style:q.axis==="x"?{position:"fixed",left:q.pos,top:0,width:1,bottom:0}:{position:"fixed",left:0,top:q.pos-fo,right:0,height:1},"data-feedback-toolbar":!0},`${q.axis}-${q.pos}-${he}`))]})}function Mg(e,{keepMounted:t=!1,onExited:n}={}){let[o,r]=(0,kr.useState)(t||e),i=(0,kr.useRef)(null),l=(0,kr.useRef)(n);return e&&!o&&r(!0),(0,kr.useLayoutEffect)(()=>{l.current=n},[n]),(0,kr.useLayoutEffect)(()=>{let s=i.current;if(!s||s.dataset.panelOpen==="true"===e)return;getComputedStyle(s).opacity,s.dataset.panelPresent="true",s.dataset.panelOpen=String(e);let a=!1,u=s.getAnimations?.()??[];return Promise.allSettled(u.map(p=>p.finished)).then(()=>{a||e||(delete s.dataset.panelPresent,t||r(!1),l.current?.())}),()=>{a=!0}},[e,o,t]),{ref:i,mounted:o}}function Kx(e){if(!e)return"";let t=e.scrollTop>2,n=e.scrollTop+e.clientHeight<e.scrollHeight-2;return`${t?B.fadeTop:""} ${n?B.fadeBottom:""}`}var x="currentColor",P="0.5";function Jx({type:e}){switch(e){case"navigation":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"4",width:"18",height:"8",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2.5",y:"7",width:"3",height:"1.5",rx:".5",fill:x,opacity:".4"}),(0,c.jsx)("rect",{x:"7",y:"7",width:"2.5",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"11",y:"7",width:"2.5",height:"1.5",rx:".5",fill:x,opacity:".25"})]});case"header":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3",y:"5.5",width:"8",height:"2",rx:".5",fill:x,opacity:".35"}),(0,c.jsx)("rect",{x:"3",y:"9",width:"12",height:"1",rx:".5",fill:x,opacity:".15"})]});case"hero":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"5",width:"10",height:"1.5",rx:".5",fill:x,opacity:".35"}),(0,c.jsx)("rect",{x:"7",y:"8",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"7.5",y:"10.5",width:"5",height:"2.5",rx:"1",stroke:x,strokeWidth:P})]});case"section":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3",y:"4",width:"6",height:"1",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"3",y:"6.5",width:"14",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"3",y:"9",width:"10",height:"1",rx:".5",fill:x,opacity:".15"})]});case"sidebar":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2.5",y:"4",width:"4",height:"1",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"2.5",y:"6.5",width:"3.5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"2.5",y:"9",width:"4",height:"1",rx:".5",fill:x,opacity:".15"})]});case"footer":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"7",width:"18",height:"8",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3",y:"9.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"9.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"15",y:"9.5",width:"3",height:"1",rx:".5",fill:x,opacity:".2"})]});case"modal":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"4.5",width:"7",height:"1",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"5",y:"7",width:"10",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"11",y:"11",width:"5",height:"2",rx:".75",stroke:x,strokeWidth:P})]});case"divider":return(0,c.jsx)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:(0,c.jsx)("line",{x1:"2",y1:"8",x2:"18",y2:"8",stroke:x,strokeWidth:"0.5",opacity:".3"})});case"card":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"5.5",rx:"1",fill:x,opacity:".04"}),(0,c.jsx)("rect",{x:"4",y:"8.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"4",y:"11",width:"11",height:"1",rx:".5",fill:x,opacity:".12"})]});case"text":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"4",width:"14",height:"1.5",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"2",y:"7",width:"11",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"2",y:"9.5",width:"13",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"2",y:"12",width:"8",height:"1",rx:".5",fill:x,opacity:".12"})]});case"image":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"2",y1:"2",x2:"18",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"}),(0,c.jsx)("line",{x1:"18",y1:"2",x2:"2",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"})]});case"video":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M8.5 5.5v5l4.5-2.5z",stroke:x,strokeWidth:P,fill:x,opacity:".15"})]});case"table":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"1",y1:"5.5",x2:"19",y2:"5.5",stroke:x,strokeWidth:".3",opacity:".25"}),(0,c.jsx)("line",{x1:"1",y1:"9",x2:"19",y2:"9",stroke:x,strokeWidth:".3",opacity:".25"}),(0,c.jsx)("line",{x1:"7",y1:"2",x2:"7",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"}),(0,c.jsx)("line",{x1:"13",y1:"2",x2:"13",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"})]});case"grid":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"11.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"1.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"11.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:P})]});case"list":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"3.5",cy:"4.5",r:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"4",width:"10",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"3.5",cy:"8",r:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"3.5",cy:"11.5",r:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"11",width:"11",height:"1",rx:".5",fill:x,opacity:".2"})]});case"chart":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"9",width:"2.5",height:"4",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"7",y:"6",width:"2.5",height:"7",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"11",y:"3",width:"2.5",height:"10",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"15",y:"5",width:"2.5",height:"8",rx:".5",fill:x,opacity:".2"})]});case"accordion":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1.5",y:"2",width:"17",height:"4",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3",y:"3.5",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"1.5",y:"7.5",width:"17",height:"3",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"1.5",y:"12",width:"17",height:"3",rx:"1",stroke:x,strokeWidth:P})]});case"carousel":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"2",width:"14",height:"10",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M1.5 7L3 8.5 1.5 10",stroke:x,strokeWidth:P,opacity:".35"}),(0,c.jsx)("path",{d:"M18.5 7L17 8.5 18.5 10",stroke:x,strokeWidth:P,opacity:".35"}),(0,c.jsx)("circle",{cx:"8.5",cy:"14",r:".6",fill:x,opacity:".35"}),(0,c.jsx)("circle",{cx:"10",cy:"14",r:".6",fill:x,opacity:".15"}),(0,c.jsx)("circle",{cx:"11.5",cy:"14",r:".6",fill:x,opacity:".15"})]});case"button":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"2",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"7.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"})]});case"input":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"4",width:"5.5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"2",y:"6.5",width:"16",height:"5.5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3.5",y:"8.5",width:"7",height:"1",rx:".5",fill:x,opacity:".12"})]});case"search":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"4.5",width:"16",height:"7",rx:"3.5",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"6",cy:"8",r:"2",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("line",{x1:"7.5",y1:"9.5",x2:"9",y2:"11",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("rect",{x:"9.5",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"form":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1.5",width:"5.5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"2",y:"3.5",width:"16",height:"3",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2",y:"8",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"2",y:"10",width:"16",height:"3",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"12",y:"14",width:"6",height:"2",rx:".75",stroke:x,strokeWidth:P})]});case"tabs":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"5",width:"18",height:"10",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"1",y:"2",width:"6",height:"3.5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2.5",y:"3.25",width:"3",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"7",y:"2",width:"6",height:"3.5",rx:".75",stroke:x,strokeWidth:P})]});case"dropdown":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"4",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3.5",y:"3.5",width:"7",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("path",{d:"M15 3.5l1.5 1.5L18 3.5",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("rect",{x:"2",y:"7",width:"16",height:"7",rx:"1",stroke:x,strokeWidth:P,strokeDasharray:"2 1",opacity:".3"})]});case"toggle":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"4",y:"5",width:"12",height:"6",rx:"3",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"13",cy:"8",r:"2",fill:x,opacity:".3"})]});case"avatar":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"10",cy:"8",r:"6",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"10",cy:"6.5",r:"2",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5",stroke:x,strokeWidth:P})]});case"badge":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"3",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"})]});case"breadcrumb":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1.5",y:"7",width:"3.5",height:"1",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("path",{d:"M6.5 7l1 1-1 1",stroke:x,strokeWidth:P,opacity:".2"}),(0,c.jsx)("rect",{x:"9",y:"7",width:"3.5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("path",{d:"M14 7l1 1-1 1",stroke:x,strokeWidth:P,opacity:".2"}),(0,c.jsx)("rect",{x:"16.5",y:"7",width:"2",height:"1",rx:".5",fill:x,opacity:".15"})]});case"pagination":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"11",y:"5.5",width:"3.5",height:"5",rx:"1",fill:x,opacity:".15",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"15.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:P})]});case"progress":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"7",width:"16",height:"2",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2",y:"7",width:"10",height:"2",rx:"1",fill:x,opacity:".2"})]});case"toast":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"5",cy:"8",r:"1.5",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("rect",{x:"8",y:"6.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"8",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".12"})]});case"tooltip":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"3",width:"14",height:"7",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5.5",y:"5.5",width:"9",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("path",{d:"M9 10l1 2.5 1-2.5",stroke:x,strokeWidth:P})]});case"pricing":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"7",y:"5.5",width:"6",height:"2",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"5",y:"9",width:"10",height:"1",rx:".5",fill:x,opacity:".1"}),(0,c.jsx)("rect",{x:"5",y:"11",width:"10",height:"1",rx:".5",fill:x,opacity:".1"}),(0,c.jsx)("rect",{x:"6",y:"13",width:"8",height:"1.5",rx:".5",fill:x,opacity:".2"})]});case"testimonial":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("text",{x:"4",y:"5.5",fontSize:"4",fill:x,opacity:".2",fontFamily:"serif",children:"\u201C"}),(0,c.jsx)("rect",{x:"4",y:"7",width:"12",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"4",y:"9",width:"9",height:"1",rx:".5",fill:x,opacity:".12"}),(0,c.jsx)("circle",{cx:"5.5",cy:"12.5",r:"1.5",stroke:x,strokeWidth:P,opacity:".25"}),(0,c.jsx)("rect",{x:"8",y:"12",width:"5",height:"1",rx:".5",fill:x,opacity:".15"})]});case"cta":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"4.5",width:"10",height:"1.5",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"7",y:"10",width:"6",height:"2.5",rx:"1",stroke:x,strokeWidth:P})]});case"alert":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"6",cy:"8",r:"2",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("line",{x1:"6",y1:"7",x2:"6",y2:"8.5",stroke:x,strokeWidth:"0.6",opacity:".5"}),(0,c.jsx)("circle",{cx:"6",cy:"9.3",r:".3",fill:x,opacity:".5"}),(0,c.jsx)("rect",{x:"9.5",y:"7",width:"6",height:"1",rx:".5",fill:x,opacity:".2"})]});case"banner":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"5",width:"18",height:"6",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"4",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"14",y:"7",width:"3.5",height:"2",rx:".75",stroke:x,strokeWidth:P})]});case"stat":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6",y:"4.5",width:"8",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"5",y:"7",width:"10",height:"2.5",rx:".5",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"7",y:"11",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"stepper":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"4",cy:"8",r:"2",fill:x,opacity:".2",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"6",y1:"8",x2:"8",y2:"8",stroke:x,strokeWidth:".4",opacity:".3"}),(0,c.jsx)("circle",{cx:"10",cy:"8",r:"2",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"12",y1:"8",x2:"14",y2:"8",stroke:x,strokeWidth:".4",opacity:".3"}),(0,c.jsx)("circle",{cx:"16",cy:"8",r:"2",stroke:x,strokeWidth:P})]});case"tag":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5.5",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("line",{x1:"14",y1:"6.5",x2:"15.5",y2:"9.5",stroke:x,strokeWidth:P,opacity:".2"}),(0,c.jsx)("line",{x1:"15.5",y1:"6.5",x2:"14",y2:"9.5",stroke:x,strokeWidth:P,opacity:".2"})]});case"rating":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("path",{d:"M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z",fill:x,opacity:".25"}),(0,c.jsx)("path",{d:"M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z",fill:x,opacity:".25"}),(0,c.jsx)("path",{d:"M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z",stroke:x,strokeWidth:P,opacity:".25"})]});case"map":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"2",y1:"6",x2:"18",y2:"10",stroke:x,strokeWidth:".3",opacity:".15"}),(0,c.jsx)("line",{x1:"7",y1:"2",x2:"11",y2:"14",stroke:x,strokeWidth:".3",opacity:".15"}),(0,c.jsx)("path",{d:"M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z",fill:x,opacity:".15",stroke:x,strokeWidth:P})]});case"timeline":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("line",{x1:"5",y1:"2",x2:"5",y2:"14",stroke:x,strokeWidth:".4",opacity:".25"}),(0,c.jsx)("circle",{cx:"5",cy:"4",r:"1.5",fill:x,opacity:".2",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"8",y:"3",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("circle",{cx:"5",cy:"8.5",r:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"8",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("circle",{cx:"5",cy:"13",r:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"8",y:"12",width:"7",height:"1",rx:".5",fill:x,opacity:".15"})]});case"fileUpload":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:P,strokeDasharray:"2 1"}),(0,c.jsx)("path",{d:"M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("rect",{x:"7",y:"11.5",width:"6",height:"1",rx:".5",fill:x,opacity:".15"})]});case"codeBlock":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"4",cy:"4",r:".6",fill:x,opacity:".3"}),(0,c.jsx)("circle",{cx:"5.5",cy:"4",r:".6",fill:x,opacity:".3"}),(0,c.jsx)("circle",{cx:"7",cy:"4",r:".6",fill:x,opacity:".3"}),(0,c.jsx)("rect",{x:"4",y:"7",width:"7",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"6",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"4",y:"11",width:"8",height:"1",rx:".5",fill:x,opacity:".12"})]});case"calendar":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"3",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("line",{x1:"2",y1:"6.5",x2:"18",y2:"6.5",stroke:x,strokeWidth:".4",opacity:".25"}),(0,c.jsx)("rect",{x:"5",y:"4",width:"1",height:"1.5",rx:".3",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"14",y:"4",width:"1",height:"1.5",rx:".3",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"7",cy:"9",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"10",cy:"9",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"13",cy:"9",r:".6",fill:x,opacity:".3"}),(0,c.jsx)("circle",{cx:"7",cy:"12",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"10",cy:"12",r:".6",fill:x,opacity:".2"})]});case"notification":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"3",width:"16",height:"10",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"5.5",cy:"8",r:"2",stroke:x,strokeWidth:P,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"6",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"8.5",width:"4.5",height:"1",rx:".5",fill:x,opacity:".12"}),(0,c.jsx)("circle",{cx:"16.5",cy:"4.5",r:"1.5",fill:x,opacity:".25"})]});case"productCard":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3",y:"1",width:"14",height:"6",rx:"1",fill:x,opacity:".04"}),(0,c.jsx)("rect",{x:"5",y:"8.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"5",y:"10.5",width:"4",height:"1.5",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"12",y:"12",width:"4",height:"2",rx:".75",stroke:x,strokeWidth:P})]});case"profile":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"10",cy:"5",r:"3",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"10",width:"10",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"7",y:"12.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"drawer":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"9",y:"1",width:"10",height:"14",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"10.5",y:"4",width:"5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"10.5",y:"6.5",width:"7",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"10.5",y:"9",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:x,strokeWidth:P,opacity:".15"})]});case"popover":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"2",width:"14",height:"9",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"4.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"5",y:"7",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("path",{d:"M9 11l1 2.5 1-2.5",stroke:x,strokeWidth:P})]});case"logo":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"3",width:"10",height:"10",rx:"2",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M5 9.5l2-4 2 4",stroke:x,strokeWidth:P,opacity:".3"}),(0,c.jsx)("rect",{x:"14",y:"6",width:"4",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"14",y:"8.5",width:"3",height:"1",rx:".5",fill:x,opacity:".12"})]});case"faq":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("text",{x:"2.5",y:"5.5",fontSize:"4",fill:x,opacity:".3",fontWeight:"bold",children:"?"}),(0,c.jsx)("rect",{x:"7",y:"3",width:"10",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"7",y:"5.5",width:"8",height:"1",rx:".5",fill:x,opacity:".12"}),(0,c.jsx)("text",{x:"2.5",y:"11.5",fontSize:"4",fill:x,opacity:".3",fontWeight:"bold",children:"?"}),(0,c.jsx)("rect",{x:"7",y:"9",width:"9",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"7",y:"11.5",width:"7",height:"1",rx:".5",fill:x,opacity:".12"})]});case"gallery":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"7.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"13.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"1.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"7.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"13.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:P})]});case"checkbox":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"5",y:"4",width:"8",height:"8",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M7.5 8l1.5 1.5 3-3",stroke:x,strokeWidth:P,opacity:".35"})]});case"radio":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"10",cy:"8",r:"4",stroke:x,strokeWidth:P}),(0,c.jsx)("circle",{cx:"10",cy:"8",r:"2",fill:x,opacity:".3"})]});case"slider":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"7.5",width:"16",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"2",y:"7.5",width:"10",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("circle",{cx:"12",cy:"8",r:"2.5",stroke:x,strokeWidth:P})]});case"datePicker":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"5",rx:"1",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"3.5",y:"3",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"14",y:"2.5",width:"2.5",height:"2",rx:".5",fill:x,opacity:".12"}),(0,c.jsx)("rect",{x:"2",y:"7",width:"16",height:"8",rx:"1",stroke:x,strokeWidth:P,strokeDasharray:"2 1",opacity:".3"}),(0,c.jsx)("circle",{cx:"6",cy:"10",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"10",cy:"10",r:".6",fill:x,opacity:".3"}),(0,c.jsx)("circle",{cx:"14",cy:"10",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"6",cy:"13",r:".6",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"10",cy:"13",r:".6",fill:x,opacity:".2"})]});case"skeleton":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"16",height:"3",rx:"1",fill:x,opacity:".08"}),(0,c.jsx)("rect",{x:"2",y:"7",width:"10",height:"2",rx:".75",fill:x,opacity:".08"}),(0,c.jsx)("rect",{x:"2",y:"11",width:"13",height:"2",rx:".75",fill:x,opacity:".08"})]});case"chip":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"1.5",y:"5",width:"10",height:"6",rx:"3",fill:x,opacity:".08",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"4",y:"7.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("line",{x1:"9.5",y1:"6.5",x2:"10.5",y2:"9.5",stroke:x,strokeWidth:P,opacity:".2"}),(0,c.jsx)("line",{x1:"10.5",y1:"6.5",x2:"9.5",y2:"9.5",stroke:x,strokeWidth:P,opacity:".2"}),(0,c.jsx)("rect",{x:"13",y:"5",width:"5.5",height:"6",rx:"3",stroke:x,strokeWidth:P,opacity:".25"})]});case"icon":return(0,c.jsx)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:(0,c.jsx)("path",{d:"M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z",stroke:x,strokeWidth:P,opacity:".3"})});case"spinner":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"10",cy:"8",r:"5",stroke:x,strokeWidth:P,opacity:".12"}),(0,c.jsx)("path",{d:"M10 3a5 5 0 0 1 5 5",stroke:x,strokeWidth:P,opacity:".35",strokeLinecap:"round"})]});case"feature":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("path",{d:"M4.5 3.5v3m-1.5-1.5h3",stroke:x,strokeWidth:P,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"2.5",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"5.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"}),(0,c.jsx)("rect",{x:"2",y:"10",width:"5",height:"5",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"9",y:"10.5",width:"7",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"9",y:"13.5",width:"5",height:"1",rx:".5",fill:x,opacity:".12"})]});case"team":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("circle",{cx:"5",cy:"5",r:"2.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"2.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"15",cy:"5",r:"2.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"12.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("circle",{cx:"10",cy:"5",r:"2.5",stroke:x,strokeWidth:P,opacity:".5"}),(0,c.jsx)("rect",{x:"7.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,c.jsx)("rect",{x:"4",y:"12",width:"12",height:"1",rx:".5",fill:x,opacity:".1"})]});case"login":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,c.jsx)("rect",{x:"5",y:"5.5",width:"10",height:"3",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"5",y:"9.5",width:"10",height:"3",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"6.5",y:"13.5",width:"7",height:"2",rx:".75",fill:x,opacity:".2"})]});case"contact":return(0,c.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,c.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"4",y:"3",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,c.jsx)("rect",{x:"4",y:"5",width:"12",height:"2.5",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"4",y:"8.5",width:"12",height:"4",rx:".75",stroke:x,strokeWidth:P}),(0,c.jsx)("rect",{x:"11",y:"13.5",width:"5",height:"1.5",rx:".5",fill:x,opacity:".2"})]});default:return null}}function Zx({activeType:e,onSelect:t,onDragStart:n,scrollRef:o,fadeClass:r,blankCanvas:i}){return(0,c.jsx)("div",{ref:o,className:`${B.placeScroll} ${r||""}`,children:Eg.map(l=>(0,c.jsxs)("div",{className:B.paletteSection,children:[(0,c.jsx)("div",{className:B.paletteSectionTitle,children:l.section}),l.items.map(s=>(0,c.jsxs)("button",{type:"button","aria-pressed":e===s.type,className:`${B.paletteItem} ${e===s.type?B.active:""} ${i?B.wireframe:""}`,onClick:()=>t(s.type),onMouseDown:a=>{a.button===0&&n(s.type,a)},children:[(0,c.jsx)("span",{className:B.paletteItemIcon,"aria-hidden":"true",children:(0,c.jsx)(Jx,{type:s.type})}),(0,c.jsx)("span",{className:B.paletteItemLabel,children:s.label})]},s.type))]},l.section))})}function ev({value:e,suffix:t}){let[n,o]=(0,Qt.useState)(null),[r,i]=(0,Qt.useState)(t),[l,s]=(0,Qt.useState)("up"),a=(0,Qt.useRef)(e),u=(0,Qt.useRef)(t),p=(0,Qt.useRef)(),f=n!==null&&r!==t;return(0,Qt.useEffect)(()=>{if(e!==a.current){if(e===0){a.current=e,u.current=t,o(null);return}s(e>a.current?"up":"down"),o(a.current),i(u.current),a.current=e,u.current=t,clearTimeout(p.current),p.current=ot(()=>o(null),250)}else u.current=t},[e,t]),n===null?(0,c.jsxs)(c.Fragment,{children:[e,t?` ${t}`:""]}):f?(0,c.jsxs)("span",{className:B.rollingWrap,children:[(0,c.jsxs)("span",{style:{visibility:"hidden"},children:[e," ",t]}),(0,c.jsxs)("span",{className:`${B.rollingNum} ${l==="up"?B.exitUp:B.exitDown}`,children:[n," ",r]},`o${n}-${e}`),(0,c.jsxs)("span",{className:`${B.rollingNum} ${l==="up"?B.enterUp:B.enterDown}`,children:[e," ",t]},`n${e}`)]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("span",{className:B.rollingWrap,children:[(0,c.jsx)("span",{style:{visibility:"hidden"},children:e}),(0,c.jsx)("span",{className:`${B.rollingNum} ${l==="up"?B.exitUp:B.exitDown}`,children:n},`o${n}-${e}`),(0,c.jsx)("span",{className:`${B.rollingNum} ${l==="up"?B.enterUp:B.enterDown}`,children:e},`n${e}`)]}),t?` ${t}`:""]})}function tv({activeType:e,onSelect:t,isDarkMode:n,sectionCount:o,onDetectSections:r,visible:i,onExited:l,placementCount:s,onClearPlacements:a,onDragStart:u,blankCanvas:p,onBlankCanvasChange:f,wireframePurpose:g,onWireframePurposeChange:C,Tooltip:b}){let{ref:N,mounted:E}=Mg(i,{onExited:l}),[y,v]=(0,Qt.useState)(!1),[h,S]=(0,Qt.useState)(!0),j=(0,Qt.useRef)(0),Q=(0,Qt.useRef)(""),D=(0,Qt.useRef)(null),[V,z]=(0,Qt.useState)(""),K=s>0||o>0,Z=s+o;if(Z>0&&(j.current=Z,Q.current=p?Z===1?"Component":"Components":Z===1?"Change":"Changes"),(0,Qt.useEffect)(()=>{if(K)y?S(!1):(S(!0),v(!0),Mc(()=>{Mc(()=>{S(!1)})}));else{S(!0);let de=ot(()=>v(!1),300);return()=>clearTimeout(de)}},[K]),(0,Qt.useEffect)(()=>{if(!i)return;let de=D.current;if(!de)return;let ie=()=>z(Kx(de));de.addEventListener("scroll",ie,{passive:!0});let ce=new ResizeObserver(ie);return ce.observe(de),()=>{de.removeEventListener("scroll",ie),ce.disconnect()}},[i]),!E)return null;let J=[];return s>0&&J.push("placed"),o>0&&J.push("captured"),(0,c.jsxs)("div",{className:`${B.palette} ${n?"":B.light}`,ref:de=>{N.current=de,de?.toggleAttribute("inert",!i)},"aria-hidden":!i,"data-feedback-toolbar":!0,"data-agentation-palette":!0,onClick:de=>de.stopPropagation(),onMouseDown:de=>de.stopPropagation(),children:[(0,c.jsxs)("div",{className:B.paletteHeader,children:[(0,c.jsx)("div",{className:B.paletteHeaderTitle,children:"Layout Mode"}),(0,c.jsxs)("div",{className:B.paletteHeaderDesc,children:["Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary."," ",(0,c.jsx)("a",{href:"https://agentation.com/features#layout-mode",target:"_blank",rel:"noopener noreferrer",children:"Learn more."})]})]}),(0,c.jsxs)("button",{type:"button","aria-pressed":p,className:`${B.canvasToggle} ${p?B.active:""}`,onClick:()=>f(!p),children:[(0,c.jsx)("span",{className:B.canvasToggleIcon,"aria-hidden":"true",children:(0,c.jsxs)("svg",{viewBox:"0 0 14 14",width:"14",height:"14",fill:"none",children:[(0,c.jsx)("rect",{x:"1",y:"1",width:"12",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1"}),(0,c.jsx)("circle",{cx:"4.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"7",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"9.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"4.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"7",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"9.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"4.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"7",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,c.jsx)("circle",{cx:"9.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"})]})}),(0,c.jsx)("span",{className:B.canvasToggleLabel,children:"Wireframe New Page"})]}),(0,c.jsx)("div",{className:`${B.wireframePurposeWrap} ${p?"":B.collapsed}`,"aria-hidden":!p,ref:de=>{de?.toggleAttribute("inert",!p)},children:(0,c.jsx)("div",{className:B.wireframePurposeInner,children:(0,c.jsx)("textarea",{className:B.wireframePurposeInput,placeholder:"Describe this page to provide additional context for your agent.",value:g,onChange:de=>C(de.target.value),rows:2})})}),(0,c.jsx)(Zx,{activeType:e,onSelect:t,onDragStart:u,scrollRef:D,fadeClass:V,blankCanvas:p}),y&&(0,c.jsx)("div",{className:`${B.paletteFooterWrap} ${h?B.footerHidden:""}`,children:(0,c.jsx)("div",{className:B.paletteFooterInner,children:(0,c.jsx)("div",{className:B.paletteFooterInnerContent,children:(0,c.jsxs)("div",{className:B.paletteFooter,children:[(0,c.jsx)("span",{className:B.paletteFooterCount,children:(0,c.jsx)(ev,{value:j.current,suffix:Q.current})}),(0,c.jsx)("button",{className:B.paletteFooterClear,onClick:a,children:"Clear"})]})})})})]})}var nv=new Set(["nav","header","main","section","article","footer","aside"]),j_={banner:"Header",navigation:"Navigation",main:"Main Content",contentinfo:"Footer",complementary:"Sidebar",region:"Section"},F0={nav:"Navigation",header:"Header",main:"Main Content",section:"Section",article:"Article",footer:"Footer",aside:"Sidebar"},ov=new Set(["script","style","noscript","link","meta"]),rv=40;function Lg(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let n=window.getComputedStyle(t).position;if(n==="fixed"||n==="sticky")return!0;t=t.parentElement}return!1}function oi(e){let t=e.tagName.toLowerCase();if(["nav","header","footer","main"].includes(t)&&document.querySelectorAll(t).length===1)return t;if(e.id)return`#${CSS.escape(e.id)}`;if(e.className&&typeof e.className=="string"){let r=e.className.split(/\s+/).filter(i=>i.length>0).find(i=>i.length>2&&!/^[a-zA-Z0-9]{6,}$/.test(i)&&!/^[a-z]{1,2}$/.test(i));if(r){let i=`${t}.${CSS.escape(r)}`;if(document.querySelectorAll(i).length===1)return i}}let n=e.parentElement;if(n){let r=Array.from(n.children).indexOf(e)+1;return`${n===document.body?"body":oi(n)} > ${t}:nth-child(${r})`}return t}function Lc(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("aria-label");if(n)return n;let o=e.getAttribute("role");if(o&&j_[o])return j_[o];if(F0[t])return F0[t];let r=e.querySelector("h1, h2, h3, h4, h5, h6");if(r){let l=r.textContent?.trim();if(l&&l.length<=50)return l;if(l)return l.slice(0,47)+"..."}let{name:i}=Vi(e);return i.charAt(0).toUpperCase()+i.slice(1)}function Ng(e){let t=e.className;return typeof t!="string"||!t?null:t.split(/\s+/).map(o=>o.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(o=>o.length>2&&!/^[a-z]{1,2}$/.test(o))||null}function Ig(e){let t=e.textContent?.trim();if(!t)return null;let n=t.replace(/\s+/g," ");return n.length<=30?n:n.slice(0,30)+"\u2026"}function iv(){let e=document.querySelector("main")||document.body,t=Array.from(e.children),n=t;e!==document.body&&t.length<3&&(n=Array.from(document.body.children));let o=[];return n.forEach((r,i)=>{if(!(r instanceof HTMLElement))return;let l=r.tagName.toLowerCase();if(ov.has(l)||r.hasAttribute("data-feedback-toolbar")||r.closest("[data-feedback-toolbar]"))return;let s=window.getComputedStyle(r);if(s.display==="none"||s.visibility==="hidden")return;let a=r.getBoundingClientRect();if(a.height<rv)return;let u=nv.has(l),p=r.getAttribute("role")&&j_[r.getAttribute("role")],f=l==="div"&&a.height>=60;if(!u&&!p&&!f)return;let g=window.scrollY,C=Lg(r),b={x:a.x,y:C?a.y:a.y+g,width:a.width,height:a.height};o.push({id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Lc(r),tagName:l,selector:oi(r),role:r.getAttribute("role"),className:Ng(r),textSnippet:Ig(r),originalRect:b,currentRect:{...b},originalIndex:i,isFixed:C})}),o}function lv(e){let t=window.scrollY,n=e.getBoundingClientRect(),o=Lg(e),r={x:n.x,y:o?n.y:n.y+t,width:n.width,height:n.height},i=e.parentElement,l=0;return i&&(l=Array.from(i.children).indexOf(e)),{id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Lc(e),tagName:e.tagName.toLowerCase(),selector:oi(e),role:e.getAttribute("role"),className:Ng(e),textSnippet:Ig(e),originalRect:r,currentRect:{...r},originalIndex:l,isFixed:o}}var W0={bg:"rgba(59, 130, 246, 0.08)",border:"rgba(59, 130, 246, 0.5)",pill:"#3b82f6"},j0=["nw","n","ne","e","se","s","sw","w"],gc=24,H0=16,yc=5;function U0(e,t,n,o){let r=1/0,i=1/0,l=e.x,s=e.x+e.width,a=e.x+e.width/2,u=e.y,p=e.y+e.height,f=e.y+e.height/2,g=[];for(let D of t)n.has(D.id)||g.push(D.currentRect);o&&g.push(...o);for(let D of g){let V=D.x,z=D.x+D.width,K=D.x+D.width/2,Z=D.y,J=D.y+D.height,de=D.y+D.height/2;for(let ie of[l,s,a])for(let ce of[V,z,K]){let pe=ce-ie;Math.abs(pe)<yc&&Math.abs(pe)<Math.abs(r)&&(r=pe)}for(let ie of[u,p,f])for(let ce of[Z,J,de]){let pe=ce-ie;Math.abs(pe)<yc&&Math.abs(pe)<Math.abs(i)&&(i=pe)}}let C=Math.abs(r)<yc?r:0,b=Math.abs(i)<yc?i:0,N=[],E=new Set,y=l+C,v=s+C,h=a+C,S=u+b,j=p+b,Q=f+b;for(let D of g){let V=D.x,z=D.x+D.width,K=D.x+D.width/2,Z=D.y,J=D.y+D.height,de=D.y+D.height/2;for(let ie of[V,K,z])for(let ce of[y,h,v])if(Math.abs(ce-ie)<.5){let pe=`x:${Math.round(ie)}`;E.has(pe)||(E.add(pe),N.push({axis:"x",pos:ie}))}for(let ie of[Z,de,J])for(let ce of[S,Q,j])if(Math.abs(ce-ie)<.5){let pe=`y:${Math.round(ie)}`;E.has(pe)||(E.add(pe),N.push({axis:"y",pos:ie}))}}return{dx:C,dy:b,guides:N}}var sv=new Set(["script","style","noscript","link","meta","br","hr"]);function Y0(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){if(t.closest("[data-feedback-toolbar]"))return null;if(sv.has(t.tagName.toLowerCase())){t=t.parentElement;continue}let n=t.getBoundingClientRect();if(n.width>=H0&&n.height>=H0)return t;t=t.parentElement}return null}function av({rearrangeState:e,onChange:t,isDarkMode:n,exiting:o,className:r,blankCanvas:i,extraSnapRects:l,onSelectionChange:s,deselectSignal:a,onDragMove:u,onDragEnd:p,clearing:f}){let{sections:g}=e,C=(0,Ce.useRef)(e);C.current=e;let[b,N]=(0,Ce.useState)(new Set);(0,Ce.useEffect)(()=>{f&&N(new Set)},[f]);let E=(0,Ce.useRef)(a);(0,Ce.useEffect)(()=>{a!==E.current&&(E.current=a,N(new Set))},[a]);let[y,v]=(0,Ce.useState)(null),[h,S]=(0,Ce.useState)(!1),j=(0,Ce.useRef)(!1),Q=(0,Ce.useCallback)(L=>{let R=g.find(O=>O.id===L);R&&(j.current=!!R.note,v(L),S(!1))},[g]),D=(0,Ce.useCallback)(()=>{y&&(S(!0),ot(()=>{v(null),S(!1)},150))},[y]),V=(0,Ce.useCallback)(L=>{y&&(t({...e,sections:g.map(R=>R.id===y?{...R,note:L.trim()||void 0}:R)}),D())},[y,g,e,t,D]);(0,Ce.useEffect)(()=>{o&&y&&D()},[o]);let[z,K]=(0,Ce.useState)(new Set),Z=(0,Ce.useRef)(new Map),[J,de]=(0,Ce.useState)(null),[ie,ce]=(0,Ce.useState)(null),[pe,bt]=(0,Ce.useState)([]),[ze,Ke]=(0,Ce.useState)(0),Oe=(0,Ce.useRef)(null),ft=(0,Ce.useRef)(new Set),Vt=(0,Ce.useRef)(new Map),[gn,Re]=(0,Ce.useState)(new Map),[qn,Lo]=(0,Ce.useState)(new Map),Xo=(0,Ce.useRef)(new Set),Go=(0,Ce.useRef)(new Map),No=(0,Ce.useRef)(s);No.current=s;let Io=(0,Ce.useRef)(u);Io.current=u;let Ro=(0,Ce.useRef)(p);Ro.current=p,(0,Ce.useEffect)(()=>{i&&N(new Set)},[i]);let[Dt,Kn]=(0,Ce.useState)(()=>!e.sections.some(L=>{let R=L.originalRect,O=L.currentRect;return Math.abs(R.x-O.x)>1||Math.abs(R.y-O.y)>1||Math.abs(R.width-O.width)>1||Math.abs(R.height-O.height)>1}));(0,Ce.useEffect)(()=>{if(!Dt){let L=ot(()=>Kn(!0),380);return()=>clearTimeout(L)}},[]);let fo=(0,Ce.useRef)(new Set);(0,Ce.useEffect)(()=>{fo.current=new Set(g.map(L=>L.selector))},[g]),(0,Ce.useEffect)(()=>{let L=()=>Ke(window.scrollY);return L(),window.addEventListener("scroll",L,{passive:!0}),window.addEventListener("resize",L,{passive:!0}),()=>{window.removeEventListener("scroll",L),window.removeEventListener("resize",L)}},[]),(0,Ce.useEffect)(()=>{let L=R=>{if(Oe.current){de(null);return}let O=document.elementFromPoint(R.clientX,R.clientY);if(!O){de(null);return}if(O.closest("[data-feedback-toolbar]")){de(null);return}if(O.closest("[data-design-placement]")){de(null);return}if(O.closest("[data-annotation-popup]")){de(null);return}let W=Y0(O);if(!W){de(null);return}for(let te of fo.current)try{let Y=document.querySelector(te);if(Y&&(Y===W||W.contains(Y))){de(null);return}}catch{}let ee=W.getBoundingClientRect();de({x:ee.x,y:ee.y,w:ee.width,h:ee.height})};return document.addEventListener("mousemove",L,{passive:!0}),()=>document.removeEventListener("mousemove",L)},[g]),(0,Ce.useEffect)(()=>{let L=document.body.style.userSelect;return document.body.style.webkitUserSelect="none",document.body.style.userSelect="none",()=>{document.body.style.webkitUserSelect=L,document.body.style.userSelect=L}},[]),(0,Ce.useEffect)(()=>{let L=R=>{if(Oe.current||R.button!==0)return;let O=R.composedPath()[0]??R.target;if(!O||O.closest("[data-feedback-toolbar]")||O.closest("[data-design-placement]")||O.closest("[data-annotation-popup]"))return;let W=Y0(O),ee=!1;if(W)for(let Y of fo.current)try{let ue=document.querySelector(Y);if(ue&&(ue===W||W.contains(ue))){ee=!0;break}}catch{}let te=!!(R.shiftKey||R.metaKey||R.ctrlKey);if(W&&!ee){R.preventDefault(),R.stopPropagation();let Y=lv(W),ue=[...g,Y],be=[...e.originalOrder,Y.id];t({...e,sections:ue,originalOrder:be});let Te=new Set([Y.id]);N(Te),No.current?.(Te,te),de(null);let it=R.clientX,at=R.clientY,Ze={x:Y.currentRect.x,y:Y.currentRect.y},We=Y.originalRect,Ie=!1,yt=0,mt=0;Oe.current="move";let ct=et=>{let ht=et.clientX-it,dt=et.clientY-at;if(!Ie&&(Math.abs(ht)>2||Math.abs(dt)>2)&&(Ie=!0),!Ie)return;let se={x:Ze.x+ht,y:Ze.y+dt,width:Y.currentRect.width,height:Y.currentRect.height},En=U0(se,ue,new Set([Y.id]),l);bt(En.guides);let yn=ht+En.dx,en=dt+En.dy;yt=yn,mt=en;let ho=H().querySelector(`[data-rearrange-section="${Y.id}"]`);ho&&(ho.style.transform=`translate(${yn}px, ${en}px)`),Re(new Map([[Y.id,{x:Ze.x+yn,y:Ze.y+en,width:Y.currentRect.width,height:Y.currentRect.height}]])),Io.current?.(yn,en)},Pe=()=>{window.removeEventListener("mousemove",ct),window.removeEventListener("mouseup",Pe),Oe.current=null,bt([]),Re(new Map);let et=H().querySelector(`[data-rearrange-section="${Y.id}"]`);et&&(et.style.transform=""),Ie&&t({...e,sections:ue.map(ht=>ht.id===Y.id?{...ht,currentRect:{...ht.currentRect,x:Math.max(0,Ze.x+yt),y:Math.max(0,Ze.y+mt)}}:ht),originalOrder:be}),Ro.current?.(yt,mt,Ie)};window.addEventListener("mousemove",ct),window.addEventListener("mouseup",Pe)}else if(ee&&W){R.preventDefault();for(let Y of g)try{let ue=document.querySelector(Y.selector);if(ue&&ue===W){let be=new Set([Y.id]);N(be),No.current?.(be,te);return}}catch{}te||(N(new Set),No.current?.(new Set,!1))}else te||(N(new Set),No.current?.(new Set,!1))};return document.addEventListener("mousedown",L,!0),()=>document.removeEventListener("mousedown",L,!0)},[g,e,t]),(0,Ce.useEffect)(()=>{let L=R=>{let O=R.composedPath()[0]||R.target;if(!(O.tagName==="INPUT"||O.tagName==="TEXTAREA"||O.isContentEditable)){if((R.key==="Backspace"||R.key==="Delete")&&b.size>0){R.preventDefault();let W=new Set(b);K(ee=>{let te=new Set(ee);for(let Y of W)te.add(Y);return te}),N(new Set),ot(()=>{let ee=C.current;t({...ee,sections:ee.sections.filter(te=>!W.has(te.id)),originalOrder:ee.originalOrder.filter(te=>!W.has(te))}),K(te=>{let Y=new Set(te);for(let ue of W)Y.delete(ue);return Y})},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(R.key)&&b.size>0){R.preventDefault();let W=R.shiftKey?20:1,ee=R.key==="ArrowLeft"?-W:R.key==="ArrowRight"?W:0,te=R.key==="ArrowUp"?-W:R.key==="ArrowDown"?W:0;t({...e,sections:g.map(Y=>b.has(Y.id)?{...Y,currentRect:{...Y.currentRect,x:Math.max(0,Y.currentRect.x+ee),y:Math.max(0,Y.currentRect.y+te)}}:Y)});return}R.key==="Escape"&&b.size>0&&N(new Set)}};return document.addEventListener("keydown",L),()=>document.removeEventListener("keydown",L)},[b,g,e,t]);let Cr=(0,Ce.useCallback)((L,R)=>{if(L.button!==0)return;let O=L.target;if(O.closest(`.${B.handle}`)||O.closest(`.${B.deleteButton}`))return;L.preventDefault(),L.stopPropagation();let W;L.shiftKey||L.metaKey||L.ctrlKey?(W=new Set(b),W.has(R)?W.delete(R):W.add(R)):b.has(R)?W=new Set(b):W=new Set([R]),N(W),(W.size!==b.size||[...W].some(Ie=>!b.has(Ie)))&&No.current?.(W,!!(L.shiftKey||L.metaKey||L.ctrlKey));let te=L.clientX,Y=L.clientY,ue=new Map;for(let Ie of g)W.has(Ie.id)&&ue.set(Ie.id,{x:Ie.currentRect.x,y:Ie.currentRect.y});Oe.current="move";let be=!1,Te=0,it=0,at=new Map;for(let Ie of g)if(W.has(Ie.id)){let yt=H().querySelector(`[data-rearrange-section="${Ie.id}"]`);at.set(Ie.id,{outlineEl:yt,curW:Ie.currentRect.width,curH:Ie.currentRect.height})}let Ze=Ie=>{let yt=Ie.clientX-te,mt=Ie.clientY-Y;if(yt===0&&mt===0)return;be=!0;let ct=1/0,Pe=1/0,et=-1/0,ht=-1/0;for(let[en,{curW:ho,curH:To}]of at){let Jn=ue.get(en);if(!Jn)continue;let Bn=Jn.x+yt,el=Jn.y+mt;ct=Math.min(ct,Bn),Pe=Math.min(Pe,el),et=Math.max(et,Bn+ho),ht=Math.max(ht,el+To)}let dt=U0({x:ct,y:Pe,width:et-ct,height:ht-Pe},g,W,l),se=yt+dt.dx,En=mt+dt.dy;Te=se,it=En,bt(dt.guides);for(let[,{outlineEl:en}]of at)en&&(en.style.transform=`translate(${se}px, ${En}px)`);let yn=new Map;for(let[en,{curW:ho,curH:To}]of at){let Jn=ue.get(en);if(Jn){let Bn={x:Math.max(0,Jn.x+se),y:Math.max(0,Jn.y+En),width:ho,height:To};yn.set(en,Bn)}}Re(yn),Io.current?.(se,En)},We=Ie=>{window.removeEventListener("mousemove",Ze),window.removeEventListener("mouseup",We),Oe.current=null,bt([]),Re(new Map);for(let[,{outlineEl:yt}]of at)yt&&(yt.style.transform="");if(be){let yt=Ie.clientX-te,mt=Ie.clientY-Y;if(Math.abs(yt)<5&&Math.abs(mt)<5)t({...e,sections:g.map(ct=>{let Pe=ue.get(ct.id);return Pe?{...ct,currentRect:{...ct.currentRect,x:Pe.x,y:Pe.y}}:ct})});else{t({...e,sections:g.map(ct=>{let Pe=ue.get(ct.id);return Pe?{...ct,currentRect:{...ct.currentRect,x:Math.max(0,Pe.x+Te),y:Math.max(0,Pe.y+it)}}:ct})}),Ro.current?.(Te,it,!0);return}}Ro.current?.(0,0,!1)};window.addEventListener("mousemove",Ze),window.addEventListener("mouseup",We)},[b,g,e,t]),Dn=(0,Ce.useCallback)((L,R,O)=>{L.preventDefault(),L.stopPropagation();let W=g.find(We=>We.id===R);if(!W)return;N(new Set([R])),Oe.current="resize";let ee=L.clientX,te=L.clientY,Y={...W.currentRect},ue=W.originalRect,be=Y.width/Y.height,Te={...Y},it=H().querySelector(`[data-rearrange-section="${R}"]`),at=We=>{let Ie=We.clientX-ee,yt=We.clientY-te,mt=Y.x,ct=Y.y,Pe=Y.width,et=Y.height;if(O.includes("e")&&(Pe=Math.max(gc,Y.width+Ie)),O.includes("w")&&(Pe=Math.max(gc,Y.width-Ie),mt=Y.x+Y.width-Pe),O.includes("s")&&(et=Math.max(gc,Y.height+yt)),O.includes("n")&&(et=Math.max(gc,Y.height-yt),ct=Y.y+Y.height-et),We.shiftKey)if(O.length===2){let dt=Math.abs(Pe-Y.width),se=Math.abs(et-Y.height);dt>se?et=Pe/be:Pe=et*be,O.includes("w")&&(mt=Y.x+Y.width-Pe),O.includes("n")&&(ct=Y.y+Y.height-et)}else O==="e"||O==="w"?et=Pe/be:Pe=et*be,O==="w"&&(mt=Y.x+Y.width-Pe),O==="n"&&(ct=Y.y+Y.height-et);Te={x:mt,y:ct,width:Pe,height:et},it&&(it.style.left=`${mt}px`,it.style.top=`${ct-ze}px`,it.style.width=`${Pe}px`,it.style.height=`${et}px`),ce({x:We.clientX+12,y:We.clientY+12,text:`${Math.round(Pe)} \xD7 ${Math.round(et)}`}),Re(new Map([[R,Te]]))},Ze=()=>{window.removeEventListener("mousemove",at),window.removeEventListener("mouseup",Ze),ce(null),Oe.current=null,Re(new Map),t({...e,sections:g.map(We=>We.id===R?{...We,currentRect:Te}:We)})};window.addEventListener("mousemove",at),window.addEventListener("mouseup",Ze)},[g,e,t,ze]),$o=(0,Ce.useCallback)(L=>{K(R=>{let O=new Set(R);return O.add(L),O}),N(R=>{let O=new Set(R);return O.delete(L),O}),ot(()=>{let R=C.current;t({...R,sections:R.sections.filter(O=>O.id!==L),originalOrder:R.originalOrder.filter(O=>O!==L)}),K(O=>{let W=new Set(O);return W.delete(L),W})},180)},[t]),q=L=>{let R=L.originalRect,O=L.currentRect;return Math.abs(R.x-O.x)>1||Math.abs(R.y-O.y)>1||Math.abs(R.width-O.width)>1||Math.abs(R.height-O.height)>1},he=L=>{let R=L.originalRect,O=L.currentRect;return Math.abs(R.x-O.x)>1||Math.abs(R.y-O.y)>1},Ne=L=>{let R=L.originalRect,O=L.currentRect;return Math.abs(R.width-O.width)>1||Math.abs(R.height-O.height)>1};for(let L of g)Vt.current.has(L.id)||(he(L)?Vt.current.set(L.id,"move"):Ne(L)&&Vt.current.set(L.id,"resize"));for(let L of Vt.current.keys())g.some(R=>R.id===L)||Vt.current.delete(L);let Se=g.filter(L=>{try{if(z.has(L.id)||b.has(L.id))return!0;let R=document.querySelector(L.selector);if(!R)return!1;let O=R.getBoundingClientRect(),W=L.originalRect;return Math.abs(O.width-W.width)+Math.abs(O.height-W.height)<200}catch{return!1}}),we=Se.filter(L=>q(L)),Je=Se.filter(L=>!q(L)),Fe=new Set(we.map(L=>L.id));for(let L of ft.current)Fe.has(L)||ft.current.delete(L);let Qe=[...Fe].sort().join(",");for(let L of we)Go.current.set(L.id,{currentRect:L.currentRect,originalRect:L.originalRect,isFixed:L.isFixed});(0,Ce.useEffect)(()=>{let L=Xo.current;Xo.current=Fe;let R=new Map;for(let O of L)if(!Fe.has(O)){if(!g.some(ee=>ee.id===O))continue;let W=Go.current.get(O);W&&(R.set(O,{orig:W.originalRect,target:W.currentRect,isFixed:W.isFixed}),Go.current.delete(O))}if(R.size>0){Lo(W=>{let ee=new Map(W);for(let[te,Y]of R)ee.set(te,Y);return ee});let O=ot(()=>{Lo(W=>{let ee=new Map(W);for(let te of R.keys())ee.delete(te);return ee})},250);return()=>clearTimeout(O)}},[Qe,g]);let Ue=(0,Ce.useRef)(null),H=()=>Ue.current?.getRootNode()??document;return(0,Ye.jsxs)(Ye.Fragment,{children:[(0,Ye.jsxs)("div",{ref:Ue,className:`${B.rearrangeOverlay} ${n?"":B.light} ${o?B.overlayExiting:""}${r?` ${r}`:""}`,"data-feedback-toolbar":!0,children:[J&&(0,Ye.jsx)("div",{className:B.hoverHighlight,style:{left:J.x,top:J.y,width:J.w,height:J.h}}),Je.map(L=>{let R=L.currentRect,O=L.isFixed?R.y:R.y-ze,W=W0,ee=b.has(L.id);return(0,Ye.jsxs)("div",{"data-rearrange-section":L.id,className:`${B.sectionOutline} ${ee?B.selected:""} ${f||o||z.has(L.id)?B.exiting:""}`,style:{left:R.x,top:O,width:R.width,height:R.height,borderColor:W.border,backgroundColor:W.bg,...Dt?{}:{opacity:0,animation:"none",transition:"none"}},onMouseDown:te=>Cr(te,L.id),onDoubleClick:()=>Q(L.id),children:[(0,Ye.jsx)("span",{className:B.sectionLabel,style:{backgroundColor:W.pill},children:L.label}),(0,Ye.jsx)("span",{className:`${B.sectionAnnotation} ${L.note?B.annotationVisible:""}`,children:(L.note&&Z.current.set(L.id,L.note),L.note||Z.current.get(L.id)||"")}),(0,Ye.jsxs)("span",{className:B.sectionDimensions,children:[Math.round(R.width)," \xD7 ",Math.round(R.height)]}),(0,Ye.jsx)("div",{className:B.deleteButton,onMouseDown:te=>te.stopPropagation(),onClick:()=>$o(L.id),children:"\u2715"}),j0.map(te=>(0,Ye.jsx)("div",{className:`${B.handle} ${B[`handle${te.charAt(0).toUpperCase()}${te.slice(1)}`]}`,onMouseDown:Y=>Dn(Y,L.id,te)},te))]},L.id)}),we.map(L=>{let R=L.currentRect,O=L.isFixed?R.y:R.y-ze,W=b.has(L.id),ee=he(L),te=Ne(L);if(i&&!W)return null;let ue=!ft.current.has(L.id);return ue&&ft.current.add(L.id),(0,Ye.jsxs)("div",{"data-rearrange-section":L.id,className:`${B.ghostOutline} ${W?B.selected:""} ${f||o||z.has(L.id)?B.exiting:""}`,style:{left:R.x,top:O,width:R.width,height:R.height,...Dt?{}:{opacity:0,animation:"none",transition:"none"},...ue?{}:{animation:"none"}},onMouseDown:be=>Cr(be,L.id),onDoubleClick:()=>Q(L.id),children:[(0,Ye.jsx)("span",{className:B.sectionLabel,style:{backgroundColor:W0.pill},children:L.label}),(0,Ye.jsx)("span",{className:`${B.sectionAnnotation} ${L.note?B.annotationVisible:""}`,children:(L.note&&Z.current.set(L.id,L.note),L.note||Z.current.get(L.id)||"")}),(0,Ye.jsxs)("span",{className:B.sectionDimensions,children:[Math.round(R.width)," \xD7 ",Math.round(R.height)]}),(0,Ye.jsx)("div",{className:B.deleteButton,onMouseDown:be=>be.stopPropagation(),onClick:()=>$o(L.id),children:"\u2715"}),j0.map(be=>(0,Ye.jsx)("div",{className:`${B.handle} ${B[`handle${be.charAt(0).toUpperCase()}${be.slice(1)}`]}`,onMouseDown:Te=>Dn(Te,L.id,be)},be)),(0,Ye.jsx)("span",{className:B.ghostBadge,children:(()=>{let be=Vt.current.get(L.id);if(ee&&te){let[Te,it]=be==="resize"?["Resize","Move"]:["Move","Resize"];return(0,Ye.jsxs)(Ye.Fragment,{children:["Suggested ",Te," ",(0,Ye.jsxs)("span",{className:B.ghostBadgeExtra,children:["& ",it]})]})}return`Suggested ${te?"Resize":"Move"}`})()})]},L.id)})]}),!i&&(()=>{let L=[];for(let R of we){let O=gn.get(R.id);L.push({id:R.id,orig:R.originalRect,target:O||R.currentRect,isFixed:R.isFixed,isSelected:b.has(R.id),isExiting:z.has(R.id)})}for(let[R,O]of gn)if(!L.some(W=>W.id===R)){let W=g.find(ee=>ee.id===R);W&&L.push({id:R,orig:W.originalRect,target:O,isFixed:W.isFixed,isSelected:b.has(R)})}for(let[R,O]of qn)L.some(W=>W.id===R)||L.push({id:R,orig:O.orig,target:O.target,isFixed:O.isFixed,isSelected:!1,isExiting:!0});return L.length===0?null:(0,Ye.jsxs)("svg",{className:`${B.connectorSvg} ${f||o?B.connectorExiting:""}`,children:[L.map(({id:R,orig:O,target:W,isFixed:ee,isSelected:te,isExiting:Y})=>{let ue=O.x+O.width/2,be=(ee?O.y:O.y-ze)+O.height/2,Te=W.x+W.width/2,it=(ee?W.y:W.y-ze)+W.height/2,at=Te-ue,Ze=it-be,We=Math.sqrt(at*at+Ze*Ze);if(We<2)return null;let Ie=Math.min(1,We/40),yt=Math.min(We*.3,60),mt=We>0?-Ze/We:0,ct=We>0?at/We:0,Pe=(ue+Te)/2+mt*yt,et=(be+it)/2+ct*yt,ht=gn.has(R),dt=ht||te?1:.4,se=ht||te?1:.5;return(0,Ye.jsxs)("g",{className:Y?B.connectorExiting:"",children:[(0,Ye.jsx)("path",{className:B.connectorLine,d:`M ${ue} ${be} Q ${Pe} ${et} ${Te} ${it}`,fill:"none",stroke:"rgba(59, 130, 246, 0.45)",strokeWidth:"1.5",opacity:dt*Ie}),(0,Ye.jsx)("circle",{className:B.connectorDot,cx:ue,cy:be,r:4*Ie,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:se*Ie,filter:"url(#connDotShadow)"}),(0,Ye.jsx)("circle",{className:B.connectorDot,cx:Te,cy:it,r:4*Ie,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:se*Ie,filter:"url(#connDotShadow)"})]},`conn-${R}`)}),(0,Ye.jsx)("defs",{children:(0,Ye.jsx)("filter",{id:"connDotShadow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:(0,Ye.jsx)("feDropShadow",{dx:"0",dy:"0.5",stdDeviation:"1",floodOpacity:"0.15"})})})]})})(),y&&(()=>{let L=g.find(it=>it.id===y);if(!L)return null;let R=L.currentRect,O=L.isFixed?R.y:R.y-ze,W=R.x+R.width/2,ee=O-8,te=O+R.height+8,Y=ee>200,ue=te<window.innerHeight-100,be=Math.max(160,Math.min(window.innerWidth-160,W)),Te;return Y?Te={left:be,bottom:window.innerHeight-ee}:ue?Te={left:be,top:te}:Te={left:be,top:Math.max(80,window.innerHeight/2-80)},(0,Ye.jsx)(Z_,{element:L.label,placeholder:"Add a note about this section",initialValue:L.note??"",submitLabel:j.current?"Save":"Set",onSubmit:V,onCancel:D,onDelete:j.current?()=>{V("")}:void 0,isExiting:h,lightMode:!n,style:Te})})(),ie&&(0,Ye.jsx)("div",{className:B.sizeIndicator,style:{left:ie.x,top:ie.y},"data-feedback-toolbar":!0,children:ie.text}),pe.map((L,R)=>(0,Ye.jsx)("div",{className:B.guideLine,style:L.axis==="x"?{position:"fixed",left:L.pos,top:0,width:1,height:"100vh"}:{position:"fixed",left:0,top:L.pos-ze,width:"100vw",height:1}},`${L.axis}-${L.pos}-${R}`))]})}var H_=new Set(["script","style","noscript","link","meta","br","hr"]);function cv(){let e=document.querySelector("main")||document.body,t=[],n=Array.from(e.children),o=e!==document.body&&n.length<3?Array.from(document.body.children):n;for(let r of o){if(!(r instanceof HTMLElement)||H_.has(r.tagName.toLowerCase())||r.hasAttribute("data-feedback-toolbar"))continue;let i=window.getComputedStyle(r);if(i.display==="none"||i.visibility==="hidden")continue;let l=r.getBoundingClientRect();if(!(l.height<10||l.width<10)){t.push({label:Lc(r),selector:oi(r),top:l.top,bottom:l.bottom,left:l.left,right:l.right,area:l.width*l.height});for(let s of Array.from(r.children)){if(!(s instanceof HTMLElement)||H_.has(s.tagName.toLowerCase())||s.hasAttribute("data-feedback-toolbar"))continue;let a=window.getComputedStyle(s);if(a.display==="none"||a.visibility==="hidden")continue;let u=s.getBoundingClientRect();u.height<10||u.width<10||t.push({label:Lc(s),selector:oi(s),top:u.top,bottom:u.bottom,left:u.left,right:u.right,area:u.width*u.height})}}}return t}function dv(e){let t=window.scrollY;return e.map(({label:n,selector:o,rect:r})=>{let i=r.y-t;return{label:n,selector:o,top:i,bottom:i+r.height,left:r.x,right:r.x+r.width,area:r.width*r.height}})}function uv(e){let t=window.scrollY,n=e.y-t,o=e.x;return{top:n,bottom:n+e.height,left:o,right:o+e.width,area:e.width*e.height}}function U_(e,t){let n=t?dv(t):cv(),o=uv(e),r=null,i=null,l=null,s=null,a=null;for(let b of n){if(Math.abs(b.left-o.left)<2&&Math.abs(b.top-o.top)<2&&Math.abs(b.right-b.left-e.width)<2&&Math.abs(b.bottom-b.top-e.height)<2)continue;b.left<=o.left+2&&b.right>=o.right-2&&b.top<=o.top+2&&b.bottom>=o.bottom-2&&b.area>o.area*1.5&&(!a||b.area<a._area)&&(a={label:b.label,selector:b.selector,_area:b.area});let N=o.right>b.left+5&&o.left<b.right-5,E=o.bottom>b.top+5&&o.top<b.bottom-5;if(N&&b.bottom<=o.top+5){let y=Math.round(o.top-b.bottom);(!r||y<r._dist)&&(r={label:b.label,selector:b.selector,gap:Math.max(0,y),_dist:y})}if(N&&b.top>=o.bottom-5){let y=Math.round(b.top-o.bottom);(!i||y<i._dist)&&(i={label:b.label,selector:b.selector,gap:Math.max(0,y),_dist:y})}if(E&&b.right<=o.left+5){let y=Math.round(o.left-b.right);(!l||y<l._dist)&&(l={label:b.label,selector:b.selector,gap:Math.max(0,y),_dist:y})}if(E&&b.left>=o.right-5){let y=Math.round(b.left-o.right);(!s||y<s._dist)&&(s={label:b.label,selector:b.selector,gap:Math.max(0,y),_dist:y})}}let u=window.innerWidth,p=window.innerHeight,f=fv(e,u),g=b=>b?{label:b.label,selector:b.selector,gap:b.gap}:null,C=_v(o,e,u,p,a?{label:a.label,selector:a.selector,_area:a._area}:null,n);return{above:g(r),below:g(i),left:g(l),right:g(s),alignment:f,containedIn:a?{label:a.label,selector:a.selector}:null,outOfBounds:C}}function _v(e,t,n,o,r,i){let l={},s=!1,a=[];if(e.left<-2&&a.push("left"),e.right>n+2&&a.push("right"),e.top<-2&&a.push("top"),e.bottom>o+2&&a.push("bottom"),a.length>0&&(l.viewport=a,s=!0),r){let u=i.find(p=>p.label===r.label&&p.selector===r.selector&&Math.abs(p.area-r._area)<10);if(u){let p=[];e.left<u.left-2&&p.push("left"),e.right>u.right+2&&p.push("right"),e.top<u.top-2&&p.push("top"),e.bottom>u.bottom+2&&p.push("bottom"),p.length>0&&(l.container={label:r.label,edges:p},s=!0)}}return s?l:null}function fv(e,t){if(e.width/t>.85)return"full-width";let o=e.x+e.width/2,r=t/2,i=o-r,l=t*.08;return Math.abs(i)<l?"center":i<0?"left":"right"}function Rg(e){switch(e){case"full-width":return"full-width";case"center":return"centered";case"left":return"left-aligned";case"right":return"right-aligned"}}function $g(e,t={}){let n=[];e.above&&n.push(`Below \`${e.above.label}\`${e.above.gap>0?` (${e.above.gap}px gap)`:""}`),e.below&&n.push(`Above \`${e.below.label}\`${e.below.gap>0?` (${e.below.gap}px gap)`:""}`),t.includeLeftRight&&(e.left&&n.push(`Right of \`${e.left.label}\`${e.left.gap>0?` (${e.left.gap}px gap)`:""}`),e.right&&n.push(`Left of \`${e.right.label}\`${e.right.gap>0?` (${e.right.gap}px gap)`:""}`));let o=Rg(e.alignment);return e.containedIn?n.push(`${o.charAt(0).toUpperCase()+o.slice(1)} in \`${e.containedIn.label}\``):n.push(`${o.charAt(0).toUpperCase()+o.slice(1)} in page`),t.includePixelRef&&t.pixelRef&&n.push(`Pixel ref: \`${t.pixelRef}\``),e.outOfBounds&&(e.outOfBounds.viewport&&n.push(`**Outside viewport** (${e.outOfBounds.viewport.join(", ")} edge${e.outOfBounds.viewport.length>1?"s":""})`),e.outOfBounds.container&&n.push(`**Outside \`${e.outOfBounds.container.label}\`** (${e.outOfBounds.container.edges.join(", ")} edge${e.outOfBounds.container.edges.length>1?"s":""})`)),n}function hv(e,t,n){let o=[];e.above&&o.push(`below \`${e.above.label}\``),e.below&&o.push(`above \`${e.below.label}\``),e.left&&o.push(`right of \`${e.left.label}\``),e.right&&o.push(`left of \`${e.right.label}\``),e.containedIn&&o.push(`inside \`${e.containedIn.label}\``),o.push(Rg(e.alignment)),e.outOfBounds?.viewport&&o.push(`**outside viewport** (${e.outOfBounds.viewport.join(", ")})`),e.outOfBounds?.container&&o.push(`**outside \`${e.outOfBounds.container.label}\`** (${e.outOfBounds.container.edges.join(", ")})`);let r=n?`, ${Math.round(n.width)}\xD7${Math.round(n.height)}px`:"";return`at (${Math.round(t.x)}, ${Math.round(t.y)})${r}: ${o.join(", ")}`}var Q0=15;function V0(e){if(e.length<2)return[];let t=[],n=new Set;for(let o=0;o<e.length;o++){if(n.has(o))continue;let r=[o];for(let i=o+1;i<e.length;i++)n.has(i)||Math.abs(e[o].rect.y-e[i].rect.y)<Q0&&r.push(i);if(r.length>=2){let i=r.map(a=>e[a]);i.sort((a,u)=>a.rect.x-u.rect.x);let l=[];for(let a=0;a<i.length-1;a++)l.push(Math.round(i[a+1].rect.x-(i[a].rect.x+i[a].rect.width)));let s=Math.round(i.reduce((a,u)=>a+u.rect.y,0)/i.length);t.push({labels:i.map(a=>a.label),type:"row",sharedEdge:s,gaps:l,avgGap:l.length?Math.round(l.reduce((a,u)=>a+u,0)/l.length):0}),r.forEach(a=>n.add(a))}}for(let o=0;o<e.length;o++){if(n.has(o))continue;let r=[o];for(let i=o+1;i<e.length;i++)n.has(i)||Math.abs(e[o].rect.x-e[i].rect.x)<Q0&&r.push(i);if(r.length>=2){let i=r.map(a=>e[a]);i.sort((a,u)=>a.rect.y-u.rect.y);let l=[];for(let a=0;a<i.length-1;a++)l.push(Math.round(i[a+1].rect.y-(i[a].rect.y+i[a].rect.height)));let s=Math.round(i.reduce((a,u)=>a+u.rect.x,0)/i.length);t.push({labels:i.map(a=>a.label),type:"column",sharedEdge:s,gaps:l,avgGap:l.length?Math.round(l.reduce((a,u)=>a+u,0)/l.length):0}),r.forEach(a=>n.add(a))}}return t}function pv(e){if(e.length<2)return[];let t=V0(e.map(l=>({label:l.label,rect:l.originalRect}))),n=V0(e.map(l=>({label:l.label,rect:l.currentRect}))),o=[],r=new Set;for(let l of t){let s=new Set(l.labels),a=null,u=0;for(let p of n){let f=p.labels.filter(g=>s.has(g)).length;f>=2&&f>u&&(a=p,u=f)}if(a){let p=a.labels.filter(g=>s.has(g)),f=p.join(", ");if(a.type!==l.type){let g=l.type==="row"?"y":"x",C=a.type==="row"?"y":"x";o.push(`**${f}**: ${l.type} (${g}\u2248${l.sharedEdge}, ${l.avgGap}px gaps) \u2192 ${a.type} (${C}\u2248${a.sharedEdge}, ${a.avgGap}px gaps)`)}else if(Math.abs(l.sharedEdge-a.sharedEdge)>20||Math.abs(l.avgGap-a.avgGap)>5){let g=l.type==="row"?"y":"x",C=Math.abs(l.sharedEdge-a.sharedEdge)>20?` ${g}: ${l.sharedEdge} \u2192 ${a.sharedEdge}`:"",b=Math.abs(l.avgGap-a.avgGap)>5?` gaps: ${l.avgGap}px \u2192 ${a.avgGap}px`:"";o.push(`**${f}**: ${l.type} shifted \u2014${C}${b}`)}p.forEach(g=>r.add(g))}else{let p=l.labels.join(", "),f=l.type==="row"?"y":"x";o.push(`**${p}**: ${l.type} (${f}\u2248${l.sharedEdge}) dissolved`),l.labels.forEach(g=>r.add(g))}}for(let l of n){if(l.labels.every(u=>r.has(u))||l.labels.filter(u=>!r.has(u)).length<2)continue;if(!t.some(u=>u.labels.filter(f=>l.labels.includes(f)).length>=2)){let u=l.type==="row"?"y":"x";o.push(`**${l.labels.join(", ")}**: new ${l.type} (${u}\u2248${l.sharedEdge}, ${l.avgGap}px gaps)`),l.labels.forEach(p=>r.add(p))}}let i=e.filter(l=>!r.has(l.label));if(i.length>=2){let l={};for(let s of i){let a=Math.round(s.currentRect.x/5)*5;(l[a]??(l[a]=[])).push(s.label)}for(let[s,a]of Object.entries(l))a.length>=2&&o.push(`**${a.join(", ")}**: shared left edge at x\u2248${s}`)}return o}function Tg(e){if(typeof document>"u")return{viewport:e,contentArea:null};let t=[],n=new Set,o=s=>{n.has(s)||s instanceof HTMLElement&&(s.hasAttribute("data-feedback-toolbar")||H_.has(s.tagName.toLowerCase())||(n.add(s),t.push(s)))},r=document.querySelector("main");r&&o(r);let i=document.querySelector("[role='main']");i&&o(i);for(let s of Array.from(document.body.children))if(o(s),s.children){for(let a of Array.from(s.children))if(o(a),a.children)for(let u of Array.from(a.children))o(u)}let l=null;for(let s of t){let a=s.getBoundingClientRect();if(a.height<50)continue;let u=getComputedStyle(s);if(u.maxWidth&&u.maxWidth!=="none"&&u.maxWidth!=="0px"){(!l||a.width<l.rect.width)&&(l={el:s,rect:a});continue}!l&&a.width<e.width-20&&a.width>100&&(l={el:s,rect:a})}if(l){let{el:s,rect:a}=l;return{viewport:e,contentArea:{width:Math.round(a.width),left:Math.round(a.left),right:Math.round(a.right),centerX:Math.round(a.left+a.width/2),selector:oi(s)}}}return{viewport:e,contentArea:null}}function mv(e){if(typeof document>"u")return null;let t=document.querySelector(e);if(!t?.parentElement)return null;let n=getComputedStyle(t.parentElement),o={parentDisplay:n.display,parentSelector:oi(t.parentElement)};return n.display.includes("flex")&&(o.flexDirection=n.flexDirection),n.display.includes("grid")&&n.gridTemplateColumns!=="none"&&(o.gridCols=n.gridTemplateColumns),n.gap&&n.gap!=="normal"&&n.gap!=="0px"&&(o.gap=n.gap),o}function Pg(e,t){let n=t.contentArea,o=n?n.width:t.viewport.width,r=n?n.left:0,i=n?n.centerX:Math.round(t.viewport.width/2),l=Math.round(e.x-r),s=Math.round(r+o-(e.x+e.width)),a=(e.width/o*100).toFixed(1),u=e.x+e.width/2,p=Math.abs(u-i)<20,f=e.width/o>.95,g=[];return f?g.push("`width: 100%` of container"):g.push(`left \`${l}px\` in container, right \`${s}px\`, width \`${a}%\` (\`${Math.round(e.width)}px\`)`),p&&!f&&g.push("centered \u2014 `margin-inline: auto`"),g.join(" \u2014 ")}function Dg(e){let{viewport:t,contentArea:n}=e,o=`### Reference Frame
`;if(o+=`- Viewport: \`${t.width}\xD7${t.height}px\`
`,n){let r=n;o+=`- Content area: \`${r.width}px\` wide, left edge at \`x=${r.left}\`, right at \`x=${r.right}\` (\`${r.selector}\`)
`,o+=`- Pixel \u2192 CSS translation:
`,o+=`  - **Horizontal position in container**: \`element.x - ${r.left}\` \u2192 use as \`margin-left\` or \`left\`
`,o+=`  - **Width as % of container**: \`element.width / ${r.width} \xD7 100\` \u2192 use as \`width: X%\`
`,o+="  - **Vertical gap between elements**: `nextElement.y - (prevElement.y + prevElement.height)` \u2192 use as `margin-top` or `gap`\n",o+=`  - **Centered**: if \`|element.centerX - ${r.centerX}| < 20px\` \u2192 use \`margin-inline: auto\`
`}else o+=`- No distinct content container \u2014 elements positioned relative to full viewport
`,o+=`- Pixel \u2192 CSS translation:
`,o+=`  - **Width as % of viewport**: \`element.width / ${t.width} \xD7 100\` \u2192 use as \`width: X%\`
`,o+=`  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(t.width/2)}| < 20px\` \u2192 use \`margin-inline: auto\`
`;return o+=`
`,o}function gv(e){let t=mv(e);if(!t)return null;let n=`\`${t.parentDisplay}\``;return t.flexDirection&&(n+=`, flex-direction: \`${t.flexDirection}\``),t.gridCols&&(n+=`, grid-template-columns: \`${t.gridCols}\``),t.gap&&(n+=`, gap: \`${t.gap}\``),`Parent: ${n} (\`${t.parentSelector}\`)`}function X0(e,t,n,o="standard"){if(e.length===0)return"";let r=[...e].sort((E,y)=>Math.abs(E.y-y.y)<20?E.x-y.x:E.y-y.y),i="";if(n?.blankCanvas?(i+=`## Wireframe: New Page

`,n.wireframePurpose&&(i+=`> **Purpose:** ${n.wireframePurpose}
>
`),i+=`> ${e.length} component${e.length!==1?"s":""} placed \u2014 this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`):i+=`## Design Layout

> ${e.length} component${e.length!==1?"s":""} placed

`,o==="compact")return i+=`### Components
`,r.forEach((E,y)=>{let v=_o[E.type]?.label||E.type;i+=`${y+1}. **${v}** \u2014 \`${Math.round(E.width)}\xD7${Math.round(E.height)}px\` at \`(${Math.round(E.x)}, ${Math.round(E.y)})\`
`,E.text&&(i+=`   - Note: "${E.text}"
`)}),i;let l=Tg(t);i+=Dg(l),i+=`### Components
`,r.forEach((E,y)=>{let v=_o[E.type]?.label||E.type,h={x:E.x,y:E.y,width:E.width,height:E.height};i+=`${y+1}. **${v}** \u2014 \`${Math.round(E.width)}\xD7${Math.round(E.height)}px\` at \`(${Math.round(E.x)}, ${Math.round(E.y)})\`
`,E.text&&(i+=`   - Note: "${E.text}"
`);let S=U_(h),Q=$g(S,{includeLeftRight:o==="detailed"||o==="forensic"});for(let V of Q)i+=`   - ${V}
`;let D=Pg(h,l);D&&(i+=`   - CSS: ${D}
`)}),i+=`
### Layout Analysis
`;let s=[];for(let E of r){let y=s.find(v=>Math.abs(v.y-E.y)<30);y?y.items.push(E):s.push({y:E.y,items:[E]})}if(s.sort((E,y)=>E.y-y.y),s.forEach((E,y)=>{E.items.sort((h,S)=>h.x-S.x);let v=E.items.map(h=>_o[h.type]?.label||h.type);if(E.items.length===1){let S=E.items[0].width>t.width*.8;i+=`- Row ${y+1} (y\u2248${Math.round(E.y)}): ${v[0]}${S?" \u2014 full width":""}
`}else i+=`- Row ${y+1} (y\u2248${Math.round(E.y)}): ${v.join(" | ")} \u2014 ${E.items.length} items side by side
`}),o==="detailed"||o==="forensic"){i+=`
### Spacing & Gaps
`;for(let E=0;E<r.length-1;E++){let y=r[E],v=r[E+1],h=_o[y.type]?.label||y.type,S=_o[v.type]?.label||v.type,j=Math.round(v.y-(y.y+y.height)),Q=Math.round(v.x-(y.x+y.width));Math.abs(y.y-v.y)<30?i+=`- ${h} \u2192 ${S}: \`${Q}px\` horizontal gap
`:i+=`- ${h} \u2192 ${S}: \`${j}px\` vertical gap
`}if(o==="forensic"&&r.length>2){i+=`
### All Pairwise Gaps
`;for(let E=0;E<r.length;E++)for(let y=E+1;y<r.length;y++){let v=r[E],h=r[y],S=_o[v.type]?.label||v.type,j=_o[h.type]?.label||h.type,Q=Math.round(h.y-(v.y+v.height)),D=Math.round(h.x-(v.x+v.width));i+=`- ${S} \u2194 ${j}: h=\`${D}px\` v=\`${Q}px\`
`}}o==="forensic"&&(i+=`
### Z-Order (placement order)
`,e.forEach((E,y)=>{let v=_o[E.type]?.label||E.type;i+=`${y}. ${v} at \`(${Math.round(E.x)}, ${Math.round(E.y)})\`
`}))}i+=`
### Suggested Implementation
`;let a=r.some(E=>E.type==="navigation"),u=r.some(E=>E.type==="hero"),p=r.some(E=>E.type==="sidebar"),f=r.some(E=>E.type==="footer"),g=r.filter(E=>E.type==="card"),C=r.filter(E=>E.type==="form"),b=r.filter(E=>E.type==="table"),N=r.filter(E=>E.type==="modal");if(a&&(i+=`- Top navigation bar with logo + nav links + CTA
`),u&&(i+=`- Hero section with heading, subtext, and call-to-action
`),p&&(i+=`- Sidebar layout \u2014 use CSS Grid with sidebar + main content area
`),g.length>1?i+=`- ${g.length}-column card grid \u2014 use CSS Grid or Flexbox
`:g.length===1&&(i+=`- Card component with image + content area
`),C.length>0&&(i+=`- ${C.length} form${C.length>1?"s":""} \u2014 add proper labels, validation, and submit handling
`),b.length>0&&(i+=`- Data table \u2014 consider sortable columns and pagination
`),N.length>0&&(i+=`- Modal dialog \u2014 add overlay backdrop and focus trapping
`),f&&(i+=`- Multi-column footer with links
`),o==="detailed"||o==="forensic"){if(i+=`
### CSS Suggestions
`,p){let E=r.find(y=>y.type==="sidebar");i+=`- \`display: grid; grid-template-columns: ${Math.round(E.width)}px 1fr;\`
`}if(g.length>1){let E=Math.round(g[0].width);i+=`- \`display: grid; grid-template-columns: repeat(${g.length}, ${E}px); gap: 16px;\`
`}a&&(i+="- Navigation: `position: sticky; top: 0; z-index: 50;`\n")}return i}function G0(e,t="standard",n){let{sections:o}=e,r=[];for(let p of o){let f=p.originalRect,g=p.currentRect,C=Math.abs(f.x-g.x)>1||Math.abs(f.y-g.y)>1,b=Math.abs(f.width-g.width)>1||Math.abs(f.height-g.height)>1,N=!!p.note;if(!C&&!b&&!N){t==="forensic"&&r.push({section:p,posMoved:!1,sizeChanged:!1});continue}r.push({section:p,posMoved:C,sizeChanged:b})}if(r.length===0||t!=="forensic"&&r.every(p=>!p.posMoved&&!p.sizeChanged&&!p.section.note))return"";let i=`## Suggested Layout Changes

`,l=n?n.width:typeof window<"u"?window.innerWidth:0,s=n?n.height:typeof window<"u"?window.innerHeight:0,a=Tg({width:l,height:s});t!=="compact"&&(i+=Dg(a)),t==="forensic"&&(i+=`> Detected at: \`${new Date(e.detectedAt).toISOString()}\`
`,i+=`> Total sections: ${o.length}

`);let u=p=>o.map(f=>({label:f.label,selector:f.selector,rect:p==="original"?f.originalRect:f.currentRect}));i+=`**Changes:**
`;for(let{section:p,posMoved:f,sizeChanged:g}of r){let C=p.originalRect,b=p.currentRect;if(!f&&!g){p.note?(i+=`- **${p.label}** \u2014 note only
`,i+=`  - Note: "${p.note}"
`):i+=`- ${p.label} \u2014 unchanged at (${Math.round(b.x)}, ${Math.round(b.y)}) ${Math.round(b.width)}\xD7${Math.round(b.height)}px
`;continue}if(t==="compact"){f&&g?i+=`- Suggested: move **${p.label}** to (${Math.round(b.x)}, ${Math.round(b.y)}) ${Math.round(b.width)}\xD7${Math.round(b.height)}px
`:f?i+=`- Suggested: move **${p.label}** to (${Math.round(b.x)}, ${Math.round(b.y)})
`:i+=`- Suggested: resize **${p.label}** to ${Math.round(b.width)}\xD7${Math.round(b.height)}px
`,p.note&&(i+=`  - Note: "${p.note}"
`);continue}if(f&&g?i+=`- Suggested: move and resize **${p.label}**
`:f?i+=`- Suggested: move **${p.label}**
`:i+=`- Suggested: resize **${p.label}** from ${Math.round(C.width)}\xD7${Math.round(C.height)}px to ${Math.round(b.width)}\xD7${Math.round(b.height)}px
`,p.note&&(i+=`  - Note: "${p.note}"
`),f){let E=U_(C,u("original")),y=U_(b,u("current")),v=g?{width:C.width,height:C.height}:void 0;i+=`  - Currently ${hv(E,{x:C.x,y:C.y},v)}
`;let h=g?{width:b.width,height:b.height}:void 0,S=`at (${Math.round(b.x)}, ${Math.round(b.y)})`,j=h?`, ${Math.round(h.width)}\xD7${Math.round(h.height)}px`:"",D=$g(y,{includeLeftRight:t==="detailed"||t==="forensic"});if(D.length>0){i+=`  - Suggested position ${S}${j}: ${D[0]}
`;for(let z=1;z<D.length;z++)i+=`    ${D[z]}
`}else i+=`  - Suggested position ${S}${j}
`;let V=Pg(b,a);V&&(i+=`  - CSS: ${V}
`)}let N=gv(p.selector);if(N&&(i+=`  - ${N}
`),i+=`  - Selector: \`${p.selector}\`
`,t==="detailed"||t==="forensic"){let E=p.className?`${p.tagName}.${p.className.split(" ")[0]}`:p.tagName;E!==p.selector&&(i+=`  - Element: \`${E}\`
`),p.role&&(i+=`  - Role: \`${p.role}\`
`),t==="forensic"&&p.textSnippet&&(i+=`  - Text: "${p.textSnippet}"
`)}t==="forensic"&&(i+=`  - Original rect: \`{ x: ${Math.round(C.x)}, y: ${Math.round(C.y)}, w: ${Math.round(C.width)}, h: ${Math.round(C.height)} }\`
`,i+=`  - Current rect: \`{ x: ${Math.round(b.x)}, y: ${Math.round(b.y)}, w: ${Math.round(b.width)}, h: ${Math.round(b.height)} }\`
`)}if(t!=="compact"){let p=r.filter(g=>g.posMoved).map(g=>({label:g.section.label,originalRect:g.section.originalRect,currentRect:g.section.currentRect})),f=pv(p);if(f.length>0){i+=`
### Layout Summary
`;for(let g of f)i+=`- ${g}
`}}if(t!=="compact"&&o.length>1){i+=`
### All Sections (current positions)
`;let p=[...o].sort((f,g)=>Math.abs(f.currentRect.y-g.currentRect.y)<20?f.currentRect.x-g.currentRect.x:f.currentRect.y-g.currentRect.y);for(let f of p){let g=f.currentRect,C=Math.abs(g.x-f.originalRect.x)>1||Math.abs(g.y-f.originalRect.y)>1||Math.abs(g.width-f.originalRect.width)>1||Math.abs(g.height-f.originalRect.height)>1;i+=`- ${f.label}: \`${Math.round(g.width)}\xD7${Math.round(g.height)}px\` at \`(${Math.round(g.x)}, ${Math.round(g.y)})\`${C?" \u2190 suggested":""}
`}}return i}var Y_="feedback-annotations-",Bg=7;function ef(e){return`${Y_}${e}`}function vr(e){if(typeof window>"u")return[];try{let t=localStorage.getItem(ef(e));if(!t)return[];let n=JSON.parse(t),o=Date.now()-Bg*24*60*60*1e3;return n.filter(r=>!r.timestamp||r.timestamp>o)}catch{return[]}}function zg(e,t){if(!(typeof window>"u"))try{localStorage.setItem(ef(e),JSON.stringify(t))}catch{}}function yv(){let e=new Map;if(typeof window>"u")return e;try{let t=Date.now()-Bg*24*60*60*1e3;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o?.startsWith(Y_)){let r=o.slice(Y_.length),i=localStorage.getItem(o);if(i){let s=JSON.parse(i).filter(a=>!a.timestamp||a.timestamp>t);s.length>0&&e.set(r,s)}}}}catch{}return e}function N_(e,t,n){let o=t.map(r=>({...r,_syncedTo:n}));zg(e,o)}var tf="agentation-design-";function xv(e){if(typeof window>"u")return[];try{let t=localStorage.getItem(`${tf}${e}`);return t?JSON.parse(t):[]}catch{return[]}}function vv(e,t){if(!(typeof window>"u"))try{localStorage.setItem(`${tf}${e}`,JSON.stringify(t))}catch{}}function wv(e){if(!(typeof window>"u"))try{localStorage.removeItem(`${tf}${e}`)}catch{}}var nf="agentation-rearrange-";function bv(e){if(typeof window>"u")return null;try{let t=localStorage.getItem(`${nf}${e}`);return t?JSON.parse(t):null}catch{return null}}function kv(e,t){if(!(typeof window>"u"))try{localStorage.setItem(`${nf}${e}`,JSON.stringify(t))}catch{}}function Cv(e){if(!(typeof window>"u"))try{localStorage.removeItem(`${nf}${e}`)}catch{}}var of="agentation-wireframe-";function Sv(e){if(typeof window>"u")return null;try{let t=localStorage.getItem(`${of}${e}`);return t?JSON.parse(t):null}catch{return null}}function q0(e,t){if(!(typeof window>"u"))try{localStorage.setItem(`${of}${e}`,JSON.stringify(t))}catch{}}function xc(e){if(!(typeof window>"u"))try{localStorage.removeItem(`${of}${e}`)}catch{}}var Og="agentation-session-";function rf(e){return`${Og}${e}`}function Ev(e){if(typeof window>"u")return null;try{return localStorage.getItem(rf(e))}catch{return null}}function I_(e,t){if(!(typeof window>"u"))try{localStorage.setItem(rf(e),t)}catch{}}function Mv(e){if(!(typeof window>"u"))try{localStorage.removeItem(rf(e))}catch{}}var Q_=`${Og}toolbar-hidden`;function Lv(){if(typeof window>"u")return!1;try{return sessionStorage.getItem(Q_)==="1"}catch{return!1}}function Nv(e){if(!(typeof window>"u"))try{e?sessionStorage.setItem(Q_,"1"):sessionStorage.removeItem(Q_)}catch{}}async function R_(e,t){let n=await fetch(`${e}/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})});if(!n.ok)throw new Error(`Failed to create session: ${n.status}`);return n.json()}async function K0(e,t){let n=await fetch(`${e}/sessions/${t}`);if(!n.ok)throw new Error(`Failed to get session: ${n.status}`);return n.json()}async function J0(e,t,n){!n.elementPath&&(n.element==="body"||n.element==="html")&&(n={...n,elementPath:n.element});let o=await fetch(`${e}/sessions/${t}/annotations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Failed to sync annotation: ${o.status}`);return o.json()}async function $_(e,t,n){let o=await fetch(`${e}/annotations/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!o.ok)throw new Error(`Failed to update annotation: ${o.status}`);return o.json()}async function vc(e,t){let n=await fetch(`${e}/annotations/${t}`,{method:"DELETE"});if(!n.ok)throw new Error(`Failed to delete annotation: ${n.status}`)}var st={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16,IncompleteClassComponent:17,DehydratedFragment:18,SuspenseListComponent:19,ScopeComponent:21,OffscreenComponent:22,LegacyHiddenComponent:23,CacheComponent:24,TracingMarkerComponent:25,HostHoistable:26,HostSingleton:27,IncompleteFunctionComponent:28,Throw:29,ViewTransitionComponent:30,ActivityComponent:31},Z0=new Set(["Component","PureComponent","Fragment","Suspense","Profiler","StrictMode","Routes","Route","Outlet","Root","ErrorBoundaryHandler","HotReload","Hot"]),eg=[/Boundary$/,/BoundaryHandler$/,/Provider$/,/Consumer$/,/^(Inner|Outer)/,/Router$/,/^Client(Page|Segment|Root)/,/^Segment(ViewNode|Node)$/,/^LayoutSegment/,/^Server(Root|Component|Render)/,/^RSC/,/Context$/,/^Hot(Reload)?$/,/^(Dev|React)(Overlay|Tools|Root)/,/Overlay$/,/Handler$/,/^With[A-Z]/,/Wrapper$/,/^Root$/],Iv=[/Page$/,/View$/,/Screen$/,/Section$/,/Card$/,/List$/,/Item$/,/Form$/,/Modal$/,/Dialog$/,/Button$/,/Nav$/,/Header$/,/Footer$/,/Layout$/,/Panel$/,/Tab$/,/Menu$/];function Rv(e){let t=e?.mode??"filtered",n=Z0;if(e?.skipExact){let o=e.skipExact instanceof Set?e.skipExact:new Set(e.skipExact);n=new Set([...Z0,...o])}return{maxComponents:e?.maxComponents??6,maxDepth:e?.maxDepth??30,mode:t,skipExact:n,skipPatterns:e?.skipPatterns?[...eg,...e.skipPatterns]:eg,userPatterns:e?.userPatterns??Iv,filter:e?.filter}}function $v(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").toLowerCase()}function Tv(e,t=10){let n=new Set,o=e,r=0;for(;o&&r<t;)o.className&&typeof o.className=="string"&&o.className.split(/\s+/).forEach(i=>{if(i.length>1){let l=i.replace(/[_][a-zA-Z0-9]{5,}.*$/,"").toLowerCase();l.length>1&&n.add(l)}}),o=o.parentElement,r++;return n}function Pv(e,t){let n=$v(e);for(let o of t){if(o===n)return!0;let r=n.split("-").filter(l=>l.length>2),i=o.split("-").filter(l=>l.length>2);for(let l of r)for(let s of i)if(l===s||l.includes(s)||s.includes(l))return!0}return!1}function Dv(e,t,n,o){if(n.filter)return n.filter(e,t);switch(n.mode){case"all":return!0;case"filtered":return!(n.skipExact.has(e)||n.skipPatterns.some(r=>r.test(e)));case"smart":return n.skipExact.has(e)||n.skipPatterns.some(r=>r.test(e))?!1:!!(o&&Pv(e,o)||n.userPatterns.some(r=>r.test(e)));default:return!0}}var Qi=null,Bv=new WeakMap;function T_(e){return Object.keys(e).some(t=>t.startsWith("__reactFiber$")||t.startsWith("__reactInternalInstance$")||t.startsWith("__reactProps$"))}function zv(){if(Qi!==null)return Qi;if(typeof document>"u")return!1;if(document.body&&T_(document.body))return Qi=!0,!0;let e=["#root","#app","#__next","[data-reactroot]"];for(let t of e){let n=document.querySelector(t);if(n&&T_(n))return Qi=!0,!0}if(document.body){for(let t of document.body.children)if(T_(t))return Qi=!0,!0}return Qi=!1,!1}var ds={map:Bv};function Ov(e){return Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"))||null}function Av(e){let t=Ov(e);return t?e[t]:null}function Zr(e){return e?e.displayName?e.displayName:e.name?e.name:null:null}function Fv(e){let{tag:t,type:n,elementType:o}=e;if(t===st.HostComponent||t===st.HostText||t===st.HostHoistable||t===st.HostSingleton||t===st.Fragment||t===st.Mode||t===st.Profiler||t===st.DehydratedFragment||t===st.HostRoot||t===st.HostPortal||t===st.ScopeComponent||t===st.OffscreenComponent||t===st.LegacyHiddenComponent||t===st.CacheComponent||t===st.TracingMarkerComponent||t===st.Throw||t===st.ViewTransitionComponent||t===st.ActivityComponent)return null;if(t===st.ForwardRef){let r=o;if(r?.render){let i=Zr(r.render);if(i)return i}return r?.displayName?r.displayName:Zr(n)}if(t===st.MemoComponent||t===st.SimpleMemoComponent){let r=o;if(r?.type){let i=Zr(r.type);if(i)return i}return r?.displayName?r.displayName:Zr(n)}if(t===st.ContextProvider){let r=n;return r?._context?.displayName?`${r._context.displayName}.Provider`:null}if(t===st.ContextConsumer){let r=n;return r?.displayName?`${r.displayName}.Consumer`:null}if(t===st.LazyComponent){let r=o;return r?._status===1&&r._result?Zr(r._result):null}return t===st.SuspenseComponent||t===st.SuspenseListComponent?null:t===st.IncompleteClassComponent||t===st.IncompleteFunctionComponent||t===st.FunctionComponent||t===st.ClassComponent||t===st.IndeterminateComponent?Zr(n):null}function Wv(e){return e.length<=2||e.length<=3&&e===e.toLowerCase()}function jv(e,t){let n=Rv(t),o=n.mode==="all";if(o){let a=ds.map.get(e);if(a!==void 0)return a}if(!zv()){let a={path:null,components:[]};return o&&ds.map.set(e,a),a}let r=n.mode==="smart"?Tv(e):void 0,i=[];try{let a=Av(e),u=0;for(;a&&u<n.maxDepth&&i.length<n.maxComponents;){let p=Fv(a);p&&!Wv(p)&&Dv(p,u,n,r)&&i.push(p),a=a.return,u++}}catch{let a={path:null,components:[]};return o&&ds.map.set(e,a),a}if(i.length===0){let a={path:null,components:[]};return o&&ds.map.set(e,a),a}let s={path:i.slice().reverse().map(a=>`<${a}>`).join(" "),components:i};return o&&ds.map.set(e,s),s}var us={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16};function Uv(e){if(!e||typeof e!="object")return null;let t=Object.keys(e),n=t.find(i=>i.startsWith("__reactFiber$"));if(n)return e[n]||null;let o=t.find(i=>i.startsWith("__reactInternalInstance$"));if(o)return e[o]||null;let r=t.find(i=>{if(!i.startsWith("__react"))return!1;let l=e[i];return l&&typeof l=="object"&&"_debugSource"in l});return r&&e[r]||null}function ys(e){if(!e.type||typeof e.type=="string")return null;if(typeof e.type=="object"||typeof e.type=="function"){let t=e.type;if(t.displayName)return t.displayName;if(t.name)return t.name}return null}function Yv(e,t=50){let n=e,o=0;for(;n&&o<t;){if(n._debugSource)return{source:n._debugSource,componentName:ys(n)};if(n._debugOwner?._debugSource)return{source:n._debugOwner._debugSource,componentName:ys(n._debugOwner)};n=n.return,o++}return null}function Qv(e){let t=e,n=0,o=50;for(;t&&n<o;){let r=t,i=["_debugSource","__source","_source","debugSource"];for(let l of i){let s=r[l];if(s&&typeof s=="object"&&"fileName"in s)return{source:s,componentName:ys(t)}}if(t.memoizedProps){let l=t.memoizedProps;if(l.__source&&typeof l.__source=="object"){let s=l.__source;if(s.fileName&&s.lineNumber)return{source:{fileName:s.fileName,lineNumber:s.lineNumber,columnNumber:s.columnNumber},componentName:ys(t)}}}t=t.return,n++}return null}var wc=new Map;function Vv(e){let t=e.tag,n=e.type,o=e.elementType;if(typeof n=="string"||n==null||typeof n=="function"&&n.prototype?.isReactComponent)return null;if((t===us.FunctionComponent||t===us.IndeterminateComponent)&&typeof n=="function")return n;if(t===us.ForwardRef&&o){let r=o.render;if(typeof r=="function")return r}if((t===us.MemoComponent||t===us.SimpleMemoComponent)&&o){let r=o.type;if(typeof r=="function")return r}return typeof n=="function"?n:null}function Xv(){let e=Hv,t=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;if(t&&"H"in t)return{get:()=>t.H,set:o=>{t.H=o}};let n=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;if(n){let o=n.ReactCurrentDispatcher;if(o&&"current"in o)return{get:()=>o.current,set:r=>{o.current=r}}}return null}function Gv(e,t){let n=e.split(`
`),o=[/source-location/,/\/dist\/index\./,/node_modules\//,/react-dom/,/react\.development/,/react\.production/,/chunk-[A-Z0-9]+/i,/\/_next\/static\/chunks\//,/\/\.vite\/deps\//,/\/_astro\//,/\/assets\/[^\s/]+[-.][\w-]{8,}\.m?js(?:[?:]|$)/,/react-stack-bottom-frame/,/react-reconciler/,/scheduler/,/<anonymous>/],r=/^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/,i=/^[^@]*@(.+?):(\d+):(\d+)$/;for(let l of n){let s=l.trim();if(!s||o.some(u=>u.test(s)))continue;if(t){let u=t.replace(/^bound /,"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&");if(!new RegExp(`(?:at (?:Object\\.)?|^)${u}(?: \\(|@| \\[)`).test(s))continue}let a=r.exec(s)||i.exec(s);if(a)return{fileName:a[1],line:parseInt(a[2],10),column:parseInt(a[3],10)}}return null}function qv(e){let t=e;return t=t.replace(/[?#].*$/,""),t=t.replace(/^turbopack:\/\/\/\[project\]\//,""),t=t.replace(/^webpack-internal:\/\/\/\.\//,""),t=t.replace(/^webpack-internal:\/\/\//,""),t=t.replace(/^webpack:\/\/\/\.\//,""),t=t.replace(/^webpack:\/\/\//,""),t=t.replace(/^turbopack:\/\/\//,""),t=t.replace(/^https?:\/\/[^/]+\//,""),t=t.replace(/^file:\/\/\//,"/"),t=t.replace(/^\([^)]+\)\/\.\//,""),t=t.replace(/^\.\//,""),t}function Kv(e){let t=Vv(e);if(!t)return null;if(wc.has(t))return wc.get(t);let n=Xv();if(!n)return wc.set(t,null),null;let o=n.get(),r=null;try{let i=new Proxy({},{get(){throw new Error("probe")}});n.set(i);try{t({})}catch(l){if(l instanceof Error&&l.message==="probe"&&l.stack){let s=Gv(l.stack,t.name);s&&(r={fileName:qv(s.fileName),lineNumber:s.line,columnNumber:s.column,componentName:ys(e)||void 0})}}}finally{n.set(o)}return wc.set(t,r),r}function Jv(e,t=15){let n=e,o=0;for(;n&&o<t;){let r=Kv(n);if(r)return r;n=n.return,o++}return null}function V_(e){let t=Uv(e);if(!t)return{found:!1,reason:"no-fiber",isReactApp:!1,isProduction:!1};let n=Yv(t);if(n||(n=Qv(t)),n?.source)return{found:!0,source:{fileName:n.source.fileName,lineNumber:n.source.lineNumber,columnNumber:n.source.columnNumber,componentName:n.componentName||void 0},isReactApp:!0,isProduction:!1};let o=Jv(t);return o?{found:!0,source:o,isReactApp:!0,isProduction:!1}:{found:!1,reason:"no-debug-source",isReactApp:!0,isProduction:!1}}function Zv(e,t="path"){let{fileName:n,lineNumber:o,columnNumber:r}=e,i=`${n}:${o}`;return r!==void 0&&(i+=`:${r}`),t==="vscode"?`vscode://file${n.startsWith("/")?"":"/"}${i}`:i}function ew(e,t=10){let n=e,o=0;for(;n&&o<t;){let r=V_(n);if(r.found)return r;n=n.parentElement,o++}return V_(e)}var _s=[{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"detailed",label:"Detailed"},{value:"forensic",label:"Forensic"}];function Ec(e,t){let n=`## Page Feedback: ${e}
`,o=t?.replace(/[\r\n\t]+/g," ").trim();return o&&(n+=`**App:** ${o.replace(/[\\`*_\[\]<>]/g,"\\$&")}
`),n}function tg(e,t,n="standard",o={}){if(e.length===0)return"";let r=typeof window<"u"?`${window.innerWidth}\xD7${window.innerHeight}`:"unknown",i=Ec(t,o.appName);return n==="forensic"?(i+=`
**Environment:**
`,i+=`- Viewport: ${r}
`,typeof window<"u"&&(i+=`- URL: ${window.location.href}
`,i+=`- User Agent: ${navigator.userAgent}
`,i+=`- Timestamp: ${new Date().toISOString()}
`,i+=`- Device Pixel Ratio: ${window.devicePixelRatio}
`),i+=`
---
`):n!=="compact"&&(i+=`**Viewport:** ${r}
`),i+=`
`,e.forEach((l,s)=>{n==="compact"?(i+=`${s+1}. **${l.element}**${l.sourceFile?` (${l.sourceFile})`:""}: ${l.comment}`,l.selectedText&&(i+=` (re: "${l.selectedText.slice(0,30)}${l.selectedText.length>30?"...":""}")`),i+=`
`):n==="forensic"?(i+=`### ${s+1}. ${l.element}
`,l.isMultiSelect&&l.fullPath&&(i+=`*Forensic data shown for first element of selection*
`),l.fullPath&&(i+=`**Full DOM Path:** ${l.fullPath}
`),l.cssClasses&&(i+=`**CSS Classes:** ${l.cssClasses}
`),l.boundingBox&&(i+=`**Position:** x:${Math.round(l.boundingBox.x)}, y:${Math.round(l.boundingBox.y)} (${Math.round(l.boundingBox.width)}\xD7${Math.round(l.boundingBox.height)}px)
`),i+=`**Annotation at:** ${l.x.toFixed(1)}% from left, ${Math.round(l.y)}px from top
`,l.selectedText&&(i+=`**Selected text:** "${l.selectedText}"
`),l.nearbyText&&!l.selectedText&&(i+=`**Context:** ${l.nearbyText.slice(0,100)}
`),l.computedStyles&&(i+=`**Computed Styles:** ${l.computedStyles}
`),l.accessibility&&(i+=`**Accessibility:** ${l.accessibility}
`),l.nearbyElements&&(i+=`**Nearby Elements:** ${l.nearbyElements}
`),l.sourceFile&&(i+=`**Source:** ${l.sourceFile}
`),l.reactComponents&&(i+=`**React:** ${l.reactComponents}
`),i+=`**Feedback:** ${l.comment}

`):(i+=`### ${s+1}. ${l.element}
`,i+=`**Location:** ${l.elementPath}
`,l.sourceFile&&(i+=`**Source:** ${l.sourceFile}
`),l.reactComponents&&(i+=`**React:** ${l.reactComponents}
`),n==="detailed"&&(l.cssClasses&&(i+=`**Classes:** ${l.cssClasses}
`),l.boundingBox&&(i+=`**Position:** ${Math.round(l.boundingBox.x)}px, ${Math.round(l.boundingBox.y)}px (${Math.round(l.boundingBox.width)}\xD7${Math.round(l.boundingBox.height)}px)
`)),l.selectedText&&(i+=`**Selected text:** "${l.selectedText}"
`),n==="detailed"&&l.nearbyText&&!l.selectedText&&(i+=`**Context:** ${l.nearbyText.slice(0,100)}
`),i+=`**Feedback:** ${l.comment}

`)}),i.trim()}function ng(e,t,n="markdown"){return n==="markdown"?t:[...new Set(e.map(o=>n==="source"?o.sourceFile:n==="classes"?o.cssClasses:o.attributes?.[n.attribute]).filter(o=>typeof o=="string"&&o.length>0))].join(`
`)}async function tw(e){if(typeof window>"u")return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}return nw(e)}function nw(e){let t=document.createElement("textarea"),n=document.activeElement;for(;n?.shadowRoot?.activeElement;)n=n.shadowRoot.activeElement;let o=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement?n:null,r=o&&o.selectionStart!==null?{start:o.selectionStart,end:o.selectionEnd,direction:o.selectionDirection}:null,i=document.getSelection(),l=i?Array.from({length:i.rangeCount},(s,a)=>i.getRangeAt(a).cloneRange()):[];try{return t.value=e,t.setAttribute("readonly",""),t.style.cssText="position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none;",document.body.appendChild(t),t.focus({preventScroll:!0}),t.select(),t.setSelectionRange(0,e.length),document.execCommand("copy")}catch{return!1}finally{if(t.remove(),n instanceof HTMLElement&&n.isConnected&&(n.focus({preventScroll:!0}),o&&r&&o.setSelectionRange(r.start,r.end,r.direction)),i){i.removeAllRanges();for(let s of l)i.addRange(s)}}}function og(e){if(!e)return e;try{let t=new URL(e,"http://agentation.invalid");return t.pathname+t.search+t.hash}catch{return e}}function rg(e,t,n=[]){let o=new Map,r=new Map(n.map(s=>[s.id,s])),i=!1;async function l(s,a){if(i||a.running||a.timer)return;let u=a.desired,p=t.get(s);if(!u&&!p){o.delete(s),t.delete(s);return}let f=u?JSON.stringify(u):void 0;if(!(u&&p&&a.synced===f)){a.running=!0;try{if(!u)await e.remove(p),t.delete(s),a.synced=void 0;else if(p)await e.update(p,u),a.synced=f;else{t.set(s,"");let g=await e.create(u);t.set(s,g.id),a.synced=f}a.retries=0,a.running=!1,!i&&o.get(s)===a&&l(s,a)}catch(g){if(a.running=!1,!i&&o.get(s)===a&&(console.warn("[Agentation] Failed to sync layout feedback:",g),t.get(s)&&a.retries<3)){let C=500*2**a.retries++;a.timer=ot(()=>{a.timer=void 0,l(s,a)},C)}}}}return{replace(s){let a=new Map(s.map(u=>[u.id,u]));for(let[u,p]of a){let f=o.get(u);if(!f){f={running:!1,retries:0},o.set(u,f);let g=[...r.values()].find(C=>C.kind===p.kind&&og(C.url)===og(p.url)&&(p.kind==="placement"?C.timestamp===p.timestamp&&C.element===p.element:C.element===p.element));g&&(t.set(u,g.id),r.delete(g.id))}JSON.stringify(f.desired)!==JSON.stringify(p)&&(f.retries=0,f.timer&&clearTimeout(f.timer),f.timer=void 0),f.desired=p}for(let[u,p]of o)a.has(u)||(p.desired=void 0),l(u,p)},forget(s){let a=o.get(s);a?.timer&&clearTimeout(a.timer),o.delete(s),t.delete(s)},dispose(){i=!0;for(let s of o.values())s.timer&&clearTimeout(s.timer)}}}function ow(e,t,n,o){let r=!1,i,l,s=1e3,a,u=C=>{!r&&(C?.status==="resolved"||C?.status==="dismissed")&&o(C)},p=async()=>{if(r||a||!n())return;let C=new AbortController;a=C;let b=ot(()=>C.abort(),5e3);try{let N=await fetch(`${e}/sessions/${t}`,{signal:C.signal});if(!N.ok)return;let E=await N.json();!r&&!C.signal.aborted&&Array.isArray(E.annotations)&&E.annotations.forEach(u)}catch{}finally{clearTimeout(b),a===C&&(a=void 0)}},f=()=>{if(r)return;let C=new EventSource(`${e}/sessions/${t}/events`),b=()=>{s=1e3,p()},N=y=>{try{u(JSON.parse(y.data).payload)}catch{}},E=()=>{C.readyState!==EventSource.CLOSED||r||l!==void 0||(i?.(),l=ot(()=>{l=void 0,f()},s),s=Math.min(s*2,1e4))};C.addEventListener("open",b),C.addEventListener("annotation.updated",N),C.addEventListener("error",E),i=()=>{C.removeEventListener("open",b),C.removeEventListener("annotation.updated",N),C.removeEventListener("error",E),C.close()}};f();let g=_g(()=>{p()},1e4);return()=>{r=!0,i?.(),l!==void 0&&clearTimeout(l),clearInterval(g),a?.abort()}}var rw=`.styles-module__surface___7qnpJ {
  padding: 0;
  width: var(--preview-width, 200px);
  max-width: calc(100vw - 24px);
  overflow: auto;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  border-radius: 12px;
  z-index: inherit;
  will-change: auto;
  transform: translateX(-50%);
  transition: left 200ms cubic-bezier(0.2, 0.8, 0.2, 1), top 200ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), width 200ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 100ms ease-out, visibility 0s 200ms;
}
.styles-module__surface___7qnpJ[data-positioning] {
  transition: none;
}
.styles-module__surface___7qnpJ[data-direct-entry] *, .styles-module__surface___7qnpJ[data-direct-entry] *::before, .styles-module__surface___7qnpJ[data-direct-entry] *::after {
  transition: none !important;
}
.styles-module__surface___7qnpJ[data-state=preview], .styles-module__surface___7qnpJ[data-state=edit] {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}
.styles-module__surface___7qnpJ[data-state=edit], .styles-module__surface___7qnpJ[data-annotation-popup][data-state=hidden] {
  width: 280px;
  border-radius: 16px;
}
.styles-module__surface___7qnpJ[data-state=edit] {
  pointer-events: auto;
}
.styles-module__surface___7qnpJ[data-state=preview] {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__surface___7qnpJ[data-state=preview] {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__surface___7qnpJ {
    transition: opacity 100ms ease-out, visibility 0s 100ms;
  }
}`,iw={surface:"styles-module__surface___7qnpJ"},lw=(0,Sn.forwardRef)(function({annotation:t,editing:n,exiting:o,restorePreview:r,editorProps:i,lightMode:l,scrollY:s,onExited:a},u){let p=(0,Sn.useRef)({annotation:t,editorProps:i}),f=t??p.current.annotation,g=t?i:p.current.editorProps,C=(0,Sn.useRef)(null),b=(0,Sn.useRef)(null),N=(0,Sn.useRef)(),E=(0,Sn.useRef)(s),y=n&&!o?"edit":t&&(!n||r)?"preview":"hidden",v=y==="preview"||!n;return(0,Sn.useLayoutEffect)(()=>{t&&(p.current={annotation:t,editorProps:i})},[t,i]),(0,Sn.useLayoutEffect)(()=>{let h=C.current;if(!h||!f)return;let S=y==="edit"&&(N.current!==f.id||h.dataset.state==="hidden"&&getComputedStyle(h).opacity==="0");S&&(h.dataset.directEntry="true");let j=()=>{let V=f.x/100*window.innerWidth,z=f.isFixed?f.y:f.y-s,K=y==="preview"||!n,Z=parseFloat(h.style.getPropertyValue("--preview-width"))||200,J=Math.min(Z,window.innerWidth-24),de=Math.max(12,Math.min(window.innerWidth-J-12,V-J/2)),ie=K?J:Math.min(280,window.innerWidth-24),ce=Math.min(K?12:20,(window.innerWidth-ie)/2),pe=z>window.innerHeight-(K?101:290);h.style.left=`${Math.max(ce,Math.min(window.innerWidth-ie-ce,de))}px`,h.style.right="auto",h.style.top=`${Math.max(12,Math.min(window.innerHeight-12,z+(pe?-21:21)))}px`,h.style.bottom="auto",h.style.transform=pe?"translateY(-100%)":"translateY(0)",h.style.maxHeight=`${Math.max(100,pe?z-33:window.innerHeight-z-33)}px`},Q=N.current!==f.id||E.current!==s||h.dataset.state==="hidden";Q&&(h.dataset.positioning="true"),j(),(Q||S)&&h.getBoundingClientRect(),delete h.dataset.positioning,delete h.dataset.directEntry,h.dataset.state=y,h.inert=y!=="edit",N.current=f.id,E.current=s;let D=()=>{h.dataset.positioning="true",j(),h.getBoundingClientRect(),delete h.dataset.positioning};return window.addEventListener("resize",D),()=>window.removeEventListener("resize",D)},[f?.id,f?.x,f?.y,f?.isFixed,y,n,s,f?.comment]),(0,Sn.useLayoutEffect)(()=>{n&&!o&&b.current?.focus()},[n,o,f?.id]),K_(C,o,a),(0,Sn.useImperativeHandle)(u,()=>({shake(){C.current?.animate?.([{translate:"0px"},{translate:"-3px"},{translate:"3px"},{translate:"-2px"},{translate:"2px"},{translate:"0px"}],{duration:250}),b.current?.focus()}}),[]),!f||!g?null:(0,X_.jsx)("div",{ref:C,className:`${De.popup} ${iw.surface} ${l?De.light:""}`,"data-feedback-toolbar":!0,"data-annotation-card":!0,"data-annotation-popup":n?"":void 0,"data-state":"hidden","aria-hidden":y==="hidden",onClick:h=>h.stopPropagation(),onKeyDownCapture:h=>{h.key!=="Escape"||h.nativeEvent.isComposing||!n||(h.preventDefault(),h.stopPropagation(),g.onCancel())},children:(0,X_.jsx)(Cg,{ref:b,...g,variant:"card",preview:v,resetOnPreview:!n,disabled:!n||o},f.id)})}),sw=`@keyframes styles-module__markerIn___x4G8D {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes styles-module__markerOut___6VhQN {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}
@keyframes styles-module__renumberRoll___akV9B {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__marker___9CKF7 {
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1;
  text-align: center;
  appearance: none;
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  -webkit-user-select: none;
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___9CKF7 > * {
  pointer-events: none;
}
.styles-module__marker___9CKF7:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 3px;
}
.styles-module__marker___9CKF7:hover, .styles-module__marker___9CKF7:focus-visible, .styles-module__marker___9CKF7.styles-module__previewVisible___imMag {
  z-index: 2;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq) {
  transition: background-color 0.15s ease, transform 0.1s ease, z-index 0s 0.1s;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):hover, .styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):focus-visible, .styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq).styles-module__previewVisible___imMag {
  transition-delay: 0s;
}
.styles-module__marker___9CKF7.styles-module__enter___8kI3q {
  animation: styles-module__markerIn___x4G8D 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___9CKF7.styles-module__confirm___BtMvq {
  animation: styles-module__markerConfirm___RT4Sk 220ms ease-out both;
}
.styles-module__marker___9CKF7.styles-module__exit___KBdR3 {
  animation: styles-module__markerOut___6VhQN 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7.styles-module__clearing___8rM7K {
  animation: styles-module__markerOut___6VhQN 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U.styles-module__exit___KBdR3 {
  animation-duration: 150ms;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___9CKF7.styles-module__hovered___-mg2N {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___16lvD {
  display: block;
  animation: styles-module__renumberRoll___akV9B 0.2s ease-out;
}

@keyframes styles-module__markerConfirm___RT4Sk {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    transform: translate(-50%, -50%) scale(0.94);
  }
  65% {
    transform: translate(-50%, -50%) scale(1.06);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
.styles-module__number___1JFu9 {
  display: block;
}

.styles-module__numberGlyph___qchdk {
  display: block;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition: opacity 140ms ease-out, transform 180ms cubic-bezier(0.22, 1, 0.36, 1), filter 140ms ease-out;
}

.styles-module__actionGlyph___AFRt0 {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(2px) scale(0.8) rotate(-12deg);
  filter: blur(1px);
  transition: opacity 120ms ease-out, transform 160ms cubic-bezier(0.22, 1, 0.36, 1), filter 120ms ease-out;
}

.styles-module__actionVisible___Kb--l .styles-module__numberGlyph___qchdk {
  opacity: 0;
  transform: translateY(-2px) scale(0.8);
  filter: blur(1px);
}
.styles-module__actionVisible___Kb--l .styles-module__actionGlyph___AFRt0 {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0);
  filter: blur(0);
}

.styles-module__plus___xslMP {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
  filter: blur(1px);
  transition: opacity 100ms ease-out, transform 140ms ease-out, filter 100ms ease-out;
  pointer-events: none;
}

.styles-module__pending___BiY-U .styles-module__numberGlyph___qchdk {
  opacity: 0;
  transform: translateY(5px);
  filter: blur(2px);
}
.styles-module__pending___BiY-U .styles-module__plus___xslMP {
  opacity: 1;
  transform: rotate(0) scale(1);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__marker___9CKF7.styles-module__enter___8kI3q, .styles-module__marker___9CKF7.styles-module__exit___KBdR3, .styles-module__marker___9CKF7.styles-module__clearing___8rM7K, .styles-module__marker___9CKF7.styles-module__confirm___BtMvq {
    animation-duration: 1ms;
    animation-delay: 0ms !important;
  }
  .styles-module__numberGlyph___qchdk, .styles-module__actionGlyph___AFRt0, .styles-module__plus___xslMP {
    transition: opacity 100ms ease-out;
    transform: none;
    filter: none;
  }
  .styles-module__pending___BiY-U .styles-module__numberGlyph___qchdk, .styles-module__pending___BiY-U .styles-module__plus___xslMP,
  .styles-module__actionVisible___Kb--l .styles-module__numberGlyph___qchdk, .styles-module__actionVisible___Kb--l .styles-module__actionGlyph___AFRt0 {
    transform: none;
    filter: none;
  }
}`,Jt={marker:"styles-module__marker___9CKF7",previewVisible:"styles-module__previewVisible___imMag",enter:"styles-module__enter___8kI3q",exit:"styles-module__exit___KBdR3",clearing:"styles-module__clearing___8rM7K",confirm:"styles-module__confirm___BtMvq",markerIn:"styles-module__markerIn___x4G8D",markerConfirm:"styles-module__markerConfirm___RT4Sk",markerOut:"styles-module__markerOut___6VhQN",pending:"styles-module__pending___BiY-U",multiSelect:"styles-module__multiSelect___CPfTC",hovered:"styles-module__hovered___-mg2N",renumber:"styles-module__renumber___16lvD",renumberRoll:"styles-module__renumberRoll___akV9B",number:"styles-module__number___1JFu9",numberGlyph:"styles-module__numberGlyph___qchdk",actionGlyph:"styles-module__actionGlyph___AFRt0",actionVisible:"styles-module__actionVisible___Kb--l",plus:"styles-module__plus___xslMP"},ig=(0,Gn.memo)(function({annotation:t,pending:n=!1,globalIndex:o,layerIndex:r,layerSize:i,isExiting:l,isClearing:s,isAnimated:a,isNew:u,isHovered:p,isRemoving:f,onRemoveComplete:g,isEditingAny:C,renumberFrom:b,markerClickBehavior:N,onHoverEnter:E,onEnterComplete:y,onHoverLeave:v,onClick:h,onContextMenu:S}){let[j,Q]=(0,Gn.useState)(a),D=(0,Gn.useRef)(n),[V,z]=(0,Gn.useState)(!1),K=D.current&&!n&&j&&!V;(0,Gn.useLayoutEffect)(()=>{l&&Q(!1)},[l]);let Z=(0,Gn.useRef)(null),J=(0,Gn.useRef)({action:!1,delete:!1}),de=p&&!C,ie=de&&N==="delete";(0,Gn.useLayoutEffect)(()=>{f||(J.current={action:de,delete:ie})},[f,de,ie]);let ce=f?J.current.action:de,pe=f?J.current.delete:ie;K_(Z,f,()=>g(t.id));let bt=t.isMultiSelect,ze=bt?"var(--agentation-color-green)":"var(--agentation-color-accent)",Ke=s?Jt.clearing:l||f?Jt.exit:K?Jt.confirm:!a&&!j?Jt.enter:"",Oe=s?`${Math.min(r*20,120)}ms`:f||n||K?"0ms":l?`${(i-1-r)*20}ms`:`${u?0:r*20}ms`;return(0,Eo.jsxs)("button",{ref:Z,type:"button","aria-label":n?"Pending annotation":`${N==="delete"?"Delete":"Edit"} annotation ${o+1}: ${t.element}`,disabled:n||l||f||s,tabIndex:n||C?-1:0,className:`${Jt.marker} ${n?Jt.pending:""} ${bt?Jt.multiSelect:""} ${Ke} ${!n&&ce?Jt.actionVisible:""} ${pe?Jt.hovered:""} ${p&&!C&&!f?Jt.previewVisible:""}`,"data-annotation-marker":n?void 0:"","data-annotation-pending":n?"":void 0,style:{left:`${t.x}%`,top:t.y,backgroundColor:pe?void 0:ze,animationDelay:Oe},onAnimationEnd:ft=>{ft.target===ft.currentTarget&&(Ke===Jt.enter||Ke===Jt.confirm)&&(Q(!0),n||z(!0),n||y(t.id))},onMouseOver:()=>{n||E(t)},onMouseOut:ft=>{let Vt=ft.relatedTarget;(!(Vt instanceof Node)||!ft.currentTarget.contains(Vt))&&v(t.id)},onFocus:ft=>{!n&&ft.currentTarget.matches(":focus-visible")&&E(t)},onBlur:()=>v(t.id),onClick:ft=>{ft.stopPropagation(),!n&&!l&&!f&&h(t,ft.currentTarget)},onContextMenu:S?ft=>{N==="delete"&&(ft.preventDefault(),ft.stopPropagation(),!n&&!l&&!f&&S(t,ft.currentTarget))}:void 0,children:[(0,Eo.jsx)("span",{className:`${Jt.number} ${b!==null&&o>=b?Jt.renumber:""}`,"aria-hidden":"true",children:(0,Eo.jsx)("span",{className:Jt.numberGlyph,children:o+1})},o),(0,Eo.jsx)("span",{className:Jt.actionGlyph,"aria-hidden":"true",children:N==="delete"?(0,Eo.jsx)(S2,{size:bt?18:16}):(0,Eo.jsx)(L2,{size:16})}),D.current&&(0,Eo.jsx)("span",{className:Jt.plus,"aria-hidden":"true",children:(0,Eo.jsx)(g2,{size:12})})]})}),aw=`.styles-module__switchContainer___Ka-AB {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  background-color: #cdcdcd;
  transition: background-color 0.15s, opacity 0.15s;
}
[data-agentation-theme=dark] .styles-module__switchContainer___Ka-AB {
  background-color: #484848;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) {
  background-color: var(--agentation-color-blue);
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:disabled) {
  opacity: 0.3;
}

.styles-module__switchInput___kYDSD {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}
.styles-module__switchInput___kYDSD:disabled {
  cursor: not-allowed;
}

.styles-module__switchThumb___4sCPH {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transition: transform 0.15s;
}
.styles-module__switchContainer___Ka-AB[data-checked] .styles-module__switchThumb___4sCPH {
  transform: translateX(8px);
}`,P_={switchContainer:"styles-module__switchContainer___Ka-AB",switchInput:"styles-module__switchInput___kYDSD",switchThumb:"styles-module__switchThumb___4sCPH"},D_=({className:e="",checked:t,onChange:n,...o})=>(0,xs.jsxs)("div",{className:`${P_.switchContainer} ${e}`,"data-checked":t?"":void 0,children:[(0,xs.jsx)("input",{className:P_.switchInput,checked:t,onChange:n,type:"checkbox",...o}),(0,xs.jsx)("div",{className:P_.switchThumb})]}),cw=`.styles-module__checkboxContainer___joqZk {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(26, 26, 26, 0.2);
  border-radius: 4px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  transition: background-color 0.2s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: #252525;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #1a1a1a;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #fff;
}

.styles-module__checkboxInput___ECzzO {
  position: absolute;
  z-index: 1;
  inset: -1px;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}

.styles-module__checkboxCheck___fUXpr {
  color: #fafafa;
}
[data-agentation-theme=dark] .styles-module__checkboxCheck___fUXpr {
  color: #1a1a1a;
}

.styles-module__checkboxCheckPath___cDyh8 {
  stroke-dasharray: 9.29px;
  stroke-dashoffset: 9.29px;
  color: #fafafa;
  transition: stroke-dashoffset 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxCheckPath___cDyh8 {
  color: #1a1a1a;
}
.styles-module__checkboxContainer___joqZk[data-checked] .styles-module__checkboxCheckPath___cDyh8 {
  transition-duration: 0.2s;
  stroke-dashoffset: 0;
}`,bc={checkboxContainer:"styles-module__checkboxContainer___joqZk",checkboxInput:"styles-module__checkboxInput___ECzzO",checkboxCheck:"styles-module__checkboxCheck___fUXpr",checkboxCheckPath:"styles-module__checkboxCheckPath___cDyh8"},dw=({className:e="",checked:t,onChange:n,...o})=>(0,Xi.jsxs)("div",{className:`${bc.checkboxContainer} ${e}`,"data-checked":t?"":void 0,children:[(0,Xi.jsx)("input",{className:bc.checkboxInput,type:"checkbox",checked:t,onChange:n,...o}),(0,Xi.jsx)("svg",{className:bc.checkboxCheck,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:(0,Xi.jsx)("path",{className:bc.checkboxCheckPath,d:"M3.94 7L6.13 9.19L10.5 4.81",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),uw=`.styles-module__container___w8eAF {
  display: flex;
  align-items: center;
  height: 24px;
}

.styles-module__label___J5mxE {
  padding-inline: 8px 2px;
  line-height: 20px;
  font-size: 13px;
  letter-spacing: -0.15px;
  color: rgba(26, 26, 26, 0.5);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__label___J5mxE {
  color: rgba(255, 255, 255, 0.5);
}`,lg={container:"styles-module__container___w8eAF",label:"styles-module__label___J5mxE"},sg=({className:e="",label:t,tooltip:n,checked:o,onChange:r,...i})=>{let l=(0,Ag.useId)();return(0,Gi.jsxs)("div",{className:`${lg.container} ${e}`,...i,children:[(0,Gi.jsx)(dw,{id:l,onChange:r,checked:o}),(0,Gi.jsx)("label",{className:lg.label,htmlFor:l,children:t}),n&&(0,Gi.jsx)(ei,{content:n})]})},_w=`@keyframes styles-module__cycleTextIn___VBNTi {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes styles-module__scaleIn___QpQ8E {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__mcpPulse___5Q3Jj {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___VHxhx {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
@keyframes styles-module__themeIconIn___qUWMV {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
.styles-module__settingsPanel___qNkn- :where(button, a, input, select, textarea):focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 2px;
}
.styles-module__settingsPanel___qNkn- {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 16px;
  padding: 12px 0;
  width: 253px;
  max-width: calc(100vw - 20px);
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___qNkn-::before, .styles-module__settingsPanel___qNkn-::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___qNkn-::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn-::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM,
.styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4,
.styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ,
.styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3,
.styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY,
.styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8,
.styles-module__settingsPanel___qNkn- .styles-module__sliderLabel___6K5v1,
.styles-module__settingsPanel___qNkn- .styles-module__slider___v5z-c,
.styles-module__settingsPanel___qNkn- .styles-module__themeToggle___3imlT {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___qNkn- {
  opacity: 0;
  transform: translateY(var(--panel-offset-y, 4px)) scale(0.98);
  transform-origin: var(--panel-origin, bottom right);
  filter: blur(2px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.styles-module__settingsPanel___qNkn-[data-panel-present=true] {
  visibility: visible;
}
.styles-module__settingsPanel___qNkn-[data-panel-open=true] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  pointer-events: auto;
  transition-duration: 160ms;
}
@media (prefers-reduced-motion: reduce) {
  .styles-module__settingsPanel___qNkn- {
    transition: none;
    transform: none;
    filter: none;
  }
}
.styles-module__settingsPanel___qNkn-.styles-module__below___Vpv-k {
  --panel-offset-y: -4px;
  --panel-origin: top right;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH- {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-.styles-module__selected___k1-Vq {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__settingsPanelContainer___5it-H {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 16px;
}

.styles-module__settingsPage___BMn-3 {
  min-width: 100%;
  flex-basis: 0;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___BMn-3.styles-module__slideLeft___qUvW4 {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 0 16px 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0.styles-module__slideIn___uXDSu {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsHeader___Fn1DP {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
}

.styles-module__settingsBrand___OoKlM {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.0094em;
  color: #bbb;
  text-decoration: none;
}

.styles-module__settingsVersion___rXmL9 {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 6px;
  letter-spacing: -0.0094em;
}

.styles-module__themeToggle___3imlT {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: auto;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease;
  cursor: pointer;
}
.styles-module__themeToggle___3imlT:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.styles-module__themeIconWrapper___pyaYa {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
}

.styles-module__themeIcon___w7lAm {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: styles-module__themeIconIn___qUWMV 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.styles-module__settingsSectionGrow___eZTRw {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___y-tDE {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___y-tDE.styles-module__settingsRowMarginTop___uLpGb {
  margin-top: 8px;
}

.styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.2);
}

.styles-module__settingsLabel___VCVOQ {
  display: flex;
  align-items: center;
  column-gap: 2px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__cycleButton___XMBx3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___XMBx3:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__cycleButtonText___mbbnD {
  display: inline-block;
  animation: styles-module__cycleTextIn___VBNTi 0.2s ease-out;
}

.styles-module__cycleDots___ehp6i {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___zgSXY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__colorOptions___pbxZx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  height: 26px;
}

.styles-module__colorOption___Co955 {
  padding: 0;
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__colorOption___Co955 {
  background-color: #1a1a1a;
}
.styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--swatch);
  transition: opacity 0.2s, transform 0.2s;
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
    --color: var(--swatch-p3);
  }
}
.styles-module__colorOption___Co955::after {
  z-index: -1;
  transform: scale(1.2);
  opacity: 0;
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::before {
  transform: scale(0.8);
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::after {
  opacity: 1;
}

.styles-module__settingsNavLink___uYIwM {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.15s ease;
  cursor: pointer;
}
.styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(255, 255, 255, 0.9);
}
.styles-module__settingsNavLink___uYIwM svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___uYIwM:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(0, 0, 0, 0.8);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___XBUzC {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__settingsBackButton___fflll {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___fflll {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___Avra9 {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___Avra9 {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___vFTmJ {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___vFTmJ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___cG7OI {
  color: rgba(255, 255, 255, 0.8);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___cG7OI:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendContainer___VpkXk {
  display: flex;
  align-items: center;
}

.styles-module__autoSendLabel___ngNdC {
  padding-inline-end: 8px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s, opacity 0.15s;
  cursor: pointer;
}
.styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: var(--agentation-color-blue);
}
.styles-module__autoSendLabel___ngNdC.styles-module__disabled___9AZYS {
  opacity: 0.3;
  cursor: not-allowed;
}

.styles-module__mcpStatusDot___8AMxP {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__disconnected___mvmvQ {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___VHxhx 2s infinite;
}

.styles-module__mcpNavIndicator___auBHI {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s ease-in-out infinite;
}

.styles-module__webhookUrlInput___WDDDC {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::before {
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::after {
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM {
  color: #333;
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4 {
  border-top-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8:hover {
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__checkboxField___ZrSqv:not(:first-child) {
  margin-top: 8px;
}

.styles-module__divider___h6Yux {
  margin-block: 8px;
  width: 100%;
  height: 1px;
  background-color: rgba(26, 26, 26, 0.07);
}
[data-agentation-theme=dark] .styles-module__divider___h6Yux {
  background-color: rgba(255, 255, 255, 0.07);
}`,ae={settingsPanel:"styles-module__settingsPanel___qNkn-",settingsHeader:"styles-module__settingsHeader___Fn1DP",settingsBrand:"styles-module__settingsBrand___OoKlM",settingsVersion:"styles-module__settingsVersion___rXmL9",settingsSection:"styles-module__settingsSection___n5V-4",settingsLabel:"styles-module__settingsLabel___VCVOQ",cycleButton:"styles-module__cycleButton___XMBx3",cycleDot:"styles-module__cycleDot___zgSXY",dropdownButton:"styles-module__dropdownButton___mKHe8",sliderLabel:"styles-module__sliderLabel___6K5v1",slider:"styles-module__slider___v5z-c",themeToggle:"styles-module__themeToggle___3imlT",below:"styles-module__below___Vpv-k",settingsOption:"styles-module__settingsOption___JoyH-",selected:"styles-module__selected___k1-Vq",settingsPanelContainer:"styles-module__settingsPanelContainer___5it-H",settingsPage:"styles-module__settingsPage___BMn-3",slideLeft:"styles-module__slideLeft___qUvW4",automationsPage:"styles-module__automationsPage___N7By0",slideIn:"styles-module__slideIn___uXDSu",themeIconWrapper:"styles-module__themeIconWrapper___pyaYa",themeIcon:"styles-module__themeIcon___w7lAm",themeIconIn:"styles-module__themeIconIn___qUWMV",settingsSectionGrow:"styles-module__settingsSectionGrow___eZTRw",settingsRow:"styles-module__settingsRow___y-tDE",settingsRowMarginTop:"styles-module__settingsRowMarginTop___uLpGb",settingsRowDisabled:"styles-module__settingsRowDisabled___ydl3Q",cycleButtonText:"styles-module__cycleButtonText___mbbnD",cycleTextIn:"styles-module__cycleTextIn___VBNTi",cycleDots:"styles-module__cycleDots___ehp6i",active:"styles-module__active___dpAhM",colorOptions:"styles-module__colorOptions___pbxZx",colorOption:"styles-module__colorOption___Co955",settingsNavLink:"styles-module__settingsNavLink___uYIwM",settingsNavLinkRight:"styles-module__settingsNavLinkRight___XBUzC",settingsBackButton:"styles-module__settingsBackButton___fflll",automationHeader:"styles-module__automationHeader___Avra9",automationDescription:"styles-module__automationDescription___vFTmJ",learnMoreLink:"styles-module__learnMoreLink___cG7OI",autoSendContainer:"styles-module__autoSendContainer___VpkXk",autoSendLabel:"styles-module__autoSendLabel___ngNdC",disabled:"styles-module__disabled___9AZYS",mcpStatusDot:"styles-module__mcpStatusDot___8AMxP",connecting:"styles-module__connecting___QEO1r",mcpPulse:"styles-module__mcpPulse___5Q3Jj",connected:"styles-module__connected___WyFkx",disconnected:"styles-module__disconnected___mvmvQ",mcpPulseError:"styles-module__mcpPulseError___VHxhx",mcpNavIndicator:"styles-module__mcpNavIndicator___auBHI",webhookUrlInput:"styles-module__webhookUrlInput___WDDDC",checkboxField:"styles-module__checkboxField___ZrSqv",divider:"styles-module__divider___h6Yux",scaleIn:"styles-module__scaleIn___QpQ8E"},fw=(0,br.memo)(function({settings:t,onSettingsChange:n,isDarkMode:o,onToggleTheme:r,isDevMode:i,connectionStatus:l,endpoint:s,onExited:a,isOpen:u,toolbarNearBottom:p,settingsPage:f,onSettingsPageChange:g,onHideToolbar:C}){let{ref:b}=Mg(u,{keepMounted:!0,onExited:a}),N=(0,br.useRef)(null),E=(0,br.useRef)(null),y=(0,br.useRef)(!1);(0,br.useLayoutEffect)(()=>{!u||!y.current||(y.current=!1,(f==="automations"?E:N).current?.focus())},[u,f]);let v=o?"Switch to light mode":"Switch to dark mode";return(0,re.jsx)("div",{className:`${ae.settingsPanel} ${p?ae.below:""}`,style:p?{bottom:"auto",top:"calc(100% + 0.5rem)"}:void 0,"data-agentation-settings-panel":!0,ref:h=>{b.current=h,h?.toggleAttribute("inert",!u)},role:"group","aria-label":"Feedback settings","aria-hidden":!u,children:(0,re.jsxs)("div",{className:ae.settingsPanelContainer,children:[(0,re.jsxs)("div",{className:`${ae.settingsPage} ${f==="automations"?ae.slideLeft:""}`,ref:h=>{h?.toggleAttribute("inert",f!=="main")},"aria-hidden":f!=="main",children:[(0,re.jsxs)("div",{className:ae.settingsHeader,children:[(0,re.jsx)("a",{className:ae.settingsBrand,href:"https://agentation.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Agentation",children:"Agentation"}),(0,re.jsxs)("p",{className:ae.settingsVersion,children:["v","3.1.2"]}),(0,re.jsx)("button",{className:ae.themeToggle,onClick:r,title:v,"aria-label":v,children:(0,re.jsx)("span",{className:ae.themeIconWrapper,children:(0,re.jsx)("span",{className:ae.themeIcon,children:o?(0,re.jsx)(E2,{size:20}):(0,re.jsx)(M2,{size:20})},o?"sun":"moon")})})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("div",{className:ae.settingsSection,children:[(0,re.jsxs)("div",{className:ae.settingsRow,children:[(0,re.jsxs)("div",{className:ae.settingsLabel,children:["Output Detail",(0,re.jsx)(ei,{content:"Controls how much detail is included in the copied output"})]}),(0,re.jsxs)("button",{className:ae.cycleButton,onClick:()=>{let S=(_s.findIndex(j=>j.value===t.outputDetail)+1)%_s.length;n({outputDetail:_s[S].value})},children:[(0,re.jsx)("span",{className:ae.cycleButtonText,children:_s.find(h=>h.value===t.outputDetail)?.label},t.outputDetail),(0,re.jsx)("span",{className:ae.cycleDots,children:_s.map(h=>(0,re.jsx)("span",{className:`${ae.cycleDot} ${t.outputDetail===h.value?ae.active:""}`},h.value))})]})]}),(0,re.jsxs)("div",{className:`${ae.settingsRow} ${ae.settingsRowMarginTop} ${i?"":ae.settingsRowDisabled}`,children:[(0,re.jsxs)("div",{className:ae.settingsLabel,children:["React Components",(0,re.jsx)(ei,{content:i?"Include React component names in annotations":"Disabled \u2014 production builds minify component names, making detection unreliable. Use in development mode."})]}),(0,re.jsx)(D_,{"aria-label":"React Components",checked:i&&t.reactEnabled,onChange:h=>n({reactEnabled:h.target.checked}),disabled:!i})]}),(0,re.jsxs)("div",{className:`${ae.settingsRow} ${ae.settingsRowMarginTop}`,children:[(0,re.jsxs)("div",{className:ae.settingsLabel,children:["Hide Until Restart",(0,re.jsx)(ei,{content:"Hides the toolbar until you open a new tab"})]}),(0,re.jsx)(D_,{"aria-label":"Hide Until Restart",checked:!1,onChange:h=>{h.target.checked&&C()}})]})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("div",{className:ae.settingsSection,children:[(0,re.jsx)("div",{className:`${ae.settingsLabel} ${ae.settingsLabelMarker}`,children:"Marker Color"}),(0,re.jsx)("div",{className:ae.colorOptions,children:ms.map(h=>(0,re.jsx)("button",{className:`${ae.colorOption} ${t.annotationColorId===h.id?ae.selected:""}`,style:{"--swatch":h.srgb,"--swatch-p3":h.p3},onClick:()=>n({annotationColorId:h.id}),title:h.label,"aria-label":h.label,type:"button"},h.id))})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("div",{className:ae.settingsSection,children:[(0,re.jsx)(sg,{className:"checkbox-field",label:"Clear on copy/send",checked:t.autoClearAfterCopy,onChange:h=>n({autoClearAfterCopy:h.target.checked}),tooltip:"Automatically clear annotations after copying"}),(0,re.jsx)(sg,{className:ae.checkboxField,label:"Block page interactions",checked:t.blockInteractions,onChange:h=>n({blockInteractions:h.target.checked})})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("button",{className:ae.settingsNavLink,ref:N,onClick:h=>{y.current=h.detail===0,h.currentTarget.blur(),g("automations")},children:[(0,re.jsx)("span",{children:"Manage MCP & Webhooks"}),(0,re.jsxs)("span",{className:ae.settingsNavLinkRight,children:[s&&l!=="disconnected"&&(0,re.jsx)("span",{className:`${ae.mcpNavIndicator} ${ae[l]}`}),(0,re.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,re.jsx)("path",{d:"M7.5 12.5L12 8L7.5 3.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})]}),(0,re.jsxs)("div",{className:`${ae.settingsPage} ${ae.automationsPage} ${f==="automations"?ae.slideIn:""}`,ref:h=>{h?.toggleAttribute("inert",f!=="automations")},"aria-hidden":f!=="automations",children:[(0,re.jsxs)("button",{className:ae.settingsBackButton,ref:E,"aria-label":"Back to settings",onClick:h=>{y.current=h.detail===0,h.currentTarget.blur(),g("main")},children:[(0,re.jsx)(N2,{size:16}),(0,re.jsx)("span",{children:"Manage MCP & Webhooks"})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("div",{className:ae.settingsSection,children:[(0,re.jsxs)("div",{className:ae.settingsRow,children:[(0,re.jsxs)("span",{className:ae.automationHeader,children:["MCP Connection",(0,re.jsx)(ei,{content:"Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time."})]}),s&&(0,re.jsx)("div",{className:`${ae.mcpStatusDot} ${ae[l]}`,title:l==="connected"?"Connected":l==="connecting"?"Connecting...":"Disconnected"})]}),(0,re.jsxs)("p",{className:ae.automationDescription,style:{paddingBottom:6},children:["MCP connection allows agents to receive and act on annotations."," ",(0,re.jsx)("a",{href:"https://agentation.com/mcp",target:"_blank",rel:"noopener noreferrer",className:ae.learnMoreLink,children:"Learn more"})]})]}),(0,re.jsx)("div",{className:ae.divider}),(0,re.jsxs)("div",{className:`${ae.settingsSection} ${ae.settingsSectionGrow}`,children:[(0,re.jsxs)("div",{className:ae.settingsRow,children:[(0,re.jsxs)("span",{className:ae.automationHeader,children:["Webhooks",(0,re.jsx)(ei,{content:"Send annotation data to any URL endpoint when annotations change. Useful for custom integrations."})]}),(0,re.jsxs)("div",{className:ae.autoSendContainer,children:[(0,re.jsx)("label",{htmlFor:"agentation-auto-send",className:`${ae.autoSendLabel} ${t.webhooksEnabled?ae.active:""} ${t.webhookUrl?"":ae.disabled}`,children:"Auto-Send"}),(0,re.jsx)(D_,{id:"agentation-auto-send",checked:t.webhooksEnabled,onChange:h=>n({webhooksEnabled:h.target.checked}),disabled:!t.webhookUrl})]})]}),(0,re.jsx)("p",{className:ae.automationDescription,children:"The webhook URL will receive live annotation changes and annotation data."}),(0,re.jsx)("textarea",{className:ae.webhookUrlInput,placeholder:"Webhook URL","aria-label":"Webhook URL",value:t.webhookUrl,onKeyDown:h=>h.stopPropagation(),onChange:h=>n({webhookUrl:h.target.value})})]})]})]})})});function hw({x:e,y:t,elementName:n,reactComponents:o}){let r=(0,Tc.useRef)(null);return(0,Tc.useLayoutEffect)(()=>{let i=r.current;if(!i)return;let l=()=>{let s=i.offsetWidth,a=i.offsetHeight;i.style.left=`${Math.max(8,Math.min(e,window.innerWidth-s-8))}px`;let u=t-a-8;i.style.top=`${Math.max(8,Math.min(u,window.innerHeight-a-8))}px`};return l(),window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[e,t,n,o]),(0,vs.jsxs)("div",{ref:r,className:`${A.hoverTooltip} ${A.enter}`,children:[o&&(0,vs.jsx)("div",{className:A.hoverReactPath,children:o}),(0,vs.jsx)("div",{className:A.hoverElementName,children:n})]})}var pw=`@charset "UTF-8";
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 * 4. Render kerning consistently in all browsers.
 * 5. Correct font smoothing for macOS.
 */
:host {
  /* Inherited properties cross the shadow boundary, so a host page's
     text-transform, letter-spacing or font would otherwise restyle the UI. */
  font: 400 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-variant: normal;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-align: start;
  text-indent: 0;
  text-shadow: none;
  white-space: normal;
  direction: ltr;
  writing-mode: horizontal-tb;
  hyphens: manual;
  word-break: normal;
  overflow-wrap: normal;
  tab-size: 8;
  list-style: none;
  quotes: initial;
  caret-color: auto;
  user-select: auto;
  -webkit-text-fill-color: initial;
  -webkit-text-stroke: 0;
  text-rendering: auto;
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3 */
  font-feature-settings: "kern"; /* 4 */
  -webkit-font-feature-settings: "kern"; /* 5 */
  -moz-font-feature-settings: "kern"; /* 5 */
  -webkit-font-smoothing: antialiased; /* 5 */
  -moz-osx-font-smoothing: grayscale; /* 5 */
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Lists (definition) */
/* ============================================ */
dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  clear: both;
  margin: 0;
  border-top-width: 1px;
  height: 0; /* 1 */
  box-sizing: content-box; /* 1 */
  overflow: visible; /* 2 */
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 * 3. Wrap lines by default instead of overflow.
 */
pre {
  font-family: inherit; /* 1 */
  font-size: inherit; /* 2 */
  white-space: pre-line; /* 3 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: none; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: "Menlo", "Monaco", "Consolas", "Courier New", monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
 */
sub,
sup {
  position: relative;
  vertical-align: baseline;
  line-height: 0;
  font-size: 75%;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/*
 * 1. Remove image default bottom space.
 * 2. Prevent image from overflowing the container.
 */
img {
  display: block;
  max-width: 100%;
}

/**
 * Prevent alignment issues on Safari.
 */
@supports (background: -webkit-named-image(i)) {
  svg {
    will-change: transform;
  }
}
/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  vertical-align: middle;
  text-align: inherit;
  text-transform: inherit; /* 2 */
  font: inherit;
  color: inherit;
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Clickable labels and selects.
 */
select,
label {
  cursor: pointer;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * 1. Remove padding.
 */
option {
  padding: 0; /* 1 */
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  display: contents;
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Remove increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px;
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
 * Remove the \u2018X\u2019 from Chrome and Safari.
 */
[type=search]::-webkit-search-decoration,
[type=search]::-webkit-search-cancel-button,
[type=search]::-webkit-search-results-button,
[type=search]::-webkit-search-results-decoration {
  display: none;
}

/**
 * 1. Hide file input completely.
 * 2. Remove selected file text.
 * 3. Set cursor to pointer for all browsers.
 */
[type=file] {
  opacity: 0; /* 1 */
  font-size: 0; /* 2 */
  cursor: pointer; /* 3 */
}

/**
	* Fix appearance for Firefox
	*/
[type=number] {
  -moz-appearance: textfield;
}

/**
 * Set cursor to pointer for all browsers.
 */
[type=range] {
  cursor: pointer;
}

/**
 * Reset slider thumbs to make them styleable.
 */
[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
}

[type=range]::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  border-width: 0;
  border-radius: 0;
  background-color: transparent;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: inherit;
}

/* Misc */
/* ============================================ */
/*
 * Make placeholder style consistent across all browsers.
 */
::placeholder {
  color: #999;
  opacity: 1;
}

/*
 * Hide focus outline but keep it visible for Windows High Contrast Mode.
 */
:focus {
  outline-style: solid;
  outline-color: transparent;
}

/*
 * Hide input arrow when used with datalist.
 */
::-webkit-calendar-picker-indicator {
  display: none !important;
}`,mw=[pw,T2,wg,cw,Gx,$2,$c,sw,rw,uw,_w,aw].join(`
`);function kc(e,t="filtered",n){let{name:o,path:r}=Vi(e,n);if(t==="off")return{name:o,elementName:o,path:r,reactComponents:null};let i=jv(e,{mode:t});return{name:i.path?`${i.path} ${o}`:o,elementName:o,path:r,reactComponents:i.path}}var ag=!1,B_={outputDetail:"standard",autoClearAfterCopy:!1,annotationColorId:"blue",blockInteractions:!0,reactEnabled:!0,markerClickBehavior:"edit",webhookUrl:"",webhooksEnabled:!0},cg=e=>{if(!e||!e.trim())return!1;try{let t=new URL(e.trim());return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}},gw={compact:"off",standard:"filtered",detailed:"smart",forensic:"all"},wr=e=>e.metaKey||e.ctrlKey,ms=[{id:"indigo",label:"Indigo",srgb:"#6155F5",p3:"color(display-p3 0.38 0.33 0.96)"},{id:"blue",label:"Blue",srgb:"#0088FF",p3:"color(display-p3 0.00 0.53 1.00)"},{id:"cyan",label:"Cyan",srgb:"#00C3D0",p3:"color(display-p3 0.00 0.76 0.82)"},{id:"green",label:"Green",srgb:"#34C759",p3:"color(display-p3 0.20 0.78 0.35)"},{id:"yellow",label:"Yellow",srgb:"#FFCC00",p3:"color(display-p3 1.00 0.80 0.00)"},{id:"orange",label:"Orange",srgb:"#FF8D28",p3:"color(display-p3 1.00 0.55 0.16)"},{id:"red",label:"Red",srgb:"#FF383C",p3:"color(display-p3 1.00 0.22 0.24)"}],yw=[...ms.map(e=>`
    [data-agentation-accent="${e.id}"] {
      --agentation-color-accent: ${e.srgb};
    }
    @supports (color: color(display-p3 0 0 0)) {
      [data-agentation-accent="${e.id}"] {
        --agentation-color-accent: ${e.p3};
      }
    }
  `),`:host {
    ${ms.map(e=>`--agentation-color-${e.id}: ${e.srgb};`).join(`
`)}
  }`,`@supports (color: color(display-p3 0 0 0)) {
    :host {
      ${ms.map(e=>`--agentation-color-${e.id}: ${e.p3};`).join(`
`)}
    }
  }`].join("");function z_(e){let t=e;for(let o=Tn(t.ownerDocument);o;o=Tn(t.ownerDocument))t=o;let n=t;for(;n&&n!==document.body;){let r=window.getComputedStyle(n).position;if(r==="fixed"||r==="sticky")return!0;n=n.parentElement}return!1}function fs(e){return e.kind!=="placement"&&e.kind!=="rearrange"&&e.status!=="resolved"&&e.status!=="dismissed"}function Cc(e){let t=V_(e),n=t.found?t:ew(e);if(n.found&&n.source)return Zv(n.source,"path")}function Wg(e={}){let t=_2(e.useHashLocation??!1),n=(0,k.useState)(!1),o=p2(e.portalContainer);return o?(0,yg.createPortal)((0,Fg.createElement)(xw,{...e,key:e.useHashLocation?t:void 0,pathname:t,activeState:n,portalHost:o}),o):null}function xw({pathname:e,activeState:t,portalHost:n,useHashLocation:o=!1,appName:r,enableKeyboardShortcuts:i=!0,identifyingAttributes:l=q_,copyFormat:s="markdown",onOpenSource:a,portalContainer:u,demoAnnotations:p,demoDelay:f=1e3,enableDemoMode:g=!1,onAnnotationAdd:C,onAnnotationDelete:b,onAnnotationUpdate:N,onAnnotationsClear:E,onCopy:y,onSubmit:v,copyToClipboard:h=!0,endpoint:S,sessionId:j,onSessionCreated:Q,webhookUrl:D,className:V}){let[z,K]=t,[,Z]=(0,k.useState)(0),[J]=(0,k.useState)(()=>t2(document,()=>Z(_=>_+1)));(0,k.useEffect)(()=>(J.start(),()=>J.stop()),[J]);let de=typeof s=="object"?s.attribute:void 0,ie=(0,k.useMemo)(()=>de?[...l,de]:l,[l,de]),ce=(0,k.useRef)(!0);(0,k.useLayoutEffect)(()=>(ce.current=!0,()=>{ce.current=!1}),[]);let pe=(0,k.useCallback)(_=>o?f2(JSON.stringify([S,e]),_):_(),[S,e,o]),bt=(0,k.useRef)(new Map),ze=(0,k.useRef)(new Set),Ke=_=>fs(_)&&!ze.current.has(_.id),Oe=async(..._)=>{let m=await J0(..._),w=_[2],M=w.id;if(M&&(bt.current.set(M,m.id),ze.current.has(M)&&ze.current.add(m.id)),!o){let $=new URL(w.url||window.location.href).pathname,I=vr($).find(T=>T.id===M);try{if(ze.current.has(M))await vc(_[0],m.id);else if(I&&I.comment!==w.comment)return await $_(_[0],m.id,{comment:I.comment}),{...m,comment:I.comment}}catch(T){console.warn("[Agentation] Failed to apply changes made during sync:",T)}}return m},ft=_=>o?{..._,annotations:_.annotations.filter(m=>!ze.current.has(m.id)&&h2(m.url||_.url,e,window.location.origin))}:_,Vt=(0,k.useRef)(e);Vt.current=e;let gn=(_,m,w,M=e)=>{let $=G5(_,vr(M),m,bt.current).filter(Ke);M===Vt.current&&ce.current&&qn($),N_(M,$,w)},[Re,qn]=(0,k.useState)([]),[Lo,Xo]=(0,k.useState)(!0),[Go,No]=(0,k.useState)(()=>Lv()),[Io,Ro]=(0,k.useState)(!1);(0,k.useLayoutEffect)(()=>{ug()},[]);let Dt=(0,k.useRef)(null),Kn=(0,k.useRef)(null),fo=(0,k.useRef)(null),Cr=(0,k.useRef)(null),Dn=(0,k.useRef)(!1),$o=(0,k.useRef)(!1),q=(0,k.useRef)(!1);(0,k.useLayoutEffect)(()=>{z&&Dn.current?(Dn.current=!1,fo.current?.querySelector("button:not(:disabled)")?.focus()):!z&&$o.current&&($o.current=!1,Kn.current?.focus())},[z]),(0,k.useEffect)(()=>{let _=w=>{let M=Dt.current;M&&w.composedPath().includes(M)&&w.stopPropagation()},m=["mousedown","click","pointerdown"];return m.forEach(w=>n.addEventListener(w,_)),()=>{m.forEach(w=>n.removeEventListener(w,_))}},[n]);let[he,Ne]=(0,k.useState)(!1),[Se,we]=(0,k.useState)(!1),[Je,Fe]=(0,k.useState)(null),[Qe,Ue]=(0,k.useState)({x:0,y:0}),[H,L]=(0,k.useState)(null),[R,O]=(0,k.useState)(!1),W=$0(),ee=$0(),[te,Y]=(0,k.useState)("idle"),[ue,be]=(0,k.useState)(!1),Te=(0,k.useRef)(new Set),it=(0,k.useRef)(new Set),at=(0,k.useRef)(),Ze=(0,k.useCallback)(()=>{!Te.current.size&&!at.current&&be(!1)},[]);(0,k.useEffect)(()=>()=>clearTimeout(at.current),[]);let[We,Ie]=(0,k.useState)(null),[yt,mt]=(0,k.useState)(null),[ct,Pe]=(0,k.useState)([]),[et,ht]=(0,k.useState)(null),dt=(0,k.useRef)(null);(0,k.useEffect)(()=>()=>{dt.current&&clearTimeout(dt.current)},[]);let[se,En]=(0,k.useState)(null),yn=(0,k.useRef)(null),en=(0,k.useRef)(!1),[ho,To]=(0,k.useState)(!1);(0,k.useLayoutEffect)(()=>{if(se||!yn.current)return;let _=yn.current;if(yn.current=null,H)return;(z&&_.isConnected&&!_.disabled?_:Kn.current)?.focus({preventScroll:!0})},[se,z,H]);let[Jn,Bn]=(0,k.useState)(null),[el,tl]=(0,k.useState)([]),[Sr,lf]=(0,k.useState)(0),[sf,af]=(0,k.useState)(!1),[lt,Qg]=(0,k.useState)(!1),[zn,cf]=(0,k.useState)(!1),[tn,Er]=(0,k.useState)(!1),[Vg,df]=(0,k.useState)("main"),[uf,Pc]=(0,k.useState)(!1),[Ve,Dc]=(0,k.useState)(!1),[Mr,nl]=(0,k.useState)(!1),[Be,Po]=(0,k.useState)([]),[ii,Lr]=(0,k.useState)(null),Bc=(0,k.useRef)(!1),[xt,_f]=(0,k.useState)(!1),[ff,zc]=(0,k.useState)(!1),[hf,Xg]=(0,k.useState)(1),[pf,Sw]=(0,k.useState)("new-page"),[nn,bs]=(0,k.useState)(""),[Gg,qg]=(0,k.useState)(!1),[me,po]=(0,k.useState)(null),Oc=(0,k.useRef)(!1),Ac=(0,k.useRef)({rearrange:null,placements:[]}),Nr=(0,k.useRef)({rearrange:null,placements:[]}),[Kg,mf]=(0,k.useState)(0),[Jg,Zg]=(0,k.useState)(0),[li,gf]=(0,k.useState)([]),[si,yf]=(0,k.useState)(null),xf=(0,k.useRef)({designPlacements:Be,rearrangeState:me,blankCanvas:xt,wireframePurpose:nn});xf.current={designPlacements:Be,rearrangeState:me,blankCanvas:xt,wireframePurpose:nn};let ai=(0,k.useRef)({placements:li,rearrange:si}),ol=(0,k.useRef)(new Set),ks=(0,k.useRef)(new Set),Zn=(0,k.useRef)(null),ci=(0,k.useRef)(),vf=Ve&&z&&!Mr&&xt;(0,k.useEffect)(()=>{if(vf){zc(!1);let _=Mc(()=>{zc(!0)});return()=>cancelAnimationFrame(_)}else zc(!1)},[vf]);let Fc=(0,k.useRef)(new Map),Wc=(0,k.useRef)([]),jc=(0,k.useRef)(new Map),Ir=(0,k.useRef)(null),[On,Hc]=(0,k.useState)(!1),[eo,e1]=(0,k.useState)([]),Uc=(0,k.useRef)(eo);Uc.current=eo;let[wf,Ew]=(0,k.useState)(null),Yc=(0,k.useRef)(null),Mw=(0,k.useRef)(!1),Lw=(0,k.useRef)([]),Nw=(0,k.useRef)(0),Iw=(0,k.useRef)(null),Rw=(0,k.useRef)(null),$w=(0,k.useRef)(1),[Qc,bf]=(0,k.useState)(!1),di=(0,k.useRef)(null),[xn,qo]=(0,k.useState)([]),rl=(0,k.useRef)(!1),on=()=>{Pc(!0)},t1=()=>{Pc(!1)},kf=()=>{Qc||(di.current=ot(()=>bf(!0),850))},Cf=()=>{di.current&&(clearTimeout(di.current),di.current=null),bf(!1),t1()};(0,k.useEffect)(()=>()=>{di.current&&clearTimeout(di.current)},[]);let[tt,n1]=(0,k.useState)(()=>{try{let _=JSON.parse(localStorage.getItem("feedback-toolbar-settings")??"");return{...B_,..._,annotationColorId:ms.find(m=>m.id===_.annotationColorId)?_.annotationColorId:B_.annotationColorId}}catch{return B_}}),[mo,Sf]=(0,k.useState)(!0),[Ef,Mf]=(0,k.useState)(!1),o1=(0,k.useCallback)(_=>{n1(m=>({...m,..._}))},[]),r1=(0,k.useCallback)(()=>{Dt.current?.classList.add(A.disableTransitions),Sf(_=>!_),Mc(()=>{Dt.current?.classList.remove(A.disableTransitions)})},[]),Lf=!1,Do=Lf&&tt.reactEnabled?gw[tt.outputDetail]:"off",[Ft,Vc]=(0,k.useState)(o?null:j??null),Nf=(0,k.useRef)(!1),[Rr,$r]=(0,k.useState)(S?"connecting":"disconnected"),[Rt,Xc]=(0,k.useState)(null),[Cs,If]=(0,k.useState)(!1),il=(0,k.useRef)(null),Ss=(0,k.useRef)(!1),Tr=(0,k.useRef)(new Set),Es=(0,k.useRef)(new Map),Rf=(0,k.useCallback)(_=>{Tr.current.add(_),to.current===_&&(to.current=null)},[]),[Ko,Ms]=(0,k.useState)(new Set),[An,ll]=(0,k.useState)(!1),[Pr,ui]=(0,k.useState)(!1),[Bo,Gc]=(0,k.useState)(!1),Dr=(0,k.useRef)(null),Fn=(0,k.useRef)(null),sl=(0,k.useRef)(null),_i=(0,k.useRef)(null),al=(0,k.useRef)(!1),$f=(0,k.useRef)(0),to=(0,k.useRef)(null),Tf=(0,k.useRef)(null),qc=8,i1=50,Kc=(0,k.useRef)(null),Ls=(0,k.useRef)(null),cl=(0,k.useRef)(null),l1=(0,k.useCallback)(()=>df("main"),[]);(0,k.useEffect)(()=>{tn||Pc(!1)},[tn]),(0,k.useLayoutEffect)(()=>{tn&&q.current&&(q.current=!1,Dt.current?.querySelector("[data-agentation-settings-panel] button")?.focus())},[tn]);let Ns=z&&Lo&&!Ve;(0,k.useEffect)(()=>{if(Ns)we(!1),Ne(!0),Tr.current.clear();else if(he){we(!0);let _=ot(()=>{Ne(!1),we(!1)},250);return()=>clearTimeout(_)}},[Ns]),(0,k.useEffect)(()=>{Qg(!0),lf(window.scrollY);let _=vr(e);qn(_.filter(fs)),ag||(Mf(!0),ag=!0,ot(()=>Mf(!1),750));try{let m=localStorage.getItem("feedback-toolbar-theme");m!==null&&Sf(m==="dark")}catch{}try{let m=localStorage.getItem("feedback-toolbar-position");if(m){let w=JSON.parse(m);typeof w.x=="number"&&typeof w.y=="number"&&Xc(w)}}catch{}},[e]),(0,k.useEffect)(()=>{lt&&localStorage.setItem("feedback-toolbar-settings",JSON.stringify(tt))},[tt,lt]),(0,k.useEffect)(()=>{lt&&localStorage.setItem("feedback-toolbar-theme",mo?"dark":"light")},[mo,lt]);let Pf=(0,k.useRef)(!1);(0,k.useEffect)(()=>{let _=Pf.current;Pf.current=Cs,_&&!Cs&&Rt&&lt&&localStorage.setItem("feedback-toolbar-position",JSON.stringify(Rt))},[Cs,Rt,lt]),(0,k.useEffect)(()=>{if(!S||!lt||Nf.current)return;Nf.current=!0,$r("connecting");let _=window.location.href;pe(async()=>{try{let w=Ev(e),M=j||w,$=!1;if(M)try{let I=vr(e),T=ft(await K0(S,M));Wc.current=T.annotations.filter(ge=>ge.kind==="placement"||ge.kind==="rearrange"),ce.current&&(Vc(T.id),$r("connected")),I_(e,T.id),$=!0;let G=vr(e).filter(fs),fe=new Set(T.annotations.map(ge=>ge.id)),ye=G.filter(ge=>!fe.has(ge.id));if(ye.length>0){let xe=`${typeof window<"u"?window.location.origin:""}${e}`,Ae=(await Promise.allSettled(ye.map(ve=>Oe(S,T.id,{...ve,sessionId:T.id,url:xe})))).map((ve,Me)=>ve.status==="fulfilled"?ve.value:(console.warn("[Agentation] Failed to sync annotation:",ve.reason),ye[Me])),_e=[...T.annotations,...Ae];gn(I,_e,T.id)}else gn(I,T.annotations,T.id)}catch(I){console.warn("[Agentation] Could not join session, creating new:",I),Mv(e)}if(!$){let I=await R_(S,_);I_(e,I.id),ce.current&&(Vc(I.id),$r("connected"),Q?.(I.id));let T=o?new Map([[e,vr(e)]]):yv(),G=typeof window<"u"?window.location.origin:"",fe=[];for(let[ye,ge]of T){let xe=ge.filter(_e=>fs(_e)&&!_e._syncedTo);if(xe.length===0)continue;let $e=`${G}${ye}`,Ae=ye===e;fe.push((async()=>{try{let _e=Ae?I:await R_(S,$e),Me=(await Promise.allSettled(xe.map(Xe=>Oe(S,_e.id,{...Xe,sessionId:_e.id,url:$e})))).map((Xe,kt)=>Xe.status==="fulfilled"?Xe.value:(console.warn("[Agentation] Failed to sync annotation:",Xe.reason),xe[kt]));gn(xe,Me,_e.id,ye)}catch(_e){console.warn(`[Agentation] Failed to sync annotations for ${ye}:`,_e)}})())}await Promise.allSettled(fe)}}catch(w){ce.current&&$r("disconnected"),console.warn("[Agentation] Failed to initialize session, using local storage:",w)}})},[S,j,lt,Q,e,pe]),(0,k.useEffect)(()=>{if(!S||!lt)return;let _=async()=>{try{(await fetch(`${S}/health`)).ok?$r("connected"):$r("disconnected")}catch{$r("disconnected")}};_();let m=_g(_,1e4);return()=>clearInterval(m)},[S,lt]);let Is=(0,k.useRef)(Re),Df=(0,k.useRef)(!1);(0,k.useLayoutEffect)(()=>{Is.current=Re,Df.current=Re.length>0||Be.length>0||(me?.sections.length??0)>0},[Re,Be.length,me?.sections.length]);let Jc=(0,k.useCallback)(_=>{let m=Te.current.has(_);if(m&&(it.current.delete(_),it.current.size))return;let w=m?new Set(Te.current):new Set([_]);m&&(Te.current.clear(),Ze());for(let I of w)Es.current.delete(I),Tr.current.delete(I);qn(I=>I.filter(T=>!w.has(T.id))),Ms(I=>new Set([...I].filter(T=>!w.has(T))));let M=m?[]:Is.current.filter(I=>I.kind!=="placement"&&I.kind!=="rearrange"),$=M.findIndex(I=>I.id===_);$>=0&&$<M.length-1&&(ht(I=>I===null?$:Math.min(I,$)),dt.current&&clearTimeout(dt.current),dt.current=ot(()=>ht(null),200))},[Ze]);(0,k.useEffect)(()=>!S||!lt||!Ft?void 0:ow(S,Ft,()=>Df.current,w=>{let{id:M,kind:$}=w;if($==="placement"){for(let[I,T]of Fc.current)if(T===M){Ir.current?.placements.forget(I),Po(G=>G.filter(fe=>fe.id!==I));break}}else if($==="rearrange"){for(let[I,T]of jc.current)if(T===M){Ir.current?.rearrange.forget(I),po(G=>{if(!G)return null;let fe=G.sections.filter(ye=>ye.id!==I);return fe.length===0?null:{...G,sections:fe}});break}}else{if(!Is.current.some(I=>I.id===M))return;Ms(I=>new Set(I).add(M))}}),[S,lt,Ft]),(0,k.useEffect)(()=>{if(!S||!lt)return;let _=Tf.current==="disconnected",m=Rr==="connected";Tf.current=Rr,_&&m&&pe(async()=>{try{let M=vr(e).filter(fs);if(M.length===0)return;let I=`${typeof window<"u"?window.location.origin:""}${e}`,T=Ft,G=[];if(T)try{G=ft(await K0(S,T)).annotations}catch{T=null}T||(T=(await R_(S,I)).id,ce.current&&Vc(T),I_(e,T));let fe=new Set(G.map(ge=>ge.id)),ye=M.filter(ge=>!fe.has(ge.id));if(ye.length>0){let xe=(await Promise.allSettled(ye.map(Ae=>Oe(S,T,{...Ae,sessionId:T,url:I})))).map((Ae,_e)=>Ae.status==="fulfilled"?Ae.value:(console.warn("[Agentation] Failed to sync annotation on reconnect:",Ae.reason),ye[_e])),$e=[...G,...xe];gn(M,$e,T)}}catch(M){console.warn("[Agentation] Failed to sync on reconnect:",M)}})},[Rr,S,lt,Ft,e,pe]);let s1=(0,k.useCallback)(()=>{Io||(Ro(!0),Er(!1),K(!1),ot(()=>{Nv(!0),No(!0),Ro(!1)},400))},[Io]);(0,k.useEffect)(()=>{if(!g||!lt||!p||p.length===0||Re.length>0)return;let _=[];return _.push(ot(()=>{K(!0)},f-200)),p.forEach((m,w)=>{let M=f+w*300;_.push(ot(()=>{let $=document.querySelector(m.selector);if(!$)return;let I=At($),{name:T,path:G}=Vi($),fe={id:`demo-${Date.now()}-${w}`,x:(I.left+I.width/2)/window.innerWidth*100,y:I.top+I.height/2+window.scrollY,comment:m.comment,element:T,elementPath:G,timestamp:Date.now(),selectedText:m.selectedText,boundingBox:{x:I.left,y:I.top+window.scrollY,width:I.width,height:I.height},nearbyText:as($),cssClasses:cs($)};qn(ye=>[...ye,fe])},M))}),()=>{_.forEach(clearTimeout)}},[g,lt,p,f]),(0,k.useEffect)(()=>{let _=()=>{lf(window.scrollY),Z(m=>m+1),af(!0),cl.current&&clearTimeout(cl.current),cl.current=ot(()=>{af(!1)},150)};return J.addEventListener("scroll",_,{passive:!0,capture:!0}),()=>{J.removeEventListener("scroll",_,!0),cl.current&&clearTimeout(cl.current)}},[J]),(0,k.useEffect)(()=>{if(!lt)return;let _=Re.filter(m=>!Ko.has(m.id));_.length>0?Ft?N_(e,_,Ft):zg(e,_):localStorage.removeItem(ef(e))},[Re,e,lt,Ft,ue,Ko]),(0,k.useEffect)(()=>{if(lt&&!Bc.current){Bc.current=!0;let _=xv(e);_.length>0&&Po(_)}},[lt,e]),(0,k.useEffect)(()=>{if(lt&&Bc.current&&!xt){let _=Be.filter(m=>!li.includes(m));_.length>0?vv(e,_):wv(e)}},[Be,e,lt,xt,li]),(0,k.useEffect)(()=>{if(lt&&!Oc.current){Oc.current=!0;let _=bv(e);if(_){let m={..._,sections:_.sections.map(w=>({...w,currentRect:w.currentRect??{...w.originalRect}}))};po(m)}}},[lt,e]),(0,k.useEffect)(()=>{lt&&Oc.current&&!xt&&(me&&me!==si?kv(e,me):Cv(e))},[me,e,lt,xt,si]);let Zc=(0,k.useRef)(!1);(0,k.useEffect)(()=>{if(lt&&!Zc.current){Zc.current=!0;let _=Sv(e);_&&(Nr.current={rearrange:_.rearrange,placements:_.placements||[]},_.purpose&&bs(_.purpose))}},[lt,e]),(0,k.useEffect)(()=>{if(!lt||!Zc.current||ue)return;let _=Nr.current;xt?(me?.sections?.length??0)>0||Be.length>0||nn?q0(e,{rearrange:me,placements:Be,purpose:nn}):xc(e):(_.rearrange?.sections?.length??0)>0||_.placements.length>0||nn?q0(e,{rearrange:_.rearrange,placements:_.placements,purpose:nn}):xc(e)},[me,Be,nn,xt,e,lt,ue]),(0,k.useEffect)(()=>{Ve&&!me&&po({sections:[],originalOrder:[],detectedAt:Date.now()})},[Ve,me]),(0,k.useEffect)(()=>{if(!S||!Ft)return;let _={create:w=>pe(()=>J0(S,Ft,w)),update:(w,M)=>pe(()=>$_(S,w,M)),remove:w=>pe(()=>vc(S,w))};Fc.current=new Map,jc.current=new Map;let m={placements:rg(_,Fc.current,Wc.current.filter(w=>w.kind==="placement")),rearrange:rg(_,jc.current,Wc.current.filter(w=>w.kind==="rearrange"))};return Ir.current=m,()=>{m.placements.dispose(),m.rearrange.dispose(),Ir.current===m&&(Ir.current=null)}},[S,Ft,e,pe]),(0,k.useEffect)(()=>{let _=window.location.pathname+window.location.search+window.location.hash;Ir.current?.placements.replace(Be.filter(m=>!li.includes(m)).map(m=>({id:m.id,x:m.x/window.innerWidth*100,y:m.y,comment:`Place ${m.type} at (${Math.round(m.x)}, ${Math.round(m.y)}), ${m.width}\xD7${m.height}px${m.text?` \u2014 "${m.text}"`:""}`,element:`[design:${m.type}]`,elementPath:"[placement]",timestamp:m.timestamp,url:_,intent:"change",severity:"important",kind:"placement",placement:{componentType:m.type,width:m.width,height:m.height,scrollY:m.scrollY,text:m.text}})))},[Be,S,Ft,e,li]),(0,k.useEffect)(()=>{let _=Ir.current;if(!_)return;if(me===si){_.rearrange.replace([]);return}let m=ot(()=>{let w=window.location.pathname+window.location.search+window.location.hash,M=[];for(let $ of me?.sections??[]){let I=$.originalRect,T=$.currentRect,G=Math.abs(I.x-T.x)>1||Math.abs(I.y-T.y)>1||Math.abs(I.width-T.width)>1||Math.abs(I.height-T.height)>1;if(!G&&!$.note)continue;let fe=$.note?` \u2014 "${$.note}"`:"";M.push({id:$.id,x:T.x/window.innerWidth*100,y:T.y,comment:G?`Move ${$.label} section (${$.tagName}) \u2014 from (${Math.round(I.x)},${Math.round(I.y)}) ${Math.round(I.width)}\xD7${Math.round(I.height)} to (${Math.round(T.x)},${Math.round(T.y)}) ${Math.round(T.width)}\xD7${Math.round(T.height)}${fe}`:`Note on ${$.label} section (${$.tagName})${fe}`,element:$.selector,elementPath:"[rearrange]",timestamp:me.detectedAt,url:w,intent:"change",severity:"important",kind:"rearrange",rearrange:{selector:$.selector,label:$.label,tagName:$.tagName,originalRect:I,currentRect:T}})}_.rearrange.replace(M)},300);return()=>clearTimeout(m)},[me,S,Ft,e,si]);let ed=(0,k.useCallback)(()=>{clearTimeout(ci.current),nl(!1),Dc(!0)},[]);(0,k.useEffect)(()=>()=>clearTimeout(ci.current),[]);let dl=(0,k.useCallback)(()=>{nl(!0),Dc(!1),Lr(null),clearTimeout(ci.current),ci.current=ot(()=>{nl(!1)},300)},[]),Rs=(0,k.useCallback)(()=>{let _=Kn.current?.getRootNode();$o.current=!!_?.activeElement&&!!Dt.current?.contains(_.activeElement),$o.current&&_?.activeElement?.blur(),Er(!1),Ve&&(nl(!0),Dc(!1),Lr(null),clearTimeout(ci.current),ci.current=ot(()=>{nl(!1)},300)),K(!1)},[Ve]),Bf=(0,k.useCallback)(()=>{zn||(X5(),cf(!0))},[zn]),$s=(0,k.useCallback)(()=>{zn&&(R0(),cf(!1))},[zn]),td=(0,k.useCallback)(()=>{zn?$s():Bf()},[zn,Bf,$s]),ul=(0,k.useCallback)((_=xn)=>{let m=_.filter(T=>T.element.isConnected);if(m.length===0){qo([]);return}let w=m[0],M=w.element,$=m.length>1,I=m.map(T=>At(T.element));if($){let T={left:Math.min(...I.map(Me=>Me.left)),top:Math.min(...I.map(Me=>Me.top)),right:Math.max(...I.map(Me=>Me.right)),bottom:Math.max(...I.map(Me=>Me.bottom))},G=m.slice(0,5).map(Me=>Me.name).join(", "),fe=m.length>5?` +${m.length-5} more`:"",ye=I.map(Me=>({x:Me.left,y:Me.top+window.scrollY,width:Me.width,height:Me.height})),xe=m[m.length-1].element,$e=I[I.length-1],Ae=$e.left+$e.width/2,_e=$e.top+$e.height/2,ve=z_(xe);L({id:Date.now().toString(),x:Ae/window.innerWidth*100,y:ve?_e:_e+window.scrollY,clientY:_e,element:`${m.length} elements: ${G}${fe}`,elementPath:"multi-select",boundingBox:{x:T.left,y:T.top+window.scrollY,width:T.right-T.left,height:T.bottom-T.top},isMultiSelect:!0,isFixed:ve,elementBoundingBoxes:ye,multiSelectElements:m.map(Me=>Me.element),targetElement:xe,fullPath:ps(M),accessibility:fc(M),computedStyles:_c(M),computedStylesObj:uc(M),nearbyElements:dc(M),cssClasses:cs(M),nearbyText:as(M),sourceFile:Cc(M),attributes:hs(M,ie)})}else{let T=I[0],G=z_(M);L({id:Date.now().toString(),x:T.left/window.innerWidth*100,y:G?T.top:T.top+window.scrollY,clientY:T.top,element:w.name,elementPath:w.path,boundingBox:{x:T.left,y:G?T.top:T.top+window.scrollY,width:T.width,height:T.height},isFixed:G,fullPath:ps(M),accessibility:fc(M),computedStyles:_c(M),computedStylesObj:uc(M),nearbyElements:dc(M),cssClasses:cs(M),nearbyText:as(M),reactComponents:w.reactComponents,targetElement:M,sourceFile:Cc(M),attributes:hs(M,ie)})}qo([]),Fe(null)},[xn,ie]);(0,k.useEffect)(()=>{z||(L(null),En(null),Bn(null),tl([]),Fe(null),Er(!1),qo([]),rl.current=!1,zn&&$s())},[z,zn,$s]),(0,k.useEffect)(()=>()=>{R0()},[]),(0,k.useEffect)(()=>{if(!z)return;let _=["p","span","h1","h2","h3","h4","h5","h6","li","td","th","label","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","u","s","a","time","address","cite","q","abbr","dfn","mark","small","sub","sup","[contenteditable]"].join(", "),m=document.createElement("style");return m.id="agentation-cursor",m.textContent=`
      body { cursor: crosshair !important; }
      body :is(${_}) { cursor: text !important; }
    `,document.head.appendChild(m),()=>{let w=document.getElementById("agentation-cursor");w&&w.remove()}},[z]),(0,k.useEffect)(()=>{if(wf!==null&&z)return document.documentElement.setAttribute("data-drawing-hover",""),()=>document.documentElement.removeAttribute("data-drawing-hover")},[wf,z]),(0,k.useEffect)(()=>{if(!z||H||se||On||Ve)return;let _=null,m=(I,T,G)=>{let fe=Sc(I,T),ye=G?P0(I,T):fe;if(!ye||Zt(ye,"[data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]")){Fe(null);return}let{name:ge,elementName:xe,path:$e,reactComponents:Ae}=kc(ye,Do,ie);Fe({element:ge,elementName:xe,elementPath:$e,rect:At(ye),reactComponents:Ae,isPiercing:G&&ye!==fe}),Ue({x:I,y:T})},w=I=>{let T=I.composedPath()[0]||I.target;if(Zt(T,"[data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]")){_=null,Fe(null);return}_={x:I.clientX,y:I.clientY},m(I.clientX,I.clientY,wr(I))},M=I=>{(I.key==="Meta"||I.key==="Control")&&_&&m(_.x,_.y,wr(I))},$=()=>{_=null,Fe(null)};return J.addEventListener("mousemove",w),J.addEventListener("keydown",M),J.addEventListener("keyup",M),J.addEventListener("mouseleave",$),window.addEventListener("blur",$),()=>{J.removeEventListener("mousemove",w),J.removeEventListener("keydown",M),J.removeEventListener("keyup",M),J.removeEventListener("mouseleave",$),window.removeEventListener("blur",$)}},[z,H,se,On,Ve,Do,ie]);let Ts=(0,k.useCallback)((_,m)=>{if(se&&!Pr){Ls.current?.shake();return}if(H&&!An){if(Dt.current?.querySelector("[data-annotation-popup]:not([data-annotation-card]) textarea")?.value.trim()){Kc.current?.shake();return}ll(!0)}if(yn.current=m??null,en.current=m?.matches(":focus-visible")??!1,To(!1),ui(!1),En(_),Ie(null),mt(null),Pe([]),_.elementBoundingBoxes?.length){let w=[];for(let M of _.elementBoundingBoxes){let $=M.x+M.width/2,I=M.y+M.height/2-window.scrollY,T=hc($,I,M);T&&w.push(T)}tl(w),Bn(null)}else if(_.boundingBox){let w=_.boundingBox,M=w.x+w.width/2,$=_.isFixed?w.y+w.height/2:w.y+w.height/2-window.scrollY,I=hc(M,$,w);if(I){let T=At(I),G=T.width/w.width,fe=T.height/w.height;G<.5||fe<.5?Bn(null):Bn(I)}else Bn(null);tl([])}else Bn(null),tl([])},[H,An,se,Pr]);(0,k.useEffect)(()=>{if(!z||On||Ve)return;let _=m=>{if(al.current){al.current=!1,m.preventDefault(),m.stopPropagation();return}let w=m.composedPath()[0]||m.target;if(Zt(w,"[data-feedback-toolbar]")||Zt(w,"[data-annotation-popup]")||Zt(w,"[data-annotation-marker]"))return;if(wr(m)&&!H&&!se){m.preventDefault(),m.stopPropagation(),rl.current=m.shiftKey;let Me=P0(m.clientX,m.clientY);if(!Me)return;let Xe=At(Me),{name:kt,path:un,reactComponents:Le}=kc(Me,Do,ie),ke=xn.findIndex(nt=>nt.element===Me);ke>=0?qo(nt=>nt.filter(($t,xo)=>xo!==ke)):qo(nt=>[...nt,{element:Me,rect:Xe,name:kt,path:un,reactComponents:Le??void 0}]);return}let M=Zt(w,"button, a, input, select, textarea, [role='button'], [onclick]");if(tt.blockInteractions&&(m.preventDefault(),m.stopPropagation()),H&&!An){if(M&&!tt.blockInteractions)return;m.preventDefault(),Kc.current?.shake();return}if(se&&!Pr){if(M&&!tt.blockInteractions)return;m.preventDefault(),Ls.current?.shake();return}m.preventDefault();let $=Sc(m.clientX,m.clientY);if(!$)return;let{name:I,path:T,reactComponents:G}=kc($,Do,ie),fe=At($),ye=m.clientX/window.innerWidth*100,ge=z_($),xe=ge?m.clientY:m.clientY+window.scrollY,$e=$.ownerDocument.defaultView?.getSelection(),Ae;$e&&$e.toString().trim().length>0&&(Ae=$e.toString().trim().slice(0,500));let _e=uc($),ve=_c($);ll(!1),L({id:Date.now().toString(),x:ye,y:xe,clientY:m.clientY,element:I,elementPath:T,selectedText:Ae,boundingBox:{x:fe.left,y:ge?fe.top:fe.top+window.scrollY,width:fe.width,height:fe.height},nearbyText:as($),cssClasses:cs($),isFixed:ge,fullPath:ps($),accessibility:fc($),computedStyles:ve,computedStylesObj:_e,nearbyElements:dc($),reactComponents:G??void 0,sourceFile:Cc($),attributes:hs($,ie),frame:K5($,m.clientX,m.clientY),targetElement:$}),Fe(null)};return J.addEventListener("click",_,!0),()=>J.removeEventListener("click",_,!0)},[z,On,Ve,H,An,se,Pr,tt.blockInteractions,Do,ie,xn]),(0,k.useEffect)(()=>{if(!z)return;let _=w=>{let M=(w.key==="Meta"||w.key==="Control")&&!wr(w),$=w.key==="Shift"&&rl.current;(M||$)&&!Fn.current&&xn.length>0&&ul()},m=()=>{rl.current=!1,qo([]),Fe(null),Dr.current=null,Fn.current=null,Gc(!1),_i.current?.replaceChildren()};return J.addEventListener("keyup",_),window.addEventListener("blur",m),()=>{J.removeEventListener("keyup",_),window.removeEventListener("blur",m)}},[z,xn,ul]),(0,k.useEffect)(()=>{if(!z||H||On||Ve)return;let _=m=>{if(m.button!==0)return;al.current=!1;let w=m.composedPath()[0]||m.target;if(Zt(w,"[data-feedback-toolbar]")||Zt(w,"[data-annotation-marker]")||Zt(w,"[data-annotation-popup]"))return;let M=new Set(["P","SPAN","H1","H2","H3","H4","H5","H6","LI","TD","TH","LABEL","BLOCKQUOTE","FIGCAPTION","CAPTION","LEGEND","DT","DD","PRE","CODE","EM","STRONG","B","I","U","S","A","TIME","ADDRESS","CITE","Q","ABBR","DFN","MARK","SMALL","SUB","SUP"]);!wr(m)&&(M.has(w.tagName)||w.isContentEditable)||(m.preventDefault(),Dr.current={x:m.clientX,y:m.clientY})};return J.addEventListener("mousedown",_),()=>J.removeEventListener("mousedown",_)},[z,H,On,Ve]),(0,k.useEffect)(()=>{if(!z||H)return;let _=m=>{if(!Dr.current)return;let w=m.clientX-Dr.current.x,M=m.clientY-Dr.current.y,$=w*w+M*M,I=qc*qc;if(!Bo&&$>=I&&(Fn.current=Dr.current,Gc(!0),m.preventDefault()),(Bo||$>=I)&&Fn.current){if(sl.current){let Le=Math.min(Fn.current.x,m.clientX),ke=Math.min(Fn.current.y,m.clientY),nt=Math.abs(m.clientX-Fn.current.x),$t=Math.abs(m.clientY-Fn.current.y);sl.current.style.transform=`translate(${Le}px, ${ke}px)`,sl.current.style.width=`${nt}px`,sl.current.style.height=`${$t}px`}let T=Date.now();if(T-$f.current<i1)return;$f.current=T;let G=Fn.current.x,fe=Fn.current.y,ye=Math.min(G,m.clientX),ge=Math.min(fe,m.clientY),xe=Math.max(G,m.clientX),$e=Math.max(fe,m.clientY),Ae=(ye+xe)/2,_e=(ge+$e)/2,ve=new Set,Me=[[ye,ge],[xe,ge],[ye,$e],[xe,$e],[Ae,_e],[Ae,ge],[Ae,$e],[ye,_e],[xe,_e]];for(let[Le,ke]of Me){let nt=document.elementsFromPoint(Le,ke);for(let $t of nt)$t instanceof HTMLElement&&ve.add($t)}let Xe=J.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav");for(let Le of Xe)if(Le instanceof HTMLElement){let ke=At(Le),nt=ke.left+ke.width/2,$t=ke.top+ke.height/2,xo=nt>=ye&&nt<=xe&&$t>=ge&&$t<=$e,no=Math.min(ke.right,xe)-Math.max(ke.left,ye),fl=Math.min(ke.bottom,$e)-Math.max(ke.top,ge),As=no>0&&fl>0?no*fl:0,Xt=ke.width*ke.height,hl=Xt>0?As/Xt:0;(xo||hl>.5)&&ve.add(Le)}let kt=[],un=new Set(["BUTTON","A","INPUT","IMG","P","H1","H2","H3","H4","H5","H6","LI","LABEL","TD","TH","SECTION","ARTICLE","ASIDE","NAV"]);for(let Le of ve){if(Zt(Le,"[data-feedback-toolbar]")||Zt(Le,"[data-annotation-marker]"))continue;let ke=At(Le);if(!(ke.width>window.innerWidth*.8&&ke.height>window.innerHeight*.5)&&!(ke.width<10||ke.height<10)&&ke.left<xe&&ke.right>ye&&ke.top<$e&&ke.bottom>ge){let nt=Le.tagName,$t=un.has(nt);if(!$t&&(nt==="DIV"||nt==="SPAN")){let xo=Le.textContent&&Le.textContent.trim().length>0,no=Le.onclick!==null||Le.getAttribute("role")==="button"||Le.getAttribute("role")==="link"||Le.classList.contains("clickable")||Le.hasAttribute("data-clickable");(xo||no)&&!Le.querySelector("p, h1, h2, h3, h4, h5, h6, button, a")&&($t=!0)}if($t){let xo=!1;for(let no of kt)if(no.left<=ke.left&&no.right>=ke.right&&no.top<=ke.top&&no.bottom>=ke.bottom){xo=!0;break}xo||kt.push(ke)}}}if(_i.current){let Le=_i.current;for(;Le.children.length>kt.length;)Le.removeChild(Le.lastChild);kt.forEach((ke,nt)=>{let $t=Le.children[nt];$t||($t=document.createElement("div"),$t.className=A.selectedElementHighlight,Le.appendChild($t)),$t.style.transform=`translate(${ke.left}px, ${ke.top}px)`,$t.style.width=`${ke.width}px`,$t.style.height=`${ke.height}px`})}}};return J.addEventListener("mousemove",_,{passive:!0}),()=>J.removeEventListener("mousemove",_)},[z,H,Bo,qc]),(0,k.useEffect)(()=>{if(!z)return;let _=m=>{let w=Bo,M=Fn.current;if(Bo&&M){al.current=!0;let $=Math.min(M.x,m.clientX),I=Math.min(M.y,m.clientY),T=Math.max(M.x,m.clientX),G=Math.max(M.y,m.clientY),fe=[];J.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th").forEach(_e=>{if(!(_e instanceof HTMLElement)||Zt(_e,"[data-feedback-toolbar]")||Zt(_e,"[data-annotation-marker]"))return;let ve=At(_e);ve.width>window.innerWidth*.8&&ve.height>window.innerHeight*.5||ve.width<10||ve.height<10||ve.left<T&&ve.right>$&&ve.top<G&&ve.bottom>I&&fe.push({element:_e,rect:ve})});let ge=fe.filter(({element:_e})=>!fe.some(({element:ve})=>ve!==_e&&_e.contains(ve))),xe=m.clientX/window.innerWidth*100,$e=m.clientY+window.scrollY,Ae=(wr(m)||xn.length>0)&&!H&&!se;if(ge.length>0)if(Ae){let _e=[...xn];for(let{element:ve,rect:Me}of ge){if(_e.some(Le=>Le.element===ve))continue;let{name:Xe,path:kt,reactComponents:un}=kc(ve,Do,ie);_e.push({element:ve,rect:Me,name:Xe,path:kt,reactComponents:un??void 0})}rl.current=m.shiftKey,wr(m)?qo(_e):ul(_e)}else{let _e=ge.reduce((Le,{rect:ke})=>({left:Math.min(Le.left,ke.left),top:Math.min(Le.top,ke.top),right:Math.max(Le.right,ke.right),bottom:Math.max(Le.bottom,ke.bottom)}),{left:1/0,top:1/0,right:-1/0,bottom:-1/0}),ve=ge.slice(0,5).map(({element:Le})=>Vi(Le).name).join(", "),Me=ge.length>5?` +${ge.length-5} more`:"",Xe=ge[0].element,kt=uc(Xe),un=_c(Xe);L({id:Date.now().toString(),x:xe,y:$e,clientY:m.clientY,element:`${ge.length} elements: ${ve}${Me}`,elementPath:"multi-select",boundingBox:{x:_e.left,y:_e.top+window.scrollY,width:_e.right-_e.left,height:_e.bottom-_e.top},isMultiSelect:!0,fullPath:ps(Xe),accessibility:fc(Xe),computedStyles:un,computedStylesObj:kt,nearbyElements:dc(Xe),cssClasses:cs(Xe),nearbyText:as(Xe),sourceFile:Cc(Xe),attributes:hs(Xe,ie)})}else if(Ae&&!wr(m))ul();else if(!Ae){let _e=Math.abs(T-$),ve=Math.abs(G-I);_e>20&&ve>20&&L({id:Date.now().toString(),x:xe,y:$e,clientY:m.clientY,element:"Area selection",elementPath:`region at (${Math.round($)}, ${Math.round(I)})`,boundingBox:{x:$,y:I+window.scrollY,width:_e,height:ve},isMultiSelect:!0})}Fe(null)}else w&&(al.current=!0);Dr.current=null,Fn.current=null,Gc(!1),_i.current&&(_i.current.innerHTML="")};return J.addEventListener("mouseup",_),()=>J.removeEventListener("mouseup",_)},[z,Bo,H,se,Do,ie,xn,ul]);let go=(0,k.useCallback)(async(_,m,w)=>{let M=tt.webhookUrl||D;if(!M||!tt.webhooksEnabled&&!w)return!1;try{return(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:_,timestamp:Date.now(),url:typeof window<"u"?window.location.href:void 0,...m})})).ok}catch($){return console.warn("[Agentation] Webhook failed:",$),!1}},[D,tt.webhookUrl,tt.webhooksEnabled]),a1=(0,k.useCallback)(_=>{if(!H||H.isSubmitted)return;let m={id:H.id,x:H.x,y:H.y,comment:_,element:H.element,elementPath:H.elementPath,timestamp:Date.now(),selectedText:H.selectedText,boundingBox:H.boundingBox,nearbyText:H.nearbyText,cssClasses:H.cssClasses,isMultiSelect:H.isMultiSelect,isFixed:H.isFixed,fullPath:H.fullPath,accessibility:H.accessibility,computedStyles:H.computedStyles,nearbyElements:H.nearbyElements,reactComponents:H.reactComponents,sourceFile:H.sourceFile,attributes:H.attributes,frame:H.frame,elementBoundingBoxes:H.elementBoundingBoxes,...S&&Ft?{sessionId:Ft,url:typeof window<"u"?window.location.href:void 0,status:"pending"}:{}};qn(w=>[...w,m]),L({...H,isSubmitted:!0}),to.current=m.id,C?.(m),go("annotation.add",{annotation:m}),ll(!0),window.getSelection()?.removeAllRanges(),S&&Ft&&pe(async()=>{let w=await Oe(S,Ft,m);if(o){let M=vr(e);N_(e,M.map($=>$.id===m.id?{...$,id:w.id}:$),Ft)}!ce.current||ze.current.has(m.id)||w.id!==m.id&&(Es.current.set(w.id,m.id),to.current===m.id&&(to.current=w.id),qn(M=>M.map($=>$.id===m.id?{...$,id:w.id}:$)),Tr.current.delete(m.id)&&Tr.current.add(w.id))}).catch(w=>{console.warn("[Agentation] Failed to sync annotation:",w)})},[H,C,go,S,Ft,pe,e,o]),nd=(0,k.useCallback)(()=>{ll(!0)},[]),od=(0,k.useCallback)(()=>{L(null),ll(!1)},[]),rd=(0,k.useCallback)(_=>{if(ze.current.has(_))return;ze.current.add(_);let m=Re.find(w=>w.id===_);se?.id===_&&(To(!1),ui(!0)),Ms(w=>new Set(w).add(_)),m&&(b?.(m),go("annotation.delete",{annotation:m})),S&&pe(()=>vc(S,bt.current.get(_)??_)).catch(w=>{console.warn("[Agentation] Failed to delete annotation from server:",w)})},[Re,se,b,go,S,pe]),Ps=(0,k.useCallback)(_=>{if(!_){Ie(null),mt(null),Pe([]);return}if(Ie(_.id),_.elementBoundingBoxes?.length){let m=[];for(let w of _.elementBoundingBoxes){let M=w.x+w.width/2,$=w.y+w.height/2-window.scrollY,I=hc(M,$,w);I&&m.push(I)}Pe(m),mt(null)}else if(_.boundingBox){let m=_.boundingBox,w=m.x+m.width/2,M=_.isFixed?m.y+m.height/2:m.y+m.height/2-window.scrollY,$=hc(w,M,m);if($){let I=At($),T=I.width/m.width,G=I.height/m.height;T<.5||G<.5?mt(null):mt($)}else mt(null);Pe([])}else mt(null),Pe([])},[]),c1=(0,k.useCallback)(_=>{if(!se)return;let m={...se,comment:_};En(m),qn(w=>w.map(M=>M.id===se.id?m:M)),N?.(m),go("annotation.update",{annotation:m}),S&&pe(()=>$_(S,bt.current.get(se.id)??se.id,{comment:_})).catch(w=>{console.warn("[Agentation] Failed to update annotation on server:",w)}),To(en.current||!!yn.current?.matches(":hover")),ui(!0)},[se,N,go,S,pe]),d1=(0,k.useCallback)(()=>{To(en.current||!!yn.current?.matches(":hover")),ui(!0)},[]),u1=(0,k.useCallback)(()=>{ho&&se&&!H&&Ie(se.id),En(null),Bn(null),tl([]),ui(!1)},[ho,se,H]),Ds=(0,k.useCallback)((_,m)=>{if(!_.length&&!m)return;be(!0);let w={placements:[...ai.current.placements,..._],rearrange:m??ai.current.rearrange};ai.current=w,gf(w.placements),yf(w.rearrange),clearTimeout(at.current),at.current=ot(()=>{Po(M=>M.filter($=>!w.placements.includes($))),po(M=>M===w.rearrange?null:M),ai.current={placements:[],rearrange:null},gf([]),yf(null),at.current=void 0,Ze()},200)},[Ze]),Br=(0,k.useCallback)(()=>{if(!ce.current)return;let _=new Map(Is.current.map(G=>[G.id,G])),m=[];for(let G of Re){let fe=_.get(bt.current.get(G.id)??G.id)??_.get(G.id);fe&&fe.comment===G.comment&&!ze.current.has(fe.id)&&!m.includes(fe)&&m.push(fe)}let w=m.length,M=xf.current,$=Be.filter(G=>M.designPlacements.includes(G)&&!ai.current.placements.includes(G)),I=me===M.rearrangeState&&me!==ai.current.rearrange?me:null,T=eo.filter(G=>Uc.current.includes(G));if(!(w===0&&T.length===0&&$.length===0&&!I)){for(let G of m)ze.current.add(G.id),Te.current.add(G.id),it.current.add(G.id);if(Ms(G=>new Set([...G,...m.map(fe=>fe.id)])),E?.(m),go("annotations.clear",{annotations:m}),S&&Promise.all(m.map(G=>pe(()=>vc(S,bt.current.get(G.id)??G.id)).catch(fe=>{console.warn("[Agentation] Failed to delete annotation from server:",fe)}))),be(!0),e1(G=>G.filter(fe=>!T.includes(fe))),T.length>0&&T.length===Uc.current.length){let G=Yc.current;G?.getContext("2d")?.clearRect(0,0,G.width,G.height)}Ds($,I),xt===M.blankCanvas&&nn===M.wireframePurpose&&Be===M.designPlacements&&me===M.rearrangeState&&(xt&&_f(!1),nn&&bs(""),Nr.current={rearrange:null,placements:[]},xc(e)),Ze()}},[e,Re,eo,Be,me,xt,nn,E,go,S,pe,Ze,Ds]),id=(0,k.useCallback)(async()=>{let _=W.start(),m=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:e,w=Ve&&xt,M;if(w){if(Be.length===0&&!me&&!nn)return;M=r?Ec(m,r):""}else{if(M=tg(Re,m,tt.outputDetail,{appName:r}),!M&&eo.length===0&&Be.length===0&&!me)return;M||(M=Ec(m,r))}if(!w&&eo.length>0){let I=new Set;for(let ye of Re)ye.drawingIndex!=null&&I.add(ye.drawingIndex);let T=Yc.current;T&&(T.style.visibility="hidden");let G=[],fe=window.scrollY;for(let ye=0;ye<eo.length;ye++){if(I.has(ye))continue;let ge=eo[ye];if(ge.points.length<2)continue;let xe=ge.fixed?ge.points:ge.points.map(zt=>({x:zt.x,y:zt.y-fe})),$e=1/0,Ae=1/0,_e=-1/0,ve=-1/0;for(let zt of xe)$e=Math.min($e,zt.x),Ae=Math.min(Ae,zt.y),_e=Math.max(_e,zt.x),ve=Math.max(ve,zt.y);let Me=_e-$e,Xe=ve-Ae,kt=Math.hypot(Me,Xe),un=xe[0],Le=xe[xe.length-1],ke=Math.hypot(Le.x-un.x,Le.y-un.y),nt,$t=ke<kt*.35,xo=Me/Math.max(Xe,1);if($t&&kt>20){let zt=Math.max(Me,Xe)*.15,Jo=0;for(let zr of xe){let f1=zr.x-$e<zt,h1=_e-zr.x<zt,p1=zr.y-Ae<zt,m1=ve-zr.y<zt;(f1||h1)&&(p1||m1)&&Jo++}nt=Jo>xe.length*.15?"box":"circle"}else xo>3&&Xe<40?nt="underline":ke>kt*.5?nt="arrow":nt="drawing";let no=Math.min(10,xe.length),fl=Math.max(1,Math.floor(xe.length/no)),As=new Set,Xt=[],hl=[un];for(let zt=fl;zt<xe.length-1;zt+=fl)hl.push(xe[zt]);hl.push(Le);for(let zt of hl){let Jo=Sc(zt.x,zt.y);if(!Jo||As.has(Jo)||Zt(Jo,"[data-feedback-toolbar]"))continue;As.add(Jo);let{name:zr}=Vi(Jo);Xt.includes(zr)||Xt.push(zr)}let Fs=`${Math.round($e)},${Math.round(Ae)} \u2192 ${Math.round(_e)},${Math.round(ve)}`,hi;(nt==="circle"||nt==="box")&&Xt.length>0?hi=`${nt==="box"?"Boxed":"Circled"} **${Xt[0]}**${Xt.length>1?` (and ${Xt.slice(1).join(", ")})`:""} (region: ${Fs})`:nt==="underline"&&Xt.length>0?hi=`Underlined **${Xt[0]}** (${Fs})`:nt==="arrow"&&Xt.length>=2?hi=`Arrow from **${Xt[0]}** to **${Xt[Xt.length-1]}** (${Math.round(un.x)},${Math.round(un.y)} \u2192 ${Math.round(Le.x)},${Math.round(Le.y)})`:Xt.length>0?hi=`${nt==="arrow"?"Arrow":"Drawing"} near **${Xt.join("**, **")}** (region: ${Fs})`:hi=`Drawing at ${Fs}`,G.push(hi)}T&&(T.style.visibility=""),G.length>0&&(M+=`
**Drawings:**
`,G.forEach((ye,ge)=>{M+=`${ge+1}. ${ye}
`}))}if((Be.length>0||w&&nn)&&(M+=`
`+X0(Be,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:xt,wireframePurpose:nn||void 0},tt.outputDetail)),me){let I=G0(me,tt.outputDetail,{width:window.innerWidth,height:window.innerHeight});I&&(M+=`
`+I)}if(M=ng(Re,M,s),!M){O(!1);return}let $=!h||await tw(M);y?.(M),W.isCurrent(_)&&(O($),$&&(W.schedule(_,()=>O(!1),2e3),tt.autoClearAfterCopy&&W.schedule(_,Br,500)))},[Re,eo,Be,me,xt,Ve,pf,nn,e,tt.outputDetail,Do,ie,tt.autoClearAfterCopy,Br,W,h,s,r,y]),ld=cg(tt.webhookUrl)||cg(D||""),yo=v!=null||ld&&!tt.webhooksEnabled,Bs=z?yo?337:297:44,sd=(0,k.useCallback)(async()=>{let _=ee.start(),m=typeof window<"u"?window.location.href:e,w=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:e,M=tg(Re,w,tt.outputDetail,{appName:r});if(!M&&Be.length===0&&!me)return;if(M||(M=Ec(w,r)),Be.length>0&&(M+=`
`+X0(Be,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:xt,wireframePurpose:nn||void 0},tt.outputDetail)),me){let G=G0(me,tt.outputDetail,{width:window.innerWidth,height:window.innerHeight});G&&(M+=`
`+G)}Y("sending");let $=!0;try{await v?.(M,Re)}catch(G){console.warn("[Agentation] Submit callback failed:",G),$=!1}if(!ee.isCurrent(_))return;let I=ld?await go("submit",{output:M,annotations:Re,url:m},!0):!0,T=$&&I&&yo;ee.isCurrent(_)&&(Y(T?"sent":"failed"),ee.schedule(_,()=>Y("idle"),2500),T&&tt.autoClearAfterCopy&&ee.schedule(_,Br,500))},[v,r,go,Re,Be,me,xt,pf,e,tt.outputDetail,Do,ie,tt.autoClearAfterCopy,Br,ld,yo,ee]);(0,k.useEffect)(()=>{let m=(I=!1)=>{il.current?.dragging&&(Ss.current=I,If(!1)),il.current=null},w=I=>{let T=il.current;if(!T)return;if(!(I.buttons&1)){m();return}let G=I.clientX-T.x,fe=I.clientY-T.y,ye=Math.sqrt(G*G+fe*fe);if(!T.dragging&&ye>10&&(T.dragging=!0,If(!0)),T.dragging){let ge=T.toolbarX+G,xe=T.toolbarY+fe,$e=20,Ae=337,_e=44,Me=Ae-Bs,Xe=$e-Me,kt=window.innerWidth-$e-Ae;ge=Math.max(Xe,Math.min(kt,ge)),xe=Math.max($e,Math.min(window.innerHeight-_e-$e,xe)),Xc({x:ge,y:xe})}},M=()=>m(!0),$=()=>m();return J.addEventListener("mousemove",w),J.addEventListener("mouseup",M,!0),window.addEventListener("blur",$),()=>{J.removeEventListener("mousemove",w),J.removeEventListener("mouseup",M,!0),window.removeEventListener("blur",$)}},[Bs]);let _1=(0,k.useCallback)(_=>{if(Ss.current=!1,il.current=null,_.button!==0||_.target.closest("button")&&(_.target.closest("button")!==Kn.current||z)||_.target.closest("[data-agentation-settings-panel]"))return;let m=_.currentTarget.parentElement;if(!m)return;let w=At(m);il.current={x:_.clientX,y:_.clientY,toolbarX:w.left,toolbarY:w.top,dragging:!1}},[z]);(0,k.useLayoutEffect)(()=>{if(!Rt)return;let _=()=>{let $=Rt.x,I=Rt.y,fe=20-(337-Bs),ye=window.innerWidth-20-337;$=Math.max(fe,Math.min(ye,$)),I=Math.max(20,Math.min(window.innerHeight-44-20,I)),($!==Rt.x||I!==Rt.y)&&Xc({x:$,y:I})};return _(),window.addEventListener("resize",_),()=>window.removeEventListener("resize",_)},[Rt,Bs]),(0,k.useEffect)(()=>{if(!i)return;let _=w=>{if(w.defaultPrevented||w.isComposing||w.altKey)return;let M=w.composedPath()[0]||w.target,$=M.tagName==="INPUT"||M.tagName==="TEXTAREA"||M.tagName==="SELECT"||M.isContentEditable;if(w.key==="Escape"){if(u&&!H&&!se&&(z||tn||Ve||On||xn.length)&&(w.preventDefault(),w.stopPropagation()),tn){w.preventDefault(),Er(!1),Cr.current?.focus();return}if(Ve){ii?Lr(null):dl();return}if(On){Hc(!1);return}if(xn.length>0){qo([]);return}H||se||z&&(on(),Rs())}if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key==="f"||w.key==="F")){w.preventDefault(),on(),z?Rs():(Kn.current?.blur(),Dn.current=!0,K(!0));return}!z||$||w.metaKey||w.ctrlKey||w.repeat||((w.key==="p"||w.key==="P")&&(w.preventDefault(),on(),td()),(w.key==="l"||w.key==="L")&&(w.preventDefault(),on(),On&&Hc(!1),tn&&Er(!1),H&&nd(),Ve?dl():ed()),(w.key==="h"||w.key==="H")&&Re.length>0&&(w.preventDefault(),on(),Xo(I=>!I)),(w.key==="c"||w.key==="C")&&(Re.length>0||Be.length>0||me)&&(w.preventDefault(),on(),id()),(w.key==="x"||w.key==="X")&&(Re.length>0||Be.length>0||me)&&(w.preventDefault(),on(),Br(),Be.length>0&&Po([]),me&&po(null)),(w.key==="s"||w.key==="S")&&Re.length>0&&yo&&te==="idle"&&(w.preventDefault(),on(),sd()))},m=!!u;return J.addEventListener("keydown",_,m),()=>J.removeEventListener("keydown",_,m)},[i,u,se,z,On,Ve,ii,Be,me,H,Re.length,yo,te,sd,td,id,Br,xn,tn,Rs,ed,dl]);let _l=Re.length>0,zs=J5(),Os=Re.filter(_=>_.kind!=="placement"&&_.kind!=="rearrange"),zf=Os.flatMap((_,m)=>{let w=zs(_);return w?[{annotation:w,index:m}]:[]}),Of=H&&!H.isSubmitted?zs({...H,comment:"",timestamp:0}):null,Af=[...he?zf.map(_=>({..._,pending:!1})):[],...Of?[{annotation:Of,index:Os.length,pending:!0}]:[]];(0,k.useEffect)(()=>{let _=new Set(he&&!Go?zf.map(({annotation:m})=>m.id):[]);to.current&&!_.has(to.current)&&(to.current=null);for(let m of Ko)_.has(m)||Jc(m)}),(0,k.useEffect)(()=>{se&&Ko.has(se.id)&&(To(!1),ui(!0))},[se,Ko]);let Ff=(0,k.useCallback)(_=>{!Se&&_.id!==to.current&&Ps(_)},[Se,Ps]),Wf=(0,k.useCallback)(_=>{We===_&&Ps(null)},[We,Ps]),jf=(0,k.useCallback)((_,m)=>{if(se&&!Pr){Ls.current?.shake();return}An&&od(),tt.markerClickBehavior==="delete"?rd(_.id):Ts(_,m)},[tt.markerClickBehavior,rd,Ts,An,od,se,Pr]),Wn=se??(Ns&&!H&&!ue?Re.find(_=>_.id===We&&!Ko.has(_.id)):null),Hf=zn?"Resume animations":"Pause animations",Uf=Ve?"Exit layout mode":"Layout mode",Yf=Lo?"Hide markers":"Show markers",Qf=s!=="markdown"&&!ng(Re,"",s),Vf=typeof s=="object"?`Copy ${s.attribute}`:s==="source"?"Copy source paths":s==="classes"?"Copy classes":Ve&&xt?"Copy layout":"Copy feedback",fi=z?0:-1;return!lt||Go?null:(0,U.jsxs)(m2,{host:"agentation-toolbar",className:V,children:[(0,U.jsxs)("style",{"data-agentation-styles":"toolbar",children:[mw,yw]}),(0,U.jsxs)("div",{ref:Dt,className:A.positionContext,style:{display:"contents"},"data-agentation-theme":mo?"dark":"light","data-agentation-accent":tt.annotationColorId,"data-agentation-root":"",children:[(0,U.jsx)("div",{className:A.toolbar,"data-feedback-toolbar":!0,"data-agentation-toolbar":!0,"data-dragging":Cs||void 0,style:Rt?{left:Rt.x,top:Rt.y,right:"auto",bottom:"auto"}:void 0,children:(0,U.jsxs)("div",{className:`${A.toolbarContainer} ${z?A.expanded:A.collapsed} ${Ef?A.entrance:""} ${Io?A.hiding:""} ${yo?A.serverConnected:""}`,onMouseDown:_1,children:[(0,U.jsxs)("div",{className:`${A.controlsContent} ${z?A.visible:A.hidden} ${Rt&&Rt.y<100?A.tooltipBelow:""} ${uf||tn?A.tooltipsHidden:""} ${Qc?A.tooltipsInSession:""}`,ref:_=>{fo.current=_,_?.toggleAttribute("inert",!z)},role:"group","aria-label":"Feedback controls","aria-hidden":!z,onMouseEnter:kf,onMouseLeave:Cf,children:[(0,U.jsxs)("div",{className:`${A.buttonWrapper} ${Rt&&Rt.x<120?A.buttonWrapperAlignLeft:""}`,children:[(0,U.jsx)("button",{className:A.controlButton,onClick:_=>{_.stopPropagation(),on(),td()},"data-active":zn,"aria-label":Hf,"aria-pressed":zn,tabIndex:fi,children:(0,U.jsx)(b2,{size:24,isPaused:zn})}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:[Hf,i&&(0,U.jsx)("span",{className:A.shortcut,children:"P"})]})]}),(0,U.jsxs)("div",{className:A.buttonWrapper,children:[(0,U.jsx)("button",{className:`${A.controlButton} ${mo?"":A.light}`,onClick:_=>{_.stopPropagation(),on(),On&&Hc(!1),tn&&Er(!1),H&&nd(),Ve?dl():ed()},"data-active":Ve,"aria-label":Uf,"aria-pressed":Ve,tabIndex:fi,style:Ve&&xt?{color:"#f97316",background:"rgba(249, 115, 22, 0.25)"}:void 0,children:(0,U.jsx)(I2,{size:21})}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:[Uf,i&&(0,U.jsx)("span",{className:A.shortcut,children:"L"})]})]}),(0,U.jsxs)("div",{className:A.buttonWrapper,children:[(0,U.jsx)("button",{className:A.controlButton,onClick:_=>{_.stopPropagation(),on(),Xo(!Lo)},disabled:!_l||Ve,"aria-label":Yf,tabIndex:fi,children:(0,U.jsx)(w2,{size:24,isOpen:Lo})}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:[Yf,i&&(0,U.jsx)("span",{className:A.shortcut,children:"H"})]})]}),(0,U.jsxs)("div",{className:A.buttonWrapper,children:[(0,U.jsx)("button",{className:`${A.controlButton} ${R?A.statusShowing:""}`,onClick:_=>{_.stopPropagation(),on(),id()},disabled:Qf||(Ve&&xt?Be.length===0&&!me?.sections?.length:!_l&&eo.length===0&&Be.length===0&&!me?.sections?.length),"data-active":R,"aria-label":Vf,tabIndex:fi,children:(0,U.jsx)(x2,{size:24,copied:R,tint:Ve&&xt&&(Be.length>0||me?.sections?.length)?"#f97316":void 0})}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:[Qf?"No matching metadata":Vf,i&&(0,U.jsx)("span",{className:A.shortcut,children:"C"})]})]}),(0,U.jsxs)("div",{className:`${A.buttonWrapper} ${A.sendButtonWrapper} ${z&&yo?A.sendButtonVisible:""}`,children:[(0,U.jsxs)("button",{className:`${A.controlButton} ${te==="sent"||te==="failed"?A.statusShowing:""}`,onClick:_=>{_.stopPropagation(),on(),sd()},disabled:!_l||!yo||te==="sending","data-no-hover":te==="sent"||te==="failed",tabIndex:z&&yo?0:-1,"aria-label":"Send Annotations","aria-hidden":!yo,children:[(0,U.jsx)(v2,{size:24,state:te}),_l&&te==="idle"&&(0,U.jsx)("span",{className:A.buttonBadge,children:Re.length})]}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:["Send Annotations",i&&(0,U.jsx)("span",{className:A.shortcut,children:"S"})]})]}),(0,U.jsxs)("div",{className:A.buttonWrapper,children:[(0,U.jsx)("button",{className:A.controlButton,onClick:_=>{_.stopPropagation(),on(),Br()},disabled:!_l&&eo.length===0&&Be.length===0&&!me?.sections?.length,"data-danger":!0,"aria-label":"Clear all",tabIndex:fi,children:(0,U.jsx)(C2,{size:24})}),(0,U.jsxs)("span",{className:A.buttonTooltip,children:["Clear all",i&&(0,U.jsx)("span",{className:A.shortcut,children:"X"})]})]}),(0,U.jsxs)("div",{className:A.buttonWrapper,children:[(0,U.jsx)("button",{ref:Cr,"aria-label":"Settings","aria-expanded":tn,tabIndex:fi,className:A.controlButton,onClick:_=>{_.stopPropagation(),on(),Ve&&dl(),q.current=!tn&&_.detail===0,Er(!tn)},children:(0,U.jsx)(k2,{size:24})}),S&&Rr!=="disconnected"&&(0,U.jsx)("span",{className:`${A.mcpIndicator} ${A[Rr]} ${tn?A.hidden:""}`,title:Rr==="connected"?"MCP Connected":"MCP Connecting..."}),(0,U.jsx)("span",{className:A.buttonTooltip,children:"Settings"})]}),(0,U.jsx)("div",{className:A.divider}),(0,U.jsx)("div",{className:A.togglePlaceholder,"aria-hidden":"true"})]}),(0,U.jsxs)("div",{className:`${A.buttonWrapper} ${A.toggleWrapper} ${Rt&&Rt.y<100?A.tooltipBelow:""} ${!z||uf||tn?A.tooltipsHidden:""} ${Qc?A.tooltipsInSession:""} ${Rt&&typeof window<"u"&&Rt.x>window.innerWidth-120?A.buttonWrapperAlignRight:""}`,onMouseEnter:kf,onMouseLeave:Cf,children:[(0,U.jsx)("button",{ref:Kn,type:"button",className:`${A.toggleContent} ${z?A.expandedToggle:""}`,"aria-label":z?"Exit":"Start feedback mode","aria-expanded":z,"aria-keyshortcuts":i?"Meta+Shift+F Control+Shift+F":void 0,title:z?void 0:i?"Start feedback mode (\u2318\u21E7F / Ctrl+Shift+F)":"Start feedback mode",onClick:_=>{if(Ss.current){Ss.current=!1,_.preventDefault();return}_.stopPropagation(),z?(on(),Rs()):(_.currentTarget.blur(),Dn.current=_.detail===0,K(!0))},children:(0,U.jsxs)("span",{className:A.toggleIcon,children:[(0,U.jsx)(P2,{active:z}),Os.length>0&&(0,U.jsx)("span",{className:`${A.badge} ${z?A.fadeOut:""} ${Ef?A.entrance:""}`,children:Os.length})]})}),(0,U.jsxs)("span",{className:A.buttonTooltip,"aria-hidden":!z,children:["Exit",i&&(0,U.jsx)("span",{className:A.shortcut,children:"Esc"})]})]}),(0,U.jsx)(tv,{visible:Ve&&z,activeType:ii,onSelect:_=>{Lr(ii===_?null:_)},isDarkMode:mo,sectionCount:me?.sections.length??0,onDetectSections:()=>{let _=iv(),m=me?.sections??[],w=new Set(m.map(T=>T.selector)),M=_.filter(T=>!w.has(T.selector)),$=[...m,...M],I=[...me?.originalOrder??[],...M.map(T=>T.id)];po({sections:$,originalOrder:I,detectedAt:Date.now()})},placementCount:Be.length,onClearPlacements:()=>{Ds(Be,me)},blankCanvas:xt,onBlankCanvasChange:_=>{let m={sections:[],originalOrder:[],detectedAt:Date.now()};_?(Ac.current={rearrange:me,placements:Be},po(Nr.current.rearrange||m),Po(Nr.current.placements),Lr(null)):(Nr.current={rearrange:me,placements:Be},po(Ac.current.rearrange||m),Po(Ac.current.placements)),_f(_)},wireframePurpose:nn,onWireframePurposeChange:bs,Tooltip:ei,onDragStart:(_,m)=>{m.preventDefault();let w=oe[_],M=null,$=!1,I=m.clientX,T=m.clientY,fe=m.target.closest("[data-feedback-toolbar]")?.getBoundingClientRect().top??window.innerHeight,ye=xe=>{let $e=xe.clientX-I,Ae=xe.clientY-T;if(!$&&(Math.abs($e)>4||Math.abs(Ae)>4)&&($=!0,M=document.createElement("div"),M.className=`${B.dragPreview}${xt?` ${B.dragPreviewWireframe}`:""}`,Dt.current?.appendChild(M)),!M)return;let _e=Math.max(0,fe-xe.clientY),ve=Math.min(1,_e/180),Me=1-Math.pow(1-ve,2),Xe=28,kt=20,un=Math.min(140,w.width*.18),Le=Math.min(90,w.height*.18),ke=Xe+(un-Xe)*Me,nt=kt+(Le-kt)*Me;M.style.width=`${ke}px`,M.style.height=`${nt}px`,M.style.left=`${xe.clientX-ke/2}px`,M.style.top=`${xe.clientY-nt/2}px`,M.style.opacity=`${.5+.5*Me}`,M.textContent=Me>.25?_:""},ge=xe=>{if(window.removeEventListener("mousemove",ye),window.removeEventListener("mouseup",ge),M&&M.remove(),$){let $e=w.width,Ae=w.height,_e=window.scrollY,ve=Math.max(0,xe.clientX-$e/2),Me=Math.max(0,xe.clientY+_e-Ae/2),Xe={id:`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type:_,x:ve,y:Me,width:$e,height:Ae,scrollY:_e,timestamp:Date.now()};Po(kt=>[...kt,Xe]),Lr(null),ol.current=new Set,mf(kt=>kt+1)}};window.addEventListener("mousemove",ye),window.addEventListener("mouseup",ge)}}),(0,U.jsx)(fw,{settings:tt,onSettingsChange:o1,isDarkMode:mo,onToggleTheme:r1,isDevMode:Lf,connectionStatus:Rr,endpoint:S,onExited:l1,isOpen:z&&tn,toolbarNearBottom:!!Rt&&Rt.y<230,settingsPage:Vg,onSettingsPageChange:df,onHideToolbar:s1})]})}),(Ve||Mr)&&(0,U.jsx)("div",{className:`${B.blankCanvas} ${ff?B.visible:""} ${Gg?B.gridActive:""}`,style:{"--canvas-opacity":hf},"data-feedback-toolbar":!0}),Ve&&xt&&ff&&(0,U.jsxs)("div",{className:B.wireframeNotice,"data-feedback-toolbar":!0,children:[(0,U.jsxs)("div",{className:B.wireframeOpacityRow,children:[(0,U.jsx)("span",{className:B.wireframeOpacityLabel,children:"Toggle Opacity"}),(0,U.jsx)("input",{type:"range",className:B.wireframeOpacitySlider,min:0,max:1,step:.01,value:hf,onChange:_=>Xg(Number(_.target.value))})]}),(0,U.jsxs)("div",{className:B.wireframeNoticeTitleRow,children:[(0,U.jsx)("span",{className:B.wireframeNoticeTitle,children:"Wireframe Mode"}),(0,U.jsx)("span",{className:B.wireframeNoticeDivider}),(0,U.jsx)("button",{className:B.wireframeStartOver,onClick:()=>{Ds(Be,me),Nr.current={rearrange:null,placements:[]},bs(""),xc(e)},children:"Start Over"})]}),"Drag components onto the canvas.",(0,U.jsx)("br",{}),"Copied output will only include the wireframed layout."]}),(Ve||Mr)&&(0,U.jsx)(qx,{placements:Be,onChange:Po,activeComponent:Mr?null:ii,onActiveComponentChange:Lr,isDarkMode:mo,exiting:Mr,onInteractionChange:qg,passthrough:!ii,extraSnapRects:me?.sections.map(_=>_.currentRect),deselectSignal:Kg,clearingPlacements:li,wireframe:xt,onSelectionChange:(_,m)=>{ol.current=_,m||(ks.current=new Set,Zg(w=>w+1))},onDragMove:(_,m)=>{let w=ks.current;if(!(!w.size||!me)){if(!Zn.current){Zn.current=new Map;for(let M of me.sections)w.has(M.id)&&Zn.current.set(M.id,{x:M.currentRect.x,y:M.currentRect.y})}for(let M of me.sections){if(!w.has(M.id)||!Zn.current.get(M.id))continue;let I=Dt.current?.querySelector(`[data-rearrange-section="${M.id}"]`);I&&(I.style.transform=`translate(${_}px, ${m}px)`)}}},onDragEnd:(_,m,w)=>{let M=ks.current,$=Zn.current;if(Zn.current=null,!(!M.size||!me||!$)){for(let I of M){let T=Dt.current?.querySelector(`[data-rearrange-section="${I}"]`);T&&(T.style.transform="")}w&&po(I=>I&&{...I,sections:I.sections.map(T=>{let G=$.get(T.id);return G?{...T,currentRect:{...T.currentRect,x:Math.max(0,G.x+_),y:Math.max(0,G.y+m)}}:T})})}}}),(Ve||Mr)&&me&&(0,U.jsx)(av,{rearrangeState:me,onChange:po,isDarkMode:mo,exiting:Mr,blankCanvas:xt,extraSnapRects:Be.map(_=>({x:_.x,y:_.y,width:_.width,height:_.height})),clearing:me===si,deselectSignal:Jg,onSelectionChange:(_,m)=>{ks.current=_,m||(ol.current=new Set,mf(w=>w+1))},onDragMove:(_,m)=>{let w=ol.current;if(w.size){if(!Zn.current){Zn.current=new Map;for(let M of Be)w.has(M.id)&&Zn.current.set(M.id,{x:M.x,y:M.y})}for(let M of w){let $=Dt.current?.querySelector(`[data-design-placement="${M}"]`);$&&($.style.transform=`translate(${_}px, ${m}px)`)}}},onDragEnd:(_,m,w)=>{let M=ol.current,$=Zn.current;if(Zn.current=null,!(!M.size||!$)){for(let I of M){let T=Dt.current?.querySelector(`[data-design-placement="${I}"]`);T&&(T.style.transform="")}w&&Po(I=>I.map(T=>{let G=$.get(T.id);return G?{...T,x:Math.max(0,G.x+_),y:Math.max(0,G.y+m)}:T}))}}}),(0,U.jsx)("canvas",{ref:Yc,className:`${A.drawCanvas} ${On?A.active:""}`,"aria-hidden":"true",style:{opacity:Ns?1:0,transition:"opacity 0.15s ease"},"data-feedback-toolbar":!0}),(0,U.jsx)("div",{className:A.markersLayer,"data-feedback-toolbar":!0,children:Af.filter(({annotation:_})=>!_.isFixed).map(({annotation:_,index:m,pending:w},M,$)=>(0,U.jsx)(ig,{annotation:_,pending:w,globalIndex:m,layerIndex:M,layerSize:$.length,isExiting:w?An:Se,isClearing:Te.current.has(_.id),isAnimated:Tr.current.has(_.id),isNew:to.current===_.id,onEnterComplete:Rf,isHovered:!Se&&We===_.id,isRemoving:Ko.has(_.id),onRemoveComplete:Jc,isEditingAny:!!se,renumberFrom:et,markerClickBehavior:tt.markerClickBehavior,onHoverEnter:Ff,onHoverLeave:Wf,onClick:jf,onContextMenu:Ts},Es.current.get(_.id)??_.id))}),(0,U.jsx)("div",{className:A.fixedMarkersLayer,"data-feedback-toolbar":!0,children:Af.filter(({annotation:_})=>_.isFixed).map(({annotation:_,index:m,pending:w},M,$)=>(0,U.jsx)(ig,{annotation:_,pending:w,globalIndex:m,layerIndex:M,layerSize:$.length,isExiting:w?An:Se,isClearing:Te.current.has(_.id),isAnimated:Tr.current.has(_.id),isNew:to.current===_.id,onEnterComplete:Rf,isHovered:!Se&&We===_.id,isRemoving:Ko.has(_.id),onRemoveComplete:Jc,isEditingAny:!!se,renumberFrom:et,markerClickBehavior:tt.markerClickBehavior,onHoverEnter:Ff,onHoverLeave:Wf,onClick:jf,onContextMenu:Ts},Es.current.get(_.id)??_.id))}),z&&Je&&!H&&!se&&!sf&&!Bo&&(0,U.jsx)(hw,{x:Qe.x,y:Qe.y,elementName:Je.elementName,reactComponents:Je.reactComponents}),z&&(0,U.jsxs)("div",{className:A.overlay,"data-feedback-toolbar":!0,style:H||se?{zIndex:"inherit"}:void 0,children:[Je?.rect&&!H&&!sf&&!Bo&&(0,U.jsx)("div",{className:`${A.hoverHighlight} ${A.enter}`,style:{left:Je.rect.left,top:Je.rect.top,width:Je.rect.width,height:Je.rect.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)",...Je.isPiercing?{borderStyle:"dashed"}:{}}}),xn.filter(_=>_.element.isConnected).map((_,m)=>{let w=At(_.element),M=xn.length>1;return(0,U.jsx)("div",{className:M?A.multiSelectOutline:A.singleSelectOutline,style:{position:"fixed",left:w.left,top:w.top,width:w.width,height:w.height,...M?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}},m)}),We&&!H&&(()=>{let _=Re.find($=>$.id===We);if(!_?.boundingBox)return null;if(_.elementBoundingBoxes?.length)return ct.length>0?ct.filter($=>$.isConnected).map(($,I)=>{let T=At($);return(0,U.jsx)("div",{className:`${A.multiSelectOutline} ${A.enter}`,style:{left:T.left,top:T.top,width:T.width,height:T.height}},`hover-outline-live-${I}`)}):_.elementBoundingBoxes.map(($,I)=>(0,U.jsx)("div",{className:`${A.multiSelectOutline} ${A.enter}`,style:{left:$.x,top:$.y-Sr,width:$.width,height:$.height}},`hover-outline-${I}`));let m=yt&&yt.isConnected?At(yt):null,w=m?{x:m.left,y:m.top,width:m.width,height:m.height}:{x:_.boundingBox.x,y:_.isFixed?_.boundingBox.y:_.boundingBox.y-Sr,width:_.boundingBox.width,height:_.boundingBox.height},M=_.isMultiSelect;return(0,U.jsx)("div",{className:`${M?A.multiSelectOutline:A.singleSelectOutline} ${A.enter}`,style:{left:w.x,top:w.y,width:w.width,height:w.height,...M?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}})})(),H&&(0,U.jsxs)(U.Fragment,{children:[H.multiSelectElements?.length?H.multiSelectElements.filter(_=>_.isConnected).map((_,m)=>{let w=At(_);return(0,U.jsx)("div",{className:`${A.multiSelectOutline} ${An?A.exit:A.enter}`,style:{left:w.left,top:w.top,width:w.width,height:w.height}},`pending-multi-${m}`)}):H.targetElement&&H.targetElement.isConnected?(()=>{let _=At(H.targetElement);return(0,U.jsx)("div",{className:`${A.singleSelectOutline} ${An?A.exit:A.enter}`,style:{left:_.left,top:_.top,width:_.width,height:_.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}})})():H.boundingBox&&(0,U.jsx)("div",{className:`${H.isMultiSelect?A.multiSelectOutline:A.singleSelectOutline} ${An?A.exit:A.enter}`,style:{left:H.boundingBox.x,top:H.boundingBox.y-Sr,width:H.boundingBox.width,height:H.boundingBox.height,...H.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}),(()=>{let _=zs(H)??H,m=_.x,w=_.isFixed?_.y:_.y-Sr;return(0,U.jsx)(U.Fragment,{children:(0,U.jsx)(Z_,{ref:Kc,element:H.element,selectedText:H.selectedText,allowEmpty:typeof s=="object"&&!!H.attributes?.[s.attribute],onOpenSource:a&&H.sourceFile?()=>a(H.sourceFile):void 0,computedStyles:H.computedStylesObj,placeholder:typeof s=="object"&&H.attributes?.[s.attribute]?"Add a note (optional)":H.element==="Area selection"?"What should change in this area?":H.isMultiSelect?"Feedback for this group of elements...":"What should change?",onSubmit:a1,onExitComplete:od,onCancel:nd,isExiting:An,lightMode:!mo,accentColor:H.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:{left:Math.max(160,Math.min(window.innerWidth-160,m/100*window.innerWidth)),...w>window.innerHeight-290?{bottom:window.innerHeight-w+20}:{top:w+20}}},H.id)})})()]}),se&&(0,U.jsx)(U.Fragment,{children:se.elementBoundingBoxes?.length?el.length>0?el.filter(_=>_.isConnected).map((_,m)=>{let w=At(_);return(0,U.jsx)("div",{className:`${A.multiSelectOutline} ${A.enter}`,style:{left:w.left,top:w.top,width:w.width,height:w.height}},`edit-multi-live-${m}`)}):se.elementBoundingBoxes.map((_,m)=>(0,U.jsx)("div",{className:`${A.multiSelectOutline} ${A.enter}`,style:{left:_.x,top:_.y-Sr,width:_.width,height:_.height}},`edit-multi-${m}`)):(()=>{let _=Jn&&Jn.isConnected?At(Jn):null,m=_?{x:_.left,y:_.top,width:_.width,height:_.height}:se.boundingBox?{x:se.boundingBox.x,y:se.isFixed?se.boundingBox.y:se.boundingBox.y-Sr,width:se.boundingBox.width,height:se.boundingBox.height}:null;return m?(0,U.jsx)("div",{className:`${se.isMultiSelect?A.multiSelectOutline:A.singleSelectOutline} ${A.enter}`,style:{left:m.x,top:m.y,width:m.width,height:m.height,...se.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}):null})()}),Bo&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("div",{ref:sl,className:A.dragSelection}),(0,U.jsx)("div",{ref:_i,className:A.highlightsContainer})]})]}),(0,U.jsx)(lw,{ref:Ls,annotation:Wn?zs(Wn)??se:null,editing:!!se,exiting:Pr,restorePreview:ho,scrollY:Sr,lightMode:!mo,onExited:u1,editorProps:Wn?{element:Wn.element,selectedText:Wn.selectedText,allowEmpty:typeof s=="object"&&!!Wn.attributes?.[s.attribute],onOpenSource:a&&Wn.sourceFile?()=>a(Wn.sourceFile):void 0,computedStyles:c2(Wn.computedStyles),placeholder:"Edit your feedback...",initialValue:Wn.comment,submitLabel:"Save",onSubmit:c1,onCancel:d1,onDelete:()=>rd(Wn.id),accentColor:Wn.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)"}:void 0})]})]})}var Yg=Ee(Pt()),ri=typeof UNPEEL_BRIDGE=="object"&&UNPEEL_BRIDGE?UNPEEL_BRIDGE:null,vw=window.fetch.bind(window),ww=ri?`http://127.0.0.1:${ri.port}/browser-bridge`:null;async function jg(e,t){let n=await vw(`${ww}${e}`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({token:ri.token,...t})}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error||`Unpeel answered ${n.status}`);return o}var bw=`
:host { all: initial; }
.backdrop { position: fixed; inset: 0; z-index: 2147483647; background: rgba(0,0,0,.28);
  display: flex; align-items: center; justify-content: center;
  font: 13px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; }
.panel { width: min(440px, calc(100vw - 32px)); max-height: min(520px, calc(100vh - 64px));
  display: flex; flex-direction: column; background: #1c1c1e; color: #f2f2f7;
  border: 1px solid rgba(255,255,255,.1); border-radius: 14px;
  box-shadow: 0 24px 64px rgba(0,0,0,.45); overflow: hidden; }
@media (prefers-color-scheme: light) {
  .panel { background: #fff; color: #1c1c1e; border-color: rgba(0,0,0,.1); }
  .row:hover, .row.active { background: rgba(0,0,0,.06) !important; }
  .search { background: rgba(0,0,0,.05) !important; }
}
.head { padding: 14px 16px 10px; font-weight: 600; font-size: 14px; }
.sub { font-weight: 400; opacity: .6; font-size: 12px; margin-top: 2px; }
.search { margin: 0 12px 8px; padding: 8px 10px; border-radius: 8px; border: 0; outline: none;
  background: rgba(255,255,255,.07); color: inherit; font: inherit; }
.list { overflow-y: auto; padding: 4px 6px 8px; }
.section { padding: 8px 10px 4px; font-size: 11px; font-weight: 600; opacity: .5;
  text-transform: uppercase; letter-spacing: .04em; }
.row { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 8px;
  cursor: pointer; }
.row:hover, .row.active { background: rgba(255,255,255,.08); }
.title { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.meta { font-size: 11.5px; opacity: .55; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.empty { padding: 24px 16px; text-align: center; opacity: .6; }
.foot { padding: 8px 16px 12px; font-size: 11.5px; opacity: .5; }
`;function Pn(e,t,n){let o=document.createElement(e);return t&&(o.className=t),n!=null&&(o.textContent=n),o}function kw(e){return new Promise((t,n)=>{let o=document.createElement("unpeel-session-picker"),r=o.attachShadow({mode:"closed"}),i=Pn("style");i.textContent=bw;let l=Pn("div","backdrop"),s=Pn("div","panel"),a=Pn("div","head","Send to session");a.appendChild(Pn("div","sub","Pasted into the session's prompt \u2014 press Enter there to send."));let u=Pn("input","search");u.placeholder="Search open sessions";let p=Pn("div","list"),f=Pn("div","foot","\u2191\u2193 to move \xB7 Enter to paste \xB7 Esc to cancel");s.append(a,u,p,f),l.appendChild(s),r.append(i,l);let g=[],C=0,b=()=>o.remove(),N=h=>{b(),t(h)},E=()=>{b(),n(new Error("cancelled"))};function y(){let h=u.value.trim().toLowerCase(),S=V=>!h||[V.title,V.project,V.workspace,V.agent].some(z=>z&&z.toLowerCase().includes(h)),j=e.filter(V=>V.inThisProject&&S(V)),Q=e.filter(V=>!V.inThisProject&&S(V));if(g=[...j,...Q],C=Math.min(C,Math.max(g.length-1,0)),p.replaceChildren(),!g.length){p.appendChild(Pn("div","empty",e.length?"No matching sessions":"No open sessions"));return}let D=(V,z,K)=>{z.length&&(p.appendChild(Pn("div","section",V)),z.forEach((Z,J)=>{let de=Pn("div","row"+(K+J===C?" active":""));de.appendChild(Pn("div","title",Z.title)),de.appendChild(Pn("div","meta",[Z.agent,Z.project,Z.workspace].filter(Boolean).join(" \xB7 "))),de.addEventListener("mouseenter",()=>{C=K+J,v()}),de.addEventListener("click",()=>N(Z)),p.appendChild(de)}))};D(ri?.projectName?`In ${ri.projectName}`:"This project",j,0),D(j.length?"Other sessions":"Open sessions",Q,j.length)}function v(){p.querySelectorAll(".row").forEach((h,S)=>h.classList.toggle("active",S===C)),p.querySelectorAll(".row")[C]?.scrollIntoView({block:"nearest"})}u.addEventListener("input",()=>{C=0,y()}),r.addEventListener("keydown",h=>{h.stopPropagation(),h.key==="Escape"?E():h.key==="ArrowDown"?(C=Math.min(C+1,g.length-1),v(),h.preventDefault()):h.key==="ArrowUp"?(C=Math.max(C-1,0),v(),h.preventDefault()):h.key==="Enter"&&g[C]&&(N(g[C]),h.preventDefault())}),l.addEventListener("mousedown",h=>{h.target===l&&E()}),document.documentElement.appendChild(o),y(),u.focus()})}async function Cw(e){if(!ri)throw new Error("Unpeel bridge unavailable");let{sessions:t=[]}=await jg("/sessions",{projectId:ri.projectId}),n=await kw(t);await jg("/send",{sessionId:n.id,home:n.home,text:e})}function Hg(){if(window.top!==window||window.__unpeelAgentationMounted)return;window.__unpeelAgentationMounted=!0;let e=document.createElement("div");e.setAttribute("data-unpeel-agentation",""),document.documentElement.appendChild(e),(0,Ug.createRoot)(e).render((0,Yg.jsx)(Wg,{onSubmit:t=>Cw(t)}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Hg,{once:!0}):Hg();})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

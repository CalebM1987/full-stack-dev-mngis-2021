(function(e){function t(t){for(var r,a,u=t[0],i=t[1],l=t[2],s=0,d=[];s<u.length;s++)a=u[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);b&&b(t);while(d.length)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},c=[];function a(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b902b271","chunk-0bb35da6":"17830496","chunk-2d0abf66":"30143665"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var c,i=document.createElement("script");i.charset="utf-8",i.timeout=120,u.nc&&i.setAttribute("nonce",u.nc),i.src=a(e);var l=new Error;c=function(t){i.onerror=i.onload=null,clearTimeout(s);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",l.name="ChunkLoadError",l.type=r,l.request=c,n[1](l)}o[e]=void 0}};var s=setTimeout((function(){c({type:"timeout",target:i})}),12e4);i.onerror=i.onload=c,document.head.appendChild(i)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="../brewery/static/app/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var b=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0e21":function(e,t,n){},"0e9d":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return d}));var r=n("1da1"),o=(n("96cf"),n("caad"),n("2532"),n("ac1f"),n("1276"),n("99af"),n("bc3a")),c=n.n(o),a=window.location.href.includes("/brewery")?window.location.href.split("/brewery")[0]:"http://localhost:5000",u=c.a.create({baseURL:a});function i(e){return l.apply(this,arguments)}function l(){return l=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.get("/brewery/breweries/geojson",{params:t});case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function s(e){return b.apply(this,arguments)}function b(){return b=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.get("/brewery/breweries/".concat(t.properties.id,"/beers"));case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function d(e){return e.photo_name?"".concat(a,"/brewery/beers/").concat(e.id,"/photo"):null}},"2d79":function(e,t,n){"use strict";n("3873")},3873:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o=Object(r["i"])(" Brewery Finder ");function c(e,t,n,c,a,u){var i=Object(r["E"])("q-btn"),l=Object(r["E"])("q-toolbar-title"),s=Object(r["E"])("q-toolbar"),b=Object(r["E"])("q-header"),d=Object(r["E"])("sidebar"),f=Object(r["E"])("q-drawer"),j=Object(r["E"])("Home"),p=Object(r["E"])("q-page-container"),O=Object(r["E"])("q-layout");return Object(r["w"])(),Object(r["e"])(O,{view:"lHh Lpr lFf"},{default:Object(r["O"])((function(){return[Object(r["j"])(b,{elevated:""},{default:Object(r["O"])((function(){return[Object(r["j"])(s,null,{default:Object(r["O"])((function(){return[Object(r["j"])(i,{flat:"",dense:"",round:"",onClick:t[0]||(t[0]=function(e){return c.leftDrawerOpen=!c.leftDrawerOpen}),"aria-label":"Menu",icon:"menu"}),Object(r["j"])(l,null,{default:Object(r["O"])((function(){return[o]})),_:1}),Object(r["h"])("div",null,"Quasar v"+Object(r["H"])(e.$q.version),1)]})),_:1})]})),_:1}),Object(r["j"])(f,{modelValue:c.leftDrawerOpen,"onUpdate:modelValue":t[1]||(t[1]=function(e){return c.leftDrawerOpen=e}),"show-if-above":"",bordered:"",class:"bg-grey-2"},{default:Object(r["O"])((function(){return[Object(r["j"])(d)]})),_:1},8,["modelValue"]),Object(r["j"])(p,null,{default:Object(r["O"])((function(){return[Object(r["j"])(j)]})),_:1})]})),_:1})}var a={class:"home"};function u(e,t,n,o,c,u){var i=Object(r["E"])("map-view");return Object(r["w"])(),Object(r["g"])("div",a,[Object(r["j"])(i)])}var i={class:"map-wrapper fill"};function l(e,t,n,o,c,a){var u=Object(r["E"])("mapbox-geocoder-control"),l=Object(r["E"])("mapbox-geolocate-control"),s=Object(r["E"])("mapbox-map");return Object(r["w"])(),Object(r["g"])("div",i,[Object(r["j"])(s,{ref:"mapbox",mapStyle:"streets-v11",zoom:13,accessToken:e.accessToken,center:[-93.121829338,45.03720332734],"auto-resize":!0,onLoaded:e.onMapLoad},{default:Object(r["O"])((function(){return[Object(r["j"])(u,{position:"top-right"}),Object(r["j"])(l)]})),_:1},8,["accessToken","center","onLoaded"])])}var s=n("1da1"),b=(n("96cf"),n("da44")),d=(n("d81d"),n("0e9d"));function f(e){return j.apply(this,arguments)}function j(){return j=Object(s["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["b"])();case 2:n=e.sent,window.map=t,t.loadImage("./img/beer.png",(function(e,r){if(e)throw e;t.addImage("beer",r),t.addSource("breweries",{type:"geojson",data:n}),t.addLayer({id:"breweries-layer",source:"breweries",type:"symbol",layout:{"icon-image":"beer","icon-size":.1}})}));case 5:case"end":return e.stop()}}),e)}))),j.apply(this,arguments)}var p=n("1344"),O=Object(p["a"])();function m(){var e=Object(r["B"])(null),t=Object(r["o"])("vmb_map",null);function n(t){var n=t.target;b["e"].value=-1,console.log("click: ",t),e.value=t.lngLat;var r=5,o=[[t.point.x-r,t.point.y-r],[t.point.x+r,t.point.y+r]],c=n.queryRenderedFeatures(o,{layers:["breweries-layer"]});console.log("feats?",c),b["d"].value=c,b["e"].value=0,b["a"].value=c.length?"feature":"menu"}var o=function(e){f(e),e.on("click",n),O.on("zoom-to-feature",(function(t){var n;console.log("zoom to feature event: ",t),e.flyTo({center:null===(n=t.geometry)||void 0===n?void 0:n.coordinates,zoom:19,curve:1,speed:1.2})})),e.on("mouseenter","detections",(function(){e.getCanvas().style.cursor="pointer"})),e.on("mouseleave","detections",(function(){e.getCanvas().style.cursor=""})),Object(r["N"])((function(){console.log("trigger map filter???")}))};return Object(r["u"])(Object(s["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,null===t||void 0===t?void 0:t.promise;case 2:n=e.sent,console.log("deferred map?",n),window.state={selectedFeature:b["c"],selection:b["d"],selectionIndex:b["e"],layoutMode:b["a"]};case 5:case"end":return e.stop()}}),e)})))),{vmb_map:t,selectedFeature:b["c"],selectionIndex:b["e"],selection:b["d"],clickPoint:e,onMapLoad:o,accessToken:"pk.eyJ1IjoiY3JtYWNrZXkiLCJhIjoiY2p6NzhiaHIzMHQ3MDNnbmw4bTFwazB6ciJ9.T5gGbMyK6ShMlnzA3Nt4Ag"}}var v=n("e657"),w=Object(r["l"])({components:{MapboxMap:v["c"],MapboxGeolocateControl:v["b"],MapboxGeocoderControl:v["a"]},setup:function(){var e=m(),t=e.vmb_map,n=e.selection,r=e.selectionIndex,o=e.selectedFeature,c=e.clickPoint,a=e.onMapLoad,u=e.accessToken;return{vmb_map:t,selection:n,selectionIndex:r,selectedFeature:o,clickPoint:c,onMapLoad:a,accessToken:u}},mounted:function(){console.log("mounted map view: ",this)}}),g=(n("2d79"),n("6b0d")),h=n.n(g);const y=h()(w,[["render",l]]);var k=y,_=Object(r["l"])({name:"Home",components:{MapView:k}});const x=h()(_,[["render",u]]);var M=x,E={class:"drawer-content"};function q(e,t,n,o,c,a){var u=Object(r["E"])("brewery-info"),i=Object(r["E"])("sidebar-menu");return Object(r["w"])(),Object(r["g"])("div",E,[e.selectedFeature&&"feature"===e.layoutMode?(Object(r["w"])(),Object(r["e"])(u,{key:0})):(Object(r["w"])(),Object(r["e"])(i,{key:1}))])}n("d3b7"),n("3ca3"),n("ddb0");var L=Object(r["i"])("Menu"),T=Object(r["i"])("Search"),I=Object(r["i"])("search for breweries"),F=Object(r["i"])("Beers"),Q=Object(r["i"])("find beers"),P=Object(r["i"])("Brewery Info"),S=Object(r["i"])("see brewery information");function B(e,t,n,o,c,a){var u=Object(r["E"])("q-item-label"),i=Object(r["E"])("q-icon"),l=Object(r["E"])("q-item-section"),s=Object(r["E"])("q-item"),b=Object(r["E"])("q-list");return Object(r["w"])(),Object(r["e"])(b,null,{default:Object(r["O"])((function(){return[Object(r["j"])(u,{header:""},{default:Object(r["O"])((function(){return[L]})),_:1}),Object(r["j"])(s,{clickable:"",tag:"a",target:"_blank",href:"https://quasar.dev"},{default:Object(r["O"])((function(){return[Object(r["j"])(l,{avatar:""},{default:Object(r["O"])((function(){return[Object(r["j"])(i,{name:"search"})]})),_:1}),Object(r["j"])(l,null,{default:Object(r["O"])((function(){return[Object(r["j"])(u,null,{default:Object(r["O"])((function(){return[T]})),_:1}),Object(r["j"])(u,{caption:""},{default:Object(r["O"])((function(){return[I]})),_:1})]})),_:1})]})),_:1}),Object(r["j"])(s,{clickable:"",tag:"a",target:"_blank",href:"https://github.com/quasarframework/"},{default:Object(r["O"])((function(){return[Object(r["j"])(l,{avatar:""},{default:Object(r["O"])((function(){return[Object(r["j"])(i,{name:"liquor"})]})),_:1}),Object(r["j"])(l,null,{default:Object(r["O"])((function(){return[Object(r["j"])(u,null,{default:Object(r["O"])((function(){return[F]})),_:1}),Object(r["j"])(u,{caption:""},{default:Object(r["O"])((function(){return[Q]})),_:1})]})),_:1})]})),_:1}),e.selectedFeature?(Object(r["w"])(),Object(r["e"])(s,{key:0,clickable:"",tag:"a",onClick:t[0]||(t[0]=function(t){return e.layoutMode="feature"})},{default:Object(r["O"])((function(){return[Object(r["j"])(l,{avatar:""},{default:Object(r["O"])((function(){return[Object(r["j"])(i,{name:"place"})]})),_:1}),Object(r["j"])(l,null,{default:Object(r["O"])((function(){return[Object(r["j"])(u,null,{default:Object(r["O"])((function(){return[P]})),_:1}),Object(r["j"])(u,{caption:""},{default:Object(r["O"])((function(){return[S]})),_:1})]})),_:1})]})),_:1})):Object(r["f"])("",!0)]})),_:1})}var C=Object(r["l"])({setup:function(){return{selectedFeature:b["c"],layoutMode:b["a"]}}}),z=n("1c1c"),R=n("0170"),H=n("66e5"),D=n("4074"),N=n("0016"),A=n("93dc"),J=n.n(A);const V=h()(C,[["render",B]]);var G=V;J()(C,"components",{QList:z["a"],QItemLabel:R["a"],QItem:H["a"],QItemSection:D["a"],QIcon:N["a"]});var Y=Object(r["l"])({name:"sidebar",components:{SidebarMenu:G,BreweryInfo:Object(r["k"])((function(){return n.e("chunk-0bb35da6").then(n.bind(null,"ca2b"))}))},setup:function(){return{layoutMode:b["a"],selectedFeature:b["c"]}}});const U=h()(Y,[["render",q]]);var K=U,W={name:"LayoutDefault",components:{Home:M,Sidebar:K},setup:function(){return{leftDrawerOpen:b["b"]}}},X=n("4d5a"),Z=n("e359"),$=n("65c6"),ee=n("9c40"),te=n("6ac5"),ne=n("9404"),re=n("09e3");const oe=h()(W,[["render",c]]);var ce=oe;J()(W,"components",{QLayout:X["a"],QHeader:Z["a"],QToolbar:$["a"],QBtn:ee["a"],QToolbarTitle:te["a"],QDrawer:ne["a"],QPageContainer:re["a"]});var ae=n("9483");Object(ae["a"])("".concat("../brewery/static/app/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ue=n("6c02"),ie=[{path:"/",name:"Home",component:M},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],le=Object(ue["a"])({history:Object(ue["b"])("../brewery/static/app/"),routes:ie}),se=le,be=n("5502"),de=Object(be["a"])({state:{},mutations:{},actions:{},modules:{}}),fe=n("b05d"),je=(n("0e21"),n("7d6e"),n("e54f"),{config:{},plugins:{}});Object(r["d"])(ce).use(fe["a"],je).use(de).use(se).mount("#app")},da44:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return i}));var r=n("7a23"),o=Object(r["B"])([]),c=Object(r["B"])(0),a=Object(r["B"])(!0),u=Object(r["B"])("menu"),i=Object(r["c"])((function(){return o.value.length?o.value[c.value]:null}))}});
//# sourceMappingURL=app.85e00f9f.js.map
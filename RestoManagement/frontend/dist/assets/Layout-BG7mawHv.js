import{r as j,l as g,h as k,p as N,j as e,A as v,k as i,L as w,N as M}from"./index-Cfij_oVy.js";import{L as d,B as c,U as h}from"./utensils-crossed-DPsMaxhx.js";import{c as a}from"./createLucideIcon-F7rv2POO.js";import{U as L}from"./user-DkobsgaT.js";/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=a("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=a("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=a("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=a("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=a("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=a("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),D=({children:m})=>{var l;const[n,r]=j.useState(!0),p=g(),{user:s,logout:y}=k(),{cart:t}=N(),b=(s==null?void 0:s.role)==="CUSTOMER"?[{name:"Dashboard",path:"/dashboard",icon:d},{name:"Book a Room",path:"/rooms",icon:c},{name:"Order Food",path:"/menu",icon:h},{name:"My Orders",path:"/orders",icon:x}]:[{name:"Dashboard",path:"/dashboard",icon:d},{name:"Rooms",path:"/rooms",icon:c},{name:"Menu",path:"/menu",icon:h},{name:"Orders",path:"/orders",icon:x},{name:"Bookings",path:"/bookings",icon:C}],u=()=>{y()};return e.jsxs("div",{className:"flex h-screen bg-slate-50 overflow-hidden",children:[e.jsx(v,{mode:"wait",children:n&&e.jsxs(i.aside,{initial:{x:-300},animate:{x:0},exit:{x:-300},className:"w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm",children:[e.jsxs("div",{className:"p-6 border-b border-slate-100 flex items-center justify-between",children:[e.jsx(w,{to:"/",className:"text-xl font-bold text-primary-600 tracking-tight hover:text-primary-700 transition-colors",children:"HotelResto"}),e.jsx("button",{onClick:()=>r(!1),className:"lg:hidden text-slate-500",children:e.jsx(S,{className:"w-6 h-6"})})]}),e.jsx("nav",{className:"flex-1 p-4 space-y-2",children:b.map(o=>e.jsxs(M,{to:o.path,className:({isActive:f})=>`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${f?"bg-primary-50 text-primary-600 font-semibold shadow-sm":"text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                  `,children:[e.jsx(o.icon,{className:"w-5 h-5"}),e.jsx("span",{children:o.name})]},o.path))}),e.jsxs("div",{className:"p-4 border-t border-slate-100",children:[e.jsxs("div",{className:"flex items-center space-x-3 px-4 py-3 mb-2",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold",children:((l=s==null?void 0:s.username)==null?void 0:l.charAt(0).toUpperCase())||e.jsx(L,{})}),e.jsxs("div",{className:"flex-1 overflow-hidden",children:[e.jsx("p",{className:"text-sm font-semibold text-slate-900 truncate",children:s==null?void 0:s.username}),e.jsx("p",{className:"text-xs text-slate-500",children:s==null?void 0:s.role})]})]}),e.jsxs("button",{onClick:u,className:"w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors",children:[e.jsx(O,{className:"w-5 h-5"}),e.jsx("span",{className:"font-medium",children:"Logout"})]})]})]})}),e.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[e.jsxs("header",{className:"h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between lg:justify-end shadow-sm",children:[!n&&e.jsx("button",{onClick:()=>r(!0),className:"p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors",children:e.jsx(H,{className:"w-6 h-6"})}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("button",{onClick:()=>p("/menu"),title:"Open cart and menu",className:"relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors",children:[e.jsx(R,{className:"w-6 h-6"}),(t==null?void 0:t.length)>0&&e.jsx("span",{className:"absolute top-0 right-0 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white",children:t==null?void 0:t.length})]}),e.jsx("span",{className:"text-sm text-slate-500 font-medium",children:(s==null?void 0:s.role)==="CUSTOMER"?"Hotel & Resto Guest Portal":"Hotel & Resto Admin Panel"})]})]}),e.jsx("main",{className:"flex-1 overflow-y-auto p-6 lg:p-10",children:e.jsx(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3},children:m})})]})]})};export{D as L,R as S};

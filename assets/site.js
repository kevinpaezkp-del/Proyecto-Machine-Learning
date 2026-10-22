
"use strict";
const S = {
  models:[
    ["Random Forest","Ensamble · bagging",4.878414,5.975631,0.157900,12.355408,0.269076],
    ["XGBoost","Ensamble · boosting",5.463859,5.990533,0.145075,12.961257,0.185465],
    ["HistGradientBoosting","Ensamble · boosting",5.600069,6.007974,0.072929,12.442780,0.256380],
    ["Ridge (regularización L2)","Regresión regularizada",5.960685,6.070847,0.101793,12.304629,0.274583],
    ["Regresión lineal","Regresión clásica",5.962753,6.094571,0.102028,12.345328,0.269409],
    ["Árbol de decisión ajustado","Árbol regularizado",5.915947,6.095465,0.045992,12.387236,0.263150],
    ["Referencia P50 histórica","Línea base",null,6.232975,0.061086,13.759972,0.085679],
    ["Red neuronal perceptrón multicapa (MLP)","Red neuronal",5.473192,6.291857,0.116908,12.683440,0.228111],
    ["Mediana constante","Línea base",null,6.924866,0.150760,15.114325,-0.104920],
    ["Árbol de decisión sin poda","Árbol sin regularizar",0.079662,7.686244,0.271851,16.028134,-0.256823]
  ],
  tests:[
    ["Random Forest","Modelo seleccionado",6.192420,146.498299,12.103648,.241275,46.813972],
    ["Referencia P50 histórica","Línea base",6.616064,175.285676,13.239550,.092184,53.484339],
    ["Mediana constante","Línea base",7.334524,219.191682,14.805124,-.135208,51.569600]
  ],
  spans:[
    ["≤ 3 días",9571,6682,3.654610,2.064361,3.599337,53.442691],
    ["4 a 7 días",7519,4977,3.103935,2.956444,2.050412,68.346855],
    ["8 a 14 días",6132,3115,4.755757,5.433627,.041836,42.808219],
    ["15 a 28 días",3617,1452,9.401262,11.509400,-5.568466,14.653027],
    ["> 28 días",1990,483,28.662235,37.084673,-23.979819,4.371859]
  ],
  days:[
    ["Día 0",9102,5.016328,5.115249],
    ["Días 1–3",14180,5.672130,5.886601],
    ["Días 7–14",5033,8.680465,10.010034],
    ["Días 30–60",514,17.009878,20.083658]
  ],
  gender:[["Mujeres",12998,4110,5.972995,6.330320],["Hombres",15831,4992,6.372579,6.850673]],
  severity:[[1,5635,2.251299],[2,8032,4.284199],[3,15162,8.668020]],
  dist:[["0–<2 días",1],["2–<5 días",30],["5–<10 días",52],["10–<20 días",43],["≥20 días",6]]
};
const q=(selector,root=document)=>root.querySelector(selector);
const qa=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const num=(value,digits=2)=>value==null?"—":Number(value).toLocaleString("es-CO",{minimumFractionDigits:digits,maximumFractionDigits:digits});
const el=(tag,classes,text)=>{const d=document.createElement(tag);if(classes)d.className=classes;if(text!==undefined)d.textContent=text;return d;};
let active=0,visibleRows=[],sortBy="idx",sortReverse=false;
const sections=qa("main .slide");
function navigate(index){
 active=Math.min(sections.length-1,Math.max(0,index));
 sections.forEach((s,i)=>s.classList.toggle("current",i===active));
 qa("#menu button").forEach((button,i)=>{button.classList.toggle("active",i===active);button.setAttribute("aria-current",i===active?"step":"false");});
 q("#sectionIndicator").textContent=String(active+1).padStart(2,"0")+" / 10 · "+sections[active].dataset.title;
 q("#currentCounter").textContent=(active+1)+" de 10";
 q("#progressBar").style.width=((active+1)/sections.length*100)+"%";
 q("#notes").classList.remove("open");q("#notes").textContent=sections[active].dataset.note||"";
 if(history.replaceState)history.replaceState(null,"","#"+(active+1));
 window.scrollTo(0,0);
}
qa("#menu button").forEach((button,i)=>button.addEventListener("click",()=>navigate(i)));
q("#prev").addEventListener("click",()=>navigate(active-1));
q("#next").addEventListener("click",()=>navigate(active+1));
q("#notesToggle").addEventListener("click",()=>q("#notes").classList.toggle("open"));
document.addEventListener("keydown",e=>{
 if(["INPUT","SELECT","TEXTAREA"].includes(document.activeElement?.tagName))return;
 if(["ArrowRight","PageDown"].includes(e.key)){e.preventDefault();navigate(active+1);}
 if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();navigate(active-1);}
});
qa(".tabrow button").forEach(button=>button.addEventListener("click",()=>{
 const group=button.closest(".tabrow");
 qa("button",group).forEach(x=>x.classList.toggle("selected",x===button));
 const target=button.dataset.target;
 qa(".model-tab").forEach(panel=>panel.classList.toggle("hide",panel.id!==target));
}));
const cv=q("#cvBody");
S.models.forEach((r,i)=>{
 const tr=el("tr",i===0?"winner":i===9?"loss":"");
 const delta=r[2]===null?null:r[3]-r[2];
 const cells=[r[0],r[1],num(r[2]),num(r[3]),"±"+num(r[4]),num(r[5]),num(r[6],3),num(delta)];
 cells.forEach((text,i)=>{const td=el("td",null,text);if(i===0&&r[0]==="Random Forest"){const strong=el("strong",null,r[0]);td.replaceChildren(strong);}tr.appendChild(td);});
 cv.appendChild(tr);
});
const test=q("#testBody");
S.tests.forEach((r,i)=>{
 const tr=el("tr",i===0?"winner":"");
 [r[0],r[1],num(r[2]),num(r[3]),num(r[4]),num(r[5],3),num(r[6],1)+" %"].forEach(t=>tr.appendChild(el("td",null,t)));
 test.appendChild(tr);
});
const span=q("#errorTable");
S.spans.forEach(r=>{
 const tr=el("tr",r[0]==="> 28 días"?"loss":"");
 [r[0],r[1].toLocaleString("es-CO"),r[2].toLocaleString("es-CO"),num(r[3]),num(r[4]),num(r[5]),num(r[6],1)+" %"].forEach(t=>tr.appendChild(el("td",null,t)));
 span.appendChild(tr);
});
const day=q("#dayTable");
S.days.forEach(r=>{const tr=el("tr");[r[0],r[1].toLocaleString("es-CO"),num(r[2]),num(r[3])].forEach(v=>tr.appendChild(el("td",null,v)));day.appendChild(tr);});
const gender=q("#genderTable");
S.gender.forEach(r=>{const tr=el("tr");[r[0],r[2].toLocaleString("es-CO"),num(r[3]),num(r[4])].forEach(v=>tr.appendChild(el("td",null,v)));gender.appendChild(tr);});
const sev=q("#sevTable");
S.severity.forEach(r=>{const tr=el("tr");[r[0],r[1].toLocaleString("es-CO"),num(r[2])].forEach(v=>tr.appendChild(el("td",null,v)));sev.appendChild(tr);});
q("#errBars").replaceChildren();
S.spans.forEach(row=>{
 const item=el("div","errorline"+(row[0]==="> 28 días"?" alert":""));
 item.appendChild(el("b",null,row[0]));
 const track=el("div","track");const fill=el("div","fill");fill.style.width=(100*row[3]/30).toFixed(1)+"%";track.appendChild(fill);item.appendChild(track);
 item.appendChild(el("b",null,num(row[3])+" d"));q("#errBars").appendChild(item);
});
const quant=q("#quantile");quant.replaceChildren();
[["Q1: 3d",25],["Mediana: 5d",25],["Q3: 10d",25],["P90: 19d",15],["P95: 28d",5],[">P95",5]].forEach(([label,width])=>{
 const piece=el("span",null,label);piece.style.width=width+"%";quant.appendChild(piece);
});
const dist=q("#distBins");
S.dist.forEach(([name,count])=>{
 const li=el("div","errorline");li.appendChild(el("b",null,name));
 const track=el("div","track");const fill=el("div","fill");fill.style.width=(count/52*100)+"%";track.appendChild(fill);li.appendChild(track);
 li.appendChild(el("b",null,count+" casos"));dist.appendChild(li);
});
function makeSamples(){
 const rest=[];
 rest.push(1.2);
 for(let i=0;i<30;i++)rest.push(2.0+2.8*((i+.5)/30));
 for(let i=0;i<52;i++)rest.push(5+4.8*Math.pow((i+.5)/52,2.55));
 for(let i=0;i<43;i++)rest.push(10+9.7*((i+.5)/43));
 for(let i=0;i<6;i++)rest.push(20+9*((i+.5)/6));
 const units=["Hospitalización general","Hospitalización adultos","Cirugía hospitalaria","Unidad de cuidado"];
 const snapshots=rest.map((remaining,i)=>{
   const pseudo=(i*37)%132;
   const actual=2+((pseudo*7)%29)+(((pseudo*3)%10)/10);
   const unit=units[(pseudo*3)%units.length];
   const remainingValue=Math.round(remaining*10)/10;
   return {idx:i+1,name:"Caso "+String(i+1).padStart(3,"0"),unit,actual:Math.round(actual*10)/10,remaining:remainingValue,total:Math.round((actual+remainingValue)*10)/10,status:remainingValue<2?"pronto":remainingValue<5?"cerca":"seguimiento"};
 });
 return snapshots;
}
const samples=makeSamples();
if(samples.length!==132)throw new Error("La demostración requiere 132 casos.");
const filterStatus=q("#censusStatus"),filterUnit=q("#censusUnit"),search=q("#censusSearch");
const statuses={pronto:"0–<2 d · seguimiento cercano",cerca:"2–<5 d · planificación",seguimiento:"≥5 d · seguimiento"};
function renderCensus(){
 const term=search.value.trim().toLowerCase(),unit=filterUnit.value,status=filterStatus.value;
 visibleRows=samples.filter(r=>(!term||r.name.toLowerCase().includes(term)||r.unit.toLowerCase().includes(term))&&(unit==="todos"||r.unit===unit)&&(status==="todos"||r.status===status));
 visibleRows.sort((a,b)=>{
  const v=typeof a[sortBy]==="string"?a[sortBy].localeCompare(b[sortBy]):a[sortBy]-b[sortBy];
  return sortReverse?-v:v;
 });
 const tbody=q("#censusBody");tbody.replaceChildren();
 const limit=visibleRows.slice(0,132);
 limit.forEach(r=>{
   const tr=el("tr");
   [r.name,r.unit,num(r.actual,1),num(r.remaining,1),num(r.total,1)].forEach(v=>tr.appendChild(el("td",null,v)));
   const td=el("td");const badge=el("span","sem "+r.status,statuses[r.status]);td.appendChild(badge);tr.appendChild(td);tbody.appendChild(tr);
 });
 q("#censusCount").textContent=visibleRows.length+" de 132 casos ilustrativos";
 q("#censusSortInfo").textContent="Orden: "+(sortBy==="remaining"?"días restantes":sortBy==="total"?"estancia total":"caso")+(sortReverse?" · descendente":" · ascendente");
}
Array.from(new Set(samples.map(r=>r.unit))).forEach(u=>{const option=el("option",null,u);option.value=u;filterUnit.appendChild(option);});
[search,filterStatus,filterUnit].forEach(control=>control.addEventListener(control===search?"input":"change",renderCensus));
qa("[data-sort]").forEach(btn=>btn.addEventListener("click",()=>{
 const key=btn.dataset.sort;
 if(sortBy===key)sortReverse=!sortReverse;else {sortBy=key;sortReverse=false;}
 renderCensus();
}));
renderCensus();

const GRUPS=[["MH BRONQUIOLITIS Y ASMA",[[134,2.5,2.33,0.35],[93,3,3.25,0.51],[172,4,3.61,0.58]]],["MH DISFUNCIÓN, REACCIÓN O COMPL. POR DISP., INJ. O TRAS. DEL TRACTO URINARIO",[[74,0,2.78,0.55],[141,0,3.81,0.73],[72,0,5.96,1.13]]],["MH INFECCIONES DE RIÑÓN Y TRACTO URINARIO",[[49,3,2.94,0.43],[76,5,3.8,0.57],[193,6,5.27,0.79]]],["MH INSUFICIENCIA CARDIACA",[[27,4,3.03,0.47],[151,5,3.86,0.63],[307,7,5.92,1.01]]],["MH OTROS SIGNOS, SÍNTOMAS Y DIAGNÓSTICOS DE APARATO RESPIRATORIO",[[99,2,2.23,0.42],[92,3,3.1,0.57],[152,4,5.38,0.96]]],["PH CATETERISMO CARDIACO",[[177,3,2.24,0.88],[254,4,3.33,1.07],[259,5,6.44,1.72]]],["PH OTROS PROCEDIMIENTOS CARDIOTORÁCICOS",[[134,3,2.99,1.94],[49,6,5.42,2.66],[99,11,9.79,4.18]]],["PH OTROS PROCEDIMIENTOS SOBRE APARATO CIRCULATORIO",[[78,3,2.49,1.56],[76,6,5,1.92],[123,12,10.58,3.27]]],["PH PROCEDIMIENTOS CARDIOVASCULARES PERCUTÁNEOS",[[515,2,1.9,1.72],[354,4,2.5,1.82],[253,5,5.18,2.48]]],["PH PROCEDIMIENTOS NO COMPLEJOS SOBRE APARATO RESPIRATORIO",[[26,3.5,2.85,1.04],[32,8.5,4.74,1.36],[302,9,7.13,2.11]]]];
for(const [name] of GRUPS){let option=el("option");option.value=name;option.textContent=name;q("#calcGroup").appendChild(option);}
function syncSeveridad(){
 const group=GRUPS.find(x=>x[0]===q("#calcGroup").value),previous=q("#calcSev").value;
 q("#calcSev").replaceChildren();
 if(!group)return;
 group[1].forEach((r,i)=>{let opt=el("option");opt.value=String(i);opt.textContent="Severidad "+(i+1);q("#calcSev").appendChild(opt);});
 if(["0","1","2"].includes(previous))q("#calcSev").value=previous;
}
function calc(){
 const age=Number(q("#calcAge").value),day=Number(q("#calcDay").value),group=GRUPS.find(x=>x[0]===q("#calcGroup").value);
 if(!group||!Number.isFinite(age)||age<0||age>110||!Number.isFinite(day)||day<0||day>100){q("#calcResult").textContent="Revisa los datos";return;}
 const item=group[1][Number(q("#calcSev").value)];if(!item)return;
 const [n,p50,norm,weight]=item;const remaining=Math.max(0,p50-day);
 q("#calcWeight").textContent=num(weight,2);
 q("#calcNorm").textContent=num(norm,2)+" días";
 q("#calcP50").textContent=num(p50,2)+" días";
 q("#calcN").textContent=String(n)+" episodios";
 q("#calcResult").textContent=num(remaining,1)+" días";
 q("#calcDetail").textContent="Estancia total según referencia: "+num(day+remaining,1)+" días · día actual: "+num(day,1)+". Predicción base de 2024, no Random Forest.";
}
q("#calcGroup").addEventListener("change",()=>{syncSeveridad();calc()});
q("#calcSev").addEventListener("change",calc);
qa("#calcForm select, #calcForm input").forEach(x=>x.addEventListener("change",calc));
q("#calcForm").addEventListener("submit",e=>{e.preventDefault();calc()});
syncSeveridad();calc();
const hash=parseInt(location.hash.slice(1),10);navigate(Number.isFinite(hash)?hash-1:0);

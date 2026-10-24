"use strict";
const qs=(s)=>document.querySelector(s),qsa=(s)=>Array.from(document.querySelectorAll(s));
const sections=qsa(".slide");let current=0;
function gotoSlide(i){current=Math.max(0,Math.min(sections.length-1,i));
 sections.forEach((el,n)=>el.classList.toggle("current",n===current));
 qsa("#menu button").forEach((el,n)=>el.classList.toggle("active",n===current));
 qs("#sectionIndicator").textContent=String(current+1).padStart(2,"0")+" / "+sections.length+" · "+sections[current].dataset.title;
 qs("#currentCounter").textContent=(current+1)+" de "+sections.length;
 qs("#progressBar").style.width=((current+1)*100/sections.length)+"%";
 const note=qs("#notes");note.textContent=sections[current].dataset.note||"";note.classList.remove("open");
 if(history.replaceState)history.replaceState(null,"","#"+(current+1));
 window.scrollTo(0,0);
}
sections.forEach((s,i)=>{const b=document.createElement("button");b.type="button";b.innerHTML='<span>'+String(i+1).padStart(2,"0")+"</span>";b.appendChild(document.createTextNode(s.dataset.title));b.addEventListener("click",()=>gotoSlide(i));qs("#menu").appendChild(b);});
qs("#prev").addEventListener("click",()=>gotoSlide(current-1));
qs("#next").addEventListener("click",()=>gotoSlide(current+1));
qs("#notesToggle").addEventListener("click",()=>qs("#notes").classList.toggle("open"));
document.addEventListener("keydown",e=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;
if(["ArrowRight","PageDown"].includes(e.key)){e.preventDefault();gotoSlide(current+1)}
if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();gotoSlide(current-1)}});
function tableFill(selector,rows){const parent=qs(selector);if(!parent)return;
parent.replaceChildren();
for(const row of rows){const tr=document.createElement("tr");for(const val of row){const td=document.createElement("td");td.textContent=String(val);tr.appendChild(td)}parent.appendChild(tr)}
}
tableFill("#cvTable",[
["Random Forest","≈4,9 d","≈6,0 d"],
["XGBoost","≈5,5 d","≈6,0 d"],
["Boosting de histogramas","≈5,6 d","≈6,0 d"],
["Regresión lineal","≈6,0 d","≈6,1 d"],
["Ridge","≈6,0 d","≈6,1 d"],
["Red neuronal (MLP)","≈5,5 d","≈6,3 d"],
["Árbol ajustado","≈5,9 d","≈6,1 d"],
["Árbol sin poda","≈0,1 d","≈7,7 d"]
]);
const err=[["Hasta 3 días","≈4 días"],["4–7 días","≈3 días"],["8–14 días","≈5 días"],["15–28 días","≈9 días"],["Más de 28 días","≈29 días"]];
for(const [range,mae] of err){const div=document.createElement("div");div.className="errorline";const label=document.createElement("b");label.textContent=range;div.appendChild(label);
const track=document.createElement("div");track.className="track";const fill=document.createElement("div");fill.className="fill";fill.style.width=(parseInt(mae.match(/\d+/)[0],10)/30*100)+"%";track.appendChild(fill);div.appendChild(track);
const v=document.createElement("b");v.textContent=mae;div.appendChild(v);qs("#errBars").appendChild(div);}
tableFill("#sampleRows",[
["Ejemplo A","2 d","3 d","5 d","Próximo"],
["Ejemplo B","6 d","4 d","10 d","Planificación"],
["Ejemplo C","3 d","9 d","12 d","Seguimiento"],
["Ejemplo D","8 d","2 d","10 d","Próximo"],
["Ejemplo E","4 d","7 d","11 d","Seguimiento"],
["Ejemplo F","12 d","5 d","17 d","Planificación"]
]);
function simulate(){let g=qs("#simGroup").value,s=Number(qs("#simSeverity").value),d=Math.min(60,Math.max(0,Number(qs("#simDay").value)||0));const base={a:7,b:11,c:15}[g]||7;const remaining=Math.max(0,base+(s-1)*3-d);qs("#simOutput").textContent=remaining+" días";}
["#simGroup","#simSeverity","#simDay"].forEach(id=>qs(id).addEventListener("change",simulate));simulate();
const hash=Number(location.hash.slice(1));gotoSlide(Number.isFinite(hash)&&hash>0?hash-1:0);

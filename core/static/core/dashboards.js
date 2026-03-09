const slots = document.querySelectorAll(".chart-slot");
const typeModal = document.getElementById("chartTypeModal");
const formModal = document.getElementById("chartFormModal");

let currentSlot = null;
let selectedType = null;

/* klik plus */

document.querySelectorAll(".add-chart").forEach(btn=>{
btn.onclick=()=>{
currentSlot = btn.parentElement;
typeModal.classList.remove("hidden");
};
});

/* wybór typu */

document.querySelectorAll(".chart-types div").forEach(type=>{
type.onclick=()=>{
selectedType = type.dataset.type;
typeModal.classList.add("hidden");
formModal.classList.remove("hidden");
};
});

/* dodawanie wiersza */

const inputs = document.getElementById("dataInputs");

document.getElementById("addRow").onclick=()=>{

const row = document.createElement("div");
row.className="data-row";

row.innerHTML=`
<input placeholder="Nazwa">
<input placeholder="Wartość" type="number">
`;

inputs.appendChild(row);

};

document.getElementById("addRow").click();

/* tworzenie wykresu */

document.getElementById("chartForm").onsubmit=(e)=>{

e.preventDefault();

const labels=[];
const values=[];

document.querySelectorAll(".data-row").forEach(r=>{

const name=r.children[0].value;
const val=r.children[1].value;

if(name && val){
labels.push(name);
values.push(val);
}

});

/* canvas */

currentSlot.innerHTML="<canvas></canvas>";

const ctx = currentSlot.querySelector("canvas");

new Chart(ctx,{
type:selectedType,
data:{
labels:labels,
datasets:[{
label:"Dane",
data:values
}]
},
options:{
responsive:true,
maintainAspectRatio:false
}
});

formModal.classList.add("hidden");
inputs.innerHTML="";
document.getElementById("addRow").click();

};
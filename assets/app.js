'use strict';
// Preview locale basata sugli screenshot originali. Nessuna connessione a Home Assistant.
const model={cameras:true,alarm:0,floorplan:true,perimeter:false,room:'Primo Piano',media:false,plug:false,climate:false,lights:[false,false,false,false],motion:false,door:false};
const originals={cameras:'Acceso',alarm:'Disattivato',floorplan:'Acceso',perimeter:'Chiuso',room:'Primo Piano',media:'Spento',plug:"Presa · L'altro ieri",climate:"L'altro ieri",light0:"L'altro ieri",light1:"L'altro ieri",light2:'7 ore fa',light3:"L'altro ieri",motion:'Assente · 7 ore fa',door:'Chiuso',lightCountTop:'0',lightCount:'0'};
const $=s=>document.querySelector(s);
function update(key,value){const node=$('[data-for="'+key+'"]');if(!node)return;node.textContent=value;node.classList.toggle('changed',value!==originals[key]);}
function message(text){$('#demo-message').textContent=text;}
function render(){const selected=$('#motion-selected');if(selected)selected.textContent=model.room;update('cameras',model.cameras?'Acceso':'Spento');update('alarm',['Disattivato','Casa','Fuori casa'][model.alarm]);update('floorplan',model.floorplan?'Acceso':'Spento');update('perimeter',model.perimeter?'Aperto':'Chiuso');update('room',model.room);update('media',model.media?'In riproduzione':'Spento');update('plug',model.plug?'Accesa':originals.plug);update('climate',model.climate?'Raffrescamento':originals.climate);model.lights.forEach((on,i)=>update('light'+i,on?'Acceso':originals['light'+i]));update('motion',model.motion?'Movimento':originals.motion);update('door',model.door?'Aperto':'Chiuso');const count=String(model.lights.filter(Boolean).length);update('lightCount',count);update('lightCountTop',count);$('#screen').classList.toggle('plan-hidden',!model.floorplan);}
const labels={cameras:'Telecamere Demo',floorplan:'Piantina Demo',perimeter:'Perimetro Demo',media:'Media Demo',plug:'Presa Demo',climate:'Clima Demo',motion:'Volumetrico Demo',door:'Porta Demo'};
function act(action){if(action==='alarm'){model.alarm=(model.alarm+1)%3;message('Allarme Demo: '+['Disattivato','Casa','Fuori casa'][model.alarm]);}else if(/^light[0-3]$/.test(action)){const i=Number(action.slice(-1));model.lights[i]=!model.lights[i];message('Luce '+(i+1)+' Demo: '+(model.lights[i]?'Accesa':'Spenta'));}else if(Object.prototype.hasOwnProperty.call(model,action)&&typeof model[action]==='boolean'){model[action]=!model[action];message(labels[action]+': '+(model[action]?'Attivo':'Inattivo'));}render();}
document.querySelectorAll('button[data-action]').forEach(b=>b.addEventListener('click',()=>act(b.dataset.action)));
$('[data-action="room"]').addEventListener('change',e=>{model.room=e.target.value;render();message('Ambiente Demo: '+model.room);});
document.querySelectorAll('[data-motion-room]').forEach(button=>button.addEventListener('click',()=>{
  const room=button.dataset.motionRoom;
  if(!['Piano Terra','Primo Piano'].includes(room))return;
  model.room=room;
  $('[data-action="room"]').value=room;
  render();
  message('Movimento simulato: ambiente impostato su '+room);
}));
render();
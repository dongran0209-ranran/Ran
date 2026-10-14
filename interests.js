(()=>{
const heart=document.querySelector('#interest-heart');if(!heart)return;
const ns='http://www.w3.org/2000/svg';
const hobbies=[
['网球','SPORT / 运动',30,25,'M17 6c8-6 17 3 11 11s-17 2-11-11Zm0 11L6 29m7-18 12 5m-9-9 10 5M9 26l3 3'],
['古筝','MUSIC / 音乐',43,29,'M6 7h22l-2 21H4L6 7Zm4 2-2 17m6-17-2 17m6-17-2 17m6-17-2 17M7 17h19'],
['羽毛球','SPORT / 运动',59,25,'m13 18-7-9 4-5 5 3 3-4 5 3-2 6 6 2-3 5-10 4m-1-11 3 10m4-11-1 10m-6 2c-6 4 0 11 5 6l3-5'],
['速写','DRAW / 画画',73,27,'M6 25 8 18 24 3l5 5-16 16-7 1Zm3-7 5 5M21 6l5 5M5 29h23'],
['阅读','READ / 阅读',23,40,'M16 8Q8 3 3 7v21q7-4 13 0 6-4 13 0V7q-6-4-13 1Zm0 0v20M7 11l5 1m-5 5 5 1m8-6 5-1m-5 7 5-1'],
['拍摄剪辑','CREATE / 创作',37,43,'M4 9h24v19H4V9Zm0 0 23-5M7 5l3 4m5-5 3 4m4-5 3 4M13 14l8 5-8 5Z'],
['烘焙','BAKE / 烘焙',52,43,'M9 13c-10-1-6-13 2-9 3-6 12-4 12 1 9-2 11 10 2 10v13H9V13Zm0 8h16M13 14v4m8-4v4'],
['hiphop','MUSIC / 音乐',68,43,'M5 18v-4C5-1 28-1 28 14v4M5 14H2v12h7V14Zm23 0h3v12h-7V14ZM13 19l4 4 4-4'],
['R&B','MUSIC / 音乐',80,40,'M12 24V7l16-3v17M12 12l16-3M12 24c0 6-11 7-10 1 1-4 8-5 10-1Zm16-3c0 6-11 7-10 1 1-4 8-5 10-1Z'],
['游泳','MOVE / 运动',30,56,'M3 24q4-5 8 0t8 0 10 0M3 29q4-5 8 0t8 0 10 0M10 18l7-9 10 5M11 16l10 6M4 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0'],
['冥想','SLOW / 慢下来',46,58,'M13 6a4 4 0 1 0 8 0 4 4 0 1 0-8 0M10 16l-5 7-3-2m21-5 5 7 3-2M12 13l-2 11 7 4 7-4-3-11M10 24l-5 5h24l-5-5'],
['手帐','JOURNAL / 记录',63,57,'M7 4h21v25H7V4ZM3 9h8M3 16h8M3 23h8m5-13 3 3 5-5m-8 11h8m-8 4h5'],
['桌游','PLAY / 一起玩',73,54,'M4 6h24v23H4V6Zm7 6h.1M21 22h.1M11 22h.1M21 12h.1M16 17h.1'],
['旅行','EXPLORE / 出发',43,72,'m2 16 12-3 8-11 4 2-5 10 8 3v3l-10-1-6 9-3-1 3-10-10 2Z'],
['美妆','BEAUTY / 美妆',57,72,'M8 15h11v14H8V15Zm2 0V6l7-4v13m7-3h6v17h-6V12Zm0-4V3m3 5V2m3 6V3']
];
const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 520');svg.setAttribute('class','interest-heart-dots');svg.setAttribute('aria-hidden','true');
let i=0;for(let y=-1.05;y<=1.4;y+=.09)for(let x=-1.2;x<=1.2;x+=.09){if((x*x+y*y-1)**3-x*x*y*y*y>0)continue;const dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',300+x*190);dot.setAttribute('cy',260-y*185);dot.setAttribute('r',String(1.3+(i%4)*.55));dot.setAttribute('fill',i%7===0?'#c99d95':i%3===0?'#aebc8b':'#7f9165');dot.setAttribute('opacity',String(.25+(i%5)*.09));svg.append(dot);i++;}heart.append(svg);
let active=-1;const buttons=[];const caption=document.querySelector('#interest-current'),category=document.querySelector('#interest-category');
function select(index){if(index===active)return;active=index;buttons.forEach((b,i)=>{const selected=i===index;b.classList.toggle('is-active',selected);b.setAttribute('aria-pressed',String(selected));});caption.textContent=hobbies[index][0];category.textContent=hobbies[index][1];heart.style.setProperty('--interest-x',hobbies[index][2]+'%');heart.style.setProperty('--interest-y',hobbies[index][3]+'%');heart.classList.add('has-interest');}
hobbies.forEach(([name,type,x,y,path],index)=>{const button=document.createElement('button');button.type='button';button.className='interest-node';button.style.left=x+'%';button.style.top=y+'%';button.style.setProperty('--node-tilt',((index%5)-2)*4+'deg');button.setAttribute('aria-label',name);button.setAttribute('aria-pressed','false');const icon=document.createElementNS(ns,'svg');icon.setAttribute('viewBox','0 0 34 34');icon.setAttribute('aria-hidden','true');const line=document.createElementNS(ns,'path');line.setAttribute('d',path);icon.append(line);const label=document.createElement('span');label.className='interest-label';label.textContent=name;button.append(icon,label);button.addEventListener('pointerenter',()=>select(index));button.addEventListener('focus',()=>select(index));button.addEventListener('click',()=>select(index));buttons.push(button);heart.append(button);});
let frame=0;heart.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||frame)return;frame=requestAnimationFrame(()=>{frame=0;const box=heart.getBoundingClientRect();const x=(e.clientX-box.left)/box.width*100,y=(e.clientY-box.top)/box.height*100;const nearest=hobbies.reduce((best,h,i)=>{const distance=(h[2]-x)**2+(h[3]-y)**2;return distance<best.distance?{index:i,distance}:best;},{index:0,distance:Infinity});if(nearest.distance<190)select(nearest.index);});});
heart.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const next=(Math.max(active,0)+(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1)+buttons.length)%buttons.length;buttons[next].focus();});
})();

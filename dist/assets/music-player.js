(() => {
 'use strict';
 const script=document.currentScript,base=new URL('../',script.src),asset=p=>new URL(p,base).href;
 const shell=document.createElement('aside');shell.className='tianyu-music';shell.setAttribute('aria-label','音乐播放器');
 shell.innerHTML='<section class="music-panel" id="music-panel" aria-label="音乐歌单" hidden><div class="music-heading"><span>随听 · TIANYU</span><button class="music-close" aria-label="收起音乐播放器">×</button></div><div class="music-empty">还没有歌曲，添加喜欢的音乐开始播放。</div><div class="music-engine"></div><div class="music-actions"><a href="'+asset('music.html')+'">添加歌曲</a><button class="music-preview">本机试听</button></div><p class="music-status" role="status">点击播放后开始，不会自动播放。</p></section><div class="music-dock"><button class="music-play" aria-label="播放音乐">▶</button><button class="music-expand" aria-controls="music-panel" aria-expanded="false">音乐 · 展开</button></div><input class="music-file" type="file" accept="audio/*,.mp3,.m4a,.aac,.ogg,.wav,.flac" multiple>';
 document.body.append(shell);
 const $=s=>shell.querySelector(s),panel=$('.music-panel'),play=$('.music-play'),expand=$('.music-expand'),status=$('.music-status');let ap=null,previewURLs=[],restoring=false;
 const key='tianyu-music-state-v1',escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const storage={get(){try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}},set(v){try{sessionStorage.setItem(key,JSON.stringify(v))}catch{}}};
 const setOpen=open=>{panel.hidden=!open;expand.setAttribute('aria-expanded',String(open));};
 expand.onclick=()=>setOpen(panel.hidden);$('.music-close').onclick=()=>{setOpen(false);expand.focus()};
 shell.addEventListener('keydown',e=>{if(e.key==='Escape'){setOpen(false);expand.focus()}});
 const save=()=>{if(!ap||ap.audio.src.startsWith('blob:'))return;storage.set({id:ap.list.audios[ap.list.index]?.id,time:ap.audio.currentTime,volume:ap.audio.volume})};
 function show(tracks,preview=false){
  if(ap){ap.destroy();ap=null}$('.music-engine').replaceChildren();
  if(!tracks.length){$('.music-empty').hidden=false;play.textContent='▶';play.setAttribute('aria-label','播放音乐');return}
  $('.music-empty').hidden=true;
  const restored=preview?null:storage.get();
  const safe=tracks.map(t=>({...t,name:escape(t.name),artist:escape(t.artist),url:preview?t.url:asset(t.url),cover:asset('assets/music/cover.svg')}));
  ap=new APlayer({container:$('.music-engine'),theme:'#ff7a1a',autoplay:false,preload:'none',volume:restored?.volume??.5,loop:'all',listFolded:false,listMaxHeight:180,audio:safe,storageName:'tianyu-music-volume'});
  if(restored){const i=tracks.findIndex(t=>t.id===restored.id);if(i>=0){restoring=true;ap.list.switch(i);restoring=false;ap.audio.addEventListener('loadedmetadata',()=>{if(Number.isFinite(ap.audio.duration))ap.audio.currentTime=Math.min(restored.time||0,Math.max(0,ap.audio.duration-.1))},{once:true})}}
  const update=()=>{play.textContent=ap.audio.paused?'▶':'Ⅱ';play.setAttribute('aria-label',ap.audio.paused?'播放音乐':'暂停音乐');expand.textContent=tracks[ap.list.index]?.name||'音乐 · 展开'};
  ap.on('play',()=>{update();status.textContent=preview?'正在本机试听，未上传到网站。':'正在播放';});ap.on('pause',()=>{update();save();});ap.on('listswitch',()=>{update();if(!restoring)save()});ap.on('timeupdate',save);ap.on('error',()=>{status.textContent='这首歌曲暂时无法播放，请换一首或检查音频文件。'});update();
  status.textContent=preview?'本机试听，不会上传；发布歌曲请打开“添加歌曲”。':'点击播放后开始，不会自动播放。';
 }
 play.onclick=()=>{if(ap)ap.toggle();else setOpen(true)};
 $('.music-preview').onclick=()=>$('.music-file').click();
 function preview(files){
  const accepted=[...files].filter(f=>f.type.startsWith('audio/')||/\.(mp3|m4a|aac|ogg|wav|flac)$/i.test(f.name));if(!accepted.length){setOpen(true);status.textContent='请选择 MP3、M4A 等音频文件。';return}
  if(ap){ap.destroy();ap=null}previewURLs.forEach(u=>URL.revokeObjectURL(u));previewURLs=[];
  const tracks=accepted.map(f=>{const url=URL.createObjectURL(f);previewURLs.push(url);return {name:f.name.replace(/\.[^.]+$/,''),artist:'本机试听',url,id:f.name}});show(tracks,true);setOpen(true);
 }
 $('.music-file').onchange=e=>preview(e.target.files);window.addEventListener('tianyu:preview-music',e=>preview(e.detail));window.addEventListener('pagehide',save);
 const embedded=document.getElementById('music-library');
 const load=location.protocol==='file:'?Promise.resolve(embedded?JSON.parse(embedded.textContent):{tracks:[]}):fetch(asset('assets/music/library.json'),{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('playlist');return r.json()});
 load.then(data=>{if(!previewURLs.length)show(data.tracks||[])}).catch(()=>{status.textContent='歌单暂时无法加载，仍可使用本机试听。'});
})();

'use strict';
// Canonical classroom link only. No account identifiers or local answers are shared.
(()=>{
 const url=new URL('./', window.location.href).href.replace(/\/$/, '');
 const field=document.getElementById('share-url');
 if(field)field.value=url;
 const status=document.getElementById('share-status');
 const dialog=document.getElementById('share-dialog');
 const report=text=>{if(status)status.textContent=text};
 const title='明辨风云 · 尽责护航｜航空气象互动课堂';
 if(typeof navigator.share==='function')document.querySelectorAll('.native-share').forEach(button=>button.hidden=false);
 async function copyLink(){try{await navigator.clipboard.writeText(url);report('课堂链接已复制，可以粘贴给参与者。')}catch(error){field?.focus();field?.select();report('请长按或选中上方链接复制。')}}
 document.addEventListener('click',async event=>{
  const button=event.target.closest('button');if(!button)return;
  const action=button.dataset.action;
  if(action==='share'){report('');dialog?.showModal()}
  if(action==='share-close')dialog?.close();
  if(action==='copy-link')await copyLink();
  if(action==='native-share'&&typeof navigator.share==='function'){
   try{await navigator.share({title,text:'以飞行员身份，完成辨、明、估、定的情景判断。',url});report('已完成系统分享。')}
   catch(error){if(error.name!=='AbortError')report('当前环境无法调用系统分享，请复制课堂链接。')}
  }
 });
})();

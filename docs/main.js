(()=>{let i=[],e=null;navigator.mediaDevices.addEventListener("devicechange",(()=>{console.log("system device change")})),window.getLocalStream=async()=>{e=await navigator.mediaDevices.getUserMedia({audio:!0}),await(async()=>{i=await navigator.mediaDevices.enumerateDevices()})(),await(()=>{const e=document.querySelector("#device-list-info");e.innerHTML="<div>device info</div><br/>",i.filter((i=>{const{kind:e}=i;return"audioinput"===e})).forEach((i=>{const{label:d,deviceId:n,groupId:a}=i,v=`\n        <div>\n          <div>label: ${d}</div>\n          <div>deviceId: ${n}</div>\n          <div>groupId: ${a}</div>\n          <br/>\n        <div>\n      `;e.innerHTML+=v}))})(),(()=>{if(!e)return;const i=document.querySelector("#track-info");i.innerHTML="";const[d]=e.getAudioTracks(),n=d.getSettings(),{enabled:a,id:v,kind:t,label:r}=d,{deviceId:c,groupId:o}=n,s=`\n    <div>\n      <div>track info</div>\n      <br/>\n      <div>enabled: ${a}</div>\n      <div>trackId: ${v}</div>\n      <div>kind: ${t}</div>\n      <div>label: ${r}</div>\n      <div>deviceId: ${c}</div>\n      <div>groupId: ${o}</div>\n    </div>\n  `;i.innerHTML+=s})()},window.stopStream=()=>{e&&(e.getTracks().forEach((i=>{i.stop()})),e=null)},window.deviceList=i,window.stream=e})();
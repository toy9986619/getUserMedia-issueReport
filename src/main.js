let deviceList = [];
let stream = null;

const getDeviceList = async () => {
  deviceList = await navigator.mediaDevices.enumerateDevices();
};

const renderAudioinputDeviceInfo = () => {
  const parent = document.querySelector('#device-list-info');
  parent.innerHTML = '<div>device info</div><br/>';

  deviceList
    .filter((device) => {
      const { kind } = device;
      return kind === 'audioinput';
    })
    .forEach((device) => {
      const { label, deviceId, groupId } = device;
      const dom = `
        <div>
          <div>label: ${label}</div>
          <div>deviceId: ${deviceId}</div>
          <div>groupId: ${groupId}</div>
          <br/>
        <div>
      `;
      parent.innerHTML += dom;
    });
};

const renderTrackInfo = () => {
  if (!stream) return;

  const parent = document.querySelector('#track-info');
  parent.innerHTML = '';

  const [audioTrack] = stream.getAudioTracks();
  const setting = audioTrack.getSettings();

  const { enabled, id, kind, label } = audioTrack;
  const { deviceId, groupId } = setting;

  const dom = `
    <div>
      <div>track info</div>
      <br/>
      <div>enabled: ${enabled}</div>
      <div>trackId: ${id}</div>
      <div>kind: ${kind}</div>
      <div>label: ${label}</div>
      <div>deviceId: ${deviceId}</div>
      <div>groupId: ${groupId}</div>
    </div>
  `;

  parent.innerHTML += dom;
};

const getLocalStream = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  await getDeviceList();
  await renderAudioinputDeviceInfo();
  renderTrackInfo();
};

const stopStream = () => {
  if (!stream) return;

  stream.getTracks().forEach((track) => {
    track.stop();
  });
  stream = null;
};

const handleSystemDeviceChange = () => {
  console.log('system device change');
}

navigator.mediaDevices.addEventListener('devicechange', handleSystemDeviceChange);

window.getLocalStream = getLocalStream;
window.stopStream = stopStream;
window.deviceList = deviceList;
window.stream = stream;
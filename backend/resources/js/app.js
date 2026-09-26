// import './bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

document.getElementById('app').innerHTML = `
<div style="min-height:100vh; background:#f8f5ff;">
  <nav class="navbar navbar-dark" style="background:#6f42c1;">
    <div class="container">
      <span class="navbar-brand fw-bold fs-4">🇺🇬 Deliver Uganda — SECRET MODE</span>
      <span class="badge bg-warning text-dark">🎙️ Voice Orders ON</span>
    </div>
  </nav>
  
  <div class="container py-4">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card shadow border-0 p-4">
          <h4 class="fw-bold" style="color:#6f42c1;">📍 Where to Deliver?</h4>
          <input class="form-control form-control-lg mb-3" placeholder="Type address OR use voice...">
          
          <div class="bg-light rounded p-3 text-center border">
            <p class="mb-2 fw-bold">🎙️ AUDIO NOTE (Secret Weapon)</p>
            <button id="recBtn" class="btn btn-danger rounded-circle p-3" style="width:80px;height:80px;">
              <span style="font-size:30px;">🎤</span>
            </button>
            <p id="status" class="mt-2 small text-muted">Tap to record address</p>
            <audio id="player" controls class="w-100 mt-2 d-none"></audio>
            <div id="wave" class="mt-2 d-none">
              <span class="badge bg-success">✅ Voice Saved! Rider will hear it!</span>
            </div>
          </div>

          <button class="btn btn-lg w-100 mt-4 text-white fw-bold" style="background:#6f42c1;">Order Now — Pay with MoMo</button>
          <p class="text-center mt-2 small">🔒 0 Vulnerabilities • Secure</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// SECRET AUDIO LOGIC
let mediaRecorder, chunks = [];
const recBtn = document.getElementById('recBtn');
const player = document.getElementById('player');
const status = document.getElementById('status');
const wave = document.getElementById('wave');

recBtn.onclick = async () => {
  if(mediaRecorder && mediaRecorder.state === 'recording'){
    mediaRecorder.stop();
    recBtn.className = 'btn btn-danger rounded-circle p-3';
    status.innerText = 'Processing...';
  } else {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, {type:'audio/webm'});
      player.src = URL.createObjectURL(blob);
      player.classList.remove('d-none');
      wave.classList.remove('d-none');
      status.innerText = '✅ Ready to send to rider!';
    };
    mediaRecorder.start();
    recBtn.className = 'btn btn-dark rounded-circle p-3';
    status.innerText = '🔴 Recording... Tap to stop';
  }
};
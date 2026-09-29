import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.getElementById('app').innerHTML = `
<div style="min-height:100vh; background:#f8f5ff;">
  <nav class="navbar navbar-expand-lg navbar-dark" style="background:#6f42c1;">
    <div class="container">
      <span class="navbar-brand fw-bold">Deliver Uganda</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#">🏠 Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" href="#">📦 Orders</a></li>
          <li class="nav-item"><a class="nav-link" href="#">🚚 Transporters</a></li>
          <li class="nav-item"><a class="nav-link" href="#">👥 Customers</a></li>
          <li class="nav-item"><span class="badge bg-warning text-dark mt-2">🎙️ Voice ON</span></li>
        </ul>
      </div>
    </div>
  </nav>
  
  <div class="container py-4">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card shadow border-0 p-4">
          <h4 class="fw-bold" style="color:#6f42c1;">📍 Where to Deliver?</h4>
          
          <!-- WHATSAPP CAPSULE MIC - EXACT LIKE YOUR SCREENSHOT -->
          <div class="position-relative mt-3">
            <input id="addressInput" class="form-control form-control-lg rounded-pill shadow-sm" placeholder="Type address OR use voice..." style="background:#ffffff; border:1px solid #e0e0e0; padding-right:55px; height:56px;">
            <button id="recBtn" class="btn position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center" style="width:42px; height:42px; background:transparent; border:none;">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#111"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
          </div>

          <p id="status" class="mt-3 small text-muted text-center">Tap mic to record address</p>
          <audio id="player" controls class="w-100 mt-2 d-none"></audio>
          <div id="wave" class="mt-2 d-none text-center">
            <span class="badge bg-success rounded-pill px-3 py-2">✅ Voice Saved! Transporter will hear it!</span>
          </div>

          <button class="btn btn-lg w-100 mt-4 text-white fw-bold rounded-pill" style="background:#6f42c1;">Order Now — Pay with MoMo</button>
          <p class="text-center mt-2 small">🔒 0 Vulnerabilities • Secure • 100% Transporter</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// SECRET AUDIO LOGIC - FIXED FOR CAPSULE MIC
let mediaRecorder, chunks = [];
const recBtn = document.getElementById('recBtn');
const player = document.getElementById('player');
const status = document.getElementById('status');
const wave = document.getElementById('wave');
const addressInput = document.getElementById('addressInput');

const micSVG = `<svg viewBox="0 0 24 24" width="26" height="26" fill="#111"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>`;
const stopSVG = `<svg viewBox="0 0 24 24" width="26" height="26" fill="#dc3545"><path d="M6 6h12v12H6z"/></svg>`;

recBtn.onclick = async () => {
  if(mediaRecorder && mediaRecorder.state === 'recording'){
    mediaRecorder.stop();
    recBtn.innerHTML = micSVG;
    status.innerText = 'Processing...';
  } else {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      mediaRecorder = new MediaRecorder(stream);
      chunks = [];
      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {type:'audio/webm'});
        player.src = URL.createObjectURL(blob);
        player.classList.remove('d-none');
        wave.classList.remove('d-none');
        status.innerText = '✅ Ready to send to transporter!';
        addressInput.placeholder = "✅ Voice address recorded";
      };
      mediaRecorder.start();
      recBtn.innerHTML = stopSVG;
      status.innerText = '🔴 Recording... Tap to stop';
    } catch(err){
      status.innerText = '❌ Mic permission denied';
    }
  }
};
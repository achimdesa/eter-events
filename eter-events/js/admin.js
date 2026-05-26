const memberSelect =
  document.getElementById('memberSelect');

const qrCanvas =
  document.getElementById('qrCanvas');

const downloadBtn =
  document.getElementById('downloadBtn');


// =========================
// LOAD MEMBERS
// =========================

async function loadMembers() {

  const { data, error } =
    await supabaseClient
      .from('students')
      .select('*');

  if (error) {

    console.error(error);

    return;
  }

  data.forEach(member => {

    const option =
      document.createElement('option');

    option.value =
      member.member_id;

    option.textContent =
      `${member.full_name} (${member.member_id})`;

    memberSelect.appendChild(option);
  });
}

loadMembers();


// =========================
// GENERATE QR
// =========================

function generateQRCode() {

  const memberId =
    memberSelect.value;

  if (!memberId) {

    alert('Please select a member.');

    return;
  }

  const verificationUrl =
    `http://127.0.0.1:5500/member.html?id=${memberId}`;

  QRCode.toCanvas(

    qrCanvas,

    verificationUrl,

    {
      width: 300,

      errorCorrectionLevel: 'H'
    },

    function (error) {

      if (error) {

        console.error(error);

      } else {

        console.log('QR Generated');

        downloadBtn.style.display =
          'block';
      }
    }
  );
}


// =========================
// DOWNLOAD QR
// =========================

downloadBtn.addEventListener('click', () => {

  // Create temporary canvas
  const finalCanvas =
    document.createElement('canvas');

  const ctx =
    finalCanvas.getContext('2d');

  finalCanvas.width = 300;
  finalCanvas.height = 300;

  // Draw QR canvas first
  ctx.drawImage(qrCanvas, 0, 0);

  // Load logo image
  const logo =
    new Image();

  logo.src = 'images/logo.png';

  logo.onload = function () {

    // Logo size
    const logoSize = 70;

    // Center position
    const x =
      (finalCanvas.width - logoSize) / 2;

    const y =
      (finalCanvas.height - logoSize) / 2;

    // White background circle
    ctx.fillStyle = 'white';

    ctx.beginPath();

    ctx.arc(
      finalCanvas.width / 2,
      finalCanvas.height / 2,
      40,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Draw logo
    ctx.drawImage(
      logo,
      x,
      y,
      logoSize,
      logoSize
    );

    // Download final image
    const link =
      document.createElement('a');

    link.download =
      'eter-event-qr.png';

    link.href =
      finalCanvas.toDataURL();

    link.click();
  };
});
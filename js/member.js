async function loadMemberProfile() {

  // Read member ID from URL
  const params = new URLSearchParams(window.location.search);

  const memberId = params.get('id');

  if (!memberId) {

    document.getElementById('member-card').innerHTML = `
      <h2>❌ No Member ID Provided</h2>
    `;

    return;
  }

  try {

    // Fetch member from students table
    const { data, error } = await supabaseClient
      .from('students')
      .select('*')
      .eq('member_id', memberId)
      .limit(1)
      .maybeSingle();

    if (error || !data) {

      console.error(error);

      document.getElementById('member-card').innerHTML = `
        <h2>❌ Member Not Found</h2>
      `;

      return;
    }

    // =========================
    // DISPLAY MEMBER DATA
    // =========================

    document.getElementById('member-name').textContent =
      data.full_name || 'N/A';

    document.getElementById('member-id').textContent =
      data.member_id || 'N/A';

    document.getElementById('member-role').textContent =
      data.role || 'N/A';

    document.getElementById('member-course').textContent =
      data.course || 'N/A';

    document.getElementById('member-phone').textContent =
      data.phone || 'N/A';

    // =========================
    // STATUS BADGE
    // =========================

    const statusElement =
      document.getElementById('member-status');

    statusElement.textContent =
      data.status || 'inactive';

    statusElement.classList.remove(
      'status-active',
      'status-inactive'
    );

    if (data.status === 'active') {

      statusElement.classList.add('status-active');

    } else {

      statusElement.classList.add('status-inactive');
    }

    // =========================
    // PHOTO HANDLING
    // =========================

    const photoElement =
      document.getElementById('member-photo');

    if (
      data.photo_url &&
      data.photo_url.trim() !== ""
    ) {

      photoElement.src = data.photo_url;

    } else {

      photoElement.src =
        "images/logo.png";
    }

    // fallback if image fails
    photoElement.onerror = function () {

      this.onerror = null;

      this.src =
        "images/logo.png";
    };

    // =========================
    // CERTIFICATE LINKS
    // =========================

    const certLink =
      document.getElementById('certificate-link');

    const downloadBtn =
      document.getElementById('download-certificate');

    if (
      data.certificate_url &&
      data.certificate_url.trim() !== ""
    ) {

      certLink.href =
        data.certificate_url;

      downloadBtn.href =
        data.certificate_url;

      certLink.style.display =
        "inline-block";

      downloadBtn.style.display =
        "inline-block";

    } else {

      certLink.style.display =
        "none";

      downloadBtn.style.display =
        "none";
    }

  } catch (err) {

    console.error('GENERAL ERROR:', err);

    document.getElementById('member-card').innerHTML = `
      <h2>❌ Something Went Wrong</h2>
    `;
  }
}

// Run only once
loadMemberProfile();
async function registerStudent() {

  try {

    // =========================
    // FORM VALUES
    // =========================

    const full_name =
      document.getElementById('full_name').value;

    const member_id =
      document.getElementById('member_id').value;

    const phone =
      document.getElementById('phone').value;

    const course =
      document.getElementById('course').value;

    const status =
      document.getElementById('status').value;

    const photoFile =
      document.getElementById('photo').files[0];

    const certificateFile =
      document.getElementById('certificate').files[0];

    // =========================
    // VALIDATION
    // =========================

    if (
      !full_name ||
      !member_id ||
      !phone ||
      !course
    ) {

      alert('Please fill all required fields.');

      return;
    }

    // =========================
    // UPLOAD PHOTO
    // =========================

    let photo_url = '';

    if (photoFile) {

      const photoPath =
        `photos/${Date.now()}_${photoFile.name}`;

      const { error: photoError } =
        await supabaseClient.storage
          .from('member-photos')
          .upload(photoPath, photoFile);

      if (photoError) {

        console.error(photoError);

        alert('Photo upload failed.');

        return;
      }

      const { data: photoData } =
        supabaseClient.storage
          .from('member-photos')
          .getPublicUrl(photoPath);

      photo_url =
        photoData.publicUrl;
    }

    // =========================
    // UPLOAD CERTIFICATE
    // =========================

    let certificate_url = '';

    if (certificateFile) {

      const certPath =
        `certificates/${Date.now()}_${certificateFile.name}`;

      const { error: certError } =
        await supabaseClient.storage
          .from('certificates')
          .upload(certPath, certificateFile);

      if (certError) {

        console.error(certError);

        alert('Certificate upload failed.');

        return;
      }

      const { data: certData } =
        supabaseClient.storage
          .from('certificates')
          .getPublicUrl(certPath);

      certificate_url =
        certData.publicUrl;
    }

    // =========================
    // INSERT INTO DATABASE
    // =========================

    const { error: dbError } =
      await supabaseClient
        .from('students')
        .insert([{

          full_name,
          member_id,
          phone,
          course,

          role: 'student',

          status,

          photo_url,

          certificate_url
        }]);

    if (dbError) {

      console.error(dbError);

      alert('Database insert failed.');

      return;
    }

    alert('Student registered successfully!');

    // Optional reset
    location.reload();

  } catch (err) {

    console.error(err);

    alert('Something went wrong.');
  }
}
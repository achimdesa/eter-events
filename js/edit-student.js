const params =
  new URLSearchParams(window.location.search);

const studentId =
  params.get('id');


// =========================
// LOAD STUDENT
// =========================

async function loadStudent() {

  const { data, error } =
    await supabaseClient
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

  if (error) {

    console.error(error);

    alert('Student not found.');

    return;
  }

  document.getElementById('full_name').value =
    data.full_name || '';

  document.getElementById('member_id').value =
    data.member_id || '';

  document.getElementById('phone').value =
    data.phone || '';

  document.getElementById('course').value =
    data.course || '';

  document.getElementById('status').value =
    data.status || 'active';
}

loadStudent();


// =========================
// UPDATE STUDENT
// =========================

async function updateStudent() {

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

  const { error } =
    await supabaseClient
      .from('students')
      .update({

        full_name,
        member_id,
        phone,
        course,
        status
      })
      .eq('id', studentId);

  if (error) {

    console.error(error);

    alert('Update failed.');

    return;
  }

  alert('Student updated successfully!');

  window.location.href =
    'students.html';
}
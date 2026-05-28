const tableBody =
  document.getElementById('studentsTableBody');

let studentsData = [];


// =========================
// LOAD STUDENTS
// =========================

async function loadStudents() {

  const { data, error } =
    await supabaseClient
      .from('students')
      .select('*')
      .order('full_name');

  if (error) {

    console.error(error);

    return;
  }

  studentsData = data;

  displayStudents(data);
}

loadStudents();


// =========================
// DISPLAY STUDENTS
// =========================

function displayStudents(students) {

  tableBody.innerHTML = '';

  students.forEach(member => {

    const row =
      document.createElement('tr');

    row.innerHTML = `

      <td>
        <img
          src="${member.photo_url}"
          class="member-photo"
        >
      </td>

      <td>${member.full_name}</td>

      <td>${member.member_id}</td>

      <td>${member.course || 'N/A'}</td>

      <td>${member.status}</td>

      

      <td>

        <a
            href="member.html?id=${member.member_id}"
            target="_blank"
            class="action-btn view-btn"
        >
            View
        </a>

        <a
            href="edit-student.html?id=${member.id}"
            class="action-btn qr-btn"
        >
            Edit
        </a>

        </td>
    `;

    tableBody.appendChild(row);
  });
}


// =========================
// SEARCH STUDENTS
// =========================

function searchStudents() {

  const keyword =
    document
      .getElementById('searchInput')
      .value
      .toLowerCase();

  const filtered =
    studetssData.filter(member => {

      return (

        member.full_name
          .toLowerCase()
          .includes(keyword)

        ||

        member.member_id
          .toLowerCase()
          .includes(keyword)

        ||

        (member.course || '')
          .toLowerCase()
          .includes(keyword)
      );
    });

  displayStudents(filtered);
}
async function loginAdmin() {

  const email =
    document.getElementById('email').value;

  const password =
    document.getElementById('password').value;

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email,
      password
    });

  if (error) {

    alert(error.message);

    return;
  }

  alert('Login successful!');

  window.location.href =
    'admin.html';
}
//Logout function
async function logoutAdmin() {

  await supabaseClient.auth.signOut();

  window.location.href =
    'login.html';
}
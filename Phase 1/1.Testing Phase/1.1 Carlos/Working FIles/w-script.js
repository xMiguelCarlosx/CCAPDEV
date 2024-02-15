function sidebar_toggle_animation() {

   const sidebar = document.querySelector('.sidebar');
   const toggleBtn = document.querySelector('.toggle-btn');

   toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
   })
}

function toggle_button_animation() {

   const sidebar = document.querySelector('.modify');
   const toggleBtn = document.querySelector('.modify-item');

   toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
   })
}


function update_profile_pic() {

   let profile_pic = document.getElementById("profile-pic");
   let input_file = document.getElementById("input-file");

   input_file.onchange = function () {
      profile_pic.src = URL.createObjectURL(input_file.files[0]);
   }
}

function edit_profile_description() {
   var description = document.getElementById('profile-description');
   description.contentEditable = 'true';
   document.getElementById('edit-function').style.display = 'none';
   document.getElementById('save-function').style.display = 'inline-block';
}

function save_profile_description() {
   var description = document.getElementById('profile-description');
   description.contentEditable = 'false';
   document.getElementById('edit-function').style.display = 'inline-block';
   document.getElementById('save-function').style.display = 'none';
}

function clear_profile_description() {
   var description = document.getElementById('profile-description');
   description.textContent = "";
}

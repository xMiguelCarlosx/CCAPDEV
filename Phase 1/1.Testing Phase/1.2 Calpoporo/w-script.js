function sidebar_toggle_animation() {

    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
 
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
 
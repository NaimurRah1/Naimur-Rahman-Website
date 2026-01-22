fetch('profile.json')
.then(res=>res.json())
.then(d=>{

  // BASIC INFO
  document.getElementById('photo').src=d.profilePhoto;
  document.getElementById('name').textContent=d.name;
  document.getElementById('bio').textContent=d.bio;

  // SOCIAL ICONS
  const socials=document.getElementById('socials');
  for(let s of d.socials){
    socials.innerHTML+=`
      <a href="${s.link}" target="_blank" title="${s.name}">
        <i class="${s.icon}"></i>
      </a>`;
  }

  // EDUCATION
  const edu=document.getElementById('educationList');
  d.education.forEach(e=>{
    edu.innerHTML+=`
      <div class="edu-card">
        <img src="${e.logo}">
        <div class="edu-left">
          <h4>${e.institution}</h4>
          <p>${e.degree} (${e.gpa})</p>
          <small>${e.year}</small>
        </div>
        <div class="edu-right">
          <strong>Subjects</strong>
          <ul>
            ${e.subjects.map(s=>`<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>`;
  });

  // COURSES
  const course=document.getElementById('courseList');
  d.courses.forEach(c=>{
    course.innerHTML+=`
      <div class="course-card">
        <h4>${c.title}</h4>
        <p>${c.institution}</p>
        <small>${c.year}</small>
      </div>`;
  });

  // PROJECTS
  const pr=document.getElementById('projectsGrid');
  d.projects.forEach(p=>{
    pr.innerHTML+=`
      <div class="project">
        <img src="${p.image}">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>`;
  });

});

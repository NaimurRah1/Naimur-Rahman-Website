fetch('profile.json')
.then(res=>res.json())
.then(d=>{

  // BASIC INFO
  document.getElementById('photo').src=d.profilePhoto;
  document.getElementById('bio').textContent=d.bio;

  // NAME BOUNCE ONE BY ONE
  const nameEl = document.getElementById('name');
  const letters = d.name.split('');
  nameEl.innerHTML = letters.map(l => `<span class="bound-letter">${l}</span>`).join('');
  const spans = nameEl.querySelectorAll('.bound-letter');
  spans.forEach((s,i)=> s.style.animationDelay = `${i*0.2}s`);

  // SOCIAL ICONS
  const socials=document.getElementById('socials');
  for(let s of d.socials){
    socials.innerHTML+=`
      <a href="${s.link}" target="_blank" title="${s.name}">
        <i class="${s.icon}"></i>
      </a>`;
  }

  // SKILLS
  if(d.skills){
    const skillsDiv = document.getElementById('skillsList');
    d.skills.forEach(s=>{
      skillsDiv.innerHTML+=`
        <div class="skill-card">
          <p>${s.name}</p>
          <div class="skill-bar">
            <div class="skill-level" style="width:${s.level}%"></div>
          </div>
        </div>`;
    });
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
        ${c.desc ? `<p>${c.desc}</p>` : ''}
        ${c.cert ? `<img src="${c.cert}" alt="Certificate">` : ''}
      </div>`;
  });

  // PROJECTS
  const pr=document.getElementById('projectsGrid');
  d.projects.forEach(p=>{
    pr.innerHTML+=`
      <div class="project" data-cat="${p.category}" onclick="window.open('${p.link}','_blank')">
        <img src="${p.image}">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>`;
  });

});

// THEME TOGGLE
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  if(document.documentElement.getAttribute('data-theme') === 'light'){
    document.documentElement.removeAttribute('data-theme');
    themeBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme','light');
    themeBtn.textContent = '🌑';
  }
});

// SECTION POPUP
const popup = document.getElementById('sectionPopup');
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
    popup.textContent = link.textContent;
    popup.classList.add('show');
    setTimeout(()=> popup.classList.remove('show'), 1200);
  });
});

// PROJECT FILTER BUTTONS
const projectFilters = document.getElementById('projectFilters');
projectFilters.addEventListener('click', e=>{
  if(e.target.tagName==='BUTTON'){
    const cat = e.target.getAttribute('data-cat');
    const projects = document.querySelectorAll('.project');
    projects.forEach(p=>{
      if(cat==='All' || p.dataset.cat===cat) p.style.display='block';
      else p.style.display='none';
    });
  }
});

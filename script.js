fetch('profile.json')
.then(res=>res.json())
.then(d=>{

    document.getElementById('photo').src=d.profilePhoto;

    // Animated Name
    const nameEl=document.getElementById('name');
    d.name.split('').forEach((c,i)=>{
        const s=document.createElement('span');
        s.textContent=c;
        s.style.opacity=0;
        s.style.animation=`pop .5s forwards ${i*0.05}s`;
        nameEl.appendChild(s);
    });

    document.getElementById('bio').textContent=d.bio;

    // Socials
    const soc=document.getElementById('socials');
    for(let k in d.socials){
        const a=document.createElement('a');
        a.href=d.socials[k];
        a.textContent=k;
        a.target="_blank";
        soc.appendChild(a);
    }

    // Skills
    const sk=document.getElementById('skillsBars');
    d.skills.forEach(s=>{
        sk.innerHTML+=`
        <div class="skills-bar">
            <small>${s.name}</small>
            <div class="progress">
                <div style="width:${s.level}%"></div>
            </div>
        </div>`;
    });

    // Education
    const ed=document.getElementById('educationGrid');
    d.education.forEach(e=>{
        ed.innerHTML+=`
        <div class="edu-card">
            <h4>${e.degree}</h4>
            <p>${e.institution}</p>
            <small>${e.year}</small>
        </div>`;
    });

    // Projects
    const pr=document.getElementById('projectsGrid');
    d.projects.forEach(p=>{
        pr.innerHTML+=`
        <div class="project" data-cat="${p.category}">
            <img src="${p.image}">
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
        </div>`;
    });
});

// Filter
function filterProjects(cat){
    document.querySelectorAll('.project').forEach(p=>{
        p.style.display=(cat==='All'||p.dataset.cat===cat)?'block':'none';
    });
}

// Theme
const toggle=document.getElementById('themeToggle');
if(localStorage.theme==='light') document.body.classList.add('light');

toggle.onclick=()=>{
    document.body.classList.toggle('light');
    localStorage.theme=document.body.classList.contains('light')?'light':'dark';
};

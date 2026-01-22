/* ================= BACKGROUND FLOATING CODE ================= */
const codeBg = document.getElementById('codeBg');

const codeSnippets = [
`import pandas as pd
df = pd.read_csv("bdhs.csv")
df.describe()`,

`SELECT division, COUNT(*)
FROM children
GROUP BY division;`,

`model <- lm(weight ~ age + sex, data=df)
summary(model)`,

`df.groupby("sex")
  .mean()`,

`ggplot(data)+
 geom_bar()`,

`SELECT *
FROM nutrition
WHERE stunted = 1;`
];

for(let i=0;i<14;i++){
  const block = document.createElement('div');
  block.className = 'code-block';
  block.style.left = Math.random()*90+'%';
  block.style.animationDuration = (18+Math.random()*12)+'s';
  block.style.animationDelay = Math.random()*8+'s';
  block.textContent = codeSnippets[Math.floor(Math.random()*codeSnippets.length)];
  codeBg.appendChild(block);
}

/* ================= YOUR EXISTING JS ================= */
/* fetch(profile.json)
   name bounce
   socials
   skills
   education
   courses
   projects
   theme toggle
   section popup
   project filters
   → UNCHANGED */

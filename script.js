function analyzeResume() {
  const jobRole = document.getElementById("jobRole").value;
  const output = document.getElementById("analysisOutput");
  const scoreOutput = document.getElementById("scoreOutput");
  const fileInput = document.getElementById("resumeInput");

  if (!fileInput.files.length) {
    alert("Please upload your resume first.");
    return;
  }

  // Simulated dummy resume (as if parsed from real resume PDF)
  const dummyResumeText = `
    Jane Doe
    MBA in Product Management
    Experience: 3 years as Product Manager at ABC Corp
    Skills: Agile, Roadmap, Stakeholder Management, Scrum, Documentation, Google Ads, SQL, SEO, React, HTML, Python, Excel
    Projects: Customer Insights Dashboard, Campaign Manager Tool
  `.toLowerCase(); // case-insensitive

  const keywords = {
    frontend: ["html", "css", "javascript", "react"],
    backend: ["node.js", "express", "mongodb", "sql"],
    data: ["python", "pandas", "machine learning", "statistics"],
    devops: ["docker", "ci/cd", "aws", "kubernetes"],
    pm: ["agile", "scrum", "roadmap", "stakeholder", "mvp"],
    ba: ["data analysis", "excel", "requirement gathering", "uml", "documentation"],
    hr: ["recruitment", "payroll", "onboarding", "compliance", "employee engagement"],
    marketing: ["seo", "social media", "campaign", "google ads", "content strategy"]
  };

  const domainMap = {
    frontend: "Engineering",
    backend: "Engineering",
    data: "Data Science",
    devops: "Infrastructure",
    pm: "Product Management",
    ba: "Business Analysis",
    hr: "Human Resources",
    marketing: "Marketing"
  };

  const selectedKeywords = keywords[jobRole];
  const totalKeywords = selectedKeywords.length;
  let matchedKeywords = 0;

  let analysis = "<strong>Analysis:</strong><ul>";

  selectedKeywords.forEach(skill => {
    if (dummyResumeText.includes(skill.toLowerCase())) {
      matchedKeywords++;
      analysis += `<li>✅ Contains: ${skill}</li>`;
    } else {
      analysis += `<li>❌ Missing: ${skill}</li>`;
    }
  });

  analysis += "</ul>";

  // Scoring logic
  let score = Math.floor((matchedKeywords / totalKeywords) * 100);
  if (score < 40 && matchedKeywords > 0) score = 40;
  if (score === 0) score = 10;

  const domain = domainMap[jobRole];
  output.innerHTML = analysis;
  scoreOutput.innerHTML = `
    <p class='score'>Resume Score: ${score}/100</p>
    <p><strong>Target Domain:</strong> ${domain}</p>
  `;
}

// 🌙 Dark Mode Toggle
document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

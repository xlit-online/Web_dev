let allJobs = [];

// Fetch jobs from API
async function loadJobs() {
  const res = await fetch("https://remotive.com/api/remote-jobs");
  const data = await res.json();
  allJobs = data.jobs;
  displayJobs(allJobs);
}

// Display jobs
function displayJobs(jobs) {
  const container = document.getElementById("jobs");
  container.innerHTML = "";

  if (jobs.length === 0) {
    container.innerHTML = "<p>No jobs found</p>";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <div class="meta">${job.company_name} • ${job.candidate_required_location}</div>
      <p>${job.category}</p>
      <a href="${job.url}" target="_blank">View Job</a>
    `;

    container.appendChild(div);
  });
}

// Search filter
document.getElementById("search").addEventListener("input", function(e) {
  const value = e.target.value.toLowerCase();

  const filtered = allJobs.filter(job =>
    job.title.toLowerCase().includes(value) ||
    job.company_name.toLowerCase().includes(value)
  );

  displayJobs(filtered);
});

// Init
loadJobs();
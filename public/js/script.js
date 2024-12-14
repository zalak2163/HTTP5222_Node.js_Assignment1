document.addEventListener("DOMContentLoaded", () => {
  // Example: Add interactivity to form submissions
  const projectForm = document.querySelector(
    'form[action="/admin/add-project"]'
  );
  const skillForm = document.querySelector('form[action="/admin/add-skill"]');

  // Validate project form before submission
  if (projectForm) {
    projectForm.addEventListener("submit", (event) => {
      const title = projectForm.title.value.trim();
      const description = projectForm.description.value.trim();
      const link = projectForm.link.value.trim();

      if (!title || !description || !link) {
        alert("Please fill out all fields for the project.");
        event.preventDefault(); // Prevent form submission
      }
    });
  }

  // Validate skill form before submission
  if (skillForm) {
    skillForm.addEventListener("submit", (event) => {
      const name = skillForm.name.value.trim();
      const level = skillForm.level.value.trim();

      if (!name || !level) {
        alert("Please fill out all fields for the skill.");
        event.preventDefault(); // Prevent form submission
      }
    });
  }
});

// Keeps the page honest: if a cause has ever been ruled, edit VERDICT below.
// "undetermined" = no official finding yet (the current state).
// "yes" = ruled accidental. "no" = ruled deliberate.
const VERDICT = "undetermined";

const verdictEl = document.getElementById("verdict");
const answers = {
  undetermined: { text: "Undetermined", color: "" },
  yes: { text: "Yes", color: "" },
  no: { text: "No", color: "" }
};

window.addEventListener("DOMContentLoaded", () => {
  const v = answers[VERDICT] || answers.undetermined;
  verdictEl.textContent = v.text;
  document.title = "Was the Spencer, NY store fire an accident? " + v.text + " | Facts & sources";
});

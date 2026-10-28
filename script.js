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

// Live visitor vote. Tallies come from the free Abacus counter service;
// votes are visitors' opinions, never an official finding.
const VOTE_API = "https://abacus.jasoncameron.dev";
const VOTE_NAMESPACE = "spencerfire5173";
const VOTE_KEYS = { yes: "yes-vote", no: "no-vote" };
const VOTED_STORAGE_KEY = "spencerfire-vote";

const tallyEl = document.getElementById("tally");
const yesBtn = document.getElementById("vote-yes");
const noBtn = document.getElementById("vote-no");

async function getCount(key) {
  try {
    const res = await fetch(`${VOTE_API}/get/${VOTE_NAMESPACE}/${key}`);
    const data = await res.json();
    if (typeof data.value === "number") return data.value;
    return 0; // "Key not found" means nobody has voted yet
  } catch (err) {
    return null;
  }
}

async function recordVote(key) {
  try {
    const res = await fetch(`${VOTE_API}/hit/${VOTE_NAMESPACE}/${key}`);
    const data = await res.json();
    return typeof data.value === "number" ? data.value : null;
  } catch (err) {
    return null;
  }
}

function renderTally(yesCount, noCount) {
  if (yesCount === null && noCount === null) {
    tallyEl.textContent = "Tally unavailable right now.";
    return;
  }
  const y = yesCount === null ? "?" : yesCount;
  const n = noCount === null ? "?" : noCount;
  const total = (yesCount || 0) + (noCount || 0);
  tallyEl.textContent = `Yes: ${y} / No: ${n} / ${total} vote${total === 1 ? "" : "s"} so far`;
}

function markVoted(choice) {
  const picked = choice === "yes" ? yesBtn : noBtn;
  picked.classList.add("picked");
  yesBtn.disabled = true;
  noBtn.disabled = true;
}

async function vote(choice) {
  yesBtn.disabled = true;
  noBtn.disabled = true;
  const recorded = await recordVote(VOTE_KEYS[choice]);
  if (recorded === null) {
    tallyEl.textContent = "Couldn't record your vote. Try refreshing.";
    yesBtn.disabled = false;
    noBtn.disabled = false;
    return;
  }
  try {
    localStorage.setItem(VOTED_STORAGE_KEY, choice);
  } catch (err) { /* storage unavailable, vote still counts */ }
  markVoted(choice);
  const otherCount = await getCount(VOTE_KEYS[choice === "yes" ? "no" : "yes"]);
  const y = choice === "yes" ? recorded : otherCount;
  const n = choice === "no" ? recorded : otherCount;
  renderTally(y, n);
}

window.addEventListener("DOMContentLoaded", () => {
  const v = answers[VERDICT] || answers.undetermined;
  verdictEl.textContent = v.text;
  document.title = "Was the Spencer, NY store fire an accident? " + v.text + " | Facts & sources";

  Promise.all([getCount(VOTE_KEYS.yes), getCount(VOTE_KEYS.no)]).then(([y, n]) => renderTally(y, n));

  yesBtn.addEventListener("click", () => vote("yes"));
  noBtn.addEventListener("click", () => vote("no"));

  let saved = null;
  try {
    saved = localStorage.getItem(VOTED_STORAGE_KEY);
  } catch (err) { /* storage unavailable */ }
  if (saved === "yes" || saved === "no") markVoted(saved);
});

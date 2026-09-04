const iconPaths = {
  arrow: '<path d="m9 18 6-6-6-6" />',
  bookmark: '<path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21L12 17.6 6.5 21V4.8Z" />',
  clock: '<circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" />',
  spark:
    '<path d="M12 3c.6 4.7 3.3 7.4 8 8-4.7.6-7.4 3.3-8 8-.6-4.7-3.3-7.4-8-8 4.7-.6 7.4-3.3 8-8Z" />',
  route:
    '<circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h3a3 3 0 0 1 3 3v6M11 18H8a3 3 0 0 1-3-3V9" />',
  access:
    '<circle cx="12" cy="5" r="2" /><path d="M5 9h14M12 9v5M8 21l4-7 4 7" />',
  leaf: '<path d="M20 4C10 4 5 9 5 16c4 1 12 0 15-12Z" /><path d="M4 21c3-7 7-10 13-13" />',
  heart:
    '<path d="M20 8.5C20 14 12 20 12 20S4 14 4 8.5C4 5.5 6 4 8.5 4c1.5 0 2.8.8 3.5 2 .7-1.2 2-2 3.5-2C18 4 20 5.5 20 8.5Z" />',
  nodes:
    '<circle cx="6" cy="7" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="m8 8 3 7M16 8l-3 7M8.5 7h7" />',
  compass:
    '<circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" />',
};

const svg = (path, className = "") =>
  `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;

// Every person, project, metric, and affiliation below is synthetic demo content.
const projects = [
  {
    id: "first-week",
    name: "First Week, Less Guesswork",
    short: "FW",
    pitch:
      "A peer-shaped campus guide that answers the practical questions new community members are often hesitant to ask.",
    description:
      "Prototype one welcoming route through the first two weeks at NYU, combining plain-language guidance, community tips, and handoffs to trusted support. The team will test a clickable journey rather than attempt a full campus app.",
    challenge: "Belonging, Everywhere",
    challengeId: "belonging",
    status: "Open to join",
    commitment: "Light",
    commitmentLabel: "4–6 flexible hours",
    experience: ["First-timer friendly", "No code needed"],
    schools: ["Steinhardt", "SPS", "Student Affairs"],
    tags: ["student experience", "service design", "accessibility"],
    roles: ["Service designer", "Student researcher", "Content strategist"],
    team: [
      ["AR", "Ari R.", "Steinhardt student", "#ffc857"],
      ["MJ", "Mika J.", "SPS student", "#a9efd8"],
      ["SK", "Sam K.", "Student affairs staff", "#9aa8ff"],
      ["TD", "Toni D.", "Tandon student", "#ffb3a4"],
    ],
    seats: 3,
    mode: "Hybrid",
    stage: "Problem framed",
    outcome: "A tested onboarding journey and a five-screen prototype",
    recommendation: 100,
    created: 12,
    symbol: "01",
    artBg: "#3a0752",
    artAccent: "#d7ff52",
    artInk: "#ffffff",
  },
  {
    id: "open-stage",
    name: "OpenStage Caption Kit",
    short: "CC",
    pitch:
      "A lightweight production kit that helps student performances make captions part of the creative process from day one.",
    description:
      "Create a reusable workflow for small productions to plan, generate, style, and quality-check captions. The prototype can combine a facilitation guide, a sample caption design system, and a low-fidelity operator view.",
    challenge: "Learning Without Friction",
    challengeId: "learning",
    status: "Open to join",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["First-timer friendly"],
    schools: ["Tisch", "Arts & Science", "NYU IT"],
    tags: ["arts", "accessibility", "creative tools"],
    roles: ["Theater maker", "Frontend builder", "Accessibility tester"],
    team: [
      ["LN", "Lena N.", "Tisch student", "#ffb3a4"],
      ["OP", "Owen P.", "Arts & Science student", "#a9efd8"],
      ["RB", "Rory B.", "IT staff", "#bfc8ff"],
    ],
    seats: 3,
    mode: "In person",
    stage: "Early concept",
    outcome: "A caption-ready rehearsal workflow and operator prototype",
    recommendation: 96,
    created: 11,
    symbol: "Aa",
    artBg: "#1c2255",
    artAccent: "#ff8066",
    artInk: "#ffffff",
  },
  {
    id: "carbon-lens",
    name: "CarbonLens for Campus Events",
    short: "CO₂",
    pitch:
      "A simple planning tool that makes lower-impact choices visible while an event is still being designed.",
    description:
      "Translate event choices—venue, food, travel, materials, and attendance—into an understandable impact snapshot. The team will focus on decision support and behavior, not a definitive emissions accounting system.",
    challenge: "Climate-Ready University",
    challengeId: "climate",
    status: "Needs an advisor",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["First-timer friendly"],
    schools: ["Stern", "Wagner", "Campus Services"],
    tags: ["climate", "operations", "data visualization"],
    roles: ["Sustainability advisor", "Data storyteller"],
    team: [
      ["JC", "Jules C.", "Stern student", "#d7ff52"],
      ["NE", "Nico E.", "Wagner student", "#8ca5ff"],
      ["PF", "Parker F.", "Campus services staff", "#ffc857"],
    ],
    seats: 2,
    mode: "Hybrid",
    stage: "Data sketch",
    outcome: "A comparison tool for three common event decisions",
    recommendation: 94,
    created: 10,
    symbol: "↘",
    artBg: "#143d31",
    artAccent: "#b9f16f",
    artInk: "#ffffff",
  },
  {
    id: "lab-link",
    name: "LabLink Commons",
    short: "LL",
    pitch:
      "A discovery layer for finding underused research tools, methods, and expertise across school boundaries.",
    description:
      "Explore how researchers could discover capabilities—not sensitive data—in neighboring labs. The weekend outcome is a searchable service concept with trust, access, and maintenance built into the flow.",
    challenge: "Discovery to Impact",
    challengeId: "discovery",
    status: "Open to join",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["First-timer friendly"],
    schools: ["Tandon", "Arts & Science", "Research Staff"],
    tags: ["research", "knowledge graph", "operations"],
    roles: ["Research operations lead", "Information architect", "Prototype builder"],
    team: [
      ["IM", "Indy M.", "Tandon doctoral student", "#a9efd8"],
      ["ZS", "Zuri S.", "Arts & Science faculty", "#ffc857"],
      ["EV", "Ellis V.", "Research staff", "#d2a7e8"],
    ],
    seats: 3,
    mode: "Hybrid",
    stage: "Interview notes",
    outcome: "A searchable directory concept and a governance checklist",
    recommendation: 92,
    created: 9,
    symbol: "↔",
    artBg: "#342269",
    artAccent: "#8ff0d2",
    artInk: "#ffffff",
  },
  {
    id: "studio-swap",
    name: "StudioSwap",
    short: "SS",
    pitch:
      "A shared view of creative spaces, equipment, and quiet production windows across the university.",
    description:
      "Prototype a respectful way to discover available creative resources without flattening the policies that protect them. The team will map one cross-school exchange from request to return.",
    challenge: "Discovery to Impact",
    challengeId: "discovery",
    status: "Open to join",
    commitment: "Light",
    commitmentLabel: "6–8 flexible hours",
    experience: ["No code needed", "First-timer friendly"],
    schools: ["Tisch", "Steinhardt", "NYU Libraries"],
    tags: ["arts", "resource sharing", "service design"],
    roles: ["Operations mapper", "Visual designer"],
    team: [
      ["KA", "Kai A.", "Tisch student", "#ffb3a4"],
      ["UM", "Uma M.", "Libraries staff", "#a9efd8"],
    ],
    seats: 2,
    mode: "In person",
    stage: "Opportunity map",
    outcome: "A resource discovery flow and one exchange blueprint",
    recommendation: 90,
    created: 8,
    symbol: "□",
    artBg: "#6b164e",
    artAccent: "#ffc857",
    artInk: "#ffffff",
  },
  {
    id: "city-pulse",
    name: "CityPulse Classroom",
    short: "NYC",
    pitch:
      "A teaching canvas that turns public city data into approachable questions, maps, and classroom investigations.",
    description:
      "Build an educator-facing canvas for combining a public dataset, a neighborhood question, and a short learning activity. The team will prototype one end-to-end lesson and document data caveats.",
    challenge: "Public Interest AI",
    challengeId: "public-ai",
    status: "Open to join",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["First-timer friendly"],
    schools: ["Wagner", "Tandon", "Journalism"],
    tags: ["AI", "public data", "education"],
    roles: ["Data journalist", "Learning designer", "AI prototyper"],
    team: [
      ["DN", "Dev N.", "Wagner student", "#ffc857"],
      ["CM", "Casey M.", "Journalism student", "#8ca5ff"],
      ["RS", "Remy S.", "Tandon student", "#a9efd8"],
    ],
    seats: 3,
    mode: "Hybrid",
    stage: "Sample lesson",
    outcome: "One transparent, reusable public-data lesson builder",
    recommendation: 88,
    created: 7,
    symbol: "⌁",
    artBg: "#053d59",
    artAccent: "#ff8066",
    artInk: "#ffffff",
  },
  {
    id: "care-route",
    name: "CareRoute",
    short: "+",
    pitch:
      "A human-centered handoff map for navigating wellness resources without having to know the organization chart.",
    description:
      "Design a calm, plain-language prototype that helps someone identify the next appropriate kind of support. The team will emphasize warm handoffs, accessibility, and careful boundaries—not diagnosis.",
    challenge: "Healthy Campus Commons",
    challengeId: "health",
    status: "Needs an advisor",
    commitment: "Light",
    commitmentLabel: "4–6 flexible hours",
    experience: ["No code needed"],
    schools: ["Nursing", "Global Public Health", "Student Health"],
    tags: ["wellness", "student experience", "service design"],
    roles: ["Care navigation advisor", "Content designer"],
    team: [
      ["AP", "Avery P.", "Nursing student", "#ffb3a4"],
      ["MG", "Morgan G.", "Public health student", "#a9efd8"],
      ["TS", "Taylor S.", "Student services staff", "#bfc8ff"],
    ],
    seats: 2,
    mode: "Hybrid",
    stage: "Service blueprint",
    outcome: "A safe handoff journey with clear escalation boundaries",
    recommendation: 86,
    created: 6,
    symbol: "+",
    artBg: "#6e2942",
    artAccent: "#a9efd8",
    artInk: "#ffffff",
  },
  {
    id: "global-relay",
    name: "Global Classroom Relay",
    short: "24h",
    pitch:
      "A structured handoff that lets project-based classes collaborate across time zones without adding another live meeting.",
    description:
      "Prototype an asynchronous relay for teams at three global sites: a compact context packet, a contribution window, and a clear return handoff. Success means continuity without meeting fatigue.",
    challenge: "Learning Without Friction",
    challengeId: "learning",
    status: "Open to join",
    commitment: "Light",
    commitmentLabel: "6–8 flexible hours",
    experience: ["First-timer friendly", "No code needed"],
    schools: ["NYU Abu Dhabi", "NYU Shanghai", "Liberal Studies"],
    tags: ["global", "education", "collaboration"],
    roles: ["Facilitator", "Learning researcher", "Motion designer"],
    team: [
      ["YN", "Yael N.", "Liberal Studies student", "#ffc857"],
      ["HH", "Harper H.", "Global programs staff", "#8ca5ff"],
    ],
    seats: 3,
    mode: "Remote",
    stage: "Journey mapped",
    outcome: "A tested cross-time-zone collaboration relay",
    recommendation: 84,
    created: 5,
    symbol: "→",
    artBg: "#252057",
    artAccent: "#ffc857",
    artInk: "#ffffff",
  },
  {
    id: "civic-signals",
    name: "Civic Signals Studio",
    short: "§",
    pitch:
      "A workshop format for turning complex public policy language into scenarios people can question and discuss.",
    description:
      "Create a facilitated experience that pairs source-grounded summaries with contrasting community perspectives. The prototype will make uncertainty and source provenance visible rather than pretending to provide legal advice.",
    challenge: "Public Interest AI",
    challengeId: "public-ai",
    status: "Open to join",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["No code needed"],
    schools: ["NYU Law", "Wagner", "Arts & Science"],
    tags: ["AI", "civic life", "policy"],
    roles: ["Policy researcher", "Facilitator", "Interaction designer"],
    team: [
      ["FA", "Frankie A.", "Law student", "#d2a7e8"],
      ["QL", "Quinn L.", "Wagner student", "#ffc857"],
      ["WN", "Wren N.", "Arts & Science student", "#a9efd8"],
    ],
    seats: 3,
    mode: "In person",
    stage: "Content prototype",
    outcome: "A transparent policy-exploration workshop and source pattern",
    recommendation: 82,
    created: 4,
    symbol: "§",
    artBg: "#4b1749",
    artAccent: "#8ca5ff",
    artInk: "#ffffff",
  },
  {
    id: "access-after-dark",
    name: "Access After Dark",
    short: "8PM",
    pitch:
      "A night-hours journey map that makes study space, transportation, and help options easier to understand.",
    description:
      "Follow one late-evening campus journey and prototype the information a community member needs at each moment. The team will focus on confidence and coordination rather than building a live safety system.",
    challenge: "Belonging, Everywhere",
    challengeId: "belonging",
    status: "Open to join",
    commitment: "Light",
    commitmentLabel: "4–6 flexible hours",
    experience: ["First-timer friendly", "No code needed"],
    schools: ["SPS", "Tandon", "Campus Operations"],
    tags: ["accessibility", "student experience", "wayfinding"],
    roles: ["Journey mapper", "Operations partner"],
    team: [
      ["SN", "Sky N.", "SPS student", "#8ca5ff"],
      ["BA", "Blair A.", "Campus operations staff", "#ffc857"],
    ],
    seats: 2,
    mode: "Hybrid",
    stage: "Field notes",
    outcome: "A late-hours information map and service handoff concept",
    recommendation: 80,
    created: 3,
    symbol: "20",
    artBg: "#111936",
    artAccent: "#d7ff52",
    artInk: "#ffffff",
  },
  {
    id: "data-dignity",
    name: "Data Dignity Kit",
    short: "✓",
    pitch:
      "A practical conversation kit that helps student builders make thoughtful choices before collecting personal data.",
    description:
      "Turn abstract privacy and responsible-AI principles into a short, usable project ritual. Teams will test prompt cards, a data-minimization canvas, and a plain-language decision record.",
    challenge: "Public Interest AI",
    challengeId: "public-ai",
    status: "Needs an advisor",
    commitment: "Light",
    commitmentLabel: "4–6 flexible hours",
    experience: ["No code needed", "First-timer friendly"],
    schools: ["NYU Law", "Tandon", "NYU Libraries"],
    tags: ["AI", "privacy", "responsible design"],
    roles: ["Privacy advisor", "Workshop tester"],
    team: [
      ["CR", "Cameron R.", "Tandon student", "#a9efd8"],
      ["JM", "Jaden M.", "Libraries staff", "#ffc857"],
    ],
    seats: 2,
    mode: "Remote",
    stage: "Card draft",
    outcome: "A tested 20-minute responsible-data team ritual",
    recommendation: 78,
    created: 2,
    symbol: "✓",
    artBg: "#332060",
    artAccent: "#ff8066",
    artInk: "#ffffff",
  },
  {
    id: "quiet-commons",
    name: "Quiet Commons",
    short: "••",
    pitch:
      "A low-stimulation wayfinding layer for finding and sharing the sensory character of campus spaces.",
    description:
      "Prototype a respectful vocabulary and map for noise, light, crowding, and social expectations. The team will test whether the information helps people choose spaces without labeling users or tracking individuals.",
    challenge: "Healthy Campus Commons",
    challengeId: "health",
    status: "Open to join",
    commitment: "Weekend",
    commitmentLabel: "Full build weekend",
    experience: ["First-timer friendly"],
    schools: ["Gallatin", "Steinhardt", "NYU Libraries"],
    tags: ["wellness", "accessibility", "mapping"],
    roles: ["Sensory researcher", "Map designer", "Web builder"],
    team: [
      ["RA", "River A.", "Gallatin student", "#d2a7e8"],
      ["KD", "Kit D.", "Libraries staff", "#a9efd8"],
    ],
    seats: 3,
    mode: "In person",
    stage: "Vocabulary test",
    outcome: "A privacy-respecting sensory map of one shared space",
    recommendation: 76,
    created: 1,
    symbol: "··",
    artBg: "#273d43",
    artAccent: "#bfc8ff",
    artInk: "#ffffff",
  },
];

const challenges = [
  {
    id: "belonging",
    name: "Belonging, Everywhere",
    description:
      "Help every community member navigate, connect, and participate across campuses, schedules, and life stages.",
    focus: "Access · connection · wayfinding",
    color: "#57068c",
    soft: "#eee1f4",
    icon: "route",
  },
  {
    id: "learning",
    name: "Learning Without Friction",
    description:
      "Remove avoidable barriers between curiosity and learning—in classrooms, studios, clinics, and online.",
    focus: "Teaching · access · collaboration",
    color: "#1e4384",
    soft: "#e2eafa",
    icon: "access",
  },
  {
    id: "health",
    name: "Healthy Campus Commons",
    description:
      "Make it easier to find, understand, and shape the conditions that support collective wellbeing.",
    focus: "Wellness · space · care",
    color: "#9a3851",
    soft: "#fbe6e9",
    icon: "heart",
  },
  {
    id: "climate",
    name: "Climate-Ready University",
    description:
      "Turn the university’s everyday choices into practical opportunities for resilience and lower impact.",
    focus: "Climate · operations · behavior",
    color: "#216346",
    soft: "#def3e7",
    icon: "leaf",
  },
  {
    id: "public-ai",
    name: "Public Interest AI",
    description:
      "Explore where AI can expand agency and understanding while protecting privacy, safety, and trust.",
    focus: "AI · trust · civic life",
    color: "#9c4c00",
    soft: "#ffedcf",
    icon: "nodes",
  },
  {
    id: "discovery",
    name: "Discovery to Impact",
    description:
      "Help knowledge, methods, creative work, and research capabilities travel farther across disciplines.",
    focus: "Research · creativity · exchange",
    color: "#3340a0",
    soft: "#e7e9ff",
    icon: "compass",
  },
];

const state = {
  search: "",
  availability: "all",
  commitment: "all",
  experience: "all",
  sort: "recommended",
  savedOnly: false,
  saved: new Set(),
};

const projectGrid = document.querySelector("#project-grid");
const challengeGrid = document.querySelector("#challenge-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#project-search");
const sortSelect = document.querySelector("#project-sort");
const filterPanel = document.querySelector(".filter-panel");
const filterToggle = document.querySelector(".filter-toggle");
const filterCount = document.querySelector(".filter-count");
const savedCount = document.querySelector(".saved-count");
const savedButton = document.querySelector(".saved-projects-button");
const drawer = document.querySelector(".project-drawer");
const drawerContent = document.querySelector("#drawer-content");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const toast = document.querySelector(".toast");
let toastTimer;
let lastFocusedElement;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadSavedProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem("violet-lab-saved") || "[]");
    state.saved = new Set(Array.isArray(saved) ? saved : []);
  } catch (error) {
    console.warn("Saved projects could not be restored.", error);
  }
}

function persistSavedProjects() {
  try {
    localStorage.setItem("violet-lab-saved", JSON.stringify([...state.saved]));
  } catch (error) {
    console.warn("Saved projects could not be stored.", error);
  }
}

function initialsStack(team, max = 3) {
  const visible = team.slice(0, max);
  const avatars = visible
    .map(
      ([initials, name, , color]) =>
        `<span style="--avatar: ${color}" title="${escapeHtml(name)} — fictional demo persona">${escapeHtml(initials)}</span>`,
    )
    .join("");
  const extra = team.length - visible.length;
  return `${avatars}${extra > 0 ? `<span class="avatar-stack__more">+${extra}</span>` : ""}`;
}

function projectCard(project, index) {
  const saved = state.saved.has(project.id);
  const statusClass = project.status === "Needs an advisor" ? " project-status--advisor" : "";
  const visibleTags = [...project.schools.slice(0, 1), ...project.tags.slice(0, 2)];
  return `
    <article class="project-card" data-project-id="${project.id}">
      <div
        class="project-card__art"
        style="--art-bg: ${project.artBg}; --art-accent: ${project.artAccent}; --art-ink: ${project.artInk}"
      >
        <span class="project-card__art-symbol">
          ${escapeHtml(project.short)}
          <small>${escapeHtml(project.challenge)}</small>
        </span>
        <span class="project-card__index">DEMO ${String(index + 1).padStart(2, "0")}</span>
        <button
          class="bookmark-button${saved ? " is-saved" : ""}"
          type="button"
          data-bookmark="${project.id}"
          aria-label="${saved ? "Remove" : "Save"} ${escapeHtml(project.name)}"
          aria-pressed="${saved}"
        >
          ${svg(iconPaths.bookmark)}
        </button>
      </div>
      <div class="project-card__body">
        <div class="project-card__status-row">
          <span class="project-status${statusClass}">${escapeHtml(project.status)}</span>
          <span class="project-card__challenge">${escapeHtml(project.challenge)}</span>
        </div>
        <h3>${escapeHtml(project.name)}</h3>
        <p class="project-card__pitch">${escapeHtml(project.pitch)}</p>
        <div class="tag-row">
          ${visibleTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="project-card__team">
          <div class="avatar-stack" aria-label="${project.team.length} fictional team members">
            ${initialsStack(project.team)}
          </div>
          <span class="team-copy">
            <strong>${project.team.length} on the demo team</strong>
            <span>${project.seats} ${project.seats === 1 ? "role" : "roles"} open</span>
          </span>
        </div>
        <div class="project-card__footer">
          <span class="project-card__commitment">
            ${svg(iconPaths.clock)}
            ${escapeHtml(project.commitmentLabel)}
          </span>
          <button class="view-project" type="button" data-open-project="${project.id}">
            View project
            ${svg(iconPaths.arrow)}
          </button>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProjects() {
  const normalizedSearch = state.search.trim().toLocaleLowerCase();
  const filtered = projects.filter((project) => {
    const haystack = [
      project.name,
      project.pitch,
      project.description,
      project.challenge,
      ...project.schools,
      ...project.tags,
      ...project.roles,
    ]
      .join(" ")
      .toLocaleLowerCase();

    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    const matchesAvailability =
      state.availability === "all" || project.status === state.availability;
    const matchesCommitment =
      state.commitment === "all" || project.commitment === state.commitment;
    const matchesExperience =
      state.experience === "all" || project.experience.includes(state.experience);
    const matchesSaved = !state.savedOnly || state.saved.has(project.id);

    return (
      matchesSearch &&
      matchesAvailability &&
      matchesCommitment &&
      matchesExperience &&
      matchesSaved
    );
  });

  return filtered.sort((a, b) => {
    if (state.sort === "openings") return b.seats - a.seats;
    if (state.sort === "newest") return b.created - a.created;
    if (state.sort === "alphabetical") return a.name.localeCompare(b.name);
    return b.recommendation - a.recommendation;
  });
}

function renderProjects() {
  const filtered = getFilteredProjects();
  projectGrid.innerHTML = filtered.map(projectCard).join("");
  resultCount.textContent = String(filtered.length);
  projectGrid.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length !== 0;
  savedButton.classList.toggle("is-active", state.savedOnly);
  savedButton.setAttribute("aria-pressed", String(state.savedOnly));
  savedButton.title = state.savedOnly ? "Showing saved projects" : "View saved projects";
  updateFilterCount();
}

function renderChallenges() {
  challengeGrid.innerHTML = challenges
    .map((challenge, index) => {
      const projectCount = projects.filter((project) => project.challengeId === challenge.id).length;
      return `
        <article
          class="challenge-card"
          style="--challenge-color: ${challenge.color}; --challenge-soft: ${challenge.soft}"
        >
          <div class="challenge-card__top">
            <span class="challenge-card__index">CHALLENGE ${String(index + 1).padStart(2, "0")}</span>
            <span class="challenge-card__icon">${svg(iconPaths[challenge.icon])}</span>
          </div>
          <h3>${escapeHtml(challenge.name)}</h3>
          <p>${escapeHtml(challenge.description)}</p>
          <button
            class="challenge-card__footer"
            type="button"
            data-challenge="${challenge.id}"
            aria-label="Show ${escapeHtml(challenge.name)} projects"
          >
            ${projectCount} ${projectCount === 1 ? "demo project" : "demo projects"} · ${escapeHtml(challenge.focus)}
          </button>
        </article>
      `;
    })
    .join("");
}

function updateFilterCount() {
  const active = ["availability", "commitment", "experience"].filter(
    (key) => state[key] !== "all",
  ).length;
  filterCount.hidden = active === 0;
  filterCount.textContent = String(active);
}

function clearFilters() {
  state.search = "";
  state.availability = "all";
  state.commitment = "all";
  state.experience = "all";
  state.savedOnly = false;
  searchInput.value = "";
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.classList.toggle("is-selected", chip.dataset.value === "all");
    });
  });
  renderProjects();
}

function toggleBookmark(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;

  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast(`${project.name} removed from saved projects.`);
  } else {
    state.saved.add(id);
    showToast(`${project.name} saved for later.`);
  }
  persistSavedProjects();
  updateSavedCount();
  renderProjects();
}

function updateSavedCount() {
  savedCount.textContent = String(state.saved.size);
  savedCount.classList.toggle("has-items", state.saved.size > 0);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.querySelector("span").textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function drawerMarkup(project) {
  const statusClass = project.status === "Needs an advisor" ? " project-status--advisor" : "";
  return `
    <div
      class="drawer-hero"
      style="--art-bg: ${project.artBg}; --art-accent: ${project.artAccent}; --art-ink: ${project.artInk}"
    >
      <span class="project-status${statusClass}">${escapeHtml(project.status)}</span>
      <h2 id="drawer-title">${escapeHtml(project.name)}</h2>
      <p>${escapeHtml(project.challenge)}</p>
    </div>
    <div class="drawer-body">
      <p class="drawer-pitch">${escapeHtml(project.description)}</p>
      <div class="tag-row">
        ${[...project.schools, ...project.tags]
          .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
          .join("")}
      </div>
      <section class="drawer-section">
        <h3>The weekend-sized outcome</h3>
        <dl class="drawer-facts">
          <div><dt>Prototype</dt><dd>${escapeHtml(project.outcome)}</dd></div>
          <div><dt>Current stage</dt><dd>${escapeHtml(project.stage)}</dd></div>
          <div><dt>Time</dt><dd>${escapeHtml(project.commitmentLabel)}</dd></div>
          <div><dt>Participation</dt><dd>${escapeHtml(project.mode)}</dd></div>
        </dl>
      </section>
      <section class="drawer-section">
        <h3>Roles the team is looking for</h3>
        <div class="role-list">
          ${project.roles
            .map(
              (role, index) => `
                <div class="role-item">
                  <strong>${escapeHtml(role)}</strong>
                  <span>${index < project.seats ? "Open" : "Interest welcome"}</span>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="drawer-section">
        <h3>Fictional demo team</h3>
        <div class="team-list">
          ${project.team
            .map(
              ([initials, name, role, color]) => `
                <div class="team-person">
                  <span class="team-person__avatar" style="--avatar: ${color}">${escapeHtml(initials)}</span>
                  <span>
                    <strong>${escapeHtml(name)}</strong>
                    <span>${escapeHtml(role)}</span>
                  </span>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <div class="drawer-disclaimer">
        ${svg(
          '<path d="M12 3 3 20h18L12 3Z" /><path d="M12 9v5M12 17.5v.5" />',
        )}
        <span>This is a fictional project with synthetic people and affiliations, created only to demonstrate the experience.</span>
      </div>
      <div class="drawer-actions">
        <button class="button button--primary drawer-join" type="button" data-project-name="${escapeHtml(project.name)}">
          Request to join — demo
        </button>
        <button class="button button--secondary drawer-save" type="button" data-bookmark="${project.id}">
          ${state.saved.has(project.id) ? "Saved" : "Save project"}
        </button>
      </div>
    </div>
  `;
}

function openDrawer(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;

  lastFocusedElement = document.activeElement;
  drawerContent.innerHTML = drawerMarkup(project);
  drawerBackdrop.hidden = false;
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  window.requestAnimationFrame(() => {
    drawer.classList.add("is-open");
    drawerBackdrop.classList.add("is-visible");
    drawer.querySelector(".drawer-close").focus();
  });
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawerBackdrop.classList.remove("is-visible");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    drawerBackdrop.hidden = true;
    drawerContent.innerHTML = "";
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }, 250);
}

function openModal(modal) {
  if (!modal || modal.open) return;
  lastFocusedElement = document.activeElement;
  modal.showModal();
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeModal(modal) {
  if (!modal?.open) return;
  modal.close();
  document.body.classList.remove("modal-open");
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function handleMatchmaker(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const intent = formData.get("intent");
  const theme = formData.get("theme");
  const suggestions = {
    people: "first-week",
    systems: "lab-link",
    future: "city-pulse",
  };
  const roleCopy = {
    make: "Join a focused build team",
    understand: "Lead discovery and research",
    guide: "Offer a short advisor session",
  };
  const project = projects.find((item) => item.id === suggestions[theme]);
  const result = document.querySelector("#match-result");
  result.innerHTML = `
    <span class="match-result__label">Suggested starting point</span>
    <h3>${escapeHtml(roleCopy[intent])}</h3>
    <p>Try <strong>${escapeHtml(project.name)}</strong>. Its team mix and weekend outcome are a good fit for the interests you selected.</p>
    <button class="button button--primary match-project-button" type="button" data-project-id="${project.id}">
      Explore this demo project
      ${svg(iconPaths.arrow)}
    </button>
  `;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setActiveNav() {
  const sections = [...document.querySelectorAll(".section-anchor")];
  const links = [...document.querySelectorAll(".nav-link")];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.4] },
  );
  sections.forEach((section) => observer.observe(section));
}

function showProjectsForChallenge(challengeId) {
  const challenge = challenges.find((item) => item.id === challengeId);
  if (!challenge) return;
  clearFilters();
  state.search = challenge.name;
  searchInput.value = challenge.name;
  renderProjects();
  document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
}

filterToggle.addEventListener("click", () => {
  const open = filterPanel.classList.toggle("is-open");
  filterToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;
    group.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("is-selected"));
    chip.classList.add("is-selected");
    state[group.dataset.filterGroup] = chip.dataset.value;
    state.savedOnly = false;
    renderProjects();
  });
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  state.savedOnly = false;
  renderProjects();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProjects();
});

document.querySelector(".quick-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-query]");
  if (!button) return;
  state.search = button.dataset.query;
  state.savedOnly = false;
  searchInput.value = button.dataset.query;
  renderProjects();
});

document.querySelector(".clear-filters").addEventListener("click", clearFilters);

projectGrid.addEventListener("click", (event) => {
  const bookmark = event.target.closest("[data-bookmark]");
  if (bookmark) {
    toggleBookmark(bookmark.dataset.bookmark);
    return;
  }
  const projectButton = event.target.closest("[data-open-project]");
  if (projectButton) openDrawer(projectButton.dataset.openProject);
});

challengeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-challenge]");
  if (button) showProjectsForChallenge(button.dataset.challenge);
});

savedButton.addEventListener("click", () => {
  if (state.saved.size === 0) {
    showToast("Save a demo project first, then return here to see it.");
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
    return;
  }
  clearFilters();
  state.savedOnly = true;
  renderProjects();
  document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  showToast(`Showing ${state.saved.size} saved demo ${state.saved.size === 1 ? "project" : "projects"}.`);
});

drawer.querySelector(".drawer-close").addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
drawer.addEventListener("click", (event) => {
  const bookmark = event.target.closest("[data-bookmark]");
  if (bookmark) {
    toggleBookmark(bookmark.dataset.bookmark);
    const project = projects.find((item) => item.id === bookmark.dataset.bookmark);
    if (project) drawerContent.innerHTML = drawerMarkup(project);
    return;
  }
  const join = event.target.closest(".drawer-join");
  if (join) {
    showToast(`Preview only — no request was sent to ${join.dataset.projectName}.`);
  }
});

document.querySelectorAll(".open-matchmaker").forEach((button) => {
  button.addEventListener("click", () => openModal(document.querySelector("#matchmaker-modal")));
});

document
  .querySelector(".create-preview-button")
  .addEventListener("click", () => openModal(document.querySelector("#brief-modal")));
document
  .querySelector(".advisor-preview-button")
  .addEventListener("click", () => openModal(document.querySelector("#advisor-modal")));
document.querySelectorAll(".privacy-button").forEach((button) => {
  button.addEventListener("click", () => openModal(document.querySelector("#privacy-modal")));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.querySelector(".modal-close").addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
  modal.addEventListener("close", () => {
    document.body.classList.toggle("modal-open", Boolean(document.querySelector(".modal[open]")));
  });
});

document.querySelector("#matchmaker-form").addEventListener("submit", handleMatchmaker);
document.querySelector("#match-result").addEventListener("click", (event) => {
  const button = event.target.closest(".match-project-button");
  if (!button) return;
  closeModal(document.querySelector("#matchmaker-modal"));
  window.setTimeout(() => openDrawer(button.dataset.projectId), 80);
});

const mobileMenuButton = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar");
mobileMenuButton.addEventListener("click", () => {
  const open = sidebar.classList.toggle("is-open");
  mobileMenuButton.setAttribute("aria-expanded", String(open));
});
sidebar.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-link") || window.innerWidth > 1180) return;
  sidebar.classList.remove("is-open");
  mobileMenuButton.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  }
  if (event.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
});

loadSavedProjects();
updateSavedCount();
renderProjects();
renderChallenges();
setActiveNav();

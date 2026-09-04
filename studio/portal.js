(function initializePortal() {
const portalData = window.VioletLabData;

if (!portalData) {
  throw new Error("The shared synthetic project data could not be loaded.");
}

const { projects, challenges } = portalData;
const portalView = document.querySelector("#portal-view");
const breadcrumbs = document.querySelector("#breadcrumbs");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogContent = document.querySelector("#project-dialog-content");
const createDialog = document.querySelector("#create-dialog");
const portalSidebar = document.querySelector("#portal-sidebar");
const mobileNavButton = document.querySelector(".mobile-nav-button");
const mobileNavBackdrop = document.querySelector(".mobile-nav-backdrop");
const portalToast = document.querySelector(".portal-toast");
let toastTimer;

const iconPaths = {
  arrow: '<path d="m9 18 6-6-6-6" />',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="1" /><path d="M8 3v5M16 3v5M4 10h16" />',
  check: '<path d="m4 12 5 5L20 6" />',
  chevron: '<path d="m8 5 7 7-7 7" />',
  clock: '<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />',
  comment: '<path d="M4 5h16v11H9l-5 4V5Z" />',
  filter: '<path d="M4 6h16M7 12h10M10 18h4" />',
  heart: '<path d="M20 8.5C20 14 12 20 12 20S4 14 4 8.5C4 5.5 6 4 8.5 4c1.5 0 2.8.8 3.5 2 .7-1.2 2-2 3.5-2C18 4 20 5.5 20 8.5Z" />',
  info: '<circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" />',
  plus: '<path d="M12 4v16M4 12h16" />',
  search: '<circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />',
  bookmark: '<path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21L12 17.6 6.5 21V4.8Z" />',
  route:
    '<circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h3a3 3 0 0 1 3 3v6M11 18H8a3 3 0 0 1-3-3V9" />',
  access:
    '<circle cx="12" cy="5" r="2" /><path d="M5 9h14M12 9v5M8 21l4-7 4 7" />',
  leaf: '<path d="M20 4C10 4 5 9 5 16c4 1 12 0 15-12Z" /><path d="M4 21c3-7 7-10 13-13" />',
  nodes:
    '<circle cx="6" cy="7" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="m8 8 3 7M16 8l-3 7M8.5 7h7" />',
  compass:
    '<circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" />',
  document: '<path d="M6 3h9l3 3v15H6zM15 3v4h4M9 11h6M9 15h6" />',
  person:
    '<circle cx="9" cy="8" r="3" /><path d="M3 19c.6-3.2 2.4-5 6-5s5.4 1.8 6 5M17 6a3 3 0 0 1 0 5M17 14c2.4.2 3.7 1.7 4 4" />',
  warning: '<path d="M12 3 3 20h18L12 3Z" /><path d="M12 9v5M12 17.5v.5" />',
};

const svg = (path, className = "") =>
  `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;

const state = {
  route: "overview",
  projectSearch: "",
  projectFilter: "all",
  projectSort: "recommended",
  filterOpen: false,
  saved: new Set(),
};

const routeMeta = {
  overview: ["Overview", "About Page"],
  participate: ["Overview", "How to Participate"],
  guide: ["Overview", "Meet Nova"],
  rules: ["Overview", "Additional Info"],
  schedule: ["Overview", "Schedule"],
  challenges: ["Challenges", "University Challenges"],
  topics: ["Challenges", "Topic Challenges"],
  projects: ["Submissions", "Projects"],
  ideas: ["Submissions", "Ideas"],
  people: ["Registrants", "Hackers"],
  advisors: ["Registrants", "Advisors"],
};

const challengeVisuals = {
  belonging: ["#59348a", "#2f1553", "#b3ec6d", "route"],
  learning: ["#24639a", "#163e68", "#8ddbf2", "access"],
  health: ["#9c4660", "#612439", "#ffbaa5", "heart"],
  climate: ["#39805d", "#1c5138", "#b6e37a", "leaf"],
  "public-ai": ["#ae621d", "#6d3712", "#ffce74", "nodes"],
  discovery: ["#4b50ac", "#282a70", "#9db0ff", "compass"],
};

const sponsors = [
  [
    ["DR", "Dr. Rowan Ellis", "#315f9f"],
    ["JM", "Jordan Miles", "#7a4ca0"],
  ],
  [
    ["AK", "Avery Kim", "#297a62"],
    ["SP", "Sasha Patel", "#9c4660"],
  ],
  [["MC", "Morgan Chen", "#7a4ca0"]],
  [
    ["RL", "Riley Lee", "#ae621d"],
    ["NO", "Noor Okafor", "#315f9f"],
  ],
  [["TG", "Taylor Green", "#39805d"]],
  [
    ["CS", "Casey Singh", "#4b50ac"],
    ["AE", "Alexis Evans", "#9c4660"],
  ],
];

const ideas = [
  {
    title: "One Good Handoff",
    description: "A common template for transferring context between student-facing teams without adding another system.",
    theme: "Operations",
    responses: 7,
  },
  {
    title: "Office Hours Exchange",
    description: "A cross-school calendar for offering one hour of specialized help to another project team.",
    theme: "Collaboration",
    responses: 11,
  },
  {
    title: "Plain Language Pass",
    description: "A guided review that helps campus forms and instructions become easier to understand.",
    theme: "Accessibility",
    responses: 9,
  },
  {
    title: "Reusable Research Consent",
    description: "A learning kit for discussing responsible consent choices before a student prototype collects data.",
    theme: "Responsible design",
    responses: 4,
  },
  {
    title: "Studio Leftovers",
    description: "A matchmaking board for safe, reusable creative materials after productions and exhibitions close.",
    theme: "Climate",
    responses: 13,
  },
  {
    title: "The Quiet Fifteen",
    description: "A small ritual for making hybrid meetings easier to enter for people joining from different contexts.",
    theme: "Belonging",
    responses: 6,
  },
  {
    title: "Public Data Story Cards",
    description: "Prompts that help teams turn a complex city dataset into a clear question and an honest caveat.",
    theme: "Public interest",
    responses: 8,
  },
  {
    title: "Prototype Aftercare",
    description: "A close-out checklist for documenting, archiving, and responsibly retiring weekend experiments.",
    theme: "Practice",
    responses: 5,
  },
];

const advisorProfiles = [
  ["DM", "Dr. Devon Miller", "Learning science", "Faculty advisor", "#ffc857"],
  ["JR", "Jamie Reed", "Service operations", "Staff advisor", "#a9efd8"],
  ["SL", "Sage Lewis", "Accessibility practice", "Community advisor", "#bfc8ff"],
  ["AP", "Ari Parker", "Responsible AI", "Faculty advisor", "#ffb3a4"],
  ["KC", "Kai Campbell", "Research methods", "Staff advisor", "#d2a7e8"],
  ["MN", "Milan Nguyen", "Creative technology", "Alumni advisor", "#a9efd8"],
  ["RW", "River Walker", "Public-interest design", "Faculty advisor", "#ffc857"],
  ["TE", "Tatum Ellis", "Climate strategy", "Staff advisor", "#bfc8ff"],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadPortalSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem("nyu-hack-portal-saved") || "[]");
    state.saved = new Set(Array.isArray(saved) ? saved : []);
  } catch (error) {
    console.warn("Saved project preferences could not be restored.", error);
  }
}

function savePortalSaved() {
  try {
    localStorage.setItem("nyu-hack-portal-saved", JSON.stringify([...state.saved]));
  } catch (error) {
    console.warn("Saved project preferences could not be stored.", error);
  }
}

function syntheticNote() {
  return `
    <span class="synthetic-note">
      ${svg(iconPaths.info)}
      Fictional preview data
    </span>
  `;
}

function pageHeading(title, description) {
  return `
    <header class="page-heading">
      <div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
      </div>
      ${syntheticNote()}
    </header>
  `;
}

function initialsStack(team, max = 4) {
  return team
    .slice(0, max)
    .map(
      ([initials, name, , color]) =>
        `<span class="portal-avatar" style="--avatar:${color}" title="${escapeHtml(name)} — fictional">${escapeHtml(initials)}</span>`,
    )
    .join("");
}

function overviewTemplate() {
  return `
    <div class="overview-view">
      <section class="event-hero">
        <div class="event-hero__content">
          <span class="event-date">
            ${svg(iconPaths.calendar)}
            Preview dates: April 9–11, 2027
          </span>
          <h1>NYU University<br />Hackathon Preview 2027</h1>
          <p class="event-hero__subtitle">
            One collaborative weekend for students, faculty, and staff across every NYU school and global site.
          </p>
          <div class="event-hero__actions">
            <button class="portal-button portal-button--registered" type="button" data-demo-action="registration">
              ${svg(iconPaths.check)}
              You’re registered
            </button>
            <button class="portal-button portal-button--secondary" type="button" data-open-create>
              ${svg(iconPaths.plus)}
              Create
            </button>
          </div>
          <div class="event-metrics" aria-label="Illustrative event metrics">
            <div><strong>428</strong><span>registrants</span></div>
            <div><strong>12</strong><span>demo projects</span></div>
            <div><strong>8</strong><span>idea sparks</span></div>
          </div>
        </div>
        <div class="event-hero__art" aria-label="Abstract hackathon graphic">
          <span class="hero-chevron-row" aria-hidden="true">› › › › ›</span>
          <small>Cross-school · cross-discipline</small>
          <strong>&gt;build<br />together_</strong>
          <p>A synthetic look at what a university-wide hacking experience could feel like.</p>
        </div>
      </section>

      <div class="overview-body">
        <div class="overview-main">
          <section class="overview-section">
            <h2>Welcome to the University Hackathon Preview</h2>
            <p>
              Explore how an internal hackathon portal could make it easier to find a problem, understand the commitment,
              meet a cross-school team, and turn an idea into a useful prototype.
            </p>
            <div class="quick-start-grid">
              <article class="quick-start-card">
                <span class="quick-start-card__icon">${svg(iconPaths.document)}</span>
                <h3>Browse projects</h3>
                <p>See the kinds of teams, skills, and weekend outcomes represented.</p>
                <button type="button" data-navigate="projects">Explore projects ${svg(iconPaths.arrow)}</button>
              </article>
              <article class="quick-start-card">
                <span class="quick-start-card__icon">${svg(iconPaths.compass)}</span>
                <h3>Find a challenge</h3>
                <p>Start with a shared university problem rather than a specific technology.</p>
                <button type="button" data-navigate="challenges">View challenges ${svg(iconPaths.arrow)}</button>
              </article>
              <article class="quick-start-card">
                <span class="quick-start-card__icon">${svg(iconPaths.person)}</span>
                <h3>Choose a role</h3>
                <p>Create, join, or advise—even if you have never participated before.</p>
                <button type="button" data-navigate="participate">How to participate ${svg(iconPaths.arrow)}</button>
              </article>
            </div>
          </section>

          <section class="overview-section">
            <h2>What counts as a project?</h2>
            <p>
              A prototype can be an interface, a service, a research method, a creative work, a policy tool,
              or a better process. The goal is to learn something concrete and make the next step visible.
            </p>
            <button class="portal-button portal-button--primary" type="button" data-navigate="projects">
              See 12 fictional examples
              ${svg(iconPaths.arrow)}
            </button>
          </section>
        </div>

        <aside class="overview-aside">
          <section class="info-panel">
            <h3>At a glance</h3>
            <ul>
              <li>Open to NYU students, faculty, and staff in this concept</li>
              <li>Hybrid participation across campuses and global sites</li>
              <li>No-code and nontechnical projects are welcome</li>
              <li>Every team documents privacy, access, and community impact</li>
            </ul>
          </section>
          <section class="info-panel info-panel--nova">
            <span class="nova-avatar" aria-hidden="true">N</span>
            <h3>Meet Nova</h3>
            <p>A fictional guide for finding roles, projects, and the right next step in this preview.</p>
            <button type="button" data-navigate="guide">See what Nova could do →</button>
          </section>
        </aside>
      </div>
    </div>
  `;
}

function filteredProjects() {
  const query = state.projectSearch.trim().toLocaleLowerCase();
  const filtered = projects.filter((project) => {
    const haystack = [
      project.name,
      project.pitch,
      project.challenge,
      ...project.tags,
      ...project.schools,
      ...project.roles,
    ]
      .join(" ")
      .toLocaleLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesFilter =
      state.projectFilter === "all" ||
      (state.projectFilter === "join" && project.status === "Open to join") ||
      (state.projectFilter === "advise" && project.status === "Needs an advisor") ||
      (state.projectFilter === "no-code" && project.experience.includes("No code needed")) ||
      (state.projectFilter === "light" && project.commitment === "Light") ||
      (state.projectFilter === "saved" && state.saved.has(project.id));
    return matchesQuery && matchesFilter;
  });

  return filtered.sort((a, b) => {
    if (state.projectSort === "openings") return b.seats - a.seats;
    if (state.projectSort === "alphabetical") return a.name.localeCompare(b.name);
    return b.recommendation - a.recommendation;
  });
}

function projectCard(project, index) {
  const saved = state.saved.has(project.id);
  const statusClass = project.status === "Needs an advisor" ? " card-status--advisor" : "";
  return `
    <article class="portal-project-card">
      <div
        class="portal-project-card__art"
        style="--art-bg:${project.artBg};--art-accent:${project.artAccent};--art-ink:${project.artInk}"
      >
        <span class="portal-project-card__symbol">
          ${escapeHtml(project.short)}
          <small>${escapeHtml(project.challenge)}</small>
        </span>
        <button
          class="project-bookmark${saved ? " is-saved" : ""}"
          type="button"
          data-bookmark="${project.id}"
          aria-label="${saved ? "Remove" : "Save"} ${escapeHtml(project.name)}"
          aria-pressed="${saved}"
        >
          ${svg(iconPaths.bookmark)}
        </button>
      </div>
      <div class="portal-project-card__body">
        <div class="card-status-row">
          <span class="card-status${statusClass}">${escapeHtml(project.status)}</span>
          <span class="card-challenge">Demo ${String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2>${escapeHtml(project.name)}</h2>
        <p class="portal-project-card__pitch">${escapeHtml(project.pitch)}</p>
        <div class="portal-tags">
          ${[project.schools[0], ...project.tags.slice(0, 2)]
            .map((tag) => `<span class="portal-tag">${escapeHtml(tag)}</span>`)
            .join("")}
        </div>
        <div class="portal-team">
          <div class="portal-avatars" aria-label="${project.team.length} fictional team members">
            ${initialsStack(project.team)}
          </div>
          <span class="portal-team-copy">
            <strong>${project.team.length} on the demo team</strong>
            <span>${project.seats} ${project.seats === 1 ? "role" : "roles"} open</span>
          </span>
        </div>
        <footer class="portal-project-card__footer">
          <span class="card-social">
            <span>${svg(iconPaths.heart)} ${index % 4}</span>
            <span>${svg(iconPaths.comment)} ${(index + 1) % 3}</span>
          </span>
          <button class="join-button" type="button" data-view-project="${project.id}">
            ${svg(iconPaths.plus)}
            View project
          </button>
        </footer>
      </div>
    </article>
  `;
}

function projectsTemplate() {
  const filtered = filteredProjects();
  const activeFilterCount = state.projectFilter === "all" ? 0 : 1;
  return `
    <div class="view-container">
      ${pageHeading(
        `Projects (${projects.length})`,
        "Projects are the primary unit of hacking activity. Open a project to see its fictional team, scope, roles, and weekend outcome.",
      )}
      <div class="project-tools">
        <div class="portal-search-row">
          <label class="portal-search">
            ${svg(iconPaths.search)}
            <span class="portal-visually-hidden">Search projects</span>
            <input
              id="portal-project-search"
              type="search"
              value="${escapeHtml(state.projectSearch)}"
              placeholder="Search projects, schools, challenges, or skills"
              autocomplete="off"
            />
          </label>
          <button class="portal-filter-button" type="button" data-toggle-filters aria-expanded="${state.filterOpen}">
            ${svg(iconPaths.filter)}
            Filters
            ${activeFilterCount ? `<span>${activeFilterCount}</span>` : ""}
          </button>
          <button class="clear-search-button" type="button" data-clear-projects>Clear all</button>
        </div>
        <div class="portal-filter-panel${state.filterOpen ? " is-open" : ""}">
          ${[
            ["all", "All projects"],
            ["join", "Open to join"],
            ["advise", "Needs an advisor"],
            ["no-code", "No code needed"],
            ["light", "A few hours"],
            ["saved", `Saved (${state.saved.size})`],
          ]
            .map(
              ([value, label]) => `
                <button
                  class="portal-filter-chip${state.projectFilter === value ? " is-active" : ""}"
                  type="button"
                  data-project-filter="${value}"
                >
                  ${escapeHtml(label)}
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="project-result-bar">
        <p><strong>${filtered.length}</strong> fictional ${filtered.length === 1 ? "project" : "projects"} shown</p>
        <label>
          Sort
          <select id="portal-project-sort">
            <option value="recommended"${state.projectSort === "recommended" ? " selected" : ""}>Recommended</option>
            <option value="openings"${state.projectSort === "openings" ? " selected" : ""}>Most open roles</option>
            <option value="alphabetical"${state.projectSort === "alphabetical" ? " selected" : ""}>A–Z</option>
          </select>
        </label>
      </div>
      ${
        filtered.length
          ? `<div class="portal-project-grid">${filtered.map(projectCard).join("")}</div>`
          : `
            <div class="portal-empty-state">
              <h2>No demo projects match that view.</h2>
              <p>Try another phrase or clear the selected filter.</p>
              <button class="portal-button portal-button--secondary" type="button" data-clear-projects>Clear all</button>
            </div>
          `
      }
    </div>
  `;
}

function challengesTemplate(title = "University Challenges", description = null) {
  return `
    <div class="view-container">
      ${pageHeading(
        title,
        description ||
          "Challenge areas create common ground for teams without prescribing a technology or a single right solution.",
      )}
      <div class="challenge-grid">
        ${challenges
          .map((challenge, index) => {
            const visual = challengeVisuals[challenge.id];
            const related = projects.filter((project) => project.challengeId === challenge.id).length;
            return `
              <article class="portal-challenge-card">
                <div
                  class="challenge-art"
                  style="--challenge-color:${visual[0]};--challenge-dark:${visual[1]};--challenge-accent:${visual[2]}"
                >
                  <span class="challenge-art__icon">${svg(iconPaths[visual[3]])}</span>
                  <button
                    class="challenge-menu"
                    type="button"
                    data-demo-action="challenge-menu"
                    aria-label="More options for ${escapeHtml(challenge.name)}"
                  >•••</button>
                </div>
                <div class="challenge-card-body">
                  <h2>${escapeHtml(challenge.name)}</h2>
                  <p>${escapeHtml(challenge.description)}</p>
                  <div class="challenge-sponsors">
                    <span>Fictional challenge stewards · ${related} demo ${related === 1 ? "project" : "projects"}</span>
                    <div class="sponsor-row">
                      ${sponsors[index]
                        .map(
                          ([initials, name, color]) => `
                            <span class="sponsor">
                              <i style="--sponsor-color:${color}">${initials}</i>
                              <span>${escapeHtml(name)}</span>
                            </span>
                          `,
                        )
                        .join("")}
                    </div>
                  </div>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function participateTemplate() {
  return `
    <div class="view-container">
      <div class="content-page">
        <article class="article-content">
          <h1>How to Participate</h1>
          <p>
            There are several ways to participate in this fictional university hackathon.
            You can create, join, or advise—and you can combine roles as your availability allows.
          </p>
          <section class="article-section">
            <h2>1. Register your interests</h2>
            <p>Choose the skills, topics, working style, and time commitment you want teams to see.</p>
            <div class="role-table">
              <div><strong>Hacker</strong><span>Create projects and ideas, or request to join an open team.</span></div>
              <div><strong>Advisor</strong><span>Offer focused guidance, feedback, or domain context to project teams.</span></div>
              <div><strong>Both</strong><span>Build with one team and offer limited office hours to others.</span></div>
            </div>
          </section>
          <section class="article-section">
            <h2>2. Find a project or share an idea</h2>
            <ul>
              <li>Browse projects by challenge, role, school mix, and time commitment.</li>
              <li>Request to join with a short introduction—this is not a job application.</li>
              <li>Share an idea if you have a useful problem but cannot lead a team.</li>
              <li>Use clear, inclusive role descriptions so first-time hackers know where they fit.</li>
            </ul>
          </section>
          <section class="article-section">
            <h2>3. Build in small loops</h2>
            <p>
              Frame the problem on Friday, prototype and test on Saturday, then share the signal on Sunday:
              what changed, what you learned, and the next smallest step worth taking.
            </p>
          </section>
          <section class="article-section">
            <h2>4. Share the outcome</h2>
            <p>
              A submission includes a short project summary, a two-minute walkthrough, and a responsible-design note.
              Code is optional. Clear learning is required.
            </p>
          </section>
        </article>
        <aside class="article-aside">
          <h2>Participation at a glance</h2>
          <dl>
            <div><dt>Who</dt><dd>Students, faculty, and staff in this concept</dd></div>
            <div><dt>Where</dt><dd>Hybrid across NYU campuses and global sites</dd></div>
            <div><dt>Time</dt><dd>A few focused hours or the full weekend</dd></div>
            <div><dt>Deliverable</dt><dd>A testable prototype and a short learning story</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  `;
}

function rulesTemplate() {
  return `
    <div class="view-container">
      <div class="content-page">
        <article class="article-content">
          <h1>Additional Info</h1>
          <div class="article-callout">
            This page is illustrative. Dates, policies, eligibility, submission requirements, and judging details
            would require official NYU review before a real event.
          </div>
          <section class="article-section">
            <h2>Basic principles</h2>
            <ul>
              <li>Participate only with data, tools, and materials you are authorized to use.</li>
              <li>Do not include confidential, sensitive, personal, clinical, or regulated information in a prototype.</li>
              <li>Design with affected communities and document assumptions, limitations, and possible harms.</li>
              <li>Make project materials accessible and provide a nontechnical explanation of the outcome.</li>
            </ul>
          </section>
          <section class="article-section">
            <h2>Projects</h2>
            <ul>
              <li>A project can be technical, creative, operational, research-oriented, or service-focused.</li>
              <li>Teams can start with a new idea or advance an existing, appropriately shareable concept.</li>
              <li>Participants may contribute to more than one project if expectations are clear.</li>
              <li>Every project identifies one weekend-sized outcome and a realistic next step.</li>
            </ul>
          </section>
          <section class="article-section">
            <h2>Review</h2>
            <p>
              Review would focus on usefulness, learning, inclusion, responsible practice, and the credibility of the next step—not polish alone.
            </p>
          </section>
        </article>
        <aside class="article-aside">
          <h2>Preview status</h2>
          <dl>
            <div><dt>Official policy</dt><dd>No—concept copy only</dd></div>
            <div><dt>Real submissions</dt><dd>None</dd></div>
            <div><dt>Real participants</dt><dd>None</dd></div>
            <div><dt>Source data</dt><dd>Excluded from this public site</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  `;
}

function scheduleTemplate() {
  const schedule = [
    ["Fri · 5:00 PM", "Welcome + team formation", "Meet people, confirm roles, and choose one specific weekend outcome."],
    ["Fri · 7:00 PM", "Problem framing studio", "Turn assumptions into questions and agree on who the project is for."],
    ["Sat · 9:00 AM", "Build rooms open", "Prototype in short loops with studios, makers, and advisors available."],
    ["Sat · 1:00 PM", "Practice and responsibility clinics", "Optional sessions on access, research, data, safety, and implementation."],
    ["Sat · 6:00 PM", "Cross-team test exchange", "Trade prototypes with another team and capture the most useful surprise."],
    ["Sun · 10:00 AM", "Story and demo studio", "Shape a two-minute explanation of the problem, prototype, learning, and next step."],
    ["Sun · 2:00 PM", "Community showcase", "Share work in themed galleries with peers, reviewers, and potential next-step partners."],
  ];
  return `
    <div class="view-container">
      ${pageHeading(
        "Illustrative Schedule",
        "A sample weekend rhythm designed to protect build time while offering optional moments for support and cross-team learning.",
      )}
      <div class="schedule-list">
        ${schedule
          .map(
            ([time, title, description]) => `
              <article class="schedule-item">
                <time>${escapeHtml(time)}</time>
                <div class="schedule-item__content">
                  <h2>${escapeHtml(title)}</h2>
                  <p>${escapeHtml(description)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function ideasTemplate() {
  return `
    <div class="view-container">
      ${pageHeading(
        `Ideas (${ideas.length})`,
        "Ideas are short, fictional sparks that another participant could pick up, combine, or turn into a weekend project.",
      )}
      <div class="idea-grid">
        ${ideas
          .map(
            (idea, index) => `
              <article class="idea-card">
                <div class="idea-card__top">
                  <span class="idea-number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="portal-tag">${escapeHtml(idea.theme)}</span>
                </div>
                <h2>${escapeHtml(idea.title)}</h2>
                <p>${escapeHtml(idea.description)}</p>
                <footer>
                  <span>${idea.responses} fictional responses</span>
                  <button class="clear-search-button" type="button" data-demo-action="idea">Explore idea</button>
                </footer>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function peopleTemplate(advisorsOnly = false) {
  const people = advisorsOnly
    ? advisorProfiles
    : projects
        .flatMap((project) =>
          project.team.map(([initials, name, role, color]) => [
            initials,
            name,
            role,
            project.name,
            color,
          ]),
        )
        .filter((person, index, list) => list.findIndex((candidate) => candidate[1] === person[1]) === index)
        .slice(0, 16);

  return `
    <div class="view-container">
      ${pageHeading(
        advisorsOnly ? "Advisors" : "Hackers",
        advisorsOnly
          ? "Fictional examples of focused expertise that teams might request during the weekend."
          : "A synthetic directory showing how people from different schools and roles could discover one another.",
      )}
      <div class="people-grid">
        ${people
          .map((person) => {
            const [initials, name, role, association, color] = person;
            return `
              <article class="person-card">
                <span class="person-card__avatar" style="--avatar:${color}">${escapeHtml(initials)}</span>
                <span class="person-card__copy">
                  <strong>${escapeHtml(name)}</strong>
                  <span>${escapeHtml(role)}</span>
                  <small>${escapeHtml(association)}</small>
                </span>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function guideTemplate() {
  return `
    <div class="view-container">
      <section class="nova-page">
        <div class="nova-visual">
          <span class="nova-visual__orb" aria-hidden="true">N</span>
          <h2>Nova</h2>
          <p>Fictional event guide</p>
        </div>
        <div class="nova-content">
          <h1>Meet Nova, a guide for finding your way in.</h1>
          <p>
            In this concept, Nova would help participants understand roles, discover relevant projects,
            and turn a broad interest into a practical next action—without exposing private project information.
          </p>
          <div class="nova-examples">
            <button type="button" data-nova="projects">
              “Show me projects where research skills would help.”
              ${svg(iconPaths.arrow)}
            </button>
            <button type="button" data-nova="no-code">
              “I have four hours and do not code. Where could I contribute?”
              ${svg(iconPaths.arrow)}
            </button>
            <button type="button" data-nova="advisor">
              “Which teams need an advisor in responsible design?”
              ${svg(iconPaths.arrow)}
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function topicsTemplate() {
  const topics = [
    ["Accessible by default", "Design access into the first sketch rather than adding it after the prototype works.", "accessibility"],
    ["AI with evidence", "Make provenance, evaluation, and human judgment visible in AI-assisted experiences.", "responsible AI"],
    ["The global handoff", "Reduce friction when work, learning, or care crosses time zones and contexts.", "global"],
    ["Small systems, real change", "Improve one recurring campus workflow with a focused and testable intervention.", "operations"],
    ["Creative tools for everyone", "Expand who can make, perform, publish, or participate in creative work.", "arts"],
    ["Climate in the everyday", "Turn routine choices into visible opportunities for lower impact and resilience.", "climate"],
  ];
  return `
    <div class="view-container">
      ${pageHeading(
        "Topic Challenges",
        "Optional cross-cutting lenses that can be combined with any university challenge or project format.",
      )}
      <div class="idea-grid">
        ${topics
          .map(
            ([title, description, query], index) => `
              <article class="idea-card">
                <div class="idea-card__top">
                  <span class="idea-number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="portal-tag">Topic challenge</span>
                </div>
                <h2>${escapeHtml(title)}</h2>
                <p>${escapeHtml(description)}</p>
                <footer>
                  <span>Optional lens</span>
                  <button class="clear-search-button" type="button" data-topic-query="${escapeHtml(query)}">Find related projects</button>
                </footer>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function projectDialogTemplate(project) {
  const statusClass = project.status === "Needs an advisor" ? " card-status--advisor" : "";
  return `
    <div
      class="project-dialog-hero"
      style="--art-bg:${project.artBg};--art-accent:${project.artAccent};--art-ink:${project.artInk}"
    >
      <span class="card-status${statusClass}">${escapeHtml(project.status)}</span>
      <h2 id="portal-project-dialog-title">${escapeHtml(project.name)}</h2>
      <p>${escapeHtml(project.challenge)}</p>
    </div>
    <div class="project-dialog-body">
      <p class="project-dialog-lede">${escapeHtml(project.description)}</p>
      <dl class="project-facts">
        <div><dt>Weekend outcome</dt><dd>${escapeHtml(project.outcome)}</dd></div>
        <div><dt>Current stage</dt><dd>${escapeHtml(project.stage)}</dd></div>
        <div><dt>Commitment</dt><dd>${escapeHtml(project.commitmentLabel)}</dd></div>
        <div><dt>Participation</dt><dd>${escapeHtml(project.mode)}</dd></div>
      </dl>
      <section class="dialog-section">
        <h3>Open roles</h3>
        <div class="open-role-list">
          ${project.roles.map((role) => `<span>${escapeHtml(role)}</span>`).join("")}
        </div>
      </section>
      <section class="dialog-section">
        <h3>Fictional project team</h3>
        <div class="project-dialog-team">
          ${project.team
            .map(
              ([initials, name, role, color]) => `
                <span class="dialog-person">
                  <i style="--avatar:${color}">${escapeHtml(initials)}</i>
                  <span>
                    <strong>${escapeHtml(name)}</strong>
                    <span>${escapeHtml(role)}</span>
                  </span>
                </span>
              `,
            )
            .join("")}
        </div>
      </section>
      <div class="project-dialog-actions">
        <button class="portal-button portal-button--primary" type="button" data-demo-action="join-request">
          ${svg(iconPaths.plus)}
          Request to join — demo
        </button>
        <button class="portal-button portal-button--secondary" type="button" data-dialog-bookmark="${project.id}">
          ${state.saved.has(project.id) ? "Saved" : "Save project"}
        </button>
      </div>
    </div>
  `;
}

function renderBreadcrumbs() {
  const [section, page] = routeMeta[state.route] || routeMeta.overview;
  breadcrumbs.innerHTML = `
    <span>${escapeHtml(section)}</span>
    ${svg(iconPaths.chevron)}
    <strong>${escapeHtml(page)}</strong>
  `;
}

function renderRoute() {
  const templates = {
    overview: overviewTemplate,
    participate: participateTemplate,
    guide: guideTemplate,
    rules: rulesTemplate,
    schedule: scheduleTemplate,
    challenges: challengesTemplate,
    topics: topicsTemplate,
    projects: projectsTemplate,
    ideas: ideasTemplate,
    people: () => peopleTemplate(false),
    advisors: () => peopleTemplate(true),
  };
  const template = templates[state.route] || templates.overview;
  portalView.innerHTML = template();
  renderBreadcrumbs();
  updateActiveNavigation();
  document.title = `${routeMeta[state.route]?.[1] || "About Page"} — NYU Hackathon Portal Concept`;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateActiveNavigation() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.route === state.route && button.classList.contains("portal-nav-link"),
    );
  });
}

function navigateTo(route) {
  if (!routeMeta[route]) route = "overview";
  state.route = route;
  history.replaceState(null, "", `#${route}`);
  renderRoute();
  closeMobileNav();
}

function openDialog(dialog) {
  if (dialog.open) return;
  dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.querySelector(".dialog-close")?.focus();
}

function closeDialog(dialog) {
  if (!dialog.open) return;
  dialog.close();
  document.body.classList.toggle("dialog-open", Boolean(document.querySelector("dialog[open]")));
}

function openProject(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  projectDialogContent.innerHTML = projectDialogTemplate(project);
  openDialog(projectDialog);
}

function toggleSaved(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast(`${project.name} removed from saved projects.`);
  } else {
    state.saved.add(id);
    showToast(`${project.name} saved locally in this browser.`);
  }
  savePortalSaved();
  if (state.route === "projects") renderRoute();
}

function showToast(message) {
  clearTimeout(toastTimer);
  portalToast.querySelector("span").textContent = message;
  portalToast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => portalToast.classList.remove("is-visible"), 3000);
}

function openMobileNav() {
  portalSidebar.classList.add("is-open");
  mobileNavBackdrop.hidden = false;
  mobileNavButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("mobile-nav-open");
}

function closeMobileNav() {
  portalSidebar.classList.remove("is-open");
  mobileNavBackdrop.hidden = true;
  mobileNavButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("mobile-nav-open");
}

document.querySelectorAll("[data-route], [data-route-link]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(control.dataset.route || control.dataset.routeLink);
  });
});

document.querySelectorAll(".nav-section__heading").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.nextElementSibling.hidden = expanded;
  });
});

document.querySelector(".create-button").addEventListener("click", () => openDialog(createDialog));

document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    document.body.classList.toggle("dialog-open", Boolean(document.querySelector("dialog[open]")));
  });
});

document.querySelectorAll("[data-create-type]").forEach((button) => {
  button.addEventListener("click", () => {
    closeDialog(createDialog);
    showToast(`Preview only — no ${button.dataset.createType} was created.`);
  });
});

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => showToast("Preview only — no account action was taken."));
});

mobileNavButton.addEventListener("click", () => {
  if (portalSidebar.classList.contains("is-open")) closeMobileNav();
  else openMobileNav();
});
mobileNavBackdrop.addEventListener("click", closeMobileNav);

portalView.addEventListener("click", (event) => {
  const navigateButton = event.target.closest("[data-navigate]");
  if (navigateButton) {
    navigateTo(navigateButton.dataset.navigate);
    return;
  }

  const createButton = event.target.closest("[data-open-create]");
  if (createButton) {
    openDialog(createDialog);
    return;
  }

  const projectButton = event.target.closest("[data-view-project]");
  if (projectButton) {
    openProject(projectButton.dataset.viewProject);
    return;
  }

  const bookmarkButton = event.target.closest("[data-bookmark]");
  if (bookmarkButton) {
    toggleSaved(bookmarkButton.dataset.bookmark);
    return;
  }

  const filterToggle = event.target.closest("[data-toggle-filters]");
  if (filterToggle) {
    state.filterOpen = !state.filterOpen;
    renderRoute();
    return;
  }

  const filterButton = event.target.closest("[data-project-filter]");
  if (filterButton) {
    state.projectFilter = filterButton.dataset.projectFilter;
    renderRoute();
    return;
  }

  if (event.target.closest("[data-clear-projects]")) {
    state.projectSearch = "";
    state.projectFilter = "all";
    renderRoute();
    return;
  }

  const topicButton = event.target.closest("[data-topic-query]");
  if (topicButton) {
    state.projectSearch = topicButton.dataset.topicQuery;
    state.projectFilter = "all";
    navigateTo("projects");
    return;
  }

  const novaButton = event.target.closest("[data-nova]");
  if (novaButton) {
    const type = novaButton.dataset.nova;
    state.projectSearch = type === "projects" ? "research" : "";
    state.projectFilter = type === "no-code" ? "no-code" : type === "advisor" ? "advise" : "all";
    navigateTo("projects");
    return;
  }

  if (event.target.closest("[data-demo-action]")) {
    showToast("Preview only — no information was sent or changed.");
  }
});

portalView.addEventListener("input", (event) => {
  if (event.target.id !== "portal-project-search") return;
  state.projectSearch = event.target.value;
  const cursor = event.target.selectionStart;
  renderRoute();
  const replacement = document.querySelector("#portal-project-search");
  replacement?.focus();
  replacement?.setSelectionRange(cursor, cursor);
});

portalView.addEventListener("change", (event) => {
  if (event.target.id !== "portal-project-sort") return;
  state.projectSort = event.target.value;
  renderRoute();
});

projectDialog.addEventListener("click", (event) => {
  const bookmarkButton = event.target.closest("[data-dialog-bookmark]");
  if (bookmarkButton) {
    const id = bookmarkButton.dataset.dialogBookmark;
    toggleSaved(id);
    const project = projects.find((item) => item.id === id);
    if (project) projectDialogContent.innerHTML = projectDialogTemplate(project);
    return;
  }
  if (event.target.closest("[data-demo-action]")) {
    showToast("Preview only — no join request was sent.");
  }
});

window.addEventListener("hashchange", () => {
  const route = location.hash.slice(1);
  if (routeMeta[route] && route !== state.route) {
    state.route = route;
    renderRoute();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portalSidebar.classList.contains("is-open")) closeMobileNav();
});

loadPortalSaved();
const initialRoute = location.hash.slice(1);
state.route = routeMeta[initialRoute] ? initialRoute : "overview";
renderRoute();
})();

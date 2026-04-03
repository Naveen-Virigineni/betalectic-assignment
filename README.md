# TaskFlow — Task Management App

A React-based task management application built as part of the Betalectic frontend assignment.

Live Demo: https://betalectic-assignment-theta.vercel.app

---

## How to Run

```bash
git clone https://github.com/Naveen-Virigineni/betalectic-assignment
cd betalectic-assignment
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## My Approach and Decisions

### Structure
I kept the component structure simple and focused. Each component has a single responsibility — `Header` handles search, `Stats` shows counts, `TaskCard` handles individual task interactions, and `Sidebar` shows the category breakdown. All the task logic is pulled out into a custom hook called `useTasks` so that `App.jsx` stays clean and only deals with rendering.

### Custom Hook — useTasks
The assignment required at least one custom hook, so I moved all task-related logic — adding, deleting, toggling, editing, and localStorage syncing — into `src/hooks/useTasks.js`. This made the code much easier to follow. If I wanted to change how tasks are stored or add new operations later, I only need to touch one file.

### Data Persistence
I used `localStorage` to persist tasks across page refreshes. Since the assignment is frontend-only with no backend requirement, this felt like the right call — it keeps the app self-contained and works without any setup. Two `useEffect` hooks handle this: one loads tasks when the app first opens, and the other saves tasks every time they change.

### Task Structure
Each task stores an id, title, description, status, category, and time. I kept the description as a default "No description" for now since the assignment didn't specify required fields — this is something that could easily be extended with an input field.

### Categories
I added four fixed categories — Work, Personal, Study, and Urgent. This satisfies the filtering/categorization bonus requirement and also feeds into the analytics chart in the sidebar, giving users a quick visual of how their tasks are distributed.

---

## Features

- Add tasks with a title and category
- Mark tasks as done or pending
- Edit the category of an existing task
- Delete tasks
- Search tasks by title, category, or description
- Analytics chart showing task count per category
- Data persists across page refreshes
- Responsive layout — chart moves below stats on mobile

---

## Assumptions and Trade-offs

**localStorage over a database** — Works well for a single-user frontend app. The downside is data is tied to the browser, so clearing browser storage will wipe tasks. For a multi-user or production app, this would need a proper backend.

**Fixed categories** — I went with four preset categories instead of letting users create their own. This keeps the UI simple and the chart meaningful. Custom categories would require more validation and UI work.

**No due dates or priorities** — I kept the task structure minimal to focus on getting the core CRUD interactions right. These would be natural next additions.

**Default description** — New tasks get "No description" as a placeholder. Ideally there would be an input for this, but I prioritized the core requirements first.

**Duplicate detection is title-based** — Two tasks with the same title (case-insensitive) are treated as duplicates. This is a reasonable assumption for this scope but might be too strict in some real-world cases.

---

## Tech Stack

- React 19
- Tailwind CSS v4
- Vite
- localStorage for data persistence
- lucide-react for icons
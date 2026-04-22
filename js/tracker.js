const calendar = document.getElementById("calendar");
const moodSelect = document.getElementById("mood");

const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

let selectedDay = null;

// ===== INIT MONTH & YEAR =====
const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

months.forEach((m, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.text = m;
  monthSelect.appendChild(option);
});

// years range
for (let y = 2020; y <= 2030; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.text = y;
  yearSelect.appendChild(option);
}

// set current date
const today = new Date();
monthSelect.value = today.getMonth();
yearSelect.value = today.getFullYear();

// ===== GET DAYS =====
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// ===== GENERATE CALENDAR =====
function generateCalendar() {
  calendar.innerHTML = ""; // clear previous

  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);

  const daysInMonth = getDaysInMonth(year, month);

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerText = i;

    day.addEventListener("click", () => {
      document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
      day.classList.add("selected");
      selectedDay = i;
    });

    // 🔑 unique key
    const key = `${year}-${month + 1}-${i}`;
    const savedMood = localStorage.getItem(key);

    if (savedMood) {
      day.classList.add(savedMood);
    }

    calendar.appendChild(day);
  }
}

// ===== SAVE MOOD =====
function saveMood() {
  if (!selectedDay) return alert("Select a day");

  const mood = moodSelect.value;
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);

  const key = `${year}-${month + 1}-${selectedDay}`;
  localStorage.setItem(key, mood);

  generateCalendar(); // refresh UI
}

// ===== EVENT LISTENERS =====
monthSelect.addEventListener("change", generateCalendar);
yearSelect.addEventListener("change", generateCalendar);

// ===== INIT =====
generateCalendar();
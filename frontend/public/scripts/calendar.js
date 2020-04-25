let today = new Date();
let currYear = today.getFullYear();
let currMonth = today.getMonth();
let firstDay = new Date(currYear, currMonth).getDay();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");
const endTime = document.getElementById("endTime");
const startTime = document.getElementById("startTime");
const monthAndYear = document.getElementById("monthAndYear");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dateObj;

const daysInMonth = () => {
  return 32 - new Date(currYear, currMonth, 32).getDate();
};

const jump = () => {
  currYear = parseInt(selectYear.value);
  currMonth = parseInt(selectMonth.value);
  showCalendar(currMonth, currYear);
};

const showCalendar = (month, year) => {
  let firstDay = (new Date(year, month)).getDay();

  const table = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  table.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cellText = document.createTextNode(date);

        const [month, year] = monthAndYear.innerHTML.split(" ");
        const selectableDate = new Date(`${month} ${date} ${year}`);

        if (today <= selectableDate) {
          const setTime = document.createElement("a");
          setTime.setAttribute("href", "#");
          setTime.setAttribute("class", "bookings__start-end-time__popup");
          setTime.setAttribute("id", `day-${date >= 10 ? date.toString() : '0' + date}`);
          setTime.appendChild(cellText);
          cell.appendChild(setTime);
        } else {
          cell.appendChild(cellText);
        }
        row.appendChild(cell);
        date++;
      }
    }
    table.appendChild(row);
  }

};

showCalendar(currMonth, currYear);

document.getElementById("next")
  .addEventListener("click", () => {
    currYear = (currMonth === 11) ? currYear + 1 : currYear;
    currMonth = (currMonth + 1) % 12;
    showCalendar(currMonth, currYear);
  });

document.getElementById("previous")
  .addEventListener("click", () => {
    currYear = (currMonth === 0) ? currYear - 1 : currYear;
    currMonth = (currMonth === 0) ? 11 : currMonth - 1;
    showCalendar(currMonth, currYear);
  });

document.getElementById("month")
  .addEventListener("change", jump);

document.getElementById("year")
  .addEventListener("change", jump);

let dates = document.querySelectorAll(".bookings__start-end-time__popup")
dates.forEach(date => {
  date.addEventListener("click", ev => {
    const day = ev.target.id.slice(-2);
    const [month, year] = monthAndYear.innerHTML.split(" ");
    dateStr = `${month} ${day}, ${year}`;
    document.getElementById("set-time-form").classList.toggle("hidden");
  });
});

const calendarForm = document.querySelector(".bookings__start-end-time");
calendarForm.addEventListener("submit", async ev => {
  ev.preventDefault();
  let body;
  if (startTime.value < endTime.value) {
    console.log(new Date(`${dateStr} ${startTime.value}`));
    body = {
      startDate: new Date(`${dateStr} ${startTime.value}`),
      endDate: new Date(`${dateStr} ${endTime.value}`),
      kitchenId: 1,
      renterId: parseInt(localStorage.getItem("AIRCNC_CURRENT_USER_ID")),
      hostId: 1
    };

  } else {
    alert("Start time cannot be after the end time...");
    return;
  }
  console.log(startTime.value, endTime.value, dateStr);
  try {


    const res = await fetch("http://localhost:8080/kitchens/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("AIRCNC_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw res;
    }

    window.location.href = '/calendar';
  } catch (err) {
    console.error(err);
  }
}); 
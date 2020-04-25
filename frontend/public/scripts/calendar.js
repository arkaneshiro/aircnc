let today = new Date();
let currYear = today.getFullYear();
let currMonth = today.getMonth();
let firstDay = new Date(currYear, currMonth).getDay();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");
const monthAndYear = document.getElementById("monthAndYear");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  console.log(selectMonth.value);
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
          setTime.setAttribute("href", "/set-time");
          setTime.appendChild(cellText);
          cell.appendChild(setTime);
        } else {
          cell.appendChild(cellText);
        }

        cell.setAttribute("id", `day-${date >= 10 ? date.toString() : '0' + date}`);

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


document.getElementById("calendar")
  .addEventListener("click", ev => {
    const dateObj = {};
    const day = ev.target.id.slice(-2);
    const [month, year] = monthAndYear.innerHTML.split(" ");
    dateObj.month = month;
    dateObj.day = day;
    dateObj.year = year;

    // console.log(dateObj);
    // console.log(new Date(`${dateObj.month} ${dateObj.day} ${dateObj.year}`))
  });

let content;

getAndShowResponseData();
waitBeforeDataIsLoaded(assignSortingLogicToHeaders);

function waitBeforeDataIsLoaded(func, ...params) {
  if (document.querySelector("tr") === null) {
    setTimeout(() => {
      waitBeforeDataIsLoaded(func, ...params);
    }, 50);
  } else {
    func(...params);
  }
}

async function getAndShowResponseData() {
  const responseData = await fetch("https://jsonplaceholder.typicode.com/posts?_page=0&_limit=10");
  content = await responseData.json();

  paintTableData(content);
}

function paintTableData(content) {
  const contentTable = document.querySelector(".table");
  contentTable.innerHTML +=
    `<thead><tr>
    <th>userId</th>
    <th>id</th>
    <th>title</th>
    <th>body</th>
  </thead></tr > 
  <tbody></tbody>`

  const contentTableBody = document.querySelector(".table tbody");
  for (let key in content) {
    contentTableBody.innerHTML +=
      `<tr>
      <td>${content[key].userId}</td>
      <td>${content[key].id}</td>
      <td>${content[key].title}</td>
      <td>${content[key].body}</td>
    </tr>`
  }
}

function sortTableByColumn(table, column, directionUp = true) {
  const tBody = table.tBodies[0];
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  const dirModifier = directionUp ? 1 : -1;

  const sortedRows = rows.sort((a, b) => {
    const aColContent = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    const bColContent = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

    if (isNaN(bColContent) && isNaN(aColContent)) {
      return aColContent > bColContent ? (1 * dirModifier) : (-1 * dirModifier);
    } else {
      return +aColContent > +bColContent ? (1 * dirModifier) : (-1 * dirModifier);
    }
  });

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);

  table.querySelectorAll("th").forEach(th => {
    th.classList.remove("sort-up", "sort-down");
  });
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("sort-up", directionUp);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("sort-down", !directionUp);

}

function assignSortingLogicToHeaders() {
  document.querySelectorAll("th").forEach(th => {
    th.addEventListener("click", () => {
      const currentTable = th.parentElement.parentElement.parentElement;
      const columnIndex = Array.prototype.indexOf.call(th.parentElement.children, th);
      const currentIsDirectionUp = th.classList.contains("sort-up");

      sortTableByColumn(currentTable, columnIndex, !currentIsDirectionUp);
    });
  });
}

function getSearchedData() {
  const phrase = document.querySelector(".search-input");
  const table = document.querySelector(".table");
  const regPhrase = new RegExp(phrase.value, "i");
  let flag = false;

  if (phrase.value.length > 2) {
    for (let i = 1; i < table.rows.length; i++) {
      flag = false;
      for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
        flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
        if (flag) break;
      }
      if (flag) {
        table.rows[i].style.display = "";
      } else {
        table.rows[i].style.display = "none";
      }
    }
  } else {
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].style.display = "";
    }
  }
}

async function getAndShowResponseData() {
  const responseData = await fetch("https://jsonplaceholder.typicode.com/posts");
  const content = await responseData.json();

  const contentTable = document.querySelector(".table");

  contentTable.innerHTML +=
    `<tr>
    <th>userId</th>
    <th>id</th>
    <th>title</th>
    <th>body</th>
  </tr > `

  for (let key in content) {
    contentTable.innerHTML +=
      `<tr>
      <td>${content[key].userId}</td>
      <td>${content[key].id}</td>
      <td>${content[key].title}</td>
      <td>${content[key].body}</td>
    </tr>`
  }
}

getAndShowResponseData();


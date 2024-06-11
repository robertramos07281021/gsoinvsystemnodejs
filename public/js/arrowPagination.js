// Admin Dashboard

function prevPage() {
  window.location.search = `usersPage=${Number(window.location.search.at(window.location.search.length - 1)) - 1}`;
}
function nextPage() {
  if(window.location.search.length < 1) {
    window.location.search = `usersPage=2`;
  } else {
    window.location.search = `usersPage=${Number(window.location.search.at(window.location.search.length - 1)) + 1}`;
  }
}

// User Dashboard active user arrow
function nextPageUser() {
  if(window.location.search.length < 1) {
    window.location.search = `activeUserPages=2`;
  } else {
    window.location.search = `activeUserPages=${Number(window.location.search.at(window.location.search.length - 1)) + 1}`;
  }
}
function prevPageUser() {
  window.location.search = `activeUserPages=${Number(window.location.search.at(window.location.search.length - 1)) - 1}`;
}

// User Dashboard deactive user arrow
function nextPageDeactive() {
  if(window.location.search.length < 1) {
    window.location.search = `deactiveUserPages=2`;
  } else {
    window.location.search = `deactiveUserPages=${Number(window.location.search.at(window.location.search.length - 1)) + 1}`;
  }
}
function prevPageDeactive() {
  window.location.search = `deactiveUserPages=${Number(window.location.search.at(window.location.search.length - 1)) - 1}`;
}
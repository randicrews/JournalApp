

var heart = document.getElementsByClassName("fa-heart");
// document.getElementById('addMov').addEventListener('click', addMov)
// document.getElementById('findMov').addEventListener('click', findMov)

function findMov(){
  const title = document.getElementById('movieSearch').value
  fetch(`/movie/${title}`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': title,
    })
  })

}


Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const over = this.parentNode.parentNode.childNodes[4].innerText

        // const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('/mine', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'over': over
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// function findMov(){
//   const mov = document.getElementById('title').value
//   const url = `/titles/${mov}`
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
    // let queens = []
    // queens = data
    // list.innerHTML = ''
    // let uniqueQueens = new Set()
    // console.log(data, 'data')
    // document.getElementById('seasonal').classList.remove('sneaky')
    // for (let queen of queens){
    //   let i = queen.seasons.indexOf(+season)
    //   console.log(season)
    //   if (!uniqueQueens.has(queen.dragName)){
    //   let li = document.createElement('li')
    //   li.appendChild(document.createTextNode(`${queen.dragName} ${queen.outcomes[i]}`))
    //   list.appendChild(li)
    //   uniqueQueens.add(queen.dragName)
  //   }
  // }
//   })
// }

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const title = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('titles', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'title': title
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });

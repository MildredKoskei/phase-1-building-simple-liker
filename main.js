// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
const likeBtnNodeList = document.querySelectorAll(".like-glyph");
const modal = document.querySelector("#modal");

likeBtnNodeList.forEach((btnLike) =>
  btnLike.addEventListener("click", btnLikeHandler)
);

function btnLikeHandler(event) {
  const { target } = event;

  if (target.classList.contains("activated-heart")) {
    mimicServerCall()
      .then((response) => {
        target.classList.remove("activated-heart");
        target.textContent = EMPTY_HEART;
      })
      .catch((error) => {
        //when the server fails we need to unhide the modal and show the message from server in the modal
        modal.classList.remove("hidden");
        modal.querySelector("#modal-message").textContent = error;
        setTimeout(hideModal, 3000);
      });
  } else {
    //when someone likes a post that has an empty heart
    mimicServerCall()
      .then((res) => {
        target.textContent = FULL_HEART;
        target.classList.add("activated-heart");
      })
      .catch((error) => {
        modal.classList.remove("hidden");
        modal.querySelector("#modal-message").textContent = error;
        setTimeout(hideModal, 3000);
      });
  }
}
function hideModal() {
  modal.classList.add("hidden");
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

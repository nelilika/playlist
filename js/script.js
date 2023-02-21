/* Initial song list */
let songs = [
  {
    name: 'Jingle Bells',
    isLiked: false,
  },
  {
    name: 'We Wish You a Merry Christmas',
    isLiked: true,
  },
];

window.addEventListener('load', function () {
  songs.forEach((song) => createLiItems(song));
  addNewSong();
  countSongs();
});

function createBtn(btnName, btnClass, btnEvent) {
  const button = document.createElement('button');
  button.textContent = btnName;
  button.classList.add(btnClass);
  button.addEventListener('click', btnEvent);
  return button;
}

function likeBtnEvent(event) {
  event.target.textContent =
    event.target.textContent === 'Like' ? 'Unlike' : 'Like';
  const activeLiToLike = event.target.closest('.item');
  const imgActive = activeLiToLike.querySelector('.like-icon');
  imgActive.classList.toggle('unliked');
}

function deleteBtnEvent(event) {
  const activeLiToDelete = event.target.closest('.item');
  const songName = activeLiToDelete.querySelector('.text-wrapper');
  const confirmToDelete = confirm(
    `Are you sure you want to delete ${songName.textContent}?`
  );
  if (confirmToDelete) {
    activeLiToDelete.remove();
  }
  countSongs();
}

function createLiItems(song) {
  const li = document.createElement('li');
  li.classList.add('item');
  document.querySelector('.songs').append(li);
  const span = document.createElement('span');
  span.classList.add('text-wrapper');
  span.textContent = song.name;
  li.prepend(span);
  const divForImg = document.createElement('div');
  li.prepend(divForImg);
  const icon = createImgLikeIcon();
  divForImg.prepend(icon);
  const divForBtns = document.createElement('div');
  divForBtns.classList.add('btns-wrapper');
  li.append(divForBtns);
  divForBtns.prepend(createBtn('Delete', 'delete', deleteBtnEvent));
  if (song.isLiked) {
    divForBtns.prepend(createBtn('Unlike', 'like', likeBtnEvent));
  } else {
    divForBtns.prepend(createBtn('Like', 'like', likeBtnEvent));
    icon.classList.add('unliked');
  }
}

function createImgLikeIcon() {
  const img = document.createElement('img');
  img.setAttribute('src', './images/like.svg');
  img.classList.add('like-icon');
  return img;
}

function addNewSong() {
  const errorText = document.createElement('p');
  errorText.classList.add('error-text');
  const addButton = document.querySelector('.add');
  addButton.after(errorText);
  addButton.addEventListener('click', function () {
    const inputForSong = document.querySelector('.input-box');
    const newSong = {
      name: inputForSong.value,
      isLiked: false,
    };
    const songNamesList = document.querySelectorAll('.text-wrapper');
    const songMatchedArr = [...songNamesList].filter(
      (item) => item.textContent === newSong.name
    );

    if (!newSong.name || newSong.name.length <= 3) {
      errorText.textContent =
        'Song name should not be empty or shorter than 3 characters!';
    } else if (songMatchedArr.length) {
      errorText.textContent = 'Such song has been already added!';
    } else {
      errorText.textContent = '';
      createLiItems(newSong);
      countSongs();
    }
    inputForSong.value = '';
  });
}

function countSongs() {
  const allLiCount = document.querySelectorAll('.item');
  return (document.querySelector('.count').textContent = allLiCount.length);
}

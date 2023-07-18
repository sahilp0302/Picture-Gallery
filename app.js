const apiKey = '3lErryf4flAMqdZpXfwtCCavINN0WMCYtMIkNgIkENs';
const searchButton = document.getElementById('search-button');
const categoryInput = document.getElementById('category-input');
const pictureGrid = document.getElementById('picture-grid');


async function fetchPictures(category) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${apiKey}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching pictures:', error);
    return [];
  }
}


function displayPictures(pictures) 
{
  pictureGrid.innerHTML = '';
  pictures.forEach((picture) => {
    const pictureCard = document.createElement('div');
    pictureCard.classList.add('picture-card');

    const pictureImg = document.createElement('img');
    pictureImg.classList.add('picture-img');
    pictureImg.src = picture.urls.regular;
    pictureImg.alt = picture.alt_description;

    const pictureInfo = document.createElement('div');
    pictureInfo.classList.add('picture-info');
    pictureInfo.innerHTML = `
      <p>By <a href="${picture.user.links.html}" target="_blank">${picture.user.name}</a></p>
      <p>${picture.description || 'No description available.'}</p>
    `;

    pictureCard.appendChild(pictureImg);
    pictureCard.appendChild(pictureInfo);

    pictureGrid.appendChild(pictureCard);
  });
}


searchButton.addEventListener('click', async () => {
  const category = categoryInput.value.trim();
  if (category !== '') {
    const pictures = await fetchPictures(category);
    displayPictures(pictures);
  }
});


window.addEventListener('resize', () => {
  if (window.innerWidth < 600) {
    pictureGrid.style.gridTemplateColumns = '1fr';
  } else {
    pictureGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  }
});

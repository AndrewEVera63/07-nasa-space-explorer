// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

const apiKey = "hAChtLippT7Dc174sla7DyQ3VRrdEt7rdT3on7N6";
const gallery = document.getElementById("gallery");
const button = document.querySelector("button");

// Random Space Facts
const spaceFacts = [
  "One day on Venus is longer than one year.",
  "The Sun contains over 99% of the solar system's mass.",
  "Jupiter has more than 90 known moons.",
  "A neutron star can spin hundreds of times each second.",
  "Saturn could float in water because it is less dense.",
  "There are more stars than grains of sand on Earth.",
  "The footprints on the Moon could last millions of years.",
  "Mars has the tallest volcano in the solar system."
];

// Display random fact
const factSection = document.getElementById("spaceFact");

if (factSection) {
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

  factSection.innerHTML = `
    <h2>🚀 Did You Know?</h2>
    <p>${randomFact}</p>
  `;
}

// Load images
button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {

  gallery.innerHTML = `
    <div class="loading">
      🔄 Loading space photos...
    </div>
  `;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startInput.value}&end_date=${endInput.value}`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    gallery.innerHTML = "";

    data.reverse();

    data.forEach(photo => {

      const card = document.createElement("div");
      card.classList.add("gallery-item");

      // IMAGE
      if (photo.media_type === "image") {

        card.innerHTML = `
          <img src="${photo.url}" alt="${photo.title}">
          <h3>${photo.title}</h3>
          <p>${photo.date}</p>
        `;

        card.addEventListener("click", () => {
          openModal(photo);
        });

      }

      // VIDEO
      // Handle videos
else if (photo.media_type === "video") {

    card.innerHTML = `
        <img src="img/NASA-Logo-Large.jpg" alt="NASA Video">

        <h3>${photo.title}</h3>

        <p>${photo.date}</p>
    `;

    card.addEventListener("click", () => {
        openModal(photo);
    });

}

      gallery.appendChild(card);

    });

  }

  catch (error) {

    console.error(error);

    gallery.innerHTML = `
      <div class="placeholder">
        <h2>Unable to load NASA images.</h2>
      </div>
    `;

  }

}

// Modal
function openModal(photo) {

  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDate = document.getElementById("modalDate");
  const modalDescription = document.getElementById("modalDescription");

  modalTitle.textContent = photo.title;
  modalDate.textContent = photo.date;
  modalDescription.textContent = photo.explanation;

 if (photo.media_type === "image") {

    modalImage.style.display = "block";
    

    document.getElementById("videoLink").style.display = "none";

    modalImage.src = photo.hdurl || photo.url;

}

  else if (photo.media_type === "video") {
    // Show the NASA logo instead
    modalImage.style.display = "block";
    modalImage.src = "img/NASA-Logo-Large.jpg";

    // Show the watch video link
    const videoLink = document.getElementById("videoLink");
    videoLink.href = photo.url;
    videoLink.style.display = "flex";

}

  document.getElementById("imageModal").style.display = "flex";

}

// Close button
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("imageModal").style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (event) => {

    const modal = document.getElementById("imageModal");

    if (event.target === modal) {
        modal.style.display = "none";
    }

});
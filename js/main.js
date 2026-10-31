// ==========================================
// 1. GLOBAL DATASETS & STATE
// ==========================================

// --- MOVIE DATASET ---
const movies = [
  {
    id: "avengers-doomsday",
    title: "Avengers: Doomsday",
    genres: ["Action", "Sci-Fi"],
    details: "IMAX 3D • Sci-Fi / Action • 2h 45m",
    img: "images/avengersdoomsday.jpg",
    format: "IMAX 3D • DOLBY ATMOS",
    rating: "4.9 / 5.0",
    director: "Russo Brothers",
    price: "₱350",
    description: "When a cosmic collapse threatens reality itself, heroes must unite across dimensions to face Victor von Doom in an unprecedented showdown."
  },
  {
    id: "coyote-vs-acme",
    title: "Coyote vs. Acme",
    genres: ["Animation", "Adventure"],
    details: "Animation / Adventure • 1h 43m",
    img: "images/coyotevsacme.jpg",
    format: "2D • DOLBY DIGITAL",
    rating: "4.7 / 5.0",
    director: "Dave Green",
    price: "₱500",
    description: "Wile E. Coyote hires a down-on-his-luck attorney to sue the Acme Corporation for its defective products after every attempt to catch the Road Runner backfires."
  },
  {
    id: "look-back",
    title: "Look Back",
    genres: ["Animation", "Psychological Drama"],
    details: "Animation / Psychological Drama • 58m",
    img: "images/lookback.jpg",
    format: "2D • JAPANESE AUDIO",
    rating: "4.8 / 5.0",
    director: "Kiyotaka Oshiyama",
    price: "₱250",
    description: "An overly confident Fujino and the shut-in Kyomoto are brought together by a shared love for drawing manga in a poignant coming-of-age story."
  },
  {
    id: "meet-greet-bye",
    title: "Meet, Greet & Bye",
    genres: ["Drama", "Family"],
    details: "Drama / Family • 1h 46m",
    img: "images/meetgreetbye.jpg",
    format: "2D",
    rating: "4.5 / 5.0",
    director: "Director Name",
    price: "₱400",
    description: "A heartwarming story following family connections, togetherness, and life-changing moments."
  },
  {
    id: "peaky-blinders",
    title: "Peaky Blinders: The Immortal Man",
    genres: ["Crime", "History"],
    details: "Crime / History • 1h 52m",
    img: "images/peakyblinders.jpg",
    format: "2D • DOLBY ATMOS",
    rating: "4.8 / 5.0",
    director: "Tom Harper",
    price: "₱350",
    description: "Tommy Shelby returns to navigate a dangerous postwar underworld in Birmingham."
  },
  {
    id: "2-valid-ids",
    title: "2 Valid IDs",
    genres: ["Filipino", "Drama"],
    details: "Filipino / Drama • 1h 30m",
    img: "images/2validids.jpg",
    format: "2D",
    rating: "4.4 / 5.0",
    director: "Director Name",
    price: "₱120",
    description: "A compelling story highlighting local experiences, traditions, and family relationships."
  }
];

// --- LOCATION DATASET ---
const cinemaBranches = {
  'sm-san-lazaro': {
    name: 'NCR - SM City San Lazaro Cinema',
    address: 'Felix Huertas Cor. A.H. Lacson Ave, Sta. Cruz, Manila, Metro Manila',
    contact: '(02) 8731-8888 / hotline@smcinema.com',
  },
  'sm-sta-mesa': {
    name: 'NCR - SM City Sta. Mesa Cinema',
    address: 'Magsaysay Blvd. cor. Araneta Ave., Quezon City, Metro Manila',
    contact: '(02) 8715-0000',
  },
  'sm-fairview': {
    name: 'NCR - SM City Fairview Cinema',
    address: 'Quirino Highway cor. Regalado Ave., Novaliches, Quezon City',
    contact: '(02) 8939-0000',
  },
  'sm-manila': {
    name: 'NCR - SM City Manila Cinema',
    address: 'Concepcion Cor. Arroceros St., Ermita, Manila, Metro Manila',
    contact: '(02) 8523-7000',
  },
  'ayala-circuit': {
    name: 'NCR - Ayala Malls Circuit Cinema',
    address: 'Circuit Makati, Brgy. Carmona, Makati City, Metro Manila',
    contact: '(02) 7759-8000',
  },
  'moa-imax': {
    name: 'NCR - SM Mall of Asia IMAX Cinema',
    address: 'J.W. Diokno Blvd, Pasay, Metro Manila',
    contact: '(02) 8556-0000',
  },
  'ayala-feliz': {
    name: 'NCR - Ayala Malls Feliz Cinema',
    address: 'Marcos Highway cor. Amang Rodriguez Ave., Pasig City',
    contact: '(02) 7901-5000',
  },
  'ayala-manila-bay': {
    name: 'NCR - Ayala Malls Manila Bay Cinema',
    address: 'Aseana Ave. cor. Macapagal Blvd., Parañaque City',
    contact: '(02) 7795-7000',
  }
};

// Global booking state
const bookingState = {
  date: 'Wed, Oct 28',
  time: '7:30 PM'
};

function selectBranch(branchKey) {
  const branch = cinemaBranches[branchKey];
  if (!branch) return;

  const detailsContainer = document.getElementById('location-details');
  if (detailsContainer) {
    detailsContainer.hidden = false;
    document.getElementById('location-details-title').textContent = branch.name;
    document.getElementById('location-details-address').textContent = branch.address;
    document.getElementById('location-details-contact').textContent = branch.contact;
  }
}

// ==========================================
// 2. SHOWTIME STATE & DYNAMIC LINK SYNC
// ==========================================

function updateProceedLink() {
  const proceedBtn = document.getElementById('proceed-to-seats-btn');
  if (!proceedBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';

  const locationSelect = document.getElementById('showtime-location-select');
  let selectedLocation = 'NCR – SM City San Lazaro Cinema';
  
  if (locationSelect) {
    const selectedOption = locationSelect.options[locationSelect.selectedIndex];
    selectedLocation = selectedOption ? selectedOption.text.trim() : locationSelect.value;
  }

  const selectedDate = bookingState.date || 'Wed, Oct 28';
  const selectedTime = bookingState.time || '7:30 PM';

  // Construct precise query string
  proceedBtn.href = `select-seats.html?id=${encodeURIComponent(movieId)}&location=${encodeURIComponent(selectedLocation)}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`;
}

function updateShowtimes() {
  updateProceedLink();
}

function setDate(dateStr, btn) {
  bookingState.date = dateStr;

  document.querySelectorAll('.date-btn').forEach(b => {
    b.classList.remove('bg-danger', 'bg-opacity-25', 'text-white', 'shadow-glow-red');
    b.classList.add('bg-white/5', 'text-brand-textMuted');
  });

  if (btn) {
    btn.classList.add('bg-danger', 'bg-opacity-25', 'text-white', 'shadow-glow-red');
    btn.classList.remove('bg-white/5', 'text-brand-textMuted');
  }

  updateProceedLink();
}

function selectTimeSlot(time, format, btnElement) {
  bookingState.time = time;

  // 1. Clear active styles across ALL time slot buttons inside the container
  const container = btnElement ? btnElement.closest('.row') : document;
  const buttons = container ? container.querySelectorAll('button') : [];
  
  buttons.forEach(btn => {
    btn.classList.remove('btn-outline-danger');
    btn.classList.add('btn-outline-secondary');
    btn.style.backgroundColor = '';
    btn.style.boxShadow = '';
    const label = btn.querySelector('small');
    if (label) {
      label.classList.remove('text-white');
      label.classList.add('text-muted');
    }
  });

  // 2. Highlight the clicked button
  if (btnElement) {
    btnElement.classList.remove('btn-outline-secondary');
    btnElement.classList.add('btn-outline-danger');
    btnElement.style.backgroundColor = 'rgba(229, 9, 20, 0.15)';
    btnElement.style.boxShadow = '0 0 10px rgba(229, 9, 20, 0.4)';
    const label = btnElement.querySelector('small');
    if (label) {
      label.classList.remove('text-muted');
      label.classList.add('text-white');
    }
  }

  updateProceedLink();
}

// --- SHOWTIME PAGE RENDERER ---
function renderShowtimePage() {
  const showtimeTitle = document.getElementById('showtime-movie-title') || document.querySelector('h4.fw-bold');
  if (!showtimeTitle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';

  const selectedMovie = movies.find(m => m.id === movieId) || movies[0];
  showtimeTitle.textContent = selectedMovie.title.toUpperCase();

  // Set initial default selected time slot visually on load (e.g. 7:30 PM)
  const defaultBtn = document.querySelector('button[data-time="7:30 PM"]') || document.querySelectorAll('.row.g-3 button')[2];
  if (defaultBtn) {
    selectTimeSlot('7:30 PM', 'IMAX 3D', defaultBtn);
  } else {
    updateProceedLink();
  }
}

// --- 1. DYNAMIC CHECKOUT & CONFIRMATION LINK SYNC ---
function updateCheckoutLink(selectedSeatsList, totalPrice) {
  const checkoutBtn = document.getElementById('proceed-to-checkout-btn') || document.querySelector('a[href*="checkout.html"]');
  if (!checkoutBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';
  const locationParam = urlParams.get('location') || 'NCR – SM City Manila Cinema';
  const dateParam = urlParams.get('date') || 'Wed, Oct 28';
  const timeParam = urlParams.get('time') || '7:30 PM';

  const seatsStr = selectedSeatsList.join(',');

  checkoutBtn.href = `checkout.html?id=${encodeURIComponent(movieId)}&location=${encodeURIComponent(locationParam)}&date=${encodeURIComponent(dateParam)}&time=${encodeURIComponent(timeParam)}&seats=${encodeURIComponent(seatsStr)}&total=${encodeURIComponent(totalPrice)}`;
}

// --- 2. CHECKOUT PAGE RENDERER ---
function renderCheckoutPage() {
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutBtn = document.getElementById('checkout-submit-btn');
  if (!checkoutForm && !checkoutBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';
  const locationParam = urlParams.get('location') || 'NCR – SM City Manila Cinema';
  const dateParam = urlParams.get('date') || 'Wed, Oct 28';
  const timeParam = urlParams.get('time') || '7:30 PM';
  const seatsParam = urlParams.get('seats') || 'A1';
  const totalParam = urlParams.get('total') || '875';

  if (checkoutBtn) {
    checkoutBtn.textContent = `Confirm Payment (₱${Number(totalParam).toLocaleString()})`;
  }

  if (checkoutForm) {
    checkoutForm.onsubmit = function (e) {
      e.preventDefault();
      const randomOrderId = 'ABS-' + Math.floor(100000 + Math.random() * 900000);
      window.location.href = `confirmation.html?id=${encodeURIComponent(movieId)}&location=${encodeURIComponent(locationParam)}&date=${encodeURIComponent(dateParam)}&time=${encodeURIComponent(timeParam)}&seats=${encodeURIComponent(seatsParam)}&total=${encodeURIComponent(totalParam)}&order=${randomOrderId}`;
    };
  }
}

// --- 3. CONFIRMATION PAGE RENDERER ---
function renderConfirmationPage() {
  const confirmTitle = document.getElementById('confirm-movie-title');
  if (!confirmTitle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';
  const locationParam = urlParams.get('location') || 'NCR – SM City Manila Cinema';
  const dateParam = urlParams.get('date') || 'Wed, Oct 28';
  const timeParam = urlParams.get('time') || '7:30 PM';
  const seatsParam = urlParams.get('seats') || 'A1, A2';
  const totalParam = urlParams.get('total') || '1750';
  const orderParam = urlParams.get('order') || 'ABS-889021';

  const selectedMovie = movies.find(m => m.id === movieId) || movies[0];

  confirmTitle.textContent = selectedMovie.title;
  
  const confirmSeats = document.getElementById('confirm-seats');
  if (confirmSeats) confirmSeats.textContent = `Seats: ${seatsParam} (${locationParam})`;

  const confirmTime = document.getElementById('confirm-time');
  if (confirmTime) confirmTime.textContent = `Time: ${dateParam} @ ${timeParam}`;

  const confirmTotal = document.getElementById('confirm-total');
  if (confirmTotal) confirmTotal.textContent = `Total Paid: ₱${Number(totalParam).toLocaleString()}`;

  const confirmOrderId = document.getElementById('confirm-order-id');
  if (confirmOrderId) confirmOrderId.textContent = `Order ID: #${orderParam}`;

  const qrImage = document.getElementById('confirm-qr-code');
  if (qrImage) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(orderParam + '-' + seatsParam)}`;
  }
}

// ==========================================
// 3. PAGE RENDERERS
// ==========================================

// --- MOVIE DETAIL PAGE RENDERER ---
function renderMovieDetail() {
  const detailTitle = document.getElementById('detail-title');
  if (!detailTitle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'avengers-doomsday';
  const selectedMovie = movies.find(m => m.id === movieId) || movies[0];

  if (document.getElementById('detail-img')) document.getElementById('detail-img').src = selectedMovie.img;
  if (document.getElementById('detail-format')) document.getElementById('detail-format').textContent = selectedMovie.format;
  detailTitle.textContent = selectedMovie.title;
  if (document.getElementById('detail-meta')) document.getElementById('detail-meta').textContent = selectedMovie.details;
  if (document.getElementById('detail-description')) document.getElementById('detail-description').textContent = selectedMovie.description;
  if (document.getElementById('detail-rating')) document.getElementById('detail-rating').innerHTML = `<i class="bi bi-star-fill"></i> ${selectedMovie.rating}`;
  if (document.getElementById('detail-director')) document.getElementById('detail-director').textContent = selectedMovie.director;
  if (document.getElementById('detail-price')) document.getElementById('detail-price').textContent = selectedMovie.price;

  const showtimeBtn = document.getElementById('select-showtime-btn') || document.getElementById('location-btn');
  if (showtimeBtn) {
    showtimeBtn.href = `showtime.html?id=${selectedMovie.id}`;
  }
}

// --- SHOWTIME PAGE RENDERER ---
function renderShowtimePage() {
  const showtimeTitle = document.getElementById('showtime-movie-title') || document.querySelector('h4.fw-bold');
  if (!showtimeTitle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';

  const selectedMovie = movies.find(m => m.id === movieId) || movies[0];
  showtimeTitle.textContent = selectedMovie.title.toUpperCase();

  updateProceedLink();
}

// --- SELECT SEATS PAGE RENDERER ---
function renderSelectSeatsPage() {
  const bookingTitle = document.getElementById('booking-movie-title');
  if (!bookingTitle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'coyote-vs-acme';
  const locationParam = urlParams.get('location') || 'NCR – SM City San Lazaro Cinema';
  const dateParam = urlParams.get('date') || 'Wed, Oct 28';
  const timeParam = urlParams.get('time') || '7:30 PM';

  const selectedMovie = movies.find(m => m.id === movieId) || movies[0];

  bookingTitle.textContent = selectedMovie.title;

  const bookingFormat = document.getElementById('booking-movie-format');
  if (bookingFormat) {
    bookingFormat.textContent = `${locationParam} • ${selectedMovie.format}`;
  }

  const bookingTime = document.getElementById('booking-movie-time');
  if (bookingTime) {
    bookingTime.textContent = `${dateParam}, ${timeParam}`;
  }
}

// --- SEARCH PAGE RENDERER ---
function renderSearchPage() {
  const resultsContainer = document.getElementById('search-results-container');
  if (!resultsContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q')?.toLowerCase() || '';

  const filteredMovies = movies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(query);
    const matchesGenre = movie.genres.some(g => g.toLowerCase().includes(query));
    return matchesTitle || matchesGenre;
  });

  if (filteredMovies.length === 0) {
    resultsContainer.innerHTML = `<p class="text-muted">No movies found matching "${query}".</p>`;
  } else {
    resultsContainer.innerHTML = filteredMovies.map(movie => `
      <div class="bg-cinema-card p-3 mb-3 d-flex align-items-center gap-3">
        <img src="${movie.img}" style="width:80px; height:100px; object-fit:cover; border-radius:8px;" alt="${movie.title}">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-1">${movie.title}</h5>
          <p class="text-muted small mb-0">${movie.details}</p>
        </div>
        <a href="movie-detail.html?id=${movie.id}" class="btn btn-cinema btn-sm">View Movie</a>
      </div>
    `).join('');
  }
}

// --- DATE STRIP RENDERER ---
function renderDateStrip() {
  const strip = document.getElementById('date-picker-strip');
  if (!strip) return;

  const dates = [
    { day: 'MON', num: '26', full: 'Mon, Oct 26'},
    { day: 'TUE', num: '27', full: 'Tue, Oct 27'},
    { day: 'WED', num: '28', full: 'Wed, Oct 28'},
    { day: 'THU', num: '29', full: 'Thu, Oct 29'},
    { day: 'FRI', num: '30', full: 'Fri, Oct 30'},
    { day: 'SAT', num: '31', full: 'Sat, Oct 31'}
  ];

  strip.innerHTML = dates.map(d => `
    <button
      onclick="setDate('${d.full}', this)"
      class="date-btn flex-shrink-0 w-16 h-20 rounded-2xl
      ${d.active
        ? 'bg-danger bg-opacity-25 text-white shadow-glow-red'
        : 'bg-white/5 text-brand-textMuted border-white/10 hover:text-white'}
      flex flex-col items-center justify-center transition">
      <span class="text-[10px] font-bold uppercase">${d.day}</span>
      <span class="font-display text-2xl font-bold">${d.num}</span>
    </button>
  `).join('');
}

// ==========================================
// 4. INITIALIZATION ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderMovieDetail();
  renderShowtimePage();
  renderSelectSeatsPage();
  renderSearchPage();
  renderDateStrip();
  renderCheckoutPage();
  renderConfirmationPage();

  let selectedSeatsList = [];
  const TICKET_PRICE = 875;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && e.target.classList.contains('available')) {
      e.target.classList.toggle('selected');
      const seatId = e.target.textContent.trim();

      if (selectedSeatsList.includes(seatId)) {
        selectedSeatsList = selectedSeatsList.filter(s => s !== seatId);
      } else {
        selectedSeatsList.push(seatId);
      }

      const totalCalculated = selectedSeatsList.length * TICKET_PRICE;

      const countElem = document.getElementById('selected-count');
      const priceElem = document.getElementById('total-price');

      if (countElem) countElem.textContent = selectedSeatsList.length;
      if (priceElem) priceElem.textContent = `₱${totalCalculated.toLocaleString()}`;

      // Update link to pass chosen seats & price to checkout.html
      updateCheckoutLink(selectedSeatsList, totalCalculated);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    
  // --- 1. SEAT SELECTION LOGIC ---
  const seats = document.querySelectorAll('.seat.available');
  const countEl = document.getElementById('selected-count');
  const totalEl = document.getElementById('total-price');
  const SEAT_PRICE = 350;

  let selectedCount = 0;

  seats.forEach(seat => {
    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
      if (seat.classList.contains('selected')) {
        selectedCount++;
      } else {
        selectedCount--;
      }

      if (countEl) countEl.textContent = selectedCount;
      if (totalEl) totalEl.textContent = `₱${(selectedCount * SEAT_PRICE).toLocaleString()}`;
    });
  });

  // --- 2. MOVIE DATASET ---
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

  // --- 3. SEARCH PAGE RENDERER ---
  const resultsContainer = document.getElementById('search-results-container');
  if (resultsContainer) {
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

// --- 4. MOVIE DETAIL PAGE RENDERER ---
  const detailTitle = document.getElementById('detail-title');
  if (detailTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'avengers-doomsday';

    const selectedMovie = movies.find(m => m.id === movieId) || movies[0];

    document.getElementById('detail-img').src = selectedMovie.img;
    document.getElementById('detail-format').textContent = selectedMovie.format;
    detailTitle.textContent = selectedMovie.title;
    document.getElementById('detail-meta').textContent = selectedMovie.details;
    document.getElementById('detail-description').textContent = selectedMovie.description;
    document.getElementById('detail-rating').innerHTML = `<i class="bi bi-star-fill"></i> ${selectedMovie.rating}`;
    document.getElementById('detail-director').textContent = selectedMovie.director;
    document.getElementById('detail-price').textContent = selectedMovie.price;

    // UPDATE THIS LINE: Pass movie ID to select-seats.html
    const seatBtn = document.getElementById('select-seats-btn');
    if (seatBtn) {
      seatBtn.href = `select-seats.html?id=${selectedMovie.id}`;
    }
  }
// --- 5. SELECT SEATS PAGE RENDERER ---
  const bookingTitle = document.getElementById('booking-movie-title');
  if (bookingTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'avengers-doomsday';

    const selectedMovie = movies.find(m => m.id === movieId) || movies[0];

    bookingTitle.textContent = selectedMovie.title;
    
    const bookingFormat = document.getElementById('booking-movie-format');
    if (bookingFormat) {
      bookingFormat.textContent = `Cinema 1 • ${selectedMovie.format}`;
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
    renderDateStrip();
});

const bookingState = {
    date: 'Mon, Oct 26',
    location: 'Noir Southbank'
};

function renderDateStrip() {
    const strip = document.getElementById('date-picker-strip');

    if (!strip) return;

    const dates = [
        { day: 'MON', num: '26', full: 'Mon, Oct 26', active: false },
        { day: 'TUE', num: '27', full: 'Tue, Oct 27', active: false },
        { day: 'WED', num: '28', full: 'Wed, Oct 28', active: false },
        { day: 'THU', num: '29', full: 'Thu, Oct 29', active: false },
        { day: 'FRI', num: '30', full: 'Fri, Oct 30', active: false },
        { day: 'SAT', num: '31', full: 'Sat, Oct 31', active: true }
    ];

    strip.innerHTML = dates.map(d => `
        <button
            onclick="setDate('${d.full}', this)"
            class="date-btn flex-shrink-0 w-16 h-20 rounded-2xl
            ${d.active
                ? 'bg-danger bg-opacity-25 text-white shadow-glow-red'
                : 'bg-white/5 text-muted border-white/10 hover:text-white'}
            flex flex-col items-center justify-center transition">

            <span class="text-[10px] font-bold uppercase">${d.day}</span>
            <span class="font-display text-2xl font-bold">${d.num}</span>
        </button>
    `).join('');
}

function setDate(dateStr, btn) {
    bookingState.date = dateStr;

    document.querySelectorAll('.date-btn').forEach(b => {
        b.classList.remove(
            'bg-danger',
            'text-white',
            'shadow-glow-red',
      														'bg-opacity-25'
        );

        b.classList.add(
            'bg-white/5',
            'text-brand-textMuted'
        );
    });

    btn.classList.add(
        'bg-danger',
  														'bg-opacity-25',
        'text-white',
        'shadow-glow-red'
    );

    btn.classList.remove(
        'bg-white/5',
        'text-brand-textMuted'
    );

    console.log('Selected date:', bookingState.date);

    // Refresh showtimes for selected date
    updateShowtimes();
}

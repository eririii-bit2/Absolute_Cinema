document.addEventListener('DOMContentLoaded', () => {

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
});

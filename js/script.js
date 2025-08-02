document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const infoBox = document.getElementById("infoBox");

  function formatWaktuIndonesia(date) {
    const hari = date.getDate();
    const bulan = date.toLocaleString("id-ID", { month: "long" });
    const tahun = date.getFullYear();
    const jam = String(date.getHours()).padStart(2, '0');
    const menit = String(date.getMinutes()).padStart(2, '0');
    const detik = String(date.getSeconds()).padStart(2, '0');
    return `${hari} ${bulan} ${tahun}, ${jam}:${menit}:${detik} WIB`;
  }

  function updateTime() {
    const timeNow = formatWaktuIndonesia(new Date());
    const timeEl = document.getElementById("currentTime");
    if (timeEl) {
      timeEl.textContent = timeNow;
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  const welcomeName = prompt("Masukkan nama Anda:");
  const nameTarget = document.getElementById("visitName");
  if (nameTarget) {
    nameTarget.textContent = welcomeName || "Pengunjung";
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showError(input, message) {
    let errorEl = input.parentNode.querySelector(".error-message");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.className = "error-message";
      errorEl.style.color = "red";
      errorEl.style.fontSize = "0.85rem";
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    const errorEl = input.parentNode.querySelector(".error-message");
    if (errorEl) {
      errorEl.remove();
    }
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = form.elements["name"];
      const emailInput = form.elements["email"];
      const phoneInput = form.elements["phone"];
      const messageInput = form.elements["message"];

      let isValid = true;

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Nama tidak boleh kosong.");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
        showError(emailInput, "Email tidak valid.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!/^\d{10,13}$/.test(phoneInput.value.trim())) {
        showError(phoneInput, "Nomor HP harus 10–13 digit angka.");
        isValid = false;
      } else {
        clearError(phoneInput);
      }

      if (messageInput.value.trim() === "") {
        showError(messageInput, "Pesan tidak boleh kosong.");
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (!isValid) return;

      infoBox.innerHTML = `
        <h3>Hasil Input:</h3>
        <p><b>Waktu Saat Ini:</b> <span id="currentTime">${formatWaktuIndonesia(new Date())}</span></p>
        <p><b>Nama:</b> ${nameInput.value}</p>
        <p><b>Email:</b> ${emailInput.value}</p>
        <p><b>Nomor HP:</b> ${phoneInput.value}</p>
        <p><b>Pesan:</b> ${messageInput.value}</p>
      `;
    });
  }
});

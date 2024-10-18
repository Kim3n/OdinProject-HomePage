let previousBreakpoint = "";

function getFontSize() {
  if (window.innerWidth <= 767) {
    return 32; //DESKTOP
  } else if (window.innerWidth <= 1024) {
    return 50; // TABLET
  } else if (window.innerWidth >= 1025) {
    return 35; // PHONE TO BE DECIDED
  }
  return 32;
}

function getBreakpoint() {
  if (window.innerWidth <= 767) {
    return "max-767";
  } else if (window.innerWidth <= 1024) {
    return "max-1024";
  } else {
    return "min-1025";
  }
}

function getStrokeWidth() {
  if (window.innerWidth <= 767) {
    return 1;
  } else if (window.innerWidth <= 1024) {
    return 2;
  } else {
    return 2;
  }
}

function initializeVara() {
  const fontSize = getFontSize();
  const strokeWidth = getStrokeWidth();

  // Clear the existing Vara instance if it exists
  if (window.vara) {
    document.querySelector("#Name").innerHTML = "";
  }

  // Initialize Vara with the updated font size
  window.vara = new Vara(
    "#Name",
    "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
    [
      {
        text: "Kim Andre Lademo",
        duration: 3000,
      },
    ],
    {
      strokeWidth: strokeWidth,
      color: "white",
      fontSize: fontSize,
      textAlign: "center",
    }
  );

  // Set up the animation ready state
  window.vara.ready(function () {
    let erase = false;
    vara.animationEnd(function (i, o) {
      if (i == "no_erase") erase = false;
      if (erase) {
        o.container.style.transition = "opacity 1s 1s";
        o.container.style.opacity = 0;
      }
    });
  });
}

// Initial Vara setup on page load
initializeVara();

window.addEventListener("resize", function () {
  const currentBreakpoint = getBreakpoint();

  if (currentBreakpoint !== previousBreakpoint) {
    initializeVara();
    previousBreakpoint = currentBreakpoint;
  }
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    // Calculate cursor position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2; // Centered X position
    const y = e.clientY - rect.top - rect.height / 2; // Centered Y position

    // Adjust rotation intensity (smaller values for smoother rotation)
    const rotateX = (y / rect.height) * -15; // Negative to flip direction
    const rotateY = (x / rect.width) * 15;

    // Apply rotation transform with smooth transition
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset the card's transform smoothly when the mouse leaves
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

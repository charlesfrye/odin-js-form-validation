/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

/* custom validation hints for form in index.html */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fields = form.querySelectorAll("input");
  const hints = Array.from(fields).map((field) => field.nextElementSibling);

  fields.forEach((field, index) => {
    const hint = hints[index];
    field.addEventListener("input", () => {
      checkAndHint(field, hint);
    });

    if (field.id === "password") {
      field.addEventListener("input", () => {
        if (field.value.length < 8) {
          hint.textContent = "Password must be at least 8 characters long.";
          activateHint(hint);
        } else {
          resetHint(hint);
        }
      });
    }

    if (field.id === "passwordConfirmation") {
      field.addEventListener("input", () => {
        if (field.value !== document.getElementById("password").value) {
          hint.textContent = "Passwords do not match.";
          activateHint(hint);
        } else {
          resetHint(hint);
        }
      });
    }

    if (field.id === "zip") {
      field.addEventListener("input", () => {
        if (field.value.length !== 5) {
          hint.textContent = "Enter a 5-digit zip code.";
          activateHint(hint);
        } else {
          const numericalZip = parseInt(field.value, 10);
          if (Number.isNaN(numericalZip)) {
            hint.textContent = "Zip code must be a five-digit number.";
            activateHint(hint);
          } else if (numericalZip < 0) {
            hint.textContent = "Zip code must be a positive number.";
            activateHint(hint);
          } else {
            resetHint(hint);
          }
        }
      });
    }

    if (field.id === "state") {
      field.addEventListener("input", () => {
        if (!stateAbbreviations.has(field.value)) {
          hint.textContent = "Enter a US state postal abbreviation.";
          activateHint(hint);
        } else {
          resetHint(hint);
        }
      });
    }
  });

  form.addEventListener("submit", (event) => {
    // check that all fields are valid
    if (!form.checkValidity()) {
      event.preventDefault();
      fields.forEach((field, index) => {
        const hint = hints[index];
        checkAndHint(field, hint);
      });
    }
  });
});

function checkAndHint(field, hint) {
  if (field.validity.valid) {
    resetHint(hint);
  } else {
    showHint(field, hint);
  }
}

function resetHint(hint) {
  hint.textContent = "";
  hint.className = "hint";
}

function activateHint(hint) {
  hint.className = "hint active";
}

function showHint(field, hint) {
  if (field.validity.valueMissing) {
    hint.textContent = "This field is required.";
  }
  if (field.validity.typeMismatch) {
    hint.textContent = "Enter a valid value.";
  }

  // Set the styling appropriately
  activateHint(hint);
}

const stateAbbreviations = new Set([
  /* all 50 states + DC */
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]);

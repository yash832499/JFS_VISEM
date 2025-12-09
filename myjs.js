// Show details after explicit confirmation using a custom modal
async function showDetails() {
  let name = document.getElementById("nameSelect").value;

  let photo = document.getElementById("photo");
  let info = document.getElementById("infoText");
  let prompt = document.getElementById("promptMessage");

  // Remove any special frames before adding new one
  photo.classList.remove("photo-james");
  photo.classList.remove("photo-james-blue");

  // Mapping names to photos
  let photos = {
    guido: "images/guido.jpg",
    dennis: "images/dennis.jpg",
    james: "images/james.jpg",
    stroustrup: "images/stroustrup.jpg",
    juergen: "images/juergen.jpg",
    krishna: "images/krishna.jpg",

    bill_gates: "images/bill_gates.jpg",
    steve_jobs: "images/steve_jobs.jpg",
    elon_musk: "images/elon_musk.jpg",
    zukerberg: "images/zukerberg.jpg",
    linus_torvalds: "images/linus_torvalds.jpeg",
    tim_berner: "images/tim_berner.jpg",
    Sundar_Pichai: "images/Sundar_Pichai.jpg",
    satyanadella: "images/satyanadella.jpg",
    AdaLovelace: "images/AdaLovelace.jpg",
    madhu: "images/madhu.jpg",
    Yashaswini: "images/23951A66Q7.jpg",
  };

  // Mapping details
  let details = {
    guido: "Guido van Rossum created Python in 1991.",
    dennis: "Dennis Ritchie developed C and co-created UNIX.",
    james: "James Gosling invented Java in 1995.",
    stroustrup: "Bjarne Stroustrup created C++.",
    juergen: "Juergen Hoeller is the co-creator of Spring Framework.",
    krishna: "E Krishna Rao Patro — JFS Trainer.",
    madhu: "B. Madhusudhan Rao — JFS Trainer.",
    bill_gates: "Bill Gates co-founded Microsoft.",
    steve_jobs: "Steve Jobs co-founded Apple.",
    elon_musk: "Elon Musk leads Tesla & SpaceX.",
    zukerberg: "Mark Zuckerberg founded Facebook.",
    linus_torvalds: "Linus Torvalds created Linux.",
    tim_berner: "Tim Berners-Lee invented the World Wide Web.",
    Sundar_Pichai: "Sundar Pichai is the CEO of Google.",
    satyanadella: "Satya Nadella is the CEO of Microsoft.",
    AdaLovelace: "Ada Lovelace was the first computer programmer.",
    Yashaswini: "Name: Yashaswini ,Roll_no:23951A66Q7, Branch: AIML"
  };

  if (name === "") {
    photo.style.display = "none";
    info.innerHTML = "Please select a person from the dropdown.";
    prompt.textContent = "";
    return;
  }

  // Confirm with the user via the custom modal before revealing
  let niceName =
    document.getElementById("nameSelect").options[
      document.getElementById("nameSelect").selectedIndex
    ].text;
  let confirmed = await showCustomConfirm(
    `Show photo and information for ${niceName}?`
  );

  if (!confirmed) {
    // User cancelled — do not show, display small message
    prompt.textContent = "Selection canceled.";
    return;
  }

  // Clear prompt and show details
  prompt.textContent = "";
  photo.src = photos[name];
  photo.style.display = "block";
  info.innerHTML = details[name];

  // Apply special frame for James
  if (name === "james") {
    photo.classList.add("photo-james");
    photo.classList.add("photo-james-blue");
  }
}

// Wire up the confirm button when the script loads
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("confirmBtn");
  if (btn) {
    btn.addEventListener("click", showDetails);
  }
});

// Custom modal confirm helper that returns a Promise<boolean>
function showCustomConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirmModal");
    const modalMsg = document.getElementById("modalMessage");
    const ok = document.getElementById("modalOk");
    const cancel = document.getElementById("modalCancel");

    if (!modal || !ok || !cancel || !modalMsg) {
      // Fallback to native confirm if modal elements are missing
      resolve(window.confirm(message));
      return;
    }

    modalMsg.textContent = message;
    modal.classList.remove("hidden");

    function cleanup() {
      ok.removeEventListener("click", onOk);
      cancel.removeEventListener("click", onCancel);
      modal.classList.add("hidden");
    }

    function onOk() {
      cleanup();
      resolve(true);
    }

    function onCancel() {
      cleanup();
      resolve(false);
    }

    ok.addEventListener("click", onOk);
    cancel.addEventListener("click", onCancel);
  });

}

import React from "react";

function Attribution() {
  const whoami = "Your Name Here";

  return (
    <div className="attribution">
      Challenge by{" "}
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
        Frontend Mentor
      </a>
      . Coded by <a href="#">{whoami}</a>.
    </div>
  );
}

export default Attribution;

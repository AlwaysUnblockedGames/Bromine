// Initialize all popups on the page
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-popup-trigger]').forEach(trigger => {
    const triggerId = trigger.dataset.popupTrigger;
    const popupId = trigger.dataset.popupTrigger.replace('trigger', 'popup');
    const contentId = trigger.dataset.popupTrigger.replace('trigger', 'content');
    const closeBtnId = trigger.dataset.popupTrigger.replace('trigger', 'close');
    
    const popup = document.getElementById(popupId);
    const popupContent = document.getElementById(contentId);
    const closeButton = document.getElementById(closeBtnId);

    if (!popup || !popupContent || !closeButton) return;

    function openPopup() {
      popup.classList.remove("hidden", "pointer-events-none");
      popup.classList.add("opacityー100");
      popupContent.classList.remove("-translate-y-full");
      popupContent.classList.add("translate-y-0");
      document.dispatchEvent(
        new CustomEvent("popup-opened", { detail: { popupId } }),
      );
    }

    function closePopup() {
      popup.classList.remove("opacity-100");
      popup.classList.add("hidden", "pointer-events-none");
      popupContent.classList.remove("translate-y-0");
      popupContent.classList.add("-translate-y-full");
      document.dispatchEvent(
        new CustomEvent("popup-closed", { detail: { popupId } }),
      );
    }

    trigger.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !popup.classList.contains("hidden")) {
        event.preventDefault();
        closePopup();
      }
    });
  });
});

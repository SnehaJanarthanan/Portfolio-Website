const tabs = document.querySelector(".tabs");
const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  // Hide all tab panels
  tabPanels.forEach(function (panel) {
    panel.hidden = true;
  });

  // Mark all tab buttons as unselected
  tabButtons.forEach(function (tab) {
    tab.setAttribute("aria-selected", false);
  });

  // Mark the clicked tab as selected
  event.currentTarget.setAttribute("aria-selected", true);

  // Find the associated tab panel and show it - associated by "aria-labelledby"
  const id = event.currentTarget.getAttribute("id");

  const tabPanel = tabPanels.find(function (panel) {
    return panel.getAttribute("aria-labelledby") === id;
  });
  tabPanel.hidden = false;
}

tabButtons.forEach(function (button) {
  button.addEventListener("click", handleTabClick);
});

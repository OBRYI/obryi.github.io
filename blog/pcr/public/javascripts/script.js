function copyToClipboard() {
    var copyText = document.getElementById("email");
    navigator.clipboard.writeText(copyText.innerHTML);
  }
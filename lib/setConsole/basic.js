const checkQuery = (query) => {
  return `Count: ${document.querySelectorAll(query).length}`;
}
const copy = text => navigator.clipboard.writeText(text);

export const downloadFile = (filename: string, body: string) => {
  const url = window.URL.createObjectURL(new Blob([body]));
  const a = document.createElement("a");

  a.style.display = "none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

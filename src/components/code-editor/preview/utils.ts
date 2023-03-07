export const handleError = (err: any) => {
  const root: any = document.querySelector("#root");
  root.innerHTML =
    '<div style="color: red"><h4>Runtime Error</h4>' + err + "</div>";
  console.error(err);
};

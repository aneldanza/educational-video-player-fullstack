export const csrfToken = () => {
  const meta = document.querySelector("meta[name=csrf-token]");
  const token = meta && meta.getAttribute("content");

  return token ?? "";
};

export const defaultUserId = "anel_danza"

export const SHOW_MESSAGE = "[MESSAGE] SHOW_MESSAGE";
export const RESET_MESSAGE = "[MESSAGE] RESET_MESSAGE";

export function showMessage(data) {
  return { type: SHOW_MESSAGE, payload: data };
}

export function resetMessage() {
  return { type: RESET_MESSAGE };
}

async function get(path) {
  try {
    const response = await fetch(path);
    let data = await response.json();
    return { valid: true, data };
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
}

async function post(path, body) {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();
    return { valid: true, data };
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
}

async function put(path, body) {
  try {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();
    return { valid: true, data };
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
}

async function deletePost(path, body) {
  try {
    const response = await fetch(path, {
      method: "DELETE",
    });
    let data = await response.json();
    return { valid: true, data };
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
}
export { get, post, put, deletePost };

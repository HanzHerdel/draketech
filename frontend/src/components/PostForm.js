import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { post, put } from "../utils/api";
import { CATEGORIES } from "../utils/constants";
import { API_SERVICES } from "../utils/services";
import Label from "./generic/Label";
import Select from "./generic/Select";
/***** STYLES *****/
const styleInput = {
  width: "100%",
  margin: 8,
  display: "flex",
};
const formStyle = {
  display: "flex",
  maxWidth: 800,
  flexWrap: "wrap",
  margin: "0 auto",
  background: "darkgray",
  padding: 16,
};

const PostForm = ({ id, posts, reload,...rest }) => {
  /**HOOKS */
  const params = useParams();
  const history = useHistory();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: 0,
  });

  const [disableSave, setDisableSave] = useState(false);
  const [isEdition, setIsEdition] = useState(false);
  /**EFFECTS */
  /**preload data to form if is an edition */
  useEffect(() => {
    if (!params.id) return;
    console.log(params.id);
    const post = posts.find((p) => p._id === params.id);
    if (!post) return;
    let creation_time = new Date(post.creation_time);
    let timezone = creation_time.getTimezoneOffset() / 60;
    creation_time.setHours(creation_time.getHours() - timezone);
    setForm({
      ...post,
      creation_time: creation_time.toISOString().slice(0, 16),
    });
    setIsEdition(true);
  }, [params, posts]);

  /**FUNCTIONS */
  const handleSubmit = async (e) => {
  console.log('e: ', e);
    e.preventDefault()
    setDisableSave(true);
    console.log(form);
    if (isEdition) {
      let creation_time = new Date(form.creation_time);
      await put(API_SERVICES.put.replace(":id", form._id), {
        ...form,
        creation_time,
      });
    } else {
      const res = await post(API_SERVICES.post, form);
      reload()
      res.valid && history.replace("/");
    }
    setDisableSave(false);
  };

  const handleChange = (key, e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  return (
    <main >
      <form style={formStyle} action="javascript:void(0);" onSubmit={handleSubmit}>
      <div style={styleInput}>
        <Label title="Title" />
        <input value={form.title} onChange={(e) => handleChange("title", e)} required/>
      </div>
      <div style={styleInput}>
        <Select
          title={"Category"}
          value={form.category}
          options={CATEGORIES}
          onChange={(e) => handleChange("category", e)}
        />
      </div>
      <div style={styleInput}>
        <Label title="Content" />
        <textarea
          rows="10"
          style={{ flexGrow: 1 }}
          value={form.content}
          onChange={(e) => handleChange("content", e)}
          required />
      </div>
      {isEdition && (
        <div>
          <Label title="Creation time" />
          <input
            type="datetime-local"
            value={form.creation_time}
            onChange={(e) => handleChange("creation_time", e)}
            required
          />
        </div>
      )}
      <button
        //onClick={handleSubmit}
        disabled={disableSave}
        style={{ marginLeft: "auto" }}
        type="submit"
      >
        {isEdition ? "Edit" : "Create"}
      </button>
      
      </form>
    </main>
  );
};

export default PostForm;

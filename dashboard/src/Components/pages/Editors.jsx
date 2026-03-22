import {
  FaImage,
  FaCloud,
  FaUpload,
  FaNewspaper,
  FaWrench,
  FaSearch,
  FaVideo,
  FaMagic,
  FaEdit,
  FaTimes,
  FaMusic,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import {
  TextareaAutoResize,
  Select,
  CRUDbutton,
  CustomStringSlice,
  AccessRole,
  CustomLoading, CustomUndo
} from "./../../utilities/Element";
import { ContextFocusBox } from "./../../context/FocusBoxContext";
import { FilePreviewAndInput } from "./../../utilities/MediaUpload";
import { useFetch } from "./../../hooks/CommonHooks";
import { API_URL } from "./../../config";



// const role = "admin"
const role = "admin";

const ArticleMideacord = ({ mideaHandleChange }) => {
  const fileChange = (e) => {
    mideaHandleChange({
      target: e,
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaUpload className="w-4 h-4 text-indigo-500 inline" />
        Featured Image
      </h3>

      <div>
        <FilePreviewAndInput
          className="w-full h-18  border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          icon={FaImage}
          imgClassName="rounded"
          fileCollBack={(file) => {
            fileChange({ name: "midea.image", value: file });
          }}
          fileClear={() => {
            fileChange({
              name: "midea.image",
              value: null,
            });
          }}
        />

        <FilePreviewAndInput
          className="w-full h-25 border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          icon={FaVideo}
          accept="video"
          imgClassName="rounded"
          fileCollBack={(file) => {
            fileChange({
              name: "midea.video",
              value: file,
            });
          }}
          fileClear={() => {
            fileChange({
              name: "midea.video",
              value: null,
            });
          }}
        />
        <FilePreviewAndInput
          className="w-full h-18 border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          icon={FaMusic}
          accept="audio"
          imgClassName="rounded"
          fileCollBack={(file) => {
            fileChange({
              name: "midea.audio",
              value: file,
            });
          }}
          fileClear={() => {
            fileChange({
              name: "midea.audio",
              value: null,
            });
          }}
        />
      </div>
    </div>
  );
};

const SourceCard = () => {
  const { ...sourceAPI } = useFetch(`${API_URL}/Source`);
  const [source, setSource] = useState({
    name: "",
    url: "",
    logoToFile: null,
    type: "",
  });

  const sourceHandleChange = (e) => {
    const { name, value } = e.target;
    setSource((prev) => ({ ...prev, [name]: value }));
  };

  const sourceServerCallAndPost = async () => {
    const formData = new FormData();

    const { name, type, url, logoToFile } = source;
    formData.append("file", logoToFile);
    formData.append("url", url);
    formData.append("type", type);
    formData.append("name", name);
    formData.append("purpose", "logo");

    alert("io");
    const res = await sourceAPI.refetch({
      method: "POST",
      body: formData,
    });

    console.log(res);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaNewspaper className="w-4 h-4 text-indigo-500 inline" />
        Source
      </h3>

      <TextareaAutoResize
        type="text"
        name="name"
        rows="1"
        placeholder="Source name "
        value={source.name}
        onChange={sourceHandleChange}
        className="w-full border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <TextareaAutoResize
        type="text"
        name="url"
        rows="1"
        placeholder="Source url"
        value={source.url}
        onChange={sourceHandleChange}
        className="w-full border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <FilePreviewAndInput
        className="w-full h-25  border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        icon={FaImage}
        imgClassName="rounded"
        fileCollBack={(file) => {
          setSource((prev) => ({ ...prev, logoToFile: file }));
        }}
      />

      <Select
        name="type"
        options={["newspaper", "tv", "blog", "agency", "social"]}
        onChange={sourceHandleChange}
        className="custom-select w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
      />

      <CRUDbutton
        icon={FaEdit}
        className="mt-3"
        onClick={sourceServerCallAndPost}
      />
    </div>
  );
};
const EditorStats = () => {
  const oneCallApi = useRef(true);

  const { res, loading, refetch } = useFetch(`${API_URL}/Articles?len=5`);

  useEffect(() => {
    if (oneCallApi.current) {
      refetch();
      oneCallApi.current = false;
    }
  }, [refetch]);

  if (loading) {
    return (
      <CustomLoading
        text=""
        messgae="Loading international news and global affairs..."
      />
    );
  }
  const articles = res?.articles || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">


      {
        articles.map((state, i) => {


          return (
            <div
              key={state.category + i}
              className="bg-white px-4 py-5 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Editors</p>
                  <p className="text-2xl font-bold text-purple-600">{articles.length}</p>
                </div>
                <span className="text-2xl">✏️</span>
              </div>
            </div>
          )
        })
      }





      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Articles Reviewed</p>
            <p className="text-2xl font-bold text-blue-600">89</p>
          </div>
          <span className="text-2xl">📋</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending Reviews</p>
            <p className="text-2xl font-bold text-yellow-600">23</p>
          </div>
          <span className="text-2xl">⏰</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Published Today</p>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
          <span className="text-2xl">🚀</span>
        </div>
      </div>
    </div>
  );
};

const CreateNews = ({ messgae }) => {
  const { closeFocusBox } = ContextFocusBox()

  const { ...articleAPI } = useFetch(`${API_URL}/Articles`);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    description: "",
    summary: "",
    author: "",
    category: "",
    sourceType: "",
    tags: "",
    state: "",
    publishedAt: "",
    midea: { video: null, image: null, audio: null },
  });

  /* =================== articleHandleChange ===================== */

  const articleHandleChange = (e) => {

    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setArticle((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setArticle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const articleServerCall = async () => {
    const formData = new FormData();

    const {
      midea: { image, video, audio },
      title,
      description,
      content,
      tags,
      category,
      sourceType = "tv",
      summary,
      author,
    } = article;

    if (image) formData.append("image", image);
    if (image) formData.append("video", video);
    if (image) formData.append("audio", audio);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("summary", summary);
    formData.append("sourceType", "tv");
    formData.append("author", author);

    alert("jjjjjj");
    const res = await articleAPI.refetch({
      method: "POST",
      body: formData,
    });
    closeFocusBox()
   
  };

  return (



    <div className="overflow-y-auto  px-6 ">

      <div className="w-full flex justify-between items-center bg-gray-100 py-2  px-6 my-2  ">
        <h2 className="text-xl font-bold  ">{messgae}</h2>

        <button
          onClick={closeFocusBox}
          className="bg-indigo-600 text-sm text-white px-4 py-1 rounded"
        >
          Close
        </button>
      </div>

      <div className="w-full min-h-full " >
        <div className="max-w-6xl mx-auto space-y-6">
          {/* <!-- Header --> */}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* <!-- LEFT SIDE EDITOR --> */}
            <div className="lg:col-span-2 space-y-6">
              {/* <!-- Article Card --> */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Article Title
                </label>
                <TextareaAutoResize
                  value={article.title}
                  onChange={articleHandleChange}
                  id="title"
                  rows="1"
                  name="title"
                  placeholder="Write article title..."
                  className="w-full text-2xl font-semibold border-none focus:ring-0 focus:outline-none mt-2 placeholder-gray-300"
                />
                <hr className=" border-gray-200 mt-3 mb-2" />
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Description
                </label>
                <TextareaAutoResize
                  onChange={articleHandleChange}
                  value={article.description}
                  id="description"
                  name="description"
                  placeholder="Short description that appears in article previews..."
                  className="w-full border border-gray-200 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  rows="2"
                />
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-5 block">
                  Summary
                </label>
                <TextareaAutoResize
                  onChange={articleHandleChange}
                  value={article.summary}
                  id="summary"
                  name="summary"
                  placeholder="Article summary for quick reading..."
                  className="w-full border border-gray-200 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  rows="3"
                />
              </div>

              {/* <!-- Content Editor --> */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Article Content
                  </label>

                  <div className="flex gap-2">
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>

                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Image"
                    >
                      <FaImage />
                    </button>
                  </div>
                </div>

                <TextareaAutoResize
                  value={article.content}
                  onChange={articleHandleChange}
                  id="content"
                  name="content"
                  placeholder="Write your full article content here. You can use markdown for formatting..."
                  className="w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 min-h-[300px]"
                  rows="12"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Supports Markdown formatting
                </p>
              </div>
            </div>

            {/* <!-- RIGHT SIDEBAR --> */}

            <div className="space-y-6">
              <ArticleMideacord
                mideaHandleChange={articleHandleChange}
                midea={article?.midea}
              />
              <SourceCard />

              {/* <!-- SEO Meta Card --> */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaSearch className="w-4 h-4 text-indigo-500 inline" />
                  SEO Meta
                </h3>
                <TextareaAutoResize
                  value={article.tags}
                  onChange={articleHandleChange}
                  type="text"
                  rows="2"
                  name="tags"
                  placeholder="Meta tags"
                  className="w-full border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {/* <textarea
                    name="metaDescription"
                    placeholder="Meta description (150-160 characters recommended)"
                    className="w-full border border-gray-200 p-2.5 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                  ></textarea>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated: ai, tech, news...)"
                    className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3">
          {/* <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewbox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              /></svg
            > */}
          <span id="toast-message">Article saved successfully!</span>
        </div>
      </div>

      {/* <!-- Settings Card --> */}
      <div className="bg-white my-3 p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaWrench className="w-4 h-4 text-indigo-500 inline" />
          Article Settings
        </h3>

        <div className="space-y-4 flex gap-3 flex-wrap">
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Category
            </label>
            <select
              name="category"
              className="custom-select w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              value={article.category}
              onChange={articleHandleChange}
            >
              <option value="">Select category</option>
              <option value="technology">🖥️ Technology</option>
              <option value="business">💼 Business</option>
              <option value="politics">🏛️ Politics</option>
              <option value="sports">⚽ Sports</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="science">🔬 Science</option>
              <option value="health">🏥 Health</option>
              <option value="health">🏥 World</option>
              <option value="health">🏥 UK</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Author
            </label>
            <input
              type="text"
              name="author"
              placeholder="Author name"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={article.author}
              onChange={articleHandleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Publish Date
            </label>
            <input
              type="datetime-local"
              name="publishDate"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Featured Article
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Allow Comments</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="comments"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Breaking News</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="breaking"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-6">
        <button
          onClick={articleServerCall}
          className="px-5 py-2.5 w-full bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Publish Article
        </button>
        <button className="px-5 py-2.5 w-full bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          Save Draft
        </button>
      </div>
    </div>


  );
};

const EditorialTeam = () => {
  const oneCallApi = useRef(true);

  const { res, loading, refetch } = useFetch(`${API_URL}/Articles?len=2`);

  useEffect(() => {
    if (oneCallApi.current) {
      refetch();
      oneCallApi.current = false;
    }
  }, [refetch]);

  if (loading) {
    return (
      <CustomLoading
        text=""
        messgae="Loading international news and global affairs..."
      />
    );
  }

  const articleEdit = (_id) => {
    alert(_id);
  };

  const articleDelete = (_id) => {
    alert(_id);
  };

  const articles = res?.articles || [];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow rounded-xl p-4 md:p-6 mb-6">
      <div className=" bg-gray-100 flex justify-between items-center p-2 ">
        <h2 className="text-lg md:text-xl font-bold">Editorial Team</h2>
      </div>

      {/* 📱 Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {articles.map((article = {}) => {
          const { _id, title, category, createdBy } = article;
          const role = createdBy?.role || "unknown";

          return (
            <div key={_id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">
                <CustomStringSlice text={title} end={40} />
              </h3>

              <p className="text-sm text-gray-600">Author: {role}</p>

              <p className="text-sm text-gray-600 mb-3">Category: {category}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => articleEdit(_id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => articleDelete(_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 💻 Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[700px] w-full">
          {articles.map((article = {}, i) => {
            const { _id, title, category, createdBy } = article;
            const role = createdBy?.role || "unknown";

            return (
              <div
                key={_id + i}

                className="border-b border-gray-200 py-4  flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">DW</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">David Wilson</h4>
                    <p className="text-sm text-gray-600">Senior News Editor</p>
                    <p className="text-xs text-gray-500">News Department</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Articles Reviewed</p>
                    <p className="text-lg font-bold text-blue-600">34</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Avg. Review Time</p>
                    <p className="text-lg font-bold text-green-600">2.3h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Status</p>
                    <span className="status-badge status-active">Active</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      // onclick="viewEditorProfile('david.wilson@bbc.com')"
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      // onclick="messageUser('david.wilson@bbc.com')"
                      className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};




const NewsList = () => {
  const { setFocusBox } = ContextFocusBox()
  const { res, refetch } = useFetch(`${API_URL}/Articles`);
  const { ...articlesDeleteApi } = useFetch(`${API_URL}/Articles`);

  const [articles, setArticles] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);
  const deleteTimer = useRef(null);

  const showUndo = deletedItem !== null;

  // Fetch once
  useEffect(() => {
    refetch({ params: { len: 5 } });
  }, []);

  useEffect(() => {
    if (res?.articles) setArticles(res.articles);
  }, [res]);

  // DELETE
  const deleteItem = (_id) => {
    const index = articles.findIndex(a => a._id === _id);
    if (index === -1) return;

    const article = articles[index];

    // Optimistic UI update
    const updated = [...articles];
    updated.splice(index, 1);
    setArticles(updated);

    setDeletedItem({ article, index, _id });

    // API delete after 5s
    deleteTimer.current = setTimeout(async () => {
      await articlesDeleteApi.refetch({
        method: "DELETE",
        route: _id,
      });
      setDeletedItem(null);
    }, 5000);
  };

  // UNDO
  const undoDelete = () => {
    if (!deletedItem) return;

    clearTimeout(deleteTimer.current);

    const updated = [...articles];
    updated.splice(deletedItem.index, 0, deletedItem.article);
    setArticles(updated);
    setDeletedItem(null);
  };


  const editItem = () => {

    setFocusBox(<CreateNews messgae="Edit News" />)

  }


  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow rounded-xl p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-4">News</h2>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {articles.map(a => (
          <div key={a._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">{a.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Author: {a.createdBy?.role || "unknown"}</p>
            <p className="text-sm text-gray-600 mb-3">Category: {a.category}</p>

            <div className="flex gap-2">
              <button
                onClick={() => editItem(a._id)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => deleteItem(a._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[700px] w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-center">Author</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr className="border-t" key={a._id}>
                <td className="p-3">{a.title}</td>
                <td className="text-center">{a.createdBy?.role || "unknown"}</td>
                <td className="text-center">{a.category}</td>
                <td className="text-center space-x-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editItem(a._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => deleteItem(a._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Undo */}
      {showUndo && <CustomUndo undoFun={undoDelete} />}
    </div>
  );
};



export default function Editors() {

  const { setFocusBox } = ContextFocusBox()


  return (
    <div id="admin-editors-content" className="admin-section ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Editor Management</h2>
        <div className="flex space-x-3">
          <button
            // onclick="viewEditorialCalendar()"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Editorial Calendar
          </button>
          <button
            // onclick="openEditorModal()"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Editor
          </button>
        </div>
      </div>






      <EditorStats />

      {/* CreateNewsSection  */}
      <div className="flex justify-between items-center bg-gray-100  py-2  px-6">
        <h2 className="text-xl font-bold  ">Create News</h2>

        <button
          onClick={() => setFocusBox(<CreateNews name="Create News" />)}
          className="bg-indigo-600 text-sm text-white px-4 py-1 rounded"
        >
          Create News
        </button>
      </div>

     
      <NewsList />

      <AccessRole
        role={role}
        accessRole={["admin"]}
        AccessComponet={() => {
          return (
            <>
              <EditorialTeam />
            </>
          );
        }}
      />
    </div>
  );
}

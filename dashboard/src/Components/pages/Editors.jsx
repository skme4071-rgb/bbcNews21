import {
  FaImage, FaCloud, FaUpload, FaNewspaper,
  FaWrench, FaSearch, FaVideo,
  FaMagic, FaEdit, FaTimes, FaMusic


} from "react-icons/fa";
import { useState } from "react";

import { TextareaAutoResize, Select, CRUDbutton } from "./../../utilities/Element";
import { FilePreviewAndInput, } from "./../../utilities/MediaUpload";
import { useFetch } from "./../../hooks/CommonHooks";
import { API_URL } from "./../../config";





const ArticleMideacord = ({ mideaHandleChange, midea }) => {

  const fileChange = (e) => {
    mideaHandleChange({
      target: e
    })
  }


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
            fileChange({ name: "midea.image", value: file })
          }}
          fileClear={() => {
            fileChange({
              name: "midea.image",
              value: null
            })
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
              value: file
            })
          }}
          fileClear={() => {
            fileChange({
              name: "midea.video",
              value: null
            })
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
              value: file
            })
          }}
          fileClear={() => {
            fileChange({
              name: "midea.audio",
              value: null
            })
          }}
        />
      </div>
    </div>
  )
}


const SourceCard = () => {
  const { ...sourceAPI } = useFetch(`${API_URL}/Source`);
  const [source, setSource] = useState({
    name: "", url: "", logoToFile: null, type: ""
  })


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

    alert("io")
    const res = await sourceAPI.refetch({
      method: "POST",
      body: formData

    });


    console.log(res)


  }


  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100" >
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"
      >
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
          setSource((prev) => ({ ...prev, logoToFile: file }))
        }}
      />

      <Select
        name="type"
        options={["newspaper", "tv", "blog", "agency", "social"]}
        onChange={sourceHandleChange}
        className="custom-select w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
      />


      <CRUDbutton icon={FaEdit} className="mt-3" onClick={sourceServerCallAndPost} />

    </div>
  )
}





export default function Editors() {


  const { ...articleAPI } = useFetch(`${API_URL}/Article`)


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
    midea: {video : null , image : null ,  audio : null}
  })


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

    const { midea: { image, video, audio },
      title, description, content, tags, category, sourceType = "tv", summary , author } = article;

    if (image) formData.append("image", image)
    if (image) formData.append("video", video)
    if (image) formData.append("audio", audio)


    formData.append("title", title)
    formData.append("description", description)
    formData.append("tags", tags)
    formData.append("content", content)
    formData.append("category", category)
    formData.append("summary", summary)
    formData.append("sourceType", "tv")
    formData.append("author",author )


    alert("jjjjjj")
    const res = await articleAPI.refetch({
      method: "POST",
      body: formData
    })

    console.log(res);

  }

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














      {/* <!-- Editor Stats --> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Editors</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            <span className="text-2xl">✏️</span>
          </div>
        </div>
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







      <details className="h-full overflow-hidden  bg-white  my-6 shadow rounded-xl  ">



        <summary className="text-3xl font-bold text-gray-800 p-3 pl-5 ">
          <h2 className="text-xl font-bold mb-4 inline">Create News</h2>
        </summary>

        <div className="w-full min-h-full p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* <!-- Header --> */}



            <div className="grid lg:grid-cols-3 gap-6">
              {/* <!-- LEFT SIDE EDITOR --> */}
              <div className="lg:col-span-2 space-y-6">
                {/* <!-- Article Card --> */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <label
                    className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                  >Article Title</label>
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
                  <label
                    className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                  >Description</label>
                  <TextareaAutoResize
                    onChange={articleHandleChange}
                    value={article.description}
                    id="description"
                    name="description"
                    placeholder="Short description that appears in article previews..."
                    className="w-full border border-gray-200 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    rows="2"
                  />
                  <label
                    className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-5 block"
                  >Summary</label>
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
                <div
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3
                    className="font-semibold text-gray-800 mb-4 flex items-center gap-2"
                  >
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

                {/* <!-- Settings Card --> */}
                <div
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3
                    className="font-semibold text-gray-800 mb-4 flex items-center gap-2"
                  >

                    <FaWrench className="w-4 h-4 text-indigo-500 inline" />
                    Article Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1.5 block"
                      >Category</label
                      >
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
                      <label className="text-sm text-gray-600 mb-1.5 block"
                      >Author</label
                      >
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
                      <label className="text-sm text-gray-600 mb-1.5 block"
                      >Publish Date</label
                      >
                      <input
                        type="datetime-local"
                        name="publishDate"
                        className="w-full border border-gray-200 p-2.5 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600" >Featured Article</span>
                        <label
                          className="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="featured"
                            className="sr-only peer" />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
                          ></div
                          ></label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Allow Comments</span >
                        <label
                          className="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="comments"

                            className="sr-only peer" />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
                          ></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Breaking News</span>
                        <label
                          className="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="breaking"
                            className="sr-only peer" />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
                          ></div
                          ></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div
          id="toast"
          className="fixed bottom-6 right-6 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none"
        >
          <div
            className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3"
          >
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


        <div className="flex items-center gap-3 p-6">

          <button
            onClick={articleServerCall}
            id="publish-btn"
            className="px-5 py-2.5 w-full bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Publish Article
          </button>
          <button
            id="save-draft-btn"
            className="px-5 py-2.5 w-full bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Save Draft
          </button>


        </div>





      </details>

      {/* <!-- Editors List --> */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Editorial Team</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center"
              >
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

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">EM</span>
              </div>
              <div>
                <h4 className="font-semibold">Emma Martinez</h4>
                <p className="text-sm text-gray-600">Sports Editor</p>
                <p className="text-xs text-gray-500">Sports Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm font-medium">Articles Reviewed</p>
                <p className="text-lg font-bold text-blue-600">28</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Avg. Review Time</p>
                <p className="text-lg font-bold text-green-600">1.8h</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Status</p>
                <span className="status-badge status-active">Active</span>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="viewEditorProfile('emma.martinez@bbc.com')"
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Profile
                </button>
                <button
                  // onclick="messageUser('emma.martinez@bbc.com')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">RT</span>
              </div>
              <div>
                <h4 className="font-semibold">Robert Taylor</h4>
                <p className="text-sm text-gray-600">Business Editor</p>
                <p className="text-xs text-gray-500">Business Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm font-medium">Articles Reviewed</p>
                <p className="text-lg font-bold text-blue-600">27</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Avg. Review Time</p>
                <p className="text-lg font-bold text-green-600">3.1h</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Status</p>
                <span className="status-badge status-active">Active</span>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="viewEditorProfile('robert.taylor@bbc.com')"
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Profile
                </button>
                <button
                  // onclick="messageUser('robert.taylor@bbc.com')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Message
                  {/* <!-- Editors List --> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Editors List --> */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow rounded-xl p-6">


        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">News</h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-3">AI Future Technology</td>
              <td className="text-center">Admin</td>
              <td className="text-center">Tech</td>

              <td className="text-center space-x-2">

                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>
      {/* <!-- Editors List --> */}














    </div>)
}
export default function Articles () {
    return (
         <div id="admin-articles-content" className="admin-section ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">News Article Management</h2>
            <div className="flex space-x-3">
              <button
                // onclick="bulkPublish()"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Bulk Publish
              </button>
              <button
                // onclick="createArticle()"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Article
              </button>
            </div>
          </div>

          {/* <!-- Article Filters --> */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Search articles..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Categories</option>
                <option>News</option>
                <option>Sports</option>
                <option>Business</option>
                <option>Technology</option>
                <option>Environment</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Draft</option>
                <option>Review</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Authors</option>
                <option>Sarah Johnson</option>
                <option>James Brown</option>
                <option>Mike Chen</option>
              </select>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* <!-- Articles Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="article-card bg-white rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="status-badge article-status-review"
                >Under Review</span
                >
                <div className="flex space-x-1">
                  <button
                    // onclick="editArticle('climate-summit')"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    // onclick="deleteArticle('climate-summit')"
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Climate summit reaches historic $500bn global agreement
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                195 nations commit to unprecedented environmental action with
                binding targets for carbon reduction...
              </p>
              <div
                className="flex items-center space-x-2 text-xs text-gray-500 mb-4"
              >
                <span>By Sarah Johnson</span>
                <span>•</span>
                <span>Environment</span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="approveArticle('climate-summit')"
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  // onclick="requestRevision('climate-summit')"
                  className="flex-1 bg-yellow-600 text-white px-3 py-2 rounded text-sm hover:bg-yellow-700 transition-colors"
                >
                  Request Revision
                </button>
              </div>
            </div>

            <div className="article-card bg-white rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="status-badge article-status-published"
                >Published</span
                >
                <div className="flex space-x-1">
                  <button
                    // onclick="editArticle('market-surge')"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    // onclick="archiveArticle('market-surge')"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M4 3a2 2 0 00-2 2v1.816a2 2 0 00.586 1.414l2.828 2.828A2 2 0 007 10.828V15a2 2 0 002 2h2a2 2 0 002-2v-4.172a2 2 0 00-.586-1.414l-2.828-2.828A2 2 0 009 5.816V5a2 2 0 00-2-2H4z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Global markets surge following tech earnings beat
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Major technology companies exceed expectations, driving
                worldwide market optimism and investor confidence...
              </p>
              <div
                className="flex items-center space-x-2 text-xs text-gray-500 mb-4"
              >
                <span>By James Brown</span>
                <span>•</span>
                <span>Business</span>
                <span>•</span>
                <span>5 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-xs text-gray-500">
                  <span>👁️ 2.4k views</span>
                  <span>💬 23 comments</span>
                  <span>📤 156 shares</span>
                </div>
              </div>
            </div>

            <div className="article-card bg-white rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="status-badge article-status-draft">Draft</span>
                <div className="flex space-x-1">
                  <button
                    // onclick="editArticle('world-cup')"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    // onclick="deleteArticle('world-cup')"
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                World Cup qualifiers: Stunning upsets reshape tournament
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Underdog teams defeat established powerhouses in shocking
                qualification results that nobody saw coming...
              </p>
              <div
                className="flex items-center space-x-2 text-xs text-gray-500 mb-4"
              >
                <span>By Mike Chen</span>
                <span>•</span>
                <span>Sports</span>
                <span>•</span>
                <span>Draft saved 1 hour ago</span>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="submitForReview('world-cup')"
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Submit for Review
                </button>
                <button
                  // onclick="previewArticle('world-cup')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}
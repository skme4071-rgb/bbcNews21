export default function Editors () {
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
} 

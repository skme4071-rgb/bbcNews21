export default function Reporters () {
    return (
            <div id="admin-reporters-content" className="admin-section ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reporter Management</h2>
            <div className="flex space-x-3">
              <button
                // onclick="assignStory()"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Assign Story
              </button>
              <button
                // onclick="openReporterModal()"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Reporter
              </button>
            </div>
          </div>

          {/* <!-- Reporter Stats --> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Reporters</p>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                </div>
                <span className="text-2xl">📰</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Stories This Week</p>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published Today</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          {/* <!-- Reporters Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold">SJ</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Environment Reporter</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Articles This Month:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="status-badge status-active">Active</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="viewReporterProfile('sarah.johnson@bbc.com')"
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </button>
                <button
                  // onclick="messageUser('sarah.johnson@bbc.com')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold">MC</span>
                </div>
                <div>
                  <h3 className="font-semibold">Mike Chen</h3>
                  <p className="text-sm text-gray-600">Technology Reporter</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Articles This Month:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-medium">N/A</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="status-badge status-pending">Pending</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="approveReporter('mike.chen@bbc.com')"
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  // onclick="messageUser('mike.chen@bbc.com')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold">JB</span>
                </div>
                <div>
                  <h3 className="font-semibold">James Brown</h3>
                  <p className="text-sm text-gray-600">Sports Reporter</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Articles This Month:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-medium">4.6/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="status-badge status-active">Active</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  // onclick="viewReporterProfile('james.brown@bbc.com')"
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </button>
                <button
                  // onclick="messageUser('james.brown@bbc.com')"
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
    )
} 
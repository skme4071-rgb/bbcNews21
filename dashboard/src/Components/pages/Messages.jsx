export default function Messages () {
    return (
           <div id="admin-messages-content" className="admin-section ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Message Center</h2>
            <div className="flex space-x-3">
              <button
                // onclick="markAllRead()"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Mark All Read
              </button>
              <button
                // onclick="composeMessage()"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Compose Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* <!-- Message List --> */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">Messages</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div
                    className="message-thread unread p-4 cursor-pointer"
                  // onclick="openMessage('msg1')"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm font-bold">ND</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            News Director
                          </p>
                          <p className="text-xs text-gray-500">2h ago</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Urgent: Breaking news coverage protocol update
                        </p>
                        <div className="flex items-center mt-1">
                          <span
                            className="priority-high w-2 h-2 rounded-full bg-red-500 mr-2"
                          ></span>
                          <span className="text-xs text-red-600 font-medium"
                          >HIGH PRIORITY</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="message-thread p-4 cursor-pointer"
                  // onclick="openMessage('msg2')"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm font-bold">SJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Sarah Johnson
                          </p>
                          <p className="text-xs text-gray-500">4h ago</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Climate summit article ready for review
                        </p>
                        <div className="flex items-center mt-1">
                          <span
                            className="priority-medium w-2 h-2 rounded-full bg-yellow-500 mr-2"
                          ></span>
                          <span className="text-xs text-yellow-600 font-medium"
                          >MEDIUM</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="message-thread p-4 cursor-pointer"
                  // onclick="openMessage('msg3')"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm font-bold">DW</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            David Wilson
                          </p>
                          <p className="text-xs text-gray-500">1d ago</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Weekly editorial meeting notes
                        </p>
                        <div className="flex items-center mt-1">
                          <span
                            className="priority-low w-2 h-2 rounded-full bg-green-500 mr-2"
                          ></span>
                          <span className="text-xs text-green-600 font-medium"
                          >LOW</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="message-thread unread p-4 cursor-pointer"
                  // onclick="openMessage('msg4')"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm font-bold">MC</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Mike Chen
                          </p>
                          <p className="text-xs text-gray-500">2d ago</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Request for technology beat assignment
                        </p>
                        <div className="flex items-center mt-1">
                          <span
                            className="priority-medium w-2 h-2 rounded-full bg-yellow-500 mr-2"
                          ></span>
                          <span className="text-xs text-yellow-600 font-medium"
                          >MEDIUM</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Message Content --> */}
            <div className="lg:col-span-2">
              <div
                id="message-content"
                className="bg-white rounded-lg shadow-sm h-96"
              >
                <div className="p-6 text-center text-gray-500">
                  <span className="text-4xl mb-4 block">💬</span>
                  <p>Select a message to view its content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


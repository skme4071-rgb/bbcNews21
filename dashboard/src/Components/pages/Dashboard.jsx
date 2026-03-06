
export default function Dashboard() {
    return (
          <div id="admin-dashboard-content" className="admin-section">
          {/* <!-- Stats Cards --> */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="stat-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">12,847</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div
                  className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>

            <div className="stat-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Reporters
                  </p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-green-600">+3 this week</p>
                </div>
                <div
                  className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl">📰</span>
                </div>
              </div>
            </div>

            <div className="stat-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Articles Today
                  </p>
                  <p className="text-3xl font-bold text-gray-900">47</p>
                  <p className="text-sm text-blue-600">+8 pending review</p>
                </div>
                <div
                  className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>

            <div className="stat-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Unread Messages
                  </p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-red-600">Requires attention</p>
                </div>
                <div
                  className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl">💬</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Charts and Recent Activity --> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <!-- User Activity Chart --> */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">
                User Activity (Last 7 Days)
              </h3>
              <div className="flex items-end space-x-2 h-40">
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 60%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 75%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 45%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 90%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 65%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 80%"
                ></div>
                <div
                  className="chart-bar w-8 bg-blue-500"
                // style="height: 100%"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* <!-- Recent Activity --> */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">
                Recent System Activity
              </h3>
              <div className="space-y-3">
                <div
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-green-600 text-sm">📝</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      New article submitted by Sarah Johnson
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-blue-600 text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      New reporter registered: Mike Chen
                    </p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-purple-600 text-sm">✏️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Article approved by Editor David Wilson
                    </p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-red-600 text-sm">💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Urgent message from News Director
                    </p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
 }



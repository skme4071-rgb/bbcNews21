export default function Users() {
    return (
          <div id="admin-users-content" className="admin-section ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex space-x-3">
              <button
               
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Export Users
              </button>
              <button
           
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New User
              </button>
            </div>
          </div>

          {/* <!-- User Filters --> */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Search users..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Reporter</option>
                <option>User</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Departments</option>
                <option>News</option>
                <option>Sports</option>
                <option>Business</option>
                <option>Technology</option>
              </select>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* <!-- Users Table --> */}
          <div className="data-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Login
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-sm">AD</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Admin User
                          </div>
                          <div className="text-sm text-gray-500">
                            admin@bbc.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge role-admin">Admin</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      System
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      Online now
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      <div className="flex space-x-2">
                        <button
                          // onclick="editUser('admin@bbc.com')"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <span className="text-gray-400">Protected</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-sm">DW</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            David Wilson
                          </div>
                          <div className="text-sm text-gray-500">
                            david.wilson@bbc.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge role-editor">Editor</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      News
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      30 minutes ago
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      <div className="flex space-x-2">
                        <button
                          // onclick="editUser('david.wilson@bbc.com')"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          // onclick="messageUser('david.wilson@bbc.com')"
                          className="text-green-600 hover:text-green-900"
                        >
                          Message
                        </button>
                        <button
                          // onclick="suspendUser('david.wilson@bbc.com')"
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-sm">SJ</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Sarah Johnson
                          </div>
                          <div className="text-sm text-gray-500">
                            sarah.johnson@bbc.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge role-reporter">Reporter</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      Environment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      2 hours ago
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      <div className="flex space-x-2">
                        <button
                          // onclick="editUser('sarah.johnson@bbc.com')"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          // onclick="messageUser('sarah.johnson@bbc.com')"
                          className="text-green-600 hover:text-green-900"
                        >
                          Message
                        </button>
                        <button
                          // onclick="suspendUser('sarah.johnson@bbc.com')"
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-sm">MC</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Mike Chen
                          </div>
                          <div className="text-sm text-gray-500">
                            mike.chen@bbc.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge role-reporter">Reporter</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      Technology
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-badge status-pending">Pending</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      Never
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      <div className="flex space-x-2">
                        <button
                          // onclick="approveUser('mike.chen@bbc.com')"
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          // onclick="editUser('mike.chen@bbc.com')"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          // onclick="deleteUser('mike.chen@bbc.com')"
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


            {/* <!-- Pagination --> */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to
                    <span className="font-medium">4</span> of
                    <span className="font-medium">247</span> results
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                  >
                    1
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    2
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    3
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
 }
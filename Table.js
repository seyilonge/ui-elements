var React = require('react');
var PropTypes = React.PropTypes;

// Stylesheet includes
require('../../stylesheets/base/table.css');

function Table (props) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-condenced table-striped table-hover">
                <thead>
                    <tr>
                        <th className="text-center">
                            <input type="checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Office</th>
                        <th>System</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">
                            <input type="checkbox" />
                        </td>
                        <td>John Smith</td>
                                <td>email1@email1.gov</td>
                            <td>Name of Office One Lorem Ipsum</td>
                        <td>GMM</td>
                        <td>Financial Officer</td>
                        <td>
                            <select name="" id="" className="form-control input-sm select-action-table">
                                <option value="">Select</option>
                                <option value="">View</option>
                                <option value="">Approve</option>
                                <option value="">Reject</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

Table.PropTypes = {
  data: PropTypes.array.isRequired  
};

module.exports = Table;

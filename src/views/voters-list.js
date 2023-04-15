import React from "react";
import Config from '../config.json'
import { Button, Table } from "reactstrap";
import NotificationAlert from "react-notification-alert";


class VotersList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            voters: []
        }
        this.notificationAlert = React.createRef();
    }

    componentDidMount() {
        return this.getVotersList().then(result => {
            if (result && result.message) {
                this.setState({ voters: result.message })
                return;
            }
            return Promise.reject("Unable to get the Voters List")
        }).catch(err => {
            console.error(err)
            return this.notify('tr', "Unable to get the Voters List", 3)
        })
    }

    getVotersList = () => {
        let url = `${Config['api-services']}${Config['endpoints']['voters-list']}`
        let profile = JSON.parse(localStorage.getItem("profile"))
        let body = {
            location: ""
        }
        if (profile && profile.location) {
            body.location = profile.location
        }
        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
    }

    voteCandidate = (voterDetails) => {
        let address = voterDetails && voterDetails.address ? voterDetails.address : ""

        let url = `${Config['api-services']}${Config['endpoints']['vote']}`
        /**
         * cID
         * offline - NA
         * online - 2
         */
        let body = {
            "address": address,
            "cID": ""
        }

        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        }).then(result => {
            if (result && result.message) {
                this.notify('tr', "Voted Successfully", 2)
                return this.getVotersList()
            }
            return Promise.reject("Unable to Vote")
        }).catch(err => {
            console.error(err)
            return this.notify('tr', "Something Went Wrong", 3)
        })
    }

    getVotingButton = (voterDetails) => {
        let isVoted = voterDetails && voterDetails.isVoted ? true : false
        return (
            <Button
                className="btn-round"
                color="primary"
                onClick={() => this.voteCandidate(voterDetails)}
                disabled={isVoted}
            >
                Check In
            </Button>
        )
    }

    notify = (place, message, color) => {
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: message,
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7
        };
        this.notificationAlert.current.notificationAlert(options);
    };

    getTableHeaders = () => {
        return (
            <tr>
                <th>Digital ID</th>
                <th>Name</th>
                <th>Sur Name</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
            </tr>
        )
    }

    getTableData = (voterDetails) => {
        if (!voterDetails) {
            return <></>;
        }
        return (
            <tr>
                <td>{voterDetails._id}</td>
                <td>{voterDetails.name}</td>
                <td>{voterDetails.soName || ""}</td>
                <td>{voterDetails.location || ""}</td>
                <td>{voterDetails.isVoted ? "Voted" : "Not Voted"}</td>
                <td>{!voterDetails.isVoted ? this.getVotingButton(voterDetails) : ""}</td>
            </tr>
        )
    }

    getVoters = () => {
        const { voters } = this.state;

        return voters.map((value, key) => {
            return (
                <Table>
                    <thead className="text-primary">
                        {
                            this.getTableHeaders()
                        }
                    </thead>
                    <tbody>
                        {
                            this.getTableData(value)
                        }
                    </tbody>
                </Table>
            )
        })
    }

    render() {
        return (
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
                {this.getVoters()}
            </div>
        )
    }

}

export default VotersList;

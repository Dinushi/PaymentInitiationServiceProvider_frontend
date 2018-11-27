import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import UserProfile from "./UserProfile";
import '../../styles/UserProfileStyles/Profile.css';
import {getUsername} from '../../data-store/local-storage/index';

export default class Profile extends React.Component {

    render() {
        const { username } = getUsername();
        console.log("at profile"+username);
        return (
            <div>
                <h5 align="right">Logged-In : {getUsername()}</h5>
                <div id="userProfile">
                    <UserProfile  username={getUsername()}/>
                </div>
            </div>
        );
    }
}

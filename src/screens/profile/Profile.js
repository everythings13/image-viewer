import React, {Component} from 'react';
import Header from "../../common/Header";
import "./Profile.css";
import {
    Avatar,
    TextField,
    DialogTitle,
    DialogContent,
    Fab,
    Button,
    Dialog,
    DialogActions,
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import ImageGrid from './imageGrid';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: "",
            username: "",
            counts: {},
            fullName: "",
            updatedFullName: "",
            emptyFullName: false,
            openModal: false,
            response: []
        };
    }

    /**
     * @memberof Profile
     * @description closes update name pop up
     */
    closePopUp = () => {
        this.setState({openModal: false});
    }

    /**
     * @memberof Profile
     * @description sets updated name state
     */
    updateName = (expression, updatedFullName) => {
        const nextState = {};
        nextState[updatedFullName] = expression.target.value;
        this.setState(nextState);
    }

    /**
     * @memberof Profile
     * @description opens update name pop up
     */
    openPopUp = () => {
        this.setState({openModal: true});
    };

    /**
     * @memberof Profile
     * @description updates full name to a new name
     */
    modifyFullName = () => {
        const {updatedFullName} = this.state;
        if (updatedFullName.trim() === "") {
            this.setState({emptyFullName: true});
        } else {
            this.setState({
                fullName: updatedFullName,
                openModal: false,
                emptyFullName: false,
                updatedFullName: ""
            });
        }
    };

    /**
     * @memberof Profile
     * @description sets object state on the basis of data sent by API
     */
    componentDidMount() {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
                .then(results => results.json())
                .then(result => {
                    if (result.data) {
                        const {profile_picture, username, counts, full_name} = result.data;
                        this.setState({
                            profilePicture: profile_picture,
                            username: username,
                            counts: counts,
                            fullName: full_name
                        });
                    }
                });
            fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=${accessToken}`)
                .then(results => results.json())
                .then(result => {
                    if (result.data) {
                        this.setState({response: result.data});
                    }
                });
        } else {
            window.location = '/';
        }
    }

    render() {
        const {profilePicture, username, counts, fullName, openModal, emptyFullName, response} = this.state;
        return <div className='profileContainer'>
            <Header url={profilePicture} isHomePageHeaderEnabled={true} isSwitchToHomePage={true}/>
            <div className='infoContainer'>
                <Avatar aria-label='recipe'>
                    <img src={profilePicture} alt='profilePicture' className='profilePicture'/>
                </Avatar>
                <div className='userInfo'>
                    <p className='userName'>{username}</p>
                    <div className='postsInfo'>
                        <p>Posts: {counts.media}</p>
                        <p>Follows: {counts.follows}</p>
                        <p>Followed By: {counts.followed_by}</p>
                    </div>
                    <div>
                        <span className='fullName'>{fullName}</span>
                        <Fab className='editButton' color='secondary' aria-label='edit' onClick={this.openPopUp}>
                            <EditIcon/>
                        </Fab>
                        <div>
                            <Dialog className='updatePopUp' onClose={this.closePopUp} open={openModal}
                                    aria-labelledby='form-dialog-title'>
                                <DialogTitle id='form-dialog-title'>Edit</DialogTitle>
                                <DialogContent>
                                    <TextField id='fullName' label='Full Name *' margin='dense' fullWidth
                                               onChange={e => this.updateName(e, 'updatedFullName')}
                                               type='email'/>
                                    {emptyFullName ? <span className='error'>required</span> : null}
                                </DialogContent>
                                <DialogActions>
                                    <Button variant='contained' onClick={this.modifyFullName}
                                            color='primary'>Update</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
            <div className='imageGrid'>
                <ImageGrid posts={response}/>
            </div>
        </div>;
    }
}


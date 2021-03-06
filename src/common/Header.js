import React, {Component} from 'react';
import './Header.css';
import {Input, InputAdornment, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownEnabled: false
        };
    }

    /**
     * @memberof Home and profile pages
     * @description action to occur when search button is clicked
     */
    onSearch(expression) {
        this.props.onFilter(expression.target.value);
    }

    /**
     * @memberof Home and profile pages
     * @description redirect to profile page from home page
     */
    goToProfilePage = () => {
        window.location = '/profile';
    };

    /**
     * @memberof  Home and profile pages
     * @description logs the user out
     */
    logout = () => {
        sessionStorage.removeItem('accessToken');
        window.location = '/';
    };

    /**
     * @memberof  Home and profile pages
     * @description to toggle the dropdown
     */
    toggleDropdown = () => {
        if (this.state.isDropdownEnabled) {
            this.setState({isDropdownEnabled: false});
            return;
        }
        this.setState({isDropdownEnabled: true});
    };

    render() {
        const {isDropdownEnabled} = this.state;
        const {isHomePageHeaderEnabled, url, isSwitchToHomePage} = this.props;
        return <React.Fragment>
            {
                isHomePageHeaderEnabled ? <div className='headerLogo'> {
                    isSwitchToHomePage ? <a href={'/home'} className='profileLogo'>Image Viewer</a> :
                        <span>Image Viewer</span>
                }
                    <div className='searchContainer'>
                        <Input className='search' type='search' placeholder='Search...'
                               startAdornment={<InputAdornment position='start'><SearchIcon/></InputAdornment>}
                               onChange={expression => this.onSearch(expression)}/>
                        <IconButton className='logoButton' aria-label='pic' onClick={this.toggleDropdown}>
                            <img src={url} className='profilePicture'  alt="pic"/>
                        </IconButton>
                        {
                            isDropdownEnabled ?
                                <div className='dropdown'>
                                    <p className='choice account' onClick={this.goToProfilePage}>My Account</p>
                                    <hr/>
                                    <p className='choice logout' onClick={this.logout}>Logout</p>
                                </div> : null
                        }
                    </div>
                </div> : <div>
                    <header id='header'><span className='header-text'>Image Viewer</span></header>
                </div>
            }
        </React.Fragment>;
    }
}

export default Header;
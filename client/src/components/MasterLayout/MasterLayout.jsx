import React, {Fragment, useRef} from 'react';
import {Container, Navbar} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import {AiOutlineMenuUnfold,AiOutlineUser,AiOutlineLogout,AiOutlineEdit,AiOutlineCheckCircle} from "react-icons/ai";
import {getUserDetails, removeSession} from "../../helpers/SessionHelper";
import {RiDashboardLine} from "react-icons/ri";
import {BsListNested,BsHourglass} from "react-icons/bs";
import {MdOutlineCancelPresentation} from "react-icons/md";

const MasterLayout = (props) => {
    let user = JSON.parse(getUserDetails());
    let contentRef,sideNavRef=useRef();
    const onLogout = () => {
        removeSession();
    }
    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };
    return (
        <Fragment>
            <Navbar  className="fixed-top px-0 shadow-sm ">
                <Container fluid={true}>
                    <Navbar.Brand >
                        <a onClick={MenuBarClickHandler} className="icon-nav m-0 h5"><AiOutlineMenuUnfold/></a>
                        <img className="nav-logo mx-2"  src={logo} alt="logo"/>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={user['photo']} alt=""/>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={user['photo']} alt=""/>
                                    <h6>{user['firstName']}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
            <div ref={(div) => {sideNavRef=div}} className="side-nav-open">
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/"  end>
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/create">
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create Task</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/all" >
                    <BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New Task</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/Progress" >
                    <BsHourglass className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Completed" >
                    <AiOutlineCheckCircle className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Canceled" >
                    <MdOutlineCancelPresentation className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Canceled</span>
                </NavLink>
            </div>
            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;
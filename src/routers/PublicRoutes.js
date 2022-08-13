import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, children }) => {
	console.log(isLoggedIn);
	return isLoggedIn ? children : <Navigate to={"/"} />;
	
};

PublicRoute.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
};

export default PublicRoute;
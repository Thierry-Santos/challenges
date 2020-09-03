import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { name } = useAuth();

  return (
    <ReactDOMRoute 
      {...rest} 
      render={({ location }) => {
          return isPrivate === !!name ? (
            <Component />
          ) : (
            <Redirect to={{ 
              pathname: isPrivate ? '/' : '/main',
              state: { from: location }, 
            }} />
          )
        }
      }
    />
  )
};

export default Route;
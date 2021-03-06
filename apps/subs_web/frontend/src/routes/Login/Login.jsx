import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import RemoteCall from 'data/domain/RemoteCall'
import Message from 'components/Message'
import Button from 'components/Button'
import InputText from 'components/InputText'
import routes from 'constants/routes'

const renderErrors = (remoteCall) => {
  if (remoteCall.loading || !remoteCall.data) { return null }

  return (<Message error>{remoteCall.get('message')}</Message>)
}

const Login = ({
  data,
  onClick,
  onChange,
  remoteCall,
  children,
}) => {
  const handleChange = (event, attribute) => {
    onChange(attribute, event.target.value)
  }

  return (
    <div id="login-form" className="measure center pa3 bg-white br2 ba b--black shadow-5">
      {renderErrors(remoteCall)}

      <legend className="f4 fw6 ph0 mh0 subs-blue ttu">Log in</legend>
      <div className="mt3">
        <div className="b dark-gray mb2 mt3">
          Email
        </div>
        <InputText
          className="user-email br2 pa2 input-reset ba w-100"
          type="email"
          value={data.email}
          onChange={event => handleChange(event, 'email')}
        />
      </div>
      <div className="mv3">
        <div className="b dark-gray mb2 mt3">
          Password
        </div>
        <InputText
          className="user-password br2 pa2 input-reset ba w-100"
          type="password"
          value={data.password}
          onChange={event => handleChange(event, 'password')}
        />
      </div>
      <div>
        <Button id="login-btn" onClick={onClick}>
          Log in
        </Button>
      </div>
      <div className="mv3 bb moon-gray" />
      <div className="lh-copy">
        <span className="v-mid">{children}</span>
        <span className="mh2 dib v-mid gray">or</span>
        <Link className="link b dark-gray v-mid" to={routes.signup}>Sign up</Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  remoteCall: PropTypes.instanceOf(RemoteCall).isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.object,
}

Login.defaultProps = {
  onClick: () => { },
  onChange: () => { },
}

export default Login

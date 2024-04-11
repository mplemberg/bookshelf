import React from 'react'
function LoginForm({onSubmit, buttonText = 'Submit'}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      username: event.target.username.value,
      password: event.target.password.value,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input id="username"></input>
      </div>
      <div>
        <label>Password</label>
        <input id="password" type="password"></input>
      </div>
      <div></div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export {LoginForm}

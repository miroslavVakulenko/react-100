export default function SubmitForm({ handleSubmit }) {
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" id="" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form></>
  )
}


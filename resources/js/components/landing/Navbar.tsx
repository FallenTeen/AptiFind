export default function Navbar() {
  return (
    <nav style={{padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between'}}>
      <span style={{fontWeight: 'bold'}}>Minat Bakat App</span>
      <div>
        <a href="/login" style={{marginRight: 16}}>Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
}

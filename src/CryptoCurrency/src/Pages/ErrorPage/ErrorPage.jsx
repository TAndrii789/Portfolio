import { FaBtc } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./ErrorPage.css"


const NotFound = () => {

  const linkStyle = {
    fontWeight: 'bold',
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    textDecoration: 'none',
    fontSize: '3vh',
    color: '#fff',
    backgroundColor: 'rgb(6 69 105)',
    borderRadius: '5px',
    border: '2px solid hsl(198, 100%, 45%)',
    padding: '5px 7px',
    cursor: 'pointer',
  }

return (
  <>
    <div className="error-page-container">
      <h2>Oops!</h2>
      <p>We&apos;re sorry, The page you requested could not be found.</p>
      <Link to={"/Portfolio/CryptoCurrency/index.html/home"} style={linkStyle}>Go to Home<FaBtc size={20} /></Link>
    </div>
  </>
)
}

export default NotFound
import NotFoundGif from "../../assets/NotFound.gif"
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "50px",background: "#e5e5e5",minHeight:"100%",boxSizing:"border-box" }}>
        <h1 style={{ fontSize: "3.4em", paddingBottom: "20px" ,fontFamily :"Familjen Grotesk",fontWeight:700}}> Oops!</h1>
        <p onClick={()=>{navigate("/")}} style={{color:"#68a368",cursor:"pointer",textDecoration:"underline", fontSize: "1.6em", paddingBottom: "20px",fontFamily :"Familjen Grotesk",fontWeight:700}}>
          Looks like youre lost. Let us take you to the harbor.
        </p>
        <img src={NotFoundGif} alt="Not found gif"></img>
      </div>
    </>
  );
}
export default NotFoundPage;

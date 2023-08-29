import { useEffect, useState } from "react"
import jsPDF from 'jspdf';
import "./Schedule.css"
import EditRoutes from "./EditRoutes";
import baseURL from "../../utils/baseURL"


const Schedule = () => {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    fetch(`${baseURL}/busRoute`)
      .then(response => response.json())
      .then(data => {
        setData(data.sort());
      })
      .catch(error => console.error(error));
  }, []);

  const filterAndSortEntries = (data) => {
    const filteredEntries = data.filter(entry => entry.mRoute.length > 0);
    const sortedData = filteredEntries.sort((a, b) => a.routeNo - b.routeNo);
    return sortedData;
  };
  const filteredAndSortedEntries = filterAndSortEntries(data);


  const generatePDF = () => {
    const element = document.getElementById('schedule'); // Get the div element by Id
    const pageSize = {    // Define the A4 page size
      width: 210,
      height: 297
    };
    const { height, width } = element.getBoundingClientRect();    // Get the element's height and width
    const scaleFactor = Math.min(pageSize.width / width, pageSize.height / height);    // Calculate the scale factor to fit the content on one page
    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance with A4 dimensions
    pdf.html(element, {  // Add the div content to the PDF with the calculated scale factor
      callback: function (pdf) {
        pdf.save('my-document.pdf');       // Save the PDF document
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: scaleFactor
      }
    });
  }

  const handleEditBtn = () => {
    if (showEditForm) {
      setShowEditForm(false)
    } else {
      setShowEditForm(true)
    }
  }

  return (
    <>
      <div className="wrapper-container">
        <div className="schedule-header">
          <h1 className="routes-heading">Routes</h1>
          <button className="sbtn" onClick={generatePDF}>Generate pdf</button>
          <button className="sbtn" onClick={handleEditBtn}>Edit Pdf</button>
        </div>
        <br/>
       <div className="inside-container">
       <div className="schedule-container" id="schedule">
          {showEditForm ? <EditRoutes /> : null}
          <div className="a4Size" >
            <h3 style={{ textAlign: "center" }}>Shuttle Services<br />Details of route {currentYear}</h3>
            <table className="table" style={{ border: "2px solid black" }}>
              <thead className="thead">
                <tr style={{ border: "2px solid black" }}>
                  <th className="th">Route</th>
                  <th className="th">Timing</th>
                  <th className="th">Details of Route</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedEntries.map((item) => (
                  <tr key={item.routeNo}>
                    <td className="td" style={{ textAlign: "center" }}>{item.routeNo}</td>
                    <td className="td" style={{ textAlign: "center" }}>{item.timing}</td>
                    <td className="td" >
                      {item.eRoute.join(' - ') === item.mRoute.join(' - ')
                        ? (
                          <div>
                            {item.eRoute.join(' - ')}
                          </div>
                        )
                        : (
                          <div>
                            <span className="span-element">Only Morning:</span><br />
                            {item.mRoute.join(' - ')} <br />
                            <span className="span-element">Only Evening:</span> <br />
                            {item.eRoute.join(' - ')}
                          </div>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="description">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, deleniti vel. Saepe, laborum? Ratione maxime odit reprehenderit at impedit ipsum possimus iste magnam eum nihil quisquam cumque in consequuntur ab eveniet blanditiis eligendi, consectetur vero, ipsam dignissimos earum corrupti dolorum? Voluptatibus porro assumenda cupiditate libero repellat. Necessitatibus laborum est vitae, ducimus, labore consequatur optio illo enim quia deleniti sequi cumque, quidem odit amet ullam explicabo atque velit consequuntur accusantium. Nesciunt, aliquam quam. Dolorum at repellendus, nostrum illum excepturi fugit deserunt mollitia corrupti expedita dolore suscipit quasi? Nihil temporibus corporis voluptatum!
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  )
}




export default Schedule

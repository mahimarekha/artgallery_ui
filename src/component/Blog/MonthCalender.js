import React from "react";
import dateFns from "date-fns";
import "./Calender.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CommonService from '../../service/commonService';
import { EVENTS } from '../../service/API_URL';
import { Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useHistory ,useLocation,} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class MonthCalendar extends React.Component {

  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(props.location.search);
    
    // Extract query parameters
    const currentMonth = queryParams.get('currentMonth');

    this.state = {
      list: [],
      currentMonth:currentMonth ?  new Date(currentMonth) : new Date(),
      selectedDate: new Date()
    };
  }
  componentDidMount() {

  const date =  dateFns.format(this.state.currentMonth, "YYYY-MM-DD");
    this.getEventList(date);
  }

  getEventList = (date) => {
    const colors = ["red", "blue", "green", "orange", "purple", "brown"];
    CommonService.postRequest(EVENTS.EVENTGET, {currentMonth:date}).then((res) => {

      const resulatDetails = res.map((result,index)=>{

        return {...result,
          artiestName:result.artiest ? result.artiest.artiestName :'',
          profile:result.artiest ? result.artiest.profile :'',
          expreance:result.artiest ? result.artiest.expreance :'' ,
          artiesDiscription:result.artiest ? result.artiest.discription :'' ,
          ...{colorCode:colors[index % colors.length]}};
      });
      this.setState({
        list: resulatDetails,
       
      });
    }).catch((err) => {

    });
  }


  renderHeader() {
    const dateFormat = "YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">

          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
  renderDays() {
    const dateFormat = "ddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  filterByDate(records, targetDate) {
    return records.filter(record => record.eventsDates.includes(targetDate));
  }
  findEventByDate = (date) => {
 
    let index = 0;
    for (const event of this.state.list) {
      // console.log(event );
      console.log(event.eventsDates.includes(date));
      if (event.eventsDates.includes(date)) {
        return  { eventName: event.eventName, 
          imageURL: event.imageURL,
          organizer:event.organizer,
          id:event.id,
          organizer:event.organizer,
          imageURList:this.filterByDate(this.state.list,date),
          address:event.address };
      }
      index++; 
    }
    return null;
  };

  renderCells() {
    const { selectedDate, currentMonth } = this.state;
    const currentYear = currentMonth.getFullYear(); // Current year (e.g., 2024)
    const nextYear = currentYear + 1; // Next year (e.g., 2025)

    // Arrays for each group of months
    const firstHalfCurrentYear = [];
    const secondHalfCurrentYear = [];
    const firstHalfNextYear = [];

    // First 6 months of the current year (Jan to June)
    for (let month = 0; month < 6; month++) {
      firstHalfCurrentYear.push(new Date(currentYear, month, 1));
    }
    firstHalfCurrentYear.unshift(currentYear);

    // Next 6 months of the current year (July to Dec)
    for (let month = 6; month < 12; month++) {
      secondHalfCurrentYear.push(new Date(currentYear, month, 1));
    }

    secondHalfCurrentYear.unshift(currentYear);
    // First 6 months of the next year (Jan to June of next year)
    for (let month = 0; month < 6; month++) {
      firstHalfNextYear.push(new Date(nextYear, month, 1));
    }
    firstHalfNextYear.unshift(nextYear);




    const dateFormat = "MMM"; // Format for the month abbreviation
    const rows = [];

    // Helper function to render month cells
    const renderMonthCells = (monthsArray, style) => {

      let days = [];
      monthsArray.forEach((monthDate, index) => {
        const monthStart = dateFns.startOfMonth(monthDate);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const currenmonth = dateFns.format(monthStart, "YYYY-MM-DD");
        console.log(monthDate)
      
 console.log(currenmonth)
        let day = startDate;
        let formattedDate = "";
        formattedDate = dateFns.format(monthDate, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${index == 0 ? "disabled" : ""}`}
            key={day}

            onClick={() => this.onDateClick(dateFns.parse(monthDate))}
          >
            {index == 0 ? <span className="number">{monthDate}</span> :
             <Link to={"/blog-list-view?currentMonth="+currenmonth}>
             <span className="number" style={{ color: style }}>
                 
                {formattedDate}
                 </span>
                 </Link>
      }
            {/* <span className="bg">{formattedDate}</span> */}
          </div>
        );
        day = dateFns.addDays(day, 1);
        // }
        // }


      });
      rows.push(
        <div className="month" >
          <div className="row">{days}</div>
        </div>
      );
      console.log("adfasdfasfda")
    };

    // Render the three arrays of months
    renderMonthCells(firstHalfCurrentYear, "red");
    renderMonthCells(secondHalfCurrentYear, "blue");
    renderMonthCells(firstHalfNextYear, "green");

    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
   // this.refs.overlay.hide();
 //  history.push("/blog-list-view?currentMonth=" + day);
    // this.setState({
    //   selectedDate: day
    // });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addYears(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subYears(this.state.currentMonth, 1)
    });
  };

  render() {

    return (
      <div className="calendar">
       
         <div className="headertitle">
         <h5>CALENDAR OF EVENTS </h5>
         </div>
       
        {this.renderHeader()}
       
        {this.renderCells()}
      </div>
    );
  }
}

const popover = (
  <Popover id="popover-basic" show={false}>
    <Popover.Header as="h3"> Photography Exhibition    </Popover.Header>
    <Popover.Body>
      Address : Silver jubilee hall.

    </Popover.Body>
  </Popover>
);
export default withRouter(MonthCalendar); ;
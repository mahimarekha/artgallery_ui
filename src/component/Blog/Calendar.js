import React from "react";
import dateFns from "date-fns";
import "./Calender.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CommonService from '../../service/commonService';
import { EVENTS } from '../../service/API_URL';
import { Link } from 'react-router-dom'


class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }
  componentDidMount() {
    this.getEventList();
  }

  getEventList = () => {

    CommonService.postRequest(EVENTS.EVENTGET, {}).then((res) => {

      this.setState({
        list: res,
        currentMonth: new Date(),
        selectedDate: new Date()
      });
    }).catch((err) => {

    });
  }


  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <span className="bg"> 
                <i class="fa fa-arrow-circle-left font-color"  onClick={this.prevMonth} aria-hidden="true"></i> 
             </span>
          {/* <div className="icon cal-next" onClick={this.prevMonth}>
            chevron_left
          </div> */}
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end " onClick={this.nextMonth}>
          {/* <div className="icon cal-next">chevron_right</div> */}
          <span className="bg"> 
                <i class="fa fa-arrow-circle-right font-color"  onClick={this.nextMonth} aria-hidden="true"></i> 
             </span>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
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

  findEventByDate = (date) => {

    for (const event of this.state.list) {
      // console.log(event );
      console.log(event.eventsDates.includes(date));
      if (event.eventsDates.includes(date)) {
        return { eventName: event.eventName, 
          imageURL: event.imageURL,
          organizer:event.organizer,
          id:event.id,
          address:event.address };
      }
    }
    return null;
  };

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const showDateFormate = "YYYY-MM-DD";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {

        const datess = dateFns.format(day, showDateFormate);

        const eventDetails = this.findEventByDate(datess);
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >

            <span className="number">{formattedDate}</span>
            {eventDetails ?  <span className="bg"> 
                            <Link to={"/vieweventdetails/"+eventDetails.id}>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> 
                </Link>
             </span>:""}
          

            <span className="">
              {eventDetails ? <OverlayTrigger trigger={['focus','hover']} placement="top"  overlay={<Popover id="popover-basic" show={false}>
                <Popover.Header as="h3" style={{ backgroundColor: '#f58233', color: 'white' }}> {eventDetails.eventName}   </Popover.Header>
                <Popover.Body>
                <div>
               <span style={{"font-weight":"bold"}}>
               Project type
                </span> : {eventDetails.organizer}
               </div>
               <div>
               <span style={{"font-weight":"bold"}}>
             Address
                </span>       : {eventDetails.address}
               </div>

                </Popover.Body>
              </Popover>}>
              {/* <Link to={"/vieweventdetails/"+eventDetails.id}> */}
                <img src={eventDetails.imageURL} className="img" />
                {/* </Link> */}
              </OverlayTrigger> : ""}

            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
   // this.refs.overlay.hide();

    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
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
export default Calendar;
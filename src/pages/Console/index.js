import React, { PureComponent } from 'react';
import axios from 'axios';
import { Calendar } from '../../components';

class Console extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        events: [],
        eventsLoaded: false,
      }
    }

    componentWillMount() {
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters`)
      .then((resp) => {
          const data = resp.data.map(x => ({
              id: x.id,
              title: x.title,
              startAt: new Date(x.start_at),
              endAt: new Date(x.end_at),
          }))
          this.setState({
            events: data,
            eventsLoaded: true
          })
      })
      .catch((error) => {
          console.log(error);
      });
    }

    render() {
      const { events, eventsLoaded } = this.state;
      return (
        <div>
          {eventsLoaded ?
            <Calendar
              events={events}
            />
            :
            <h1>Loading...</h1>
          }
        </div>
      )
    }
  }


export default Console;
import React, { PureComponent } from 'react';
import axios from 'axios';
import { Row, Grid, Col } from 'react-bootstrap';
import { Calendar, Notes } from '../../components';

class Console extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        mattersList: [],
        notesList: [],
        mattersListLoaded: false,
        notesListLoaded: false
      }
    }

    componentWillMount() {
       this.fetchMattersList();
       this.fetchNotesList();
    }

    fetchMattersList() {
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters`)
        .then((resp) => {
            const data = resp.data.map(x => ({
                id: x.id,
                title: x.title,
                startAt: new Date(x.start_at),
                endAt: new Date(x.end_at),
            }))
            this.setState({
              mattersList: data,
              mattersListLoaded: true
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    fetchNotesList() {
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters/36/notes`)
        .then((resp) => {
            const data = resp.data.map(x => ({
                id: x.id,
                body: x.body,
            }))
            this.setState({
              notesList: data,
              notesListLoaded: true
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    initLoadReady() {
      return this.state.mattersListLoaded && this.state.notesListLoaded
    }

    render() {
      const { mattersList, notesList } = this.state;
      return (
        <Grid>
          {this.initLoadReady() ?
            <Row>
              <Col sm={9}>
                <Calendar
                  events={mattersList}
                />
              </Col>
              <Col sm={3}>
                <Notes
                  list={notesList}
                />
              </Col>
            </Row>
            :
            <h1>Loading...</h1>
          }
        </Grid>
      )
    }
  }


export default Console;
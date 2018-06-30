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
        notesListLoading: false,
        value: '',
        selectedMatterId: null,
      }
    }

    componentWillMount() {
       this.fetchMattersList();
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

    fetchNotesList(id) {
      this.setState({ notesListLoading: true })
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters/${id}/notes`)
        .then((resp) => {
            const data = resp.data.map(x => ({
                id: x.id,
                body: x.body,
            }))
            this.setState({
              notesList: data,
              notesListLoading: false,
              selectedMatterId: id,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    createNote() {
      axios.post(`${process.env.REACT_APP_V1_API_URL}/matters/36/notes`, {
        body: this.state.value,
        matter_id: this.state.selectedMatterId,
      })
        .then((resp) => {
          const data = {id: resp.data.id, body: resp.data.body};
          this.setState({
            notesList: this.state.notesList.concat(data),
            value: '',
          })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    initLoadReady() {
      return this.state.mattersListLoaded
    }

    handleSave() {
      this.createNote();
    }

    handleChange(e) {
      this.setState({
        value: e.target.value,
      })
    }

    selectMatter(e) {
      this.fetchNotesList(e.id);
    }

    render() {
      const { 
        mattersList,
        notesList,
        value,
        notesListLoading,
        selectedMatterId,
      } = this.state;
      return (
        <Grid>
          {this.initLoadReady() ?
            <Row>
              <Col sm={selectedMatterId ? 9 : 12}>
                <Calendar
                  events={mattersList}
                  handleSelectMatter={(e) => this.selectMatter(e)}
                />
              </Col>
              {selectedMatterId &&
                <Col sm={3}>
                  <Notes
                    list={notesList}
                    handleSave={() => this.handleSave()}
                    handleChange={(e) => this.handleChange(e)}
                    value={value}
                    notesListLoading={notesListLoading}
                  />
                </Col>
              }
            </Row>
            :
            <h1>Loading...</h1>
          }
        </Grid>
      )
    }
  }


export default Console;